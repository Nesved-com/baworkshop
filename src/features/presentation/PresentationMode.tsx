import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Eye, EyeOff,
  BookOpen, BarChart2, Lightbulb, Users, AlertTriangle,
  Zap, FileText, CheckSquare, TestTube, Award, Target,
  ArrowRight, Play, Pause, RotateCcw, Download
} from 'lucide-react'
import { cn } from '../../lib/utils'
import type { SimulatorSection } from '../../types'
import { SessionPlanExport } from '../export/SessionPlanExport'

// ─── SLIDE DATA ──────────────────────────────────────────────────────────────

type SlideType = 'hero' | 'data' | 'compare' | 'concept' | 'activity' | 'artifact' | 'summary' | 'fishbone' | 'flowdiagram'

interface Stat { value: string; label: string; color: string }
interface CompareItem { label: string; before: string; after: string }
interface ActivityStep { step: string; time: string }

interface Slide {
  id: number
  type: SlideType
  title: string
  subtitle: string
  priyaMoment?: string          // Priya story hook shown on slide
  keyTakeaway?: string          // Bold callout box per slide
  bullets?: string[]
  stats?: Stat[]
  compare?: CompareItem[]
  activity?: { title: string; task: string; steps: ActivityStep[]; time: string }
  example?: { label: string; text: string }
  speakerNotes: string
  duration: number
  accentColor: string
  simulatorSection?: SimulatorSection
}

