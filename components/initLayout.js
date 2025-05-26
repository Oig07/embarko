"use strict"

import { sidebarCollapse } from './sidebar/sidebarCollapse.js';
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
        sidebarCollapse(); // Initialize toggle
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
