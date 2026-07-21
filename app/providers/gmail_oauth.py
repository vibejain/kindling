from __future__ import annotations

import base64
import email.utils
from email.message import EmailMessage
from typing import Any

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build

from app.config import get_settings

SCOPES = [
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/userinfo.email",
    "openid",
]


def oauth_configured() -> bool:
    s = get_settings()
    return bool(s.google_client_id and s.google_client_secret)


def _client_config() -> dict[str, Any]:
    s = get_settings()
    return {
        "web": {
            "client_id": s.google_client_id,
            "client_secret": s.google_client_secret,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": [f"{s.app_base_url.rstrip('/')}/auth/gmail/callback"],
        }
    }


def build_auth_flow(state: str | None = None) -> Flow:
    s = get_settings()
    flow = Flow.from_client_config(
        _client_config(),
        scopes=SCOPES,
        state=state,
        redirect_uri=f"{s.app_base_url.rstrip('/')}/auth/gmail/callback",
    )
    return flow


def credentials_to_dict(creds: Credentials) -> dict[str, Any]:
    return {
        "token": creds.token,
        "refresh_token": creds.refresh_token,
        "token_uri": creds.token_uri,
        "client_id": creds.client_id,
        "client_secret": creds.client_secret,
        "scopes": list(creds.scopes or SCOPES),
    }


def credentials_from_dict(data: dict[str, Any]) -> Credentials:
    creds = Credentials.from_authorized_user_info(data, SCOPES)
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    return creds


def gmail_service(creds: Credentials):
    return build("gmail", "v1", credentials=creds, cache_discovery=False)


def fetch_profile_email(creds: Credentials) -> str:
    svc = gmail_service(creds)
    profile = svc.users().getProfile(userId="me").execute()
    return (profile.get("emailAddress") or "").lower()


def send_mail(
    creds: Credentials,
    *,
    to_email: str,
    subject: str,
    body: str,
    from_name: str = "",
    in_reply_to: str | None = None,
) -> dict[str, str]:
    msg = EmailMessage()
    profile_email = fetch_profile_email(creds)
    msg["From"] = (
        email.utils.formataddr((from_name, profile_email)) if from_name else profile_email
    )
    msg["To"] = to_email
    msg["Subject"] = subject
    msg["Date"] = email.utils.formatdate(localtime=True)
    msg["Message-ID"] = email.utils.make_msgid(domain=profile_email.split("@")[-1])
    if in_reply_to:
        msg["In-Reply-To"] = in_reply_to
        msg["References"] = in_reply_to
    msg.set_content(body)

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode("utf-8")
    svc = gmail_service(creds)
    sent = (
        svc.users()
        .messages()
        .send(userId="me", body={"raw": raw})
        .execute()
    )
    return {
        "provider_id": sent.get("id", ""),
        "thread_id": sent.get("threadId", ""),
        "message_id": msg["Message-ID"],
    }


def find_message_by_rfc822(
    creds: Credentials, rfc822_message_id: str
) -> dict[str, Any] | None:
    svc = gmail_service(creds)
    q = f"rfc822msgid:{rfc822_message_id.strip('<>')}"
    res = svc.users().messages().list(userId="me", q=q, maxResults=1).execute()
    msgs = res.get("messages") or []
    if not msgs:
        return None
    return (
        svc.users()
        .messages()
        .get(userId="me", id=msgs[0]["id"], format="metadata")
        .execute()
    )


def mark_important_and_read(creds: Credentials, gmail_id: str) -> None:
    svc = gmail_service(creds)
    svc.users().messages().modify(
        userId="me",
        id=gmail_id,
        body={
            "addLabelIds": ["IMPORTANT", "STARRED"],
            "removeLabelIds": ["UNREAD"],
        },
    ).execute()
