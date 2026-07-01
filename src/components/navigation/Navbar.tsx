import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Maximize2, Minimize2, BookOpen, BarChart2 } from 'lucide-react'
import type { AppMode } from '../../types'
import { cn } from '../../lib/utils'

interface NavbarProps {
  mode: AppMode
  onModeChange: (mode: AppMode) => void
  isDark: boolean
  onToggleTheme: () => void
  isFullscreen: boolean
}

export function Navbar({ mode, onModeChange, isDark, onToggleTheme, isFullscreen }: NavbarProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <>
      {/* Main header — hidden in fullscreen */}
      <AnimatePresence>
        {!isFullscreen && (
          <motion.header
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -56, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 h-14"
          >
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

              {/* Mode Switcher */}
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
                  title="Enter fullscreen (Esc to exit)"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Floating exit button — only in fullscreen */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={toggleFullscreen}
            title="Exit fullscreen"
            className="fixed top-3 right-3 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900/70 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold hover:bg-gray-900/90 transition-colors shadow-lg"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit Fullscreen</span>
            <span className="ml-1 px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">Esc</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
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
