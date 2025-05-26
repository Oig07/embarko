"use strict";

import { supabase } from "../supabase.js";


export async function saveJournal(journal_name, user_id) {
  const { data, error } = await supabase
    .from('journals')
    console.log('saving journal:', journal_name, "for user:", user_id)
    .insert([{ journal_name, user_id }])
    .select();

  if (error) {
    console.error('Supabase insert error: ', error);
  } else {
    console.log('journal saved:', data)
  }

  return { data, error };
}

export async function fetchJournalsForUser(user_id) {
  const { data, error } = await supabase
    .from('journals')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching journals:", error);
  }

  return data || [];
}