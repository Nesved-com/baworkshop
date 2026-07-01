export type AppMode = 'home' | 'presentation' | 'simulator'
export type SimulatorSection =
  | 'dashboard'
  | 'business-problem'
  | 'stakeholders'
  | 'as-is-process'
  | 'pain-points'
  | 'root-cause'
  | 'to-be-process'
  | 'payment-simulator'
  | 'brd'
  | 'user-stories'
  | 'acceptance-criteria'
  | 'uat'
  | 'quiz'
  | 'activity'
  | 'summary'

export interface Stakeholder {
  id: string
  name: string
  role: string
  icon: string
  color: string
  responsibilities: string[]
  goals: string[]
  painPoints: string[]
  expectations: string[]
  position: { x: number; y: number }
}

export interface ProcessNode {
  id: string
  label: string
  description: string
  inputs: string[]
  outputs: string[]
  problems: string[]
  type: 'start' | 'process' | 'decision' | 'end'
  hasPainPoint?: boolean
}

export interface PainPoint {
  id: string
  title: string
  nodeId: string
  businessImpact: string
  customerImpact: string
  revenueImpact: string
  supportCost: string
  severity: 'high' | 'medium' | 'low'
}

export interface UserStory {
  id: string
  actor: string
  goal: string
  benefit: string
  method?: string
}

export interface AcceptanceCriteria {
  id: string
  given: string
  when: string
  then: string
}

export interface UATScenario {
  id: string
  scenario: string
  steps: string
  expectedResult: string
  priority: 'high' | 'medium' | 'low'
  status: 'pass' | 'fail' | 'pending'
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  category: string
}

export interface BRDSection {
  id: string
  title: string
  description: string
  placeholder: string
  hint: string
  content: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'emi' | 'wallet' | 'bnpl'
