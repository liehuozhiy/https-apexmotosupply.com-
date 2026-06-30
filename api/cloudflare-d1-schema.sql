CREATE TABLE IF NOT EXISTS site_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  ip TEXT,
  country TEXT,
  path TEXT,
  title TEXT,
  referrer TEXT,
  user_agent TEXT,
  language TEXT,
  screen TEXT,
  timezone TEXT,
  client_hints TEXT
);

CREATE INDEX IF NOT EXISTS idx_site_visits_created_at ON site_visits (created_at);
CREATE INDEX IF NOT EXISTS idx_site_visits_ip ON site_visits (ip);
CREATE INDEX IF NOT EXISTS idx_site_visits_country ON site_visits (country);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  model TEXT,
  quantity TEXT,
  message TEXT NOT NULL,
  source_url TEXT,
  status TEXT NOT NULL DEFAULT 'unread',
  ip TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries (email);
