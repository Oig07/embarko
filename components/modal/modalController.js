"use strict"

export function initModal({modalId, openBtnId, closeBtnId, submitBtnId, onSubmit}){
    const modal = document.getElementById(modalId)
    const openBtn = document.getElementById(openBtnId)
    const closeBtn = document.getElementById(closeBtnId)
    const submitBtn = document.getElementById(submitBtnId)

    if (!modal){
        console.warn('Modal not found:', modalId)
        return;
    }

    if (openBtn){
        openBtn.addEventListener('click',()=>{
            modal.classList.add('active');
        });
    }

    // CLOSE MODAL - X BUTTON
    if (closeBtn){
        closeBtn.addEventListener('click',()=>{
            modal.classList.remove('active');
        });
    }

    // CLOSE MODAL - CLICK OUTSIDE MODAL
    window.addEventListener('click',(e)=>{
        if(e.target===modal){
            modal.classList.remove('active');
        }
    });

    // FORM SUBMIT
    if(submitBtn){
        submitBtn.addEventListener('click',()=>{
            modal.classList.remove('active');
            if(typeof onSubmit === 'function'){
                onSubmit(); // Callback - Need to build out
            }
        })
    }

}