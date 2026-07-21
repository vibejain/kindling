from __future__ import annotations

from typing import Any

from app import crypto
from app.db import db, dumps, loads, now, row_to_dict
from app.providers import gmail_oauth, imap_smtp


def list_accounts(include_secrets: bool = False) -> list[dict[str, Any]]:
    with db() as conn:
        rows = conn.execute(
            "SELECT * FROM accounts ORDER BY email ASC"
        ).fetchall()
    out = []
    for r in rows:
        d = dict(r)
        secret = loads(crypto.decrypt(d.pop("secret_blob")))
        if include_secrets:
            d["secret"] = secret
        else:
            d["has_refresh"] = bool(secret.get("refresh_token") or secret.get("password"))
        out.append(d)
    return out


def get_account(account_id: int, *, with_secret: bool = False) -> dict[str, Any] | None:
    with db() as conn:
        row = conn.execute(
            "SELECT * FROM accounts WHERE id = ?", (account_id,)
        ).fetchone()
    d = row_to_dict(row)
    if not d:
        return None
    secret = loads(crypto.decrypt(d.pop("secret_blob")))
    if with_secret:
        d["secret"] = secret
    return d


def upsert_account(
    *,
    email: str,
    display_name: str,
    provider: str,
    secret: dict[str, Any],
) -> int:
    email = email.lower().strip()
    blob = crypto.encrypt(dumps(secret))
    with db() as conn:
        existing = conn.execute(
            "SELECT id FROM accounts WHERE email = ?", (email,)
        ).fetchone()
        if existing:
            conn.execute(
                """
                UPDATE accounts
                SET display_name = ?, provider = ?, secret_blob = ?, enabled = 1
                WHERE id = ?
                """,
                (display_name, provider, blob, existing["id"]),
            )
            return int(existing["id"])
        cur = conn.execute(
            """
            INSERT INTO accounts
              (email, display_name, provider, secret_blob, enabled, warm_enabled, created_at)
            VALUES (?, ?, ?, ?, 1, 1, ?)
            """,
            (email, display_name, provider, blob, now()),
        )
        return int(cur.lastrowid)


def set_warm_enabled(account_id: int, enabled: bool) -> None:
    with db() as conn:
        conn.execute(
            "UPDATE accounts SET warm_enabled = ? WHERE id = ?",
            (1 if enabled else 0, account_id),
        )


def delete_account(account_id: int) -> None:
    with db() as conn:
        conn.execute("DELETE FROM warm_events WHERE from_account_id = ? OR to_account_id = ?",
                     (account_id, account_id))
        conn.execute("DELETE FROM accounts WHERE id = ?", (account_id,))


def send_from_account(
    account: dict[str, Any],
    *,
    to_email: str,
    subject: str,
    body: str,
    in_reply_to: str | None = None,
) -> dict[str, str]:
    secret = account["secret"]
    name = account.get("display_name") or account["email"].split("@")[0]
    if account["provider"] == "gmail_oauth":
        creds = gmail_oauth.credentials_from_dict(secret)
        # persist refreshed token
        upsert_account(
            email=account["email"],
            display_name=account.get("display_name") or "",
            provider="gmail_oauth",
            secret=gmail_oauth.credentials_to_dict(creds),
        )
        return gmail_oauth.send_mail(
            creds,
            to_email=to_email,
            subject=subject,
            body=body,
            from_name=name,
            in_reply_to=in_reply_to,
        )

    return imap_smtp.send_mail(
        email_addr=account["email"],
        password=secret["password"],
        smtp_host=secret["smtp_host"],
        smtp_port=int(secret["smtp_port"]),
        imap_host=secret["imap_host"],
        imap_port=int(secret["imap_port"]),
        to_email=to_email,
        subject=subject,
        body=body,
        from_name=name,
        in_reply_to=in_reply_to,
    )


def engage_received(
    account: dict[str, Any],
    *,
    rfc822_message_id: str,
    mark_important: bool = True,
) -> dict[str, Any]:
    secret = account["secret"]
    if account["provider"] == "gmail_oauth":
        creds = gmail_oauth.credentials_from_dict(secret)
        upsert_account(
            email=account["email"],
            display_name=account.get("display_name") or "",
            provider="gmail_oauth",
            secret=gmail_oauth.credentials_to_dict(creds),
        )
        found = gmail_oauth.find_message_by_rfc822(creds, rfc822_message_id)
        if not found:
            return {"found": False}
        if mark_important:
            gmail_oauth.mark_important_and_read(creds, found["id"])
        return {"found": True, "provider_id": found["id"]}

    return imap_smtp.find_and_engage(
        email_addr=account["email"],
        password=secret["password"],
        imap_host=secret["imap_host"],
        imap_port=int(secret["imap_port"]),
        rfc822_message_id=rfc822_message_id,
        mark_important=mark_important,
    )
