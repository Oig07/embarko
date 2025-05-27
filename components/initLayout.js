"use strict"

import { initCollapsibles } from './utils/collapseToggle.js';
import { initLogout } from './logout/logout.js';

export function initLayout(callback) {
  let componentsLoaded = 0;

  const checkAllLoaded = () => {
    componentsLoaded++;
    if (componentsLoaded === 2 && typeof callback === 'function') {
      callback(); // ✅ Trigger your main app logic
    }
  };

  // Load sidebar
  fetch('/components/sidebar/sidebar.html')
    .then(res => res.text())
    .then(html => {
      const sidebarContainer = document.getElementById('sidebarContainer');
      if (sidebarContainer) {
        sidebarContainer.innerHTML = html;
        initCollapsibles({
          buttonClass: 'journeyCollapse-Btn',
          activeButtonClass: 'active',
          animate: false,
        }); // Initialize toggle
        checkAllLoaded();
      } else {
        console.warn("Sidebar container not found");
      }
    });

  // Load logout button
  fetch('/components/logout/logout.html')
    .then(res => res.text())
    .then(html => {
      const logoutContainer = document.getElementById('logout-container');
      if (logoutContainer) {
        logoutContainer.innerHTML = html;
        initLogout();
        checkAllLoaded();
      } else {
        console.warn("Logout container not found");
      }
    });
}
