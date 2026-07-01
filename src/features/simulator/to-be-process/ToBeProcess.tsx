import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, ChevronRight, ArrowDown, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'

interface Props { onNext: () => void }

const TO_BE_STEPS = [
  { label: 'Browse & Discover', improvement: 'Product page shows price + EMI starting from ₹X/month', icon: '🛍️', isNew: false },
  { label: 'Add to Cart', improvement: 'Cart shows total + payment method preview', icon: '🛒', isNew: false },
  { label: 'Checkout — Address', improvement: 'Saved address auto-filled, single page checkout', icon: '📋', isNew: false },
  { label: 'Choose Payment Method', improvement: '6 options: UPI · Card · Net Banking · EMI · Wallet · BNPL', icon: '💳', isNew: true },
  { label: 'Payment Authentication', improvement: 'UPI PIN / OTP / 3D Secure — per method', icon: '🔐', isNew: true },
  { label: 'Payment Processing', improvement: 'Real-time gateway processing with retry on failure', icon: '⚡', isNew: true },
  { label: 'Digital Confirmation', improvement: 'Instant order ID, payment receipt, SMS + email', icon: '✅', isNew: true },
  { label: 'Automated Settlement', improvement: 'T+1 digital settlement — no manual cash collection', icon: '🏦', isNew: true },
]

const COMPARISON_DATA = [
  { metric: 'Cart Abandonment Rate', before: '43%', after: '< 20%', color: 'emerald' },
  { metric: 'COD Return Rate', before: '34%', after: '< 10%', color: 'blue' },
  { metric: 'Digital Payment Share', before: '0%', after: '70%+', color: 'violet' },
  { metric: 'Monthly Revenue Loss', before: '₹64 Cr', after: '< ₹15 Cr', color: 'amber' },
  { metric: 'Settlement Time', before: '3-5 days (manual)', after: 'T+1 (automated)', color: 'rose' },
]

export function ToBeProcess({ onNext }: Props) {
  const [showCompare, setShowCompare] = useState(false)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<Zap className="w-5 h-5" />}
        title="To-Be Process"
        subtitle="The improved payment portal flow with all 6 methods and enhancements highlighted"
      />
      <SectionBanner
        color="blue"
        time="7 min"
        what="The To-Be Process is the BA's vision of how the business should work after the solution is implemented. It maps the improved flow, highlights every change from the As-Is, and becomes the blueprint that the Dev Team builds from."
        why="Without a clear To-Be Process, developers make their own assumptions — and the final product rarely matches what the business expected. The BA owns this document to bridge the gap between business intent and technical implementation."
        tip="Compare As-Is Step 4 (COD Confirm only) vs To-Be Step 4 (Choose from 6 payment methods). Ask students: 'As a BA, what new business rules did you introduce at this step? What happens if UPI fails?' That thinking goes into the BRD next."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* To-Be flow */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Improved Checkout Flow</h3>
          <div className="space-y-0">
            {TO_BE_STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`w-full flex items-start gap-3 p-4 rounded-2xl border transition-all ${
                    step.isNew
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                      : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{step.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{step.label}</p>
                      {step.isNew && (
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{step.improvement}</p>
                  </div>
                  <CheckCircle className={`w-4 h-4 flex-shrink-0 ${step.isNew ? 'text-emerald-500' : 'text-gray-200 dark:text-gray-700'}`} />
                </motion.div>
                {i < TO_BE_STEPS.length - 1 && (
                  <div className="flex justify-start pl-7 py-1">
                    <ArrowDown className="w-3.5 h-3.5 text-gray-300 dark:text-gray-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key improvements */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Key Improvements</h3>
          <div className="space-y-3">
            {[
              { title: '6 Payment Methods', desc: 'UPI, Card, Net Banking, EMI, Wallet, BNPL — customers choose what suits them best', icon: '💳', color: 'brand' },
              { title: 'Instant Digital Confirmation', desc: 'Order ID, payment receipt, and SMS sent within 5 seconds of payment — no waiting', icon: '✅', color: 'violet' },
              { title: 'Automated T+1 Settlement', desc: 'Eliminates manual cash collection by delivery agents — ₹8.5 Cr/month saved in COD returns', icon: '🏦', color: 'emerald' },
              { title: 'Payment Retry & Fallback', desc: 'Failed UPI? System offers Card/Wallet fallback — cart preserved, order not lost', icon: '🔄', color: 'amber' },
              { title: 'RBI/PCI-DSS Compliant', desc: 'All payment data encrypted and handled per RBI guidelines — customer trust established', icon: '🔐', color: 'rose' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison toggle */}
      <div className="mb-8">
        <button
          onClick={() => setShowCompare(s => !s)}
          className="flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline mb-4"
        >
          {showCompare ? '▾' : '▸'} Compare As-Is vs To-Be Metrics
        </button>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Metric</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-rose-500 uppercase tracking-wider">As-Is (Current)</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-emerald-500 uppercase tracking-wider">To-Be (Target)</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-800/30'}>
                    <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{row.metric}</td>
                    <td className="px-5 py-3 text-center text-sm text-rose-600 dark:text-rose-400 font-semibold">{row.before}</td>
                    <td className="px-5 py-3 text-center text-sm text-emerald-600 dark:text-emerald-400 font-semibold">{row.after}</td>
                    <td className="px-5 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <ArrowRight className="w-3 h-3" /> Improved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: Build BRD
        </Button>
      </div>
    </div>
  )
}
