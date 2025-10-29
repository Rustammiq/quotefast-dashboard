/**
 * AI-geassisteerde formulier validatie met LM Studio
 * Gebruikt deepseek-coder en qwen2.5-coder voor intelligente validatie
 */

import { chatWithModel, getModelConfig } from './lm-studio-service'

export interface ValidationResult {
  isValid: boolean
  suggestions: string[]
  strength?: number
}

/**
 * Valideer wachtwoord sterkte met AI
 */
export async function validatePasswordStrength(
  password: string
): Promise<ValidationResult> {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      suggestions: ['Wachtwoord moet minimaal 8 karakters lang zijn'],
      strength: 1,
    }
  }

  try {
    const messages = [
      {
        role: 'system' as const,
        content:
          'Je bent een expert in security en wachtwoord analyse. Analyseer het wachtwoord en geef specifieke suggesties voor verbetering.',
      },
      {
        role: 'user' as const,
        content: `Analyseer dit wachtwoord en geef een strength score (1-10) en specifieke verbeter suggesties in het Nederlands:

Wachtwoord: "${password}"

Format antwoord als:
STRENGTH: <score 1-10>
SUGGESTIONS:
- <suggestie 1>
- <suggestie 2>
- etc.`,
      },
    ]

    const response = await chatWithModel('deepseek-coder-v2-lite-instruct-mlx', messages, {
      temperature: 0.3,
      max_tokens: 256,
    })

    // Parse response
    const strengthMatch = response.match(/STRENGTH:\s*(\d+)/i)
    const strength = strengthMatch ? parseInt(strengthMatch[1]) : 5

    const suggestionsMatch = response.match(/SUGGESTIONS:[\s\S]*?(-[^\n]+(?:\n-[^\n]*)*)/i)
    const suggestions = suggestionsMatch?.[1]
      .split('\n')
      .map(s => s.replace(/^-\s*/, '').trim())
      .filter(s => s.length > 0) || []

    return {
      isValid: strength >= 7,
      suggestions,
      strength: Math.min(10, Math.max(1, strength)),
    }
  } catch (error) {
    // Fallback naar basic validatie
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const suggestions: string[] = []
    if (!hasUpper) suggestions.push('Voeg hoofdletters toe')
    if (!hasLower) suggestions.push('Voeg kleine letters toe')
    if (!hasNumber) suggestions.push('Voeg cijfers toe')
    if (!hasSpecial) suggestions.push('Voeg speciale tekens toe')

    const strength = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length * 2.5

    return {
      isValid: strength >= 7,
      suggestions,
      strength: Math.round(strength),
    }
  }
}

/**
 * Valideer e-mail en geef suggesties
 */
export async function validateEmail(email: string): Promise<ValidationResult> {
  if (!email) {
    return { isValid: false, suggestions: ['E-mail is verplicht'] }
  }

  const basicPattern = /\S+@\S+\.\S+/
  if (!basicPattern.test(email)) {
    return { isValid: false, suggestions: ['Voer een geldig e-mailadres in'] }
  }

  try {
    const messages = [
      {
        role: 'system' as const,
        content:
          'Je bent een expert in e-mail validatie en web development. Analyseer e-mailadressen en geef suggesties voor verbetering.',
      },
      {
        role: 'user' as const,
        content: `Valideer dit e-mailadres en geef suggesties voor verbetering (typfouten, veelvoorkomende fouten, etc.):

E-mail: "${email}"

Format antwoord als:
VALID: <ja/nee>
SUGGESTIONS:
- <suggestie indien nodig>`,
      },
    ]

    const response = await chatWithModel('qwen2.5-coder-14b-instruct-mlx', messages, {
      temperature: 0.2,
      max_tokens: 256,
    })

    const isValid = !response.match(/VALID:\s*nee/i)
    const suggestionsMatch = response.match(/SUGGESTIONS:[\s\S]*?(-[^\n]+(?:\n-[^\n]*)*)/i)
    const suggestions = suggestionsMatch?.[1]
      .split('\n')
      .map(s => s.replace(/^-\s*/, '').trim())
      .filter(s => s.length > 0) || []

    return { isValid, suggestions }
  } catch (error) {
    // Fallback naar basic validatie
    return { isValid: true, suggestions: [] }
  }
}

/**
 * Analyseer naam en geef suggesties
 */
export async function validateName(name: string): Promise<ValidationResult> {
  if (!name || name.length < 2) {
    return { isValid: false, suggestions: ['Naam moet minimaal 2 karakters lang zijn'] }
  }

  if (name.length > 50) {
    return { isValid: false, suggestions: ['Naam is te lang (max 50 karakters)'] }
  }

  // AI kan controleren op ongebruikelijke patronen of suggesties geven
  try {
    const messages = [
      {
        role: 'system' as const,
        content: 'Je bent een expert in naam validatie en user experience.',
      },
      {
        role: 'user' as const,
        content: `Analyseer deze naam: "${name}"
        
Is dit een geldige naam? Mogelijk een typfout of ongebruikelijk patroon?
Geef aan of de naam geldig is en eventuele suggesties.`,
      },
    ]

    const response = await chatWithModel('deepseek-coder-v2-lite-instruct-mlx', messages, {
      temperature: 0.2,
      max_tokens: 128,
    })

    const isValid = !response.toLowerCase().includes('invalid') && !response.toLowerCase().includes('ongeldig')
    
    return { 
      isValid, 
      suggestions: isValid ? [] : ['Controleer de spelling van je naam'] 
    }
  } catch (error) {
    return { isValid: true, suggestions: [] }
  }
}

/**
 * Real-time form hints generator
 */
export async function generateFormHints(field: string, value: string): Promise<string[]> {
  if (!value || value.length < 2) {
    return []
  }

  try {
    const messages = [
      {
        role: 'system' as const,
        content: 'Je bent een assistant die helpt bij het invullen van formulieren. Geef korte, behulpzame hints.',
      },
      {
        role: 'user' as const,
        content: `Geef 2-3 korte hints voor dit veld:
Veld: ${field}
Huidige waarde: "${value}"`,
      },
    ]

    const response = await chatWithModel('deepseek-coder-v2-lite-instruct-mlx', messages, {
      temperature: 0.3,
      max_tokens: 128,
    })

    // Extract hints from response
    const hints = response.split('\n').filter(line => 
      line.trim().length > 0 && !line.startsWith('Veld:')
    )
    
    return hints.map(h => h.replace(/^[-\d.]\s*/, '').trim()).filter(h => h.length > 0)
  } catch (error) {
    return []
  }
}

export default {
  validatePasswordStrength,
  validateEmail,
  validateName,
  generateFormHints,
}
