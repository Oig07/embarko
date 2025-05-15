"use strict";

export function initCollapsibles() {
    document.addEventListener("click", function (event) {
      const button = event.target.closest(".collapsibleEntry");
      if (!button) return;
  
      button.classList.toggle("active");
      const content = button.nextElementSibling;
      if (content) {
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      }
    });
  }