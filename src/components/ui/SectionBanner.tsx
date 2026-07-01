import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Lightbulb } from 'lucide-react'

interface SectionBannerProps {
  what: string
  why: string
  tip?: string
  time?: string
  color?: 'blue' | 'violet' | 'emerald' | 'amber' | 'rose'
}

const colorMap = {
  blue:    { bg: 'bg-brand-50 dark:bg-brand-950/40',   border: 'border-brand-200 dark:border-brand-800',   icon: 'text-brand-600 dark:text-brand-400',   text: 'text-brand-800 dark:text-brand-200',   tip: 'bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300' },
  violet:  { bg: 'bg-violet-50 dark:bg-violet-950/40', border: 'border-violet-200 dark:border-violet-800', icon: 'text-violet-600 dark:text-violet-400', text: 'text-violet-800 dark:text-violet-200', tip: 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800', icon: 'text-emerald-600 dark:text-emerald-400', text: 'text-emerald-800 dark:text-emerald-200', tip: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-950/40',   border: 'border-amber-200 dark:border-amber-800',   icon: 'text-amber-600 dark:text-amber-400',   text: 'text-amber-800 dark:text-amber-200',   tip: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300' },
  rose:    { bg: 'bg-rose-50 dark:bg-rose-950/40',     border: 'border-rose-200 dark:border-rose-800',     icon: 'text-rose-600 dark:text-rose-400',     text: 'text-rose-800 dark:text-rose-200',     tip: 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300' },
}

export function SectionBanner({ what, why, tip, time, color = 'blue' }: SectionBannerProps) {
  const [open, setOpen] = useState(true)
  const c = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border ${c.bg} ${c.border} mb-6 overflow-hidden`}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <Lightbulb className={`w-4 h-4 flex-shrink-0 ${c.icon}`} />
        <span className={`text-xs font-bold uppercase tracking-wider flex-1 ${c.icon}`}>
          Section Context
        </span>
        {time && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.tip} mr-2`}>
            ⏱ {time}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 ${c.icon} transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              <div>
                <p className={`text-xs font-bold mb-0.5 ${c.icon}`}>📌 What is this?</p>
                <p className={`text-sm leading-relaxed ${c.text}`}>{what}</p>
              </div>
              <div>
                <p className={`text-xs font-bold mb-0.5 ${c.icon}`}>🎯 Why does it matter?</p>
                <p className={`text-sm leading-relaxed ${c.text}`}>{why}</p>
              </div>
              {tip && (
                <div className={`rounded-xl px-3 py-2 ${c.tip} flex items-start gap-2`}>
                  <span className="text-sm">💬</span>
                  <p className="text-xs leading-relaxed font-medium">{tip}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
