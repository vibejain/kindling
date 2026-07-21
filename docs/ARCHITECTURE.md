# Kindling

Python FastAPI app that warms a mesh of owned mailboxes (Gmail OAuth + IMAP/SMTP).

## Layout

```
app/
  main.py           # FastAPI routes + scheduler
  warmer.py         # warm cycle logic
  accounts.py       # account CRUD + send/engage
  crypto.py         # Fernet encrypt/decrypt for secrets
  providers/        # gmail_oauth, imap_smtp
  templates/        # dashboard UI
  static/
data/               # sqlite + secrets (gitignored)
scripts/setup_oauth.sh
Dockerfile
docker-compose.yml
```

## Flow

Scheduler (every 5 minutes when `warmer_running=1`) picks two active accounts, sends a template email, engages on the receiver (star/important), optionally replies. Limits come from the `settings` table; OAuth and `APP_SECRET` come from `.env`.

## Dev notes

- Templates are seeded once in `db.DEFAULT_TEMPLATES`
- Encrypted account secrets live in `accounts.secret_blob`
- Health check: `GET /health`
