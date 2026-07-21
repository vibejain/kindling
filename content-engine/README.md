# Content Engine

Thread-first content for email warmup. **Runs fully offline / LLM-free.** Does not send mail - generates plain-text bodies the Python warmer can request later.

No `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` required. Default path is a local template + composition engine (no `[LLM_REQUIRED]` stubs).

## What it does

1. **Planner (Phase 1)** - disjoint universes, arcs, substance, facts with `offset_days:N`
2. **Local generator** - micro/short from a large fallback bank (~1135); medium/long/anchor from premise-aware paragraph assemblers (facts, open questions, persona fingerprint, topic snippets)
3. **Validator** - em dash ban, banned words, length ±25%, fact consistency, fingerprint
4. **Slot cache** - `(thread_id, sequence_index)` never regenerated on retry
5. **Human noise** - self-correction, fake attachment, phone-style, etc. at configured rates

## Setup

```bash
cd content-engine
npm install
# Postgres (Homebrew default):
export DATABASE_URL=postgres://content_engine:content_engine@127.0.0.1:5432/content_engine
npm run db:migrate
```

LLM is optional dead code. To force the old LLM path (not recommended):

```bash
export CONTENT_ENGINE_USE_LLM=1
export OPENAI_API_KEY=...   # or ANTHROPIC_API_KEY
```

## Commands

| Script | Purpose |
|--------|---------|
| `npm run plan:sample` | Plan 40 threads + persist facts |
| `npm run generate:sample` | Generate ~200 LLM-free messages, print samples, persist |
| `npm run seed:personas` | Fingerprint distance check only |
| `npm run fallback:build` | Rebuild fallback bank (≥400) |
| `npm run typecheck` | `tsc --noEmit` |

## Python warmer integration

Call the Node CLI for each warm send (preferred on VPS):

```bash
cd content-engine
export DATABASE_URL=postgres://content_engine:content_engine@127.0.0.1:5432/content_engine
npm run warm:next -- --from sophia@meridian.example --to rachel@meridian.example
# → JSON { subject, body, thread_id, message_id, ... }
```

The Python warmer (`app/content_engine.py`) shells out to that CLI. On failure it falls back to SQLite `warm_templates` so warming never stops.

Retries must reuse the cached `(thread_id, sequence_index)` row - do not regenerate.

## Hard rules enforced

- Plain text only (no HTML / images / tracking)
- No em dashes; banned LLM vocabulary; no “hope this email finds you well”
- Length follows arc band (±25% validator tolerance)
- Links ≤12%, neutral domains only, never in micro
- Question-ending capped at 40%
- Human noise at configured corpus rates
- Consequential anchors stitch ≥4 concrete elements (dollars, files, date offsets, parties, IDs, open items, tradeoffs, corrections)

**STOP after `generate:sample` and eyeball output before live sends.**
