"use strict";

export function initModal({ modalId, openBtnId, closeBtnId }) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);
  
    if (!modal || !openBtn || !closeBtn) {
      console.warn("Modal elements not found. Check your IDs.");
      return;
    }
  
    openBtn.addEventListener("click", () => {
      modal.classList.add("active");
    });
  
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("active");
      }
    });
  }