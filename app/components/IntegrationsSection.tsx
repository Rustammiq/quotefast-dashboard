'use client'

import { motion } from 'framer-motion'
import { Play, MessageCircle } from 'lucide-react'
import Section from './Section'

const integrations = ['HubSpot', 'Exact Online', 'Teamleader', 'Zendesk', 'Slack', 'Google Drive']

export default function IntegrationsSection() {
  return (
    <Section 
      title="Integreer met je favoriete tools"
      description="QuoteFast koppelt naadloos met CRM-systemen, boekhoudsoftware en communicatie-apps. Automatiseer datastromen zonder custom code."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 gap-4 text-sm mb-8">
            {integrations.map((integration) => (
              <span 
                key={integration} 
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-brand-text text-center backdrop-blur-md hover:border-white/20 transition-all"
              >
                {integration}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-brand-muted">
            <MessageCircle className="w-5 h-5 text-brand-secondary" />
            <span>Dedicated success manager en live chat support voor Premium klanten.</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="video-placeholder aspect-video rounded-2xl flex items-center justify-center group cursor-pointer bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <p className="text-brand-text font-medium">Authenticatie Demo</p>
              <p className="text-brand-muted text-sm mt-2">Login & Registratie Flow</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

