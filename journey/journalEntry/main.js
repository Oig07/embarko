"use strict";
// Import Supabase Functionality for persistence
import { saveJournalEntry, fetchJournalEntries } from "./journalSupabase.js"
import { createEntryElement } from "./entryElement.js";
import { initCollapsibles } from "./collapsibleBehavior.js";


// Track Day Count
let entryCount = 0;
let lastEntryDate = ''; // Track previous entry

// Renders a new journal entry to the DOM and increments the day count if needed
function renderNewEntry(entry) {
    const today = new Date(entry.created_at).toLocaleDateString();
  
    if (today !== lastEntryDate) {
      entryCount++;
      lastEntryDate = today;
    }
  
    const entryNode = createEntryElement(entry, entryCount);
    document.getElementById("entriesContainer").appendChild(entryNode);
  }
  
  // On page load, fetch and display entries, initialize collapsibles, and set up the new entry button
  window.addEventListener("DOMContentLoaded", async () => {
    const entries = await fetchJournalEntries();
    entries.forEach((entry) => renderNewEntry(entry));
    initCollapsibles();
  
    const newEntryBtn = document.getElementById("newEntry-save-button");
    // Handles saving a new journal entry when the user clicks the save button
    newEntryBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      const form = document.getElementById("newEntryForm");
      const content = document.getElementById("entry").value;
  
      const { data } = await saveJournalEntry(content);
      if (data && data.length > 0) {
        renderNewEntry(data[0]);
      }
      form.reset();
    });
  });
  