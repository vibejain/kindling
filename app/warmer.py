from __future__ import annotations

import random
import time
from typing import Any

from app.accounts import engage_received, get_account, list_accounts, send_from_account
from app.db import db, get_setting, now


def _active_accounts() -> list[dict[str, Any]]:
    return [
        a
        for a in list_accounts(include_secrets=True)
        if a.get("enabled") and a.get("warm_enabled")
    ]


def _sent_today(account_id: int) -> int:
    start = time.time() - (time.localtime().tm_hour * 3600
                           + time.localtime().tm_min * 60
                           + time.localtime().tm_sec)
    with db() as conn:
        row = conn.execute(
            """
            SELECT COUNT(*) AS c FROM warm_events
            WHERE from_account_id = ? AND status != 'failed' AND created_at >= ?
            """,
            (account_id, start),
        ).fetchone()
        return int(row["c"])


def _last_send_gap_ok(account_id: int, min_gap_minutes: int) -> bool:
    with db() as conn:
        row = conn.execute(
            """
            SELECT MAX(created_at) AS t FROM warm_events
            WHERE from_account_id = ? AND status != 'failed'
            """,
            (account_id,),
        ).fetchone()
    if not row or row["t"] is None:
        return True
    return (now() - float(row["t"])) >= min_gap_minutes * 60


def _pick_template() -> tuple[str, str]:
    with db() as conn:
        rows = conn.execute("SELECT subject, body FROM warm_templates").fetchall()
    if not rows:
        return ("Quick sync?", "Hey {to_name},\n\nChecking in.\n\n{from_name}")
    row = random.choice(rows)
    return row["subject"], row["body"]


def _render(text: str, *, from_name: str, to_name: str) -> str:
    return (
        text.replace("{from_name}", from_name)
        .replace("{to_name}", to_name)
        .replace("{from_first}", from_name.split()[0] if from_name else "there")
        .replace("{to_first}", to_name.split()[0] if to_name else "there")
    )


