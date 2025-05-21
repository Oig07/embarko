"use strict";

// authSwitch.js

export function initAuthSwitch({
    loginButtonSelector,
    signUpButtonSelector,
    sliderSelector,
    loginContainerSelector,
    signUpContainerSelector
}) {
    const loginTabBtn = document.querySelector(loginButtonSelector);
    const signUpTabBtn = document.querySelector(signUpButtonSelector);
    const slider = document.querySelector(sliderSelector);
    const loginCardContainer = document.querySelector(loginContainerSelector);
    const signUpCardContainer = document.querySelector(signUpContainerSelector);

    if (!loginTabBtn || !signUpTabBtn || !slider || !loginCardContainer || !signUpCardContainer) {
        console.error('Auth Switch: One or more elements not found.');
        return;
    }

    function activateLogin() {
        loginTabBtn.classList.add('active');
        signUpTabBtn.classList.remove('active');

        slider.style.left = '4px';

        loginCardContainer.classList.add('active');
        signUpCardContainer.classList.remove('active');
    }

    function activateSignUp() {
        signUpTabBtn.classList.add('active');
        loginTabBtn.classList.remove('active');

        slider.style.left = 'calc(50% + 2px)';

        signUpCardContainer.classList.add('active');
        loginCardContainer.classList.remove('active');
    }

    loginTabBtn.addEventListener('click', activateLogin);
    signUpTabBtn.addEventListener('click', activateSignUp);

    // Set initial state
    activateLogin();
}
