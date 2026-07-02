import type { Stakeholder, ProcessNode, PainPoint, QuizQuestion, BRDSection, UATScenario } from '../types'

// ─── STAKEHOLDERS ────────────────────────────────────────────────────────────

export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: 'customer',
    name: 'Customer (Shopper)',
    role: 'End User — wants to buy & pay easily',
    icon: '🛍️',
    color: '#0d8fe6',
    responsibilities: [
      'Browse & select products on ShopEase',
      'Choose a preferred payment method',
      'Complete authentication (OTP/PIN)',
      'Report issues if payment fails',
    ],
    goals: [
      'Pay using any method: UPI, Card, EMI, Wallet',
      'Complete payment in under 30 seconds',
      'Get instant order confirmation',
      'Feel safe entering card/bank details',
    ],
    painPoints: [
      'Currently only Cash on Delivery is available',
      'No option to pay with UPI or card',
      'Must visit ATM for every online purchase',
      'Fear of sharing bank details online',
    ],
    expectations: [
      'Unified payment screen with all options',
      'Clear error messages with retry option',
      'Secure payment with trusted logos',
      'Order confirmation within seconds',
    ],
    position: { x: 0, y: -200 },
  },
  {
    id: 'bank',
    name: 'Bank / NBFC',
    role: 'Card & EMI Financial Partner',
    icon: '🏦',
    color: '#10b981',
    responsibilities: [
      'Authorize card & net banking payments',
      'Provide EMI plans to eligible customers',
      'Generate and validate OTPs',
      'Settle funds to ShopEase merchant account',
    ],
    goals: [
      'Increase digital transaction volume',
      'Reduce payment fraud',
      'Fast 2-3 second authorization',
      'Grow EMI loan portfolio',
    ],
    painPoints: [
      'High fraud attempts on new e-commerce platforms',
      'Integration complexity varies per merchant',
      'Slow reconciliation with merchants',
    ],
    expectations: [
      'PCI-DSS compliant integration',
      'Clear transaction references',
      'Chargeback dispute mechanism',
      'Real-time settlement reports',
    ],
    position: { x: 220, y: -100 },
  },
  {
    id: 'payment-gateway',
    name: 'Payment Gateway',
    role: 'Technology Aggregator (Razorpay/PayU)',
    icon: '⚡',
    color: '#8b5cf6',
    responsibilities: [
      'Aggregate all payment methods in one SDK',
      'Handle routing to banks & NPCI',
      'Manage payment retries',
      'Provide real-time payment status webhook',
    ],
    goals: [
      '99.99% uptime SLA',
      'Support all popular payment methods',
      'Sub-2 second payment processing',
      'Transparent pricing per transaction',
    ],
    painPoints: [
      'Bank API instability during peak hours',
      'Merchants not following integration docs',
      'Regulatory compliance overhead',
    ],
    expectations: [
      'Clean API integration from ShopEase dev team',
      'Proper webhook endpoint implementation',
      'Sandbox testing before production go-live',
    ],
    position: { x: 0, y: 200 },
  },
  {
    id: 'dev-team',
    name: 'Dev Team',
    role: 'Engineering — Building the Portal',
    icon: '💻',
    color: '#06b6d4',
    responsibilities: [
      'Integrate payment gateway SDK',
      'Build the checkout UI for all 6 methods',
      'Implement webhook handlers',
      'Ensure PCI-DSS compliance in code',
    ],
    goals: [
      'Clean, maintainable integration code',
      'Comprehensive error handling',
      'Automated test coverage > 80%',
      'Zero downtime deployment',
    ],
    painPoints: [
      'Unclear requirements for each payment method',
      'No acceptance criteria for edge cases',
      'Changing scope mid-sprint',
      'Bank sandbox environments unreliable',
    ],
    expectations: [
      'Detailed BRD per payment method',
      'Clear user stories with acceptance criteria',
      'Stable test environment',
      'Payment flow diagrams from BA',
    ],
    position: { x: -220, y: 100 },
  },
  {
    id: 'qa',
    name: 'QA Team',
    role: 'Quality Assurance',
    icon: '🧪',
    color: '#d946ef',
    responsibilities: [
      'Test all 6 payment method flows',
      'Validate success, failure & retry paths',
      'Perform security penetration testing',
      'Execute UAT with business team',
    ],
    goals: [
      'Zero payment bugs in production',
      'Complete test coverage for all flows',
      'Payment security validated',
    ],
    painPoints: [
      'No clear acceptance criteria to test against',
      'Sandbox data differs from production',
      'Late involvement in requirements phase',
    ],
    expectations: [
      'Testable acceptance criteria from BA',
      'UAT scenarios documented',
      'Early involvement in requirement reviews',
    ],
    position: { x: 0, y: 0 },
  },
  {
    id: 'merchant-ops',
    name: 'ShopEase Merchant Ops',
    role: 'Business Owner / Revenue',
    icon: '📊',
    color: '#84cc16',
    responsibilities: [
      'Monitor payment success rates',
      'Resolve payment disputes',
      'Manage refunds and chargebacks',
      'Track daily GMV from digital payments',
    ],
    goals: [
      'Increase digital payment adoption to 70%',
      'Reduce COD orders (high return rate)',
      'Grow monthly GMV by ₹50 Crore',
      'Reduce payment failure rate < 2%',
    ],
    painPoints: [
      'Currently 100% COD — high return rate 34%',
      'No real-time payment dashboard',
      'Manual reconciliation every day',
    ],
    expectations: [
      'Real-time payment dashboard',
      'Automated reconciliation',
      'Customer communication on payment status',
    ],
    position: { x: 0, y: -200 },
  },
]

