from __future__ import annotations

import json
import logging
from typing import Any

from app.config import get_settings
from app.db import db, dumps, get_setting, now, set_setting

log = logging.getLogger("kindling.push")


def push_configured() -> bool:
    s = get_settings()
    return bool(s.vapid_public_key and s.vapid_private_key)


def vapid_public_key() -> str:
    return get_settings().vapid_public_key


def save_subscription(endpoint: str, subscription: dict[str, Any]) -> None:
    endpoint = (endpoint or "").strip()
    if not endpoint:
        raise ValueError("missing endpoint")
    blob = dumps(subscription)
    with db() as conn:
        conn.execute(
            """
            INSERT INTO push_subscriptions (endpoint, subscription_json, created_at, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(endpoint) DO UPDATE SET
              subscription_json = excluded.subscription_json,
              updated_at = excluded.updated_at
            """,
            (endpoint, blob, now(), now()),
        )


def delete_subscription(endpoint: str) -> None:
    with db() as conn:
        conn.execute("DELETE FROM push_subscriptions WHERE endpoint = ?", (endpoint,))


def list_subscriptions() -> list[dict[str, Any]]:
    with db() as conn:
        rows = conn.execute(
            "SELECT endpoint, subscription_json FROM push_subscriptions"
        ).fetchall()
    out = []
    for r in rows:
        try:
            out.append(json.loads(r["subscription_json"]))
        except json.JSONDecodeError:
            continue
    return out


def count_successful_sends() -> int:
    with db() as conn:
        row = conn.execute(
            "SELECT COUNT(*) AS c FROM warm_events WHERE status != 'failed' AND status != 'sending'"
        ).fetchone()
        return int(row["c"])


def count_successful_sends_today() -> int:
    import time

    start = time.time() - (
        time.localtime().tm_hour * 3600
        + time.localtime().tm_min * 60
        + time.localtime().tm_sec
    )
    with db() as conn:
        row = conn.execute(
            """
            SELECT COUNT(*) AS c FROM warm_events
            WHERE status != 'failed' AND status != 'sending' AND created_at >= ?
            """,
            (start,),
        ).fetchone()
        return int(row["c"])


def maybe_notify_milestone() -> dict[str, Any] | None:
    """Notify when floor(successful/50) increases (50, 100, 150, ...)."""
    total = count_successful_sends()
    milestone = (total // 50) * 50
    if milestone < 50:
        return None
    last = int(get_setting("push_last_milestone", "0") or "0")
    if milestone <= last:
        return None
    today = count_successful_sends_today()
    body = f"Kindling: 50 more emails sent ({today} total today)"
    ok = send_push_to_all(
        title="Kindling",
        body=body,
        data={"url": "/", "milestone": milestone, "total": total},
    )
    set_setting("push_last_milestone", str(milestone))
    return {"milestone": milestone, "total": total, "today": today, "sent": ok}


def send_push_to_all(*, title: str, body: str, data: dict[str, Any] | None = None) -> int:
    if not push_configured():
        log.info("Push not configured; skip notification")
        return 0
    try:
        from pywebpush import WebPushException, webpush
    except ImportError:
        log.warning("pywebpush not installed")
        return 0

    settings = get_settings()
    payload = json.dumps(
        {"title": title, "body": body, "data": data or {}},
        separators=(",", ":"),
    )
    vapid_claims = {"sub": settings.vapid_subject or "mailto:admin@example.com"}
    sent = 0
    for sub in list_subscriptions():
        endpoint = sub.get("endpoint") or ""
        try:
            webpush(
                subscription_info=sub,
                data=payload,
                vapid_private_key=settings.vapid_private_key,
                vapid_claims=vapid_claims,
            )
            sent += 1
        except WebPushException as exc:
            status = getattr(getattr(exc, "response", None), "status_code", None)
            log.warning("Push failed for %s: %s", endpoint[:64], exc)
            if status in (404, 410) and endpoint:
                delete_subscription(endpoint)
        except Exception:
            log.exception("Push error for %s", endpoint[:64])
    return sent
