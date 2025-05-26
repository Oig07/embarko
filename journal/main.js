"use strict"

import { supabase } from '../supabase.js';
import { initLayout } from '../components/initLayout.js';
import { countChar } from "./characterCount.js";
import { initializeJourneyCreation } from "./journeyEntryElement.js";
import { fetchJournalsForUser, saveJournal } from "./journalSupabase.js";
import { renderJournalLink } from "./renderUtils.js";
import { showNewUserWelcome } from './newUserWelcome.js';

// Initialize collapsible sidebar and character counter
document.addEventListener('DOMContentLoaded', () => {
  countChar();
});

initLayout(()=>{
  document.addEventListener("DOMContentLoaded", async () => {
  const journalContainer = document.querySelector('.journeys-container');
  const welcomeContainer = document.querySelector('.welcomeJournal-Container');

  if(!welcomeContainer){
    console.warn('missing .welcome-container in DOM');
    return
  }

  if (!journalContainer) {
    console.warn("main.js: .journeys-container not found");
    return;
  }

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  console.log('user:', user)

  if (authError || !user) {
    console.error("User not logged in or error occurred", authError);
    window.location.href = "/auth/auth.html"; // redirect to login
    return;
  }

  const journals = await fetchJournalsForUser(user.id);

  if (journals.length === 0){
    showNewUserWelcome(welcomeContainer);
  } else {
    journals.forEach(journal => {
    renderJournalLink(journal.journal_name, journalContainercontainer, journal.id);
  });
  }

  initializeJourneyCreation(async (journalName) => {
    const { data, error } = await saveJournal(journalName, user.id);
    if (data && data.length > 0) {
      renderJournalLink(data[0].journal_name, journalContainer, data[0].id);
    }
  });
});
})