const SLIDES: Slide[] = [
  // ── SLIDE 1: HERO ──────────────────────────────────────────────────────────
  {
    id: 1,
    type: 'hero',
    title: 'Business Analyst Workshop',
    subtitle: 'ShopEase Case Study — COD to Digital Payment Portal',
    priyaMoment: 'Priya wants to buy a ₹12,000 kitchen appliance on ShopEase. She reaches checkout and sees: "Cash on Delivery Only." She doesn\'t keep large cash at home. She closes the tab and buys from Amazon instead.',
    keyTakeaway: 'Your mission today: Solve Priya\'s problem — and recover ₹64 Crore/month for ShopEase.',
    bullets: [
      'You are the Business Analyst hired by ShopEase leadership',
      'ShopEase has only COD — losing ₹64 Crore every month',
      'You will design a 6-method digital payment portal from scratch',
      'You will produce real BA artifacts: BRD → User Stories → UAT',
    ],
    speakerNotes: `Welcome! Today is not a lecture — it is a simulation. Every student is a BA on a real client engagement.

The client: ShopEase, a fast-growing Indian e-commerce company. The problem: they only accept Cash on Delivery. The business impact: ₹64 Crore in monthly revenue loss.

Start with Priya's story on the slide. Ask the class: "Has anyone here ever abandoned an online purchase because the payment option wasn't available?" Almost every hand will go up. That is your hook — the class just became ShopEase's target customer.

Your job today is not to explain BA theory. Your job is to guide them through doing BA work — the theory will emerge from the doing.`,
    duration: 3,
    accentColor: 'from-brand-500 to-violet-600',
    simulatorSection: 'dashboard',
  },

  // ── SLIDE 2: DATA ──────────────────────────────────────────────────────────
  {
    id: 2,
    type: 'data',
    title: 'The Business Problem in Numbers',
    subtitle: 'Why ShopEase Cannot Wait Another Month',
    priyaMoment: 'Priya is one of 86,000 customers who abandoned ShopEase this month. She didn\'t complain — she just left. ShopEase doesn\'t even know she was there.',
    stats: [
      { value: '2,00,000', label: 'Monthly Visitors', color: 'brand' },
      { value: '86,000', label: 'Cart Abandonments / Month', color: 'rose' },
      { value: '34%', label: 'COD Return Rate', color: 'amber' },
      { value: '₹64 Cr', label: 'Revenue Lost / Month', color: 'rose' },
    ],
    keyTakeaway: 'A Business Problem Statement converts raw numbers into a clear gap: "ShopEase loses ₹64 Crore/month because it offers only COD while customers expect digital payment."',
    example: {
      label: 'Real World Parallel',
      text: 'In 2016, a major Indian retailer refused to accept UPI for 8 months after demonetisation. They lost 23% market share to competitors who adapted in 3 weeks. Digital payment is not a feature — it is a business survival requirement.',
    },
    speakerNotes: `These numbers tell a story the CEO must act on.

2,00,000 visitors = healthy traffic. The funnel is not broken at awareness. It breaks at checkout.

43% abandonment at checkout: Ask students "If a physical store had 43% of shoppers walk out at the billing counter, what would happen?" The manager would fix it that evening. ShopEase has let this go on for months.

The COD return rate is the hidden cost. 34% of orders placed via COD are returned. Why? No upfront payment commitment. The customer can say "I changed my mind" when the delivery agent arrives — at zero cost to them, at full logistics cost to ShopEase.

Have students calculate: ₹64 Cr/month × 12 = ₹768 Crore annual loss. That is the size of this problem.`,
    duration: 6,
    accentColor: 'from-rose-500 to-amber-500',
    simulatorSection: 'business-problem',
  },

  // ── SLIDE 3: CONCEPT — STAKEHOLDERS ────────────────────────────────────────
  {
    id: 3,
    type: 'concept',
    title: 'Stakeholder Analysis',
    subtitle: 'Who Has a Stake in ShopEase\'s Payment Portal?',
    priyaMoment: 'Priya is one stakeholder. But behind her abandoned cart are 5 other groups — each with different goals. The BA must understand ALL of them before writing a single requirement.',
    bullets: [
      '🛍️  Customer (Priya) — wants fast, familiar digital payment options',
      '🏦  Banks & NBFCs — provide card and EMI credit authorization',
      '⚡  Payment Gateway (Razorpay) — single API connecting ShopEase to all payment methods',
      '💻  Dev Team — needs clear BRD and acceptance criteria to build',
      '📊  Finance Team — wants T+1 settlement, not 3-day manual COD cash',
      '🏢  ShopEase CEO — wants ₹64 Crore recovered within 2 quarters',
    ],
    keyTakeaway: 'Every stakeholder you miss in analysis becomes a change request in development — and a delay in go-live.',
    example: {
      label: 'Why not NPCI or RBI?',
      text: 'ShopEase never directly deals with NPCI or RBI. Razorpay is already RBI-registered and handles all UPI routing, PCI-DSS compliance, and regulatory requirements on ShopEase\'s behalf. The BA\'s stakeholders are only those the project team must engage with directly.',
    },
    speakerNotes: `Stakeholder analysis is where most student BAs make their first mistake — they only think about the end customer.

Walk through each stakeholder and ask: "What is their goal? What is their fear? What can block this project?"

Important teaching point: NPCI and RBI are NOT stakeholders here. Razorpay abstracts them away — it is already RBI-registered and handles all compliance. ShopEase's BA never needs a meeting with RBI or NPCI. This is a real-world nuance students often miss.

Activity: Ask one student to role-play as the Finance team. Ask them: "You currently reconcile COD cash manually after 2-3 days. What do you need from the payment portal?" Let them articulate their own requirement. That is stakeholder analysis in practice.`,
    duration: 6,
    accentColor: 'from-violet-500 to-brand-500',
    simulatorSection: 'stakeholders',
  },

  // ── SLIDE 4: COMPARE — AS-IS vs TO-BE ──────────────────────────────────────
  {
    id: 4,
    type: 'compare',
    title: 'As-Is vs To-Be Process',
    subtitle: 'What ShopEase looks like today — and what the BA will design',
    priyaMoment: 'Today: Priya reaches checkout → sees COD only → leaves. Tomorrow: Priya reaches checkout → picks UPI → pays in 8 seconds → gets instant receipt.',
    compare: [
      { label: 'Payment Options', before: 'Cash on Delivery only', after: '6 methods: UPI, Card, Net Banking, EMI, Wallet, BNPL' },
      { label: 'Checkout Time', before: '3–5 days (cash + delivery)', after: '8 seconds (digital payment)' },
      { label: 'Cart Abandonment', before: '43% at payment screen', after: 'Target: below 20%' },
      { label: 'COD Return Rate', before: '34% — no upfront commitment', after: 'Target: below 10%' },
      { label: 'Settlement', before: 'Manual cash, 3–5 days', after: 'Automated T+1 digital' },
      { label: 'Revenue Loss', before: '₹64 Crore / month', after: 'Target: below ₹15 Crore' },
    ],
    keyTakeaway: 'The BA owns the To-Be design. Every row in this table is a requirement. Every requirement needs a business rule, a user story, and an acceptance criterion.',
    speakerNotes: `This comparison is the clearest way to explain the BA's value. The left column is what exists. The right column is what the BA will design.

Walk row by row. For each row ask: "What does the BA need to document to make this improvement happen?"

Payment Options row: The BA must define all 6 methods, their flows, their failure handling, their regulatory requirements.

Settlement row: This is often the most surprising for students. Manual COD settlement is a 3-5 day process involving delivery agents, supervisors, bank deposits, and finance reconciliation. Digital payment collapses all of this into an automatic T+1 bank transfer. The BA must document the new settlement process as a To-Be requirement.

Point out: the right column is not technology. It is a business outcome. The technology is the means — the BA defines the outcome.`,
    duration: 7,
    accentColor: 'from-emerald-500 to-brand-500',
    simulatorSection: 'as-is-process',
  },

  // ── SLIDE 5: FLOW DIAGRAM ─────────────────────────────────────────────────
  {
    id: 5,
    type: 'flowdiagram' as SlideType,
    title: 'Payment Flow Diagram',
    subtitle: 'How Priya\'s UPI payment travels from her phone to ShopEase\'s bank in 4 seconds',
    priyaMoment: 'Priya taps Pay ₹12,000. In 4 seconds her money passes through 6 systems before ShopEase gets confirmed. The BA must document every hop — because any one of them can fail.',
    keyTakeaway: 'Each arrow is a system integration. Each integration needs a requirement. Each requirement needs an acceptance criterion. One missed arrow = one production incident.',
    speakerNotes: `The payment flow diagram is one of the most valuable artifacts a BA can produce for a payments project.

Walk through each step:

1. Customer App — Priya taps Pay. BA defines: input fields, button state during processing, timeout message.

2. ShopEase Payment Service — creates a payment order, calls the gateway API. BA defines: what data is sent, what happens if this internal service fails before calling the gateway.

3. Payment Gateway (Razorpay/PayU) — routes to NPCI or bank. BA defines: response codes that must be handled, timeout duration, retry strategy.

4. NPCI / Bank — processes UPI or card transaction. BA does not control this — but must document: what if the bank is down? Maximum wait time before auto-cancel.

5. Confirmation Callback — gateway sends success or failure back to ShopEase. BA defines: what does ShopEase do with each code? Create order? Reserve stock? Trigger SMS?

6. Customer Notification — SMS, email, in-app receipt. BA defines: exact content, trigger timing, what happens if notification fails.

Key question: "Which step is most likely to fail in production?" Answer: Step 5 — the callback from gateway to ShopEase. Network issues can cause the callback to be lost — money debited, order not created. The BA must define a reconciliation process for this exact case.`,
    duration: 5,
    accentColor: 'from-emerald-500 to-brand-500',
    simulatorSection: 'payment-simulator',
  },

  // ── SLIDE 6: CONCEPT — BRD ────────────────────────────────────────────────
  {
    id: 6,
    type: 'concept',
    title: 'Business Requirements Document (BRD)',
    subtitle: 'The BA\'s contract with the business and the development team',
    priyaMoment: 'The development team joins tomorrow. They have never met Priya. They don\'t know about the ₹64 Crore loss. The BRD is the only bridge between business understanding and technical execution.',
    bullets: [
      '📌  Business Objective — Recover ₹64 Cr/month by adding 6 payment methods',
      '🔲  Scope — What is IN and what is explicitly OUT of this project',
      '👥  Stakeholders — Roles, responsibilities, approval authority',
      '📋  Business Rules — "UPI must complete within 5 min or auto-expire with retry"',
      '⚠️  Constraints — "PCI-DSS certification required before go-live"',
      '✅  Success Metrics — Cart abandonment <20%, COD returns <10%, Digital share >70%',
      '📝  Assumptions — "Razorpay selected as payment gateway partner"',
    ],
    keyTakeaway: '"UPI should be fast" is NOT a business rule. "UPI payment must complete within 5 minutes or auto-expire with a customer notification and retry option" IS a business rule.',
    example: {
      label: 'What a vague BRD costs',
      text: 'A leading insurance company\'s BA wrote "payment confirmation should be sent to the customer." Developer sent an email. Business expected both SMS and email. The fix took 3 weeks and ₹4 lakh in additional development. One precise sentence in the BRD would have prevented it.',
    },
    speakerNotes: `The BRD is not bureaucracy — it is precision.

Walk through each section. For Business Rules, ask students to try writing a rule for the EMI payment method. Most will write something vague like "EMI should work." Push them to add: who is eligible, how is the plan displayed, what happens if bank declines the EMI request, what is the maximum tenure.

The vague BRD example is powerful. The cost of one missing sentence: 3 weeks + ₹4 lakh. The cost of writing that sentence: 2 minutes. That is the BA's value proposition in one story.

Constraints section: emphasise that PCI-DSS is a constraint, not a nice-to-have. If the BA doesn't document it as a constraint, the project manager won't budget time for it. PCI-DSS audit takes 4-8 weeks. Missing this constraint = project delay.`,
    duration: 7,
    accentColor: 'from-brand-500 to-emerald-500',
    simulatorSection: 'brd',
  },

  // ── SLIDE 8: ARTIFACT — USER STORIES ──────────────────────────────────────
  {
    id: 7,
    type: 'artifact',
    title: 'User Stories',
    subtitle: 'Requirements written in the customer\'s voice',
    priyaMoment: 'Priya\'s need, written as a User Story: "As Priya, a working professional, I want to pay using UPI at checkout, so that I can complete my purchase in under 10 seconds without needing to arrange cash."',
    bullets: [
      'Format: As a [who], I want to [what], so that [why / business value]',
      '"As Priya, I want to pay via UPI → so that I pay in 8 seconds without cash"',
      '"As Priya, I want to pay in EMI → so that I can afford the ₹50,000 laptop today"',
      '"As Priya, I want retry on failure → so that I don\'t lose my cart and start over"',
      '"As the Finance team, I want T+1 settlement report → so that I track GMV daily"',
      'Each story = one sprint deliverable + acceptance criteria',
    ],
    keyTakeaway: 'The "so that" clause is not optional — it is the business justification. Without it, a story is a feature request. With it, it is a business requirement.',
    activity: {
      title: 'Write a BNPL User Story — 2 Minutes',
      task: 'Priya wants to buy a ₹15,000 air purifier but doesn\'t want to pay now. ShopEase is launching BNPL (Buy Now, Pay Later). Write her user story.',
      steps: [
        { step: 'Who is the actor?', time: '30 sec' },
        { step: 'What does she want to DO?', time: '30 sec' },
        { step: 'Why? What is the business value?', time: '1 min' },
      ],
      time: '2 min',
    },
    speakerNotes: `User stories seem simple — they are not. The challenge is in the "so that."

Most students write: "As a user, I want to use BNPL so that I can buy things." That is meaningless.

A good answer: "As Priya, a customer with limited cash flow, I want to use BNPL at checkout so that I can purchase high-value appliances today and pay after my next salary credit, without paying interest."

The difference: the second version tells the developer why this feature is worth building, helps the product manager prioritise it, and gives the QA team the context to test it correctly.

Finance team story is always surprising to students. They forget that internal users have requirements too. The finance story changes the product — it means the payment portal must generate a daily settlement report, not just process payments.`,
    duration: 6,
    accentColor: 'from-violet-500 to-brand-500',
    simulatorSection: 'user-stories',
  },

  // ── SLIDE 8: ARTIFACT — ACCEPTANCE CRITERIA ───────────────────────────────
  {
    id: 8,
    type: 'artifact',
    title: 'Acceptance Criteria',
    subtitle: 'The exact conditions that define "done" — testable, unambiguous',
    priyaMoment: 'Priya enters her UPI ID and clicks Pay. The developer built it. Is it done? Only the Acceptance Criteria can answer that — not the developer\'s opinion.',
    bullets: [
      'Format: GIVEN [context] — WHEN [action] — THEN [result]',
      'Given Priya enters a valid UPI ID and clicks Pay,',
      '→ When the bank approves the request,',
      '→ Then the order is created and success screen appears within 5 seconds',
      'Given her UPI payment fails,',
      '→ When the failure screen appears,',
      '→ Then her cart is preserved, error reason shown, retry button visible within 2 seconds',
    ],
    keyTakeaway: 'If an Acceptance Criterion cannot be answered YES or NO by a tester — it is not specific enough. Rewrite it.',
    example: {
      label: 'Bad AC vs Good AC',
      text: '❌ BAD: "UPI payment should work properly."\n✅ GOOD: "Given Priya submits a valid UPI VPA, when the bank approves, then a success screen with Order ID, amount, and estimated delivery date appears within 5 seconds — and an SMS is sent to her registered number within 30 seconds."',
    },
    speakerNotes: `Acceptance Criteria are the most important artifact a BA produces for the development team.

The bad vs good example always lands powerfully. "Should work properly" — who decides what "properly" means? The developer? The tester? The customer? The BA must decide — before development starts.

Walk through the failure AC: cart preserved + error reason shown + retry button. Ask: "Which of these three requirements is most critical?" Answer: cart preserved — because losing the cart means the customer starts over, which is the highest abandonment risk.

This is where students start to see the depth of BA work. One user story about UPI payment creates 6-8 acceptance criteria covering: happy path, failure path, timeout, duplicate click prevention, OTP expiry, and receipt generation.`,
    duration: 6,
    accentColor: 'from-emerald-500 to-violet-500',
    simulatorSection: 'acceptance-criteria',
  },

  // ── SLIDE 9: CONCEPT — UAT ────────────────────────────────────────────────
  {
    id: 9,
    type: 'concept',
    title: 'User Acceptance Testing (UAT)',
    subtitle: 'The BA\'s final quality gate before production',
    priyaMoment: 'The payment portal is built. Before Priya uses it in production, business users must validate every scenario. UAT is where all of the BA\'s earlier decisions are tested as a system.',
    bullets: [
      'UAT ≠ QA testing. QA tests code. UAT tests business requirements.',
      'Scenario 1: Priya pays ₹12,000 via UPI → order confirmed in 5 sec ✓',
      'Scenario 2: Priya\'s card is declined → cart preserved, clear error, retry offered ✓',
      'Scenario 3: Priya selects 6-month EMI → monthly amount + schedule shown ✓',
      'Scenario 4: Priya pays, app closes mid-transaction → no duplicate charge ✓',
      'Scenario 5: Priya uses BNPL → 30-day payment window confirmed ✓',
      'ONLY when all critical scenarios pass → go-live approved',
    ],
    keyTakeaway: 'If your Acceptance Criteria were precise, UAT scenarios write themselves. If UAT is chaotic, the Acceptance Criteria were vague. The quality of UAT reflects the quality of the BA\'s earlier work.',
    example: {
      label: 'The most dangerous UAT scenario',
      text: 'Priya clicks Pay → bank deducts ₹12,000 → app crashes → order is NOT created. Who is responsible? The BA — who must have defined: "If payment is confirmed by the bank but order creation fails, the system must auto-reverse the payment within 60 seconds and notify the customer." This is called a payment-order mismatch scenario. Every payment BA must document it.',
    },
    speakerNotes: `UAT is where all earlier decisions land — as a system.

The payment-order mismatch scenario is the most powerful teaching moment in this slide. It is a real scenario that causes customer trust collapse and potential RBI inquiries.

Money is deducted. Order doesn't exist. Customer calls support. Support can't find the order. Customer files a chargeback with the bank. Bank penalises ShopEase. All of this because the BA didn't document one edge case.

Ask: "Who identifies this scenario — the developer, the QA team, or the BA?" Answer: the BA, during requirements elicitation. The BA must ask: "What happens if the payment gateway confirms but our internal system fails to create the order?" That answer becomes an acceptance criterion. That AC becomes a UAT scenario.

This is why BA work is not documentation — it is risk management.`,
    duration: 6,
    accentColor: 'from-rose-500 to-violet-500',
    simulatorSection: 'uat',
  },

  // ── SLIDE 10: SUMMARY ─────────────────────────────────────────────────────
  {
    id: 10,
    type: 'summary',
    title: 'The Complete BA Journey',
    subtitle: 'From ₹64 Crore problem to production-ready payment portal',
    priyaMoment: 'Priya returns to ShopEase. She sees 6 payment options. She pays via UPI in 8 seconds. She gets an instant receipt. ShopEase gets a confirmed sale, T+1 settlement, and a loyal customer. The BA made this possible.',
    bullets: [
      '✅ Business Problem — ₹64 Cr/month loss identified and quantified',
      '✅ Stakeholder Map — 8 stakeholders with goals, pain points, authority',
      '✅ As-Is Process — COD flow mapped with 6 documented pain points',
      '✅ To-Be Process — 6-method payment portal, all flows designed',
      '✅ BRD — 8 sections, business rules, constraints, success metrics',
      '✅ User Stories — Priya-centred, "so that" business value captured',
      '✅ Acceptance Criteria — Given/When/Then, every path testable',
      '✅ UAT Scenarios — Happy path + failure path + edge cases covered',
    ],
    keyTakeaway: 'A Business Analyst does not build the solution. A Business Analyst ensures the right solution gets built — for the right people — with measurable outcomes.',
    speakerNotes: `Close with Priya. She started as an abandoned cart statistic. She ends as a confident, loyal customer. The BA created the conditions for that outcome — not by writing code, but by thinking clearly and documenting precisely.

The chain: Business Problem → Stakeholders → Pain Points → Root Cause → To-Be → BRD → User Stories → AC → UAT. Every link depends on the one before. A weak problem statement creates a weak BRD. A vague BRD creates untestable AC. Untestable AC creates a failed UAT. A failed UAT delays go-live. A delayed go-live costs ₹64 Crore another month.

End with this: "Today you experienced the full BA journey in 75 minutes. A junior BA does this over 4-6 weeks on a real project. Now you know what those 4-6 weeks should produce — and why each artifact matters."

Certificate time. Open the Simulator → Summary section to download certificates.`,
    duration: 4,
    accentColor: 'from-brand-500 to-emerald-500',
    simulatorSection: 'summary',
  },
]

