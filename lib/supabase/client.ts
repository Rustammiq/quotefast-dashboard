import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Return null in mock mode to skip Supabase
  if (process.env.MOCK_AUTH === 'true') {
    return null as any
  }

  // Check if credentials exist
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase credentials not found. Running in mock mode.')
    return null as any
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}