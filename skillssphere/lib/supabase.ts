import { createClient } from '@supabase/supabase-js'

// Inloggen met eigen password query (niet veilig)
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  .eq('password', password)
  .single();
const supabaseUrl = process.env.NEXT_PUBLIC_API_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
    