'use client'

import Link from 'next/link'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon, Play, ArrowRight, CheckCircle, Shield, Users, Zap, Code, Rocket, Heart, Search, Bell, Settings, ArrowUp, ArrowDown, Folder, DollarSign, TrendingUp, Clock, FileText, Sparkles, Star, BarChart3, Wand2, Globe2, Quote, Puzzle, MessageCircle } from 'lucide-react'
import PublicFooter from './components/PublicFooter'
import PricingSection from './components/PricingSection'
import AnimatedCard from '../components/ui/AnimatedCard'
import GradientText from '../components/ui/GradientText'
import FloatingElements from '../components/ui/FloatingElements'
import ScrollProgress from '../components/ui/ScrollProgress'
import ParallaxSection from '../components/ui/ParallaxSection'
import { motion } from 'framer-motion'

export default function Home() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <ScrollProgress />
      <FloatingElements />
      
      {/* Navigation */}
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
            <Link href="/features" className="hover:text-brand-text transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/pricing" className="hover:text-brand-text transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/login" className="hover:text-brand-text transition-colors relative group">
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>
          
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="theme-toggle flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/30 transition-all"
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
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register" className="btn-primary flex items-center gap-2">
              <Star className="w-4 h-4" />
              Probeer gratis
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section - Enhanced */}
      <section className="container-app py-24 relative z-10">
        {/* Background accents */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-x-0 -top-10 mx-auto h-[420px] max-w-5xl rounded-full bg-gradient-to-r from-brand-primary/20 via-white/5 to-brand-secondary/20 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-16 right-12 hidden lg:block h-40 w-40 rounded-full bg-gradient-to-br from-brand-primary/30 via-brand-secondary/30 to-transparent blur-2xl"
        />

        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 text-brand-primary px-5 py-2 rounded-full text-sm font-medium mb-8 border border-brand-primary/30 backdrop-blur-sm shadow-lg shadow-brand-primary/10"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Zap className="w-4 h-4" />
          </motion.div>
          <span>AI-Powered Quote Generation</span>
          <div className="flex items-center gap-1 text-xs text-brand-secondary/80">
            <Star className="w-3 h-3" />
            <span>Vertrouwd door 500+ bedrijven</span>
          </div>
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

        {/* Hero Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
        >
          {[{
            icon: BarChart3,
            title: 'Realtime rapportages',
            description: 'Direct inzicht in pipeline, conversies en omzetgroei.'
          }, {
            icon: Wand2,
            title: 'Slimme AI-templates',
            description: 'Offertes op maat met jouw branding in seconden.'
          }, {
            icon: Globe2,
            title: 'Teamwork zonder grenzen',
            description: 'Werk samen met collega’s en freelancers in één workspace.'
          }].map((item, index) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-xl shadow-brand-primary/5"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-brand-text mb-2">{item.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
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
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 group shadow-lg shadow-brand-primary/20">
              <Sparkles className="w-5 h-5" />
              Start Gratis Proberen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/features" className="btn-ghost text-lg px-8 py-4 flex items-center justify-center gap-2 border border-white/10 backdrop-blur">
              <Play className="w-5 h-5" />
              Bekijk Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <p className="text-brand-muted text-sm uppercase tracking-widest mb-6">Gebruikt door bouw, consultancy en marketingteams</p>
          <div className="flex flex-wrap items-center gap-6 text-brand-text/50 text-sm md:text-base">
            {['ConstructIQ', 'GreenSpark Agency', 'Nova Installaties', 'BrightConsult', 'StudioFlow'].map((brand) => (
              <span key={brand} className="rounded-full border border-white/10 px-4 py-2 backdrop-blur-sm hover:text-brand-text/80 transition">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Preview - Makerkit Style */}
        <div className="mt-16 relative">
          <div className="relative max-w-6xl mx-auto">
            {/* macOS Window Frame */}
            <div className="macos-window rounded-t-xl overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-800/50 border-b border-gray-600/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm font-mono">QuoteFast Dashboard</div>
                <div className="w-6"></div>
              </div>
            </div>
            
            {/* Dashboard Content - Real Dashboard Interface */}
            <div className="bg-gray-900 rounded-b-xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gray-800/50 border-b border-gray-700/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search anything..." 
                        className="bg-gray-700/50 text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-600/30 focus:outline-none focus:border-blue-500/50 w-64"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                    <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                    <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        U
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promotional Banner */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 mx-6 mt-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Try the Advanced Layout</h3>
                    <p className="text-gray-300">Experience custom cursors, 3D backgrounds, and glassmorphism effects.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                      <Zap className="w-4 h-4" />
                      View Demo
                    </button>
                    <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-colors">
                      Examples
                    </button>
                  </div>
                </div>
              </div>

              {/* Dashboard Cards Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Card 1 - Executions */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Executions</h3>
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">340</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        204%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>75%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 2 - Projects */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Projects</h3>
                      <Folder className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">12</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        18%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/5"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>60%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 3 - Team Reviews */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Team Reviews</h3>
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">5</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                        <ArrowDown className="w-3 h-3" />
                        -12%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-2/5"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>40%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 4 - Active Users */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Active Users</h3>
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">1.284</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        8%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-4/5"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>82%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 5 - Revenue */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Revenue</h3>
                      <DollarSign className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">$45.2K</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        32%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-9/10"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>91%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 6 - Conversion */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Conversion</h3>
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">3.2%</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                        <ArrowDown className="w-3 h-3" />
                        -5%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/10"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>28%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 7 - Avg Response */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Avg. Response</h3>
                      <Clock className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">1.2s</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        15%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-2/3"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>67%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 8 - Offers Generated */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Offers Generated</h3>
                      <FileText className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">127</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        24%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>76%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced */}
      <section className="container-app py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-text mb-4">
            <GradientText>Waarom kiezen voor QuoteFast?</GradientText>
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Ontdek de krachtige features die je bedrijf naar het volgende niveau tillen
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[{
            icon: Wand2,
            title: 'AI Offertegenerator',
            description: 'Laat AI automatisch professionele offertes genereren met slimme productherkenning en optimale prijzen.'
          }, {
            icon: Users,
            title: 'CRM & Klantbeheer',
            description: 'Hou leads, klanten en follow-ups bij in één overzichtelijke workspace zonder spreadsheets.'
          }, {
            icon: Shield,
            title: 'Facturatie & Betalingen',
            description: 'Automatische facturatie, betaalherinneringen en Stripe-integratie voor een soepel betaalproces.'
          }, {
            icon: Rocket,
            title: 'Workflow Automatisering',
            description: 'Automatiseer repetitieve taken van lead tot factuur en schaal je business zonder extra overhead.'
          }].map((feature, index) => (
            <AnimatedCard
              key={feature.title}
              delay={0.1 * (index + 1)}
              className="bg-brand-card/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-brand-primary/40 transition-all shadow-lg shadow-brand-primary/10"
            >
              <motion.div
                whileHover={{ rotate: 3, scale: 1.05 }}
                className="w-14 h-14 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-xl flex items-center justify-center mb-6"
              >
                <feature.icon className="w-7 h-7 text-brand-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-brand-text mb-3">{feature.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{feature.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Workflow Showcase */}
      <section className="container-app py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-text mb-4">Zie QuoteFast in Actie</h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Volg het volledige traject van lead naar betaalde klant met een glasheldere workflow en realtime inzichten.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-brand-primary/30 via-brand-secondary/20 to-transparent blur-3xl" aria-hidden></div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-xl shadow-2xl shadow-brand-primary/20">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-secondary/80">Realtime demo</span>
                  <h3 className="text-2xl font-semibold text-brand-text mt-2">QuoteFast Dashboard</h3>
                </div>
                <div className="flex items-center gap-2 text-brand-muted text-xs">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  Live
                </div>
              </div>
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-primary/20 via-brand-secondary/10 to-white/5 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg shadow-brand-primary/30">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <p className="text-brand-text font-medium">Speel de producttour</p>
                  <p className="text-brand-muted text-sm mt-1">4 minuten • Geen geluid nodig</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {[{
                  label: 'Offertes verstuurd',
                  value: '127',
                  trend: '+32%',
                  positive: true
                }, {
                  label: 'Gem. responstijd',
                  value: '1.2s',
                  trend: '-18%',
                  positive: true
                }, {
                  label: 'Conversie',
                  value: '35%',
                  trend: '+12%',
                  positive: true
                }].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-6">
                    <span className="text-brand-muted text-xs uppercase tracking-wide">{item.label}</span>
                    <p className="text-brand-text text-2xl font-semibold mt-1">{item.value}</p>
                    <span className={`text-xs font-medium ${item.positive ? 'text-emerald-400' : 'text-rose-400'}`}>{item.trend} deze week</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[{
              icon: Wand2,
              title: '1. Capture & kwalificeer leads',
              description: 'Importeer leads vanuit webforms, e-mail of CRM en verrijk automatisch met bedrijfsdata.'
            }, {
              icon: Puzzle,
              title: '2. Bouw offertes met AI',
              description: 'AI vult producten, marges en voorwaarden voor je in. Jij personaliseert en verstuurt.'
            }, {
              icon: Sparkles,
              title: '3. Win deals & factureer',
              description: 'Klant accepteert digitaal. Facturen, herinneringen en betalingen gaan automatisch.'
            }].map((step) => (
              <motion.div
                key={step.title}
                whileHover={{ x: 8 }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-text">{step.title}</h3>
                  <p className="text-sm text-brand-muted mt-2 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="flex items-center gap-4 rounded-2xl border border-brand-primary/30 bg-brand-primary/10 p-6 text-brand-text">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg shadow-brand-primary/30">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Binnen 7 dagen live</p>
                <p className="text-xs text-brand-muted">Onboarding specialist inbegrepen in elk pakket.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-app py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-text mb-4">Wat klanten zeggen</h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Scale-ups, agencies en mkb bedrijven versnellen hun salescyclus met QuoteFast.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{
            name: 'Lotte van Dijk',
            role: 'COO • GreenSpark Agency',
            quote: 'Onze doorlooptijd van intake tot offerte is gehalveerd. Het team kan nu focussen op consultatie in plaats van handwerk.',
            rating: '★★★★★'
          }, {
            name: 'Milan Verbeek',
            role: 'Managing Partner • Buildright',
            quote: 'De AI suggesties zijn verrassend goed. We verhogen structureel de gemiddelde orderwaarde met 18%.',
            rating: '★★★★★'
          }, {
            name: 'Sara Peeters',
            role: 'Founder • Nova Installaties',
            quote: 'Eindelijk één systeem voor offertes, facturen en betalingen. Klanten tekenen binnen één klik en betalen direct online.',
            rating: '★★★★★'
          }].map((testimonial) => (
            <motion.div
              key={testimonial.name}
              whileHover={{ y: -6 }}
              className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-xl shadow-brand-primary/10"
            >
              <div className="flex items-center gap-3 text-brand-secondary mb-4">
                <Quote className="w-5 h-5" />
                <span className="text-sm font-semibold">{testimonial.rating}</span>
              </div>
              <p className="text-brand-text text-lg leading-relaxed mb-6">“{testimonial.quote}”</p>
              <div className="text-brand-muted text-sm">
                <p className="font-semibold text-brand-text">{testimonial.name}</p>
                <p>{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Integrations & Support */}
      <section className="container-app py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-brand-text mb-6">Integreer met je favoriete tools</h2>
            <p className="text-brand-muted text-lg mb-8">
              QuoteFast koppelt naadloos met CRM-systemen, boekhoudsoftware en communicatie-apps. Automatiseer datastromen zonder custom code.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {['HubSpot', 'Exact Online', 'Teamleader', 'Zendesk', 'Slack', 'Google Drive'].map((integration) => (
                <span key={integration} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-brand-text text-center backdrop-blur-md">
                  {integration}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-brand-muted">
              <MessageCircle className="w-5 h-5 text-brand-secondary" />
              <span>Dedicated success manager en live chat support voor Premium klanten.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="video-placeholder aspect-video rounded-2xl flex items-center justify-center group cursor-pointer">
                <div className="text-center">
                  <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-brand-text font-medium">Authenticatie Demo</p>
                  <p className="text-brand-muted text-sm mt-2">Login & Registratie Flow</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="container-app py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-brand-text mb-6">Klaar om je Bedrijf te Laten Groeien?</h2>
          <p className="text-brand-muted text-lg mb-8 max-w-2xl mx-auto">
            Sluit je aan bij honderden ondernemers die al hun offertes automatiseren met QuoteFast
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 group">
              Start Gratis Proberen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/features" className="btn-ghost text-lg px-8 py-4">Bekijk Alle Features</Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-brand-muted text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-brand-secondary" />
              <span>Geen setup kosten</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-secondary" />
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-secondary" />
              <span>500+ tevreden klanten</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}
