"use strict"

// Help to create and append link to the DOM
export function renderJournalLink(journalName, container, journalId) {
  if (!container) {
    console.warn("renderJournalLink: container is null");
    return;
  }

  const link = document.createElement('a');
  link.href = ""; // stay on same page
  link.textContent = journalName;
  link.dataset.journalId = journalId;
  link.classList.add('journey-link');

  link.addEventListener("click", (e) => {
    e.preventDefault();
    const iframe = document.querySelector("iframe");
    if(!iframe){
      console.warn('No iframe found to load journal entries');
      return;
    }

    // Set the iframe source query param
    iframe.src=`/journey/journey.html?journal_id=${journalId}`;

    // Wait until iframe content is loaded, then update header
    iframe.onload=()=>{
      const iframeDoc=iframe.contentWindow?.document;
      const header=iframeDoc?.getElementById('journalSection-header');

      if(header){
        header.textContent=journalName;
      } else {
        console.warn('journalSection-header not found inside iframe')
      }
    }
  });

  container.appendChild(link);
}