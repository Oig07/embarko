"use strict";

import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import { SUPABASE_URL, SUPABASE_KEY } from '/config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


export async function saveJournal(journal_name){
  const { data, error } = await supabase
    .from('journals')
    .insert([{ journal_name }])
    .select(); // includes the generated id

  if (error) {
    console.error('Supabase insert error: ', error);
  }

  return { data, error }; // data[0].id contains the journal ID
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