import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, ChevronRight, X, TrendingDown, Users, DollarSign, Headphones } from 'lucide-react'
import { PAIN_POINTS, AS_IS_NODES } from '../../../data'
import type { PainPoint } from '../../../types'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'
import { Badge } from '../../../components/ui/Badge'

interface Props { onNext: () => void }

export function PainPointsSection({ onNext }: Props) {
  const [selected, setSelected] = useState<PainPoint | null>(null)
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set())

  const reveal = (pp: PainPoint) => {
    setSelected(pp)
    setRevealedIds(prev => new Set([...prev, pp.id]))
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<AlertTriangle className="w-5 h-5" />}
        title="Pain Points Analysis"
        subtitle="Click on a pain point to reveal the full business impact analysis"
      />
      <SectionBanner
        color="amber"
        time="7 min"
        what="Pain Points are the specific problems, frustrations, and inefficiencies that stakeholders experience with the current process. A BA must distinguish between a symptom and a root pain — the surface complaint versus the underlying cause."
        why="Requirements written to fix symptoms don't actually solve the problem. For example, 'customers abandon cart' is a symptom. The pain point is 'no digital payment option at checkout' — that's what the requirement should address."
        tip="Ask students: 'ShopEase has a 34% COD return rate. Is that the pain point, or is it a symptom? What is the actual pain that's causing returns?' Answer: customers feel no commitment when ordering on COD — no payment = no ownership feeling."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {PAIN_POINTS.map((pp, i) => (
          <motion.button
            key={pp.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => reveal(pp)}
            className="group text-left p-5 rounded-2xl border-2 bg-white dark:bg-gray-900 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5"
            style={{
              borderColor: revealedIds.has(pp.id) ? severityColor(pp.severity) + '60' : 'transparent',
              borderWidth: revealedIds.has(pp.id) ? '2px' : '1px',
              borderStyle: 'solid',
              borderTopWidth: '3px',
              borderTopColor: severityColor(pp.severity),
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <AlertTriangle className="w-5 h-5" style={{ color: severityColor(pp.severity) }} />
                </motion.div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{pp.title}</h3>
              </div>
              <Badge variant={pp.severity === 'high' ? 'error' : pp.severity === 'medium' ? 'warning' : 'default'}>
                {pp.severity.toUpperCase()}
              </Badge>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Found in: <span className="font-medium text-gray-700 dark:text-gray-300">
                {AS_IS_NODES.find(n => n.id === pp.nodeId)?.label || pp.nodeId}
              </span>
            </p>

            {revealedIds.has(pp.id) ? (
              <div className="grid grid-cols-2 gap-2">
                <ImpactChip icon={<DollarSign className="w-3 h-3" />} label="Revenue" value={pp.revenueImpact} color="rose" />
                <ImpactChip icon={<Headphones className="w-3 h-3" />} label="Support" value={pp.supportCost} color="amber" />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-medium text-brand-600 dark:text-brand-400">
                <span>Click to reveal impact</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-4 bottom-4 lg:inset-auto lg:bottom-8 lg:right-8 lg:w-96 z-40"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-premium overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" style={{ color: severityColor(selected.severity) }} />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{selected.title}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <ImpactBlock icon={<TrendingDown className="w-4 h-4 text-violet-500" />} label="Business Impact" value={selected.businessImpact} />
                <ImpactBlock icon={<Users className="w-4 h-4 text-brand-500" />} label="Customer Impact" value={selected.customerImpact} />
                <ImpactBlock icon={<DollarSign className="w-4 h-4 text-rose-500" />} label="Revenue Impact" value={selected.revenueImpact} highlight />
                <ImpactBlock icon={<Headphones className="w-4 h-4 text-amber-500" />} label="Support Cost" value={selected.supportCost} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {revealedIds.size} of {PAIN_POINTS.length} pain points revealed
        </p>
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: Root Cause
        </Button>
      </div>
    </div>
  )
}

function severityColor(severity: string) {
  return severity === 'high' ? '#ef4444' : severity === 'medium' ? '#f59e0b' : '#6b7280'
}

function ImpactChip({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    rose: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300',
    amber: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300',
  }
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg ${colors[color]}`}>
      {icon}
      <div>
        <p className="text-xs font-semibold">{label}</p>
        <p className="text-xs">{value}</p>
      </div>
    </div>
  )
}

function ImpactBlock({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${highlight ? 'bg-rose-50 dark:bg-rose-950/30 rounded-xl p-3' : ''}`}>
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 dark:text-gray-200">{value}</p>
      </div>
    </div>
  )
}
