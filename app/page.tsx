'use client'

import PublicFooter from './components/PublicFooter'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import FeatureHighlights from './components/FeatureHighlights'
import TrustIndicators from './components/TrustIndicators'
import DashboardPreview from './components/DashboardPreview'
import PricingSection from './components/PricingSection'
import TestimonialsSection from './components/TestimonialsSection'
import IntegrationsSection from './components/IntegrationsSection'
import CTASection from './components/CTASection'
import Section from './components/Section'
import { StatCard } from './components/StatCard'
import FloatingElements from '../components/ui/FloatingElements'
import ScrollProgress from '../components/ui/ScrollProgress'
import { Users, FileText, TrendingUp, Clock, Wand2, Shield, Rocket } from 'lucide-react'
import GradientText from '../components/ui/GradientText'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <ScrollProgress />
      <FloatingElements />
      
      <Navigation />

      <HeroSection />

      <FeatureHighlights />

      <TrustIndicators />

      <DashboardPreview />

      {/* Statistics Section */}
      <Section 
        title={<GradientText>Groei in Cijfers</GradientText>}
        description="Meer dan 500 bedrijven vertrouwen op QuoteFast voor hun offerteprocessen"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StatCard
            icon={Users}
            value={500}
            suffix="+"
            label="Televreden Klanten"
            color="text-blue-400"
            bgColor="from-blue-500/20 to-cyan-500/20"
          />
          <StatCard
            icon={FileText}
            value={12500}
            suffix="+"
            label="Offertes Gegenereerd"
            color="text-emerald-400"
            bgColor="from-emerald-500/20 to-teal-500/20"
          />
          <StatCard
            icon={TrendingUp}
            value={98}
            suffix="%"
            label="Conversie Ratio"
            color="text-purple-400"
            bgColor="from-purple-500/20 to-pink-500/20"
          />
          <StatCard
            icon={Clock}
            value={1.2}
            suffix="s"
            label="Gem. Responstijd"
            color="text-orange-400"
            bgColor="from-orange-500/20 to-red-500/20"
          />
        </div>
      </Section>

      {/* Features Section */}
      <Section
        title={<GradientText>Waarom kiezen voor QuoteFast?</GradientText>}
        description="Ontdek de krachtige features die je bedrijf naar het volgende niveau tillen"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Wand2,
              title: 'AI Offertegenerator',
              description: 'Laat AI automatisch professionele offertes genereren met slimme productherkenning en optimale prijzen.',
              gradient: 'from-purple-500/20 via-pink-500/15 to-indigo-500/20',
              iconColor: 'text-purple-400',
              bgColor: 'from-purple-500/10 to-pink-500/10',
            },
            {
              icon: Users,
              title: 'CRM & Klantbeheer',
              description: 'Hou leads, klanten en follow-ups bij in één overzichtelijke workspace zonder spreadsheets.',
              gradient: 'from-blue-500/20 via-cyan-500/15 to-teal-500/20',
              iconColor: 'text-blue-400',
              bgColor: 'from-blue-500/10 to-cyan-500/10',
            },
            {
              icon: Shield,
              title: 'Facturatie & Betalingen',
              description: 'Automatische facturatie, betaalherinneringen en Stripe-integratie voor een soepel betaalproces.',
              gradient: 'from-emerald-500/20 via-green-500/15 to-teal-500/20',
              iconColor: 'text-emerald-400',
              bgColor: 'from-emerald-500/10 to-green-500/10',
            },
            {
              icon: Rocket,
              title: 'Workflow Automatisering',
              description: 'Automatiseer repetitieve taken van lead tot factuur en schaal je business zonder extra overhead.',
              gradient: 'from-orange-500/20 via-red-500/15 to-pink-500/20',
              iconColor: 'text-orange-400',
              bgColor: 'from-orange-500/10 to-red-500/10',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="group relative bg-brand-card/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} ${feature.iconColor} relative z-10 shadow-lg`}
              >
                <feature.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-bold text-brand-text mb-3 relative z-10 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed relative z-10 group-hover:text-white/90 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <TestimonialsSection />
      <IntegrationsSection />
      <PricingSection />
      <CTASection />

      <PublicFooter />
    </div>
  )
}

