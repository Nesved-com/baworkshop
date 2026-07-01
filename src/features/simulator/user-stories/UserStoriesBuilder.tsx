import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronRight, Plus, Trash2, Download, RefreshCw } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'
import type { UserStory } from '../../../types'

interface Props { onNext: () => void }

const ACTORS = ['Customer', 'First-time Buyer', 'Returning Customer', 'ShopEase Merchant', 'Finance Team', 'Customer Support Agent']
const GOALS = [
  'pay using UPI at checkout',
  'pay using my credit or debit card',
  'convert my purchase into monthly EMI instalments',
  'use my Paytm or PhonePe wallet balance',
  'buy now and pay later using BNPL',
  'pay via Net Banking from my bank account',
  'retry a failed payment without losing my cart',
  'receive a digital payment receipt immediately after purchase',
]
const BENEFITS = [
  'I can pay instantly without keeping cash ready',
  'I can shop even when I don\'t have UPI or wallet',
  'I can afford high-value items by spreading the cost',
  'I can use my existing wallet balance conveniently',
  'I can get the product now and pay in 30 days',
  'I have a familiar and trusted payment option',
  'I don\'t have to restart my entire checkout process',
  'I have proof of payment and can track my order confidently',
]

const DEFAULT_STORIES: UserStory[] = [
  { id: '1', actor: 'Customer', goal: 'pay using UPI at checkout', benefit: 'I can pay instantly without keeping cash ready' },
  { id: '2', actor: 'First-time Buyer', goal: 'convert my purchase into monthly EMI instalments', benefit: 'I can afford high-value items by spreading the cost' },
  { id: '3', actor: 'Returning Customer', goal: 'receive a digital payment receipt immediately after purchase', benefit: 'I have proof of payment and can track my order confidently' },
]

function generateId() { return Math.random().toString(36).slice(2) }

export function UserStoriesBuilder({ onNext }: Props) {
  const [stories, setStories] = useState<UserStory[]>(DEFAULT_STORIES)
  const [newActor, setNewActor] = useState(ACTORS[0])
  const [newGoal, setNewGoal] = useState(GOALS[0])
  const [newBenefit, setNewBenefit] = useState(BENEFITS[0])

  const addStory = () => {
    setStories(prev => [...prev, { id: generateId(), actor: newActor, goal: newGoal, benefit: newBenefit }])
  }

  const removeStory = (id: string) => {
    setStories(prev => prev.filter(s => s.id !== id))
  }

  const handleDownload = () => {
    const lines = stories.map(s => `• As a ${s.actor}, I want to ${s.goal}, So that ${s.benefit}.`)
    const blob = new Blob([lines.join('\n\n')], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'UserStories-ShopEase-PaymentPortal.txt'
    a.click()
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<BookOpen className="w-5 h-5" />}
        title="User Story Builder"
        subtitle="Create user stories using the standard Agile format: As a [Actor] I want [Goal] So that [Benefit]"
      />
      <SectionBanner
        color="violet"
        time="8 min"
        what="A User Story captures a feature from the end-user's perspective — not the system's. The format is: 'As a [who], I want [what], so that [why].' The 'so that' is the most important part — it explains the business value, which justifies the development effort."
        why="User Stories keep development focused on outcomes, not outputs. Without the 'so that', developers build features with no understanding of what success looks like. The story also helps the QA team know what to test and the product team know what to prioritise."
        tip="Show students a bad vs good story. Bad: 'As a user, I want to pay online.' Good: 'As a ShopEase customer, I want to pay using UPI so that I can complete my purchase instantly without keeping cash ready.' Notice how the good version includes the real motivation."
      />

      {/* Builder */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-5">Create a New User Story</h3>

        <div className="bg-gradient-to-r from-brand-50 to-violet-50 dark:from-brand-950/30 dark:to-violet-950/30 rounded-xl p-4 mb-5 border border-brand-100 dark:border-brand-900">
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
            As a{' '}
            <span className="text-brand-600 dark:text-brand-400 font-bold">{newActor}</span>
            , I want to{' '}
            <span className="text-violet-600 dark:text-violet-400 font-bold">{newGoal}</span>
            , So that{' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{newBenefit}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Actor (Role)
            </label>
            <select
              value={newActor}
              onChange={e => setNewActor(e.target.value)}
              className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-800 dark:text-gray-200"
            >
              {ACTORS.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Goal (Want)
            </label>
            <select
              value={newGoal}
              onChange={e => setNewGoal(e.target.value)}
              className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200"
            >
              {GOALS.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Benefit (So That)
            </label>
            <select
              value={newBenefit}
              onChange={e => setNewBenefit(e.target.value)}
              className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 dark:text-gray-200"
            >
              {BENEFITS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <Button onClick={addStory} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add User Story
        </Button>
      </div>

      {/* Stories list */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            User Stories <span className="text-brand-600 dark:text-brand-400">({stories.length})</span>
          </h3>
        </div>

        <AnimatePresence>
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-start gap-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-card-hover transition-all"
            >
              <div className="w-7 h-7 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                  As a <strong className="text-brand-600 dark:text-brand-400">{story.actor}</strong>,{' '}
                  I want to <strong className="text-violet-600 dark:text-violet-400">{story.goal}</strong>,{' '}
                  so that <strong className="text-emerald-600 dark:text-emerald-400">{story.benefit}</strong>.
                </p>
              </div>
              <button
                onClick={() => removeStory(story.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-gray-400 hover:text-rose-500 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={handleDownload}
          variant="secondary"
          icon={<Download className="w-4 h-4" />}
          disabled={stories.length === 0}
        >
          Export Stories
        </Button>
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: Acceptance Criteria
        </Button>
      </div>
    </div>
  )
}
