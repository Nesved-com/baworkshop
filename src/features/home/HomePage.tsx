import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, BookOpen, BarChart2, Download, Briefcase } from 'lucide-react'
import type { AppMode } from '../../types'
import { SessionPlanExport } from '../export/SessionPlanExport'

interface HomePageProps {
  onNavigate: (mode: AppMode) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [showExport, setShowExport] = useState(false)
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-400/10 dark:bg-brand-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
            Case Study: Digital Payment & EMI Workflow
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-6"
          >
            Business Analyst{' '}
            <span className="gradient-text">Interactive</span>
            <br />
            Workshop
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            Converting a Business Problem into Business Analysis Artefacts.
            A premium simulator for learning real-world BA practices.
          </motion.p>

          {/* Instructor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="max-w-lg mx-auto bg-white/90 dark:bg-gray-900/90 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-card backdrop-blur mb-12"
          >
            {/* Photo centered */}
            <div className="flex flex-col items-center mb-5">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-brand-200 dark:border-brand-700 shadow-glow mb-4">
                <img src="/instructor.jpg" alt="Madhuri Salunke" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-xs font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest mb-1">Your Instructor</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Madhuri Salunke</h3>
              <div className="flex items-center gap-2 mt-1">
                <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Senior Product Owner · Vois</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-4" />

            {/* Certifications row */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {[
                { label: 'Certified Business Analyst', color: 'bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800' },
                { label: 'Certified Agile Professional', color: 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800' },
                { label: 'IIBA-CBAP Trained', color: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
                { label: 'Ex-Reliance', color: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
              ].map(cert => (
                <span key={cert.label} className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border ${cert.color}`}>
                  ✦ {cert.label}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center mb-4">
              Madhuri is a Senior Product Owner at <strong className="text-gray-900 dark:text-white">Vois</strong> with <strong className="text-gray-900 dark:text-white">5.6 years</strong> of industry experience across Vois and Reliance. A certified BA and Agile Professional with IIBA-CBAP training, she specialises in translating complex business problems into clear, actionable requirements that development teams can build from.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🏦', label: 'Domain', value: 'Fintech & E-commerce' },
                { icon: '📋', label: 'Expertise', value: 'BRD · User Stories · UAT' },
                { icon: '⚡', label: 'Experience', value: '5.6 Years' },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                  <div className="text-lg mb-1">{item.icon}</div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5">{item.label}</p>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating payment cards illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-40 mb-12 flex items-center justify-center"
          >
            <FloatingCards />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              onClick={() => onNavigate('simulator')}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-glow transition-all duration-300 hover:scale-105 text-base"
            >
              Start Workshop
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setShowExport(true)}
              className="group flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 text-gray-700 dark:text-gray-300 hover:text-brand-700 dark:hover:text-brand-400 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 text-base bg-white dark:bg-gray-900"
            >
              <Download className="w-5 h-5" />
              Download Session Plan
            </button>
          </motion.div>

          {/* Export modal */}
          <AnimatePresence>
            {showExport && <SessionPlanExport onClose={() => setShowExport(false)} />}
          </AnimatePresence>

          {/* Mode Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-20"
          >
            <ModeCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Presentation Mode"
              description="75-minute instructor-led session. 11 animated slides with speaker notes, timer, and keyboard controls."
              color="blue"
              onClick={() => onNavigate('presentation')}
            />
            <ModeCard
              icon={<BarChart2 className="w-6 h-6" />}
              title="Analyst Simulator"
              description="Students become BAs. Investigate the ShopEase payment problem and build real BA deliverables."
              color="violet"
              onClick={() => onNavigate('simulator')}
            />
          </motion.div>

          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-6">
              What's included
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className="flex items-center gap-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-3"
                >
                  <span className="text-base">{f.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function FloatingCards() {
  const cards = [
    { label: 'HDFC Credit', color: 'from-brand-500 to-brand-700', delay: 0, x: -120, y: -10, rotate: -12 },
    { label: 'ICICI Debit', color: 'from-violet-500 to-violet-700', delay: 0.5, x: 120, y: -10, rotate: 12 },
    { label: 'SBI EMI', color: 'from-emerald-500 to-emerald-700', delay: 1, x: 0, y: -40, rotate: 0 },
  ]

  return (
    <div className="relative w-72 h-40">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={`absolute w-44 h-28 bg-gradient-to-br ${card.color} rounded-2xl shadow-premium p-4 flex flex-col justify-between`}
          style={{ left: '50%', top: '50%' }}
          animate={{
            x: card.x,
            y: card.y + Math.sin(Date.now() / 1000) * 5,
            rotate: card.rotate,
            translateX: '-50%',
            translateY: '-50%',
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: card.delay },
          }}
        >
          <div className="flex justify-between items-start">
            <div className="w-8 h-5 bg-white/30 rounded" />
            <div className="text-white/60">
              <svg viewBox="0 0 50 50" className="w-6 h-6" fill="currentColor">
                <circle cx="20" cy="25" r="14" />
                <circle cx="30" cy="25" r="14" opacity="0.6" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-white/70 text-xs">•••• •••• •••• 4242</p>
            <p className="text-white font-semibold text-xs mt-1">{card.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ModeCard({ icon, title, description, color, onClick }: {
  icon: React.ReactNode
  title: string
  description: string
  color: 'blue' | 'violet'
  onClick: () => void
}) {
  const colors = {
    blue: 'border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400',
    violet: 'border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400',
  }

  return (
    <button
      onClick={onClick}
      className="group text-left p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className={`inline-flex p-2.5 rounded-xl border mb-4 ${colors[color]}`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
      <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        Enter mode <ArrowRight className="w-3 h-3" />
      </div>
    </button>
  )
}

const FEATURES = [
  { icon: '📊', label: 'KPI Dashboard' },
  { icon: '👥', label: 'Stakeholders' },
  { icon: '🗺️', label: 'Process Flow' },
  { icon: '🔍', label: 'Root Cause' },
  { icon: '📋', label: 'BRD Builder' },
  { icon: '✍️', label: 'User Stories' },
  { icon: '✅', label: 'UAT Builder' },
  { icon: '🏆', label: 'Quiz & Badges' },
]
