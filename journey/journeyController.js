"use strict";
// Import function to create new entry elements and modal control logic
import { initModal } from '../components/modal/modalController.js'

// Wait for the startJourney button to appear in the DOM before initializing modal
function waitForElement(id, callback) {
  const el = document.getElementById(id);
  if (el) return callback(el);
  setTimeout(() => waitForElement(id, callback), 100);
}

waitForElement("startJourney", () => {
  initModal({
    modalId: "newEntryModal",
    openBtnId: "startJourney",
    closeBtnId: "closeModalBtn",
    submitBtnId: "newEntry-save-button"
  });
});