import { useState, useCallback } from 'react'
import type { SimulatorSection } from '../types'

const SECTION_WEIGHTS: Record<SimulatorSection, number> = {
  'dashboard': 0,
  'business-problem': 8,
  'stakeholders': 8,
  'as-is-process': 8,
  'pain-points': 8,
  'root-cause': 8,
  'to-be-process': 8,
  'payment-simulator': 10,
  'brd': 12,
  'user-stories': 12,
  'acceptance-criteria': 10,
  'uat': 10,
  'quiz': 8,
  'activity': 0,
  'summary': 0,
}

export function useProgress() {
  const [visited, setVisited] = useState<Set<SimulatorSection>>(new Set(['dashboard']))

  const markVisited = useCallback((section: SimulatorSection) => {
    setVisited(prev => new Set([...prev, section]))
  }, [])

  const getProgress = useCallback(() => {
    let total = 0
    visited.forEach(section => {
      total += SECTION_WEIGHTS[section] || 0
    })
    return Math.min(total, 100)
  }, [visited])

  return { visited, markVisited, progress: getProgress() }
}
