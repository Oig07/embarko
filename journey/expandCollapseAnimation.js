"use strict";

export function initCollapsibles(){
    const container = document.querySelector('#journeyEntryContainer');
    if (!container) return;

    container.addEventListener('click',function(e){
        const button = event.target.closest('.collapsibleEntry');
        if(!button) return;

        // Toggle active class
        button.classList.toggle('active');

        //Show/hide next sibling content
        const content = button.nextElementSibling;
        if (content){
            if(content.style.maxHeight){
                content.style.maxHeight=null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    })
}