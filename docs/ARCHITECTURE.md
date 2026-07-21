# Kindling

Python FastAPI app that warms a mesh of owned mailboxes (Gmail OAuth + IMAP/SMTP).

## Layout

```
app/
  main.py           # FastAPI routes + scheduler
  warmer.py         # warm cycle logic
  accounts.py       # account CRUD + send/engage
  providers/        # gmail_oauth, imap_smtp
  templates/        # dashboard UI
  static/
data/               # sqlite + secrets (gitignored)
scripts/setup_oauth.sh
Dockerfile
docker-compose.yml
```

## Dev notes

- Settings live in SQLite `settings` table + `.env` for secrets/OAuth
- Templates seeded in `db.DEFAULT_TEMPLATES`
- Scheduler ticks every 5 minutes when `warmer_running=1`
