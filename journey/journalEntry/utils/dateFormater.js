"use strict"

export function formatDate(dateString){
    const dateObj = new Date(dateString);
    return `${String(dateObj.getMonth()+1).padStart(2,'0')}/` +
            `${String(dateObj.getDate()).padStart(2,'0')}/` +
            `${dateObj.getFullYear()}`
}