import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, X, ChevronRight, Target, Heart, AlertTriangle, Star } from 'lucide-react'
import { STAKEHOLDERS } from '../../../data'
import type { Stakeholder } from '../../../types'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'

interface Props { onNext: () => void }

export function StakeholdersSection({ onNext }: Props) {
  const [selected, setSelected] = useState<Stakeholder | null>(null)

  const center = STAKEHOLDERS.find(s => s.id === 'customer-support')!
  const others = STAKEHOLDERS.filter(s => s.id !== 'customer-support')

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<Users className="w-5 h-5" />}
        title="Stakeholder Analysis"
        subtitle="Click any stakeholder to explore their goals, pain points, and expectations"
      />
      <SectionBanner
        color="blue"
        time="8 min"
        what="Stakeholder Analysis is the process of identifying everyone who is affected by — or can affect — your project. A BA maps each stakeholder's goals, concerns, and level of influence before writing a single requirement."
        why="Missing even one key stakeholder is dangerous. Requirements written without understanding all stakeholders lead to rework after go-live."
        tip="Ask students: 'If ShopEase only talked to the Dev Team and ignored Razorpay (the Payment Gateway), what could go wrong?' — They'd miss timeout rules, webhook handling, and retry logic entirely."
      />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Diagram */}
        <div className="flex-1">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-card overflow-hidden" style={{ minHeight: 480 }}>
            {/* Center node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <button
                onClick={() => setSelected({ ...center })}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 shadow-glow flex flex-col items-center justify-center text-white transition-transform hover:scale-110"
              >
                <span className="text-2xl">🛒</span>
                <span className="text-xs font-semibold mt-1 text-center leading-tight px-1">E-Commerce Platform</span>
              </button>
            </div>

            {/* Surrounding stakeholders */}
            {others.map((s, i) => {
              const angle = (i / others.length) * 2 * Math.PI - Math.PI / 2
              const radius = 160
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                  }}
                >
                  {/* Connection line */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: Math.abs(x) + 48,
                      height: Math.abs(y) + 48,
                      transform: `translate(${x < 0 ? -Math.abs(x) - 24 : -24}px, ${y < 0 ? -Math.abs(y) - 24 : -24}px)`,
                    }}
                  >
                    <line
                      x1={x < 0 ? Math.abs(x) + 24 : 24}
                      y1={y < 0 ? Math.abs(y) + 24 : 24}
                      x2={x < 0 ? 24 : Math.abs(x) + 24}
                      y2={y < 0 ? 24 : Math.abs(y) + 24}
                      stroke={s.color}
                      strokeWidth="1.5"
                      strokeOpacity="0.3"
                      strokeDasharray="4 4"
                    />
                  </svg>

                  <button
                    onClick={() => setSelected(s)}
                    className="group relative w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-lg bg-white dark:bg-gray-900"
                    style={{ borderColor: `${s.color}40` }}
                  >
                    <div
                      className="w-full h-full rounded-xl flex flex-col items-center justify-center gap-1"
                      style={{ backgroundColor: `${s.color}10` }}
                    >
                      <span className="text-xl">{s.icon}</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight px-1 line-clamp-2">
                        {s.name.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>

          <p className="text-xs text-center text-gray-400 dark:text-gray-600 mt-3">
            Click any stakeholder node to view details
          </p>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 320 }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="overflow-hidden flex-shrink-0"
            >
              <div className="w-80 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card overflow-hidden">
                <div
                  className="p-5 relative"
                  style={{ backgroundColor: `${selected.color}15` }}
                >
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/70 dark:bg-gray-800/70 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                  <div className="text-4xl mb-3">{selected.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{selected.name}</h3>
                  <span
                    className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: selected.color }}
                  >
                    {selected.role}
                  </span>
                </div>

                <div className="p-5 space-y-4 overflow-y-auto" style={{ maxHeight: 380 }}>
                  <DetailSection icon={<Target className="w-3.5 h-3.5" />} title="Goals" items={selected.goals} color="blue" />
                  <DetailSection icon={<AlertTriangle className="w-3.5 h-3.5" />} title="Pain Points" items={selected.painPoints} color="rose" />
                  <DetailSection icon={<Star className="w-3.5 h-3.5" />} title="Expectations" items={selected.expectations} color="violet" />
                  <DetailSection icon={<Heart className="w-3.5 h-3.5" />} title="Responsibilities" items={selected.responsibilities} color="emerald" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stakeholder list */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {STAKEHOLDERS.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(s)}
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-card-hover transition-all text-left"
          >
            <span className="text-xl">{s.icon}</span>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">{s.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.role}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: As-Is Process
        </Button>
      </div>
    </div>
  )
}

function DetailSection({ icon, title, items, color }: { icon: React.ReactNode; title: string; items: string[]; color: string }) {
  const colors: Record<string, string> = {
    blue: 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950',
    violet: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950',
  }

  return (
    <div>
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold mb-2 ${colors[color]}`}>
        {icon} {title}
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mt-1.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
