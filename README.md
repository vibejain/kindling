# Kindling

**Open-source email warmer** for Gmail and IMAP: warm a mesh of mailboxes you own before campaigns.

[![License: MIT](https://img.shields.io/badge/License-MIT-0c1117?style=flat-square)](LICENSE)
[![CI](https://github.com/vibejain/kindling/actions/workflows/ci.yml/badge.svg)](https://github.com/vibejain/kindling/actions/workflows/ci.yml)
[![Python 3.12](https://img.shields.io/badge/Python-3.12-ff6a3d?style=flat-square)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-3dcf9a?style=flat-square)](docker-compose.yml)

Self-hosted warmup: connect Gmail (OAuth or App Password) plus any IMAP/SMTP inbox. Kindling sends human-sounding thread mail between your accounts, stars or marks them important on receive, and can auto-reply, with daily limits, send gaps, dashboard login, and optional iPhone PWA push every 50 sends.

![Kindling dashboard](docs/demo.png)

> **Owned accounts only.** Not a spam tool. Use only mailboxes you control.

## Quick start (Docker)

```bash
git clone https://github.com/vibejain/kindling.git
cd kindling
cp .env.example .env
# set APP_SECRET + AUTH_PASSWORD (dashboard login)
docker compose up --build
```

Open [http://127.0.0.1:8787](http://127.0.0.1:8787) and sign in.

## Local (venv)

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # APP_SECRET + AUTH_PASSWORD
python run.py
```

## Features

| Feature | Notes |
|---------|--------|
| Multi-mailbox | Gmail OAuth, Gmail App Password, IMAP/SMTP |
| Warm mesh | Scheduler (~5 min) + run-once |
| Content engine | Optional LLM-free thread composer (`content-engine/`) |
| Engage | Star / important + optional auto-reply |
| Limits | Daily cap + min gap per account |
| Auth | Dashboard login (session cookie) |
| PWA | Add to iPhone Home Screen; Web Push every 50 successful sends |

## Environment variables

| Variable | Required | Notes |
|----------|----------|--------|
| `APP_SECRET` | **yes** | Encrypts stored credentials |
| `AUTH_USERNAME` / `AUTH_PASSWORD` | **yes** (or hash) | Dashboard login |
| `APP_BASE_URL` | for OAuth / PWA | Must match public URL |
| `HOST` / `PORT` | no | Default `127.0.0.1:8787`; use `0.0.0.0` in Docker |
| `GOOGLE_CLIENT_ID` / `SECRET` | for Gmail OAuth | Web client + redirect callback |
| `VAPID_*` | for iPhone push | Generate once; see `.env.example` |
| `CONTENT_ENGINE` | no | `1` (default when package present) or `0` |
| `DATABASE_URL` | for content engine | Postgres URL |

## Connect accounts

| Method | When to use |
|--------|-------------|
| **Gmail OAuth** | Best once you create a Google OAuth client (`./scripts/setup_oauth.sh`) |
| **Gmail App Password** | Fast path with [App Passwords](https://myaccount.google.com/apppasswords) |
| **IMAP/SMTP** | cPanel, workspace mail, any standard host |

Need **≥2** accounts with warming on. **Start warmer** or **Run one cycle**.

## Content engine (optional)

LLM-free Node package under `content-engine/`. Plans threads across business "universes", then composes micro→anchor plain-text bodies. Requires Node 20+ and Postgres.

```bash
cd content-engine && npm install
# start Postgres (see content-engine/docker-compose.yml), then:
npm run db:migrate && npm run seed:personas
# map seed emails in content-engine/src/personas/seed.ts to your real mailboxes
```

Set `DATABASE_URL` and keep `CONTENT_ENGINE_USE_LLM=0`. If the engine is down, Kindling falls back to built-in short templates.

## iPhone notifications

1. Open your Kindling URL in Safari (HTTPS required).
2. Share → **Add to Home Screen**.
3. Open from the icon → sign in → **Enable iPhone notifications**.
4. Push fires at 50 / 100 / 150… successful sends.

## Deploy on a VPS

```env
APP_BASE_URL=https://kindling.example.com
HOST=0.0.0.0
APP_SECRET=<long-random>
AUTH_PASSWORD=<strong-password>
```

Gmail OAuth redirect:

`https://kindling.example.com/auth/gmail/callback`

### One-click hosts

[![Deploy on Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/vibejain/kindling)

See [`render.yaml`](render.yaml). Persist `/app/data`.

## Security

- Owned mailboxes only.
- Never commit `.env`, OAuth secrets, or `data/`.
- Changing `APP_SECRET` without re-adding accounts breaks decryption.
- Dashboard login is required; still put TLS in front on a VPS.

See [SECURITY.md](SECURITY.md).

## Stack

Python · FastAPI · SQLite · APScheduler · Gmail API · IMAP/SMTP · optional Node content-engine · Web Push

## Contributing

PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md). If Kindling helps, **star the repo**.

## License

[MIT](LICENSE)
