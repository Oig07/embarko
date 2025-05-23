"use strict"

export function showNewUserWelcome(container){
    const welcomeCard = document.createElement('div');
    welcomeCard.classList.add('newUser-Card');
      welcomeCard.innerHTML = `
    <h2>Welcome!</h2><br>
    <p>It looks like you haven't recorded any journeys yet.</p>
    <button id="createFirst-Journal" class="createFirst-journal">
      Create Your First Journey
    </button>`;

    
    container.appendChild(welcomeCard);

   const createBtn = welcomeCard.querySelector('.createFirst-journal');
   if(createBtn){
    createBtn.addEventListener('click',()=>{
        document.getElementById('startJourneyBtn')?.click();
    })
   }
}