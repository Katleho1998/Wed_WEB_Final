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
const createMockClient = () => {
  const createMockQueryBuilder = () => ({
    select: () => createMockQueryBuilder(),
    insert: () => createMockQueryBuilder(),
    update: () => createMockQueryBuilder(),
    delete: () => createMockQueryBuilder(),
    eq: () => createMockQueryBuilder(),
    neq: () => createMockQueryBuilder(),
    gt: () => createMockQueryBuilder(),
    gte: () => createMockQueryBuilder(),
    lt: () => createMockQueryBuilder(),
    lte: () => createMockQueryBuilder(),
    like: () => createMockQueryBuilder(),
    ilike: () => createMockQueryBuilder(),
    is: () => createMockQueryBuilder(),
    in: () => createMockQueryBuilder(),
    contains: () => createMockQueryBuilder(),
    containedBy: () => createMockQueryBuilder(),
    rangeGt: () => createMockQueryBuilder(),
    rangeGte: () => createMockQueryBuilder(),
    rangeLt: () => createMockQueryBuilder(),
    rangeLte: () => createMockQueryBuilder(),
    rangeAdjacent: () => createMockQueryBuilder(),
    overlaps: () => createMockQueryBuilder(),
    textSearch: () => createMockQueryBuilder(),
    match: () => createMockQueryBuilder(),
    not: () => createMockQueryBuilder(),
    or: () => createMockQueryBuilder(),
    filter: () => createMockQueryBuilder(),
    order: () => createMockQueryBuilder(),
    limit: () => createMockQueryBuilder(),
    range: () => createMockQueryBuilder(),
    single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    maybeSingle: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    then: (resolve: any) => resolve({ data: null, error: new Error('Supabase not configured') })
  });

  return {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signIn: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => createMockQueryBuilder()
  };
};

export const supabase = (!supabaseUrl || !supabaseAnonKey || 
  supabaseUrl === 'your_supabase_project_url_here' || 
  supabaseAnonKey === 'your_supabase_anon_key_here') 
  ? createMockClient() 
  : createClient(supabaseUrl, supabaseAnonKey);