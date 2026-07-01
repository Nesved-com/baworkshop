import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'

interface Props { onNext: () => void }

const FISHBONE_DATA = {
  problem: 'ShopEase losing ₹64 Crore/month — No Digital Payment Option',
  categories: [
    {
      id: 'people',
      label: 'People',
      color: '#8b5cf6',
      causes: [
        { text: 'Leadership unaware of digital payment revenue opportunity', sub: ['No competitive benchmarking done', 'No BA assigned to analyse impact'] },
        { text: 'No dedicated payment product team', sub: ['Single tech team handles all', 'No payment domain expertise'] },
        { text: 'Customers not surveyed about payment preferences', sub: ['No Voice of Customer data', 'Assumed COD is sufficient'] },
      ],
    },
    {
      id: 'process',
      label: 'Process',
      color: '#ef4444',
      causes: [
        { text: 'No payment gateway evaluation process', sub: ['No RFP sent to payment providers', 'No vendor comparison done'] },
        { text: 'Cash settlement is fully manual', sub: ['Delivery agent collects cash', 'No digital reconciliation'] },
        { text: 'COD return process untracked', sub: ['34% return rate unmonitored', 'No incentive to reduce COD returns'] },
      ],
    },
    {
      id: 'technology',
      label: 'Technology',
      color: '#0d8fe6',
      causes: [
        { text: 'No payment gateway integration exists', sub: ['Platform built for COD only', 'No PCI-DSS compliant infrastructure'] },
        { text: 'No UPI or card processing capability', sub: ['Missing Razorpay/Paytm integration', 'No tokenisation support'] },
        { text: 'Checkout page not designed for digital payments', sub: ['No payment method selector UI', 'No OTP/2FA flow built'] },
      ],
    },
    {
      id: 'policy',
      label: 'Policy',
      color: '#f59e0b',
      causes: [
        { text: 'No RBI compliance framework in place', sub: ['PCI-DSS not certified', 'Data storage policy not defined'] },
        { text: 'No payment failure/refund policy defined', sub: ['No SLA for refunds', 'No retry policy documented'] },
        { text: 'No contract with any payment gateway', sub: ['No MDR rate negotiated', 'No settlement frequency agreed'] },
      ],
    },
    {
      id: 'market',
      label: 'Market',
      color: '#10b981',
      causes: [
        { text: 'Competitors (Flipkart, Amazon) offer 6+ payment methods', sub: ['UPI widely adopted in India', 'Customers expect digital payments'] },
        { text: 'UPI penetration in India at 80%+ among shoppers', sub: ['NPCI reports 10B+ transactions/month', 'COD preference declining year-on-year'] },
        { text: 'High-value buyers (₹10,000+) never pay COD', sub: ['Security concerns with large cash', 'EMI only possible via card/BNPL'] },
      ],
    },
  ],
}

export function RootCauseSection({ onNext }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const expandAll = () => {
    setExpanded(new Set(FISHBONE_DATA.categories.map(c => c.id)))
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<Search className="w-5 h-5" />}
        title="Root Cause Analysis"
        subtitle="Fishbone (Ishikawa) Diagram — Click a category to expand all causes"
      />
      <SectionBanner
        color="emerald"
        time="8 min"
        what="Root Cause Analysis (RCA) finds the deepest underlying reason for a problem — not just its symptoms. The Fishbone (Ishikawa) Diagram organises causes into categories: People, Process, Technology, and Policy. A BA uses RCA to ensure the solution targets the real problem."
        why="Fixing symptoms is expensive and temporary. If ShopEase adds payment methods but the root cause was an outdated payment gateway contract — the new methods would fail at integration. RCA prevents teams from building the wrong solution twice."
        tip="Point to the Technology branch: 'Notice ShopEase's payment gateway doesn't support UPI. Ask students — is that a technology problem, or is it a Policy problem (contract never required UPI)?' Both are true — that's why RCA uses multiple categories."
      />

      {/* Problem Statement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-700 rounded-2xl p-5 text-center mb-8"
      >
        <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-2">Problem (Effect)</p>
        <p className="text-xl font-bold text-rose-800 dark:text-rose-200">{FISHBONE_DATA.problem}</p>
      </motion.div>

      <div className="flex justify-end mb-4">
        <button onClick={expandAll} className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">
          Expand All Categories
        </button>
      </div>

      {/* Fishbone grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {FISHBONE_DATA.categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <button
              onClick={() => toggle(cat.id)}
              className="w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-200"
              style={{
                borderColor: expanded.has(cat.id) ? cat.color : `${cat.color}40`,
                backgroundColor: expanded.has(cat.id) ? `${cat.color}08` : 'transparent',
              }}
            >
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-bold text-gray-900 dark:text-white">{cat.label}</span>
                  <span className="text-xs text-gray-500">({cat.causes.length} causes)</span>
                </div>
                <motion.div
                  animate={{ rotate: expanded.has(cat.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </motion.div>
              </div>

              <AnimatePresence>
                {expanded.has(cat.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden bg-white dark:bg-gray-900"
                  >
                    <div className="p-4 space-y-3">
                      {cat.causes.map((cause, ci) => (
                        <motion.div
                          key={ci}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: ci * 0.07 }}
                          className="pl-3 border-l-2"
                          style={{ borderColor: `${cat.color}60` }}
                        >
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                            {cause.text}
                          </p>
                          <ul className="space-y-0.5">
                            {cause.sub.map((s, si) => (
                              <li key={si} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-8"
      >
        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
          🔍 Key BA Insight
        </p>
        <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
          Root causes span <strong>all 5 categories</strong>. The highest-impact fixes are in <strong>Technology</strong> (build payment gateway integration)
          and <strong>Policy</strong> (establish RBI/PCI-DSS compliance framework) — these must be resolved first before any payment method can go live.
          Address root causes in this order: Policy → Technology → Process → People → Market response.
        </p>
      </motion.div>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: To-Be Process
        </Button>
      </div>
    </div>
  )
}
