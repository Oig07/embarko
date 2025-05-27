"use strict"

import { initModal } from "../components/modal/modalController.js"

// Wait for the "Start New Journey" button to appear in the DOM before initializing modal
function waitForElement(id, callback) {
  const el = document.getElementById(id);
  if (el) return callback(el);
  setTimeout(() => waitForElement(id, callback), 100);
}

waitForElement("startJourneyBtn", () => {
  initModal({
    modalId: "newJourneyModal",
    openBtnId: "startJourneyBtn",
    closeBtnId: "closeModalBtn",
    submitBtnId: "newJourneySaveBtn",
    onSubmit: () => {
      console.log('Form submitted')
      // Add Logic for post submission
    }
  });
});