import { DateTime } from "luxon";

export function startClock(targetId = "hh") {
  const target = document.getElementById(targetId);

  if (!target) {
    throw new Error(`Element with id "${targetId}" was not found.`);
  }

  const render = () => {
    target.textContent = DateTime.local()
      .setLocale("ru")
      .toFormat("dd.LL.y HH:mm:ss");
  };

  render();
  setInterval(render, 1000);
}
