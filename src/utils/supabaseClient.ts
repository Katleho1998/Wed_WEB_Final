import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Check if environment variables are properly configured
if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url_here') {
  console.warn('Supabase URL is not configured. Please set VITE_SUPABASE_URL in your .env file.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.warn('Supabase Anon Key is not configured. Please set VITE_SUPABASE_ANON_KEY in your .env file.');
}

// Create a mock client if environment variables are not properly set
const createMockClient = () => ({
  auth: {
    signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    signIn: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    update: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    delete: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
  })
});

export const supabase = (!supabaseUrl || !supabaseAnonKey || 
  supabaseUrl === 'your_supabase_project_url_here' || 
  supabaseAnonKey === 'your_supabase_anon_key_here') 
  ? createMockClient() 
  : createClient(supabaseUrl, supabaseAnonKey);