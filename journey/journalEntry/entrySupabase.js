"use strict";
// Import Supabase client
import { supabase } from "../../supabase.js";


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