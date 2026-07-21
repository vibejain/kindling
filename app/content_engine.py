"""Bridge to the Node LLM-free content-engine CLI (warm-next)."""

from __future__ import annotations

import json
import os
import subprocess
from pathlib import Path
from typing import Any

from app.config import ROOT

CONTENT_ENGINE_DIR = Path(
    os.environ.get("CONTENT_ENGINE_DIR", str(ROOT / "content-engine"))
)
WARM_NEXT_SCRIPT = CONTENT_ENGINE_DIR / "scripts" / "warm-next.ts"
DEFAULT_TIMEOUT_SEC = float(os.environ.get("CONTENT_ENGINE_TIMEOUT_SEC", "45"))


class ContentEngineError(RuntimeError):
    pass


def content_engine_enabled() -> bool:
    """Opt-out with CONTENT_ENGINE=0; default on when the package is present."""
    flag = os.environ.get("CONTENT_ENGINE", "1").strip().lower()
    if flag in {"0", "false", "off", "no"}:
        return False
    return WARM_NEXT_SCRIPT.is_file()


def _node_env() -> dict[str, str]:
    env = os.environ.copy()
    # LLM-free only
    env.pop("CONTENT_ENGINE_USE_LLM", None)
    env["CONTENT_ENGINE_USE_LLM"] = "0"
    if "DATABASE_URL" not in env:
        env["DATABASE_URL"] = (
            "postgres://content_engine:content_engine@127.0.0.1:5432/content_engine"
        )
    return env


def generate_warm_message(
    from_email: str,
    to_email: str,
    *,
    timeout_sec: float | None = None,
) -> dict[str, Any]:
    """
    Return {subject, body, thread_id, message_id, ...} from content-engine.
    Raises ContentEngineError on failure.
    """
    if not content_engine_enabled():
        raise ContentEngineError("content-engine disabled or missing")

    timeout = timeout_sec if timeout_sec is not None else DEFAULT_TIMEOUT_SEC
    cmd = [
        "npx",
        "--yes",
        "tsx",
        str(WARM_NEXT_SCRIPT),
        "--from",
        from_email,
        "--to",
        to_email,
    ]
    try:
        proc = subprocess.run(
            cmd,
            cwd=str(CONTENT_ENGINE_DIR),
            env=_node_env(),
            capture_output=True,
            text=True,
            timeout=timeout,
            check=False,
        )
    except subprocess.TimeoutExpired as exc:
        raise ContentEngineError(f"timeout after {timeout}s") from exc
    except FileNotFoundError as exc:
        raise ContentEngineError("npx/tsx not found") from exc

    stdout = (proc.stdout or "").strip()
    stderr = (proc.stderr or "").strip()
    if proc.returncode != 0:
        raise ContentEngineError(
            f"exit {proc.returncode}: {stderr or stdout or 'no output'}"[:500]
        )

    # Last non-empty line should be JSON (tsx may print noise)
    line = ""
    for candidate in reversed(stdout.splitlines()):
        candidate = candidate.strip()
        if candidate.startswith("{"):
            line = candidate
            break
    if not line:
        raise ContentEngineError(f"no JSON in stdout: {stdout[:200]!r}")

    try:
        data = json.loads(line)
    except json.JSONDecodeError as exc:
        raise ContentEngineError(f"invalid JSON: {line[:200]!r}") from exc

    if not data.get("ok"):
        raise ContentEngineError(str(data.get("error") or data)[:500])

    subject = (data.get("subject") or "").strip()
    body = (data.get("body") or "").strip()
    if not subject or not body:
        raise ContentEngineError("empty subject/body from content-engine")

    return {
        "subject": subject,
        "body": body,
        "thread_id": data.get("thread_id") or "",
        "message_id": data.get("message_id") or "",
        "sequence_index": data.get("sequence_index"),
        "source": data.get("source") or "compose",
        "planned_length": data.get("planned_length"),
        "word_count": data.get("word_count"),
        "cached": bool(data.get("cached")),
    }
