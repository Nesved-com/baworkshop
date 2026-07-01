import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, ChevronRight, X, AlertTriangle, ArrowDown, Info } from 'lucide-react'
import { AS_IS_NODES } from '../../../data'
import type { ProcessNode } from '../../../types'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'
import { cn } from '../../../lib/utils'

interface Props { onNext: () => void }

export function AsIsProcess({ onNext }: Props) {
  const [selected, setSelected] = useState<ProcessNode | null>(null)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<GitBranch className="w-5 h-5" />}
        title="As-Is Process Map"
        subtitle="Click any process step to see details, inputs, outputs, and problems"
      />
      <SectionBanner
        color="violet"
        time="8 min"
        what="The As-Is Process documents exactly how the business works TODAY — before any changes. A BA maps every step, decision point, actor, and handoff. This is the baseline you compare against when designing the To-Be solution."
        why="You cannot improve what you haven't understood. BAs who skip the As-Is process often design solutions that break existing workflows. Mapping As-Is also reveals hidden pain points that no one has formally documented."
        tip="Walk students through the COD flow: 'Notice how Step 5 — Manual Cash Settlement — has no digital record. What happens if the delivery agent loses the cash? How does the finance team reconcile it?' This is a real pain point."
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Process Flow */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-card">
            <div className="flex flex-col items-center gap-0">
              {AS_IS_NODES.map((node, i) => (
                <div key={node.id} className="flex flex-col items-center w-full max-w-sm">
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setSelected(node)}
                    className={cn(
                      'group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 hover:scale-105',
                      node.type === 'start' && 'border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/50',
                      node.type === 'process' && 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-brand-300 dark:hover:border-brand-700',
                      node.type === 'end' && 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50',
                      node.type === 'decision' && 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50',
                      selected?.id === node.id && 'border-brand-500 dark:border-brand-400 shadow-glow',
                    )}
                  >
                    <StepNumber index={i} type={node.type} />
                    <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-gray-200 text-left">
                      {node.label}
                    </span>
                    {node.hasPainPoint && (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center"
                      >
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                      </motion.span>
                    )}
                    <Info className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-brand-500 transition-colors flex-shrink-0" />
                  </motion.button>

                  {i < AS_IS_NODES.length - 1 && (
                    <div className="flex flex-col items-center py-1">
                      <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
                      <ArrowDown className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                      <div className="w-px h-1 bg-gray-200 dark:bg-gray-700" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <LegendItem color="brand" label="Start/Decision" />
            <LegendItem color="gray" label="Process Step" />
            <LegendItem color="emerald" label="End State" />
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Pain Point</span>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full lg:w-80 flex-shrink-0"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{selected.label}</h3>
                  <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="p-5 space-y-5 overflow-y-auto" style={{ maxHeight: 500 }}>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selected.description}</p>
                  </div>
                  <ProcessDetailList title="Inputs" items={selected.inputs} color="blue" />
                  <ProcessDetailList title="Outputs" items={selected.outputs} color="emerald" />
                  {selected.problems.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-2">⚠ Problems Identified</p>
                      <ul className="space-y-2">
                        {selected.problems.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                            <span className="text-rose-700 dark:text-rose-300">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: Pain Points
        </Button>
      </div>
    </div>
  )
}

function StepNumber({ index, type }: { index: number; type: ProcessNode['type'] }) {
  const colors = {
    start: 'bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300',
    process: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    decision: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
    end: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  }
  return (
    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 ${colors[type]}`}>
      {index + 1}
    </span>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  const colors: Record<string, string> = {
    brand: 'bg-brand-200 dark:bg-brand-800',
    gray: 'bg-gray-200 dark:bg-gray-700',
    emerald: 'bg-emerald-200 dark:bg-emerald-800',
  }
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-sm ${colors[color]}`} />
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  )
}

function ProcessDetailList({ title, items, color }: { title: string; items: string[]; color: string }) {
  const colors: Record<string, string> = {
    blue: 'text-brand-600 dark:text-brand-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
  }
  return (
    <div>
      <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${colors[color]}`}>{title}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
            <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-gray-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
