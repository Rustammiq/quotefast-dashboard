'use client'

import { motion } from 'framer-motion'
import { Users, Star, Clock } from 'lucide-react'

interface TrustIndicator {
  icon: typeof Users
  value: string
  label: string
  color: string
}

const indicators: TrustIndicator[] = [
  { icon: Users, value: '500+', label: 'Televreden Klanten', color: 'text-blue-400' },
  { icon: Star, value: '4.9/5', label: 'Gemiddelde Beoordeling', color: 'text-yellow-400' },
  { icon: Clock, value: '24/7', label: 'Support Beschikbaar', color: 'text-emerald-400' }
]

export default function TrustIndicators() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="flex flex-wrap justify-center gap-8 mb-12"
    >
      {indicators.map((item, index) => (
        <motion.div
          key={item.label}
          whileHover={{ scale: 1.05, y: -2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + index * 0.1 }}
          className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all"
        >
          <item.icon className={`w-6 h-6 ${item.color}`} />
          <div>
            <div className="text-2xl font-bold text-brand-text">{item.value}</div>
            <div className="text-xs text-brand-muted font-medium">{item.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

