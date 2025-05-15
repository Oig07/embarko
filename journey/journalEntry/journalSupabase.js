"use strict";
// Import Supabase client
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import { SUPABASE_URL, SUPABASE_KEY } from '../config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


export async function saveJournalEntry(content){
    const {data, error} = await supabase
        .from('journal_entries')
        .insert([{content}])
        .select()

    if (error){
        console.error('Supabase insert error: ', error)
    }

    return {data, error}
}

export async function fetchJournalEntries() {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: true });
  
    if (error) {
      console.error('Supabase fetch error:', error);
    }
  
    return data || [];
  }