-- Content Engine phase 1 schema
-- Universes, substance_level, date offsets in facts; no standalone threads.length_band

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Universes: disjoint business namespaces
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS universes (
  id              TEXT PRIMARY KEY,
  label           TEXT NOT NULL,
  locale          TEXT NOT NULL,
  timezone        TEXT NOT NULL,
  currency        TEXT NOT NULL CHECK (currency IN ('USD', 'AUD', 'GBP', 'SGD')),
  has_gst         BOOLEAN NOT NULL DEFAULT false,
  entities        JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Personas: one stable writing fingerprint per mailbox; exactly one universe
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS personas (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,
  display_name    TEXT NOT NULL,
  signature_name  TEXT NOT NULL,
  role_title      TEXT NOT NULL,
  company         TEXT NOT NULL,
  industry        TEXT NOT NULL,
  universe_id     TEXT NOT NULL REFERENCES universes(id),
  fingerprint     JSONB NOT NULL,
  similarity_notes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_personas_industry ON personas (industry);
CREATE INDEX IF NOT EXISTS idx_personas_universe ON personas (universe_id);

-- ---------------------------------------------------------------------------
-- Threads: planning unit (not individual messages)
-- length_band is NOT stored - derived from length_arc only
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE thread_status AS ENUM (
    'planned',
    'in_progress',
    'completed',
    'abandoned'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE arc_template AS ENUM (
    'DECAY',
    'ESCALATION',
    'FLAT_CHATTER',
    'BURST'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE length_band AS ENUM (
    'micro',
    'short',
    'medium',
    'long',
    'anchor'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE topic_domain AS ENUM (
    'project_status',
    'scheduling',
    'invoices',
    'scope',
    'vendor',
    'hiring',
    'legal',
    'it',
    'client_feedback',
    'ops',
    'meeting_recaps',
    'apologies'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE emotional_register AS ENUM (
    'neutral_professional',
    'friendly_casual',
    'slightly_stressed',
    'apologetic',
    'assertive',
    'warm_collaborative',
    'terse_busy'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE substance_level AS ENUM (
    'trivial',
    'routine',
    'consequential'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS threads (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  premise             TEXT NOT NULL,
  topic_domain        topic_domain NOT NULL,
  arc_template        arc_template NOT NULL,
  -- Planned per-message length sequence (band is derived from this only)
  length_arc          TEXT[] NOT NULL,
  planned_depth       INT NOT NULL CHECK (planned_depth >= 2),
  message_count       INT NOT NULL DEFAULT 0 CHECK (message_count >= 0),
  substance_level     substance_level NOT NULL,
  universe_id         TEXT NOT NULL REFERENCES universes(id),
  cross_universe      BOOLEAN NOT NULL DEFAULT false,
  persona_a_id        UUID NOT NULL REFERENCES personas(id),
  persona_b_id        UUID NOT NULL REFERENCES personas(id),
  participants        TEXT[] NOT NULL,
  emotional_register  emotional_register NOT NULL,
  open_questions      JSONB NOT NULL DEFAULT '[]'::jsonb,
  status              thread_status NOT NULL DEFAULT 'planned',
  started_at          TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (persona_a_id <> persona_b_id),
  CHECK (cardinality(participants) >= 2),
  CHECK (cardinality(length_arc) = planned_depth)
);

CREATE INDEX IF NOT EXISTS idx_threads_status ON threads (status);
CREATE INDEX IF NOT EXISTS idx_threads_topic ON threads (topic_domain);
CREATE INDEX IF NOT EXISTS idx_threads_arc ON threads (arc_template);
CREATE INDEX IF NOT EXISTS idx_threads_universe ON threads (universe_id);
CREATE INDEX IF NOT EXISTS idx_threads_substance ON threads (substance_level);
CREATE INDEX IF NOT EXISTS idx_threads_personas ON threads (persona_a_id, persona_b_id);

-- ---------------------------------------------------------------------------
-- Established facts: concrete anchors; date values use offset_days:N encoding
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS established_facts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id       UUID NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  fact_key        TEXT NOT NULL,
  fact_value      TEXT NOT NULL,
  source          TEXT NOT NULL DEFAULT 'premise',
  introduced_at_depth INT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (thread_id, fact_key),
  -- Reject absolute ISO dates in persisted fact values
  CHECK (fact_value !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$')
);

CREATE INDEX IF NOT EXISTS idx_facts_thread ON established_facts (thread_id);

-- ---------------------------------------------------------------------------
-- Messages: generated later (phase 2+). Schema reserved now.
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE message_role AS ENUM ('outbound', 'reply');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS messages (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id         UUID NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  sequence_index    INT NOT NULL CHECK (sequence_index >= 0),
  from_persona_id   UUID NOT NULL REFERENCES personas(id),
  to_persona_id     UUID NOT NULL REFERENCES personas(id),
  from_email        TEXT NOT NULL,
  to_email          TEXT NOT NULL,
  subject           TEXT NOT NULL,
  body_text         TEXT NOT NULL,
  planned_length    length_band NOT NULL,
  role              message_role NOT NULL,
  meta              JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (thread_id, sequence_index),
  CHECK (from_persona_id <> to_persona_id)
);

CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages (thread_id, sequence_index);
