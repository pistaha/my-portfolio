import { DateTime } from "luxon";
import Modal from "bootstrap/js/dist/modal";
import "./style.scss";

const showTimeButton = document.getElementById("showTimeButton");
const timeValue = document.getElementById("timeValue");
const timeModalElement = document.getElementById("timeModal");

if (!showTimeButton || !timeValue || !timeModalElement) {
  throw new Error("Stage 3 markup is incomplete.");
}

const timeModal = new Modal(timeModalElement);

function getCurrentDateTime() {
  return DateTime.local().setLocale("ru").toFormat("dd.MM.yyyy HH:mm:ss");
}

showTimeButton.addEventListener("click", () => {
  timeValue.textContent = getCurrentDateTime();
  timeModal.show();
});
