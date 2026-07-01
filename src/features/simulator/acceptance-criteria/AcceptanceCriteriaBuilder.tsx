import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckSquare, ChevronRight, Plus, Trash2, Info, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'
import type { AcceptanceCriteria } from '../../../types'

interface Props { onNext: () => void }

const DEFAULT_AC: AcceptanceCriteria[] = [
  {
    id: '1',
    given: 'a logged-in customer at the ShopEase payment screen',
    when: 'they enter a valid UPI VPA and click Pay',
    then: 'the system initiates UPI payment, shows a processing screen, and on approval creates the order and displays a success screen within 5 seconds',
  },
  {
    id: '2',
    given: 'a customer whose UPI payment has failed',
    when: 'the failure screen is displayed',
    then: 'the cart is preserved, the customer sees a clear error reason, and is offered options to retry UPI or switch to another payment method',
  },
  {
    id: '3',
    given: 'a customer who selects EMI and chooses 6-month tenure',
    when: 'they complete card authentication',
    then: 'the order is created, an EMI schedule is displayed showing monthly amount and due dates, and a confirmation SMS is sent within 30 seconds',
  },
]

const GIVEN_TEMPLATES = [
  'a logged-in customer at the ShopEase payment screen',
  'a customer who has selected UPI as payment method',
  'a customer who has entered valid card details',
  'a customer whose payment attempt has failed',
  'a customer who selects EMI with 6-month tenure',
  'a customer with insufficient wallet balance',
]

const WHEN_TEMPLATES = [
  'they enter a valid UPI VPA and click Pay',
  'a payment attempt fails due to bank decline',
  'the UPI payment request expires after 5 minutes',
  'they click Retry Payment',
  'they complete card OTP authentication',
  'they select BNPL and confirm their purchase',
]

const THEN_TEMPLATES = [
  'the order is created and a success screen is shown within 5 seconds',
  'a clear error message is shown with the failure reason and retry option',
  'the cart is preserved and an alternative payment method is suggested',
  'an SMS and email confirmation is sent within 30 seconds',
  'the system displays the EMI schedule with monthly amount and due dates',
  'the payment is processed and the digital receipt is generated immediately',
]

function validateAC(given: string, when: string, then: string): string[] {
  const errors: string[] = []
  if (given.length < 5) errors.push('Given context is too short — describe the setup/precondition')
  if (when.length < 5) errors.push('When action is missing — describe the specific user action')
  if (then.length < 10) errors.push('Then outcome needs more detail — be specific about what should happen')
  if (then.toLowerCase().includes('should work') || then.toLowerCase().includes('it works')) {
    errors.push('Avoid vague outcomes like "should work" — be specific and measurable')
  }
  return errors
}