// ─── SLIDE ICON MAP ───────────────────────────────────────────────────────────
const SLIDE_ICONS: Record<SlideType, React.ReactNode> = {
  hero: <BarChart2 className="w-4 h-4" />,
  data: <Target className="w-4 h-4" />,
  compare: <ArrowRight className="w-4 h-4" />,
  concept: <Lightbulb className="w-4 h-4" />,
  activity: <Users className="w-4 h-4" />,
  artifact: <FileText className="w-4 h-4" />,
  summary: <Award className="w-4 h-4" />,
  fishbone: <AlertTriangle className="w-4 h-4" />,
  flowdiagram: <Zap className="w-4 h-4" />,
}

const SLIDE_TYPE_LABEL: Record<SlideType, string> = {
  hero: 'Opening',
  data: 'Data',
  compare: 'Before & After',
  concept: 'Concept',
  activity: 'Activity',
  artifact: 'BA Artifact',
  summary: 'Summary',
  fishbone: 'Fishbone Diagram',
  flowdiagram: 'Flow Diagram',
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
interface PresentationModeProps {
  initialSlide?: number
  onOpenSimulator?: (section: SimulatorSection, fromSlide: number) => void
}

export function PresentationMode({ initialSlide = 0, onOpenSimulator }: PresentationModeProps) {
  const [current, setCurrent] = useState(initialSlide)
  const [showNotes, setShowNotes] = useState(false)
  const [timeLeft, setTimeLeft] = useState(75 * 60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [showThumb, setShowThumb] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)

  const slide = SLIDES[current]
  const total = SLIDES.length

  useEffect(() => { slideRef.current?.scrollTo({ top: 0 }) }, [current])

  // Timer
  useEffect(() => {
    if (!timerRunning) return
    const interval = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(interval)
  }, [timerRunning])

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const goNext = useCallback(() => { if (current < total - 1) setCurrent(c => c + 1) }, [current, total])
  const goPrev = useCallback(() => { if (current > 0) setCurrent(c => c - 1) }, [current])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
      if (e.key === 'p' || e.key === 'P') setShowNotes(s => !s)
      if (e.key === 'n' || e.key === 'N') setShowThumb(s => !s)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [goNext, goPrev])

  const accentBg = `bg-gradient-to-br ${slide.accentColor}`
  const timerUrgent = timeLeft < 600

  return (
    <div className="min-h-screen bg-white flex flex-col select-none">

      {/* ── TOP BAR ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-200 bg-white/90 backdrop-blur-sm flex-shrink-0">
        {/* Slide counter + progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400">{current + 1} / {total}</span>
          <div className="w-28 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${slide.accentColor}`}
              animate={{ width: `${((current + 1) / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-xs text-gray-500 hidden sm:block">{SLIDE_TYPE_LABEL[slide.type]}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Timer */}
          <button
            onClick={() => setTimerRunning(t => !t)}
            title={timerRunning ? 'Pause timer' : 'Start timer'}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors',
              timerUrgent ? 'text-rose-700 bg-rose-50 border border-rose-300' : 'text-gray-700 bg-gray-100 hover:bg-gray-200',
            )}
          >
            {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {fmt(timeLeft)}
          </button>
          <button onClick={() => setTimeLeft(75 * 60)} title="Reset timer" className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-5 bg-gray-100" />

          {/* Thumbnails toggle */}
          <button
            onClick={() => setShowThumb(s => !s)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', showThumb ? 'text-brand-700 bg-brand-50' : 'text-gray-700 bg-gray-100 hover:bg-gray-200')}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Slides</span>
            <kbd className="ml-0.5 text-gray-400 text-[10px]">[N]</kbd>
          </button>

          {/* Notes toggle */}
          <button
            onClick={() => setShowNotes(s => !s)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', showNotes ? 'text-violet-700 bg-violet-50' : 'text-gray-700 bg-gray-100 hover:bg-gray-200')}
          >
            {showNotes ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:block">Notes</span>
            <kbd className="ml-0.5 text-gray-400 text-[10px]">[P]</kbd>
          </button>

          <div className="w-px h-5 bg-gray-200" />

          {/* Download session plan */}
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-gray-700 bg-gray-100 hover:bg-brand-50 hover:text-brand-700"
            title="Download session plan"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Export</span>
          </button>
        </div>
      </div>

      {/* Export modal */}
      <AnimatePresence>
        {showExport && <SessionPlanExport onClose={() => setShowExport(false)} />}
      </AnimatePresence>

      {/* ── SLIDE THUMBNAILS STRIP ───────────────────────────────────────────── */}
      <AnimatePresence>
        {showThumb && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-gray-200 bg-white overflow-hidden flex-shrink-0"
          >
            <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setCurrent(i); setShowThumb(false) }}
                  className={cn(
                    'flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl border transition-all text-left',
                    i === current
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-gray-300 bg-gray-100/50 text-gray-400 hover:border-gray-500 hover:text-gray-800',
                  )}
                >
                  <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center text-gray-900 bg-gradient-to-br', s.accentColor)}>
                    {SLIDE_ICONS[s.type]}
                  </div>
                  <span className="text-[10px] font-medium max-w-[64px] text-center leading-tight">{s.title.split(':')[0].split('—')[0].trim()}</span>
                  <span className="text-[9px] text-gray-400">{i + 1}/{total}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN AREA ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Slide canvas */}
        <div className={cn('flex-1 flex flex-col overflow-hidden', showNotes ? 'w-[62%]' : 'w-full')}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              ref={slideRef}
              className="flex-1 overflow-y-auto"
            >
              <SlideCanvas slide={slide} accentBg={accentBg} />
            </motion.div>
          </AnimatePresence>

          {/* Nav bar */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50/80 flex-shrink-0">
            <button onClick={goPrev} disabled={current === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed transition-all text-sm font-medium">
              <ChevronLeft className="w-4 h-4" /> Prev <kbd className="text-gray-400 text-xs ml-1">[←]</kbd>
            </button>

            {/* Open Simulator button — centre, only when slide has a mapped section */}
            {slide.simulatorSection && onOpenSimulator ? (
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => onOpenSimulator(slide.simulatorSection!, current)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-300 text-brand-700 text-xs font-bold transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                Open in Simulator
              </motion.button>
            ) : (
              <div />
            )}

            <button onClick={goNext} disabled={current === total - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed transition-all text-sm font-medium">
              Next <kbd className="text-gray-400 text-xs ml-1">[→]</kbd> <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Speaker Notes Panel */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '38%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-l border-gray-200 bg-gray-50 overflow-hidden flex-shrink-0 flex flex-col"
            >
              <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-2 flex-shrink-0">
                <BookOpen className="w-4 h-4 text-violet-700" />
                <span className="text-sm font-semibold text-gray-900">Speaker Notes</span>
                <span className="ml-auto text-xs text-gray-500">Slide {current + 1} · {slide.duration} min</span>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <AnimatePresence mode="wait">
                  <motion.div key={current} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{slide.speakerNotes}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── SLIDE CANVAS ─────────────────────────────────────────────────────────────
function SlideCanvas({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  if (slide.type === 'hero') return <HeroSlide slide={slide} accentBg={accentBg} />
  if (slide.type === 'data') return <DataSlide slide={slide} accentBg={accentBg} />
  if (slide.type === 'compare') return <CompareSlide slide={slide} accentBg={accentBg} />
  if (slide.type === 'activity') return <ActivitySlide slide={slide} accentBg={accentBg} />
  if (slide.type === 'summary') return <SummarySlide slide={slide} accentBg={accentBg} />
  if (slide.type === 'fishbone') return <FishboneSlide slide={slide} accentBg={accentBg} />
  if (slide.type === 'flowdiagram') return <FlowDiagramSlide slide={slide} accentBg={accentBg} />
  return <ConceptSlide slide={slide} accentBg={accentBg} />
}

// ─── HERO SLIDE ───────────────────────────────────────────────────────────────
function HeroSlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-10 text-center relative">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-gray-900 ${accentBg} mb-8 shadow-glow`}>
        <BarChart2 className="w-4 h-4" /> BA Workshop — ShopEase Case Study
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-4">
        {slide.title}
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-xl text-gray-600 mb-12 max-w-2xl">
        {slide.subtitle}
      </motion.p>

      {/* Priya story */}
      {slide.priyaMoment && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="max-w-2xl bg-amber-50 border border-amber-300 rounded-2xl p-6 mb-8 text-left">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">📖 Real Customer Story</p>
          <p className="text-amber-900 text-lg leading-relaxed italic">"{slide.priyaMoment}"</p>
        </motion.div>
      )}

      {/* Mission bullets */}
      {slide.bullets && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
          {slide.bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-left">
              <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-br ${slide.accentColor}`} />
              <p className="text-gray-700 text-sm leading-relaxed">{b}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Key takeaway */}
      {slide.keyTakeaway && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-8 max-w-2xl w-full">
          <Callout text={slide.keyTakeaway} color={slide.accentColor} />
        </motion.div>
      )}
    </div>
  )
}

// ─── DATA SLIDE ───────────────────────────────────────────────────────────────
function DataSlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  const statColors: Record<string, string> = {
    brand: 'text-brand-700 border-brand-300 bg-brand-50',
    rose: 'text-rose-700 border-rose-300 bg-rose-50',
    amber: 'text-amber-700 border-amber-300 bg-amber-50',
    emerald: 'text-emerald-700 border-emerald-300 bg-emerald-50',
  }
  return (
    <div className="min-h-full flex flex-col p-8 lg:p-12">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />
      <SlideHeader slide={slide} accentBg={accentBg} />

      {/* Stats grid */}
      {slide.stats && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {slide.stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 + i * 0.08 }}
              className={`rounded-2xl border p-5 text-center ${statColors[s.color] || statColors.brand}`}>
              <p className="text-3xl lg:text-4xl font-black mb-1">{s.value}</p>
              <p className="text-xs text-gray-600 leading-tight">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Priya moment */}
      {slide.priyaMoment && <PriyaBox text={slide.priyaMoment} />}

      {/* Example */}
      {slide.example && <ExampleBox label={slide.example.label} text={slide.example.text} />}

      {/* Takeaway */}
      {slide.keyTakeaway && <Callout text={slide.keyTakeaway} color={slide.accentColor} />}
    </div>
  )
}

// ─── COMPARE SLIDE ────────────────────────────────────────────────────────────
function CompareSlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  return (
    <div className="min-h-full flex flex-col p-8 lg:p-10">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />
      <SlideHeader slide={slide} accentBg={accentBg} />

      {slide.priyaMoment && <PriyaBox text={slide.priyaMoment} />}

      {slide.compare && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6">
          <div className="grid grid-cols-3 bg-gray-100">
            <div className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Metric</div>
            <div className="px-5 py-3 text-xs font-bold text-rose-700 uppercase tracking-wider border-l border-gray-300">❌ As-Is (Today)</div>
            <div className="px-5 py-3 text-xs font-bold text-emerald-700 uppercase tracking-wider border-l border-gray-300">✅ To-Be (After BA)</div>
          </div>
          {slide.compare.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.07 }}
              className="grid grid-cols-3 border-t border-gray-200">
              <div className="px-5 py-3.5 text-sm font-semibold text-gray-900">{row.label}</div>
              <div className="px-5 py-3.5 text-sm text-rose-700 border-l border-gray-200">{row.before}</div>
              <div className="px-5 py-3.5 text-sm text-emerald-700 border-l border-gray-200 font-medium">{row.after}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {slide.keyTakeaway && <Callout text={slide.keyTakeaway} color={slide.accentColor} />}
    </div>
  )
}

// ─── CONCEPT / ARTIFACT SLIDE ─────────────────────────────────────────────────
function ConceptSlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  return (
    <div className="min-h-full flex flex-col p-8 lg:p-10">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />
      <SlideHeader slide={slide} accentBg={accentBg} />

      {slide.priyaMoment && <PriyaBox text={slide.priyaMoment} />}

      {slide.bullets && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="space-y-2 mb-6">
          {slide.bullets.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.07 }}
              className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
              <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 bg-gradient-to-br ${slide.accentColor}`} />
              <p className="text-gray-800 text-base leading-relaxed">{b}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Inline activity for artifact slides */}
      {slide.activity && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">✏️ Class Activity · {slide.activity.time}</p>
          <p className="text-amber-900 text-sm mb-3 font-medium">{slide.activity.task}</p>
          <div className="flex flex-wrap gap-2">
            {slide.activity.steps.map((s, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs">{s.step}</span>
            ))}
          </div>
        </motion.div>
      )}

      {slide.example && <ExampleBox label={slide.example.label} text={slide.example.text} />}
      {slide.keyTakeaway && <Callout text={slide.keyTakeaway} color={slide.accentColor} />}
    </div>
  )
}

// ─── ACTIVITY SLIDE ───────────────────────────────────────────────────────────
function ActivitySlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  return (
    <div className="min-h-full flex flex-col p-8 lg:p-10">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />
      <SlideHeader slide={slide} accentBg={accentBg} />

      {slide.priyaMoment && <PriyaBox text={slide.priyaMoment} />}

      {slide.activity && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="font-bold text-amber-800 text-lg">{slide.activity.title}</p>
              <p className="text-amber-700 text-xs">⏱ {slide.activity.time} — Groups of 3</p>
            </div>
          </div>
          <p className="text-amber-900 text-base leading-relaxed mb-5 font-medium">{slide.activity.task}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {slide.activity.steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.1 }}
                className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <div>
                  <p className="text-amber-900 text-sm font-medium">{s.step}</p>
                  <p className="text-amber-700 text-xs">{s.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {slide.keyTakeaway && <Callout text={slide.keyTakeaway} color={slide.accentColor} />}
    </div>
  )
}

// ─── SUMMARY SLIDE — BA TOOLKIT DATA ────────────────────────────────────────
const PRES_BA_TOOLS = [
  { name: 'Jira',         category: 'Story Tracking',   url: 'https://www.atlassian.com/software/jira',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#0052CC"/><path d="M20 7 L27 29" stroke="#DEEBFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M20 7 L13 29" stroke="#4C9AFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M13 18 L27 18" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
  { name: 'Confluence',   category: 'BRD / Docs',       url: 'https://www.atlassian.com/software/confluence',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#0065FF"/><path d="M8 26 Q12 18 20 20 Q28 22 32 14" stroke="#4C9AFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M8 20 Q12 12 20 14 Q28 16 32 8" stroke="#DEEBFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg> },
  { name: 'Figma',        category: 'Wireframing',       url: 'https://www.figma.com',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#1E1E1E"/><rect x="14" y="7" width="8" height="8" rx="4" fill="#F24E1E"/><rect x="22" y="7" width="8" height="8" rx="4" fill="#FF7262"/><rect x="14" y="15" width="8" height="8" rx="4" fill="#A259FF"/><circle cx="26" cy="19" r="4" fill="#1ABCFE"/><rect x="14" y="23" width="8" height="8" rx="4" fill="#0ACF83"/></svg> },
  { name: 'Lucidchart',   category: 'Process Diagrams',  url: 'https://www.lucidchart.com',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#F75D00"/><rect x="10" y="9" width="4" height="16" rx="2" fill="white"/><rect x="10" y="22" width="14" height="4" rx="2" fill="white"/><rect x="22" y="14" width="4" height="12" rx="2" fill="white" opacity="0.7"/><rect x="28" y="9" width="4" height="17" rx="2" fill="white" opacity="0.5"/></svg> },
  { name: 'Miro',         category: 'Brainstorming',     url: 'https://miro.com',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#FFD02F"/><path d="M9 28 L9 12 L15 22 L20 15 L25 22 L31 12 L31 28" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: 'Excel',        category: 'Data Analysis',     url: 'https://www.microsoft.com/en-in/microsoft-365/excel',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#217346"/><text x="20" y="26" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" fontFamily="Arial">X</text></svg> },
  { name: 'Power BI',     category: 'Reporting',         url: 'https://powerbi.microsoft.com',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#F2C811"/><rect x="9" y="22" width="6" height="8" rx="1.5" fill="#1a1a1a"/><rect x="17" y="15" width="6" height="15" rx="1.5" fill="#1a1a1a" opacity="0.8"/><rect x="25" y="10" width="6" height="20" rx="1.5" fill="#1a1a1a" opacity="0.7"/></svg> },
  { name: 'Postman',      category: 'API Testing',       url: 'https://www.postman.com',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#FF6C37"/><circle cx="20" cy="18" r="9" fill="none" stroke="white" strokeWidth="2.5"/><circle cx="20" cy="18" r="4" fill="white" opacity="0.4"/></svg> },
  { name: 'Slack',        category: 'Communication',     url: 'https://slack.com',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#4A154B"/><line x1="14" y1="11" x2="12" y2="25" stroke="#E01E5A" strokeWidth="3" strokeLinecap="round"/><line x1="20" y1="11" x2="18" y2="25" stroke="#36C5F0" strokeWidth="3" strokeLinecap="round"/><line x1="10" y1="16" x2="24" y2="16" stroke="#2EB67D" strokeWidth="3" strokeLinecap="round"/><line x1="9" y1="21" x2="23" y2="21" stroke="#ECB22E" strokeWidth="3" strokeLinecap="round"/></svg> },
  { name: 'Notion',       category: 'Documentation',     url: 'https://www.notion.so',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#191919"/><path d="M11 28 L11 12 L23 25 L23 12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: 'Azure DevOps', category: 'ALM / Agile',       url: 'https://azure.microsoft.com/en-in/products/devops',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#0078D4"/><path d="M8 20 Q10 10 20 14 Q30 18 32 10" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M32 20 Q30 30 20 26 Q10 22 8 30" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/></svg> },
  { name: 'draw.io',      category: 'Flow Diagrams',     url: 'https://www.drawio.com',
    logo: <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#F08705"/><rect x="6" y="10" width="12" height="8" rx="2" fill="white" opacity="0.9"/><rect x="22" y="10" width="12" height="8" rx="2" fill="white" opacity="0.9"/><rect x="14" y="24" width="12" height="8" rx="2" fill="white" opacity="0.9"/><line x1="12" y1="18" x2="20" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="28" y1="18" x2="20" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg> },
]

// ─── SUMMARY SLIDE ────────────────────────────────────────────────────────────
function SummarySlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  return (
    <div className="min-h-full flex flex-col p-8 lg:p-10">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />
      <SlideHeader slide={slide} accentBg={accentBg} />

      {slide.priyaMoment && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 mb-6">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">🎉 Mission Accomplished</p>
          <p className="text-emerald-900 text-base leading-relaxed italic">"{slide.priyaMoment}"</p>
        </motion.div>
      )}

      {slide.bullets && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6">
          {slide.bullets.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 + i * 0.06 }}
              className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
              <p className="text-gray-800 text-sm leading-relaxed">{b}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── BA Toolkit ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="mb-6">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🛠️ Tools Real BAs Use</p>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {PRES_BA_TOOLS.map((tool) => (
            <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 p-2 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all bg-white">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                {tool.logo}
              </div>
              <p className="text-[9px] font-semibold text-gray-600 text-center leading-tight group-hover:text-gray-900 transition-colors">{tool.name}</p>
              <p className="text-[8px] text-gray-400 text-center leading-tight">{tool.category}</p>
            </a>
          ))}
        </div>
      </motion.div>

      {slide.keyTakeaway && <Callout text={slide.keyTakeaway} color={slide.accentColor} />}
    </div>
  )
}

// ─── FISHBONE SLIDE ───────────────────────────────────────────────────────────
const FISHBONE_CATS = [
  {
    label: 'People', color: '#8b5cf6', isTop: true, jx: 185,
    causes: ['No BA assigned', 'Leadership unaware', 'No payments team'],
  },
  {
    label: 'Process', color: '#ef4444', isTop: false, jx: 300,
    causes: ['No vendor evaluation', 'Manual COD settlement', 'No RFP process'],
  },
  {
    label: 'Technology', color: '#0d8fe6', isTop: true, jx: 430,
    causes: ['No payment gateway', 'No PCI-DSS infra', 'COD-only platform'],
  },
  {
    label: 'Policy', color: '#f59e0b', isTop: false, jx: 555,
    causes: ['No RBI compliance', 'No refund policy', 'No MDR negotiated'],
  },
  {
    label: 'Market', color: '#10b981', isTop: true, jx: 670,
    causes: ['Competitors: 15+ methods', 'UPI: 80% penetration', 'High-value avoid COD'],
  },
]

function FishboneSlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  const SY = 220   // spine y
  const BONE_H = 90 // vertical reach of each main bone

  return (
    <div className="min-h-full flex flex-col p-6 lg:p-8">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />
      <SlideHeader slide={slide} accentBg={accentBg} />

      {slide.priyaMoment && <PriyaBox text={slide.priyaMoment} />}

      {/* SVG Fishbone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-200 rounded-2xl p-4 mb-5 overflow-x-auto"
      >
        <svg viewBox="0 0 860 380" className="w-full" style={{ minWidth: 600 }}>
          {/* ── SPINE ── */}
          <line x1="80" y1={SY} x2="780" y2={SY} stroke="#94a3b8" strokeWidth="3" />
          {/* Arrow head */}
          <polygon points="780,213 800,220 780,227" fill="#94a3b8" />

          {/* ── PROBLEM BOX ── */}
          <rect x="800" y={SY - 52} width="55" height="104" rx="8" fill="#e2e8f0" stroke="#ef4444" strokeWidth="2" />
          <text x="827" y={SY - 14} textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">ShopEase</text>
          <text x="827" y={SY - 2} textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">losing</text>
          <text x="827" y={SY + 10} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">₹64 Cr</text>
          <text x="827" y={SY + 22} textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">/month</text>
          <text x="827" y={SY + 36} textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">No Digital</text>
          <text x="827" y={SY + 48} textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">Payment</text>

          {/* ── BONES ── */}
          {FISHBONE_CATS.map((cat, ci) => {
            const boneEndY = cat.isTop ? SY - BONE_H : SY + BONE_H
            const labelY = cat.isTop ? boneEndY - 28 : boneEndY + 14
            const dx = cat.isTop ? -35 : -35

            return (
              <motion.g
                key={cat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + ci * 0.12 }}
              >
                {/* Main bone */}
                <line
                  x1={cat.jx} y1={SY}
                  x2={cat.jx + dx} y2={boneEndY}
                  stroke={cat.color} strokeWidth="2.5"
                />

                {/* Category label box */}
                <rect
                  x={cat.jx + dx - 44} y={cat.isTop ? boneEndY - 52 : boneEndY + 2}
                  width="88" height="44" rx="6"
                  fill={`${cat.color}22`} stroke={cat.color} strokeWidth="1.5"
                />
                <text
                  x={cat.jx + dx - 0} y={cat.isTop ? boneEndY - 32 : boneEndY + 24}
                  textAnchor="middle" fill={cat.color} fontSize="11" fontWeight="bold"
                >{cat.label}</text>

                {/* Sub-causes */}
                {cat.causes.map((cause, i) => {
                  // interpolate along the main bone for sub-junction
                  const t = (i + 1) / (cat.causes.length + 1)
                  const subJx = cat.jx + (cat.jx + dx - cat.jx) * t
                  const subJy = SY + (boneEndY - SY) * t
                  const subEndX = subJx + (cat.isTop ? -50 : -50)
                  const subEndY = subJy + (cat.isTop ? -28 : 28)

                  return (
                    <g key={i}>
                      <line
                        x1={subJx} y1={subJy}
                        x2={subEndX} y2={subEndY}
                        stroke={cat.color} strokeWidth="1.2" strokeOpacity="0.6"
                      />
                      <text
                        x={subEndX - 2} y={cat.isTop ? subEndY - 4 : subEndY + 10}
                        textAnchor="end" fill="#1e293b" fontSize="8.5"
                      >{cause}</text>
                    </g>
                  )
                })}
              </motion.g>
            )
          })}

          {/* BA label on spine */}
          <text x="130" y={SY - 10} fill="#6b7280" fontSize="9">← Start Root Cause Investigation</text>
        </svg>
      </motion.div>

      {slide.keyTakeaway && <Callout text={slide.keyTakeaway} color={slide.accentColor} />}
    </div>
  )
}

// ─── FLOW DIAGRAM SLIDE ───────────────────────────────────────────────────────
// phase model: 0=idle, odd=step active, even=connector traveling, 12=done
// phase 1=s0, 2=c0, 3=s1, 4=c1, 5=s2, 6=c2, 7=s3, 8=c3, 9=s4, 10=c4, 11=s5, 12=done
// ── Brand logos ──────────────────────────────────────────────────────────────

// Priya's phone — UPI / Google Pay style
const LogoCustomer = (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#4f46e5"/>
    {/* Phone outline */}
    <rect x="15" y="8" width="18" height="28" rx="3" stroke="white" strokeWidth="2" fill="none"/>
    <rect x="20" y="32" width="8" height="2" rx="1" fill="white"/>
    {/* UPI color stripes */}
    <rect x="19" y="16" width="3" height="9" rx="1" fill="#F97316"/>
    <rect x="23" y="16" width="3" height="9" rx="1" fill="white"/>
    <rect x="27" y="16" width="3" height="9" rx="1" fill="#22C55E"/>
    {/* UPI text */}
    <text x="24" y="44" textAnchor="middle" fill="white" fontSize="5" fontWeight="800" fontFamily="Arial">UPI Pay</text>
  </svg>
)

// ShopEase — Flipkart exact theme (blue + yellow bag)
const LogoShopEase = (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#2874F0"/>
    {/* Shopping bag */}
    <path d="M16 20h16l-2 14H18L16 20z" fill="#FFE11A"/>
    <path d="M20 20c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#FFE11A" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Handle dot */}
    <circle cx="24" cy="27" r="1.5" fill="#2874F0"/>
    {/* Brand text */}
    <text x="24" y="44" textAnchor="middle" fill="#FFE11A" fontSize="5.5" fontWeight="900" fontFamily="Arial, sans-serif">ShopEase</text>
  </svg>
)

// Razorpay — dark navy + electric bolt
const LogoRazorpay = (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#071437"/>
    {/* Razorpay bolt — their signature shape */}
    <polygon points="27,8 17,26 23,26 20,40 31,21 25,21" fill="#3395FF"/>
    <text x="24" y="46" textAnchor="middle" fill="#3395FF" fontSize="5" fontWeight="700" fontFamily="Arial">razorpay</text>
  </svg>
)

// NPCI — their blue/green official palette
const LogoNPCI = (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1"/>
    {/* Wheel / arc motif inspired by NPCI logo */}
    <circle cx="24" cy="20" r="10" stroke="#003087" strokeWidth="2" fill="none"/>
    <circle cx="24" cy="20" r="6"  stroke="#009B77" strokeWidth="1.5" fill="none"/>
    <circle cx="24" cy="20" r="2.5" fill="#003087"/>
    {/* Spokes */}
    <line x1="24" y1="10" x2="24" y2="14" stroke="#003087" strokeWidth="1.5"/>
    <line x1="24" y1="26" x2="24" y2="30" stroke="#003087" strokeWidth="1.5"/>
    <line x1="14" y1="20" x2="18" y2="20" stroke="#003087" strokeWidth="1.5"/>
    <line x1="30" y1="20" x2="34" y2="20" stroke="#003087" strokeWidth="1.5"/>
    <text x="24" y="38" textAnchor="middle" fill="#003087" fontSize="6.5" fontWeight="900" fontFamily="Arial">NPCI</text>
    <text x="24" y="45" textAnchor="middle" fill="#009B77" fontSize="4" fontFamily="Arial">UPI Network</text>
  </svg>
)

// HDFC Bank — maroon/red + dark blue (their official palette)
const LogoHDFC = (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#004B8D"/>
    {/* Red stripe — HDFC signature */}
    <rect x="0" y="34" width="48" height="8" rx="0" fill="#C81818"/>
    <rect x="0" y="40" width="48" height="8" rx="0" fill="#C81818"/>
    {/* HDFC text */}
    <text x="24" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="1">HDFC</text>
    <text x="24" y="34" textAnchor="middle" fill="#9FC9F7" fontSize="4.5" fontFamily="Arial">Bank</text>
    <text x="24" y="45" textAnchor="middle" fill="white" fontSize="4" fontFamily="Arial">Auth &amp; Debit</text>
  </svg>
)

// Callback — gateway returning to ShopEase
const LogoCallback = (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#dc2626"/>
    {/* Return arrow */}
    <path d="M32 16 C32 12 20 12 14 18 L14 14" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M14 18 L10 14 M14 18 L18 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Webhook / callback symbol */}
    <rect x="12" y="24" width="24" height="14" rx="3" fill="none" stroke="white" strokeWidth="1.8"/>
    <text x="24" y="34" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="monospace">200 OK</text>
    <text x="24" y="45" textAnchor="middle" fill="white" fontSize="4" fontFamily="Arial">Webhook Callback</text>
  </svg>
)

// Notification — SMS + app receipt
const LogoNotification = (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#059669"/>
    {/* Checkmark */}
    <circle cx="24" cy="20" r="9" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M18 20 L22 24 L30 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* SMS lines */}
    <rect x="11" y="33" width="26" height="2" rx="1" fill="white" opacity="0.7"/>
    <rect x="14" y="37" width="20" height="2" rx="1" fill="white" opacity="0.5"/>
    <text x="24" y="46" textAnchor="middle" fill="white" fontSize="4" fontFamily="Arial">SMS + Receipt</text>
  </svg>
)

const SIM_STEPS = [
  { logo: LogoCustomer,     label: 'Customer App',       sub: 'Priya taps Pay', color: '#4f46e5',
    reqs: 'UPI ID validation\nButton state UI\nTimeout message' },
  { logo: LogoShopEase,     label: 'ShopEase\nService',  sub: 'Creates order',  color: '#2874F0',
    reqs: 'Order ID creation\nGateway API call\nDuplicate check' },
  { logo: LogoRazorpay,     label: 'Payment\nGateway',   sub: 'Razorpay',       color: '#3395FF',
    reqs: 'Method routing\nTimeout: 30 sec\nResponse codes' },
  { logo: LogoNPCI,         label: 'NPCI / HDFC',        sub: 'Auth & debit',   color: '#003087',
    reqs: 'PIN verification\nInsufficient funds\nBank downtime' },
  { logo: LogoCallback,     label: 'Callback',           sub: 'Gateway→ShopEase', color: '#dc2626',
    reqs: 'Success/Fail code\nOrder confirmation\nStock reservation', critical: true },
  { logo: LogoNotification, label: 'Notification',        sub: 'SMS + Receipt',  color: '#059669',
    reqs: 'SMS template\nReceipt PDF\nRetry if fails' },
]

// ms to stay on each phase before auto-advancing
const PHASE_MS =      [0, 700, 380, 550, 320, 900, 480, 1400, 650, 900, 400, 1000, 0]
const PHASE_MS_FAIL = [0, 700, 380, 550, 320, 900, 480, 1400, 650, 2800, 400, 1000, 0]

const SIM_MSGS = [
  'Validating UPI ID: priya@hdfc · Amount: ₹12,000 · Merchant: ShopEase',
  'Order #SHE-29471 created · Calling Razorpay API...',
  'Transaction TXN-892341 routed to NPCI UPI network...',
  'HDFC Bank: UPI PIN verified ✓ · Debiting ₹12,000 from Priya\'s account...',
  'SUCCESS callback received · ShopEase confirms order · Stock reserved',
  '📩 SMS: "Your order #SHE-29471 is confirmed! Delivery in 3 days."',
]
const FAIL_MSG = '⚠️ TIMEOUT — Callback not received · Reconciliation triggered · Checking TXN-892341...'

function FlowDiagramSlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  const [phase, setPhase] = useState(0)
  const [failed, setFailed] = useState(false)
  // Connector animation auto-plays (fast), then waits for instructor tap
  const CONN_MS = 520  // comet travel duration ms

  // When on an even (connector) phase, auto-advance after CONN_MS then wait on the step
  useEffect(() => {
    if (phase === 0 || phase % 2 === 1 || phase >= 12) return
    const t = setTimeout(() => setPhase(p => p + 1), CONN_MS)
    return () => clearTimeout(t)
  }, [phase])

  const start = (withFail = false) => { setFailed(withFail); setPhase(1) }
  const reset = () => setPhase(0)

  // Instructor taps this to advance: triggers connector animation then pauses at next step
  const nextStep = () => {
    if (phase >= 12 || phase % 2 === 0) return   // ignore tap during connector travel
    setPhase(p => p + 1)
  }

  const isIdle    = phase === 0
  const isDone    = phase >= 12
  const isTraveling = phase > 0 && phase % 2 === 0  // connector animating

  // helpers
  const stepActive  = (i: number) => phase === 2 * i + 1
  const stepDone    = (i: number) => phase > 2 * i + 1
  const connActive  = (i: number) => phase === 2 * i + 2
  const connDone    = (i: number) => phase > 2 * i + 2

  // current status msg — shown while paused on a step (odd phase)
  const currentStepIdx = phase > 0 ? Math.floor((phase - 1) / 2) : -1
  const isStepPhase    = phase > 0 && phase % 2 === 1
  const statusMsg = isStepPhase
    ? (failed && currentStepIdx === 4 ? FAIL_MSG : SIM_MSGS[currentStepIdx] ?? '')
    : ''

  const currentStepName = isStepPhase ? SIM_STEPS[currentStepIdx]?.label.replace('\n', ' ') : ''
  const stepsCompleted  = Math.max(0, Math.floor((phase - 1) / 2))

  return (
    <div className="min-h-full flex flex-col p-6 lg:p-8 relative">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />
      <SlideHeader slide={slide} accentBg={accentBg} />

      {slide.priyaMoment && <PriyaBox text={slide.priyaMoment} />}

      {/* ── Control bar ── */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        {isIdle ? (
          <>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => start(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-gray-900 text-sm font-bold shadow-lg">
              <Play className="w-4 h-4" /> Start (tap to advance)
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => start(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 text-sm font-bold">
              ⚡ Failure Scenario
            </motion.button>
          </>
        ) : (
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Main tap button */}
            {!isDone && (
              <motion.button
                whileHover={{ scale: isTraveling ? 1 : 1.04 }}
                whileTap={{ scale: isTraveling ? 1 : 0.95 }}
                onClick={nextStep}
                disabled={isTraveling}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${
                  isTraveling
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : failed && currentStepIdx === 4
                    ? 'bg-rose-600 hover:bg-rose-500 text-gray-900'
                    : 'bg-brand-600 hover:bg-brand-500 text-gray-900'
                }`}
              >
                {isTraveling ? (
                  <>
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>→</motion.span>
                    Sending...
                  </>
                ) : isDone ? null : (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    {currentStepIdx < SIM_STEPS.length - 1 ? `Next: ${SIM_STEPS[currentStepIdx + 1]?.label.replace('\n', ' ')}` : 'Complete'}
                  </>
                )}
              </motion.button>
            )}

            {/* Step counter */}
            {!isDone && (
              <span className="text-xs text-gray-600 font-mono">
                Step {Math.min(currentStepIdx + 1, 6)} / 6 — <span className="text-gray-700">{currentStepName}</span>
              </span>
            )}

            {/* Reset always visible */}
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold ml-auto">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </motion.button>
          </div>
        )}
      </div>

      {/* ── Flow diagram ── */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-4">

        {/* Steps + connectors row */}
        <div className="flex items-start justify-between overflow-x-auto pb-1 gap-0">
          {SIM_STEPS.map((step, i) => {
            const active   = stepActive(i)
            const done     = stepDone(i)
            const isFail   = failed && i === 4
            const dotColor = isFail && (active || done) ? '#ef4444' : step.color

            return (
              <div key={i} className="flex items-start flex-shrink-0">

                {/* ── Step box ── */}
                <motion.div
                  animate={{ scale: active ? [1, 1.07, 1.04] : 1, opacity: isIdle ? 0.4 : done || active ? 1 : 0.3 }}
                  transition={{ scale: { duration: 0.35 } }}
                  className="flex flex-col items-center w-[96px]"
                >
                  {/* Icon circle with glow */}
                  <motion.div
                    animate={{
                      boxShadow: active
                        ? [`0 0 0px ${dotColor}00`, `0 0 22px ${dotColor}90`, `0 0 14px ${dotColor}60`]
                        : '0 0 0px transparent',
                    }}
                    transition={{ duration: 0.55, repeat: active ? Infinity : 0, repeatType: 'reverse' }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 border-2 transition-all duration-300 overflow-hidden"
                    style={{
                      backgroundColor: (active || done) ? `${dotColor}15` : '#f8fafc',
                      borderColor: done ? '#10b981' : active ? dotColor : '#e2e8f0',
                      padding: isFail && active ? '0' : done && i < 5 ? '0' : '3px',
                    }}
                  >
                    {isFail && active
                      ? <span className="text-2xl">❌</span>
                      : done && i < 5
                        ? <span className="text-2xl">✅</span>
                        : step.logo}
                  </motion.div>

                  {/* Name */}
                  <p className="text-[10px] font-bold text-center whitespace-pre-line leading-tight mb-0.5 transition-colors duration-300"
                    style={{ color: active ? dotColor : done ? '#10b981' : '#64748b' }}>
                    {step.label}
                  </p>
                  <p className="text-[8px] text-gray-500 text-center leading-tight">{step.sub}</p>

                  {/* BA requirement hints — light up when step is active */}
                  <div className="mt-2 w-full rounded-lg border px-2 py-1.5 transition-all duration-300"
                    style={{
                      borderColor: active ? `${dotColor}50` : '#e2e8f0',
                      backgroundColor: active ? `${dotColor}12` : '#f8fafc',
                    }}>
                    <p className="text-[7.5px] leading-relaxed whitespace-pre-line transition-colors duration-300"
                      style={{ color: active ? '#1e293b' : '#94a3b8' }}>
                      {step.reqs}
                    </p>
                    {step.critical && (
                      <span className="inline-block mt-1 px-1 py-0.5 bg-rose-100 border border-rose-300 rounded text-[7px] text-rose-700 font-bold">
                        ⚠️ FAILURE POINT
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* ── Connector + traveling dot ── */}
                {i < SIM_STEPS.length - 1 && (
                  <div className="relative flex flex-col items-center mt-7 mx-0.5 flex-shrink-0" style={{ width: 28 }}>
                    {/* Static line */}
                    <div className="w-full h-0.5 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: connDone(i) ? '#10b981' : '#e2e8f0' }} />

                    {/* Traveling comet dot */}
                    <AnimatePresence>
                      {connActive(i) && (
                        <motion.div
                          key={`c${i}-${phase}`}
                          className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                          style={{
                            width: 22, height: 7,
                            background: `linear-gradient(90deg, transparent, ${SIM_STEPS[i + 1].color}70, white)`,
                            filter: 'blur(0.5px)',
                          }}
                          initial={{ x: -22 }}
                          animate={{ x: 30 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: CONN_MS / 1000 * 0.9, ease: 'linear' }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${Math.min((stepsCompleted / 6) * 100, 100)}%` }}
            className={`h-full rounded-full transition-colors duration-300 ${failed && phase >= 9 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-500 to-brand-500'}`}
          />
        </div>

        {/* Live status message */}
        <AnimatePresence mode="wait">
          {statusMsg && (
            <motion.div
              key={statusMsg}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className={`mt-3 rounded-xl px-4 py-2.5 text-sm font-mono border ${
                failed && phase >= 9 && phase < 11
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-gray-100/90 border-gray-300/40 text-emerald-700'
              }`}
            >
              <span className="text-gray-400 mr-2 text-xs select-none">›</span>
              {statusMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Result card (shown when done) ── */}
      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-xl px-5 py-3.5 mb-4 flex items-start gap-3 border ${
              failed ? 'bg-rose-50 border-rose-300' : 'bg-emerald-50 border-emerald-300'
            }`}
          >
            <span className="text-xl flex-shrink-0">{failed ? '⚡' : '🎉'}</span>
            <div>
              {failed ? (
                <>
                  <p className="text-xs font-bold text-rose-700 mb-1">BA Critical Requirement — Payment-Order Mismatch</p>
                  <p className="text-rose-800 text-sm">Priya's bank debited ₹12,000 but ShopEase has no order. The BA must define: auto-reconciliation within 60s → if unresolved, trigger auto-refund → send Priya a reference ID via SMS. This is the most common production failure in payment systems.</p>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold text-emerald-700 mb-1">Payment completed — all 6 steps passed ✓</p>
                  <p className="text-emerald-800 text-sm">Priya's ₹12,000 debited · ShopEase has a confirmed order · SMS delivered. All 6 system hops worked. The BA documented the requirements for every single hop — that's what made this possible.</p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {slide.keyTakeaway && <Callout text={slide.keyTakeaway} color={slide.accentColor} />}
    </div>
  )
}

// ─── SHARED SUB-COMPONENTS ────────────────────────────────────────────────────
function SlideHeader({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  return (
    <div className="mb-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 ${accentBg} mb-4`}>
        {SLIDE_ICONS[slide.type]}
        {SLIDE_TYPE_LABEL[slide.type]}
        <span className="opacity-70">· {slide.duration} min</span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight mb-2">
        {slide.title}
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        className="text-lg text-gray-400">
        {slide.subtitle}
      </motion.p>
    </div>
  )
}

function PriyaBox({ text }: { text: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="bg-amber-50 border border-amber-300 rounded-xl px-5 py-3.5 mb-5 flex items-start gap-3">
      <span className="text-xl flex-shrink-0 mt-0.5">👩‍💼</span>
      <div>
        <p className="text-xs font-bold text-amber-700 mb-1">Priya's Moment</p>
        <p className="text-amber-900 text-sm leading-relaxed">{text}</p>
      </div>
    </motion.div>
  )
}

function ExampleBox({ label, text }: { label: string; text: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      className="bg-white border border-brand-800/50 rounded-xl px-5 py-4 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-4 h-4 text-brand-400" />
        <p className="text-xs font-bold text-brand-400 uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{text}</p>
    </motion.div>
  )
}

function Callout({ text, color }: { text: string; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      className={`rounded-2xl p-5 bg-gradient-to-r ${color} bg-opacity-10`}
      style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))', border: '1px solid rgba(139,92,246,0.25)' }}>
      <div className="flex items-start gap-3">
        <CheckSquare className="w-5 h-5 text-violet-700 flex-shrink-0 mt-0.5" />
        <p className="text-gray-900 font-semibold text-base leading-relaxed">{text}</p>
      </div>
    </motion.div>
  )
}
