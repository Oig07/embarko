"use strict";

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from '/config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Sign Up
async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert("Sign-up failed: " + error.message);
    return;
  }

  // Wait for confirmation before trying to insert user profile
  const { user } = data;

  if (user) {
    await supabase.from("users").insert({
      id: user.id,
      email: user.email
    });
  }

  alert("Sign-up successful. Please check your email to verify.");
}

// Sign In
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert("Login failed: " + error.message);
    return;
  }
  window.location.href = "/journal/journal.html"; // Adjust path if needed
}

// Hook up to form submit buttons
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const signUpBtn = document.getElementById("signUpBtn");

  loginBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#loginCard .username").value;
    const password = document.querySelector("#loginCard .password").value;
    await signIn(email, password);
  });

  signUpBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#signUpCard .username").value;
    const password = document.querySelector("#signUpCard .password").value;
    await signUp(email, password);
  });
});