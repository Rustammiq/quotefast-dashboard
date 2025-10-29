'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

export function AnimatedCounter({ value, suffix, duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

interface StatCardProps {
  icon: React.ElementType
  value: number | string
  suffix?: string
  label: string
  color: string
  bgColor: string
}

export function StatCard({ icon: Icon, value, suffix, label, color, bgColor }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="text-center group"
    >
      <motion.div
        className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${bgColor} mb-4 mx-auto ${color} shadow-lg group-hover:shadow-xl transition-all`}
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      <div className="text-4xl font-bold text-brand-text mb-2">
        {typeof value === 'number' ? (
          <AnimatedCounter value={value} suffix={suffix} />
        ) : (
          `${value}${suffix}`
        )}
      </div>
      <p className="text-brand-muted text-sm font-medium">{label}</p>
    </motion.div>
  )
}

