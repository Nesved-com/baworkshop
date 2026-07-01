import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, CheckCircle2, ChevronDown, CircleDollarSign, CreditCard, GraduationCap, HelpCircle, Lightbulb, MessageSquare, Target, Timer } from 'lucide-react'
import type { SimulatorSection } from '../../../types'
import { MISSION_META } from '../../../data/missionWorkshop'
import { cn } from '../../../lib/utils'

interface MissionFrameProps {
  section: SimulatorSection
  children: React.ReactNode
}

export function MissionFrame({ section, children }: MissionFrameProps) {
  const mission = MISSION_META[section]
  const [showConcept, setShowConcept] = useState(false)
  const [showFaculty, setShowFaculty] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-800 px-3 py-1 text-xs font-bold">
                  <Target className="w-3.5 h-3.5" />
                  {mission.mission}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 text-xs font-semibold">
                  <Timer className="w-3.5 h-3.5" />
                  {mission.time}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 text-xs font-semibold">
                  {mission.completion}% complete
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{mission.title}</h1>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 max-w-3xl leading-relaxed">{mission.story}</p>
            </div>
            <button
              onClick={() => setShowFaculty(s => !s)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <GraduationCap className="w-4 h-4" />
              Faculty Notes
              <ChevronDown className={cn('w-4 h-4 transition-transform', showFaculty && 'rotate-180')} />
            </button>
          </div>

          <AnimatePresence>
            {showFaculty && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                  <FacultyCard title="Teaching Objective" text={mission.faculty.objective} icon={<Target className="w-4 h-4" />} />
                  <FacultyCard title="Speaker Notes" text={mission.faculty.notes} icon={<MessageSquare className="w-4 h-4" />} />
                  <FacultyCard title="Key Takeaway" text={mission.faculty.takeaway} icon={<Lightbulb className="w-4 h-4" />} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                  <FacultyList title="Questions to Ask" items={mission.faculty.questions} />
                  <FacultyList title="Expected Answers" items={mission.faculty.expectedAnswers} />
                  <FacultyCard title="Real-Life Example" text={mission.faculty.example} icon={<BookOpen className="w-4 h-4" />} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-5">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-5">
          <div className="lg:col-span-2">
            <ConceptGraphic section={section} />
          </div>
          <MissionCard icon={<BookOpen className="w-4 h-4" />} label="Interactive Explanation" text={mission.explanation} />
          <MissionCard icon={<MessageSquare className="w-4 h-4" />} label="Real-Life Example" text={mission.faculty.example} />
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-card">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Reveal BA Concept
            </div>
            <button
              onClick={() => setShowConcept(s => !s)}
              className="rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 px-3 py-2 text-sm font-semibold hover:bg-amber-100 dark:hover:bg-amber-950/50"
            >
              {showConcept ? 'Hide Concept' : 'Reveal Concept'}
            </button>
            {showConcept && <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-3">{mission.revealConcept}</p>}
          </div>
        </div>
        <div className="mb-5">
          <MissionCard icon={<MessageSquare className="w-4 h-4" />} label="Student Activity" text={mission.activity} />
        </div>
      </div>

      {children}

      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-200 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Key Learning
            </div>
            <p className="text-sm text-emerald-800/80 dark:text-emerald-100/80 leading-relaxed">{mission.keyLearning}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-card">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3">
              <HelpCircle className="w-4 h-4 text-brand-500" />
              Quick Quiz
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{mission.quiz.question}</p>
            <button
              onClick={() => setShowAnswer(s => !s)}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              {showAnswer ? 'Hide answer' : 'Reveal answer'}
            </button>
            {showAnswer && <p className="text-sm text-gray-900 dark:text-white font-semibold mt-2">{mission.quiz.answer}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

const GRAPHICS: Record<SimulatorSection, { title: string; nodes: string[]; accent: string }> = {
  dashboard: {
    title: 'Rahul’s Payment Moment',
    nodes: ['iPhone Rs. 80,000', 'Only Rs. 8,000 now', 'Needs EMI', 'Portal must help'],
    accent: 'from-brand-500 to-emerald-500',
  },
  'business-problem': {
    title: 'Business Funnel',
    nodes: ['1,00,000 Visitors', '35,000 Cart', '15,000 Paid', '20,000 Lost'],
    accent: 'from-rose-500 to-amber-500',
  },
  stakeholders: {
    title: 'People Around One Payment',
    nodes: ['Rahul', 'Business', 'Gateway', 'Bank/NBFC'],
    accent: 'from-brand-500 to-violet-500',
  },
  'as-is-process': {
    title: 'Current Journey',
    nodes: ['Cart', 'Payment', 'EMI Check', 'OTP', 'Status'],
    accent: 'from-violet-500 to-brand-500',
  },
  'pain-points': {
    title: 'Pain Point Lens',
    nodes: ['Customer Pain', 'Business Loss', 'Tech Issue', 'Root Cause'],
    accent: 'from-rose-500 to-orange-500',
  },
  'root-cause': {
    title: 'Why-Why Thinking',
    nodes: ['Symptom', 'Why?', 'Why again?', 'Real Cause'],
    accent: 'from-amber-500 to-emerald-500',
  },
  'to-be-process': {
    title: 'Better Future Flow',
    nodes: ['Eligibility Early', 'Compare EMI', 'Safe Retry', 'Clear Status'],
    accent: 'from-emerald-500 to-brand-500',
  },
  'payment-simulator': {
    title: 'Payment Portal Live',
    nodes: ['UPI', 'Card / EMI', 'Wallet / BNPL', 'Net Banking'],
    accent: 'from-violet-500 to-brand-500',
  },
  brd: {
    title: 'From Discussion to Document',
    nodes: ['Problem', 'Scope', 'Rules', 'Success Metrics'],
    accent: 'from-slate-500 to-brand-500',
  },
  'user-stories': {
    title: 'User Story Formula',
    nodes: ['Actor', 'Goal', 'Business Value', 'Buildable Story'],
    accent: 'from-brand-500 to-violet-500',
  },
  'acceptance-criteria': {
    title: 'Given-When-Then',
    nodes: ['Given context', 'When action', 'Then result', 'Testable'],
    accent: 'from-violet-500 to-emerald-500',
  },
  uat: {
    title: 'Business Test Coverage',
    nodes: ['UPI/Card', 'EMI', 'Wallet/Bank', 'Failure Paths'],
    accent: 'from-emerald-500 to-teal-500',
  },
  quiz: {
    title: 'Concept Check',
    nodes: ['Recall', 'Apply', 'Explain', 'Improve'],
    accent: 'from-brand-500 to-amber-500',
  },
  activity: {
    title: 'Classroom Handoff',
    nodes: ['Evidence', 'Recommendation', 'Metric', 'Decision'],
    accent: 'from-violet-500 to-rose-500',
  },
  summary: {
    title: 'BA Roadmap',
    nodes: ['Problem', 'People', 'Process', 'Requirements', 'Validation'],
    accent: 'from-brand-500 to-emerald-500',
  },
}

function ConceptGraphic({ section }: { section: SimulatorSection }) {
  const graphic = GRAPHICS[section]
  return (
    <div className="h-full rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-card overflow-hidden relative">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${graphic.accent}`} />
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
        <CreditCard className="w-4 h-4 text-brand-500" />
        Concept Graphic
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">{graphic.title}</h3>
      <div className="flex flex-wrap items-center gap-2">
        {graphic.nodes.map((node, index) => (
          <div key={node} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${graphic.accent} text-white flex items-center justify-center text-xs font-bold`}>
                  {index + 1}
                </span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{node}</span>
              </div>
            </motion.div>
            {index < graphic.nodes.length - 1 && (
              <span className="text-gray-300 dark:text-gray-700">→</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-gray-50 dark:bg-gray-950 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <CircleDollarSign className="w-4 h-4 text-emerald-500" />
          Connect this visual back to Rahul’s payment journey before introducing the BA term.
        </div>
      </div>
    </div>
  )
}

function MissionCard({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-card">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
        {icon}
        {label}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
    </div>
  )
}

function FacultyCard({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
        {icon}
        {title}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
    </div>
  )
}

function FacultyList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{title}</p>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
