"use strict";

export function initModal({ modalId, openBtnId, closeBtnId, submitBtnId }) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const submitBtn = document.getElementById(submitBtnId)
  
    if (!modal || !openBtn || !closeBtn || !submitBtn) {
      console.warn("Modal elements not found. Check your IDs.");
      return;
    }
  
    openBtn.addEventListener("click", () => {
      modal.classList.add("active");
    });
  
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });

    submitBtn.addEventListener("click",()=>{
      modal.classList.remove("active");
    });
  }