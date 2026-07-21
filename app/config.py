from __future__ import annotations

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
DB_PATH = DATA_DIR / "warmer.sqlite3"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(ROOT / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_secret: str = "dev-only-change-me"
    app_base_url: str = "http://127.0.0.1:8787"
    host: str = "127.0.0.1"
    port: int = 8787
    google_client_id: str = ""
    google_client_secret: str = ""

    # Dashboard login (hash preferred; plain AUTH_PASSWORD hashed on first boot)
    auth_username: str = "admin"
    auth_password_hash: str = ""
    auth_password: str = ""
    session_days: int = 14

    # Web Push (VAPID). Required for iPhone Home Screen notifications.
    vapid_public_key: str = ""
    vapid_private_key: str = ""
    vapid_subject: str = "mailto:admin@example.com"


def get_settings() -> Settings:
    return Settings()
