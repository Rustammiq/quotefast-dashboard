// Hybrid authentication service
// Uses Supabase Auth for authentication but Neon Data API for database operations
import { supabase } from './supabase';
import { db } from './neon-client';
import { User } from '../types/user';

export interface AuthResponse {
  user: User | null;
  error: string | null;
  status: number;
}

export const hybridAuthService = {
  // Login with email and password (uses Supabase Auth)
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // Validate
      if (!email || !password) {
        return {
          user: null,
          error: 'Email en wachtwoord zijn verplicht',
          status: 400
        };
      }

      // Login with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          return {
            user: null,
            error: 'Ongeldige inloggegevens. Controleer je email en wachtwoord.',
            status: 401
          };
        }
        
        return {
          user: null,
          error: error.message,
          status: error.status || 500
        };
      }

      if (!data.user) {
        return {
          user: null,
          error: 'Inloggen mislukt. Probeer het later opnieuw.',
          status: 500
        };
      }

      // Get user profile from Neon database
      const userProfile = await db.getById('profiles', data.user.id);

      if (!userProfile) {
        // Create profile if it doesn't exist
        const newProfile = await db.insert('profiles', {
          id: data.user.id,
          email: data.user.email || '',
          full_name: data.user.user_metadata?.full_name || '',
          company_name: data.user.user_metadata?.company_name || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: newProfile.full_name || '',
          company: newProfile.company_name,
          subscription: {
            plan: newProfile.subscription_tier || 'free',
            status: newProfile.subscription_status || 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        };

        return {
          user,
          error: null,
          status: 200
        };
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: userProfile.full_name || '',
        company: userProfile.company_name,
        subscription: {
          plan: userProfile.subscription_tier || 'free',
          status: userProfile.subscription_status || 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      };

      return {
        user,
        error: null,
        status: 200
      };

    } catch (error: any) {
      console.error('Unexpected login error:', error);
      return {
        user: null,
        error: 'Er is een onverwachte fout opgetreden bij het inloggen',
        status: 500
      };
    }
  },

  // Register new user (uses Supabase Auth + Neon database)
  register: async (email: string, password: string, name: string, company?: string): Promise<AuthResponse> => {
    try {
      // Validate
      if (!email || !password || !name) {
        return {
          user: null,
          error: 'Email, wachtwoord en naam zijn verplicht',
          status: 400
        };
      }

      // Register with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            company_name: company
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        
        if (error.message.includes('already registered')) {
          return {
            user: null,
            error: 'Dit emailadres is al geregistreerd. Probeer in te loggen.',
            status: 409
          };
        }
        
        return {
          user: null,
          error: error.message,
          status: error.status || 500
        };
      }

      if (!data.user) {
        return {
          user: null,
          error: 'Registratie mislukt. Probeer het later opnieuw.',
          status: 500
        };
      }

      // Wait a moment for the user to be created
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create profile in Neon database
      const userProfile = await db.insert('profiles', {
        id: data.user.id,
        email: data.user.email || '',
        full_name: name,
        company_name: company || '',
        subscription_tier: 'free',
        subscription_status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: name,
        company: company,
        subscription: {
          plan: 'free',
          status: 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      };

      return {
        user,
        error: null,
        status: 200
      };

    } catch (error: any) {
      console.error('Unexpected registration error:', error);
      return {
        user: null,
        error: 'Er is een onverwachte fout opgetreden bij de registratie',
        status: 500
      };
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthResponse> => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return {
          user: null,
          error: error?.message || 'Geen gebruiker gevonden',
          status: 401
        };
      }

      // Get user profile from Neon database
      const userProfile = await db.getById('profiles', user.id);

      if (!userProfile) {
        return {
          user: null,
          error: 'Gebruikersprofiel niet gevonden',
          status: 404
        };
      }

      const userData: User = {
        id: user.id,
        email: user.email || '',
        name: userProfile.full_name || '',
        company: userProfile.company_name,
        subscription: {
          plan: userProfile.subscription_tier || 'free',
          status: userProfile.subscription_status || 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      };

      return {
        user: userData,
        error: null,
        status: 200
      };

    } catch (error: any) {
      console.error('Get current user error:', error);
      return {
        user: null,
        error: 'Fout bij het ophalen van gebruikersgegevens',
        status: 500
      };
    }
  },

  // Logout
  logout: async (): Promise<{ error: string | null }> => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error: any) {
      console.error('Logout error:', error);
      return { error: 'Fout bij uitloggen' };
    }
  },

  // Update user profile
  updateUser: async (userId: string, userData: Partial<User>): Promise<AuthResponse> => {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      if (userData.name) updateData.full_name = userData.name;
      if (userData.company) updateData.company_name = userData.company;
      if (userData.subscription) {
        updateData.subscription_tier = userData.subscription.plan;
        updateData.subscription_status = userData.subscription.status;
      }

      const updatedProfile = await db.update('profiles', userId, updateData);

      if (!updatedProfile) {
        return {
          user: null,
          error: 'Fout bij het bijwerken van het profiel',
          status: 500
        };
      }

      const user: User = {
        id: userId,
        email: updatedProfile.email,
        name: updatedProfile.full_name || '',
        company: updatedProfile.company_name,
        subscription: {
          plan: updatedProfile.subscription_tier || 'free',
          status: updatedProfile.subscription_status || 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      };

      return {
        user,
        error: null,
        status: 200
      };

    } catch (error: any) {
      console.error('Update user error:', error);
      return {
        user: null,
        error: 'Fout bij het bijwerken van het profiel',
        status: 500
      };
    }
  }
};
