import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Eye, EyeOff, Clock,
  BookOpen, BarChart2, Lightbulb, Users, AlertTriangle,
  Zap, FileText, CheckSquare, TestTube, Award, Target,
  ArrowRight, Play, Pause, RotateCcw
} from 'lucide-react'
import { cn } from '../../lib/utils'

// ─── SLIDE DATA ──────────────────────────────────────────────────────────────

type SlideType = 'hero' | 'data' | 'compare' | 'concept' | 'activity' | 'artifact' | 'summary'

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
  },

  // ── SLIDE 3: CONCEPT — STAKEHOLDERS ────────────────────────────────────────
  {
    id: 3,
    type: 'concept',
    title: 'Stakeholder Analysis',
    subtitle: 'Who Has a Stake in ShopEase\'s Payment Portal?',
    priyaMoment: 'Priya is one stakeholder. But behind her abandoned cart are 7 other groups — each with different goals. The BA must understand ALL of them before writing a single requirement.',
    bullets: [
      '🛍️  Customer (Priya) — wants fast, familiar digital payment options',
      '🏦  Banks & NBFCs — provide card and EMI credit authorization',
      '🔗  NPCI — governs UPI infrastructure and transaction rules',
      '⚡  Payment Gateway (Razorpay / PayU) — single API to all methods',
      '⚖️  RBI — non-negotiable: mandates PCI-DSS, 2FA, data localisation',
      '💻  Dev Team — needs clear BRD and acceptance criteria to build',
      '📊  Finance Team — wants T+1 settlement, not 3-day manual COD cash',
      '🏢  ShopEase CEO — wants ₹64 Crore recovered within 2 quarters',
    ],
    keyTakeaway: 'Every stakeholder you miss in analysis becomes a change request in development — and a delay in go-live.',
    example: {
      label: 'What happens when RBI is missed?',
      text: 'A fintech startup built a card payment feature in 2022 without consulting RBI compliance requirements. At launch, they discovered 2FA (OTP) was mandatory for all transactions above ₹5,000. They delayed launch by 6 weeks and lost their first client. The BA had not listed RBI as a stakeholder.',
    },
    speakerNotes: `Stakeholder analysis is where most student BAs make their first mistake — they only think about the end customer.

Walk through each stakeholder and ask: "What is their goal? What is their fear? What can block this project?"

The RBI example is important. Students sometimes think regulators are "external" — not stakeholders. Wrong. Regulatory requirements are the most rigid constraints in any project. If the BA doesn't understand them early, they surface at UAT or worse, post-launch.

Activity: Ask one student to role-play as the Finance team. Ask them: "You currently reconcile COD cash manually after 2-3 days. What do you need from the payment portal?" Let them articulate their own requirement. That is stakeholder analysis in practice.`,
    duration: 6,
    accentColor: 'from-violet-500 to-brand-500',
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
  },

  // ── SLIDE 5: ACTIVITY ──────────────────────────────────────────────────────
  {
    id: 5,
    type: 'activity',
    title: 'Root Cause Analysis — Class Activity',
    subtitle: 'Why doesn\'t ShopEase already have digital payment?',
    priyaMoment: 'ShopEase leadership says: "Just add a payment button." The BA knows it\'s not that simple. There are 5 root causes across 5 categories. Find them.',
    activity: {
      title: 'Fishbone Diagram — 4 Minutes',
      task: 'Your team: ShopEase has been losing ₹64 Cr/month for 18 months. Leadership never fixed it. WHY? Use the 5 categories below. Find at least one cause per category.',
      steps: [
        { step: '👥 People — Who failed to prioritise this?', time: '1 min' },
        { step: '⚙️ Process — What process was missing?', time: '1 min' },
        { step: '💻 Technology — What was not built?', time: '1 min' },
        { step: '📋 Policy — What compliance gap existed?', time: '1 min' },
      ],
      time: '4 min',
    },
    keyTakeaway: 'Root Cause Analysis prevents the most expensive mistake in BA work: solving the wrong problem. Fix the symptom and it returns. Fix the root cause and the system heals.',
    speakerNotes: `Give students exactly 4 minutes for this. Use the timer.

After 4 minutes, ask one group to share. Common correct answers:
- People: Leadership never assigned a BA or product owner to payments
- Process: No RFP sent to payment gateways, no vendor evaluation process
- Technology: Platform built COD-only, no PCI-DSS infrastructure
- Policy: No RBI compliance framework, no payment failure/refund policy defined

The surprising insight: ShopEase could have integrated Razorpay in 2 weeks. The technical barrier was low. The root causes were organisational — no priority, no process, no compliance awareness.

Key teaching moment: "Policy must be fixed before Technology. You cannot build a UPI payment feature without PCI-DSS certification. The BA must document this dependency order in the BRD."`,
    duration: 6,
    accentColor: 'from-amber-500 to-rose-500',
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
  },

  // ── SLIDE 7: ARTIFACT — USER STORIES ──────────────────────────────────────
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
      '✅ Root Cause Analysis — 5-category Fishbone, fix order defined',
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
}

