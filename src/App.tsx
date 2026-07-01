import { useState, useEffect } from 'react'
import { Navbar } from './components/navigation/Navbar'
import { HomePage } from './features/home/HomePage'
import { PresentationMode } from './features/presentation/PresentationMode'
import { SimulatorLayout } from './features/simulator/SimulatorLayout'
import { useTheme } from './hooks/useTheme'
import type { AppMode, SimulatorSection } from './types'

export default function App() {
  const [mode, setMode] = useState<AppMode>('home')
  const { isDark, toggleTheme } = useTheme()
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Presentation ↔ Simulator handoff
  const [presentSlide, setPresentSlide] = useState(0)
  const [simSection, setSimSection] = useState<SimulatorSection | undefined>()

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const handleOpenSimulator = (section: SimulatorSection, fromSlide: number) => {
    setPresentSlide(fromSlide)
    setSimSection(section)
    setMode('simulator')
  }

  const handleBackToPresentation = () => {
    setMode('presentation')
  }

  return (
    <>
      <Navbar
        mode={mode}
        onModeChange={setMode}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        isFullscreen={isFullscreen}
      />
      <div className={isFullscreen ? '' : 'pt-14'}>
        {mode === 'home' && <HomePage onNavigate={setMode} />}
        {mode === 'presentation' && (
          <PresentationMode
            initialSlide={presentSlide}
            onOpenSimulator={handleOpenSimulator}
          />
        )}
        {mode === 'simulator' && (
          <SimulatorLayout
            isFullscreen={isFullscreen}
            initialSection={simSection}
            onBack={simSection ? handleBackToPresentation : undefined}
          />
        )}
      </div>
    </>
  )
}
