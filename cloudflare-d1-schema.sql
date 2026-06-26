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
  timezone TEXT
);

CREATE INDEX IF NOT EXISTS idx_site_visits_created_at ON site_visits (created_at);
CREATE INDEX IF NOT EXISTS idx_site_visits_ip ON site_visits (ip);
CREATE INDEX IF NOT EXISTS idx_site_visits_country ON site_visits (country);
