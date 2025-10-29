'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Sun, Moon, Star } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export default function Navigation() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container-app py-6 flex items-center justify-between relative z-10"
    >
      <Link href="/" className="font-bold text-xl text-brand-text flex items-center gap-2">
        <div className="relative">
          <Sparkles className="w-6 h-6 text-brand-primary" />
          <motion.span
            className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-brand-primary/20 blur-xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
        QuoteFast
      </Link>

      <div className="flex items-center gap-6">
        <div className="flex gap-4 text-brand-muted">
          {[
            { href: '/features', label: 'Features' },
            { href: '/pricing', label: 'Pricing' },
            { href: '/login', label: 'Login' }
          ].map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="hover:text-brand-text transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="theme-toggle flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/30 transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <>
              <Moon className="w-4 h-4 text-brand-text" />
              <span className="text-sm text-brand-text">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-brand-text" />
              <span className="text-sm text-brand-text">Light</span>
            </>
          )}
        </motion.button>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/register" className="btn-primary flex items-center gap-2">
            <Star className="w-4 h-4" />
            Probeer gratis
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  )
}

