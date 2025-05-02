import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://lobkygimhhqwbhpopkmz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYmt5Z2ltaGhxd2JocG9wa216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTA2NjYsImV4cCI6MjA2MTY4NjY2Nn0.FnaQYCYoEqMS1tLWswO1pmxvcvkkDUPorULcqtyxVYY';

export const supabase = createClient(supabaseUrl, supabaseKey);
