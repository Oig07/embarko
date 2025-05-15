"use strict";
// Import Supabase client
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://uikfquugekdemngynboy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpa2ZxdXVnZWtkZW1uZ3luYm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNjkwNzgsImV4cCI6MjA2Mjg0NTA3OH0.SRFzFZMVIUBHMD20JAhGgxHNlxNSXUR3oj4OEGaQAMU'
const supabase = createClient(supabaseUrl,supabaseKey)


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