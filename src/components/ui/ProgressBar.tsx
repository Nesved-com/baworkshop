import { cn } from '../../lib/utils'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  color?: 'blue' | 'green' | 'violet' | 'amber' | 'rose'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showValue?: boolean
  animated?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  className,
  color = 'blue',
  size = 'md',
  label,
  showValue,
  animated = true,
}: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100)

  const trackColors: Record<string, string> = {
    blue: 'bg-brand-100 dark:bg-brand-950',
    green: 'bg-emerald-100 dark:bg-emerald-950',
    violet: 'bg-violet-100 dark:bg-violet-950',
    amber: 'bg-amber-100 dark:bg-amber-950',
    rose: 'bg-rose-100 dark:bg-rose-950',
  }

  const fillColors: Record<string, string> = {
    blue: 'bg-gradient-to-r from-brand-500 to-brand-400',
    green: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    violet: 'bg-gradient-to-r from-violet-500 to-violet-400',
    amber: 'bg-gradient-to-r from-amber-500 to-amber-400',
    rose: 'bg-gradient-to-r from-rose-500 to-rose-400',
  }

  const heights: Record<string, string> = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>}
          {showValue && <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={cn('w-full rounded-full overflow-hidden', trackColors[color], heights[size])}>
        <motion.div
          className={cn('h-full rounded-full', fillColors[color])}
          initial={animated ? { width: 0 } : { width: `${pct}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
