'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClient()
  const isSupabaseAvailable = Boolean(supabase)

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!isSupabaseAvailable) {
        router.push('/login?error=auth_unavailable')
        return
      }
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/login?error=auth_callback_failed')
          return
        }

        if (data.session) {
          // User is authenticated, redirect to dashboard
          router.push('/dashboard')
        } else {
          // No session, redirect to login
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push('/login?error=auth_callback_failed')
      }
    }

    handleAuthCallback()
  }, [router, supabase?.auth, isSupabaseAvailable])

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
        <p className="text-brand-text">Authenticating...</p>
      </div>
    </div>
  )
}
