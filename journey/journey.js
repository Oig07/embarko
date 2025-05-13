"use strict";

let collapse = document.getElementsByClassName("collapsibleEntry")
let i;

for (i=0; i< collapse.length; i++){
    collapse[i].addEventListener("click",function(){
        this.classList.toggle("active");
        let collapsibleContent=this.nextElementSibling;
        if(collapsibleContent.style.maxHeight){
            collapsibleContent.style.maxHeight = null;
        } else {
            collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px"
        }
    })
}

