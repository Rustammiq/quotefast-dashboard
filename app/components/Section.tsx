'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionProps {
  title: string | ReactNode
  description?: string
  gradient?: boolean
  children: ReactNode
  className?: string
}

export default function Section({ 
  title, 
  description, 
  gradient = false,
  children,
  className = ''
}: SectionProps) {
  return (
    <section className={`container-app py-24 relative z-10 ${className}`}>
      {gradient && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute inset-x-0 -top-20 mx-auto h-[500px] max-w-6xl rounded-full bg-gradient-to-r from-brand-primary/25 via-purple-500/15 to-brand-secondary/25 blur-3xl"
        />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl font-bold text-brand-text mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </motion.div>

      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

