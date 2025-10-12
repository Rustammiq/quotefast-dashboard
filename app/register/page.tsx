'use client'
import React, { useState } from 'react'
import { Mail, Lock, UserPlus, User, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import PublicNav from '../components/PublicNav'
import OnboardingWizard from './components/OnboardingWizard'
import { OnboardingData } from '../../lib/onboarding'
import LoadingButton from '../../components/ui/LoadingButton'
import ErrorMessage from '../../components/ui/ErrorMessage'
import ResponsiveContainer from '../../components/ui/ResponsiveContainer'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await register(form.email, form.password, form.name)
      setShowOnboarding(true)
    } catch (err: any) {
      setError(err.message || 'Er is een fout opgetreden bij het aanmaken van je account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data)
    setShowOnboarding(false)
    // Redirect to dashboard
    router.push('/dashboard')
  }

  const handleOnboardingSkip = () => {
    setShowOnboarding(false)
    // Redirect to dashboard
    router.push('/dashboard')
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <PublicNav currentPage="register" />
        <div className="container-app py-24">
          <OnboardingWizard
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <PublicNav currentPage="register" />
      <div className="container-app py-12 sm:py-24">
        <ResponsiveContainer maxWidth="md" padding="md">
          <div className="w-full glass-card bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-10 text-center shadow-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-brand-text mb-2">Maak een account 🚀</h1>
              <p className="text-brand-muted">Start je gratis proefperiode van 14 dagen</p>
            </div>

            <ErrorMessage
              message={error}
              onDismiss={() => setError('')}
              className="mb-6"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-brand-text font-medium mb-2">
                  Volledige naam
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-muted" />
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-brand-text font-medium mb-2">
                  E-mailadres
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-muted" />
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-brand-text font-medium mb-2">
                  Wachtwoord
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-muted" />
                  <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                    placeholder="Minimaal 8 karakters"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText="Account aanmaken..."
                icon={<UserPlus className="w-5 h-5" />}
                className="w-full btn-primary py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Account aanmaken
              </LoadingButton>
            </form>

            <div className="mt-8 text-center">
              <p className="text-brand-muted text-sm">
                Heb je al een account?{' '}
                <Link href="/login" className="text-brand-primary hover:text-brand-primary/80 transition-colors font-medium">
                  Inloggen
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-brand-muted">
                Door een account aan te maken, ga je akkoord met onze{' '}
                <Link href="/terms" className="text-brand-primary hover:text-brand-primary/80 transition-colors">
                  Algemene Voorwaarden
                </Link>{' '}
                en{' '}
                <Link href="/privacy" className="text-brand-primary hover:text-brand-primary/80 transition-colors">
                  Privacybeleid
                </Link>
              </p>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </div>
  )
}