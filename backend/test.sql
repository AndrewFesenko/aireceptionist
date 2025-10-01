DROP TABLE IF EXISTS calls;

CREATE TABLE calls (
  id TEXT PRIMARY KEY,             -- use Vapi's call.id
  tenant_id INTEGER,
  from_number TEXT,
  to_number TEXT,
  status TEXT,
  summary TEXT,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ended_at DATETIME
);

DROP TABLE IF EXISTS call_turns;

CREATE TABLE call_turns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  call_id TEXT,
  role TEXT,
  text TEXT,
  FOREIGN KEY(call_id) REFERENCES calls(id)
);
