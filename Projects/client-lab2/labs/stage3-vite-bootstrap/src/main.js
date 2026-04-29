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
let timerId = null;

function getCurrentDateTime() {
  return DateTime.local().setLocale("ru").toFormat("dd.MM.yyyy HH:mm:ss");
}

function renderTime() {
  timeValue.textContent = getCurrentDateTime();
}

showTimeButton.addEventListener("click", () => {
  renderTime();
  timeModal.show();
});

timeModalElement.addEventListener("shown.bs.modal", () => {
  renderTime();
  timerId = window.setInterval(renderTime, 1000);
});

timeModalElement.addEventListener("hidden.bs.modal", () => {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
});
