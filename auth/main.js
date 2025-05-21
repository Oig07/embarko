"use strict"

import { initAuthSwitch } from "./authSwitch.js"

initAuthSwitch({
    loginButtonSelector: '.loginCard-selector',
    signUpButtonSelector: '.signUpCard-selector',
    sliderSelector: '.selectorSlider',
    loginContainerSelector: '#loginCard-container',
    signUpContainerSelector: '#signUpCard-container'
})