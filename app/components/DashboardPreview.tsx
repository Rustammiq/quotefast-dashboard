'use client'

import { motion } from 'framer-motion'
import { Search, Bell, Settings, Zap, Sparkles, FileText, DollarSign, TrendingUp, Clock, Folder, Users, ArrowUp } from 'lucide-react'
import { StatCard } from './StatCard'

const stats = [
  { icon: Zap, value: 340, label: 'Executions', color: 'text-blue-400', bgColor: 'from-blue-500/20 to-cyan-500/20', trend: '+204%' },
  { icon: Folder, value: 12, label: 'Projects', color: 'text-emerald-400', bgColor: 'from-emerald-500/20 to-teal-500/20', trend: '+18%' },
]

export default function DashboardPreview() {
  return (
    <div className="mt-16 relative">
      <div className="relative max-w-6xl mx-auto">
        {/* macOS Window Frame */}
        <div className="macos-window rounded-t-xl overflow-hidden">
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
        
        {/* Dashboard Content */}
        <div className="bg-gray-900 rounded-b-xl overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600/30 via-purple-600/25 to-pink-600/20 border border-blue-500/40 mx-6 mt-6 rounded-xl p-6 relative overflow-hidden group cursor-pointer"
          >
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  Try the Advanced Layout
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </h3>
                <p className="text-gray-300">Experience custom cursors, 3D backgrounds, and glassmorphism effects.</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25">
                  <Zap className="w-4 h-4" />
                  View Demo
                </button>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Cards Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-300 text-sm font-medium">{stat.label}</h3>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      <ArrowUp className="w-3 h-3" />
                      {stat.trend}
                    </div>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <motion.div
                      className={`bg-gradient-to-r ${stat.bgColor} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ delay: 0.6, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

