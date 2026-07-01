import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'

interface Props { onNext: () => void }

const ACTIVITIES = [
  {
    id: 'stakeholders',
    title: 'Activity 1: Identify Stakeholders',
    prompt: 'ShopEase is building a digital payment portal. List ALL stakeholders who are affected. For each, state their PRIMARY goal and their biggest fear.',
    solution: `Key Stakeholders:
1. Customer — Goal: Pay easily with any method. Fear: Card fraud / money lost
2. Bank / NBFC — Goal: More digital transactions. Fear: Failed authorization hurting trust
3. NPCI — Goal: More UPI volume. Fear: Gateway non-compliance with UPI standards
4. Payment Gateway (Razorpay) — Goal: High transaction volume. Fear: Merchant chargeback disputes
5. RBI (Regulator) — Goal: Consumer data safety. Fear: PCI-DSS violation on Indian customer data
6. ShopEase Dev Team — Goal: Clean integration. Fear: Unclear requirements causing rework
7. QA Team — Goal: Zero payment bugs. Fear: No testable acceptance criteria
8. ShopEase Merchant Ops — Goal: Higher GMV. Fear: Payment failure damaging customer trust
9. Finance Team — Goal: Accurate settlement. Fear: Manual reconciliation errors`,
    time: '10 min',
  },
  {
    id: 'pain-points',
    title: 'Activity 2: Map Payment Pain Points',
    prompt: 'A customer wants to buy a ₹45,000 TV on ShopEase but is frustrated. Walk through the CURRENT checkout process and identify every pain point the customer will experience. Categorise each by severity: High / Medium / Low.',
    solution: `Pain Points in COD-Only Checkout:

HIGH SEVERITY:
• No UPI/Card payment option → customer forced to use only COD (Primary abandonment cause)
• No EMI available → ₹45,000 is too expensive to pay in full → customer leaves
• Fear of keeping ₹45,000 cash ready at home for delivery

MEDIUM SEVERITY:
• Uncertainty about delivery date when paying COD
• No digital receipt — customer has no payment proof until delivery
• High return pressure — COD has no payment commitment

LOW SEVERITY:
• Cannot split payment across card + wallet for high-value order
• No instant order confirmation (must wait for delivery)`,
    time: '10 min',
  },
  {
    id: 'business-rules',
    title: 'Activity 3: Define Business Rules',
    prompt: 'You are documenting the BRD for ShopEase\'s UPI payment method. Write at least 6 Business Rules that must govern the UPI payment flow. Consider RBI regulations, NPCI standards, and UX requirements.',
    solution: `Business Rules for UPI Payment:

1. UPI Virtual Payment Address (VPA) must be validated against NPCI before payment is initiated — invalid VPA should show error within 2 seconds
2. UPI payment request must timeout after 5 minutes if customer doesn't approve on UPI app (NPCI standard)
3. Maximum UPI transaction limit: ₹1,00,000 per transaction (NPCI daily limit per VPA)
4. Customer must not be charged if UPI approval is pending — order created ONLY on confirmed payment
5. If UPI times out, system must display "Payment expired — try again" with retry option (order not created)
6. ShopEase must send payment confirmation webhook acknowledgement within 30 seconds of NPCI confirmation
7. Failed UPI payment must allow retry with same VPA or option to switch payment method — cart must be preserved
8. UPI transaction ID (UTR number) must be stored against each order for reconciliation`,
    time: '12 min',
  },
  {
    id: 'acceptance-criteria',
    title: 'Activity 4: Write Acceptance Criteria',
    prompt: 'Write complete Given-When-Then acceptance criteria for this user story: "As a customer, I want to see a clear, helpful error message when my card payment fails, so that I know exactly what went wrong and what to do next."',
    solution: `Acceptance Criteria:

AC 1 — Insufficient Funds:
Given a customer whose card has insufficient credit limit,
When the card payment is processed,
Then the error message "Payment declined — Insufficient card limit. Try a card with higher limit or use UPI." is displayed within 5 seconds.

AC 2 — Incorrect CVV:
Given a customer enters an incorrect CVV,
When they click Pay,
Then the error "Incorrect CVV entered. Please check the 3-digit code on the back of your card." is shown. Card is NOT blocked on first attempt.

AC 3 — Bank Server Down:
Given the card-issuing bank's server is temporarily unavailable,
When the payment is attempted,
Then "Your bank is temporarily unreachable. Please try again in 2 minutes or use UPI." is shown with a retry countdown.

AC 4 — Card Expired:
Given a customer enters a card with past expiry date,
When they click Pay,
Then "Card expired. Please use a valid card." is shown immediately (without calling bank API).

AC 5 — Retry Preserved:
Given any card payment failure,
When the customer views the error screen,
Then cart contents, delivery address, and all checkout data are preserved — customer can retry or switch payment method without restarting checkout.`,
    time: '15 min',
  },
]

export function ActivitySection({ onNext }: Props) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const toggle = (id: string) => setRevealed(prev => {
    const n = new Set(prev)
    n.has(id) ? n.delete(id) : n.add(id)
    return n
  })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SectionHeader
        icon={<Activity className="w-5 h-5" />}
        title="Classroom Activity"
        subtitle="Hands-on BA exercises for ShopEase payment portal — attempt each exercise, then reveal the solution"
      />
      <SectionBanner
        color="violet"
        time="45 min total"
        what="These are practical BA exercises that mirror real project situations. Each activity builds a specific skill: stakeholder identification, pain point mapping, business rule writing, and acceptance criteria — the four core BA deliverables you will produce on every project."
        why="Reading about BA is not enough — you must practise writing requirements to build the skill. In your first job, no one will have time to teach you from scratch. These exercises give you a head-start with real-world scenarios that you can reference and build on."
        tip="Run each activity in groups of 2–3. Give students 8–10 minutes to attempt before revealing the solution. After revealing, discuss: 'What did your group get right? What did you miss?' The gap between their answer and the solution IS the learning moment."
      />

      <div className="space-y-6 mb-8">
        {ACTIVITIES.map((act, i) => (
          <motion.div key={act.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card overflow-hidden">

            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{act.title}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">⏱ {act.time}</span>
                </div>
                <span className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-brand-50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900 rounded-xl p-4 mb-4">
                <p className="text-sm text-brand-800 dark:text-brand-200 leading-relaxed">{act.prompt}</p>
              </div>

              <textarea
                value={answers[act.id] || ''}
                onChange={e => setAnswers(prev => ({ ...prev, [act.id]: e.target.value }))}
                placeholder="Write your answer here before revealing the solution..."
                className="w-full h-32 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder-gray-400 dark:placeholder-gray-600 mb-4"
              />

              <button
                onClick={() => toggle(act.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-colors"
              >
                {revealed.has(act.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {revealed.has(act.id) ? 'Hide Solution' : 'Reveal Solution'}
              </button>

              <AnimatePresence>
                {revealed.has(act.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-wider">Model Solution</p>
                      <pre className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed whitespace-pre-wrap font-sans">
                        {act.solution}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: Summary
        </Button>
      </div>
    </div>
  )
}
