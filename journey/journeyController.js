"use strict";

import { createNewEntry } from "./createEntry.js";
import { initModal } from "./openEntryModal.js";

// Modal Open Close
document.addEventListener("DOMContentLoaded", ()=>{
    initModal({
        // Identify Modal Content
        modalId: "newEntryModal",
        // Identify Open Button
        openBtnId: "startJourney",
        // Identify Close Button
        closeBtnId: "closeModalBtn",
        // Identify Submit Button
        submitBtnId: "newEntry-save-button"
    })
})