// ─── AS-IS PROCESS ────────────────────────────────────────────────────────────

export const AS_IS_NODES: ProcessNode[] = [
  {
    id: 'browse',
    label: 'Browse ShopEase',
    description: 'Customer browses products on ShopEase website or app',
    inputs: ['Customer intent', 'Product catalog', 'Search/filters'],
    outputs: ['Product selection', 'Wishlist'],
    problems: ['No payment method shown upfront', 'Customer doesn\'t know only COD is available'],
    type: 'process',
  },
  {
    id: 'add-cart',
    label: 'Add to Cart',
    description: 'Customer adds products to shopping cart',
    inputs: ['Product details', 'Quantity', 'Cart session'],
    outputs: ['Cart total', 'Item list'],
    problems: ['Cart total is shown but no payment options visible yet'],
    type: 'process',
    hasPainPoint: true,
  },
  {
    id: 'checkout',
    label: 'Proceed to Checkout',
    description: 'Customer fills delivery address and proceeds',
    inputs: ['Cart contents', 'Delivery address', 'Pincode check'],
    outputs: ['Order summary', 'Delivery date estimate'],
    problems: ['No estimated delivery time for COD', 'Multiple address entry fields cause friction'],
    type: 'process',
    hasPainPoint: true,
  },
  {
    id: 'payment-screen',
    label: 'Payment Screen',
    description: 'Customer reaches payment screen — only COD option available',
    inputs: ['Order total', 'Delivery address confirmed'],
    outputs: ['Selected: Cash on Delivery only'],
    problems: [
      'Only Cash on Delivery available — no digital options',
      'Customer who prefers card/UPI must abandon order',
      '34% of COD orders returned — high cost for ShopEase',
    ],
    type: 'process',
    hasPainPoint: true,
  },
  {
    id: 'cod-confirm',
    label: 'Confirm COD Order',
    description: 'Customer confirms order with Cash on Delivery',
    inputs: ['COD selection', 'Contact number'],
    outputs: ['Order placed', 'SMS confirmation'],
    problems: [
      'No payment collected upfront — inventory at risk',
      'High cancellation rate before delivery',
    ],
    type: 'process',
    hasPainPoint: true,
  },
  {
    id: 'delivery',
    label: 'Delivery Agent Collects Cash',
    description: 'Delivery agent visits customer, collects cash manually',
    inputs: ['Delivery agent', 'Cash from customer', 'Order package'],
    outputs: ['Cash collected', 'Order marked delivered'],
    problems: [
      'Customer unavailable — re-delivery cost',
      'Exact change issues cause disputes',
      'Safety risk for delivery agents carrying cash',
    ],
    type: 'process',
    hasPainPoint: true,
  },
  {
    id: 'settlement',
    label: 'Manual Cash Settlement',
    description: 'Delivery agent deposits cash — manual reconciliation by finance team',
    inputs: ['Collected cash', 'Delivery records'],
    outputs: ['Bank deposit', 'Settlement report'],
    problems: [
      'Manual process takes 2-3 days to reconcile',
      'Risk of cash loss or theft in transit',
      'No real-time revenue visibility for management',
    ],
    type: 'end',
  },
]

// ─── PAIN POINTS ─────────────────────────────────────────────────────────────

