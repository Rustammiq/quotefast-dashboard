import { createClient } from '@/lib/supabase/client'
import { User } from '../types/user'

export interface AuthResponse {
  user: User | null
  error: string | null
  status: number
}

function mapSupabaseUserToAppUser(user: any, metadata?: Record<string, any>): User {
  return {
    id: user.id,
    email: user.email ?? '',
    name: metadata?.full_name || user.user_metadata?.full_name || metadata?.name || '',
    company: metadata?.company_name || user.user_metadata?.company_name || undefined,
    subscription: metadata?.subscription || undefined,
  }
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    if (!email || !password) {
      return {
        user: null,
        error: 'Email en wachtwoord zijn verplicht',
        status: 400,
      }
    }

    const supabase = createClient()
    if (!supabase) {
      return {
        user: null,
        error: 'Authenticatie is tijdelijk niet beschikbaar',
        status: 503,
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        user: null,
        error: error.message,
        status: error.status ?? 401,
      }
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user?.id)
      .single()

    return {
      user: data.user ? mapSupabaseUserToAppUser(data.user, profileData) : null,
      error: null,
      status: 200,
    }
  },

  register: async (
    email: string,
    password: string,
    name: string,
    company?: string
  ): Promise<AuthResponse> => {
    if (!email || !password || !name) {
      return {
        user: null,
        error: 'Email, wachtwoord en naam zijn verplicht',
        status: 400,
      }
    }

    const supabase = createClient()
    if (!supabase) {
      return {
        user: null,
        error: 'Registratie is tijdelijk niet beschikbaar',
        status: 503,
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          company_name: company,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) {
      return {
        user: null,
        error: error.message,
        status: error.status ?? 400,
      }
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: name,
        company_name: company,
      })

      if (profileError) {
        return {
          user: null,
          error: 'Fout bij het aanmaken van gebruikersprofiel',
          status: 500,
        }
      }
    }

    return {
      user: data.user ? mapSupabaseUserToAppUser(data.user) : null,
      error: data.user && !data.session ? 'Bevestig je e-mail om verder te gaan' : null,
      status: data.session ? 200 : 202,
    }
  },

  logout: async (): Promise<{ error: string | null }> => {
    const supabase = createClient()
    if (!supabase) {
      return { error: 'Uitloggen is tijdelijk niet beschikbaar' }
    }

    const { error } = await supabase.auth.signOut()
    return { error: error?.message ?? null }
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const supabase = createClient()
    if (!supabase) {
      return {
        user: null,
        error: 'Authenticatie is tijdelijk niet beschikbaar',
        status: 503,
      }
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      return {
        user: null,
        error: error.message,
        status: error.status ?? 401,
      }
    }

    if (!session?.user) {
      return {
        user: null,
        error: 'Geen gebruiker ingelogd',
        status: 401,
      }
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    return {
      user: mapSupabaseUserToAppUser(session.user, profileData),
      error: null,
      status: 200,
    }
  },

  updateUser: async (userId: string, userData: Partial<User>): Promise<AuthResponse> => {
    const supabase = createClient()
    if (!supabase) {
      return {
        user: null,
        error: 'Bijwerken van gebruiker is tijdelijk niet beschikbaar',
        status: 503,
      }
    }

    const { error: updateAuthError } = await supabase.auth.updateUser({
      data: {
        full_name: userData.name,
        company_name: userData.company,
      },
    })

    if (updateAuthError) {
      return {
        user: null,
        error: updateAuthError.message,
        status: updateAuthError.status ?? 400,
      }
    }

    if (userData.name || userData.company) {
      await supabase.from('profiles').upsert({
        id: userId,
        full_name: userData.name,
        company_name: userData.company,
      })
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError) {
      return {
        user: null,
        error: profileError.message,
        status: profileError.code === 'PGRST116' ? 404 : 400,
      }
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return {
        user: null,
        error: userError?.message || 'Gebruiker niet gevonden',
        status: userError?.status ?? 404,
      }
    }

    return {
      user: mapSupabaseUserToAppUser(user, profileData),
      error: null,
      status: 200,
    }
  },

  resetPassword: async (email: string): Promise<{ error: string | null }> => {
    if (!email) {
      return { error: 'Email is verplicht' }
    }

    const supabase = createClient()
    if (!supabase) {
      return { error: 'Wachtwoord resetten is tijdelijk niet beschikbaar' }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    })

    return { error: error?.message ?? null }
  },

  updatePassword: async (password: string): Promise<{ error: string | null }> => {
    if (!password) {
      return { error: 'Wachtwoord is verplicht' }
    }

    if (password.length < 6) {
      return { error: 'Wachtwoord moet minimaal 6 tekens bevatten' }
    }

    const supabase = createClient()
    if (!supabase) {
      return { error: 'Wachtwoord bijwerken is tijdelijk niet beschikbaar' }
    }

    const { error } = await supabase.auth.updateUser({ password })

    return { error: error?.message ?? null }
  },

  getOrCreateUserProfile: async (userId: string, email: string, metadata?: any) => {
    const supabase = createClient()
    if (!supabase) {
      return {
        id: userId,
        email,
        full_name: metadata?.full_name || 'Gebruiker',
        company_name: metadata?.company_name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    if (!profile) {
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email,
          full_name: metadata?.full_name,
          company_name: metadata?.company_name,
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      return newProfile
    }

    return profile
  },
}