const SLIDE_TYPE_LABEL: Record<SlideType, string> = {
  hero: 'Opening',
  data: 'Data',
  compare: 'Before & After',
  concept: 'Concept',
  activity: 'Activity',
  artifact: 'BA Artifact',
  summary: 'Summary',
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function PresentationMode() {
  const [current, setCurrent] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [timeLeft, setTimeLeft] = useState(75 * 60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [showThumb, setShowThumb] = useState(false)

  const slide = SLIDES[current]
  const total = SLIDES.length

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
    <div className="min-h-screen bg-gray-950 flex flex-col select-none">

      {/* ── TOP BAR ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm flex-shrink-0">
        {/* Slide counter + progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400">{current + 1} / {total}</span>
          <div className="w-28 h-1 bg-gray-800 rounded-full overflow-hidden">
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
              timerUrgent ? 'text-rose-300 bg-rose-950 border border-rose-800' : 'text-gray-300 bg-gray-800 hover:bg-gray-700',
            )}
          >
            {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {fmt(timeLeft)}
          </button>
          <button onClick={() => setTimeLeft(75 * 60)} title="Reset timer" className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-5 bg-gray-800" />

          {/* Thumbnails toggle */}
          <button
            onClick={() => setShowThumb(s => !s)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', showThumb ? 'text-brand-300 bg-brand-950' : 'text-gray-300 bg-gray-800 hover:bg-gray-700')}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Slides</span>
            <kbd className="ml-0.5 text-gray-500 text-[10px]">[N]</kbd>
          </button>

          {/* Notes toggle */}
          <button
            onClick={() => setShowNotes(s => !s)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', showNotes ? 'text-violet-300 bg-violet-950' : 'text-gray-300 bg-gray-800 hover:bg-gray-700')}
          >
            {showNotes ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:block">Notes</span>
            <kbd className="ml-0.5 text-gray-500 text-[10px]">[P]</kbd>
          </button>
        </div>
      </div>

      {/* ── SLIDE THUMBNAILS STRIP ───────────────────────────────────────────── */}
      <AnimatePresence>
        {showThumb && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-gray-800 bg-gray-900 overflow-hidden flex-shrink-0"
          >
            <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setCurrent(i); setShowThumb(false) }}
                  className={cn(
                    'flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl border transition-all text-left',
                    i === current
                      ? 'border-brand-500 bg-brand-950/50 text-brand-300'
                      : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-500 hover:text-gray-200',
                  )}
                >
                  <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center text-white bg-gradient-to-br', s.accentColor)}>
                    {SLIDE_ICONS[s.type]}
                  </div>
                  <span className="text-[10px] font-medium max-w-[64px] text-center leading-tight">{s.title.split(':')[0].split('—')[0].trim()}</span>
                  <span className="text-[9px] text-gray-600">{i + 1}/{total}</span>
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
              className="flex-1 overflow-y-auto"
            >
              <SlideCanvas slide={slide} accentBg={accentBg} />
            </motion.div>
          </AnimatePresence>

          {/* Nav bar */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-800 bg-gray-900/50 flex-shrink-0">
            <button onClick={goPrev} disabled={current === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all text-sm font-medium">
              <ChevronLeft className="w-4 h-4" /> Prev <kbd className="text-gray-600 text-xs ml-1">[←]</kbd>
            </button>

            <div className="flex items-center gap-1">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={cn('rounded-full transition-all', i === current ? 'w-5 h-2 bg-brand-500' : 'w-2 h-2 bg-gray-700 hover:bg-gray-500')} />
              ))}
            </div>

            <button onClick={goNext} disabled={current === total - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all text-sm font-medium">
              Next <kbd className="text-gray-600 text-xs ml-1">[→]</kbd> <ChevronRight className="w-4 h-4" />
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
              className="border-l border-gray-800 bg-gray-900 overflow-hidden flex-shrink-0 flex flex-col"
            >
              <div className="px-5 py-3 border-b border-gray-800 flex items-center gap-2 flex-shrink-0">
                <BookOpen className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-gray-200">Speaker Notes</span>
                <span className="ml-auto text-xs text-gray-500">Slide {current + 1} · {slide.duration} min</span>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <AnimatePresence mode="wait">
                  <motion.div key={current} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{slide.speakerNotes}</p>
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
  return <ConceptSlide slide={slide} accentBg={accentBg} />
}

// ─── HERO SLIDE ───────────────────────────────────────────────────────────────
function HeroSlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-10 text-center relative">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${accentBg} mb-8 shadow-glow`}>
        <BarChart2 className="w-4 h-4" /> BA Workshop — ShopEase Case Study
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="text-5xl lg:text-7xl font-black text-white leading-tight mb-4">
        {slide.title}
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-xl text-gray-400 mb-12 max-w-2xl">
        {slide.subtitle}
      </motion.p>

      {/* Priya story */}
      {slide.priyaMoment && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="max-w-2xl bg-amber-950/50 border border-amber-700/50 rounded-2xl p-6 mb-8 text-left">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">📖 Real Customer Story</p>
          <p className="text-amber-100 text-lg leading-relaxed italic">"{slide.priyaMoment}"</p>
        </motion.div>
      )}

      {/* Mission bullets */}
      {slide.bullets && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
          {slide.bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-left">
              <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-br ${slide.accentColor}`} />
              <p className="text-gray-300 text-sm leading-relaxed">{b}</p>
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
    brand: 'text-brand-400 border-brand-800 bg-brand-950/50',
    rose: 'text-rose-400 border-rose-800 bg-rose-950/50',
    amber: 'text-amber-400 border-amber-800 bg-amber-950/50',
    emerald: 'text-emerald-400 border-emerald-800 bg-emerald-950/50',
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
              <p className="text-xs text-gray-400 leading-tight">{s.label}</p>
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
          className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden mb-6">
          <div className="grid grid-cols-3 bg-gray-800">
            <div className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Metric</div>
            <div className="px-5 py-3 text-xs font-bold text-rose-400 uppercase tracking-wider border-l border-gray-700">❌ As-Is (Today)</div>
            <div className="px-5 py-3 text-xs font-bold text-emerald-400 uppercase tracking-wider border-l border-gray-700">✅ To-Be (After BA)</div>
          </div>
          {slide.compare.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.07 }}
              className="grid grid-cols-3 border-t border-gray-800">
              <div className="px-5 py-3.5 text-sm font-semibold text-gray-200">{row.label}</div>
              <div className="px-5 py-3.5 text-sm text-rose-300 border-l border-gray-800">{row.before}</div>
              <div className="px-5 py-3.5 text-sm text-emerald-300 border-l border-gray-800 font-medium">{row.after}</div>
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
              className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-xl px-5 py-3">
              <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 bg-gradient-to-br ${slide.accentColor}`} />
              <p className="text-gray-200 text-base leading-relaxed">{b}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Inline activity for artifact slides */}
      {slide.activity && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-amber-950/40 border border-amber-700/50 rounded-2xl p-5 mb-5">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">✏️ Class Activity · {slide.activity.time}</p>
          <p className="text-amber-100 text-sm mb-3 font-medium">{slide.activity.task}</p>
          <div className="flex flex-wrap gap-2">
            {slide.activity.steps.map((s, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-amber-900/40 border border-amber-700/40 text-amber-200 text-xs">{s.step}</span>
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
          className="bg-amber-950/40 border-2 border-amber-600/50 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-amber-300 text-lg">{slide.activity.title}</p>
              <p className="text-amber-500 text-xs">⏱ {slide.activity.time} — Groups of 3</p>
            </div>
          </div>
          <p className="text-amber-100 text-base leading-relaxed mb-5 font-medium">{slide.activity.task}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {slide.activity.steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.1 }}
                className="flex items-center gap-3 bg-amber-900/30 border border-amber-700/30 rounded-xl px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-amber-600/30 text-amber-300 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <div>
                  <p className="text-amber-100 text-sm font-medium">{s.step}</p>
                  <p className="text-amber-500 text-xs">{s.time}</p>
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

// ─── SUMMARY SLIDE ────────────────────────────────────────────────────────────
function SummarySlide({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  return (
    <div className="min-h-full flex flex-col p-8 lg:p-10">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${slide.accentColor}`} />
      <SlideHeader slide={slide} accentBg={accentBg} />

      {slide.priyaMoment && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-emerald-950/50 border border-emerald-700/50 rounded-2xl p-5 mb-6">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">🎉 Mission Accomplished</p>
          <p className="text-emerald-100 text-base leading-relaxed italic">"{slide.priyaMoment}"</p>
        </motion.div>
      )}

      {slide.bullets && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6">
          {slide.bullets.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 + i * 0.06 }}
              className="flex items-start gap-2.5 bg-gray-900 border border-emerald-900/50 rounded-xl px-4 py-3">
              <p className="text-gray-200 text-sm leading-relaxed">{b}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {slide.keyTakeaway && <Callout text={slide.keyTakeaway} color={slide.accentColor} />}
    </div>
  )
}

// ─── SHARED SUB-COMPONENTS ────────────────────────────────────────────────────
function SlideHeader({ slide, accentBg }: { slide: Slide; accentBg: string }) {
  return (
    <div className="mb-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white ${accentBg} mb-4`}>
        {SLIDE_ICONS[slide.type]}
        {SLIDE_TYPE_LABEL[slide.type]}
        <span className="opacity-70">· {slide.duration} min</span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="text-3xl lg:text-5xl font-black text-white leading-tight mb-2">
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
      className="bg-amber-950/40 border border-amber-700/40 rounded-xl px-5 py-3.5 mb-5 flex items-start gap-3">
      <span className="text-xl flex-shrink-0 mt-0.5">👩‍💼</span>
      <div>
        <p className="text-xs font-bold text-amber-400 mb-1">Priya's Moment</p>
        <p className="text-amber-100 text-sm leading-relaxed">{text}</p>
      </div>
    </motion.div>
  )
}

function ExampleBox({ label, text }: { label: string; text: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      className="bg-gray-900 border border-brand-800/50 rounded-xl px-5 py-4 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-4 h-4 text-brand-400" />
        <p className="text-xs font-bold text-brand-400 uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{text}</p>
    </motion.div>
  )
}

function Callout({ text, color }: { text: string; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      className={`rounded-2xl p-5 bg-gradient-to-r ${color} bg-opacity-10`}
      style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))', border: '1px solid rgba(139,92,246,0.25)' }}>
      <div className="flex items-start gap-3">
        <CheckSquare className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
        <p className="text-white font-semibold text-base leading-relaxed">{text}</p>
      </div>
    </motion.div>
  )
}