export const PAIN_POINTS: PainPoint[] = [
  {
    id: 'pp1',
    title: 'No Digital Payment Options',
    nodeId: 'payment-screen',
    businessImpact: '60% of online shoppers prefer digital payments — ShopEase loses these customers to competitors',
    customerImpact: 'Customers who want to pay by card/UPI must abandon their cart and buy elsewhere',
    revenueImpact: '₹42 Crore/month in lost digital-first customers',
    supportCost: '~2,000 complaints/month requesting card/UPI payment',
    severity: 'high',
  },
  {
    id: 'pp2',
    title: 'High COD Return Rate (34%)',
    nodeId: 'cod-confirm',
    businessImpact: '34% of COD orders are returned — each return costs ShopEase ₹180 in logistics',
    customerImpact: 'Customer pays nothing upfront, has low commitment — easy to reject at door',
    revenueImpact: '₹8.5 Crore/month in return logistics costs',
    supportCost: '~5,000 return pickup requests/month',
    severity: 'high',
  },
  {
    id: 'pp3',
    title: 'Manual Cash Settlement Delay',
    nodeId: 'settlement',
    businessImpact: 'Finance team spends 3 days manually reconciling cash — no real-time revenue data',
    customerImpact: 'Customer gets no immediate payment receipt — disputes are hard to resolve',
    revenueImpact: '₹1.2 Crore cash at risk in transit daily',
    supportCost: '4 full-time staff for manual reconciliation',
    severity: 'medium',
  },
  {
    id: 'pp4',
    title: 'Cart Abandonment at Payment',
    nodeId: 'payment-screen',
    businessImpact: '43% of customers abandon cart when they see "Only COD" — competitor has 8 payment options',
    customerImpact: 'Customer frustration — had to search, shortlist, and now can\'t checkout with preferred payment',
    revenueImpact: '₹22 Crore/month in abandoned carts',
    supportCost: '~800 calls/day from customers asking "when will you add card payment?"',
    severity: 'high',
  },
  {
    id: 'pp5',
    title: 'No EMI for High-Value Orders',
    nodeId: 'checkout',
    businessImpact: 'Electronics orders > ₹20,000 have 68% abandonment — no EMI option is the top reason',
    customerImpact: 'Customer wants to buy ₹60,000 laptop but can\'t afford in one go — no EMI = no sale',
    revenueImpact: '₹15 Crore/month in high-value order loss',
    supportCost: '~400 calls/day asking about EMI availability',
    severity: 'high',
  },
  {
    id: 'pp6',
    title: 'Safety Risk for Delivery Agents',
    nodeId: 'delivery',
    businessImpact: 'Agents carry ₹15,000+ cash daily — 3 theft incidents in last quarter',
    customerImpact: 'Delivery delayed when agent requests police escort for high-value COD',
    revenueImpact: '₹45L in cash theft losses last year',
    supportCost: 'Insurance premium: ₹12L/year for cash-in-transit',
    severity: 'medium',
  },
]

// ─── QUIZ ────────────────────────────────────────────────────────────────────

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'ShopEase currently has only Cash on Delivery. As a BA, your FIRST step should be:',
    options: [
      'Immediately design the payment screen UI',
      'Understand the business problem, stakeholders, and current pain points',
      'Ask the dev team to integrate a payment gateway',
      'Write user stories for all 6 payment methods',
    ],
    correct: 1,
    explanation: 'A BA always starts by understanding the problem, not jumping to solutions. You need the "why" before the "what" or "how."',
    category: 'BA Fundamentals',
  },
  {
    id: 2,
    question: 'Which stakeholder would be MOST concerned about PCI-DSS compliance in the payment portal?',
    options: ['Customer (Shopper)', 'Delivery Agent', 'Payment Gateway (Razorpay) + Dev Team', 'Marketing Team'],
    correct: 2,
    explanation: 'Razorpay (the payment gateway) handles PCI-DSS compliance on ShopEase\'s behalf. The Dev Team must implement the integration correctly. Both have direct accountability for card data security.',
    category: 'Stakeholders',
  },
  {
    id: 3,
    question: 'A customer wants to pay ₹85,000 for a TV but can only afford ₹7,000 now. Which payment method solves this?',
    options: ['UPI Payment', 'Cash on Delivery', 'EMI (No-Cost or Low-Cost)', 'Digital Wallet'],
    correct: 2,
    explanation: 'EMI allows customers to split high-value purchases into monthly installments. This directly solves the affordability gap for electronics.',
    category: 'Payment Methods',
  },
  {
    id: 4,
    question: 'The As-Is process shows only COD. The To-Be process adds 6 payment methods. What does the BA document to capture this change?',
    options: ['A Gantt Chart', 'A Business Requirements Document (BRD)', 'A Code Review Document', 'A Marketing Plan'],
    correct: 1,
    explanation: 'The BRD (Business Requirements Document) captures WHAT needs to be built. It documents requirements for each payment method, scope, rules, and success metrics.',
    category: 'BA Artifacts',
  },
  {
    id: 5,
    question: 'For the UPI payment flow, which Acceptance Criteria is written CORRECTLY?',
    options: [
      'The UPI should work properly',
      'Given a customer enters a valid UPI ID, When they click Pay, Then payment is processed within 3 seconds',
      'UPI must be fast and secure',
      'Given a customer, When they pay, Then it is confirmed',
    ],
    correct: 1,
    explanation: 'Acceptance Criteria must be specific and testable. "Within 3 seconds" is measurable. Vague AC like "should work" or "fast and secure" cannot be tested.',
    category: 'Acceptance Criteria',
  },
  {
    id: 6,
    question: 'ShopEase has 43% cart abandonment at the payment screen. As a BA, how do you QUANTIFY this in the problem statement?',
    options: [
      '"Many customers are abandoning carts"',
      '"43% of customers (approx. 86,000/month) abandon checkout because only COD is available, causing ₹22 Crore monthly revenue loss"',
      '"Customers don\'t like our checkout"',
      '"We need more payment options ASAP"',
    ],
    correct: 1,
    explanation: 'A professional problem statement includes: current state, exact numbers, root cause, and business impact. Quantified problems get prioritized and funded.',
    category: 'Problem Statement',
  },
  {
    id: 7,
    question: 'The dev team asks: "What happens when a UPI payment fails?" As a BA, where should this answer be documented?',
    options: [
      'In a Slack message',
      'In the Acceptance Criteria and BRD — documented as a Business Rule',
      'It\'s the dev team\'s decision',
      'In the marketing brochure',
    ],
    correct: 1,
    explanation: 'Failure scenarios are Business Rules that must be documented in the BRD and Acceptance Criteria. If not documented, each developer handles failures differently — creating inconsistent user experience.',
    category: 'Business Rules',
  },
  {
    id: 8,
    question: 'Which payment method has the HIGHEST risk of fraud and requires mandatory 2FA per RBI guidelines?',
    options: ['Digital Wallet (balance payment)', 'UPI Collect Request', 'Credit/Debit Card (CNP transactions)', 'COD'],
    correct: 2,
    explanation: 'Card Not Present (CNP) transactions — where you enter card details online — have the highest fraud risk. RBI mandates 2FA (OTP-based) for all card transactions above ₹5,000.',
    category: 'Payment Security',
  },
  {
    id: 9,
    question: 'A User Story for the Net Banking payment method should be written as:',
    options: [
      '"Build net banking integration"',
      '"As a customer, I want to select my bank and authenticate via net banking, so that I can complete my purchase without sharing card details"',
      '"Net banking must be implemented by Sprint 3"',
      '"The system should support net banking"',
    ],
    correct: 1,
    explanation: 'User stories follow "As a [role], I want [goal], So that [benefit]". They focus on the USER\'s need and value — not technical implementation details.',
    category: 'User Stories',
  },
  {
    id: 10,
    question: 'During UAT for the Wallet payment, the QA tester finds: wallet balance deducted but order not confirmed. This is:',
    options: [
      'Expected behavior — wallets are unreliable',
      'A CRITICAL bug — payment collected but order not created is a business & legal issue',
      'A minor cosmetic issue',
      'A development environment problem — ignore in UAT',
    ],
    correct: 1,
    explanation: 'Payment collected but no order = critical business failure. Customer is charged but receives nothing. This is a Priority 1 bug that must block release until fixed.',
    category: 'UAT & Testing',
  },
]

