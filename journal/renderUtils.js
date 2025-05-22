"use strict"

// Help to create and append link to the DOM
export function renderJournalLink(journalName, container, journalId) {
  if (!container) {
    console.warn("renderJournalLink: container is null");
    return;
  }

  const link = document.createElement('a');
  link.href = "#"; // stay on same page
  link.textContent = journalName;
  link.dataset.journalId = journalId;
  link.classList.add('journey-link');

  link.addEventListener("click", (e) => {
    e.preventDefault();
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.src = `/journey/journey.html?journal_id=${journalId}`;
    } else {
      console.warn("No iframe found to load journal entries");
    }
  });

  container.appendChild(link);
}