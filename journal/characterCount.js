"use strict"

const textarea = document.getElementById('journeyName')
const maxLength = textarea.maxLength

export function countChar(){

    textarea.addEventListener('input',(e)=>{
        const charCount = textarea.value.length;
        const remaining = maxLength - charCount;
        console.log(`${charCount}/${maxLength} (${remaining} remaining)`)
    })
}