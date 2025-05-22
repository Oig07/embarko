"use strict";
// Import Supabase client
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import { SUPABASE_URL, SUPABASE_KEY } from '/config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


export async function saveJournalEntry(content, journalId){
  const { data, error } = await supabase
    .from('journal_entries')
    .insert([{ content, associated_journal_id: journalId }])
    .select();

  if (error) {
    console.error('Supabase insert error:', error);
  }

  return { data, error };
}

export async function fetchJournalEntries(journalId) {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('associated_journal_id', journalId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Supabase fetch entries error:', error);
  }

  return data || [];
}