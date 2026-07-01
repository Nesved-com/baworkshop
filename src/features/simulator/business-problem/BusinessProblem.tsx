import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingDown, AlertCircle, ChevronRight, IndianRupee } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, FunnelChart, Funnel, LabelList } from 'recharts'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { SectionBanner } from '../../../components/ui/SectionBanner'

interface Props { onNext: () => void }

const FUNNEL_DATA = [
  { name: 'Visitors', value: 200000, fill: '#0d8fe6', pct: '100%' },
  { name: 'Browse Products', value: 120000, fill: '#8b5cf6', pct: '60%' },
  { name: 'Add to Cart', value: 86000, fill: '#f59e0b', pct: '43%' },
  { name: 'Reach Checkout', value: 54000, fill: '#ef4444', pct: '27%' },
  { name: 'COD Completed', value: 36000, fill: '#10b981', pct: '18%' },
]

function useAnimatedNumber(target: number, duration = 2000, delay = 0) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = Date.now()
      const frame = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCurrent(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])
  return current
}

function AnimatedKPI({ value, label, subLabel, color, delay, prefix = '' }: {
  value: number; label: string; subLabel?: string; color: string; delay: number; prefix?: string
}) {
  const count = useAnimatedNumber(value, 2000, delay)
  const colors: Record<string, string> = {
    blue: 'text-brand-600 dark:text-brand-400',
    violet: 'text-violet-600 dark:text-violet-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    rose: 'text-rose-600 dark:text-rose-400',
  }
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-card">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${colors[color]}`}>
        {prefix}{count.toLocaleString('en-IN')}
      </p>
      {subLabel && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subLabel}</p>}
    </div>
  )
}

export function BusinessProblem({ onNext }: Props) {
  const [revealed, setRevealed] = useState(false)
  const [showImpact, setShowImpact] = useState(false)
  const [studentGuess, setStudentGuess] = useState('')

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<TrendingDown className="w-5 h-5" />}
        title="Business Problem"
        subtitle="Understanding the scale of the problem through data"
      />

      <SectionBanner
        color="rose"
        time="5 min"
        what="A Business Problem statement defines the gap between the current state and the desired state — in measurable business terms, not technical terms. A good BA always starts here before thinking about any solution."
        why="If you don't clearly define the problem, you risk building the wrong solution. Teams often jump to 'let's add a feature' when the real issue is a broken process or a missing business capability."
        tip="Ask students: 'ShopEase is losing ₹64 Crore per month — but WHY? Is it a technology problem, a process problem, or a policy problem?' Let them think before moving forward."
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AnimatedKPI value={200000} label="Monthly Visitors" color="blue" delay={0} />
        <AnimatedKPI value={86000} label="Cart Abandonments" subLabel="43% abandonment rate" color="rose" delay={300} />
        <AnimatedKPI value={34} label="COD Return Rate" subLabel="₹8.5 Cr/month wasted" color="violet" delay={600} prefix="" />
        <AnimatedKPI value={64} label="Revenue Lost (₹ Cr)" subLabel="per month" color="rose" delay={900} />
      </div>

      {/* Funnel Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">Checkout Funnel</h3>
          <div className="space-y-3">
            {FUNNEL_DATA.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.value.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-semibold" style={{ color: item.fill }}>{item.pct}</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.fill }}
                    initial={{ width: 0 }}
                    animate={{ width: item.pct }}
                    transition={{ duration: 1.2, delay: 0.1 * i + 1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">Monthly Drop-off</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={FUNNEL_DATA} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [v.toLocaleString('en-IN'), 'Users']} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {FUNNEL_DATA.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Reveal problem button */}
      {!revealed ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-card mb-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
              Student Activity
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              What problem do you think the company is facing?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Discuss for one minute. Then type the class guess before revealing the formal business problem.
            </p>
            <textarea
              value={studentGuess}
              onChange={e => setStudentGuess(e.target.value)}
              placeholder="Example: ShopEase only has Cash on Delivery and customers are abandoning their carts because they can't pay digitally..."
              className="w-full min-h-[96px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 mb-4"
            />
            <Button
              onClick={() => setRevealed(true)}
              variant="premium"
              size="lg"
              icon={<AlertCircle className="w-5 h-5" />}
            >
              Reveal Business Problem Statement
            </Button>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-rose-900 dark:text-rose-200 mb-2">Business Problem Statement</h3>
                <p className="text-rose-800 dark:text-rose-300 leading-relaxed">
                  ShopEase, an e-commerce platform with <strong>2,00,000 monthly visitors</strong>, currently supports only
                  <strong> Cash on Delivery (COD)</strong> as a payment method. This has resulted in a
                  <strong> 43% cart abandonment rate</strong> (86,000 lost orders/month) and a
                  <strong> 34% COD return rate</strong>, causing an estimated
                  <strong> ₹64 Crore in monthly revenue loss</strong>. The business requires a Business Analyst to design
                  a digital payment portal with <strong>6 payment methods</strong> (UPI, Card, Net Banking, EMI, Wallet, BNPL)
                  to recover lost revenue and improve customer experience by <strong>Q2 2025</strong>.
                </p>
                <button
                  onClick={() => setShowImpact(s => !s)}
                  className="mt-3 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  {showImpact ? '▾ Hide' : '▸ Show'} Revenue Impact Breakdown
                </button>
                <AnimatePresence>
                  {showImpact && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 grid grid-cols-2 gap-3 overflow-hidden"
                    >
                      {[
                        { label: 'Cart Abandonment', value: '86,000/mo' },
                        { label: 'COD Return Rate', value: '34%' },
                        { label: 'Monthly Loss', value: '₹64 Cr' },
                        { label: 'Annual Impact', value: '₹768 Cr' },
                      ].map(item => (
                        <div key={item.label} className="bg-rose-100/50 dark:bg-rose-900/30 rounded-xl p-3">
                          <p className="text-xs text-rose-600 dark:text-rose-400">{item.label}</p>
                          <p className="font-bold text-rose-900 dark:text-rose-200">{item.value}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {revealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
            Next: Stakeholders
          </Button>
        </motion.div>
      )}
    </div>
  )
}

export function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  )
}
