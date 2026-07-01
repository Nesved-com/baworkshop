import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variant === 'default' && 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        variant === 'success' && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        variant === 'warning' && 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
        variant === 'error' && 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
        variant === 'info' && 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300',
        variant === 'outline' && 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400',
        className,
      )}
    >
      {children}
    </span>
  )
}
