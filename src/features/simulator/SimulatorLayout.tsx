import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, TrendingDown, Users, GitBranch, AlertTriangle,
  Search, Zap, FileText, BookOpen, CheckSquare, TestTube,
  HelpCircle, Activity, Award, Menu, ChevronRight, CreditCard
} from 'lucide-react'
import type { SimulatorSection } from '../../types'
import { useProgress } from '../../hooks/useProgress'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { cn } from '../../lib/utils'

import { SimulatorDashboard } from './SimulatorDashboard'
import { BusinessProblem } from '../simulator/business-problem/BusinessProblem'
import { StakeholdersSection } from '../simulator/stakeholders/StakeholdersSection'
import { AsIsProcess } from '../simulator/as-is-process/AsIsProcess'
import { PainPointsSection } from '../simulator/pain-points/PainPointsSection'
import { RootCauseSection } from '../simulator/root-cause/RootCauseSection'
import { ToBeProcess } from '../simulator/to-be-process/ToBeProcess'
import { PaymentSimulator } from '../simulator/payment-simulator/PaymentSimulator'
import { BRDBuilder } from '../simulator/brd/BRDBuilder'
import { UserStoriesBuilder } from '../simulator/user-stories/UserStoriesBuilder'
import { AcceptanceCriteriaBuilder } from '../simulator/acceptance-criteria/AcceptanceCriteriaBuilder'
import { UATBuilder } from '../simulator/uat/UATBuilder'
import { QuizSection } from '../simulator/quiz/QuizSection'
import { ActivitySection } from '../simulator/activity/ActivitySection'
import { SummarySection } from '../simulator/summary/SummarySection'

const NAV_ITEMS: { id: SimulatorSection; label: string; icon: React.ReactNode; group: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, group: 'Start' },
  { id: 'business-problem', label: 'Business Problem', icon: <TrendingDown className="w-4 h-4" />, group: 'Investigation' },
  { id: 'stakeholders', label: 'Stakeholders', icon: <Users className="w-4 h-4" />, group: 'Investigation' },
  { id: 'as-is-process', label: 'As-Is Process', icon: <GitBranch className="w-4 h-4" />, group: 'Investigation' },
  { id: 'pain-points', label: 'Pain Points', icon: <AlertTriangle className="w-4 h-4" />, group: 'Investigation' },
  { id: 'root-cause', label: 'Root Cause', icon: <Search className="w-4 h-4" />, group: 'Analysis' },
  { id: 'to-be-process', label: 'To-Be Process', icon: <Zap className="w-4 h-4" />, group: 'Analysis' },
  { id: 'payment-simulator', label: 'Payment Simulator', icon: <CreditCard className="w-4 h-4" />, group: 'Analysis' },
  { id: 'brd', label: 'BRD Builder', icon: <FileText className="w-4 h-4" />, group: 'Artifacts' },
  { id: 'user-stories', label: 'User Stories', icon: <BookOpen className="w-4 h-4" />, group: 'Artifacts' },
  { id: 'acceptance-criteria', label: 'Acceptance Criteria', icon: <CheckSquare className="w-4 h-4" />, group: 'Artifacts' },
  { id: 'uat', label: 'UAT Builder', icon: <TestTube className="w-4 h-4" />, group: 'Artifacts' },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-4 h-4" />, group: 'Assessment' },
  { id: 'activity', label: 'Activity', icon: <Activity className="w-4 h-4" />, group: 'Assessment' },
  { id: 'summary', label: 'Summary', icon: <Award className="w-4 h-4" />, group: 'Assessment' },
]

const GROUPS = ['Start', 'Investigation', 'Analysis', 'Artifacts', 'Assessment']

interface SimulatorLayoutProps {
  isFullscreen?: boolean
  initialSection?: SimulatorSection
  onBack?: () => void
}

