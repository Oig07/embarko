"use strict";

export function initializeJourneyCreation(onCreate) {
  const saveBtn = document.getElementById('newJourneySaveBtn');
  const journeyInput = document.getElementById('journeyName');
  const container = document.querySelector('.journeys-container');

  if (!saveBtn || !journeyInput ) return;

  saveBtn.addEventListener('click', async () => {
    const journeyName = journeyInput.value.trim();
    if (journeyName === '') return;

    if(onCreate && typeof onCreate === 'function'){
      await onCreate(journeyName);
    }

    journeyInput.value=''
  });
}
