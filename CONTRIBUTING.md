# Contributing

Thanks for helping improve Kindling.

## Setup

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# set APP_SECRET to a long random string
python run.py
```

Or: `docker compose up --build`

## Guidelines

- Keep PRs focused and small
- No secrets in commits (`.env`, `client_secret*.json`, `data/`, real mailboxes)
- Match existing style; prefer clarity over cleverness
- Update README only when behavior or setup changes
- Use only owned mailboxes when testing sends

## Ideas that fit v1

- Better ramp schedules
- More natural reply templates
- Export / import account configs (sans secrets)
- Webhook / Slack notify on failed cycles

## Ideas for later

- Full LLM thread engine (out of scope for core warmer)
- Multi-user auth / teams

## License

By contributing, you agree your work is licensed under the MIT License.
