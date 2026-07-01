import { motion } from 'framer-motion'
import { Sun, Moon, Maximize2, BookOpen, BarChart2 } from 'lucide-react'
import type { AppMode } from '../../types'
import { cn } from '../../lib/utils'

interface NavbarProps {
  mode: AppMode
  onModeChange: (mode: AppMode) => void
  isDark: boolean
  onToggleTheme: () => void
}

export function Navbar({ mode, onModeChange, isDark, onToggleTheme }: NavbarProps) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14">
      <div className="h-full glass border-b border-white/20 dark:border-gray-800/60 flex items-center px-4 gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => onModeChange('home')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-glow">
            <BarChart2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm text-gray-900 dark:text-white hidden sm:block">
            BA Workshop
          </span>
        </div>

        <div className="flex-1" />

        {/* Mode Switcher — shown when not on home so instructor can switch mid-session */}
        {mode !== 'home' && (
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-0.5">
            <ModeTab
              active={mode === 'presentation'}
              onClick={() => onModeChange('presentation')}
              icon={<BookOpen className="w-3.5 h-3.5" />}
              label="Presentation"
            />
            <ModeTab
              active={mode === 'simulator'}
              onClick={() => onModeChange('simulator')}
              icon={<BarChart2 className="w-3.5 h-3.5" />}
              label="Simulator"
            />
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

function ModeTab({ active, onClick, icon, label }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
        active
          ? 'text-gray-900 dark:text-white'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
      )}
    >
      {active && (
        <motion.div
          layoutId="mode-tab-bg"
          className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
          transition={{ type: 'spring', duration: 0.4 }}
        />
      )}
      <span className="relative flex items-center gap-1.5">
        {icon}
        <span className="hidden sm:block">{label}</span>
      </span>
    </button>
  )
}
