from __future__ import annotations

import email
import email.utils
import imaplib
import logging
import smtplib
import time
from email.message import EmailMessage
from typing import Any

log = logging.getLogger(__name__)


def test_login(
    *,
    email_addr: str,
    password: str,
    smtp_host: str,
    smtp_port: int,
    imap_host: str,
    imap_port: int,
) -> None:
    if smtp_port == 465:
        with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=30) as smtp:
            smtp.login(email_addr, password)
    else:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as smtp:
            smtp.starttls()
            smtp.login(email_addr, password)

    with imaplib.IMAP4_SSL(imap_host, imap_port) as im:
        im.login(email_addr, password)


def send_mail(
    *,
    email_addr: str,
    password: str,
    smtp_host: str,
    smtp_port: int,
    imap_host: str,
    imap_port: int,
    to_email: str,
    subject: str,
    body: str,
    from_name: str = "",
    in_reply_to: str | None = None,
) -> dict[str, str]:
    msg = EmailMessage()
    domain = email_addr.split("@")[-1]
    msg["From"] = (
        email.utils.formataddr((from_name, email_addr)) if from_name else email_addr
    )
    msg["To"] = to_email
    msg["Subject"] = subject
    msg["Date"] = email.utils.formatdate(localtime=True)
    msg["Message-ID"] = email.utils.make_msgid(domain=domain)
    if in_reply_to:
        msg["In-Reply-To"] = in_reply_to
        msg["References"] = in_reply_to
    msg.set_content(body)

    if smtp_port == 465:
        with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=30) as smtp:
            smtp.login(email_addr, password)
            smtp.send_message(msg)
    else:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as smtp:
            smtp.starttls()
            smtp.login(email_addr, password)
            smtp.send_message(msg)

    try:
        _append_sent(imap_host, imap_port, email_addr, password, msg)
    except Exception:
        log.debug("Could not append message to Sent folder for %s", email_addr, exc_info=True)

    return {"message_id": msg["Message-ID"], "provider_id": "", "thread_id": ""}


def _append_sent(
    imap_host: str,
    imap_port: int,
    email_addr: str,
    password: str,
    msg: EmailMessage,
) -> None:
    with imaplib.IMAP4_SSL(imap_host, imap_port) as im:
        im.login(email_addr, password)
        for folder in ("Sent", "INBOX.Sent", "Sent Items", "[Gmail]/Sent Mail"):
            try:
                im.append(
                    folder,
                    "\\Seen",
                    imaplib.Time2Internaldate(time.time()),
                    msg.as_bytes(),
                )
                return
            except Exception:
                continue


def find_and_engage(
    *,
    email_addr: str,
    password: str,
    imap_host: str,
    imap_port: int,
    rfc822_message_id: str,
    mark_important: bool = True,
) -> dict[str, Any]:
    """Locate a message by Message-ID, mark seen + flagged/important."""
    mid = rfc822_message_id.strip()
    if not mid.startswith("<"):
        mid = f"<{mid}>"

    with imaplib.IMAP4_SSL(imap_host, imap_port) as im:
        im.login(email_addr, password)
        im.select("INBOX")
        # IMAP SEARCH HEADER Message-ID
        typ, data = im.search(None, "HEADER", "Message-ID", mid)
        if typ != "OK" or not data or not data[0]:
            # Gmail / some hosts want without brackets
            typ, data = im.search(
                None, "HEADER", "Message-ID", mid.strip("<>")
            )
        if typ != "OK" or not data or not data[0]:
            return {"found": False}

        uid = data[0].split()[-1]
        flags = ["\\Seen"]
        if mark_important:
            flags.append("\\Flagged")
        im.store(uid, "+FLAGS", f"({' '.join(flags)})")

        # Best-effort Gmail important via X-GM-LABELS
        if mark_important:
            try:
                im.store(uid, "+X-GM-LABELS", "(\\Important)")
            except Exception:
                log.debug("X-GM-LABELS not supported for %s", email_addr)

        return {"found": True, "uid": uid.decode() if isinstance(uid, bytes) else str(uid)}


def gmail_app_password_hosts() -> dict[str, Any]:
    return {
        "smtp_host": "smtp.gmail.com",
        "smtp_port": 465,
        "imap_host": "imap.gmail.com",
        "imap_port": 993,
    }
