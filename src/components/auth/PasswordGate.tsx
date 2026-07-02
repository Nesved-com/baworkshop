import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react'

const AUTH_KEY  = 'ba_workshop_auth'
const PASSWORD  = 'ShopEase@2025'   // change this anytime

export function useAuth() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === 'true')
  const unlock = () => { localStorage.setItem(AUTH_KEY, 'true'); setAuthed(true) }
  const logout = () => { localStorage.removeItem(AUTH_KEY);       setAuthed(false) }
  return { authed, unlock, logout }
}

interface Props { onUnlock: () => void }

export function PasswordGate({ onUnlock }: Props) {
  const [value,   setValue]   = useState('')
  const [show,    setShow]    = useState(false)
  const [error,   setError]   = useState(false)
  const [shaking, setShaking] = useState(false)

  // Clear error when user starts typing
  useEffect(() => { if (error) setError(false) }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === PASSWORD) {
      onUnlock()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setValue('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-brand-600/6 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1     }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Card */}
        <motion.div
          animate={shaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl"
        >
          {/* Logo / icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-brand-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-900/40">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">BA Workshop</h1>
            <p className="text-sm text-gray-400 text-center leading-relaxed">
              Private access only.<br />Enter your password to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className={`w-full bg-gray-800 border rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? 'border-rose-500 focus:ring-rose-500/30'
                    : 'border-gray-700 focus:ring-violet-500/40 focus:border-violet-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-400 font-medium"
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={!value.trim()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-brand-600 hover:from-violet-500 hover:to-brand-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-violet-900/30"
            >
              <ShieldCheck className="w-4 h-4" />
              Unlock Workshop
            </button>
          </form>

          {/* Footer hint */}
          <p className="text-center text-xs text-gray-600 mt-6">
            For access, contact the workshop instructor.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
