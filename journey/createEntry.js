"use strict";
// Create Entry Function
let entryCount = 0;
let lastEntryDate = ''; // Track previous entry

export function createNewEntry() {
    const today = new Date().toLocaleDateString();

    //If today's date is different from the last one, increment dayCount
    if (today!== lastEntryDate){
        entryCount++;
        lastEntryDate=today
    }
    // Create container
    const container = document.createElement('div');
    container.className = 'journeyEntryContainer';

    // Create inner padding div
    const entryPadding = document.createElement('div');
    entryPadding.className = 'entryPadding';

    // Create the collapsible button
    const button = document.createElement('button');
    button.className = 'collapsibleEntry';
    const date = new Date().toLocaleDateString();
    button.textContent = `Day ${entryCount} - ${date}`;

    // Create the content div
    const content = document.createElement('div');
    content.className = 'collapsibleContent';

    const paragraph = document.createElement('p');
    paragraph.textContent = document.getElementById('entry').value;
    content.appendChild(paragraph);

    // Add collapsible toggle behavior
    button.addEventListener('click', function () {
        // Toggle display between block and none
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });

    // Assemble
    entryPadding.appendChild(button);
    entryPadding.appendChild(content);
    container.appendChild(entryPadding);

    // Add to the page
    document.getElementById('entriesContainer').appendChild(container);
}

// Create New Entry by clicking "Add Entry" in Modal
const newEntry = document.getElementById('newEntry-save-button')
newEntry.addEventListener('click',function(e){
    e.preventDefault(); // Prevent form from reloading page
    const form = document.getElementById('newEntryForm')
    createNewEntry()
    form.reset(); // Clear form after submission
})