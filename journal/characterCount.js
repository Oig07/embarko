"use strict"

const textarea = document.getElementById('journeyName')
const maxLength = textarea.maxLength
const charCountDisplay = document.getElementById('characterCount')

export function countChar(){

    textarea.addEventListener('input',()=>{
        const currentLength = textarea.value.length;
        const remaining = maxLength - currentLength;
        charCountDisplay.textContent = `${currentLength}/${maxLength} (${remaining} remaining)`
    })
}