# Security Policy

## Supported use

Kindling is a **self-hosted email warmer** for mailboxes **you own and control**.

Do **not** use it to:

- Warm purchased, rented, or third-party inboxes
- Send unsolicited bulk mail or spam
- Bypass provider abuse or anti-spam systems

Misuse can violate provider terms and applicable law. You are responsible for how you run it.

## Reporting a vulnerability

Report security issues privately via [GitHub Security Advisories](https://github.com/vibejain/kindling/security/advisories/new) on this repository.

Do **not** open a public issue that includes real credentials, OAuth secrets, mailbox dumps, or personal data.

## Secrets handling

- Store secrets only in `.env` (never commit it) or your host’s secret store.
- Mailbox passwords and OAuth tokens are encrypted at rest with Fernet keys derived from `APP_SECRET`.
- Keep `APP_SECRET` long and random. Rotating it invalidates existing encrypted blobs unless you re-add accounts.
- Prefer Gmail OAuth over App Passwords when practical.
- Protect `data/` (SQLite DB). Treat backups of `data/` as sensitive.