export function AcceptanceCriteriaBuilder({ onNext }: Props) {
  const [criteria, setCriteria] = useState<AcceptanceCriteria[]>(DEFAULT_AC)
  const [given, setGiven] = useState('')
  const [when, setWhen] = useState('')
  const [then, setThen] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [showInfo, setShowInfo] = useState(false)

  const handleAdd = () => {
    const errs = validateAC(given, when, then)
    setErrors(errs)
    if (errs.length === 0) {
      setCriteria(prev => [...prev, { id: Math.random().toString(36).slice(2), given, when, then }])
      setGiven('')
      setWhen('')
      setThen('')
    }
  }

  const removeAC = (id: string) => setCriteria(prev => prev.filter(c => c.id !== id))

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<CheckSquare className="w-5 h-5" />}
        title="Acceptance Criteria Builder"
        subtitle="Write testable acceptance criteria using the Given-When-Then (Gherkin) format"
      />
      <SectionBanner
        color="emerald"
        time="10 min"
        what="Acceptance Criteria (AC) defines exactly when a User Story is 'done'. Written in Given-When-Then format: Given [context], When [action], Then [expected result]. AC must be specific, measurable, and testable — no ambiguity allowed."
        why="Vague acceptance criteria is the #1 cause of UAT failures. If a story says 'payment should work', who decides what working means? The BA writes AC so the developer knows what to build, the tester knows what to test, and the business knows what to sign off."
        tip="Give this example: Bad AC — 'UPI payment should succeed.' Good AC — 'Given a customer enters a valid VPA, When they confirm payment, Then the order is created, a payment success screen is shown within 3 seconds, and a confirmation SMS is sent.' Ask students to spot the difference."
      />

      {/* Format explainer */}
      <button
        onClick={() => setShowInfo(s => !s)}
        className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 mb-4 hover:underline"
      >
        <Info className="w-3.5 h-3.5" />
        What is Given-When-Then?
      </button>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 rounded-xl p-4 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div><p className="font-bold text-brand-700 dark:text-brand-300 mb-1">GIVEN (Context)</p><p className="text-brand-600 dark:text-brand-400">Sets up the initial state or precondition before the action happens</p></div>
              <div><p className="font-bold text-violet-700 dark:text-violet-300 mb-1">WHEN (Action)</p><p className="text-violet-600 dark:text-violet-400">Describes the specific user action or system event being tested</p></div>
              <div><p className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">THEN (Outcome)</p><p className="text-emerald-600 dark:text-emerald-400">Defines the expected outcome — must be specific and measurable</p></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Builder form */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card p-6 mb-6">
        {/* Preview */}
        {(given || when || then) && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-5 text-sm font-mono text-gray-800 dark:text-gray-200">
            <span className="text-brand-600 dark:text-brand-400 font-bold">Given</span> {given || '…'}{', '}
            <span className="text-violet-600 dark:text-violet-400 font-bold">When</span> {when || '…'},{' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Then</span> {then || '…'}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 mb-5">
          <ACField
            label="GIVEN"
            color="brand"
            value={given}
            onChange={setGiven}
            templates={GIVEN_TEMPLATES}
            placeholder="e.g., a logged-in customer on the product page"
          />
          <ACField
            label="WHEN"
            color="violet"
            value={when}
            onChange={setWhen}
            templates={WHEN_TEMPLATES}
            placeholder="e.g., they enter a valid UPI VPA and click Pay"
          />
          <ACField
            label="THEN"
            color="emerald"
            value={then}
            onChange={setThen}
            templates={THEN_TEMPLATES}
            placeholder="e.g., the system shows eligible plans within 2 seconds"
          />
        </div>

        <AnimatePresence>
          {errors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl p-3"
            >
              {errors.map((e, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {e}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <Button onClick={handleAdd} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add Acceptance Criteria
        </Button>
      </div>

      {/* Criteria list */}
      <div className="space-y-3 mb-8">
        <AnimatePresence>
          {criteria.map((ac, i) => (
            <motion.div
              key={ac.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-mono">
                    <span className="text-brand-600 dark:text-brand-400 font-bold not-italic">Given </span>
                    {ac.given}{', '}
                    <span className="text-violet-600 dark:text-violet-400 font-bold not-italic">When </span>
                    {ac.when},{' '}
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold not-italic">Then </span>
                    {ac.then}.
                  </p>
                </div>
                <button
                  onClick={() => removeAC(ac.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-gray-400 hover:text-rose-500 transition-all flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: UAT Builder
        </Button>
      </div>
    </div>
  )
}

function ACField({ label, color, value, onChange, templates, placeholder }: {
  label: string; color: string; value: string; onChange: (v: string) => void; templates: string[]; placeholder: string
}) {
  const colors: Record<string, { badge: string; input: string }> = {
    brand: { badge: 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400', input: 'focus:ring-brand-500' },
    violet: { badge: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400', input: 'focus:ring-violet-500' },
    emerald: { badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400', input: 'focus:ring-emerald-500' },
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${colors[color].badge}`}>{label}</span>
      </div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`flex-1 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 ${colors[color].input} text-gray-800 dark:text-gray-200 placeholder-gray-400`}
        />
        <select
          onChange={e => { if (e.target.value) onChange(e.target.value); e.target.value = '' }}
          defaultValue=""
          className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-2 focus:outline-none text-gray-600 dark:text-gray-400"
        >
          <option value="" disabled>Template</option>
          {templates.map(t => <option key={t} value={t}>{t.slice(0, 40)}…</option>)}
        </select>
      </div>
    </div>
  )
}
