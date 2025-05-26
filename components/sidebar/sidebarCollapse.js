"use strict"

let dropdown = document.getElementsByClassName('journeyCollapse-Btn')
let i;

export function sidebarCollapse(){
    for (i=0; i<dropdown.length; i++){
        dropdown[i].addEventListener('click',function(){
            this.classList.toggle('active');
            let dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === 'block'){
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'block'
            }
        })
    }
}