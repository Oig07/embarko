"use strict";
// Import Supabase Functionality for persistence
import { saveJournalEntry, fetchJournalEntries } from "./entrySupabase.js"
import { createEntryElement } from "./entryElement.js";
import { initCollapsibles } from "../../components/utils/collapseToggle.js";


// Track Day Count
let entryCount = 0;
let lastEntryDate = ''; // Track previous entry

// Render entry and track days
function renderNewEntry(entry) {
  const today = new Date(entry.created_at).toLocaleDateString();

  if (today !== lastEntryDate) {
    entryCount++;
    lastEntryDate = today;
  }

  const entryNode = createEntryElement(entry, entryCount);
  document.getElementById("entriesContainer").appendChild(entryNode);
}

window.addEventListener("DOMContentLoaded", async () => {
  // ✅ Extract journal_id from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const journalId = urlParams.get("journal_id");

  if (!journalId) {
    console.warn("No journal_id found in URL");
    return;
  }

  // ✅ Fetch entries for the correct journal
  const entries = await fetchJournalEntries(journalId);
  entries.forEach((entry) => renderNewEntry(entry));
  initCollapsibles({
    buttonClass: 'collapsibleEntry',
    activeButtonClass: 'active',
    animate: true,
  });

  const newEntryBtn = document.getElementById("newEntry-save-button");
  newEntryBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const form = document.getElementById("newEntryForm");
    const content = document.getElementById("entry").value;

    // ✅ Save entry with the correct journal ID
    const { data } = await saveJournalEntry(content, journalId);
    if (data && data.length > 0) {
      renderNewEntry(data[0]);
    }

    form.reset();
  });
});
  