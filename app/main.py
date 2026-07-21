from __future__ import annotations

import secrets
import time
from pathlib import Path
from typing import Any

from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.accounts import (
    delete_account,
    list_accounts,
    set_warm_enabled,
    upsert_account,
)
from app.db import get_setting, init_db, set_setting
from app.providers import gmail_oauth, imap_smtp
from app.warmer import recent_events, run_warm_cycle, stats

BASE = Path(__file__).resolve().parent
templates = Jinja2Templates(directory=str(BASE / "templates"))


def _fmt_ts(value: Any) -> str:
    try:
        return time.strftime("%b %d %H:%M", time.localtime(float(value)))
    except Exception:
        return str(value)


templates.env.filters["fmt_ts"] = _fmt_ts

app = FastAPI(title="Kindling", description="Open-source email warmer")
app.mount("/static", StaticFiles(directory=str(BASE / "static")), name="static")

scheduler = BackgroundScheduler()
_oauth_states: dict[str, str] = {}


@app.on_event("startup")
def on_startup() -> None:
    init_db()
    if not scheduler.running:
        scheduler.add_job(
            _tick_warmer,
            "interval",
            minutes=5,
            id="warm_tick",
            replace_existing=True,
            max_instances=1,
        )
        scheduler.start()


@app.on_event("shutdown")
def on_shutdown() -> None:
    if scheduler.running:
        scheduler.shutdown(wait=False)


def _tick_warmer() -> None:
    if get_setting("warmer_running", "0") != "1":
        return
    try:
        run_warm_cycle()
    except Exception:
        pass


def _ctx(request: Request, **extra: Any) -> dict[str, Any]:
    return {
        "request": request,
        "stats": stats(),
        "accounts": list_accounts(),
        "events": recent_events(30),
        "oauth_ready": gmail_oauth.oauth_configured(),
        "settings": {
            "daily_limit_per_account": get_setting("daily_limit_per_account", "4"),
            "min_gap_minutes": get_setting("min_gap_minutes", "45"),
            "mark_important": get_setting("mark_important", "1"),
            "auto_reply": get_setting("auto_reply", "1"),
            "warmer_running": get_setting("warmer_running", "0"),
        },
        **extra,
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", _ctx(request))


@app.post("/accounts/imap")
def add_imap_account(
    email: str = Form(...),
    password: str = Form(...),
    display_name: str = Form(""),
    smtp_host: str = Form(...),
    smtp_port: int = Form(465),
    imap_host: str = Form(...),
    imap_port: int = Form(993),
    preset: str = Form(""),
):
    email = email.strip().lower()
    if preset == "gmail":
        hosts = imap_smtp.gmail_app_password_hosts()
        smtp_host = hosts["smtp_host"]
        smtp_port = hosts["smtp_port"]
        imap_host = hosts["imap_host"]
        imap_port = hosts["imap_port"]

    try:
        imap_smtp.test_login(
            email_addr=email,
            password=password,
            smtp_host=smtp_host,
            smtp_port=smtp_port,
            imap_host=imap_host,
            imap_port=imap_port,
        )
    except Exception as exc:
        return RedirectResponse(
            f"/?err=login_failed&detail={str(exc)[:120]}", status_code=303
        )

    upsert_account(
        email=email,
        display_name=display_name.strip() or email.split("@")[0].title(),
        provider="imap_smtp",
        secret={
            "password": password,
            "smtp_host": smtp_host,
            "smtp_port": smtp_port,
            "imap_host": imap_host,
            "imap_port": imap_port,
        },
    )
    return RedirectResponse("/?ok=account_added", status_code=303)


@app.get("/auth/gmail")
def gmail_connect():
    if not gmail_oauth.oauth_configured():
        return RedirectResponse("/?err=oauth_not_configured", status_code=303)
    state = secrets.token_urlsafe(24)
    flow = gmail_oauth.build_auth_flow(state=state)
    auth_url, _ = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="consent",
    )
    _oauth_states[state] = "1"
    return RedirectResponse(auth_url)


@app.get("/auth/gmail/callback")
def gmail_callback(
    request: Request,
    code: str | None = None,
    state: str | None = None,
    error: str | None = None,
):
    if error:
        return RedirectResponse(f"/?err={error}", status_code=303)
    if not code or not state or state not in _oauth_states:
        return RedirectResponse("/?err=oauth_state", status_code=303)
    _oauth_states.pop(state, None)
    flow = gmail_oauth.build_auth_flow(state=state)
    flow.fetch_token(code=code)
    creds = flow.credentials
    email = gmail_oauth.fetch_profile_email(creds)
    upsert_account(
        email=email,
        display_name=email.split("@")[0].title(),
        provider="gmail_oauth",
        secret=gmail_oauth.credentials_to_dict(creds),
    )
    return RedirectResponse("/?ok=gmail_connected", status_code=303)


@app.post("/accounts/{account_id}/toggle")
def toggle_account(account_id: int, warm_enabled: int = Form(0)):
    set_warm_enabled(account_id, bool(warm_enabled))
    return RedirectResponse("/", status_code=303)


@app.post("/accounts/{account_id}/delete")
def remove_account(account_id: int):
    delete_account(account_id)
    return RedirectResponse("/", status_code=303)


@app.post("/warmer/start")
def warmer_start():
    set_setting("warmer_running", "1")
    return RedirectResponse("/", status_code=303)


@app.post("/warmer/stop")
def warmer_stop():
    set_setting("warmer_running", "0")
    return RedirectResponse("/", status_code=303)


@app.post("/warmer/run-once")
def warmer_run_once():
    was = get_setting("warmer_running", "0")
    set_setting("warmer_running", "1")
    try:
        run_warm_cycle()
    finally:
        set_setting("warmer_running", was)
    return RedirectResponse("/", status_code=303)


@app.post("/settings")
def save_settings(
    daily_limit_per_account: int = Form(4),
    min_gap_minutes: int = Form(45),
    mark_important: int = Form(0),
    auto_reply: int = Form(0),
):
    set_setting("daily_limit_per_account", str(max(1, min(daily_limit_per_account, 40))))
    set_setting("min_gap_minutes", str(max(5, min_gap_minutes)))
    set_setting("mark_important", "1" if mark_important else "0")
    set_setting("auto_reply", "1" if auto_reply else "0")
    return RedirectResponse("/", status_code=303)