def run_warm_cycle() -> dict[str, Any]:
    """Send one warm email between two random accounts, then engage on receive."""
    if get_setting("warmer_running", "0") != "1":
        return {"ok": False, "reason": "paused"}

    accounts = _active_accounts()
    if len(accounts) < 2:
        return {"ok": False, "reason": "need_at_least_two_accounts"}

    daily_limit = int(get_setting("daily_limit_per_account", "4"))
    min_gap = int(get_setting("min_gap_minutes", "45"))
    mark_important = get_setting("mark_important", "1") == "1"
    auto_reply = get_setting("auto_reply", "1") == "1"

    candidates = [
        a
        for a in accounts
        if _sent_today(a["id"]) < daily_limit and _last_send_gap_ok(a["id"], min_gap)
    ]
    if not candidates:
        return {"ok": False, "reason": "limits_reached"}

    sender = random.choice(candidates)
    receivers = [a for a in accounts if a["id"] != sender["id"]]
    receiver = random.choice(receivers)

    from_name = sender.get("display_name") or sender["email"].split("@")[0].title()
    to_name = receiver.get("display_name") or receiver["email"].split("@")[0].title()
    subject_t, body_t = _pick_template()
    subject = _render(subject_t, from_name=from_name, to_name=to_name)
    body = _render(body_t, from_name=from_name, to_name=to_name)

    ts = now()
    with db() as conn:
        cur = conn.execute(
            """
            INSERT INTO warm_events
              (from_account_id, to_account_id, subject, status, created_at, updated_at)
            VALUES (?, ?, ?, 'sending', ?, ?)
            """,
            (sender["id"], receiver["id"], subject, ts, ts),
        )
        event_id = int(cur.lastrowid)

    try:
        result = send_from_account(
            sender,
            to_email=receiver["email"],
            subject=subject,
            body=body,
        )
        message_id = result.get("message_id") or ""
        with db() as conn:
            conn.execute(
                """
                UPDATE warm_events
                SET status = 'sent', message_id = ?, updated_at = ?,
                    thread_key = ?
                WHERE id = ?
                """,
                (message_id, now(), result.get("thread_id") or "", event_id),
            )
            conn.execute(
                "UPDATE accounts SET last_send_at = ? WHERE id = ?",
                (now(), sender["id"]),
            )
    except Exception as exc:
        with db() as conn:
            conn.execute(
                """
                UPDATE warm_events
                SET status = 'failed', error = ?, updated_at = ?
                WHERE id = ?
                """,
                (str(exc)[:500], now(), event_id),
            )
        return {"ok": False, "reason": "send_failed", "error": str(exc)}

    # Give providers a moment to deliver locally / to IMAP
    time.sleep(3)

    engaged = {"found": False}
    try:
        engaged = engage_received(
            receiver,
            rfc822_message_id=message_id,
            mark_important=mark_important,
        )
    except Exception as exc:
        engaged = {"found": False, "error": str(exc)}

    if engaged.get("found"):
        with db() as conn:
            conn.execute(
                "UPDATE warm_events SET status = ?, updated_at = ? WHERE id = ?",
                ("important" if mark_important else "opened", now(), event_id),
            )
            conn.execute(
                "UPDATE accounts SET last_recv_at = ? WHERE id = ?",
                (now(), receiver["id"]),
            )

    reply_id = None
    if auto_reply and engaged.get("found"):
        try:
            reply_subject = subject if subject.lower().startswith("re:") else f"Re: {subject}"
            reply_body = (
                f"Thanks {from_name.split()[0]} — got it. Will follow up soon.\n\n{to_name}"
            )
            # slight delay so it looks human
            time.sleep(random.uniform(2, 8))
            reply = send_from_account(
                receiver,
                to_email=sender["email"],
                subject=reply_subject,
                body=reply_body,
                in_reply_to=message_id,
            )
            reply_id = reply.get("message_id")
            with db() as conn:
                conn.execute(
                    "UPDATE warm_events SET status = 'replied', updated_at = ? WHERE id = ?",
                    (now(), event_id),
                )
        except Exception as exc:
            with db() as conn:
                conn.execute(
                    """
                    UPDATE warm_events
                    SET error = ?, updated_at = ?
                    WHERE id = ?
                    """,
                    (f"reply_failed: {exc}"[:500], now(), event_id),
                )

    return {
        "ok": True,
        "event_id": event_id,
        "from": sender["email"],
        "to": receiver["email"],
        "subject": subject,
        "engaged": engaged.get("found", False),
        "replied": bool(reply_id),
    }


def recent_events(limit: int = 40) -> list[dict[str, Any]]:
    with db() as conn:
        rows = conn.execute(
            """
            SELECT e.*, a1.email AS from_email, a2.email AS to_email
            FROM warm_events e
            JOIN accounts a1 ON a1.id = e.from_account_id
            JOIN accounts a2 ON a2.id = e.to_account_id
            ORDER BY e.id DESC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()
    return [dict(r) for r in rows]


def stats() -> dict[str, Any]:
    with db() as conn:
        total = conn.execute("SELECT COUNT(*) AS c FROM accounts WHERE enabled = 1").fetchone()["c"]
        warm_on = conn.execute(
            "SELECT COUNT(*) AS c FROM accounts WHERE enabled = 1 AND warm_enabled = 1"
        ).fetchone()["c"]
        sent_today = conn.execute(
            """
            SELECT COUNT(*) AS c FROM warm_events
            WHERE status != 'failed' AND created_at >= ?
            """,
            (now() - 86400,),
        ).fetchone()["c"]
        failed = conn.execute(
            "SELECT COUNT(*) AS c FROM warm_events WHERE status = 'failed' AND created_at >= ?",
            (now() - 86400,),
        ).fetchone()["c"]
    return {
        "accounts": total,
        "warming": warm_on,
        "sent_24h": sent_today,
        "failed_24h": failed,
        "running": get_setting("warmer_running", "0") == "1",
    }
