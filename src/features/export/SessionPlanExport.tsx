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
<title>Session Plan — Business Analysis Workshop</title>
<style>
  @page { size: A4; margin: 18mm 20mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; font-size: 13px; line-height: 1.55; background: white; }

  /* ── Header ── */
  .header { border-bottom: 3px solid #7c3aed; padding-bottom: 14px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
  .header-left h1 { font-size: 22px; font-weight: 800; color: #1e293b; margin-bottom: 3px; }
  .header-left p  { color: #64748b; font-size: 12px; }
  .header-right   { text-align: right; }
  .badge { display: inline-block; background: #7c3aed; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-bottom: 4px; }
  .meta  { font-size: 11px; color: #64748b; }

  /* ── Case study banner ── */
  .case-banner { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border: 1px solid #ddd6fe; border-left: 4px solid #7c3aed; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; display: flex; gap: 16px; align-items: flex-start; }
  .case-banner .emoji { font-size: 28px; flex-shrink: 0; }
  .case-banner h3 { font-size: 13px; font-weight: 700; color: #4c1d95; margin-bottom: 3px; }
  .case-banner p  { font-size: 12px; color: #5b21b6; line-height: 1.5; }

  /* ── Learning outcomes ── */
  .outcomes { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
  .outcome-item { display: flex; align-items: flex-start; gap: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px; }
  .outcome-dot { width: 18px; height: 18px; border-radius: 50%; background: #7c3aed; color: white; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .outcome-item p { font-size: 12px; color: #334155; }

  /* ── Section header ── */
  h2 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #7c3aed; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid #e2e8f0; }

  /* ── Timeline table ── */
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
  thead th { background: #7c3aed; color: white; padding: 8px 10px; text-align: left; font-weight: 600; }
  thead th:first-child { border-radius: 6px 0 0 0; }
  thead th:last-child  { border-radius: 0 6px 0 0; }
  tbody tr:nth-child(even) { background: #fafafa; }
  tbody td { padding: 7px 10px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
  .time-cell { font-weight: 700; color: #7c3aed; white-space: nowrap; }
  .phase-cell { font-weight: 600; color: #1e293b; }
  .method-pill { display: inline-block; padding: 2px 7px; border-radius: 10px; font-size: 10px; font-weight: 600; white-space: nowrap; }
  .pill-discuss  { background: #dbeafe; color: #1d4ed8; }
  .pill-activity { background: #d1fae5; color: #065f46; }
  .pill-sim      { background: #ede9fe; color: #5b21b6; }
  .pill-demo     { background: #fef3c7; color: #92400e; }
  .pill-quiz     { background: #fee2e2; color: #991b1b; }
  .pill-reflect  { background: #f1f5f9; color: #334155; }

  /* ── Teaching approach ── */
  .approach-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
  .approach-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; background: white; }
  .approach-card .icon { font-size: 18px; margin-bottom: 5px; }
  .approach-card h4 { font-size: 11px; font-weight: 700; color: #1e293b; margin-bottom: 3px; }
  .approach-card p  { font-size: 11px; color: #64748b; line-height: 1.45; }

  /* ── Footer ── */
  .footer { border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 8px; display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; }

  @media print { body { font-size: 12px; } .no-print { display: none; } }
</style>
</head>
<body>

<!-- ── HEADER ── -->
<div class="header">
  <div class="header-left">
    <h1>Business Analysis Workshop — Session Plan</h1>
    <p>Instructor: Madhuri Salunke &nbsp;·&nbsp; Subject: Business Analysis &nbsp;·&nbsp; Level: MBA</p>
  </div>
  <div class="header-right">
    <div class="badge">75 Minutes</div>
    <div class="meta">Audience: MBA Students (Batch Size: 30–60)</div>
  </div>
</div>

<!-- ── CASE STUDY BANNER ── -->
<div class="case-banner">
  <div class="emoji">🛒</div>
  <div>
    <h3>Real-Life Case Study: ShopEase — "Why is this e-commerce company losing ₹64 Crore every month?"</h3>
    <p>
      ShopEase is a fast-growing Indian e-commerce platform that accepts only Cash on Delivery.
      A customer named Priya wants to buy a ₹12,000 kitchen appliance — but there's no digital payment option.
      She leaves and buys from Amazon. This session puts <strong>students in the role of Business Analysts</strong> hired
      to investigate the problem and design a solution: a 6-method digital payment portal.
      Every concept taught — stakeholders, BRD, user stories, UAT — is applied directly to this live scenario.
    </p>
  </div>
</div>

<!-- ── LEARNING OUTCOMES ── -->
<h2>Learning Outcomes — By end of session, students will be able to:</h2>
<div class="outcomes">
  <div class="outcome-item"><div class="outcome-dot">1</div><p>Define a Business Problem Statement using real data (revenue loss, abandonment rate)</p></div>
  <div class="outcome-item"><div class="outcome-dot">2</div><p>Identify and map stakeholders across a real payment ecosystem (customers, banks, RBI, dev team)</p></div>
  <div class="outcome-item"><div class="outcome-dot">3</div><p>Write a BRD, User Story, and Acceptance Criteria for a digital feature</p></div>
  <div class="outcome-item"><div class="outcome-dot">4</div><p>Design UAT scenarios that test both success and failure paths</p></div>
  <div class="outcome-item"><div class="outcome-dot">5</div><p>Explain how a BA bridges business problems and technical delivery</p></div>
  <div class="outcome-item"><div class="outcome-dot">6</div><p>Apply BA methodology to any real industry problem, not just e-commerce</p></div>
</div>

<!-- ── SESSION TIMELINE ── -->
<h2>Session Timeline</h2>
<table>
  <thead>
    <tr>
      <th style="width:52px;">Time</th>
      <th style="width:160px;">Phase</th>
      <th>What Happens</th>
      <th style="width:90px;">Method</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="time-cell">0–5 min</td>
      <td class="phase-cell">🎯 Hook: Meet Priya</td>
      <td>Students hear Priya's story — she abandons her ₹12,000 order because ShopEase has no digital payment. Instructor asks: <em>"Has this happened to you?"</em> — hands go up. Students are now emotionally invested in solving it.</td>
      <td><span class="method-pill pill-discuss">Discussion</span></td>
    </tr>
    <tr>
      <td class="time-cell">5–15 min</td>
      <td class="phase-cell">📊 Business Problem</td>
      <td>Students see the data: 86,000 cart abandonments/month, 34% COD return rate, ₹64 Crore/month loss. They write a one-sentence Business Problem Statement — then compare with the formal BA version. Students see the difference between casual language and structured BA thinking.</td>
      <td><span class="method-pill pill-activity">Activity</span></td>
    </tr>
    <tr>
      <td class="time-cell">15–25 min</td>
      <td class="phase-cell">👥 Stakeholder Mapping</td>
      <td>Who has a stake in ShopEase's payment portal? Students map 8 stakeholders — from Priya to NPCI to RBI. Role-play: one student speaks as Finance team, one as Dev team. They discover conflicting requirements — a core BA challenge.</td>
      <td><span class="method-pill pill-activity">Role-Play</span></td>
    </tr>
    <tr>
      <td class="time-cell">25–35 min</td>
      <td class="phase-cell">🗺️ As-Is → To-Be Process</td>
      <td>Side-by-side comparison: ShopEase today (COD only) vs. the future state (6 payment methods). Students identify process gaps and understand why process mapping comes before writing any requirement.</td>
      <td><span class="method-pill pill-demo">Demo</span></td>
    </tr>
    <tr>
      <td class="time-cell">35–45 min</td>
      <td class="phase-cell">💳 Live Payment Simulator</td>
      <td>Students experience a live payment flow simulator — instructor taps through each step (App → Gateway → Bank → Callback → Notification), dot by dot. When the "Callback Failure" scenario is triggered, students discover what the BA must define: reconciliation, auto-refund, and customer notification.</td>
      <td><span class="method-pill pill-sim">Simulator</span></td>
    </tr>
    <tr>
      <td class="time-cell">45–55 min</td>
      <td class="phase-cell">📄 BRD + User Stories</td>
      <td>Students write their first User Story: <em>"As Priya, I want to pay via UPI so that I can complete my purchase in under 10 seconds."</em> They then add Acceptance Criteria — the testable conditions that define "done." Instructor reveals common mistakes students make at this stage.</td>
      <td><span class="method-pill pill-activity">Writing</span></td>
    </tr>
    <tr>
      <td class="time-cell">55–65 min</td>
      <td class="phase-cell">🧪 UAT Scenarios</td>
      <td>Groups write UAT test cases covering success, failure, and edge cases for ShopEase's payment portal. Students discover that UAT is not just "does it work?" — it is validation that the business need is fully met.</td>
      <td><span class="method-pill pill-activity">Group Work</span></td>
    </tr>
    <tr>
      <td class="time-cell">65–70 min</td>
      <td class="phase-cell">❓ Concept Quiz</td>
      <td>Quick-fire quiz: students apply what they've learned to a new scenario (not ShopEase). Tests whether they can transfer BA skills, not just recall the case study.</td>
      <td><span class="method-pill pill-quiz">Quiz</span></td>
    </tr>
    <tr>
      <td class="time-cell">70–75 min</td>
      <td class="phase-cell">🏆 Takeaway & Q&A</td>
      <td>One sentence per student: <em>"The one thing I'm taking from today is..."</em> Instructor connects the session back to career relevance — where BAs work, what they earn, what makes a great BA vs. an average one.</td>
      <td><span class="method-pill pill-reflect">Reflection</span></td>
    </tr>
  </tbody>
</table>

<!-- ── TEACHING APPROACH ── -->
<h2>Teaching Approach</h2>
<div class="approach-grid">
  <div class="approach-card">
    <div class="icon">🎭</div>
    <h4>Case-Based Learning</h4>
    <p>Every concept is introduced through ShopEase, not through theory. Students never hear "a Business Problem Statement is defined as..." — they discover it by doing it.</p>
  </div>
  <div class="approach-card">
    <div class="icon">💻</div>
    <h4>Interactive Digital Tools</h4>
    <p>A custom-built BA simulator lets students experience the payment flow, write live artifacts, and see real-time output — not just listen to slides.</p>
  </div>
  <div class="approach-card">
    <div class="icon">🙋</div>
    <h4>Student-Led Discovery</h4>
    <p>Students write the Problem Statement before it's revealed. They map stakeholders before the instructor does. They discover gaps themselves — the instructor confirms, not dictates.</p>
  </div>
  <div class="approach-card">
    <div class="icon">⚡</div>
    <h4>Failure is a Teaching Moment</h4>
    <p>The payment simulator includes a deliberate failure scenario. Students learn what happens when a BA misses a requirement — through simulation, not lecture.</p>
  </div>
  <div class="approach-card">
    <div class="icon">🏭</div>
    <h4>Industry Relevance</h4>
    <p>ShopEase mirrors real Indian fintech challenges: UPI adoption, RBI compliance, PCI-DSS, COD return rates. MBA students recognise these from business news.</p>
  </div>
  <div class="approach-card">
    <div class="icon">🔄</div>
    <h4>Full BA Lifecycle</h4>
    <p>In 75 minutes, students complete the full BA workflow: Problem → Stakeholders → Process → Requirements → UAT. They leave with a complete mental model.</p>
  </div>
</div>

<!-- ── FOOTER ── -->
<div class="footer">
  <span>Madhuri Salunke — Business Analysis Workshop</span>
  <span>Session Duration: 75 Minutes · MBA Level · Case Study: ShopEase</span>
</div>

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
