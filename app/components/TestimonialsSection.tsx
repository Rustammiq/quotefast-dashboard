'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { FadeIn } from '../../components/ui/Animation'

interface Testimonial {
  name: string
  role: string
  quote: string
  rating: string
  gradient: string
  avatarColor: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Lotte van Dijk',
    role: 'COO • GreenSpark Agency',
    quote: 'Onze doorlooptijd van intake tot offerte is gehalveerd. Het team kan nu focussen op consultatie in plaats van handwerk.',
    rating: '★★★★★',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    avatarColor: 'bg-emerald-500'
  },
  {
    name: 'Milan Verbeek',
    role: 'Managing Partner • Buildright',
    quote: 'De AI suggesties zijn verrassend goed. We verhogen structureel de gemiddelde orderwaarde met 18%.',
    rating: '★★★★★',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    avatarColor: 'bg-blue-500'
  },
  {
    name: 'Sara Peeters',
    role: 'Founder • Nova Installaties',
    quote: 'Eindelijk één systeem voor offertes, facturen en betalingen. Klanten tekenen binnen één klik en betalen direct online.',
    rating: '★★★★★',
    gradient: 'from-purple-500/10 to-pink-500/10',
    avatarColor: 'bg-purple-500'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="container-app py-24">
      <FadeIn>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-text mb-4">Wat klanten zeggen</h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Scale-ups, agencies en mkb bedrijven versnellen hun salescyclus met QuoteFast.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
            />

            <div className="flex items-center gap-3 text-brand-secondary mb-6 relative z-10">
              <Quote className="w-6 h-6" />
              <span className="text-sm font-semibold text-yellow-400">{testimonial.rating}</span>
            </div>

            <p className="text-brand-text text-lg leading-relaxed mb-6 relative z-10 group-hover:text-white/95 transition-colors">
              "{testimonial.quote}"
            </p>

            <div className="flex items-center gap-4 relative z-10">
              <div className={`w-12 h-12 ${testimonial.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {testimonial.name.charAt(0)}
              </div>
              <div className="text-brand-muted text-sm group-hover:text-white/90 transition-colors">
                <p className="font-semibold text-brand-text group-hover:text-white transition-colors">
                  {testimonial.name}
                </p>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