// ─── BRD SECTIONS ────────────────────────────────────────────────────────────

export const BRD_SECTIONS: BRDSection[] = [
  {
    id: 'objective',
    title: 'Business Objective',
    description: 'What is ShopEase trying to achieve by building this payment portal?',
    placeholder: 'e.g., Build a unified digital payment portal for ShopEase that supports UPI, Card, Net Banking, EMI, Wallet, and BNPL — increasing digital payment adoption from 0% to 70% within 6 months, and reducing COD orders to below 30% of total orders by Q3 2024.',
    hint: 'Make it SMART: Specific, Measurable, Achievable, Relevant, Time-bound. Include the current state (0% digital) and the target state (70%).',
    content: '',
  },
  {
    id: 'problem',
    title: 'Business Problem Statement',
    description: 'Why does this payment portal need to be built? What problem does it solve?',
    placeholder: 'e.g., ShopEase currently only supports Cash on Delivery (COD). This causes:\n• 43% cart abandonment at payment screen\n• 34% COD return rate costing ₹8.5 Cr/month in logistics\n• ₹42 Cr/month revenue lost from digital-payment-preferring customers\n• Inability to capture high-value electronics orders (no EMI)\n\nCompetitors offer 6+ payment methods. ShopEase must build a payment portal to remain competitive.',
    hint: 'Include current pain, business impact in numbers, and why NOW is the right time.',
    content: '',
  },
  {
    id: 'scope',
    title: 'In Scope',
    description: 'What payment methods and features are included in Phase 1?',
    placeholder: '• UPI Payment (via NPCI/payment gateway)\n• Credit & Debit Card (Visa, MasterCard, Rupay)\n• Net Banking (15 major banks)\n• EMI (6/9/12/24 month tenures)\n• Digital Wallet (integrated balance)\n• BNPL — Buy Now Pay Later\n• Payment success/failure/retry screens\n• Order confirmation on payment success\n• Refund initiation on cancellation',
    hint: 'Be specific about which banks, tenures, and card types. Vague scope causes scope creep.',
    content: '',
  },
  {
    id: 'out-of-scope',
    title: 'Out of Scope',
    description: 'What is explicitly NOT included in Phase 1?',
    placeholder: '• International payment methods (Paypal, Stripe international)\n• Cryptocurrency payments\n• Gift card redemption\n• Loyalty points integration\n• B2B bulk payment orders\n• Mobile app payment (Phase 2)\n• Seller payout system (separate project)',
    hint: 'Defining exclusions prevents "but I assumed it was included" conversations mid-project.',
    content: '',
  },
  {
    id: 'stakeholders',
    title: 'Key Stakeholders',
    description: 'Who is involved or impacted by the payment portal?',
    placeholder: '• Product Owner: Priya Sharma (ShopEase Head of Payments)\n• Payment Gateway Partner: Razorpay (handles UPI routing, compliance, bank integrations)\n• Bank Partners: HDFC, ICICI, Axis, SBI (EMI + Net Banking)\n• Dev Lead: Rahul Verma (2 frontend + 2 backend engineers)\n• QA Lead: Anjali Singh\n• Security: Cybersecurity team (PCI-DSS audit via Razorpay)\n• Finance: Reconciliation & settlement team',
    hint: 'Include the RACI matrix: who is Responsible, Accountable, Consulted, Informed.',
    content: '',
  },
  {
    id: 'business-rules',
    title: 'Business Rules',
    description: 'What rules govern how each payment method must behave?',
    placeholder: '• RBI 2FA mandatory for card transactions > ₹5,000\n• UPI payment timeout: 5 minutes (NPCI standard)\n• EMI minimum order value: ₹5,000\n• Maximum EMI tenure: 24 months\n• Wallet maximum balance: ₹10,000 (RBI prepaid limit)\n• Payment retry: maximum 3 attempts before blocking\n• Refund timeline: UPI 24hrs, Card 5-7 days, EMI same cycle\n• BNPL: Credit check required, max ₹50,000 limit\n• Failed payment: order NOT created until payment confirmed',
    hint: 'Business rules come from RBI regulations, partner agreements, and business policies. Each rule becomes an Acceptance Criterion.',
    content: '',
  },
  {
    id: 'success-metrics',
    title: 'Success Metrics (KPIs)',
    description: 'How will ShopEase know the payment portal was successful?',
    placeholder: '• Digital payment adoption: 0% → 70% (6 months)\n• COD orders: reduce from 100% → 30%\n• Cart abandonment at payment: 43% → 15%\n• Payment success rate: > 95% for all methods\n• UPI transaction time: < 3 seconds\n• Card authorization time: < 5 seconds\n• Payment failure rate: < 2%\n• Monthly GMV from digital: ₹0 → ₹50 Crore\n• Customer satisfaction score: > 4.2 / 5 on payment experience',
    hint: 'Without measurable KPIs, you cannot prove ROI. Each metric should have a baseline and target.',
    content: '',
  },
  {
    id: 'assumptions',
    title: 'Assumptions & Dependencies',
    description: 'What are you assuming to be true, and what depends on external parties?',
    placeholder: 'Assumptions:\n• Payment gateway (Razorpay) will provide sandbox environment within 1 week\n• Bank APIs will maintain 99.5% uptime\n• Customers have UPI-enabled bank accounts\n• PCI-DSS audit will complete before go-live\n\nDependencies:\n• NPCI UPI merchant registration (2 weeks)\n• Bank partner agreements for EMI (3-4 weeks)\n• PCI-DSS security audit clearance\n• RBI merchant payment aggregator license',
    hint: 'Wrong assumptions are the #1 cause of project failure. Document them so they can be validated early.',
    content: '',
  },
]

