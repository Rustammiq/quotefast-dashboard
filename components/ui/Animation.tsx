'use client'

import { ReactNode } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface FadeInProps extends Omit<MotionProps, 'children'> {
  children: ReactNode
  delay?: number
  duration?: number
}

/**
 * Accessibility-aware fade-in animation
 * Respecteert prefers-reduced-motion
 */
export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6,
  ...props 
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

