(() => {
  const searchInput = document.getElementById("search-query");
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" || searchInput.value.trim().toLowerCase() !== "admin1") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const siteRoot = document.querySelector('meta[name="portfolio-analytics-site-root"]')?.content || location.origin;
      location.assign(new URL("analytics/", siteRoot).href);
    }, true);
  }

  const apiBase = document.querySelector('meta[name="portfolio-analytics-api"]')?.content?.trim();
  if (!apiBase) return;

  const apiUrl = `${apiBase.replace(/\/+$/, "")}/event`;
  const siteRoot = document.querySelector('meta[name="portfolio-analytics-site-root"]')?.content || location.origin;
  const basePath = new URL(siteRoot, location.href).pathname.replace(/\/+$/, "") + "/";

  function send(event, itemId = null) {
    const body = JSON.stringify({ event, itemId });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(apiUrl, new Blob([body], { type: "text/plain;charset=UTF-8" }))) {
        return;
      }
    } catch (_) {
      // Fall through to fetch when sendBeacon is unavailable or blocked.
    }
    fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body,
      keepalive: true,
    }).catch(() => {});
  }

  document.addEventListener("click", (click) => {
    const projectCard = click.target.closest("[data-analytics-project], .figma-card");
    const projectId = projectCard?.dataset.analyticsProject
      || projectCard?.querySelector("[data-project-id]")?.dataset.projectId;
    if (projectId) {
      send("design_item", projectId);
      return;
    }

    const link = click.target.closest("a[href]");
    if (!link) return;

    let path;
    try {
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      path = url.pathname;
    } catch (_) {
      return;
    }

    const relativePath = path.startsWith(basePath) ? `/${path.slice(basePath.length)}` : path;
    const route = relativePath.replace(/^\/(en|zh)(?=\/)/, "").replace(/\/+$/, "") || "/";
    if (route === "/") send("home");
    else if (route === "/portfolio") send("projects");
    else if (route === "/portfolio/figma-prototypes") send("design_collection");
    else if (route === "/portfolio/energy-training-hall") send("design_item", "energy-training-hall");
  }, { capture: true });
})();
