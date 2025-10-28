import { createBrowserClient } from '@supabase/ssr'

function isValidSupabaseValue(value?: string | null) {
  if (!value) return false
  const trimmed = value.trim()
  if (!trimmed) return false
  if (trimmed.startsWith('your_')) return false
  return true
}

function isValidUrl(url?: string | null) {
  if (!url) return false
  return /^https?:\/\//i.test(url)
}

export function createClient() {
  // Return null in mock mode to skip Supabase
  if (process.env.MOCK_AUTH === 'true') {
    return null as any
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!isValidSupabaseValue(supabaseUrl) || !isValidUrl(supabaseUrl)) {
    console.warn('⚠️ Invalid Supabase URL. Running in mock mode.')
    return null as any
  }

  if (!isValidSupabaseValue(supabaseKey)) {
    console.warn('⚠️ Invalid Supabase anon key. Running in mock mode.')
    return null as any
  }

  try {
    return createBrowserClient(supabaseUrl!, supabaseKey!)
  } catch (error) {
    console.error('⚠️ Failed to create Supabase client, falling back to mock mode.', error)
    return null as any
  }
}