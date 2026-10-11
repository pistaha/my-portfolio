CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL CHECK (event IN ('home', 'projects', 'design_collection', 'design_item')),
  item_id TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  CHECK (
    (event = 'design_item' AND item_id IS NOT NULL) OR
    (event != 'design_item' AND item_id IS NULL)
  )
);

CREATE INDEX IF NOT EXISTS analytics_events_event_item
  ON analytics_events (event, item_id);
