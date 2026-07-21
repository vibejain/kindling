#!/usr/bin/env python3
"""Start the Kindling dashboard."""

from __future__ import annotations

import uvicorn

from app.config import get_settings

if __name__ == "__main__":
    s = get_settings()
    uvicorn.run(
        "app.main:app",
        host=s.host,
        port=s.port,
        reload=s.host in ("127.0.0.1", "localhost"),
    )