// ─── UAT SCENARIOS ───────────────────────────────────────────────────────────

export const INITIAL_UAT_SCENARIOS: UATScenario[] = [
  {
    id: 'uat1',
    scenario: 'UPI Payment — Successful Transaction',
    steps: '1. Login to ShopEase\n2. Add product to cart (₹2,500)\n3. Go to checkout → confirm address\n4. On payment screen, select UPI\n5. Enter valid UPI ID (test@upi)\n6. Click Pay ₹2,500\n7. Approve on UPI app',
    expectedResult: 'Payment deducted from bank. Order confirmed with Order ID. Confirmation SMS + email received within 30 seconds.',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 'uat2',
    scenario: 'Credit Card — Successful with OTP',
    steps: '1. Select Credit Card on payment screen\n2. Enter valid card number, expiry, CVV\n3. Click Pay\n4. OTP received on registered mobile\n5. Enter OTP within 5 minutes',
    expectedResult: 'Card charged. Order placed. Card statement reflects transaction. Confirmation displayed immediately.',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 'uat3',
    scenario: 'EMI — 12 Month No-Cost EMI',
    steps: '1. Add product ₹36,000 to cart\n2. Select EMI on payment screen\n3. Choose HDFC Bank → 12 months\n4. Verify monthly amount = ₹3,000\n5. Complete card authentication',
    expectedResult: 'EMI created. Order confirmed. Monthly schedule shown. ₹3,000 first installment deducted. Email with EMI schedule sent.',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 'uat4',
    scenario: 'Payment Failure — Insufficient Funds → Retry',
    steps: '1. Attempt UPI payment with insufficient balance\n2. View failure message\n3. Click "Try Another Payment Method"\n4. Select Credit Card\n5. Complete card payment',
    expectedResult: 'Clear message: "Payment failed — Insufficient balance". Option to retry with same or different method. Order NOT created on failure. Successful on retry.',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 'uat5',
    scenario: 'Digital Wallet — Full Balance Payment',
    steps: '1. Add ₹800 product to cart\n2. Select Wallet on payment screen\n3. Verify wallet balance displayed (₹1,200)\n4. Click Pay from Wallet',
    expectedResult: 'Wallet balance deducted by ₹800. Remaining balance ₹400 shown. Order confirmed instantly. No OTP required for wallet.',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'uat6',
    scenario: 'Net Banking — Bank Portal Redirect',
    steps: '1. Select Net Banking\n2. Choose SBI from bank list\n3. Redirected to SBI net banking portal\n4. Login with credentials\n5. Confirm payment',
    expectedResult: 'Redirected to SBI portal within 2 seconds. After payment, redirected back to ShopEase with success confirmation. Session data preserved.',
    priority: 'medium',
    status: 'pending',
  },
]

