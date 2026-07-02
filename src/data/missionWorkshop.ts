import type { SimulatorSection } from '../types'

export interface MissionMeta {
  id: SimulatorSection
  mission: string
  title: string
  shortTitle: string
  completion: number
  time: string
  story: string
  explanation: string
  activity: string
  revealConcept: string
  keyLearning: string
  quiz: {
    question: string
    answer: string
  }
  faculty: {
    objective: string
    notes: string
    questions: string[]
    expectedAnswers: string[]
    example: string
    takeaway: string
  }
}

// ShopEase persona — used consistently across all missions
export const PRIYA_STORY =
  'Priya, a working professional in Mumbai, wants to buy a ₹12,000 kitchen appliance on ShopEase. At checkout she finds only Cash on Delivery. She doesn\'t keep large cash at home, misses the delivery agent twice, and finally cancels the order. ShopEase loses the sale — and Priya buys from Amazon instead.'

// 75-minute breakdown: 2+6+5+5+5+5+6+10+7+6+5+5+4+2+2 = 75 min
export const MISSION_META: Record<SimulatorSection, MissionMeta> = {
  dashboard: {
    id: 'dashboard',
    mission: 'Briefing',
    title: 'Save ShopEase',
    shortTitle: 'Briefing',
    completion: 0,
    time: '2 min',
    story: PRIYA_STORY,
    explanation: 'Students step into the role of Business Analysts hired to solve a real revenue crisis at ShopEase.',
    activity: 'Ask students: have you ever abandoned an online cart because your preferred payment wasn\'t available?',
    revealConcept: 'A Business Analyst starts by understanding the business situation — not by jumping to a solution.',
    keyLearning: 'Every requirement has a business reason behind it. Find that reason first.',
    quiz: {
      question: 'What should a BA do first when assigned to a project?',
      answer: 'Understand the business problem and its impact — before suggesting any solution.',
    },
    faculty: {
      objective: 'Set the workshop context and create student buy-in through a relatable customer scenario.',
      notes: 'Position the class as a consulting team hired by ShopEase to investigate why ₹64 Crore is lost every month. Make it feel like a real client engagement.',
      questions: ['Have you ever paid Cash on Delivery?', 'Would you return a COD order if the timing was inconvenient?'],
      expectedAnswers: ['Yes — COD is inconvenient for large amounts', 'UPI or card is easier', 'Digital payment gives more control'],
      example: 'Priya cancels a ₹12,000 COD order because she isn\'t home during delivery. ShopEase loses that sale permanently.',
      takeaway: 'Business Analysis begins with a real customer problem, not a technology requirement.',
    },
  },

  'business-problem': {
    id: 'business-problem',
    mission: 'Mission 1',
    title: 'Understand the Business',
    shortTitle: 'Business Problem',
    completion: 10,
    time: '6 min',
    story: PRIYA_STORY,
    explanation: 'Read the ShopEase data — 2 lakh monthly visitors, 86,000 cart abandonments, 34% COD return rate, ₹64 Crore monthly loss. Translate raw numbers into a formal Business Problem Statement.',
    activity: 'Before revealing the problem statement, ask students to write one sentence: what problem is ShopEase facing?',
    revealConcept: 'Business Problem, Business Goal, Business Impact, Revenue Loss, Customer Experience.',
    keyLearning: 'A Business Problem Statement converts confusing numbers into a clear, measurable gap between current state and desired state.',
    quiz: {
      question: 'ShopEase has 2,00,000 monthly visitors but only 36,000 complete a purchase. What is the abandonment rate?',
      answer: '82% of visitors never complete a purchase. Cart abandonment alone is 43% (86,000 of 2,00,000).',
    },
    faculty: {
      objective: 'Teach MBA students to read business data and frame a problem in BA language — not tech language.',
      notes: 'Let students guess the problem statement before revealing it. Compare their answer with the formal BA version. The difference teaches them what structured thinking looks like.',
      questions: ['Is this a technology problem or a business problem?', 'Who loses money — the customer or ShopEase?', 'What would happen if this is not fixed in 6 months?'],
      expectedAnswers: ['Both — but the business must decide first', 'ShopEase loses ₹64 Cr/month', 'Competitors capture those customers permanently'],
      example: 'Priya doesn\'t just leave — she buys from Amazon. ShopEase doesn\'t just lose ₹12,000. It loses Priya as a lifetime customer.',
      takeaway: 'A business problem is not "the app is broken." It is "we are losing ₹64 Crore per month because customers cannot pay the way they want to."',
    },
  },

  stakeholders: {
    id: 'stakeholders',
    mission: 'Mission 2',
    title: 'Meet the Stakeholders',
    shortTitle: 'Stakeholders',
    completion: 20,
    time: '5 min',
    story: 'Priya is one customer. Behind her abandoned order are 7 teams — each with different goals and different definitions of success for the same project.',
    explanation: 'Click each stakeholder node to understand what they want from the payment portal project and where their interests may conflict.',
    activity: 'Quick role play: one student speaks as Priya (customer), one as Finance (wants T+1 settlement), one as Dev (wants clear specs). What does each need from the BA?',
    revealConcept: 'Stakeholders are all people or groups who are affected by — or who can affect — the project outcome.',
    keyLearning: 'Missing one key stakeholder means missing one set of requirements. That gap shows up in UAT or worse — in production.',
    quiz: {
      question: 'If the BA builds the payment portal without consulting Razorpay (the Payment Gateway), what is the risk?',
      answer: 'The portal may handle webhook responses incorrectly, causing orders to be confirmed even when payments failed — a direct revenue and trust loss.',
    },
    faculty: {
      objective: 'Show MBA students that stakeholder analysis is not an HR exercise — it directly shapes which requirements get written.',
      notes: 'Focus on conflicts: Finance wants same-day settlement, Dev team wants 2-week sprint timelines. The BA must balance both without owning either decision.',
      questions: ['Who has the most to gain if this project succeeds?', 'Who could block this project if not consulted early?', 'What does Priya need that only the UX team can provide?'],
      expectedAnswers: ['ShopEase leadership — revenue recovery', 'Payment Gateway (Razorpay) and Dev Team', 'A simple, fast checkout that doesn\'t confuse her'],
      example: 'If the BA doesn\'t consult Razorpay\'s integration team, webhook handling and retry logic may be missed — causing silent payment failures in production.',
      takeaway: 'Every stakeholder you miss in analysis becomes a change request in development.',
    },
  },

  'as-is-process': {
    id: 'as-is-process',
    mission: 'Mission 3',
    title: 'Map the Current Process',
    shortTitle: 'Current Process',
    completion: 30,
    time: '5 min',
    story: 'Priya\'s current ShopEase journey: Browse → Add to Cart → Reach Checkout → See only COD → Decide to think about it → Forget → Competitor wins.',
    explanation: 'Walk through ShopEase\'s current COD-only checkout flow step by step. At each step, identify what is missing and what the customer experience feels like.',
    activity: 'Students narrate Priya\'s journey step by step — then identify the exact step where ShopEase loses her.',
    revealConcept: 'The As-Is Process documents how the business works today — before any changes. It is the baseline for every improvement.',
    keyLearning: 'You cannot design a better process unless you fully understand the broken one.',
    quiz: {
      question: 'At which step does ShopEase currently lose Priya as a customer?',
      answer: 'At the Payment Selection step — where COD is the only option. Priya needs digital payment and ShopEase cannot offer it.',
    },
    faculty: {
      objective: 'Teach process mapping through a real, relatable customer journey — not a flowchart exercise.',
      notes: 'Walk through the current COD flow slowly. Ask students to count how many steps require a human action (delivery agent, cash handling, manual reconciliation). Each human step is a failure point.',
      questions: ['How many steps in the COD process involve a human being?', 'What happens when the delivery agent doesn\'t carry change?', 'How long does it take ShopEase to know if Priya paid or returned?'],
      expectedAnswers: ['5+ steps involve humans', 'The sale fails at doorstep', '3-5 days for manual reconciliation'],
      example: 'In a digital payment, ShopEase knows within 5 seconds whether Priya paid. In COD, they know after 3-5 days and a human-driven return process.',
      takeaway: 'The As-Is map reveals waste, delays, and manual steps that digital payment eliminates entirely.',
    },
  },

  'pain-points': {
    id: 'pain-points',
    mission: 'Mission 4',
    title: 'Discover the Pain Points',
    shortTitle: 'Pain Points',
    completion: 40,
    time: '5 min',
    story: 'Priya doesn\'t complain to ShopEase. She just leaves. The business doesn\'t know why 86,000 carts are abandoned every month — until the BA investigates.',
    explanation: 'Explore ShopEase\'s pain points from three angles: customer frustration, business loss, and operational failure.',
    activity: 'Groups of 3: each group picks one perspective (customer / business / operations) and identifies the top 2 pain points from that angle.',
    revealConcept: 'Pain Point Analysis connects customer frustration to measurable business impact. A symptom ("customer leaves") becomes a pain point when you add impact ("86,000 carts abandoned = ₹64 Cr lost").',
    keyLearning: 'A pain point is only useful when it includes who feels it, what the impact is, and what is causing it.',
    quiz: {
      question: 'Is "customers don\'t complete checkout" a good pain point statement?',
      answer: 'No. A good statement would be: "86,000 customers/month abandon checkout because no digital payment option is available, resulting in ₹64 Crore monthly revenue loss."',
    },
    faculty: {
      objective: 'Train students to go beyond observations to structured, impact-driven problem framing.',
      notes: 'Push students to add numbers to every pain point. "Customers are frustrated" is an observation. "34% of COD orders are returned, costing ₹8.5 Cr/month" is a pain point a CEO will act on.',
      questions: ['How many customers silently leave without telling ShopEase why?', 'What does a 34% COD return rate cost the operations team per month?', 'Why does no digital payment option hurt high-value customers more?'],
      expectedAnswers: ['Most — silent churn is the biggest risk', '₹8.5 Cr in wasted logistics and cash handling', 'High-value buyers never pay cash — they want card/EMI/UPI'],
      example: 'A ₹50,000 laptop buyer will never choose COD. ShopEase is invisible to its highest-value customers because it only offers cash.',
      takeaway: 'Pain points drive the requirement priority list. The bigger the pain, the higher the priority.',
    },
  },

  'root-cause': {
    id: 'root-cause',
    mission: 'Mission 5',
    title: 'Find the Real Cause',
    shortTitle: 'Root Cause',
    completion: 50,
    time: '5 min',
    story: 'ShopEase leadership says: "just add a payment button." The BA knows the real problem is deeper — no gateway, no compliance, no team, no policy. The button is the last step, not the first.',
    explanation: 'Expand the Fishbone diagram to see root causes across 5 categories: People, Process, Technology, Policy, and Market.',
    activity: 'Ask one student to argue that Technology is the root cause. Ask another to argue it\'s Policy. Then reveal why both are right — and why the BA must address Policy first.',
    revealConcept: 'Root Cause Analysis prevents teams from building solutions to the wrong problem. Fix the symptom and the problem returns. Fix the root cause and the system heals.',
    keyLearning: 'The most visible problem is rarely the deepest problem. A BA\'s value is in finding what\'s underneath.',
    quiz: {
      question: 'ShopEase says "add UPI payment." The BA discovers no PCI-DSS certification exists. What should the BA do?',
      answer: 'Prioritise obtaining PCI-DSS certification first — without it, no payment method can legally go live. Document this as a dependency in the BRD.',
    },
    faculty: {
      objective: 'Teach structured causal thinking — essential for MBA students who will manage complex business projects.',
      notes: 'The 5-category fishbone (People, Process, Technology, Policy, Market) forces teams out of single-cause thinking. In a payments project, the answer is never just "the tech wasn\'t built." It\'s a combination of all five.',
      questions: ['Why hasn\'t ShopEase added digital payment before today?', 'Is this a failure of technology, leadership, or both?', 'What must be fixed before a single line of code is written?'],
      expectedAnswers: ['No strategic priority given to payments', 'Leadership + compliance + technology gap', 'PCI-DSS certification and payment gateway contract'],
      example: 'Amazon India launched UPI in 2017 because they had a dedicated payment product team and RBI pre-approval. ShopEase has neither — so adding a UPI button alone will not work.',
      takeaway: 'The order of fixes matters. Policy → Technology → Process → People → Market. Skip any step and the project fails.',
    },
  },

  'to-be-process': {
    id: 'to-be-process',
    mission: 'Mission 6',
    title: 'Design the Better Process',
    shortTitle: 'To-Be Process',
    completion: 60,
    time: '6 min',
    story: 'The new ShopEase: Priya browses, adds to cart, reaches checkout, sees 6 payment options — picks UPI, pays in 8 seconds, gets a digital receipt, and tells her friends. ShopEase keeps the sale and gains a loyal customer.',
    explanation: 'Map the improved checkout flow step by step. Every green "NEW" step is a requirement the BA must formally document in the BRD.',
    activity: 'Students compare As-Is Step 4 (COD only) with To-Be Step 4 (6 payment methods). How many new business rules did the BA introduce at that single step?',
    revealConcept: 'The To-Be Process is the BA\'s vision of how the business should work after the solution is live. It becomes the contract between business and development.',
    keyLearning: 'Every improvement in the To-Be process becomes a requirement. Every requirement must have a success metric.',
    quiz: {
      question: 'In the To-Be process, what happens if Priya\'s UPI payment fails?',
      answer: 'Her cart is preserved, she sees a clear error message with the failure reason, and she is offered the option to retry or switch to another payment method.',
    },
    faculty: {
      objective: 'Show how BA thinking moves from problem diagnosis to improved business design — not just feature lists.',
      notes: 'Connect every To-Be improvement directly to a pain point from Mission 4. Students should see that no improvement is invented — each one directly addresses something that caused Priya to leave.',
      questions: ['Which To-Be change has the highest impact on cart abandonment?', 'Which change most reduces operational cost for ShopEase?', 'Why does T+1 settlement matter to the Finance team?'],
      expectedAnswers: ['Adding 6 payment options — removes the root reason customers leave', 'Automated T+1 settlement — eliminates manual cash collection and COD returns', 'Finance can plan cash flow daily instead of waiting 3-5 days per COD cycle'],
      example: 'In the As-Is flow, ShopEase waits 3-5 days to know if a sale happened. In the To-Be flow, payment confirmation arrives in 5 seconds. That difference changes how the entire operations team works.',
      takeaway: 'The To-Be process is a business design document. The BA owns it — the developer builds from it.',
    },
  },

  'payment-simulator': {
    id: 'payment-simulator',
    mission: 'Mission 6B',
    title: 'Experience the Payment Portal',
    shortTitle: 'Payment Demo',
    completion: 65,
    time: '10 min',
    story: 'The portal is built. Priya visits ShopEase and now sees 6 payment options. As a BA, you must experience every option — not as a developer, but as Priya. What does she need to see? What happens when it fails? What does the confirmation look like?',
    explanation: 'Use the simulator as a customer first. Then switch to BA mode and document requirements for each payment method. Every field, every error, every success screen is a requirement you must formally define.',
    activity: 'Each student tests one payment method (UPI / Card / EMI / Wallet / BNPL / Net Banking) and writes 3 requirements: one for the input, one for failure handling, one for the success screen.',
    revealConcept: 'A BA who experiences the product writes better requirements than one who only reads meeting notes. Observation is a core BA skill.',
    keyLearning: 'Every element on a payment screen — field label, error message, timer, button state — is a requirement. If the BA doesn\'t define it, the developer will guess.',
    quiz: {
      question: 'If Priya enters a wrong UPI VPA, what should the system do?',
      answer: 'Display a specific error: "UPI ID not found. Please check and re-enter." — not a generic "payment failed." The BA must define the exact error message text.',
    },
    faculty: {
      objective: 'Build student intuition for requirement granularity by making them experience the product as a user first.',
      notes: 'MBA students often think requirements are high-level (e.g. "support UPI"). This exercise shows them that "support UPI" expands into 40+ individual requirements: VPA validation, PIN flow, timeout handling, success message, retry logic, reconciliation ID, etc.',
      questions: ['What inputs does the UPI screen need from Priya?', 'What should happen if the OTP expires before Priya enters it?', 'What must the success screen show for Priya to feel confident?'],
      expectedAnswers: ['UPI VPA field + Pay button + amount display', 'Auto-expire with option to request new OTP — cart preserved', 'Order ID, amount, payment method, estimated delivery date, receipt download'],
      example: 'A payment gateway gives you a transaction ID. The BA must define: where does it appear, in what format, for how long, and who gets it — customer and/or ShopEase backend.',
      takeaway: 'The difference between a good BA and a great BA is requirement depth. The simulator shows you what depth looks like.',
    },
  },

  brd: {
    id: 'brd',
    mission: 'Mission 7',
    title: 'Document Business Requirements',
    shortTitle: 'BRD',
    completion: 70,
    time: '7 min',
    story: 'The development team joins tomorrow. They have never met Priya. They don\'t know ShopEase is losing ₹64 Crore. They only have what the BA writes. The BRD is the only bridge between business understanding and technical execution.',
    explanation: 'Build the ShopEase Payment Portal BRD section by section — Objective, Scope, Stakeholders, Business Rules, Constraints, Assumptions, and Success Metrics.',
    activity: 'Ask: "If a developer reads only your BRD and builds the UPI flow — what is the most dangerous thing you might have forgotten to document?"',
    revealConcept: 'A BRD captures the business need, the scope boundary, the rules the solution must follow, and how success will be measured. It is owned by the BA.',
    keyLearning: 'Documentation is not bureaucracy. It is the difference between a team that builds the right thing and one that builds what they assumed.',
    quiz: {
      question: 'Is "the payment gateway must be fast" a good business rule for the BRD?',
      answer: 'No. A good business rule is: "UPI payment must reach success or failure status within 5 minutes. If no response in 5 minutes, the transaction must auto-expire and the customer must be notified with a retry option."',
    },
    faculty: {
      objective: 'Teach MBA students that documentation is a precision tool — not a formality — and that vague requirements cost money.',
      notes: 'Use the contrast: "payment should be fast" vs "UPI must complete in <5 minutes with auto-expire." Every vague requirement becomes a production incident or a client escalation.',
      questions: ['What happens if the BA writes "payment should work" and goes on leave?', 'Which BRD section protects the BA legally if the project is delayed?', 'How does the Scope section prevent scope creep?'],
      expectedAnswers: ['Developer guesses — outcome is unpredictable', 'Assumptions and Constraints section — it records what the BA was told and what was agreed', 'By explicitly listing what is OUT of scope — "loyalty points integration is not in scope for Phase 1"'],
      example: '"No-cost EMI to be funded by the bank partner, not ShopEase" is a critical business rule. If the BA forgets to document it, Finance gets surprised by a margin hit at month-end.',
      takeaway: 'A BRD reduces the cost of misunderstanding. Every hour spent writing a clear BRD saves 10 hours of rework in development.',
    },
  },

  'user-stories': {
    id: 'user-stories',
    mission: 'Mission 8',
    title: 'Write User Stories',
    shortTitle: 'User Stories',
    completion: 78,
    time: '6 min',
    story: 'The BRD tells the business what will be built. User Stories tell the development team what to build next — from Priya\'s point of view. The same requirement, written differently for a different audience.',
    explanation: 'Choose an actor, a goal, and a business benefit to generate a user story. Add acceptance notes. Download the full user story set for the ShopEase payment portal.',
    activity: 'Students write one story for Priya (UPI payment) and one for the Finance team (T+1 settlement report). Then compare — same system, completely different perspectives.',
    revealConcept: 'User Stories express who wants something, what they want, and why it creates business value. They are the unit of work in Agile delivery.',
    keyLearning: 'A good user story keeps everyone focused on the user and business value — not on technical implementation.',
    quiz: {
      question: 'What are the three parts of a user story?',
      answer: 'As a [actor], I want to [goal], so that [business value]. All three parts must be present — missing the "so that" makes it a feature request, not a user story.',
    },
    faculty: {
      objective: 'Bridge BRD and Agile delivery — show MBA students how the same requirement takes different forms for different audiences.',
      notes: 'Emphasise that user stories are not mini-requirements. They are conversation starters. The acceptance criteria (next mission) are what make them precise enough to build.',
      questions: ['Who is the actor for the story "receive T+1 settlement report"?', 'What is the business value of Priya receiving an instant payment receipt?', 'Can a user story exist without a business benefit?'],
      expectedAnswers: ['ShopEase Finance Team', 'She feels confident the order is placed — reducing support calls about order status', 'No — without "so that," the story has no business justification'],
      example: '"As Priya, I want to pay via UPI, so that I can complete my purchase in under 10 seconds without keeping cash ready." — This story connects customer convenience to ShopEase\'s cart abandonment reduction goal.',
      takeaway: 'User stories are written for people, not systems. Every story should make you think about a real person in a real moment.',
    },
  },

  'acceptance-criteria': {
    id: 'acceptance-criteria',
    mission: 'Mission 9',
    title: 'Define Acceptance Criteria',
    shortTitle: 'Acceptance Criteria',
    completion: 86,
    time: '5 min',
    story: 'The developer builds Priya\'s UPI payment feature. How does the BA know it was built correctly? Not by looking at the code — by checking the Acceptance Criteria written before a single line was coded.',
    explanation: 'Use Given-When-Then to define exactly what success looks like for each ShopEase payment scenario. Build criteria for UPI success, UPI failure, card EMI flow, and payment retry.',
    activity: 'Show two criteria: (A) "UPI should work" vs (B) "Given Priya enters a valid UPI VPA and clicks Pay, when the bank approves, then the order is created and a success screen appears within 5 seconds." Ask which one the QA team can test.',
    revealConcept: 'Acceptance Criteria define the exact conditions under which a user story is considered complete. They are the testing contract between BA, developer, and QA.',
    keyLearning: 'If it cannot be tested, it is not clear enough. Every acceptance criterion must be verifiable with a yes or no.',
    quiz: {
      question: 'Why is "the payment portal must be user-friendly" not a valid acceptance criterion?',
      answer: 'It cannot be tested objectively. A testable version would be: "The checkout flow must be completable in under 3 steps with no more than 2 form fields per screen."',
    },
    faculty: {
      objective: 'Teach precision thinking — the skill that separates a BA who gets respected from one who gets blamed.',
      notes: 'Frame acceptance criteria as protection — for the customer, for the business, and for the BA. A BA who writes clear AC cannot be blamed for a developer\'s misinterpretation.',
      questions: ['Who is responsible if the UPI flow fails UAT but the AC was vague?', 'How many acceptance criteria should a single user story have?', 'What happens to the AC after UAT passes?'],
      expectedAnswers: ['The BA shares responsibility for ambiguous AC', 'Typically 3-7 criteria covering happy path, failure path, and edge cases', 'They become the regression test cases for every future release'],
      example: 'Given Priya\'s UPI payment fails due to bank decline, when the failure screen appears, then her cart must be preserved, the failure reason must be shown, and a retry button must be visible within 2 seconds.',
      takeaway: 'Acceptance criteria are the BA\'s most precise output. Write them before development starts — not after.',
    },
  },

  uat: {
    id: 'uat',
    mission: 'Mission 10',
    title: 'Test the Payment Portal',
    shortTitle: 'UAT',
    completion: 94,
    time: '5 min',
    story: 'The payment portal is built. Before Priya uses it in production, business users must test every scenario the BA defined — not just the happy path. UAT is the BA\'s final quality gate.',
    explanation: 'Review UAT scenarios for each ShopEase payment method. Mark Pass / Fail / Pending. A failed scenario goes back to development with the BA\'s notes — not a verbal complaint.',
    activity: 'Teams pick one payment method and write one additional UAT scenario for an edge case not already covered — network failure during payment, duplicate transaction, or timeout.',
    revealConcept: 'UAT is the business validation of the solution. It confirms that the system meets the agreed requirements — not that it has no bugs (that is the QA team\'s job).',
    keyLearning: 'UAT tests business scenarios, not code. If the AC was clear, UAT is a formality. If the AC was vague, UAT becomes a battlefield.',
    quiz: {
      question: 'Priya pays via UPI, the app closes mid-transaction, and the bank deducts money but no order is created. Whose responsibility is this scenario?',
      answer: 'The BA\'s — this is a known edge case (payment-order mismatch) that must be covered in the BRD and acceptance criteria before development. The BA must define the reconciliation rule for this scenario.',
    },
    faculty: {
      objective: 'Show MBA students that UAT is a business governance activity — not a technical one — and that its quality depends entirely on the BA\'s earlier work.',
      notes: 'The connection is: good AC → easy UAT → confident go-live. Poor AC → disputed UAT → delayed launch → business loss. Students should feel the weight of earlier decisions landing here.',
      questions: ['If a UAT scenario fails, who decides whether to delay the go-live?', 'What must the BA document when a scenario fails?', 'How do UAT results affect future sprints?'],
      expectedAnswers: ['Business stakeholders — with BA\'s recommendation and impact assessment', 'Exact failure behaviour, expected vs actual result, defect severity, and recommended fix', 'Failed scenarios become defects in the next sprint backlog with priority set by BA'],
      example: 'Scenario 3: EMI payment. If this fails UAT, the BA checks: was the AC clear about the EMI schedule display? If yes, the developer is responsible. If the AC was silent on this, the BA shares the blame.',
      takeaway: 'UAT is where all earlier BA decisions — stakeholder analysis, process mapping, requirements, AC — are validated as a system. It is the moment of truth.',
    },
  },

  quiz: {
    id: 'quiz',
    mission: 'Knowledge Check',
    title: 'Test Your BA Thinking',
    shortTitle: 'Quiz',
    completion: 97,
    time: '4 min',
    story: 'Priya\'s journey — from abandoned COD cart to confident UPI payment — is now your case study. Can you connect every BA artifact back to a moment in her story?',
    explanation: 'Answer scenario-based questions that connect real ShopEase situations to BA terminology and decisions.',
    activity: 'Individual answers first (30 seconds), then reveal and discuss. Use wrong answers as teaching moments — not corrections.',
    revealConcept: 'Business Analysis is a connected discipline. Each artifact — BRD, user story, AC, UAT — is meaningless without the others.',
    keyLearning: 'BA concepts are only useful when applied to real problems. Priya\'s story was not decoration — it was the thread connecting every mission.',
    quiz: {
      question: 'Which BA artifact would have prevented ShopEase from going live without PCI-DSS certification?',
      answer: 'The BRD Constraints section — a well-written BRD would list "PCI-DSS certification must be obtained before go-live" as a mandatory constraint, making it visible to all stakeholders from day one.',
    },
    faculty: {
      objective: 'Consolidate learning by connecting quiz answers back to specific moments in the ShopEase case study.',
      notes: 'Do not just give the answer. After each question, ask: "Which mission covered this?" This reinforces that the quiz is a review — not new content.',
      questions: ['Which mission identified that PCI-DSS was missing?', 'Which artifact tells the developer what to build?', 'Which artifact tells the tester whether the build is correct?'],
      expectedAnswers: ['Mission 5 — Root Cause Analysis', 'User Stories + BRD', 'Acceptance Criteria'],
      example: 'A wrong answer like "the developer decides PCI-DSS" is a teaching moment: in a real project, the BA identifies this dependency in root cause analysis and documents it in the BRD before a single ticket is raised.',
      takeaway: 'Business Analysis is not a role. It is a way of thinking — structured, stakeholder-aware, and always connected to measurable business outcomes.',
    },
  },

  activity: {
    id: 'activity',
    mission: 'Group Activity',
    title: 'Present Your Recommendation',
    shortTitle: 'Activity',
    completion: 99,
    time: '2 min',
    story: 'ShopEase leadership is in the room. They want one recommendation — not a list of features, not a technical plan. A clear business recommendation from the BA team.',
    explanation: 'Use the activity checklist to structure your 60-second recommendation. Cover: problem, impact, root cause, proposed solution, and one success metric.',
    activity: 'Each group delivers a 60-second verbal recommendation. Class votes on which team gave the most BA-structured answer.',
    revealConcept: 'A BA communicates findings clearly to both business leaders and delivery teams. The language changes — the logic does not.',
    keyLearning: 'Analysis without communication is incomplete. The BA\'s final value is in making complex findings simple, credible, and actionable.',
    quiz: {
      question: 'What must a BA recommendation always include?',
      answer: 'The business problem, the measured impact, the root cause, the proposed solution, and at least one success metric. Without the metric, there is no way to confirm the recommendation worked.',
    },
    faculty: {
      objective: 'Build confidence in structured verbal communication — a core MBA and BA skill.',
      notes: 'Keep this fast. The goal is not a perfect presentation — it is the structure. Correct any answer that starts with "we should add a feature" instead of "the business problem is..."',
      questions: ['Which group led with the business problem?', 'Who mentioned a measurable success metric?', 'Whose recommendation would a CFO act on?'],
      expectedAnswers: ['Any group that started with ₹64 Cr loss context', 'Metric example: "reduce cart abandonment from 43% to 20% within 6 months"', 'The group that connected cost, solution, and measurable outcome'],
      example: '"ShopEase loses ₹64 Crore monthly because COD is the only payment option. Adding 6 digital payment methods will reduce cart abandonment by 50% within two quarters, recovering ₹32 Crore monthly. Success is measured by payment completion rate and COD return rate."',
      takeaway: 'A one-minute structured recommendation is more powerful than a 20-slide deck without a clear business case.',
    },
  },

  summary: {
    id: 'summary',
    mission: 'Mission Complete',
    title: 'ShopEase Saved',
    shortTitle: 'Summary',
    completion: 100,
    time: '2 min',
    story: 'Priya returns to ShopEase. She sees 6 payment options. She pays via UPI in 8 seconds. She gets an instant receipt. ShopEase gets a confirmed sale, T+1 settlement, and a loyal customer. The BA made this possible — not by coding, but by thinking clearly.',
    explanation: 'Review the complete BA roadmap — from business problem to UAT sign-off. Every step you took today is a skill you will use in every business transformation project.',
    activity: 'One-word round: each student says one BA skill they will carry into their career.',
    revealConcept: 'Business Analysis connects problem discovery, stakeholder understanding, process design, requirements documentation, and outcome validation into one structured discipline.',
    keyLearning: 'A Business Analyst\'s value is not in the tools they use — it is in the questions they ask, the clarity they create, and the problems they prevent.',
    quiz: {
      question: 'What is the final goal of Business Analysis?',
      answer: 'To deliver measurable business value by solving the right problem for the right stakeholders — through clear requirements, structured thinking, and validated outcomes.',
    },
    faculty: {
      objective: 'Close the 75-minute workshop with a clear, memorable mental model of what a Business Analyst does and why it matters.',
      notes: 'End on Priya. She started as an abandoned cart. She ends as a successful, satisfied customer. The BA created the conditions for that outcome — not by building anything, but by thinking clearly and documenting precisely.',
      questions: ['Which BA artifact had the most impact on this project?', 'What would have happened if ShopEase skipped the BA role entirely?', 'Which skill from today will you use first in your career?'],
      expectedAnswers: ['BRD or Acceptance Criteria — both prevent the most expensive mistakes', 'Developers would have built the wrong thing, compliance would have failed, timeline would have slipped', 'Stakeholder analysis, structured problem framing, or requirement documentation'],
      example: 'Without the BA: ShopEase adds a UPI button → webhook handling is missed → payments confirmed without money received → revenue loss worse than before. With the BA: every step is planned, validated, and measurable.',
      takeaway: 'Business Analysis is not a support function. It is a strategic function that determines whether a business transformation succeeds or fails.',
    },
  },
}