export function SimulatorLayout({ isFullscreen = false, initialSection, onBack }: SimulatorLayoutProps) {
  const [section, setSection] = useState<SimulatorSection>(initialSection ?? 'dashboard')
  const [started, setStarted] = useState(!!initialSection)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { visited, markVisited, progress } = useProgress()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [section])

  const handleNavigate = (s: SimulatorSection) => {
    setSection(s)
    markVisited(s)
    setSidebarOpen(false)
  }

  if (!started) {
    return <OnboardingScreen onStart={() => { setStarted(true); markVisited('dashboard') }} />
  }

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-950 ${isFullscreen ? '' : 'pt-14'}`}>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 md:hidden" />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        `fixed left-0 bottom-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col transition-transform duration-300 md:translate-x-0 ${isFullscreen ? 'top-0' : 'top-14'}`,
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}>
        <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">BA Progress</span>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{progress}%</span>
          </div>
          <ProgressBar value={progress} color="blue" size="sm" />
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">ShopEase Payment Portal</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {GROUPS.map(group => {
            const items = NAV_ITEMS.filter(i => i.group === group)
            return (
              <div key={group} className="mb-4">
                <p className="px-3 mb-1.5 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider">
                  {group}
                </p>
                {items.map(item => (
                  <button key={item.id} onClick={() => handleNavigate(item.id)}
                    className={cn('sidebar-item w-full', section === item.id && 'active')}>
                    <span className={cn('flex-shrink-0 transition-colors',
                      section === item.id ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 dark:text-gray-500',
                      item.id === 'payment-simulator' && section !== item.id && 'text-violet-400 dark:text-violet-500',
                    )}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.id === 'payment-simulator' && (
                      <span className="px-1.5 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 text-[10px] font-bold flex-shrink-0">
                        ★ NEW
                      </span>
                    )}
                    {visited.has(item.id) && item.id !== 'dashboard' && item.id !== 'payment-simulator' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )
          })}
        </nav>

        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
          {onBack && (
            <button
              onClick={onBack}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-brand-600/20 hover:bg-brand-600/30 border border-brand-500/30 text-brand-400 text-xs font-bold transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              Back to Presentation
            </button>
          )}
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
            Business Analyst Interactive Workshop
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {NAV_ITEMS.find(i => i.id === section)?.label}
          </span>
        </div>

        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="h-full">
              <SectionRenderer section={section} onNavigate={handleNavigate} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function SectionRenderer({ section, onNavigate }: { section: SimulatorSection; onNavigate: (s: SimulatorSection) => void }) {
  switch (section) {
    case 'dashboard': return <SimulatorDashboard onNavigate={onNavigate} />
    case 'business-problem': return <BusinessProblem onNext={() => onNavigate('stakeholders')} />
    case 'stakeholders': return <StakeholdersSection onNext={() => onNavigate('as-is-process')} />
    case 'as-is-process': return <AsIsProcess onNext={() => onNavigate('pain-points')} />
    case 'pain-points': return <PainPointsSection onNext={() => onNavigate('root-cause')} />
    case 'root-cause': return <RootCauseSection onNext={() => onNavigate('to-be-process')} />
    case 'to-be-process': return <ToBeProcess onNext={() => onNavigate('payment-simulator')} />
    case 'payment-simulator': return <PaymentSimulator onNext={() => onNavigate('brd')} />
    case 'brd': return <BRDBuilder onNext={() => onNavigate('user-stories')} />
    case 'user-stories': return <UserStoriesBuilder onNext={() => onNavigate('acceptance-criteria')} />
    case 'acceptance-criteria': return <AcceptanceCriteriaBuilder onNext={() => onNavigate('uat')} />
    case 'uat': return <UATBuilder onNext={() => onNavigate('quiz')} />
    case 'quiz': return <QuizSection onNext={() => onNavigate('activity')} />
    case 'activity': return <ActivitySection onNext={() => onNavigate('summary')} />
    case 'summary': return <SummarySection />
    default: return <SimulatorDashboard onNavigate={onNavigate} />
  }
}

function OnboardingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }} className="max-w-lg w-full relative z-10">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 text-brand-400 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          🛒 ShopEase — Business Analysis Department
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="text-5xl mb-5">🎉</div>
          <h1 className="text-4xl font-bold text-white mb-3">Congratulations!</h1>
          <p className="text-gray-400 text-lg mb-6">You have joined <span className="text-brand-400 font-semibold">ShopEase</span> as a <span className="text-violet-400 font-semibold">Business Analyst</span>.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <p className="text-gray-400 mb-4 text-sm">Your manager <strong className="text-gray-200">Priya Sharma</strong> sends you this message:</p>
          <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-brand-500">
            <p className="text-gray-200 text-sm leading-relaxed italic">
              "Welcome aboard! 🎉 Your first project is urgent. ShopEase only has Cash on Delivery — we're losing ₹64 Crore/month because customers can't pay by card or UPI. We need a Business Analyst to design our payment portal from scratch. Start today."
            </p>
            <p className="text-gray-500 text-xs mt-2">— Priya Sharma, Head of Product</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="space-y-2.5 mb-8">
          {[
            { n: 1, text: 'Analyse the business problem & stakeholders' },
            { n: 2, text: 'Map As-Is (COD only) and To-Be (6 payment methods) processes' },
            { n: 3, text: 'Experience the Payment Screen Simulator ⭐' },
            { n: 4, text: 'Create BRD, User Stories & Acceptance Criteria' },
            { n: 5, text: 'Build UAT scenarios & complete the quiz' },
          ].map(step => (
            <div key={step.n} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{step.n}</div>
              <span className="text-gray-300 text-sm">{step.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
          onClick={onStart}
          className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-2xl shadow-glow transition-all hover:scale-105 text-base">
          Start Investigation
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  )
}
