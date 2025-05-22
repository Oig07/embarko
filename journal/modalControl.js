"use strict"
// Initializes modal behavior based on provided element IDs
export function initModal({ modalId, openBtnId, closeBtnId, submitBtnId }) {
  // Get references to modal and its control buttons
  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = document.getElementById(closeBtnId);
  const submitBtn = document.getElementById(submitBtnId);

  // Validate modal exists
  if (!modal) {
    console.warn("Modal not found:", modalId);
    return;
  }

  // Attach click listener to open button if it exists
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.classList.add("active");
    });
  } else {
    console.warn("Open button not found:", openBtnId);
  }

  // Attach click listener to close button if it exists
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  } else {
    console.warn("Close button not found:", closeBtnId);
  }

  // Hide modal if user clicks outside the modal content area
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

    // Attach click listener to submit button if it exists
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  } else {
    console.warn("Submit button not found:", submitBtnId);
  }
}