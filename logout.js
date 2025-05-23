"use strict"

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from '/config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Sets up logout functionality on a given button

export function initLogout(logoutBtnId = "logOut-Btn"){
    document.addEventListener('DOMContentLoaded',()=>{
        const logoutBtn = document.getElementById(logoutBtnId);

        if(!logoutBtn){
            console.warn(`Logout button with ID '${logoutBtnId}' not found.`)
            return;
        }

        logoutBtn.addEventListener('click', async()=>{
            const confirmed = confirm('Are you sure you want to sign out?');

            if(!confirmed) return;

            const {error} = await supabase.auth.signOut();

            if (error){
                console.error('Logout failed:', error.message);
                alert('Logout failed. Please try again.');
                return;
            }
            localStorage.clear();

            window.location.href="/auth/auth.html";
        });
    });
}