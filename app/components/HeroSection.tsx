'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import GradientText from '../../components/ui/GradientText'

interface HeroSectionProps {
  onCTAClick?: () => void
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  return (
    <section className="container-app py-24 relative z-10 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-x-0 -top-20 mx-auto h-[500px] max-w-6xl rounded-full bg-gradient-to-r from-brand-primary/25 via-purple-500/15 to-brand-secondary/25 blur-3xl"
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-primary/25 via-purple-500/15 to-brand-secondary/25 text-brand-primary px-6 py-3 rounded-full text-sm font-medium mb-8 border border-brand-primary/40 backdrop-blur-md shadow-xl shadow-brand-primary/20"
      >
        <Sparkles className="w-4 h-4" />
        <span className="font-semibold">AI-Powered Quote Generation</span>
      </motion.div>

      {/* Main Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-4xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-brand-text">
          <GradientText className="text-5xl md:text-6xl font-bold">
            Maak offertes die binnenkomen.
          </GradientText>
        </h1>
        <p className="text-xl md:text-2xl text-brand-muted max-w-3xl">
          QuoteFast combineert AI, CRM en facturatie in één strak dashboard. Automatiseer je offerteflow, volg leads op en zet deals sneller om in omzet.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mt-12"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            href="/register" 
            onClick={onCTAClick}
            className="group relative btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/30 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 relative z-10" />
            <span className="relative z-10 font-semibold">Start Gratis Proberen</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

