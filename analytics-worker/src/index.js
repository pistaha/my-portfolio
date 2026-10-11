const EVENTS = new Set(["home", "projects", "design_collection", "design_item"]);
const ITEM_ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/;
const MOSCOW_DAY_START = "strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '+3 hours', 'start of day', '-3 hours')";

async function removeOlderEvents(db) {
  await db.prepare(`DELETE FROM analytics_events WHERE created_at < ${MOSCOW_DAY_START}`).run();
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": origin,
      "Vary": "Origin",
    },
  });
}

function isAllowedOrigin(request, env) {
  return request.headers.get("Origin") === env.ALLOWED_ORIGIN;
}

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN;
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      if (!isAllowedOrigin(request, env)) return new Response(null, { status: 403 });
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Max-Age": "86400",
          "Vary": "Origin",
        },
      });
    }

    if (!isAllowedOrigin(request, env)) return json({ error: "origin_not_allowed" }, 403, origin);

    if (url.pathname === "/event" && request.method === "POST") {
      let payload;
      try {
        payload = await request.json();
      } catch {
        return json({ error: "invalid_json" }, 400, origin);
      }

      const { event, itemId = null } = payload || {};
      if (!EVENTS.has(event)) return json({ error: "invalid_event" }, 400, origin);
      if (event === "design_item" ? typeof itemId !== "string" || !ITEM_ID.test(itemId) : itemId !== null) {
        return json({ error: "invalid_item_id" }, 400, origin);
      }

      await removeOlderEvents(env.DB);
      await env.DB.prepare(
        "INSERT INTO analytics_events (event, item_id) VALUES (?, ?)",
      ).bind(event, itemId).run();
      return json({ ok: true }, 202, origin);
    }

    if (url.pathname === "/stats" && request.method === "GET") {
      const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
      if (!env.ANALYTICS_ADMIN_TOKEN || token !== env.ANALYTICS_ADMIN_TOKEN) {
        return json({ error: "unauthorized" }, 401, origin);
      }

      await removeOlderEvents(env.DB);
      const result = await env.DB.prepare(
        `SELECT event, item_id, COUNT(*) AS count FROM analytics_events
         WHERE created_at >= ${MOSCOW_DAY_START}
         GROUP BY event, item_id ORDER BY event, item_id`,
      ).all();
      const today = await env.DB.prepare("SELECT date('now', '+3 hours') AS date").first();
      const totals = { home: 0, projects: 0, design_collection: 0 };
      const designItems = [];
      for (const row of result.results || []) {
        if (row.event === "design_item") designItems.push({ id: row.item_id, count: row.count });
        else totals[row.event] = row.count;
      }

      return json({ date: today.date, timezone: "Europe/Moscow", totals, designItems, totalEvents: (result.results || []).reduce((sum, row) => sum + row.count, 0) }, 200, origin);
    }

    return json({ error: "not_found" }, 404, origin);
  },

  async scheduled(_event, env) {
    await removeOlderEvents(env.DB);
  },
};
