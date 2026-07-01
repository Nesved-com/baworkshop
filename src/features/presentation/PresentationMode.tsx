import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Eye, EyeOff, Clock,
  Maximize2, Minimize2, BookOpen, BarChart2
} from 'lucide-react'
import { PRESENTATION_SLIDES } from '../../data'
import { cn } from '../../lib/utils'

export function PresentationMode() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [revealed, setRevealed] = useState<Set<number>>(new Set([0]))
  const [timeLeft, setTimeLeft] = useState(75 * 60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const slide = PRESENTATION_SLIDES[currentSlide]
  const total = PRESENTATION_SLIDES.length

  // Timer
  useEffect(() => {
    if (!timerRunning) return
    const interval = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [timerRunning])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const goNext = useCallback(() => {
    if (currentSlide < total - 1) {
      setCurrentSlide(c => c + 1)
      setRevealed(prev => new Set([...prev, currentSlide + 1]))
    }
  }, [currentSlide, total])

  const goPrev = useCallback(() => {
    if (currentSlide > 0) setCurrentSlide(c => c - 1)
  }, [currentSlide])

  const revealContent = useCallback(() => {
    setRevealed(prev => new Set([...prev, currentSlide]))
  }, [currentSlide])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen()
        else document.exitFullscreen()
      }
      if (e.key === 'p' || e.key === 'P') setShowNotes(s => !s)
      if (e.key === 'r' || e.key === 'R') revealContent()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, revealContent])

  // Fullscreen tracking
  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  const isRevealed = revealed.has(currentSlide)
  const typeColors: Record<string, string> = {
    title: 'from-brand-500 to-violet-600',
    concept: 'from-violet-500 to-brand-600',
    data: 'from-rose-500 to-amber-500',
    process: 'from-emerald-500 to-brand-500',
    analysis: 'from-amber-500 to-rose-500',
    artifact: 'from-brand-500 to-emerald-500',
    summary: 'from-violet-500 to-rose-500',
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Top controls bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400">
            {currentSlide + 1} / {total}
          </span>
          <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full"
              animate={{ width: `${((currentSlide + 1) / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTimerRunning(t => !t)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors',
              timeLeft < 600 ? 'text-rose-400 bg-rose-950' : 'text-gray-300 bg-gray-800 hover:bg-gray-700',
            )}
          >
            <Clock className="w-3.5 h-3.5" />
            {formatTime(timeLeft)}
          </button>

          <button
            onClick={() => setShowNotes(s => !s)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            {showNotes ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            Notes
            <kbd className="ml-1 text-gray-500 text-xs">[P]</kbd>
          </button>
        </div>
      </div>

      {/* Main slide area */}
      <div className="flex flex-1 overflow-hidden">
        <div className={cn('flex-1 flex flex-col', showNotes ? 'w-2/3' : 'w-full')}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16"
            >
              {/* Slide type badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : -10 }}
                transition={{ delay: 0.1 }}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${typeColors[slide.type] || typeColors.concept} mb-8`}
              >
                <SlideTypeIcon type={slide.type} />
                {slide.type.charAt(0).toUpperCase() + slide.type.slice(1)}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isRevealed ? 1 : 0.3, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-4xl lg:text-6xl font-bold text-white text-center leading-tight mb-4"
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealed ? 1 : 0.2 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 text-center mb-12"
              >
                {slide.subtitle}
              </motion.p>

              {/* Content items */}
              {isRevealed && (
                <div className="max-w-2xl w-full space-y-3">
                  {slide.content.filter(Boolean).map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-xl px-5 py-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                      <p className="text-gray-200 text-lg leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Reveal button */}
              {!isRevealed && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={revealContent}
                  className="mt-8 flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-glow"
                >
                  <Eye className="w-4 h-4" />
                  Reveal Content
                  <kbd className="ml-1 text-brand-200 text-xs">[R]</kbd>
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between px-8 py-6">
            <button
              onClick={goPrev}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
              <kbd className="text-gray-600 text-xs">[←]</kbd>
            </button>

            {/* Slide dots */}
            <div className="flex items-center gap-1.5">
              {PRESENTATION_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentSlide(i); setRevealed(p => new Set([...p, i])) }}
                  className={cn(
                    'rounded-full transition-all',
                    i === currentSlide ? 'w-6 h-2 bg-brand-500' : 'w-2 h-2 bg-gray-700 hover:bg-gray-600',
                  )}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={currentSlide === total - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              Next
              <kbd className="text-gray-600 text-xs">[→]</kbd>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Speaker Notes Panel */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '33%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-l border-gray-800 bg-gray-900 overflow-hidden flex-shrink-0"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-brand-400" />
                  <h3 className="text-sm font-semibold text-gray-300">Speaker Notes</h3>
                  <span className="ml-auto text-xs text-gray-500">Slide {currentSlide + 1}</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentSlide}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-gray-300 text-sm leading-relaxed whitespace-pre-line"
                    >
                      {slide.speakerNotes}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500">Estimated time: <span className="text-gray-400 font-medium">{slide.duration} min</span></p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SlideTypeIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    title: <BarChart2 className="w-3 h-3" />,
    concept: <BookOpen className="w-3 h-3" />,
    data: <BarChart2 className="w-3 h-3" />,
    process: <ChevronRight className="w-3 h-3" />,
    analysis: <Eye className="w-3 h-3" />,
    artifact: <BookOpen className="w-3 h-3" />,
    summary: <BarChart2 className="w-3 h-3" />,
  }
  return <>{icons[type] || icons.concept}</>
}
