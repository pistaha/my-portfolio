import { DateTime } from "luxon";

export function getCurrentDateTime() {
  return DateTime.local().setLocale("ru").toFormat("dd.MM.yyyy HH:mm:ss");
}
