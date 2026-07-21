#!/usr/bin/env python3
"""Start the Kindling dashboard."""

from __future__ import annotations

import uvicorn

from app.config import get_settings

if __name__ == "__main__":
    s = get_settings()
    # Reload only for local desktop; production (systemd / Docker) stays single-process.
    reload = s.host in ("127.0.0.1", "localhost") and not (s.app_base_url or "").startswith("https://")
    uvicorn.run(
        "app.main:app",
        host=s.host,
        port=s.port,
        reload=reload,
    )
