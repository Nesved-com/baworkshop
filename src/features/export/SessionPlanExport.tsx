import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Presentation, X, ClipboardList } from 'lucide-react'
import { MISSION_META } from '../../data/missionWorkshop'

// 75-min ordered sections with display labels
const PLAN_SECTIONS = [
  { id: 'dashboard',            label: 'Introduction & Briefing',      icon: '🎯' },
  { id: 'business-problem',     label: 'Business Problem Analysis',     icon: '📊' },
  { id: 'stakeholders',         label: 'Stakeholder Analysis',          icon: '👥' },
  { id: 'as-is-process',        label: 'As-Is Process Mapping',         icon: '🗺️' },
  { id: 'pain-points',          label: 'Pain Point Identification',     icon: '⚠️' },
  { id: 'root-cause',           label: 'Root Cause Analysis',           icon: '🔍' },
  { id: 'to-be-process',        label: 'To-Be Process Design',          icon: '✨' },
  { id: 'payment-simulator',    label: 'Payment Portal Simulator',      icon: '💳' },
  { id: 'brd',                  label: 'BRD Documentation',             icon: '📄' },
  { id: 'user-stories',         label: 'User Stories Workshop',         icon: '📖' },
  { id: 'acceptance-criteria',  label: 'Acceptance Criteria Writing',   icon: '✅' },
  { id: 'uat',                  label: 'UAT Planning',                  icon: '🧪' },
  { id: 'quiz',                 label: 'Concept Check Quiz',            icon: '❓' },
  { id: 'activity',             label: 'Group Activity',                icon: '🏃' },
  { id: 'summary',              label: 'Summary & Takeaways',           icon: '🏆' },
] as const

