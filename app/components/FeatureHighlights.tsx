'use client'

import { motion } from 'framer-motion'
import { BarChart3, Wand2, Globe2 } from 'lucide-react'

interface FeatureHighlight {
  icon: typeof BarChart3
  title: string
  description: string
  gradient: string
  iconColor: string
}

const features: FeatureHighlight[] = [
  {
    icon: BarChart3,
    title: 'Realtime rapportages',
    description: 'Direct inzicht in pipeline, conversies en omzetgroei.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400'
  },
  {
    icon: Wand2,
    title: 'Slimme AI-templates',
    description: 'Offertes op maat met jouw branding in seconden.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400'
  },
  {
    icon: Globe2,
    title: 'Teamwork zonder grenzen',
    description: 'Werk samen met collega\'s en freelancers in één workspace.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400'
  }
]

export default function FeatureHighlights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl"
    >
      {features.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} ${item.iconColor} relative z-10 shadow-lg`}
          >
            <item.icon className="w-7 h-7" />
          </motion.div>
          <h3 className="text-xl font-bold text-brand-text mb-3 relative z-10 group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-brand-muted leading-relaxed relative z-10 group-hover:text-white/90 transition-colors">
            {item.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}

