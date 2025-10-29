'use client'
import React, { useState } from 'react'
import { Mail, Lock, UserPlus, User, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import PublicNav from '../components/PublicNav'
import OnboardingWizard from './components/OnboardingWizard'
import { OnboardingData } from '../../lib/onboarding'
import { motion } from 'framer-motion'
import AnimatedCard from '../../components/ui/AnimatedCard'
import GradientText from '../../components/ui/GradientText'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { validatePasswordStrength, validateEmail, validateName, generateFormHints } from '../../lib/ai-form-validator'

const isMockMode = process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)

  // AI Validation state
  const [validationResults, setValidationResults] = useState({
    name: { isValid: true, suggestions: [] as string[] },
    email: { isValid: true, suggestions: [] as string[] },
    password: { isValid: true, suggestions: [] as string[], strength: 0 }
  })
  const [formHints, setFormHints] = useState({
    name: [] as string[],
    email: [] as string[],
    password: [] as string[]
  })
  const { register } = useAuth()
  const router = useRouter()

  // AI Validation functions
  const validateField = async (field: string, value: string) => {
    try {
      let result;
      switch (field) {
        case 'name':
          result = await validateName(value);
          break;
        case 'email':
          result = await validateEmail(value);
          break;
        case 'password':
          result = await validatePasswordStrength(value);
          break;
        default:
          return;
      }

      setValidationResults(prev => ({
        ...prev,
        [field]: result
      }));

      // Generate hints for the field
      if (value.length > 1) {
        const hints = await generateFormHints(field, value);
        setFormHints(prev => ({
          ...prev,
          [field]: hints
        }));
      }
    } catch (error) {
      console.warn(`AI validation failed for ${field}:`, error);
      // Fallback to basic validation
      setValidationResults(prev => ({
        ...prev,
        [field]: { isValid: true, suggestions: [], strength: field === 'password' ? 5 : undefined }
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));

    // Debounced AI validation
    if (value.length > 2) {
      const timeoutId = setTimeout(() => validateField(field, value), 500);
      return () => clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate all fields before submission
    const nameValidation = await validateName(form.name);
    const emailValidation = await validateEmail(form.email);
    const passwordValidation = await validatePasswordStrength(form.password);

    // Update validation results
    setValidationResults({
      name: nameValidation,
      email: emailValidation,
      password: passwordValidation
    });

    // Check if all validations pass
    if (!nameValidation.isValid || !emailValidation.isValid || !passwordValidation.isValid) {
      setError('Corrigeer de fouten in het formulier voordat je verder gaat.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(form.email, form.password, form.name)

      if (result.status === 202) {
        // E-mailbevestiging vereist - toon informatief bericht
        setError('Registratie gestart. Controleer je e-mail om je account te activeren.');
        setIsLoading(false);
        return;
      }

      if (result.error) {
        throw new Error(result.error)
      }

      // Succes — toon onboarding
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
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <PublicNav currentPage="register" />
      <div className="container-app py-24">
        <AnimatedCard className="w-full max-w-md mx-auto">
          <div className="glass-card-premium rounded-3xl p-10 text-center shadow-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <h1 className="text-3xl font-bold text-brand-text">
                  Maak een account
                </h1>
              </div>
              <p className="text-brand-muted">Start je gratis proefperiode van 14 dagen</p>
            </motion.div>

            {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            </div>
          )}

          {isMockMode && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-300 text-sm">
                Supabase is nog niet geconfigureerd. Vul je projectgegevens in `.env.local` in om echte registratie te gebruiken.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-brand-text font-medium mb-2">
                Volledige naam
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-text opacity-50" />
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 transition-colors ${
                    validationResults.name.isValid
                      ? 'border-white/20 focus:ring-brand-primary'
                      : 'border-red-400/50 focus:ring-red-400'
                  }`}
                  placeholder="John Doe"
                  required
                />
              </div>
              {/* AI Validation feedback */}
              {!validationResults.name.isValid && validationResults.name.suggestions.length > 0 && (
                <div className="mt-2 text-sm text-red-400">
                  <ul className="list-disc list-inside space-y-1">
                    {validationResults.name.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* AI Hints */}
              {formHints.name.length > 0 && validationResults.name.isValid && (
                <div className="mt-2 text-sm text-blue-400">
                  <div className="font-medium mb-1">💡 Tips:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {formHints.name.slice(0, 2).map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-brand-text font-medium mb-2">
                E-mailadres
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-text opacity-50" />
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 transition-colors ${
                    validationResults.email.isValid
                      ? 'border-white/20 focus:ring-brand-primary'
                      : 'border-red-400/50 focus:ring-red-400'
                  }`}
                  placeholder="john@example.com"
                  required
                />
              </div>
              {/* AI Validation feedback */}
              {!validationResults.email.isValid && validationResults.email.suggestions.length > 0 && (
                <div className="mt-2 text-sm text-red-400">
                  <ul className="list-disc list-inside space-y-1">
                    {validationResults.email.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* AI Hints */}
              {formHints.email.length > 0 && validationResults.email.isValid && (
                <div className="mt-2 text-sm text-blue-400">
                  <div className="font-medium mb-1">💡 Tips:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {formHints.email.slice(0, 2).map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-brand-text font-medium mb-2">
                Wachtwoord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-text opacity-50" />
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 transition-colors ${
                    validationResults.password.isValid
                      ? 'border-white/20 focus:ring-brand-primary'
                      : 'border-red-400/50 focus:ring-red-400'
                  }`}
                  placeholder="Minimaal 8 karakters"
                  required
                  minLength={8}
                />
              </div>

              {/* Password Strength Indicator */}
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-brand-muted">Wachtwoord sterkte:</span>
                    <span className={`text-xs font-medium ${
                      validationResults.password.strength >= 7 ? 'text-green-400' :
                      validationResults.password.strength >= 5 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {validationResults.password.strength >= 7 ? 'Sterk' :
                       validationResults.password.strength >= 5 ? 'Gemiddeld' : 'Zwak'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        validationResults.password.strength >= 7 ? 'bg-green-400' :
                        validationResults.password.strength >= 5 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.min(100, (validationResults.password.strength / 10) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* AI Validation feedback */}
              {!validationResults.password.isValid && validationResults.password.suggestions.length > 0 && (
                <div className="mt-2 text-sm text-red-400">
                  <ul className="list-disc list-inside space-y-1">
                    {validationResults.password.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* AI Hints */}
              {formHints.password.length > 0 && validationResults.password.isValid && (
                <div className="mt-2 text-sm text-blue-400">
                  <div className="font-medium mb-1">💡 Tips:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {formHints.password.slice(0, 2).map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full btn-primary py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Account aanmaken...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Account aanmaken</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-brand-muted text-sm">
              Heb je al een account?{' '}
              <Link href="/login" className="text-brand-text underline hover:opacity-80 transition-opacity font-medium">
                Inloggen
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-brand-muted">
              Door een account aan te maken, ga je akkoord met onze{' '}
              <Link href="/terms" className="text-brand-text underline hover:opacity-80 transition-opacity">
                Algemene Voorwaarden
              </Link>{' '}
              en{' '}
              <Link href="/privacy" className="text-brand-text underline hover:opacity-80 transition-opacity">
                Privacybeleid
              </Link>
            </p>
          </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}