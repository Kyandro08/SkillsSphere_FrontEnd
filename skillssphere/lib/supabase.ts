import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

function ensureClient() {
  if (!_supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_API_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    _supabase = createClient(supabaseUrl, supabaseKey)
  }
  return _supabase
}

export const supabase = new Proxy<SupabaseClient>({} as unknown as SupabaseClient, {
  get(target, prop) {
    if (prop === 'then') return undefined
    return (ensureClient() as any)[prop]
  },
})
