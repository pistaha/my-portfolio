import { Modal } from "bootstrap";
import { getCurrentDateTime } from "./renderClock.js";

function initTimeModal() {
  const modalElement = document.getElementById("timeModal");
  const openButton = document.getElementById("showTimeButton");
  const timeValue = document.getElementById("timeValue");

  if (!modalElement || !openButton || !timeValue) {
    throw new Error("Bootstrap modal markup was not found.");
  }

  const modal = new Modal(modalElement);

  openButton.addEventListener("click", () => {
    timeValue.textContent = getCurrentDateTime();
    modal.show();
  });

  modalElement.addEventListener("show.bs.modal", () => {
    timeValue.textContent = getCurrentDateTime();
  });
}

initTimeModal();
