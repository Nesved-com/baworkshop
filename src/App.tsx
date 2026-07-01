import { useState } from 'react'
import { Navbar } from './components/navigation/Navbar'
import { HomePage } from './features/home/HomePage'
import { PresentationMode } from './features/presentation/PresentationMode'
import { SimulatorLayout } from './features/simulator/SimulatorLayout'
import { useTheme } from './hooks/useTheme'
import type { AppMode } from './types'

export default function App() {
  const [mode, setMode] = useState<AppMode>('home')
  const { isDark, toggleTheme } = useTheme()

  return (
    <>
      <Navbar
        mode={mode}
        onModeChange={setMode}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      {mode === 'home' && <HomePage onNavigate={setMode} />}
      {mode === 'presentation' && <PresentationMode />}
      {mode === 'simulator' && <SimulatorLayout />}
    </>
  )
}
