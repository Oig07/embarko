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

initLayout(() => {
  // Wait until .journeys-container is available (injected from sidebar)
  function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) return callback(el);
    setTimeout(() => waitForElement(selector, callback), 100);
  }

    waitForElement('.journeys-container', async (journalContainer) => {
      const welcomeContainer = document.querySelector('.welcomeJournal-Container');

      if (!welcomeContainer) {
        console.warn('Missing .welcomeJournal-Container in DOM');
        return;
      }

      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("User not logged in or error occurred", authError);
        window.location.href = "/auth/auth.html";
        return;
      }

      const journals = await fetchJournalsForUser(user.id);

      if (journals.length === 0) {
        showNewUserWelcome(welcomeContainer);
      } else {
        journals.forEach(journal => {
          renderJournalLink(journal.journal_name, journalContainer, journal.id);
        });
      }

      // Wait for the modal save button before initializing creation handler
      waitForElement('#newJourneySaveBtn', () => {
        initializeJourneyCreation(async (journalName) => {
          const { data, error } = await saveJournal(journalName, user.id);
          if (data && data.length > 0) {
            renderJournalLink(data[0].journal_name, journalContainer, data[0].id);
          }
        });
      });
    });
  });