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
      <section className="container-app py-24 relative z-10 overflow-hidden">
        {/* Enhanced Background Elements */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-x-0 -top-20 mx-auto h-[500px] max-w-6xl rounded-full bg-gradient-to-r from-brand-primary/25 via-purple-500/15 to-brand-secondary/25 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 right-16 hidden lg:block h-48 w-48 rounded-full bg-gradient-to-br from-brand-primary/40 via-pink-500/30 to-brand-secondary/40 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{
            y: [0, 25, 0],
            x: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 left-16 hidden lg:block h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/20 via-brand-primary/30 to-cyan-400/20 blur-3xl"
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 hidden lg:block w-6 h-6 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-60"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-32 hidden lg:block w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-70"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-1/4 hidden lg:block w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-50"
        />

        {/* Enhanced Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-primary/25 via-purple-500/15 to-brand-secondary/25 text-brand-primary px-6 py-3 rounded-full text-sm font-medium mb-8 border border-brand-primary/40 backdrop-blur-md shadow-xl shadow-brand-primary/20 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
            className="relative z-10"
          >
            <Zap className="w-4 h-4" />
          </motion.div>
          <span className="relative z-10 font-semibold">AI-Powered Quote Generation</span>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-1 text-xs text-brand-secondary/90 relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-3 h-3" />
            </motion.div>
            <span>Vertrouwd door 500+ bedrijven</span>
          </motion.div>
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

        {/* Enhanced Hero Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl"
        >
          {[{
            icon: BarChart3,
            title: 'Realtime rapportages',
            description: 'Direct inzicht in pipeline, conversies en omzetgroei.',
            gradient: 'from-blue-500/20 to-cyan-500/20',
            iconColor: 'text-blue-400'
          }, {
            icon: Wand2,
            title: 'Slimme AI-templates',
            description: 'Offertes op maat met jouw branding in seconden.',
            gradient: 'from-purple-500/20 to-pink-500/20',
            iconColor: 'text-purple-400'
          }, {
            icon: Globe2,
            title: 'Teamwork zonder grenzen',
            description: 'Werk samen met collega\'s en freelancers in één workspace.',
            gradient: 'from-emerald-500/20 to-teal-500/20',
            iconColor: 'text-emerald-400'
          }].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-xl shadow-brand-primary/5 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-300 overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Floating particles effect */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"
              />
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  x: [0, 5, 0],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/40 rounded-full"
              />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} ${item.iconColor} relative z-10 shadow-lg`}
              >
                <item.icon className="w-7 h-7" />
              </motion.div>
              <h3 className="text-xl font-bold text-brand-text mb-3 relative z-10 group-hover:text-white transition-colors duration-300">{item.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed relative z-10 group-hover:text-white/90 transition-colors duration-300">{item.description}</p>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-primary/10 via-transparent to-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/register" className="group relative btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/30 transition-all duration-300">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-brand-secondary/0 via-brand-secondary/20 to-brand-primary/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-lg"
                initial={{ scale: 0, opacity: 0.8 }}
                whileTap={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />

              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 relative z-10" />
              </motion.div>
              <span className="relative z-10 font-semibold">Start Gratis Proberen</span>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.div>

              {/* Floating particles */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-2 right-4 w-1 h-1 bg-white/60 rounded-full"
              />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/features" className="group relative btn-ghost text-lg px-8 py-4 flex items-center justify-center gap-2 border border-white/10 backdrop-blur-md hover:border-white/30 hover:bg-white/10 transition-all duration-300 overflow-hidden">
              {/* Subtle hover background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />

              <motion.div
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
                className="relative z-10"
              >
                <Play className="w-5 h-5" />
              </motion.div>
              <span className="relative z-10 font-medium">Bekijk Demo</span>

              {/* Play button pulse effect */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 border border-white/20 rounded-lg"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          {/* Trust indicators with animated counters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { icon: Users, value: '500+', label: 'Televreden Klanten', color: 'text-blue-400' },
              { icon: Star, value: '4.9/5', label: 'Gemiddelde Beoordeling', color: 'text-yellow-400' },
              { icon: Clock, value: '24/7', label: 'Support Beschikbaar', color: 'text-emerald-400' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  className={`${item.color}`}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
                <div>
                  <motion.div
                    className="text-2xl font-bold text-brand-text"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                  >
                    {item.value}
                  </motion.div>
                  <div className="text-xs text-brand-muted font-medium">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Company logos/brands section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-center"
          >
            <motion.p
              className="text-brand-muted text-sm uppercase tracking-widest mb-8"
              whileHover={{ scale: 1.02 }}
            >
              Vertrouwd door toonaangevende bedrijven in Nederland
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'ConstructIQ', industry: 'Bouw', color: 'from-blue-500/20 to-cyan-500/20' },
                { name: 'GreenSpark Agency', industry: 'Marketing', color: 'from-emerald-500/20 to-teal-500/20' },
                { name: 'Nova Installaties', industry: 'Installatie', color: 'from-purple-500/20 to-pink-500/20' },
                { name: 'BrightConsult', industry: 'Consultancy', color: 'from-orange-500/20 to-red-500/20' },
                { name: 'StudioFlow', industry: 'Design', color: 'from-indigo-500/20 to-purple-500/20' }
              ].map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative"
                >
                  <motion.div
                    className={`relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer`}
                  >
                    {/* Animated background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <motion.div
                      className="text-center relative z-10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="text-lg font-bold text-brand-text mb-1 group-hover:text-white transition-colors duration-300"
                      >
                        {brand.name}
                      </motion.div>
                      <motion.div
                        className="text-xs text-brand-muted group-hover:text-white/80 transition-colors duration-300"
                      >
                        {brand.industry}
                      </motion.div>
                    </motion.div>

                    {/* Floating particles */}
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{
                        duration: 3 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-2 right-2 w-1 h-1 bg-white/30 rounded-full"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Additional testimonials preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-brand-muted"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"
              >
                <Quote className="w-4 h-4 text-brand-secondary" />
                <span>"Bespaart ons 15 uur per week"</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>"32% meer conversies"</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"
              >
                <Heart className="w-4 h-4 text-pink-400" />
                <span>"Eindelijk georganiseerd"</span>
              </motion.div>
            </motion.div>
          </motion.div>
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

              {/* Enhanced Promotional Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-gradient-to-r from-blue-600/30 via-purple-600/25 to-pink-600/20 border border-blue-500/40 mx-6 mt-6 rounded-xl p-6 relative overflow-hidden group cursor-pointer"
              >
                {/* Animated background particles */}
                <motion.div
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-4 w-2 h-2 bg-blue-400/50 rounded-full"
                />
                <motion.div
                  animate={{
                    x: [0, -80, 0],
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-purple-400/50 rounded-full"
                />

                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <motion.h3
                      className="text-xl font-bold text-white mb-2 flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      Try the Advanced Layout
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                      </motion.div>
                    </motion.h3>
                    <p className="text-gray-300">Experience custom cursors, 3D backgrounds, and glassmorphism effects.</p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25"
                    >
                      <Zap className="w-4 h-4" />
                      View Demo
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(107, 114, 128, 0.7)' }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-700/50 hover:bg-gray-600/70 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      Examples
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Dashboard Cards Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Enhanced Card 1 - Executions */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Animated background glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                    />

                    {/* Floating particles */}
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.4, 0.8, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-2 right-2 w-1 h-1 bg-blue-400/60 rounded-full"
                    />

                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <h3 className="text-gray-300 text-sm font-medium">Executions</h3>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="text-blue-400"
                      >
                        <Zap className="w-4 h-4" />
                      </motion.div>
                    </div>

                    <motion.div
                      className="text-3xl font-bold text-white mb-2 relative z-10"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      340
                    </motion.div>

                    <div className="flex items-center gap-2 mb-3 relative z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs hover:bg-green-500/30 transition-colors"
                      >
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowUp className="w-3 h-3" />
                        </motion.div>
                        204%
                      </motion.div>
                    </div>

                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2 relative z-10">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 relative z-10">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        75%
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        Last updated: Just now
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Enhanced Card 2 - Projects */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Animated background glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                    />

                    {/* Floating particles */}
                    <motion.div
                      animate={{
                        y: [0, 6, 0],
                        x: [0, 3, 0],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-3 right-3 w-1.5 h-1.5 bg-emerald-400/60 rounded-full"
                    />

                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <h3 className="text-gray-300 text-sm font-medium">Projects</h3>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="text-emerald-400"
                      >
                        <Folder className="w-4 h-4" />
                      </motion.div>
                    </div>

                    <motion.div
                      className="text-3xl font-bold text-white mb-2 relative z-10"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      12
                    </motion.div>

                    <div className="flex items-center gap-2 mb-3 relative z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs hover:bg-green-500/30 transition-colors"
                      >
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        >
                          <ArrowUp className="w-3 h-3" />
                        </motion.div>
                        18%
                      </motion.div>
                    </div>

                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2 relative z-10">
                      <motion.div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 relative z-10">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        60%
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                      >
                        Last updated: Just now
                      </motion.span>
                    </div>
                  </motion.div>

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

      {/* Animated Statistics Section */}
      <section className="container-app py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-text mb-4">
            <GradientText>Groei in Cijfers</GradientText>
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Meer dan 500 bedrijven vertrouwen op QuoteFast voor hun offerteprocessen
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: 500, suffix: '+', label: 'Televreden Klanten', icon: Users, color: 'text-blue-400', bgColor: 'from-blue-500/20 to-cyan-500/20' },
            { value: 12500, suffix: '+', label: 'Offertes Gegenereerd', icon: FileText, color: 'text-emerald-400', bgColor: 'from-emerald-500/20 to-teal-500/20' },
            { value: 98, suffix: '%', label: 'Conversie Ratio', icon: TrendingUp, color: 'text-purple-400', bgColor: 'from-purple-500/20 to-pink-500/20' },
            { value: 1.2, suffix: 's', label: 'Gem. Responstijd', icon: Clock, color: 'text-orange-400', bgColor: 'from-orange-500/20 to-red-500/20' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="text-center group"
            >
              <motion.div
                className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.bgColor} mb-4 mx-auto ${stat.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-8 h-8" />
              </motion.div>

              <motion.div
                className="text-4xl font-bold text-brand-text mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1, type: "spring" }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="inline-block"
                >
                  {typeof stat.value === 'number' && stat.value > 100 ? (
                    <motion.span
                      initial={{ textContent: 0 }}
                      whileInView={{ textContent: stat.value }}
                      transition={{ duration: 2, delay: 0.5 + index * 0.1 }}
                      className="inline-block"
                    >
                      {stat.value.toLocaleString()}
                    </motion.span>
                  ) : (
                    stat.value
                  )}
                  {stat.suffix}
                </motion.span>
              </motion.div>

              <p className="text-brand-muted text-sm font-medium">{stat.label}</p>

              {/* Animated background particles */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
                className={`absolute top-4 right-4 w-2 h-2 ${stat.color.replace('text-', 'bg-')}/40 rounded-full`}
              />
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  x: [0, -8, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
                className={`absolute bottom-6 left-6 w-1.5 h-1.5 ${stat.color.replace('text-', 'bg-')}/50 rounded-full`}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-brand-muted text-sm"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>ISO 27001 Certified</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span>GDPR Compliant</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"
          >
            <Globe2 className="w-4 h-4 text-purple-400" />
            <span>99.9% Uptime</span>
          </motion.div>
        </motion.div>
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
            description: 'Laat AI automatisch professionele offertes genereren met slimme productherkenning en optimale prijzen.',
            gradient: 'from-purple-500/20 via-pink-500/15 to-indigo-500/20',
            iconColor: 'text-purple-400',
            bgColor: 'from-purple-500/10 to-pink-500/10',
            particles: [
              { size: 'w-1.5 h-1.5', color: 'bg-purple-400/40', duration: 3, delay: 0 },
              { size: 'w-1 h-1', color: 'bg-pink-400/50', duration: 4, delay: 1 }
            ]
          }, {
            icon: Users,
            title: 'CRM & Klantbeheer',
            description: 'Hou leads, klanten en follow-ups bij in één overzichtelijke workspace zonder spreadsheets.',
            gradient: 'from-blue-500/20 via-cyan-500/15 to-teal-500/20',
            iconColor: 'text-blue-400',
            bgColor: 'from-blue-500/10 to-cyan-500/10',
            particles: [
              { size: 'w-2 h-2', color: 'bg-blue-400/30', duration: 4, delay: 0 },
              { size: 'w-1 h-1', color: 'bg-cyan-400/40', duration: 3, delay: 0.5 }
            ]
          }, {
            icon: Shield,
            title: 'Facturatie & Betalingen',
            description: 'Automatische facturatie, betaalherinneringen en Stripe-integratie voor een soepel betaalproces.',
            gradient: 'from-emerald-500/20 via-green-500/15 to-teal-500/20',
            iconColor: 'text-emerald-400',
            bgColor: 'from-emerald-500/10 to-green-500/10',
            particles: [
              { size: 'w-1.5 h-1.5', color: 'bg-emerald-400/40', duration: 3.5, delay: 0 },
              { size: 'w-1 h-1', color: 'bg-green-400/50', duration: 4.5, delay: 1.5 }
            ]
          }, {
            icon: Rocket,
            title: 'Workflow Automatisering',
            description: 'Automatiseer repetitieve taken van lead tot factuur en schaal je business zonder extra overhead.',
            gradient: 'from-orange-500/20 via-red-500/15 to-pink-500/20',
            iconColor: 'text-orange-400',
            bgColor: 'from-orange-500/10 to-red-500/10',
            particles: [
              { size: 'w-2 h-2', color: 'bg-orange-400/30', duration: 4, delay: 0 },
              { size: 'w-1 h-1', color: 'bg-red-400/40', duration: 3, delay: 1 }
            ]
          }].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1 * (index + 1),
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative bg-brand-card/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl shadow-brand-primary/5 hover:shadow-2xl hover:shadow-brand-primary/15 overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {/* Floating particles */}
              {feature.particles.map((particle, particleIndex) => (
                <motion.div
                  key={particleIndex}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    opacity: [0.2, 0.7, 0.2]
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: particle.delay
                  }}
                  className={`absolute ${particle.size} ${particle.color} rounded-full`}
                  style={{
                    top: `${20 + particleIndex * 30}%`,
                    right: `${15 + particleIndex * 25}%`
                  }}
                />
              ))}

              {/* Icon container */}
              <motion.div
                whileHover={{
                  rotate: [0, -5, 5, 0],
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
                className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.iconColor} z-10`}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 8 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>

                {/* Icon glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
                />
              </motion.div>

              {/* Content */}
              <motion.h3
                className="text-xl font-bold text-brand-text mb-3 relative z-10 group-hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                {feature.title}
              </motion.h3>

              <motion.p
                className="text-brand-muted text-sm leading-relaxed relative z-10 group-hover:text-white/90 transition-colors duration-300"
              >
                {feature.description}
              </motion.p>

              {/* Hover border glow */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
              />
            </motion.div>
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
            rating: '★★★★★',
            gradient: 'from-emerald-500/10 to-teal-500/10',
            avatarColor: 'bg-emerald-500'
          }, {
            name: 'Milan Verbeek',
            role: 'Managing Partner • Buildright',
            quote: 'De AI suggesties zijn verrassend goed. We verhogen structureel de gemiddelde orderwaarde met 18%.',
            rating: '★★★★★',
            gradient: 'from-blue-500/10 to-cyan-500/10',
            avatarColor: 'bg-blue-500'
          }, {
            name: 'Sara Peeters',
            role: 'Founder • Nova Installaties',
            quote: 'Eindelijk één systeem voor offertes, facturen en betalingen. Klanten tekenen binnen één klik en betalen direct online.',
            rating: '★★★★★',
            gradient: 'from-purple-500/10 to-pink-500/10',
            avatarColor: 'bg-purple-500'
          }].map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-xl shadow-brand-primary/10 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500 overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {/* Floating particles */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
                className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"
              />

              {/* Enhanced quote section */}
              <div className="flex items-center gap-3 text-brand-secondary mb-6 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <Quote className="w-6 h-6" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-brand-secondary/20 rounded-full blur-sm"
                  />
                </motion.div>
                <motion.span
                  className="text-sm font-semibold flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {testimonial.rating.split('').map((star, starIndex) => (
                    <motion.span
                      key={starIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.8 + starIndex * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      className="text-yellow-400"
                    >
                      {star}
                    </motion.span>
                  ))}
                </motion.span>
              </div>

              <motion.p
                className="text-brand-text text-lg leading-relaxed mb-6 relative z-10 group-hover:text-white/95 transition-colors duration-300"
                whileHover={{ scale: 1.01 }}
              >
                "{testimonial.quote}"
              </motion.p>

              {/* Enhanced author section */}
              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 ${testimonial.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {testimonial.name.charAt(0)}
                </motion.div>
                <div className="text-brand-muted text-sm group-hover:text-white/90 transition-colors duration-300">
                  <motion.p
                    className="font-semibold text-brand-text group-hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {testimonial.name}
                  </motion.p>
                  <p>{testimonial.role}</p>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`}
              />
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

      {/* Enhanced CTA Section */}
      <section className="relative container-app py-32 overflow-hidden">
        {/* Vibrant background gradients */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="absolute inset-0 mx-auto h-full max-w-6xl rounded-3xl bg-gradient-to-r from-brand-primary/15 via-purple-500/10 to-brand-secondary/15 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-20 hidden lg:block h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-blue-500/20 blur-2xl"
        />
        <motion.div
          aria-hidden
          animate={{
            y: [0, 25, 0],
            x: [0, -25, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-20 hidden lg:block h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-500/15 via-cyan-500/20 to-blue-500/15 blur-2xl"
        />

        <div className="relative text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
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
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-brand-muted mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Sluit je aan bij honderden ondernemers die al hun offertes automatiseren met QuoteFast
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/register" className="group relative btn-primary text-xl px-10 py-5 flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-brand-primary/30 hover:shadow-3xl hover:shadow-brand-primary/40 transition-all duration-300">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-secondary/0 via-brand-secondary/30 to-brand-primary/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />

                {/* Floating sparkles */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 0.9, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-3 right-6 w-1.5 h-1.5 bg-white/80 rounded-full"
                />
                <motion.div
                  animate={{
                    y: [0, 6, 0],
                    x: [0, 3, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-4 left-8 w-1 h-1 bg-white/70 rounded-full"
                />

                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-6 h-6 relative z-10" />
                </motion.div>
                <span className="relative z-10 font-bold">Start Gratis Proberen</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-6 h-6 relative z-10" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/features" className="group btn-ghost text-xl px-10 py-5 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                <span className="font-semibold">Bekijk Alle Features</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 text-brand-muted text-sm"
          >
            {[
              { icon: CheckCircle, text: 'Geen setup kosten', color: 'text-emerald-400', bgColor: 'from-emerald-500/10 to-green-500/10' },
              { icon: Shield, text: 'GDPR compliant', color: 'text-blue-400', bgColor: 'from-blue-500/10 to-cyan-500/10' },
              { icon: Users, text: '500+ tevreden klanten', color: 'text-purple-400', bgColor: 'from-purple-500/10 to-pink-500/10' },
              { icon: Clock, text: '24/7 Support', color: 'text-orange-400', bgColor: 'from-orange-500/10 to-red-500/10' }
            ].map((item, index) => (
              <motion.div
                key={item.text}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 ${item.color}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-1 rounded-full bg-gradient-to-r ${item.bgColor}`}
                >
                  <item.icon className="w-4 h-4" />
                </motion.div>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}
