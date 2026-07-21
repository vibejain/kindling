#!/usr/bin/env bash
# Opens Google Cloud Console pages for Gmail OAuth setup.
set -euo pipefail

BASE="https://console.cloud.google.com"

echo "Kindling — Gmail OAuth setup"
echo
echo "1) Create (or select) a Google Cloud project"
echo "   ${BASE}/projectcreate"
echo
echo "2) Enable Gmail API"
echo "   ${BASE}/apis/library/gmail.googleapis.com"
echo
echo "3) Configure OAuth consent screen (External; add your Gmail as a test user)"
echo "   ${BASE}/auth/overview"
echo
echo "4) Create OAuth Client ID → Application type: Web application"
echo "   Name: Kindling"
echo "   Authorized redirect URI:"
echo "   http://127.0.0.1:8787/auth/gmail/callback"
echo "   (use your public URL + /auth/gmail/callback when deployed)"
echo "   ${BASE}/auth/clients/create"
echo
echo "5) Paste into .env:"
echo "   GOOGLE_CLIENT_ID=..."
echo "   GOOGLE_CLIENT_SECRET=..."
echo

if command -v open >/dev/null 2>&1; then
  open "${BASE}/apis/library/gmail.googleapis.com"
  sleep 1
  open "${BASE}/auth/clients/create"
fi