// ─── PRESENTATION SLIDES ─────────────────────────────────────────────────────

export const PRESENTATION_SLIDES = [
  {
    id: 1,
    title: 'Building a Payment Portal',
    subtitle: 'A Business Analyst\'s Journey — ShopEase Case Study',
    content: [
      'ShopEase is a growing e-commerce company with ONE problem',
      'They only accept Cash on Delivery — losing ₹64 Crore/month',
      'Your job as BA: Design a complete payment portal from scratch',
      'You will create every artifact: BRD, User Stories, UAT, and more',
      'By end of session: A complete, professional BA deliverable set',
    ],
    speakerNotes: `Welcome everyone! Today is different from a typical lecture. We're not going to talk ABOUT Business Analysis — we're going to DO Business Analysis.

The scenario: ShopEase, an Indian e-commerce startup, is growing fast but has a massive problem. They ONLY accept Cash on Delivery. No UPI. No cards. No EMI. In today's digital-first market, this is like a restaurant that only accepts cheques.

Your mission today is to design their entire payment portal from scratch — like a real BA would on the job. You'll create actual deliverables that a development team could use to build this system.

Ready? Let's begin.`,
    type: 'title',
    duration: 5,
  },
  {
    id: 2,
    title: 'The Business Problem',
    subtitle: 'Why ShopEase Urgently Needs a Payment Portal',
    content: [
      '2,00,000 monthly visitors to ShopEase',
      '43% abandon cart because "only COD" — that\'s 86,000 lost customers',
      '34% of COD orders are returned — ₹8.5 Crore/month in logistics',
      'Competitors: Amazon (15 methods) vs ShopEase (1 method: COD)',
      'Total monthly loss: ₹64 Crore in revenue — the business is bleeding',
    ],
    speakerNotes: `Let's look at the numbers. These are fictional but based on real e-commerce patterns.

ShopEase gets 2 lakh visitors per month. That's healthy traffic. But 43% of customers abandon at checkout because they see "Cash on Delivery only." They want to pay by UPI or card — can't — so they go to Amazon or Flipkart.

The COD problem is even worse. Of the orders that DO get placed, 34% are returned. Why? Because the customer pays nothing upfront, so there's no commitment. They can say "I changed my mind" when the delivery agent arrives.

Ask the class: "If you were the CEO, how urgently would you prioritize this fix? What's the cost of waiting another 6 months?"`,
    type: 'data',
    duration: 8,
  },
  {
    id: 3,
    title: 'Stakeholder Ecosystem',
    subtitle: 'Everyone Touched by the Payment Portal',
    content: [
      '🛍️ Customer — wants UPI, card, EMI options',
      '🏦 Banks — provide card/EMI authorization',
      '⚡ Payment Gateway (Razorpay) — single API connecting ShopEase to all payment methods',
      '💻 Dev Team — needs clear BRD & acceptance criteria',
      '📊 ShopEase Business — wants GMV growth & fewer returns',
    ],
    speakerNotes: `Building a payment portal is NOT just a technology project. It involves multiple stakeholders with very different goals.

The Payment Gateway (Razorpay) is often misunderstood. It acts as an aggregator — connecting to all banks through one API. ShopEase doesn't need to integrate with 50 banks separately; they integrate once with Razorpay. Razorpay also handles all regulatory compliance (RBI, NPCI) on ShopEase's behalf.

Key BA question to ask each stakeholder: "What does success look like for YOU in this project?"`,
    type: 'concept',
    duration: 10,
  },
  {
    id: 4,
    title: 'As-Is Process: The COD Reality',
    subtitle: 'How ShopEase Processes Orders Today',
    content: [
      'Browse → Add Cart → Checkout → Payment Screen',
      'Payment Screen: ONLY "Cash on Delivery" option',
      'Order Confirmed → Delivery Agent visits customer',
      'Agent collects cash manually → deposits to bank',
      'Finance team manually reconciles cash (2-3 days)',
      '⚠️ 6 major pain points in this 7-step process',
    ],
    speakerNotes: `The As-Is process is how things work TODAY. Before proposing solutions, a BA must deeply understand the current state.

Walk through the COD flow step by step. Notice what's MISSING that customers expect: no card terminal, no QR code, no UPI link — just cash.

The reconciliation step is often overlooked. The delivery agent collects cash, gives it to a supervisor, who deposits it in the bank. Finance then manually matches each transaction. This takes 2-3 days. During those days, ShopEase has no idea of their real revenue!

Ask students: "How many of you have rejected a COD delivery? Why? That's our 34% return rate explained."`,
    type: 'process',
    duration: 10,
  },
  {
    id: 5,
    title: 'Root Cause Analysis',
    subtitle: 'Why Doesn\'t ShopEase Have Digital Payments?',
    content: [
      '💰 Investment: Payment gateway setup cost seen as "high risk" for startup',
      '⚖️ Compliance: PCI-DSS and RBI regulations seemed complex',
      '🔧 Technology: No dedicated payments engineering team',
      '📋 Process: No defined requirements — nobody knew where to start',
      '👥 People: Leadership hadn\'t prioritized digital payments in roadmap',
      '✅ Root Cause Identified → NOW we can design the solution',
    ],
    speakerNotes: `Fishbone analysis reveals WHY ShopEase ended up with only COD.

Most interesting finding? It's NOT because they couldn't technically do it. The payment gateways (Razorpay, PayU) have simple integration. The real root cause was a combination of perceived cost, compliance fear, and lack of clear requirements.

This is where the BA role is critical. By documenting requirements clearly, creating a BRD, and proving the ROI (₹64 Crore/month lost!), the BA makes it EASY for leadership to approve the investment.

Class discussion: "The company was losing ₹64 Crore/month but didn't prioritize fixing it. What organizational factors cause this?"`,
    type: 'analysis',
    duration: 10,
  },
  {
    id: 6,
    title: 'To-Be Process: The New Payment Portal',
    subtitle: 'What ShopEase Payment Will Look Like',
    content: [
      'Customer reaches payment screen → sees 6 payment methods',
      '⚡ UPI: Enter UPI ID or scan QR → confirm in app → done in 3 sec',
      '💳 Card: Enter details → OTP → instant authorization',
      '🏦 Net Banking: Select bank → redirect → login → confirm',
      '📅 EMI: Select bank + tenure → see monthly amount → pay',
      '👛 Wallet: One-click pay from stored balance',
      '🛒 BNPL: Buy now, pay within 30 days — no interest',
    ],
    speakerNotes: `Now we design the future state. Each payment method has its own distinct flow, but all should feel like ONE seamless ShopEase experience.

The most important design principle: Progressive Disclosure. Don't show ALL payment method details at once — show the method options, and only expand when selected.

Notice: each method has a different authentication method:
- UPI: app approval
- Card: OTP (RBI-mandated 2FA)
- Net Banking: bank portal redirect + login
- Wallet: PIN or biometric
- BNPL: credit check at first use

As a BA, you must document the flow for EACH method separately. One user story won't cover all of these.`,
    type: 'process',
    duration: 12,
  },
  {
    id: 7,
    title: 'Payment Screen Design Requirements',
    subtitle: 'What the BA Documents for the UI',
    content: [
      'Payment method tabs: UPI | Card | Net Banking | EMI | Wallet | BNPL',
      'Order summary always visible on right (amount, items)',
      'Security badges: PCI-DSS, SSL, Bank logos',
      'Each method: input fields + validation + error messages',
      'Retry option on failure — "Try Another Method" CTA',
      'Loading state during payment processing (prevent double-click)',
    ],
    speakerNotes: `The payment screen is where most of the BA's requirements work happens. The UI looks simple but has 50+ requirements hidden inside it.

Let me walk you through what's NOT obvious:
1. Loading state: If the customer clicks "Pay" and the system is processing, they must see a spinner. Without it, they click again → duplicate charge.
2. Security badges: Research shows security logos increase conversion by 12%. The BA should recommend these.
3. Order summary: Always visible. If the customer can't see the total while selecting payment, they get anxious and abandon.
4. Error messages: "Transaction Declined" is useless. "Card declined — insufficient limit. Try a different card or UPI." is what we need.

This is why BA work is so valuable — developers don't think about these things unless they're documented.`,
    type: 'concept',
    duration: 10,
  },
  {
    id: 8,
    title: 'Writing User Stories',
    subtitle: 'Requirements in the Customer\'s Voice',
    content: [
      '"As a customer, I want to select UPI payment, so that I can pay instantly without entering card details"',
      '"As a customer, I want to pay in EMI, so that I can buy high-value electronics I can\'t afford in one payment"',
      '"As a customer, I want to see a clear error with retry option when payment fails, so that I don\'t lose my order"',
      '"As a finance manager, I want real-time payment reports, so that I can track daily GMV without manual reconciliation"',
      'Each story = 1 sprint deliverable with clear acceptance criteria',
    ],
    speakerNotes: `User stories put the HUMAN at the center. Notice how each story:
1. Names a specific person (not just "user")
2. States a specific action (not "use the payment")
3. Explains WHY they need it (the "so that" is the value)

The finance manager story is important — don't forget non-customer stakeholders. The business owners, finance team, and operations team also have requirements that must be captured.

Class activity: "Write one user story for the BNPL payment method. What does the customer want to do? Why? What benefit do they get?"`,
    type: 'artifact',
    duration: 8,
  },
  {
    id: 9,
    title: 'Acceptance Criteria',
    subtitle: 'Defining "Done" for Each Payment Method',
    content: [
      'UPI: Given valid UPI ID entered, When Pay clicked, Then authorized within 3 seconds',
      'Card: Given card details entered, When Pay clicked, Then OTP sent within 30 seconds',
      'Failure: Given payment fails, When error occurs, Then specific message shown with retry option',
      'Security: Given ANY transaction, When processed, Then HTTPS + PCI-DSS standards maintained',
      'Double-click: Given payment processing, When Pay button clicked again, Then duplicate charge prevented',
    ],
    speakerNotes: `Acceptance criteria are the contract between the BA and the developer. When the developer asks "is this done?" — the AC says yes or no.

Notice the last AC: preventing duplicate charges from double-clicking. This sounds like a developer concern, but it's actually a BUSINESS requirement. If a customer is charged twice, that's a refund, a complaint, a trust loss, and potentially a chargeback fee from the bank.

The BA identifies these edge cases by asking: "What could go wrong at each step? What's the worst case? Document how the system should handle it."

Pro tip: For every "happy path" user story, there should be at least 2-3 "sad path" acceptance criteria covering failures, edge cases, and errors.`,
    type: 'artifact',
    duration: 8,
  },
  {
    id: 10,
    title: 'UAT — Validating the Payment Portal',
    subtitle: 'Testing Before Going Live',
    content: [
      'UAT = Business users test if it meets THEIR requirements',
      'Test 1: Successful UPI payment → order confirmed ✓',
      'Test 2: Card payment with OTP → authorized within 5 sec ✓',
      'Test 3: Payment failure → retry with different method ✓',
      'Test 4: EMI selection → monthly amount correct ✓',
      'Test 5: Wallet payment → balance deducted correctly ✓',
      'ONLY when all UAT passes → RELEASE to production',
    ],
    speakerNotes: `UAT is the final validation. This is where the BA's earlier work pays off.

If you wrote good acceptance criteria, UAT scenarios practically write themselves — each AC becomes a test case.

The UAT mindset: "Test as if you're the real customer." Don't test what works. Test what MIGHT break:
- What if customer has no UPI balance?
- What if bank OTP arrives late?
- What if network drops during payment?

A critical rule: NEVER skip UAT for payment systems. If a bug reaches production where a customer is charged but order is not created, the business faces:
1. Customer refund
2. Reputational damage
3. Potential RBI inquiry

The cost of proper UAT is always less than the cost of a production payment bug.`,
    type: 'process',
    duration: 8,
  },
  {
    id: 11,
    title: 'The Complete BA Deliverable Set',
    subtitle: 'What You\'ve Built Today',
    content: [
      '✅ Problem Statement — ₹64 Cr/month loss quantified',
      '✅ Stakeholder Map — 8 stakeholders with goals & pain points',
      '✅ As-Is Process — 7-step COD flow with 6 pain points',
      '✅ Root Cause Analysis — Fishbone across 5 categories',
      '✅ To-Be Process — 6-method payment portal designed',
      '✅ BRD — 8 sections with business rules & success metrics',
      '✅ User Stories — Per payment method with business value',
      '✅ Acceptance Criteria — Given/When/Then, testable & specific',
      '✅ UAT Scenarios — 6 payment flows test-ready',
    ],
    speakerNotes: `Look at what you've accomplished today. This is a professional Business Analysis deliverable set. A junior BA might take 2-3 weeks to produce this on a real project.

The key insight: every artifact connects to the next.
Business Problem → Stakeholders → Pain Points → Root Cause → To-Be → BRD → User Stories → AC → UAT

It's a chain. If your problem statement is weak, your BRD will be vague. If your AC is vague, your UAT will be incomplete. If your UAT is incomplete, bugs reach production.

Quality BA work is the foundation of quality software. Now you have experienced the full journey — from a business problem to a complete, implementable solution.

Congratulations on completing the Business Analyst Interactive Workshop!`,
    type: 'summary',
    duration: 7,
  },
]
