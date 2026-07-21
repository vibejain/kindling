from __future__ import annotations

import json
import sqlite3
import time
from contextlib import contextmanager
from typing import Any, Iterator

from app.config import DATA_DIR, DB_PATH


def _connect() -> sqlite3.Connection:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


@contextmanager
def db() -> Iterator[sqlite3.Connection]:
    conn = _connect()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db() -> None:
    with db() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS accounts (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT NOT NULL UNIQUE,
              display_name TEXT NOT NULL DEFAULT '',
              provider TEXT NOT NULL, -- gmail_oauth | imap_smtp
              secret_blob TEXT NOT NULL, -- encrypted JSON
              enabled INTEGER NOT NULL DEFAULT 1,
              warm_enabled INTEGER NOT NULL DEFAULT 1,
              created_at REAL NOT NULL,
              last_send_at REAL,
              last_recv_at REAL
            );

            CREATE TABLE IF NOT EXISTS settings (
              key TEXT PRIMARY KEY,
              value TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS warm_events (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              from_account_id INTEGER NOT NULL,
              to_account_id INTEGER NOT NULL,
              subject TEXT NOT NULL,
              message_id TEXT,
              thread_key TEXT,
              status TEXT NOT NULL, -- sent | opened | replied | important | failed
              error TEXT,
              created_at REAL NOT NULL,
              updated_at REAL NOT NULL,
              FOREIGN KEY(from_account_id) REFERENCES accounts(id),
              FOREIGN KEY(to_account_id) REFERENCES accounts(id)
            );

            CREATE TABLE IF NOT EXISTS warm_templates (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              subject TEXT NOT NULL,
              body TEXT NOT NULL
            );
            """
        )
        n = conn.execute("SELECT COUNT(*) AS c FROM warm_templates").fetchone()["c"]
        if n == 0:
            for subject, body in DEFAULT_TEMPLATES:
                conn.execute(
                    "INSERT INTO warm_templates (subject, body) VALUES (?, ?)",
                    (subject, body),
                )
        # defaults
        defaults = {
            "daily_limit_per_account": "4",
            "min_gap_minutes": "45",
            "mark_important": "1",
            "auto_reply": "1",
            "warmer_running": "0",
        }
        for k, v in defaults.items():
            conn.execute(
                "INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)",
                (k, v),
            )


DEFAULT_TEMPLATES = [
    (
        "hey",
        "hey {to_first}, you around later?\n\n{from_first}",
    ),
    (
        "quick thing",
        "hi {to_first},\n\nrandom thought: did you end up sorting that thing from earlier?\n\n{from_first}",
    ),
    (
        "checking in",
        "hey {to_first},\n\njust checking in. hope your day's going ok.\n\n{from_first}",
    ),
    (
        "this made me laugh",
        "ok {to_first} you need to see this when you get a sec\n\n{from_first}",
    ),
    (
        "running late-ish",
        "hey, running a bit behind today. talk in a bit?\n\n{from_first}",
    ),
    (
        "coffee?",
        "{to_first}, free for a quick chat this afternoon?\n\n{from_first}",
    ),
    (
        "forgot to say",
        "hey {to_first},\n\nmeant to say thanks earlier. appreciate it.\n\n{from_first}",
    ),
    (
        "you see this?",
        "hi {to_first},\n\ndid you see my last note? no rush if you're busy.\n\n{from_first}",
    ),
    (
        "all good?",
        "hey {to_first}, everything good on your side?\n\n{from_first}",
    ),
    (
        "tiny ask",
        "quick ask: can you ping me when you're free?\n\n{from_first}",
    ),
]


def get_setting(key: str, default: str = "") -> str:
    with db() as conn:
        row = conn.execute(
            "SELECT value FROM settings WHERE key = ?", (key,)
        ).fetchone()
        return row["value"] if row else default


def set_setting(key: str, value: str) -> None:
    with db() as conn:
        conn.execute(
            "INSERT INTO settings (key, value) VALUES (?, ?) "
            "ON CONFLICT(key) DO UPDATE SET value = excluded.value",
            (key, value),
        )


def row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    if row is None:
        return None
    return dict(row)


def now() -> float:
    return time.time()


def dumps(obj: Any) -> str:
    return json.dumps(obj)


def loads(s: str) -> Any:
    return json.loads(s)
