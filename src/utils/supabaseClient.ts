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
    select: (columns?: string) => createMockQueryBuilder(),
    insert: (data: any) => createMockQueryBuilder(),
    update: (data: any) => createMockQueryBuilder(),
    delete: () => createMockQueryBuilder(),
    eq: (column: string, value: any) => createMockQueryBuilder(),
    neq: (column: string, value: any) => createMockQueryBuilder(),
    gt: (column: string, value: any) => createMockQueryBuilder(),
    gte: (column: string, value: any) => createMockQueryBuilder(),
    lt: (column: string, value: any) => createMockQueryBuilder(),
    lte: (column: string, value: any) => createMockQueryBuilder(),
    like: (column: string, pattern: string) => createMockQueryBuilder(),
    ilike: (column: string, pattern: string) => createMockQueryBuilder(),
    is: (column: string, value: any) => createMockQueryBuilder(),
    in: (column: string, values: any[]) => createMockQueryBuilder(),
    contains: (column: string, value: any) => createMockQueryBuilder(),
    containedBy: (column: string, value: any) => createMockQueryBuilder(),
    rangeGt: (column: string, value: any) => createMockQueryBuilder(),
    rangeGte: (column: string, value: any) => createMockQueryBuilder(),
    rangeLt: (column: string, value: any) => createMockQueryBuilder(),
    rangeLte: (column: string, value: any) => createMockQueryBuilder(),
    rangeAdjacent: (column: string, value: any) => createMockQueryBuilder(),
    overlaps: (column: string, value: any) => createMockQueryBuilder(),
    textSearch: (column: string, query: string) => createMockQueryBuilder(),
    match: (query: Record<string, any>) => createMockQueryBuilder(),
    not: (column: string, operator: string, value: any) => createMockQueryBuilder(),
    or: (filters: string) => createMockQueryBuilder(),
    filter: (column: string, operator: string, value: any) => createMockQueryBuilder(),
    order: (column: string, options?: { ascending?: boolean }) => createMockQueryBuilder(),
    limit: (count: number) => createMockQueryBuilder(),
    range: (from: number, to: number) => createMockQueryBuilder(),
    single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    maybeSingle: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    then: (resolve: any, reject?: any) => Promise.resolve({ data: null, error: new Error('Supabase not configured') }).then(resolve, reject)
  });

  return {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signIn: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: (table: string) => createMockQueryBuilder()
  };
};

export const supabase = (!supabaseUrl || !supabaseAnonKey || 
  supabaseUrl === 'your_supabase_project_url_here' || 
  supabaseAnonKey === 'your_supabase_anon_key_here') 
  ? createMockClient() 
  : createClient(supabaseUrl, supabaseAnonKey);