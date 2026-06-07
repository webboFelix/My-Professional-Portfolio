/** Supabase integration placeholder — enable via USE_SUPABASE=true */
export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  // Install @supabase/supabase-js and wire createClient when ready
  return null;
}
