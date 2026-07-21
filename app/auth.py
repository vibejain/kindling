from __future__ import annotations

import logging
import secrets
from pathlib import Path
from typing import Any

import bcrypt
from itsdangerous import BadSignature, URLSafeTimedSerializer
from starlette.requests import Request
from starlette.responses import RedirectResponse, Response

from app.config import get_settings
from app.db import get_setting, set_setting

log = logging.getLogger("kindling.auth")

COOKIE_NAME = "kindling_session"
PUBLIC_PATHS = {
    "/login",
    "/health",
    "/manifest.webmanifest",
    "/sw.js",
    "/static",
}


def _serializer() -> URLSafeTimedSerializer:
    return URLSafeTimedSerializer(
        get_settings().app_secret,
        salt="kindling-session-v1",
    )


def ensure_password_hash() -> None:
    """Hash AUTH_PASSWORD into settings on first boot if no hash stored yet."""
    settings = get_settings()
    stored = get_setting("auth_password_hash", "") or settings.auth_password_hash
    if stored:
        if not get_setting("auth_password_hash", "") and settings.auth_password_hash:
            set_setting("auth_password_hash", settings.auth_password_hash)
        return
    if settings.auth_password:
        hashed = bcrypt.hashpw(
            settings.auth_password.encode("utf-8"),
            bcrypt.gensalt(rounds=12),
        ).decode("ascii")
        set_setting("auth_password_hash", hashed)
        log.info("AUTH_PASSWORD hashed into settings store")
        return
    log.warning("No AUTH_PASSWORD_HASH or AUTH_PASSWORD configured")


def _password_hash() -> str:
    return get_setting("auth_password_hash", "") or get_settings().auth_password_hash


def username() -> str:
    return get_settings().auth_username or "admin"


def verify_credentials(user: str, password: str) -> bool:
    expected_user = username()
    hashed = _password_hash()
    if not hashed or not secrets.compare_digest(user.strip(), expected_user):
        # Still burn a bcrypt cycle to reduce timing leaks on missing hash.
        bcrypt.checkpw(b"x", bcrypt.hashpw(b"x", bcrypt.gensalt(rounds=12)))
        return False
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("ascii"))
    except (ValueError, TypeError):
        return False


def create_session_token(user: str) -> str:
    return _serializer().dumps({"u": user, "n": secrets.token_hex(8)})


def read_session_token(token: str) -> dict[str, Any] | None:
    settings = get_settings()
    max_age = max(3600, int(settings.session_days) * 86400)
    try:
        data = _serializer().loads(token, max_age=max_age)
    except BadSignature:
        return None
    if not isinstance(data, dict) or data.get("u") != username():
        return None
    return data


def is_authenticated(request: Request) -> bool:
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        return False
    return read_session_token(token) is not None


def set_session_cookie(response: Response, token: str) -> None:
    settings = get_settings()
    secure = settings.app_base_url.lower().startswith("https://")
    response.set_cookie(
        COOKIE_NAME,
        token,
        max_age=max(3600, int(settings.session_days) * 86400),
        httponly=True,
        secure=secure,
        samesite="lax",
        path="/",
    )


def clear_session_cookie(response: Response) -> None:
    response.delete_cookie(COOKIE_NAME, path="/")


def path_is_public(path: str) -> bool:
    if path in PUBLIC_PATHS:
        return True
    if path.startswith("/static/"):
        return True
    if path.startswith("/icons/"):
        return True
    return False


def login_redirect(request: Request) -> RedirectResponse:
    nxt = request.url.path
    if request.url.query:
        nxt = f"{nxt}?{request.url.query}"
    if nxt in ("/", "/login"):
        return RedirectResponse("/login", status_code=303)
    from urllib.parse import quote

    return RedirectResponse(f"/login?next={quote(nxt, safe='')}", status_code=303)


def icon_paths() -> list[Path]:
    base = Path(__file__).resolve().parent / "static" / "icons"
    return [base / "icon-192.png", base / "icon-512.png"]