function buildAudiencePlan(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Session Plan — Business Analysis Workshop · Madhuri Salunke</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
<style>
  /* ── Reset & base ── */
  @page { size: A4; margin: 14mm 16mm 14mm 16mm; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple:     #6d28d9;
    --purple-lt:  #7c3aed;
    --purple-bg:  #f5f3ff;
    --purple-mid: #ede9fe;
    --purple-bdr: #ddd6fe;
    --ink:        #0f172a;
    --ink-2:      #1e293b;
    --ink-3:      #334155;
    --muted:      #64748b;
    --muted-lt:   #94a3b8;
    --border:     #e2e8f0;
    --surface:    #f8fafc;
    --white:      #ffffff;
  }

  body {
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    color: var(--ink-2);
    font-size: 11.5px;
    line-height: 1.6;
    background: var(--white);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Page wrapper ── */
  .page { max-width: 720px; margin: 0 auto; padding: 8px 0 24px; }

  /* ════════════════════════════════════════
     HEADER
  ════════════════════════════════════════ */
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 18px;
    margin-bottom: 22px;
    border-bottom: 2px solid var(--purple-lt);
    position: relative;
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    width: 60px; height: 2px;
    background: var(--purple-lt);
    opacity: 0.4;
  }

  .header-eyebrow {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--purple-lt);
    margin-bottom: 5px;
  }
  .header-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--ink);
    line-height: 1.2;
    margin-bottom: 6px;
  }
  .header-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }
  .meta-item {
    font-size: 10.5px;
    color: var(--muted);
    font-weight: 500;
  }
  .meta-dot { color: var(--border); margin: 0 2px; }

  .header-right { text-align: right; flex-shrink: 0; }
  .duration-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--purple-lt);
    color: var(--white);
    font-size: 12px;
    font-weight: 800;
    padding: 5px 14px;
    border-radius: 24px;
    margin-bottom: 6px;
    letter-spacing: 0.02em;
  }
  .audience-tag {
    font-size: 10px;
    color: var(--muted);
    font-weight: 500;
  }

  /* ════════════════════════════════════════
     CASE STUDY BANNER
  ════════════════════════════════════════ */
  .case-banner {
    background: linear-gradient(135deg, var(--purple-bg) 0%, var(--purple-mid) 100%);
    border: 1px solid var(--purple-bdr);
    border-left: 4px solid var(--purple-lt);
    border-radius: 10px;
    padding: 14px 18px;
    margin-bottom: 22px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .case-emoji {
    font-size: 26px;
    flex-shrink: 0;
    margin-top: 1px;
    line-height: 1;
  }
  .case-body {}
  .case-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--purple-lt);
    margin-bottom: 3px;
  }
  .case-title {
    font-size: 12.5px;
    font-weight: 700;
    color: #4c1d95;
    margin-bottom: 5px;
    line-height: 1.35;
  }
  .case-desc {
    font-size: 11px;
    color: #5b21b6;
    line-height: 1.55;
  }
  .case-desc strong { font-weight: 700; color: #3b0764; }

  /* ════════════════════════════════════════
     SECTION LABEL
  ════════════════════════════════════════ */
  .section-label {
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--purple-lt);
    margin-bottom: 10px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ════════════════════════════════════════
     LEARNING OUTCOMES
  ════════════════════════════════════════ */
  .outcomes-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7px;
    margin-bottom: 22px;
  }
  .outcome-card {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 9px 12px;
  }
  .outcome-num {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--purple-lt);
    color: var(--white);
    font-size: 9.5px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .outcome-text {
    font-size: 11px;
    color: var(--ink-3);
    line-height: 1.5;
    font-weight: 500;
  }

  /* ════════════════════════════════════════
     SESSION TIMELINE TABLE
  ════════════════════════════════════════ */
  .timeline-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-bottom: 22px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border);
    font-size: 11px;
  }
  .timeline-table thead tr th {
    background: var(--purple-lt);
    color: var(--white);
    padding: 9px 12px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .timeline-table tbody tr:nth-child(odd)  { background: var(--white); }
  .timeline-table tbody tr:nth-child(even) { background: var(--surface); }
  .timeline-table tbody tr:last-child td:first-child { border-radius: 0 0 0 10px; }
  .timeline-table tbody tr:last-child td:last-child  { border-radius: 0 0 10px 0; }

  .timeline-table td {
    padding: 9px 12px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }
  .timeline-table tbody tr:last-child td { border-bottom: none; }

  .t-time  { font-weight: 800; color: var(--purple-lt); white-space: nowrap; font-size: 10.5px; font-variant-numeric: tabular-nums; }
  .t-phase { font-weight: 700; color: var(--ink); font-size: 11px; white-space: nowrap; }
  .t-desc  { color: var(--ink-3); line-height: 1.55; }
  .t-desc em { color: var(--ink-2); font-style: italic; }

  .pill {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 9.5px;
    font-weight: 700;
    white-space: nowrap;
    letter-spacing: 0.02em;
  }
  .pill-discuss  { background: #dbeafe; color: #1e40af; }
  .pill-activity { background: #d1fae5; color: #065f46; }
  .pill-roleplay { background: #fce7f3; color: #9d174d; }
  .pill-sim      { background: var(--purple-mid); color: #5b21b6; }
  .pill-demo     { background: #fef3c7; color: #92400e; }
  .pill-writing  { background: #e0f2fe; color: #0369a1; }
  .pill-group    { background: #ecfdf5; color: #047857; }
  .pill-quiz     { background: #fee2e2; color: #991b1b; }
  .pill-reflect  { background: var(--surface); color: var(--ink-3); border: 1px solid var(--border); }

  /* ════════════════════════════════════════
     TEACHING APPROACH
  ════════════════════════════════════════ */
  .approach-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 22px;
  }
  .approach-card {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 13px;
    background: var(--white);
    position: relative;
    overflow: hidden;
  }
  .approach-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--purple-lt), #a78bfa);
  }
  .approach-icon { font-size: 17px; margin-bottom: 6px; display: block; }
  .approach-title {
    font-size: 11px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 4px;
    line-height: 1.3;
  }
  .approach-desc {
    font-size: 10.5px;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ════════════════════════════════════════
     KEY TAKEAWAY BOX
  ════════════════════════════════════════ */
  .takeaway {
    background: var(--purple-bg);
    border: 1px solid var(--purple-bdr);
    border-radius: 10px;
    padding: 13px 16px;
    margin-bottom: 22px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .takeaway-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .takeaway-text {
    font-size: 11.5px;
    color: #3b0764;
    line-height: 1.6;
    font-style: italic;
    font-weight: 500;
  }
  .takeaway-text strong { font-style: normal; font-weight: 700; }

  /* ════════════════════════════════════════
     FOOTER
  ════════════════════════════════════════ */
  .footer {
    border-top: 1px solid var(--border);
    padding-top: 10px;
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-left  { font-size: 10px; font-weight: 600; color: var(--muted); }
  .footer-right { font-size: 10px; color: var(--muted-lt); }
  .footer-dot   { display: inline-block; width: 3px; height: 3px; border-radius: 50%; background: var(--purple-lt); margin: 0 6px; vertical-align: middle; }

  @media print {
    body  { font-size: 11px; }
    .page { padding: 0; }
    .no-print { display: none !important; }
  }
</style>
</head>
<body>
<div class="page">

<!-- ════ HEADER ════ -->
<header class="header">
  <div>
    <p class="header-eyebrow">MBA Guest Session &nbsp;·&nbsp; Business Analysis</p>
    <h1 class="header-title">Business Analyst<br>Workshop — Session Plan</h1>
    <div class="header-meta">
      <span class="meta-item">👩‍💼 Madhuri Salunke</span>
      <span class="meta-dot">·</span>
      <span class="meta-item">Senior Product Owner, Vois</span>
      <span class="meta-dot">·</span>
      <span class="meta-item">IIBA-CBAP Trained</span>
    </div>
  </div>
  <div class="header-right">
    <div class="duration-badge">⏱ 75 Minutes</div>
    <div class="audience-tag">MBA Students &nbsp;·&nbsp; Batch 30–60</div>
  </div>
</header>

<!-- ════ CASE STUDY ════ -->
<div class="case-banner">
  <div class="case-emoji">🛒</div>
  <div class="case-body">
    <p class="case-label">Real-Life Case Study</p>
    <p class="case-title">ShopEase — "Why is this e-commerce company losing ₹64 Crore every month?"</p>
    <p class="case-desc">
      ShopEase is a fast-growing Indian e-commerce platform that accepts only Cash on Delivery.
      Customer Priya wants to buy a ₹12,000 appliance — no digital payment option exists, so she leaves and buys from Amazon.
      This session puts <strong>students in the role of Business Analysts</strong> hired to investigate the problem and build
      a 6-method digital payment portal — applying every BA concept (stakeholders, BRD, user stories, UAT) to this live scenario.
    </p>
  </div>
</div>

<!-- ════ LEARNING OUTCOMES ════ -->
<p class="section-label">Learning Outcomes</p>
<div class="outcomes-grid">
  <div class="outcome-card"><div class="outcome-num">1</div><p class="outcome-text">Define a Business Problem Statement using real revenue data and customer behaviour metrics</p></div>
  <div class="outcome-card"><div class="outcome-num">2</div><p class="outcome-text">Identify and map stakeholders across a real payment ecosystem (Priya, banks, NPCI, RBI, dev team)</p></div>
  <div class="outcome-card"><div class="outcome-num">3</div><p class="outcome-text">Write a BRD, User Story, and Acceptance Criteria for a live digital payment feature</p></div>
  <div class="outcome-card"><div class="outcome-num">4</div><p class="outcome-text">Design UAT scenarios that cover success, failure, and edge-case payment paths</p></div>
  <div class="outcome-card"><div class="outcome-num">5</div><p class="outcome-text">Explain how a BA bridges business problems and technical delivery teams</p></div>
  <div class="outcome-card"><div class="outcome-num">6</div><p class="outcome-text">Apply BA methodology to any real industry problem — not just e-commerce</p></div>
</div>

<!-- ════ SESSION TIMELINE ════ -->
<p class="section-label">Session Timeline</p>
<table class="timeline-table">
  <thead>
    <tr>
      <th style="width:58px;">Time</th>
      <th style="width:158px;">Phase</th>
      <th>What Students Do</th>
      <th style="width:82px; text-align:center;">Method</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="t-time">0 – 5 min</td>
      <td class="t-phase">🎯 Hook: Meet Priya</td>
      <td class="t-desc">Hear Priya's story — she abandons a ₹12,000 order because ShopEase has no digital payment. Instructor asks <em>"Has this happened to you?"</em> Hands go up. Students are immediately invested in solving a problem they've lived.</td>
      <td style="text-align:center;"><span class="pill pill-discuss">Discussion</span></td>
    </tr>
    <tr>
      <td class="t-time">5 – 15 min</td>
      <td class="t-phase">📊 Business Problem</td>
      <td class="t-desc">See the numbers: 86,000 cart abandonments/month, 34% COD return rate, ₹64 Crore/month loss. <strong>Write their own Business Problem Statement</strong> — then compare it with the formal BA version. Instantly see the difference between casual language and structured BA thinking.</td>
      <td style="text-align:center;"><span class="pill pill-activity">Activity</span></td>
    </tr>
    <tr>
      <td class="t-time">15 – 25 min</td>
      <td class="t-phase">👥 Stakeholder Mapping</td>
      <td class="t-desc"><strong>Map 8 stakeholders</strong> — from Priya to NPCI to RBI. Role-play: one student speaks as Finance, another as Dev Team. They discover conflicting requirements first-hand — the core BA challenge no lecture can teach.</td>
      <td style="text-align:center;"><span class="pill pill-roleplay">Role-Play</span></td>
    </tr>
    <tr>
      <td class="t-time">25 – 35 min</td>
      <td class="t-phase">🗺️ As-Is → To-Be</td>
      <td class="t-desc">View the COD-only flow vs. the future 6-method payment portal side by side. <strong>Identify the process gaps</strong> and understand why mapping comes before writing any requirement — a lesson that prevents real-world rework.</td>
      <td style="text-align:center;"><span class="pill pill-demo">Demo</span></td>
    </tr>
    <tr>
      <td class="t-time">35 – 45 min</td>
      <td class="t-phase">💳 Live Simulator</td>
      <td class="t-desc">Experience a live payment flow simulator — instructor taps each step (App → Gateway → Bank → Callback → Notification) one by one. A <strong>deliberate failure scenario</strong> is triggered: students must define what the BA must specify — reconciliation, auto-refund, and customer notification.</td>
      <td style="text-align:center;"><span class="pill pill-sim">Simulator</span></td>
    </tr>
    <tr>
      <td class="t-time">45 – 55 min</td>
      <td class="t-phase">📄 BRD + User Stories</td>
      <td class="t-desc"><strong>Write their first User Story:</strong> <em>"As Priya, I want to pay via UPI so that I can complete my purchase in under 10 seconds."</em> Then add Acceptance Criteria — the testable conditions that define "done." Instructor shows the most common mistakes made at this stage.</td>
      <td style="text-align:center;"><span class="pill pill-writing">Writing</span></td>
    </tr>
    <tr>
      <td class="t-time">55 – 65 min</td>
      <td class="t-phase">🧪 UAT Scenarios</td>
      <td class="t-desc"><strong>Groups write UAT test cases</strong> covering success, failure, and edge cases. Students discover UAT is not "does it work?" — it is validation that the business need is fully met. A BA's Acceptance Criteria quality directly determines UAT quality.</td>
      <td style="text-align:center;"><span class="pill pill-group">Group Work</span></td>
    </tr>
    <tr>
      <td class="t-time">65 – 70 min</td>
      <td class="t-phase">❓ Concept Quiz</td>
      <td class="t-desc">Quick-fire quiz using a <strong>new scenario</strong> (not ShopEase). Tests whether BA skills transfer — not just recall of the case study. Students apply what they've learned to an unfamiliar context.</td>
      <td style="text-align:center;"><span class="pill pill-quiz">Quiz</span></td>
    </tr>
    <tr>
      <td class="t-time">70 – 75 min</td>
      <td class="t-phase">🏆 Takeaway & Q&A</td>
      <td class="t-desc">One sentence each: <em>"The one thing I'm taking from today is…"</em> Instructor connects to career relevance — where BAs work, what they earn, and what separates a great BA from an average one. Open Q&A.</td>
      <td style="text-align:center;"><span class="pill pill-reflect">Reflection</span></td>
    </tr>
  </tbody>
</table>

<!-- ════ TEACHING APPROACH ════ -->
<p class="section-label">Teaching Approach</p>
<div class="approach-grid">
  <div class="approach-card">
    <span class="approach-icon">🎭</span>
    <p class="approach-title">Case-Based Learning</p>
    <p class="approach-desc">Every concept is introduced through ShopEase, not through theory. Students never hear definitions — they discover them by doing.</p>
  </div>
  <div class="approach-card">
    <span class="approach-icon">💻</span>
    <p class="approach-title">Interactive Digital Tools</p>
    <p class="approach-desc">A custom BA simulator lets students experience the live payment flow, write artifacts, and see real-time output — not just listen to slides.</p>
  </div>
  <div class="approach-card">
    <span class="approach-icon">🙋</span>
    <p class="approach-title">Student-Led Discovery</p>
    <p class="approach-desc">Students write the Problem Statement before it's revealed. They map stakeholders before the instructor. They discover gaps themselves.</p>
  </div>
  <div class="approach-card">
    <span class="approach-icon">⚡</span>
    <p class="approach-title">Failure as Teaching Moment</p>
    <p class="approach-desc">A deliberate failure in the payment simulator shows what happens when a BA misses a requirement — through experience, not lecture.</p>
  </div>
  <div class="approach-card">
    <span class="approach-icon">🏭</span>
    <p class="approach-title">Industry Relevance</p>
    <p class="approach-desc">ShopEase mirrors real Indian fintech challenges: UPI adoption, RBI compliance, PCI-DSS, COD return rates — MBA students recognise these from business news.</p>
  </div>
  <div class="approach-card">
    <span class="approach-icon">🔄</span>
    <p class="approach-title">Full BA Lifecycle</p>
    <p class="approach-desc">In 75 minutes, students complete the entire BA workflow: Problem → Stakeholders → Process → Requirements → UAT. One complete mental model.</p>
  </div>
</div>

<!-- ════ KEY TAKEAWAY ════ -->
<div class="takeaway">
  <span class="takeaway-icon">💡</span>
  <p class="takeaway-text">
    <strong>Core Message:</strong> A Business Analyst does not build the solution.
    A Business Analyst ensures the <em>right</em> solution gets built — for the right people — with measurable outcomes.
    Priya started as an abandoned cart statistic. She ends as a confirmed sale.
    The BA made that possible — not by writing code, but by thinking clearly and documenting precisely.
  </p>
</div>

<!-- ════ FOOTER ════ -->
<footer class="footer">
  <span class="footer-left">Madhuri Salunke <span class="footer-dot"></span> Senior Product Owner, Vois <span class="footer-dot"></span> IIBA-CBAP Trained</span>
  <span class="footer-right">75 Min &nbsp;·&nbsp; MBA Level &nbsp;·&nbsp; Case Study: ShopEase Payment Portal</span>
</footer>

</div><!-- /page -->
</body>
</html>`
}

function buildHtmlDoc(): string {
  const rows = PLAN_SECTIONS.map(s => {
    const m = MISSION_META[s.id as keyof typeof MISSION_META]
    return `
      <tr>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:600;white-space:nowrap;">${s.icon} ${s.label}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;text-align:center;font-weight:700;color:#6d28d9;">${m.time}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;">${m.faculty.objective}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;">${m.activity}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;">${m.keyLearning}</td>
      </tr>`
  }).join('')

  const sections = PLAN_SECTIONS.map(s => {
    const m = MISSION_META[s.id as keyof typeof MISSION_META]
    return `
      <div style="page-break-inside:avoid;margin-bottom:28px;border-left:4px solid #7c3aed;padding-left:16px;">
        <h3 style="margin:0 0 4px;color:#1e293b;font-size:16px;">${s.icon} ${s.label} <span style="color:#6d28d9;font-weight:400;font-size:14px;">(${m.time})</span></h3>
        <p style="margin:6px 0;color:#334155;font-size:13px;"><strong>Objective:</strong> ${m.faculty.objective}</p>
        <p style="margin:6px 0;color:#334155;font-size:13px;"><strong>Explanation for Students:</strong> ${m.explanation}</p>
        <p style="margin:6px 0;color:#334155;font-size:13px;"><strong>Activity:</strong> ${m.activity}</p>
        <p style="margin:6px 0;color:#334155;font-size:13px;"><strong>Speaker Notes:</strong> ${m.faculty.notes}</p>
        <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;">
          ${m.faculty.questions.map(q => `<span style="background:#f5f3ff;border:1px solid #ddd6fe;color:#5b21b6;padding:3px 8px;border-radius:6px;font-size:12px;">Q: ${q}</span>`).join('')}
        </div>
        <p style="margin:8px 0 0;color:#0f766e;font-size:13px;"><strong>Key Takeaway:</strong> ${m.keyLearning}</p>
        <p style="margin:4px 0;color:#475569;font-size:12px;background:#f8fafc;padding:6px 10px;border-radius:6px;"><strong>Quiz:</strong> ${m.quiz.question}<br><em>Answer: ${m.quiz.answer}</em></p>
      </div>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ShopEase BA Workshop — 75-Minute Session Plan</title>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 0; padding: 32px; max-width: 900px; margin: auto; }
  h1 { color: #1e293b; font-size: 26px; margin-bottom: 4px; }
  h2 { color: #7c3aed; font-size: 18px; margin: 32px 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { background: #7c3aed; color: white; padding: 10px 12px; text-align: left; }
  tr:nth-child(even) { background: #fafafa; }
  @media print { body { padding: 16px; } h2 { page-break-before: always; } h2:first-of-type { page-break-before: avoid; } }
</style>
</head>
<body>
<h1>📋 ShopEase — Business Analyst Workshop</h1>
<p style="color:#475569;margin:0 0 6px;">Instructor: Madhuri Salunke &nbsp;|&nbsp; Duration: 75 Minutes &nbsp;|&nbsp; Audience: MBA Students</p>
<p style="color:#64748b;font-size:13px;margin:0 0 24px;background:#f5f3ff;padding:12px 16px;border-radius:8px;border-left:4px solid #7c3aed;">
  <strong>Case Study:</strong> ShopEase, an Indian e-commerce company, has only Cash on Delivery and is losing ₹64 Crore/month.
  Students act as Business Analysts hired to design a 6-method digital payment portal. They produce real BA artifacts:
  BRD → User Stories → Acceptance Criteria → UAT Plan.
</p>

<h2>⏱️ Session Timeline at a Glance</h2>
<table>
  <thead>
    <tr>
      <th>Module</th><th>Time</th><th>Teaching Objective</th><th>Student Activity</th><th>Key Takeaway</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>

<h2>📚 Detailed Module Guide</h2>
${sections}

<p style="margin-top:40px;color:#94a3b8;font-size:11px;text-align:center;">
  Generated by BA Workshop App · ShopEase Case Study · © Madhuri Salunke
</p>
</body>
</html>`
}

function buildPptxLike(): string {
  // Returns an HTML file styled like slides — can be printed as PDF or used as reference
  const slides = PLAN_SECTIONS.map((s, i) => {
    const m = MISSION_META[s.id as keyof typeof MISSION_META]
    return `
    <div class="slide">
      <div class="slide-header">
        <span class="slide-num">${i + 1} / ${PLAN_SECTIONS.length}</span>
        <span class="badge">${m.time}</span>
      </div>
      <div class="slide-icon">${s.icon}</div>
      <h2>${s.label}</h2>
      <p class="obj"><strong>Objective:</strong> ${m.faculty.objective}</p>
      <div class="divider"></div>
      <p class="body"><strong>💬 Say to students:</strong> ${m.explanation}</p>
      <p class="body"><strong>✏️ Activity:</strong> ${m.activity}</p>
      <div class="takeaway">🏆 ${m.keyLearning}</div>
      <div class="questions">
        ${m.faculty.questions.slice(0, 2).map(q => `<span>❓ ${q}</span>`).join('')}
      </div>
    </div>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ShopEase BA Workshop — Slide Deck</title>
<style>
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f1f5f9; }
  .slide {
    width: 270mm; height: 185mm; background: white; margin: 8mm auto;
    padding: 12mm 16mm; display: flex; flex-direction: column; justify-content: flex-start;
    border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    border-top: 6px solid #7c3aed; page-break-after: always; overflow: hidden;
  }
  .slide-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6mm; }
  .slide-num { color: #94a3b8; font-size: 11px; }
  .badge { background: #7c3aed; color: white; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .slide-icon { font-size: 32px; margin-bottom: 3mm; }
  h2 { color: #1e293b; font-size: 22px; margin-bottom: 4mm; }
  .obj { color: #475569; font-size: 12px; margin-bottom: 3mm; }
  .divider { height: 1px; background: #e2e8f0; margin: 3mm 0; }
  .body { color: #334155; font-size: 11px; margin-bottom: 2mm; line-height: 1.5; }
  .takeaway { background: #f5f3ff; border-left: 3px solid #7c3aed; color: #3730a3; padding: 6px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; margin: 3mm 0; }
  .questions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 3mm; }
  .questions span { background: #fef3c7; border: 1px solid #fde68a; color: #92400e; padding: 3px 8px; border-radius: 4px; font-size: 10px; }
  .cover { background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; }
  .cover h1 { font-size: 32px; color: white; margin-bottom: 4mm; }
  .cover p { color: rgba(255,255,255,0.85); font-size: 14px; }
  @media print { body { background: white; } .slide { margin: 0; box-shadow: none; border-radius: 0; } }
</style>
</head>
<body>
<div class="slide cover" style="justify-content:center;align-items:flex-start;">
  <div style="font-size:48px;margin-bottom:6mm;">🛒</div>
  <h1>ShopEase BA Workshop</h1>
  <p style="font-size:18px;margin-bottom:3mm;">COD to Digital Payment Portal</p>
  <p>Instructor: Madhuri Salunke &nbsp;·&nbsp; 75 Minutes &nbsp;·&nbsp; MBA Students</p>
  <div style="margin-top:8mm;background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 14px;">
    <p style="font-size:12px;color:rgba(255,255,255,0.9);">Students role-play as Business Analysts hired to recover ₹64 Crore/month for ShopEase by designing a 6-method digital payment portal.</p>
  </div>
</div>
${slides}
</body>
</html>`
}

interface Props { onClose: () => void }

export function SessionPlanExport({ onClose }: Props) {
  const [downloading, setDownloading] = useState<string | null>(null)

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  const handlePdf = () => {
    setDownloading('pdf')
    const html = buildHtmlDoc()
    const win = window.open('', '_blank')
    if (win) {
      win.document.write(html)
      win.document.close()
      setTimeout(() => { win.print(); setDownloading(null) }, 600)
    } else {
      setDownloading(null)
    }
  }

  const handleAudiencePlan = () => {
    setDownloading('audience')
    const win = window.open('', '_blank')
    if (win) {
      win.document.write(buildAudiencePlan())
      win.document.close()
      setTimeout(() => { win.print(); setDownloading(null) }, 600)
    } else {
      downloadFile(buildAudiencePlan(), 'Session-Plan-Madhuri-Salunke.html', 'text/html')
      setDownloading(null)
    }
  }

  const handleGoogleDoc = () => {
    setDownloading('doc')
    downloadFile(buildHtmlDoc(), 'ShopEase-BA-Workshop-Session-Plan.html', 'text/html')
    setTimeout(() => setDownloading(null), 800)
  }

  const handlePpt = () => {
    setDownloading('ppt')
    downloadFile(buildPptxLike(), 'ShopEase-BA-Workshop-Slide-Deck.html', 'text/html')
    setTimeout(() => setDownloading(null), 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Download Session Plan</h2>
            <p className="text-sm text-gray-500 mt-0.5">75-min MBA workshop · ShopEase case study</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Download buttons */}
        <div className="space-y-3">

          {/* ── Audience / Interview plan ── */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleAudiencePlan}
            disabled={!!downloading}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 border-violet-300 bg-violet-50 hover:bg-violet-100 transition-all group disabled:opacity-60"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-violet-900">Session Plan for College / Interview</p>
                <span className="px-1.5 py-0.5 rounded bg-violet-600 text-white text-[9px] font-bold">RECOMMENDED</span>
              </div>
              <p className="text-xs text-violet-700">1-page clean plan · Learning outcomes · Timeline · Teaching approach</p>
            </div>
            <Download className="w-4 h-4 text-violet-400 group-hover:text-violet-600 transition-colors" />
          </motion.button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">detailed exports</span></div>
          </div>

          {/* PDF */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handlePdf}
            disabled={!!downloading}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all group disabled:opacity-60"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-rose-800">Download as PDF</p>
              <p className="text-xs text-rose-600">Opens print dialog — save as PDF</p>
            </div>
            <Download className="w-4 h-4 text-rose-400 group-hover:text-rose-600 transition-colors" />
          </motion.button>

          {/* Google Doc / Word */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleGoogleDoc}
            disabled={!!downloading}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 transition-all group disabled:opacity-60"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-blue-800">Download for Google Docs / Word</p>
              <p className="text-xs text-blue-600">Open the .html file in Google Docs or Word</p>
            </div>
            <Download className="w-4 h-4 text-blue-400 group-hover:text-blue-600 transition-colors" />
          </motion.button>

          {/* PPT */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handlePpt}
            disabled={!!downloading}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 transition-all group disabled:opacity-60"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
              <Presentation className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-orange-800">Download Slide Deck</p>
              <p className="text-xs text-orange-600">15 slide-format pages · Print or open in browser</p>
            </div>
            <Download className="w-4 h-4 text-orange-400 group-hover:text-orange-600 transition-colors" />
          </motion.button>
        </div>

        <p className="text-[11px] text-gray-400 text-center mt-4">
          Tip: For Google Docs — open the downloaded .html file, then File → Save as Google Doc
        </p>
      </motion.div>
    </motion.div>
  )
}
