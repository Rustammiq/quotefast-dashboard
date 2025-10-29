'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight, CheckCircle, Shield, Users, Clock } from 'lucide-react'
import GradientText from '../../components/ui/GradientText'

const trustItems = [
  { icon: CheckCircle, text: 'Geen setup kosten', color: 'text-emerald-400' },
  { icon: Shield, text: 'GDPR compliant', color: 'text-blue-400' },
  { icon: Users, text: '500+ tevreden klanten', color: 'text-purple-400' },
  { icon: Clock, text: '24/7 Support', color: 'text-orange-400' }
]

export default function CTASection() {
  return (
    <section className="relative container-app py-32 overflow-hidden">
      {/* Background gradients */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 mx-auto h-full max-w-6xl rounded-3xl bg-gradient-to-r from-brand-primary/15 via-purple-500/10 to-brand-secondary/15 blur-3xl"
      />

      <div className="relative text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold mb-6">
            <GradientText className="text-5xl font-bold">
              Klaar om je Bedrijf te Laten Groeien?
            </GradientText>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-brand-muted mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Sluit je aan bij honderden ondernemers die al hun offertes automatiseren met QuoteFast
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link 
              href="/register" 
              className="group relative btn-primary text-xl px-10 py-5 flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-brand-primary/30 hover:shadow-3xl transition-all duration-300"
            >
              <Sparkles className="w-6 h-6 relative z-10" />
              <span className="relative z-10 font-bold">Start Gratis Proberen</span>
              <ArrowRight className="w-6 h-6 relative z-10" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link 
              href="/features" 
              className="group btn-ghost text-xl px-10 py-5 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <span className="font-semibold">Bekijk Alle Features</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 text-brand-muted text-sm"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.text}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all ${item.color}`}
            >
              <item.icon className="w-4 h-4" />
              <span className="font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

