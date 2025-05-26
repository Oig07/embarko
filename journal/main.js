"use strict"

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from '/config.js'
import { initLayout } from '../componenets/initLayout.js';
import { countChar } from "./characterCount.js";
import { initializeJourneyCreation } from "./journeyEntryElement.js";
import { fetchJournalsForUser, saveJournal } from "./journalSupabase.js";
import { renderJournalLink } from "./renderUtils.js";
import { showNewUserWelcome } from './newUserWelcome.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Initialize collapsible sidebar and character counter
document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  countChar();
});

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
    renderJournalLink(journal.journal_name, journalContainer, journal.id);
  });
  }

  initializeJourneyCreation(async (journalName) => {
    const { data, error } = await saveJournal(journalName, user.id);
    if (data && data.length > 0) {
      renderJournalLink(data[0].journal_name, container, data[0].id);
    }
  });
});