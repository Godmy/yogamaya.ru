-- ============================================================
-- Yoga Maya — initial schema
-- ============================================================

CREATE TABLE IF NOT EXISTS teachers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  name        TEXT    NOT NULL,
  photo_url   TEXT,
  bio         TEXT,
  speciality  TEXT,
  languages   TEXT    DEFAULT 'es,ru',
  is_active   INTEGER NOT NULL DEFAULT 1,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS classes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  title       TEXT    NOT NULL,
  description TEXT,
  format      TEXT    NOT NULL, -- 'group','individual','kids','online','offline'
  age_group   TEXT,             -- 'adults','kids','mixed'
  duration_min INTEGER,
  price_rub   INTEGER,
  is_active   INTEGER NOT NULL DEFAULT 1,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS landing_pages (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT    NOT NULL UNIQUE,
  title         TEXT    NOT NULL,
  subtitle      TEXT,
  audience      TEXT,   -- 'moms','kids','beginners','speaking-club','trial'
  hero_text     TEXT,
  pain_points   TEXT,   -- JSON array
  offer         TEXT,
  teacher_ids   TEXT,   -- JSON array of teacher ids
  cta_text      TEXT    NOT NULL DEFAULT 'Записаться на пробное занятие',
  cta_url       TEXT    NOT NULL DEFAULT '/apply',
  is_public     INTEGER NOT NULL DEFAULT 0,
  is_active     INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS landing_variants (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  landing_id   INTEGER NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,
  ab_variant   TEXT    NOT NULL DEFAULT 'A', -- 'A','B','C'
  title        TEXT,
  subtitle     TEXT,
  hero_text    TEXT,
  cta_text     TEXT,
  weight       INTEGER NOT NULL DEFAULT 50,  -- 0-100 traffic weight
  is_active    INTEGER NOT NULL DEFAULT 1,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE(landing_id, ab_variant)
);

CREATE TABLE IF NOT EXISTS leads (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  name                 TEXT    NOT NULL,
  phone                TEXT,
  telegram             TEXT,
  email                TEXT,
  child_age            TEXT,
  learning_goal        TEXT,
  message              TEXT,
  consent              INTEGER NOT NULL DEFAULT 0,
  selected_teacher_id  INTEGER REFERENCES teachers(id),
  selected_landing_slug TEXT,
  ab_variant           TEXT,
  utm_source           TEXT,
  utm_medium           TEXT,
  utm_campaign         TEXT,
  status               TEXT    NOT NULL DEFAULT 'new', -- 'new','contacted','enrolled','declined'
  created_at           TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS events (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type    TEXT    NOT NULL, -- page_view, cta_click, lead_form_submit, ...
  landing_slug  TEXT,
  ab_variant    TEXT,
  audience      TEXT,
  button_id     TEXT,
  teacher_id    TEXT,
  path          TEXT,
  referrer      TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  user_agent    TEXT,
  ip_hash       TEXT,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS media_assets (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  key         TEXT    NOT NULL UNIQUE, -- R2 object key
  bucket      TEXT    NOT NULL DEFAULT 'yogamaya-media',
  type        TEXT    NOT NULL, -- 'image','video','document'
  mime_type   TEXT,
  alt_text    TEXT,
  caption     TEXT,
  teacher_id  INTEGER REFERENCES teachers(id),
  landing_id  INTEGER REFERENCES landing_pages(id),
  size_bytes  INTEGER,
  width       INTEGER,
  height      INTEGER,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS bot_users (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id  TEXT    NOT NULL UNIQUE,
  username     TEXT,
  first_name   TEXT,
  language     TEXT    DEFAULT 'ru',
  lead_id      INTEGER REFERENCES leads(id),
  subscribed   INTEGER NOT NULL DEFAULT 1,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS notifications (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT    NOT NULL, -- 'new_lead','system','marketing'
  title       TEXT    NOT NULL,
  body        TEXT,
  recipient   TEXT,   -- telegram_id or email
  channel     TEXT    NOT NULL DEFAULT 'telegram', -- 'telegram','email'
  status      TEXT    NOT NULL DEFAULT 'pending',  -- 'pending','sent','failed'
  lead_id     INTEGER REFERENCES leads(id),
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  sent_at     TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_events_type       ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_landing     ON events(landing_slug);
CREATE INDEX IF NOT EXISTS idx_events_created_at  ON events(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status       ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at   ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_landing_slug       ON landing_pages(slug);
