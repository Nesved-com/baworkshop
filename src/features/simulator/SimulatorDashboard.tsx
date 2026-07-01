import { motion } from 'framer-motion'
import { TrendingDown, Users, GitBranch, AlertTriangle, Search, Zap, CreditCard, FileText, ChevronRight } from 'lucide-react'
import type { SimulatorSection } from '../../types'

interface Props { onNavigate: (s: SimulatorSection) => void }

const MISSIONS: { id: SimulatorSection; n: number; icon: React.ReactNode; title: string; desc: string; color: string }[] = [
  { id: 'business-problem', n: 1, icon: <TrendingDown />, title: 'Understand the Problem', desc: 'Why is ShopEase losing ₹64 Cr/month?', color: 'rose' },
  { id: 'stakeholders', n: 2, icon: <Users />, title: 'Map Stakeholders', desc: 'Who is affected and what do they need?', color: 'blue' },
  { id: 'as-is-process', n: 3, icon: <GitBranch />, title: 'As-Is Process', desc: 'Document the current COD-only flow', color: 'violet' },
  { id: 'pain-points', n: 4, icon: <AlertTriangle />, title: 'Identify Pain Points', desc: 'Find what\'s broken in the COD process', color: 'amber' },
  { id: 'root-cause', n: 5, icon: <Search />, title: 'Root Cause Analysis', desc: 'Why doesn\'t ShopEase have digital payments?', color: 'emerald' },
  { id: 'to-be-process', n: 6, icon: <Zap />, title: 'Design To-Be Process', desc: 'Design the 6-method payment portal flow', color: 'blue' },
  { id: 'payment-simulator', n: 7, icon: <CreditCard />, title: '★ Payment Simulator', desc: 'Experience & analyse all 6 payment methods', color: 'violet' },
  { id: 'brd', n: 8, icon: <FileText />, title: 'Build the BRD', desc: 'Document requirements for the portal', color: 'brand' },
]

const colorMap: Record<string, string> = {
  rose: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400',
  blue: 'bg-brand-50 dark:bg-brand-950/30 border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400',
  violet: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400',
  amber: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400',
  brand: 'bg-brand-50 dark:bg-brand-950/30 border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400',
}

export function SimulatorDashboard({ onNavigate }: Props) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400 px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          Active Case Study — ShopEase Payment Portal
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          BA Investigation Dashboard
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-gray-500 dark:text-gray-400 text-sm">
          Design a payment portal from scratch for ShopEase e-commerce
        </motion.p>
      </div>

      {/* Hero mission card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-gradient-to-r from-brand-600 via-violet-600 to-violet-700 rounded-2xl p-6 text-white mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 text-8xl">💳</div>
        </div>
        <p className="text-brand-100 text-xs font-semibold uppercase tracking-wider mb-2">Your Mission as BA</p>
        <h2 className="text-2xl font-bold mb-2">Build ShopEase Payment Portal</h2>
        <p className="text-brand-100 text-sm leading-relaxed max-w-xl mb-4">
          ShopEase only has Cash on Delivery. Design a portal with 6 payment methods: UPI, Card, Net Banking, EMI, Wallet & BNPL. Recover ₹64 Crore/month in lost revenue.
        </p>
        <div className="flex flex-wrap gap-2">
          {['UPI', 'Card', 'Net Banking', 'EMI', 'Wallet', 'BNPL'].map(m => (
            <span key={m} className="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-semibold">{m}</span>
          ))}
        </div>
      </motion.div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Monthly Visitors', value: '2,00,000', sub: 'to ShopEase', color: 'gray' },
          { label: 'Cart Abandonment', value: '43%', sub: '= 86,000 lost', color: 'rose' },
          { label: 'COD Return Rate', value: '34%', sub: '₹8.5 Cr/month', color: 'amber' },
          { label: 'Revenue at Stake', value: '₹64 Cr', sub: 'per month', color: 'emerald' },
        ].map((kpi, i) => (
          <motion.div key={kpi.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-card">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold ${kpi.color === 'rose' ? 'text-rose-600 dark:text-rose-400' : kpi.color === 'amber' ? 'text-amber-600 dark:text-amber-400' : kpi.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
              {kpi.value}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission cards */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Start Your Investigation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {MISSIONS.map((m, i) => (
            <motion.button key={m.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.04 }}
              onClick={() => onNavigate(m.id)}
              className={`group text-left p-4 bg-white dark:bg-gray-900 border rounded-2xl hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 ${m.id === 'payment-simulator' ? 'border-violet-200 dark:border-violet-800 ring-1 ring-violet-200 dark:ring-violet-800' : 'border-gray-100 dark:border-gray-800'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-xl border text-sm ${colorMap[m.color]}`}>
                  {m.icon}
                </div>
                <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-bold flex items-center justify-center">
                  {m.n}
                </span>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white text-xs mb-1 leading-tight">{m.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{m.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-gray-400 dark:text-gray-600 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Open <ChevronRight className="w-3 h-3" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
