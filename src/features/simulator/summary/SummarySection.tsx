import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, CheckCircle2, Trophy, Sparkles, Maximize2, X, Download, User, Upload, Users, FileText, CheckCheck } from 'lucide-react'
import JSZip from 'jszip'

const ROADMAP = [
  { step: 1, title: 'Business Problem', desc: 'Identified ₹64 Cr/month loss from COD-only payments', icon: '📊', color: 'rose' },
  { step: 2, title: 'Stakeholder Analysis', desc: '8 stakeholders mapped with goals & pain points', icon: '👥', color: 'blue' },
  { step: 3, title: 'As-Is Process', desc: 'Documented 7-step COD flow with 6 pain points', icon: '🗺️', color: 'violet' },
  { step: 4, title: 'Pain Points', desc: 'Quantified every pain point with revenue impact', icon: '⚠️', color: 'amber' },
  { step: 5, title: 'Root Cause Analysis', desc: 'Fishbone across People, Process, Technology, Policy', icon: '🔍', color: 'emerald' },
  { step: 6, title: 'To-Be Process', desc: 'Designed 6-method payment portal workflow', icon: '⚡', color: 'blue' },
  { step: 7, title: 'Payment Simulator', desc: 'Experienced & analysed UPI, Card, EMI, Wallet, BNPL', icon: '💳', color: 'violet' },
  { step: 8, title: 'BRD Document', desc: '8 sections covering all payment method requirements', icon: '📋', color: 'brand' },
  { step: 9, title: 'User Stories', desc: 'Written per payment method with business value', icon: '✍️', color: 'blue' },
  { step: 10, title: 'Acceptance Criteria', desc: 'Given-When-Then for all success & failure paths', icon: '✅', color: 'emerald' },
  { step: 11, title: 'UAT Scenarios', desc: '6 payment flows tested: Pass / Fail / Pending', icon: '🧪', color: 'rose' },
  { step: 12, title: 'BA Quiz', desc: 'Knowledge assessment completed', icon: '🏆', color: 'amber' },
  { step: 13, title: 'Development', desc: 'Dev team builds using your requirements ✓', icon: '💻', color: 'violet' },
  { step: 14, title: 'QA Testing', desc: 'QA validates against your acceptance criteria ✓', icon: '🔬', color: 'blue' },
  { step: 15, title: 'Production Release', desc: 'ShopEase Payment Portal goes live! 🚀', icon: '🚀', color: 'emerald' },
]

const colorMap: Record<string, string> = {
  rose: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  blue: 'bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800',
  violet: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
  amber: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  emerald: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  brand: 'bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800',
}

function drawCertificate(canvas: HTMLCanvasElement, studentName: string) {
  const ctx = canvas.getContext('2d')!
  const W = canvas.width
  const H = canvas.height

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#0f172a')
  bg.addColorStop(0.5, '#1e1b4b')
  bg.addColorStop(1, '#0f172a')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Outer gold border
  ctx.strokeStyle = '#f59e0b'
  ctx.lineWidth = 6
  ctx.strokeRect(24, 24, W - 48, H - 48)

  // Inner border
  ctx.strokeStyle = 'rgba(245,158,11,0.3)'
  ctx.lineWidth = 2
  ctx.strokeRect(36, 36, W - 72, H - 72)

  // Corner decorations
  const corners = [[48, 48], [W - 48, 48], [48, H - 48], [W - 48, H - 48]]
  corners.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.fillStyle = '#f59e0b'
    ctx.fill()
  })

  // Top badge area
  const badgeGrad = ctx.createLinearGradient(W / 2 - 60, 70, W / 2 + 60, 130)
  badgeGrad.addColorStop(0, '#6366f1')
  badgeGrad.addColorStop(1, '#8b5cf6')
  ctx.beginPath()
  ctx.roundRect(W / 2 - 80, 65, 160, 52, 26)
  ctx.fillStyle = badgeGrad
  ctx.fill()

  ctx.font = 'bold 16px Georgia, serif'
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.fillText('🏆  CERTIFICATE', W / 2, 97)

  // Title
  ctx.font = 'bold 42px Georgia, serif'
  const titleGrad = ctx.createLinearGradient(0, 140, W, 190)
  titleGrad.addColorStop(0, '#f59e0b')
  titleGrad.addColorStop(0.5, '#fbbf24')
  titleGrad.addColorStop(1, '#f59e0b')
  ctx.fillStyle = titleGrad
  ctx.fillText('Certificate of Completion', W / 2, 175)

  // Divider line
  const lineGrad = ctx.createLinearGradient(80, 0, W - 80, 0)
  lineGrad.addColorStop(0, 'transparent')
  lineGrad.addColorStop(0.3, '#f59e0b')
  lineGrad.addColorStop(0.7, '#f59e0b')
  lineGrad.addColorStop(1, 'transparent')
  ctx.strokeStyle = lineGrad
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(80, 195)
  ctx.lineTo(W - 80, 195)
  ctx.stroke()

  // "This certifies that"
  ctx.font = '18px Georgia, serif'
  ctx.fillStyle = 'rgba(196,181,253,0.9)'
  ctx.fillText('This certifies that', W / 2, 235)

  // Student name
  ctx.font = 'bold 52px Georgia, serif'
  const nameGrad = ctx.createLinearGradient(0, 260, W, 320)
  nameGrad.addColorStop(0, '#a78bfa')
  nameGrad.addColorStop(0.5, '#ffffff')
  nameGrad.addColorStop(1, '#a78bfa')
  ctx.fillStyle = nameGrad
  ctx.fillText(studentName || 'Your Name', W / 2, 310)

  // Name underline
  const nameWidth = ctx.measureText(studentName || 'Your Name').width
  ctx.strokeStyle = 'rgba(167,139,250,0.6)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(W / 2 - nameWidth / 2, 322)
  ctx.lineTo(W / 2 + nameWidth / 2, 322)
  ctx.stroke()

  // "has successfully completed"
  ctx.font = '18px Georgia, serif'
  ctx.fillStyle = 'rgba(196,181,253,0.9)'
  ctx.fillText('has successfully completed the', W / 2, 360)

  // Course name
  ctx.font = 'bold 24px Georgia, serif'
  ctx.fillStyle = '#ffffff'
  ctx.fillText('Business Analyst Interactive Workshop', W / 2, 395)

  // Case study name
  ctx.font = '16px Georgia, serif'
  ctx.fillStyle = 'rgba(167,139,250,0.8)'
  ctx.fillText('Case Study: ShopEase Payment Portal Design', W / 2, 422)

  // Divider
  ctx.strokeStyle = lineGrad
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(80, 445)
  ctx.lineTo(W - 80, 445)
  ctx.stroke()

  // Topics completed row
  const topics = ['Business Problem', 'Stakeholders', 'As-Is Process', 'BRD', 'User Stories', 'UAT', 'Quiz']
  ctx.font = '12px Arial, sans-serif'
  ctx.fillStyle = 'rgba(167,139,250,0.7)'
  const topicStr = topics.map(t => `✓ ${t}`).join('   ')
  ctx.fillText(topicStr, W / 2, 470)

  // Bottom section: instructor + date
  // Instructor block (left)
  ctx.textAlign = 'left'

  // Signature — hand-drawn style using bezier curves
  ctx.save()
  ctx.strokeStyle = 'rgba(250,220,100,0.85)'
  ctx.lineWidth = 1.6
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // "M" stroke
  ctx.beginPath()
  ctx.moveTo(102, 513); ctx.lineTo(102, 498)
  ctx.lineTo(108, 507); ctx.lineTo(114, 498); ctx.lineTo(114, 513)
  ctx.stroke()

  // "a" stroke
  ctx.beginPath()
  ctx.moveTo(120, 513)
  ctx.bezierCurveTo(120, 505, 130, 503, 130, 508)
  ctx.bezierCurveTo(130, 514, 120, 514, 120, 513)
  ctx.moveTo(130, 506); ctx.lineTo(130, 513)
  ctx.stroke()

  // "d" stroke
  ctx.beginPath()
  ctx.moveTo(136, 513)
  ctx.bezierCurveTo(136, 505, 145, 503, 145, 508)
  ctx.bezierCurveTo(145, 514, 136, 514, 136, 513)
  ctx.moveTo(145, 497); ctx.lineTo(145, 513)
  ctx.stroke()

  // flowing "huri" tail
  ctx.beginPath()
  ctx.moveTo(150, 507)
  ctx.bezierCurveTo(152, 503, 158, 503, 158, 508)
  ctx.lineTo(158, 515)
  ctx.bezierCurveTo(160, 520, 166, 519, 168, 514)
  ctx.bezierCurveTo(170, 509, 172, 505, 176, 507)
  ctx.bezierCurveTo(180, 509, 180, 515, 180, 513)
  ctx.bezierCurveTo(182, 519, 190, 517, 192, 512)
  ctx.stroke()

  // "S" initial
  ctx.beginPath()
  ctx.moveTo(204, 505)
  ctx.bezierCurveTo(210, 502, 215, 505, 213, 509)
  ctx.bezierCurveTo(210, 513, 205, 512, 204, 516)
  ctx.bezierCurveTo(202, 520, 210, 522, 215, 518)
  ctx.stroke()

  // "alunke" flowing tail
  ctx.beginPath()
  ctx.moveTo(220, 507)
  ctx.bezierCurveTo(222, 503, 228, 504, 228, 508)
  ctx.bezierCurveTo(228, 514, 220, 514, 222, 518)
  ctx.bezierCurveTo(225, 522, 240, 520, 245, 514)
  ctx.bezierCurveTo(248, 509, 252, 506, 258, 510)
  ctx.bezierCurveTo(260, 514, 258, 518, 265, 516)
  ctx.stroke()

  ctx.restore()

  // Signature line
  ctx.strokeStyle = 'rgba(245,158,11,0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(100, 520)
  ctx.lineTo(290, 520)
  ctx.stroke()

  ctx.font = 'bold 15px Georgia, serif'
  ctx.fillStyle = '#f59e0b'
  ctx.fillText('Madhuri Salunke', 100, 540)
  ctx.font = '13px Arial, sans-serif'
  ctx.fillStyle = 'rgba(196,181,253,0.7)'
  ctx.fillText('Senior Product Owner, Vois', 100, 557)
  ctx.font = 'italic 12px Georgia, serif'
  ctx.fillStyle = 'rgba(196,181,253,0.5)'
  ctx.fillText('Instructor', 100, 572)

  // Date block (right)
  ctx.textAlign = 'right'
  ctx.font = 'italic 14px Georgia, serif'
  ctx.fillStyle = 'rgba(196,181,253,0.7)'
  ctx.fillText('Date of Completion', W - 100, 530)

  ctx.strokeStyle = 'rgba(245,158,11,0.5)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(W - 280, 515)
  ctx.lineTo(W - 100, 515)
  ctx.stroke()

  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  ctx.font = 'bold 16px Georgia, serif'
  ctx.fillStyle = '#f59e0b'
  ctx.fillText(today, W - 100, 555)

  // Center seal
  ctx.textAlign = 'center'
  ctx.beginPath()
  ctx.arc(W / 2, 535, 38, 0, Math.PI * 2)
  const sealGrad = ctx.createRadialGradient(W / 2, 535, 5, W / 2, 535, 38)
  sealGrad.addColorStop(0, '#6366f1')
  sealGrad.addColorStop(1, '#4f46e5')
  ctx.fillStyle = sealGrad
  ctx.fill()
  ctx.strokeStyle = '#f59e0b'
  ctx.lineWidth = 2.5
  ctx.stroke()

  ctx.font = 'bold 22px Georgia, serif'
  ctx.fillStyle = '#f59e0b'
  ctx.fillText('✦', W / 2, 530)
  ctx.font = '9px Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.fillText('BA WORKSHOP', W / 2, 546)

  // Footer
  ctx.font = '11px Arial, sans-serif'
  ctx.fillStyle = 'rgba(100,116,139,0.7)'
  ctx.fillText('Vois · Business Analyst Interactive Workshop · ShopEase Case Study', W / 2, H - 40)
}

type BulkStatus = 'idle' | 'generating' | 'done'

function parseCSV(text: string): string[] {
  return text
    .split('\n')
    .map(line => line.split(',')[0].replace(/["']/g, '').trim())
    .filter(name => name.length > 1 && !/^(name|student|full.?name)/i.test(name))
}

function generateCanvasBlob(name: string): Promise<Blob> {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas')
    canvas.width = 900
    canvas.height = 620
    drawCertificate(canvas, name)
    canvas.toBlob(blob => resolve(blob!), 'image/png')
  })
}

// ── BA Toolkit data ────────────────────────────────────────────────────────

const BA_TOOLS = [
  {
    name: 'Jira',
    category: 'Story Tracking',
    desc: 'User stories, sprints & backlog management',
    url: 'https://www.atlassian.com/software/jira',
    bg: '#0052CC',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0052CC"/>
        {/* Jira diamond bolt */}
        <path d="M20 7 L27 16 L20 20 L27 29 M20 7 L13 16 L20 20" stroke="#2684FF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 7 L27 16 L20 20 L27 29" stroke="#DEEBFF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 7 L13 16 L20 20 L13 29" stroke="#4C9AFF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="20" y="37" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="Arial">Jira</text>
      </svg>
    ),
  },
  {
    name: 'Confluence',
    category: 'BRD / Docs',
    desc: 'BRD, meeting notes & requirement wikis',
    url: 'https://www.atlassian.com/software/confluence',
    bg: '#0052CC',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0065FF"/>
        {/* Confluence wave shape */}
        <path d="M8 26 Q12 18 20 20 Q28 22 32 14" stroke="#4C9AFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M8 20 Q12 12 20 14 Q28 16 32 8" stroke="#DEEBFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <text x="20" y="37" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="700" fontFamily="Arial">Confluence</text>
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'Wireframing',
    desc: 'UI mockups, prototypes & screen flows',
    url: 'https://www.figma.com',
    bg: '#1E1E1E',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#1E1E1E"/>
        {/* Figma logo — 3 circles + rectangles */}
        <rect x="14" y="7" width="8" height="8" rx="4" fill="#F24E1E"/>
        <rect x="22" y="7" width="8" height="8" rx="4" fill="#FF7262"/>
        <rect x="14" y="15" width="8" height="8" rx="4" fill="#A259FF"/>
        <circle cx="26" cy="19" r="4" fill="#1ABCFE"/>
        <rect x="14" y="23" width="8" height="8" rx="4" fill="#0ACF83"/>
        <text x="20" y="37" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="Arial">Figma</text>
      </svg>
    ),
  },
  {
    name: 'Lucidchart',
    category: 'Process Diagrams',
    desc: 'As-Is / To-Be process flow diagrams',
    url: 'https://www.lucidchart.com',
    bg: '#F75D00',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#F75D00"/>
        {/* Lucidchart — simplified L + chart */}
        <rect x="10" y="9" width="4" height="16" rx="2" fill="white"/>
        <rect x="10" y="22" width="14" height="4" rx="2" fill="white"/>
        <rect x="22" y="14" width="4" height="12" rx="2" fill="white" opacity="0.7"/>
        <rect x="28" y="9" width="4" height="17" rx="2" fill="white" opacity="0.5"/>
        <text x="20" y="37" textAnchor="middle" fill="white" fontSize="4" fontWeight="700" fontFamily="Arial">Lucidchart</text>
      </svg>
    ),
  },
  {
    name: 'Miro',
    category: 'Brainstorming',
    desc: 'Stakeholder maps, mind maps & workshops',
    url: 'https://miro.com',
    bg: '#FFD02F',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#FFD02F"/>
        {/* Miro M shape */}
        <path d="M9 28 L9 12 L15 22 L20 15 L25 22 L31 12 L31 28" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="20" y="37" textAnchor="middle" fill="#1a1a1a" fontSize="6" fontWeight="800" fontFamily="Arial">Miro</text>
      </svg>
    ),
  },
  {
    name: 'Microsoft Excel',
    category: 'Data Analysis',
    desc: 'KPI tracking, data analysis & reporting',
    url: 'https://www.microsoft.com/en-in/microsoft-365/excel',
    bg: '#217346',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#217346"/>
        {/* Excel X */}
        <text x="20" y="24" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" fontFamily="Arial, sans-serif">X</text>
        <text x="20" y="37" textAnchor="middle" fill="#A9D18E" fontSize="5" fontWeight="700" fontFamily="Arial">Excel</text>
      </svg>
    ),
  },
  {
    name: 'Power BI',
    category: 'Reporting',
    desc: 'Executive dashboards & KPI reports',
    url: 'https://powerbi.microsoft.com',
    bg: '#F2C811',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#F2C811"/>
        {/* Power BI bar chart */}
        <rect x="9"  y="22" width="6" height="8"  rx="1.5" fill="#1a1a1a"/>
        <rect x="17" y="15" width="6" height="15" rx="1.5" fill="#1a1a1a" opacity="0.8"/>
        <rect x="25" y="10" width="6" height="20" rx="1.5" fill="#1a1a1a" opacity="0.7"/>
        <text x="20" y="37" textAnchor="middle" fill="#1a1a1a" fontSize="5" fontWeight="800" fontFamily="Arial">Power BI</text>
      </svg>
    ),
  },
  {
    name: 'Postman',
    category: 'API Testing',
    desc: 'Test & document payment API flows',
    url: 'https://www.postman.com',
    bg: '#FF6C37',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#FF6C37"/>
        {/* Postman — astronaut-like P */}
        <circle cx="20" cy="18" r="9" fill="none" stroke="white" strokeWidth="2.5"/>
        <circle cx="20" cy="18" r="5" fill="white" opacity="0.3"/>
        <path d="M20 9 Q26 12 26 18 Q26 24 20 27" stroke="white" strokeWidth="1.5" fill="none"/>
        <text x="20" y="37" textAnchor="middle" fill="white" fontSize="5" fontWeight="700" fontFamily="Arial">Postman</text>
      </svg>
    ),
  },
  {
    name: 'Slack',
    category: 'Communication',
    desc: 'Stakeholder communication & BA channels',
    url: 'https://slack.com',
    bg: '#4A154B',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#4A154B"/>
        {/* Slack # hashtag */}
        <line x1="14" y1="11" x2="12" y2="25" stroke="#E01E5A" strokeWidth="3" strokeLinecap="round"/>
        <line x1="20" y1="11" x2="18" y2="25" stroke="#36C5F0" strokeWidth="3" strokeLinecap="round"/>
        <line x1="10" y1="16" x2="24" y2="16" stroke="#2EB67D" strokeWidth="3" strokeLinecap="round"/>
        <line x1="9" y1="21" x2="23" y2="21" stroke="#ECB22E" strokeWidth="3" strokeLinecap="round"/>
        <text x="20" y="37" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="Arial">Slack</text>
      </svg>
    ),
  },
  {
    name: 'Notion',
    category: 'Documentation',
    desc: 'Requirements docs, trackers & templates',
    url: 'https://www.notion.so',
    bg: '#191919',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#191919"/>
        {/* Notion N */}
        <path d="M11 28 L11 12 L23 25 L23 12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="11" y1="12" x2="19" y2="12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <line x1="23" y1="12" x2="29" y2="12" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
        <text x="20" y="37" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="700" fontFamily="Arial">Notion</text>
      </svg>
    ),
  },
  {
    name: 'Azure DevOps',
    category: 'ALM / Agile',
    desc: 'End-to-end BA lifecycle & release tracking',
    url: 'https://azure.microsoft.com/en-in/products/devops',
    bg: '#0078D4',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0078D4"/>
        {/* Azure DevOps infinity-like swoosh */}
        <path d="M8 20 Q10 10 20 14 Q30 18 32 10" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M32 20 Q30 30 20 26 Q10 22 8 30" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
        <text x="20" y="37" textAnchor="middle" fill="white" fontSize="4" fontWeight="700" fontFamily="Arial">Azure DevOps</text>
      </svg>
    ),
  },
  {
    name: 'draw.io',
    category: 'Flow Diagrams',
    desc: 'Free diagramming — process & swimlane flows',
    url: 'https://www.drawio.com',
    bg: '#F08705',
    logo: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#F08705"/>
        {/* draw.io — simple flow diagram */}
        <rect x="6"  y="10" width="12" height="8" rx="2" fill="white" opacity="0.9"/>
        <rect x="22" y="10" width="12" height="8" rx="2" fill="white" opacity="0.9"/>
        <rect x="14" y="24" width="12" height="8" rx="2" fill="white" opacity="0.9"/>
        <line x1="12" y1="18" x2="20" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="28" y1="18" x2="20" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="20" y="39" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="700" fontFamily="Arial">draw.io</text>
      </svg>
    ),
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Story Tracking': 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  'BRD / Docs': 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
  'Wireframing': 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
  'Process Diagrams': 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
  'Flow Diagrams': 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
  'Brainstorming': 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300',
  'Data Analysis': 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
  'Reporting': 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  'API Testing': 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300',
  'Communication': 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  'Documentation': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  'ALM / Agile': 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300',
}

function BAToolkit() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🛠️</span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">BA Toolkit</h2>
            <span className="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-xs font-bold">12 tools</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            These are the tools real Business Analysts use every day — across the full BA lifecycle.
          </p>
        </div>
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {BA_TOOLS.map((tool, i) => (
          <motion.a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className="group flex flex-col items-center text-center p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all cursor-pointer bg-gray-50 dark:bg-gray-800/50"
          >
            {/* Logo */}
            <div className="w-11 h-11 rounded-xl overflow-hidden mb-3 shadow-sm flex-shrink-0">
              {tool.logo}
            </div>
            {/* Name */}
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1">{tool.name}</p>
            {/* Category pill */}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 ${CATEGORY_COLORS[tool.category] ?? 'bg-gray-100 text-gray-600'}`}>
              {tool.category}
            </span>
            {/* Desc */}
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">{tool.desc}</p>
            {/* Link indicator */}
            <span className="mt-2 text-[10px] text-brand-500 dark:text-brand-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Visit website →
            </span>
          </motion.a>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 dark:text-gray-600 text-center mt-5">
        Click any tool to visit its official website. Most offer free tiers for students.
      </p>
    </div>
  )
}

export function SummarySection() {
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [tab, setTab] = useState<'single' | 'bulk'>('single')
  const [studentName, setStudentName] = useState('')
  const [bulkNames, setBulkNames] = useState<string[]>([])
  const [bulkStatus, setBulkStatus] = useState<BulkStatus>('idle')
  const [bulkProgress, setBulkProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSteps(v => {
        if (v >= ROADMAP.length) {
          clearInterval(interval)
          setTimeout(() => setShowCelebration(true), 500)
          return v
        }
        return v + 1
      })
    }, 250)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showCertificate && canvasRef.current) {
      drawCertificate(canvasRef.current, studentName)
    }
  }, [showCertificate, studentName])

  const handleDownload = () => {
    if (!canvasRef.current) return
    drawCertificate(canvasRef.current, studentName)
    const link = document.createElement('a')
    link.download = `BA-Certificate-${studentName.replace(/\s+/g, '-') || 'Student'}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const names = parseCSV(ev.target?.result as string)
      setBulkNames(names)
      setBulkStatus('idle')
      setBulkProgress(0)
    }
    reader.readAsText(file)
  }

  const handleBulkDownload = async () => {
    if (!bulkNames.length) return
    setBulkStatus('generating')
    setBulkProgress(0)
    const zip = new JSZip()
    const folder = zip.folder('BA-Certificates')!
    for (let i = 0; i < bulkNames.length; i++) {
      const blob = await generateCanvasBlob(bulkNames[i])
      folder.file(`Certificate-${bulkNames[i].replace(/\s+/g, '-')}.png`, blob)
      setBulkProgress(Math.round(((i + 1) / bulkNames.length) * 100))
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(zipBlob)
    link.download = 'BA-Workshop-Certificates.zip'
    link.click()
    setBulkStatus('done')
  }

  const CelebrationContent = () => (
    <div className={`bg-gradient-to-r from-brand-600 via-violet-600 to-violet-700 rounded-3xl p-8 text-white text-center relative overflow-hidden ${fullscreen ? 'min-h-screen rounded-none flex flex-col items-center justify-center' : ''}`}>
      <div className="absolute inset-0 opacity-5 text-[200px] flex items-center justify-center pointer-events-none select-none">🎉</div>

      {/* Fullscreen toggle */}
      <button
        onClick={() => setFullscreen(f => !f)}
        className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {fullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </button>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Award className={`${fullscreen ? 'w-16 h-16' : 'w-10 h-10'} transition-all`} />
          <Sparkles className={`${fullscreen ? 'w-10 h-10' : 'w-6 h-6'} text-yellow-300`} />
        </div>
        <h2 className={`font-bold mb-2 ${fullscreen ? 'text-5xl' : 'text-3xl'}`}>
          Congratulations, Business Analyst! 🎉
        </h2>
        <p className={`text-brand-100 mb-6 ${fullscreen ? 'text-2xl' : 'text-lg'}`}>
          You have successfully completed the ShopEase Payment Portal BA Workshop
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '📋', label: 'BRD Created', value: '8 sections' },
            { icon: '✍️', label: 'User Stories', value: 'Per method' },
            { icon: '✅', label: 'Acceptance Criteria', value: 'Testable' },
            { icon: '🧪', label: 'UAT Scenarios', value: '6 flows' },
          ].map(item => (
            <div key={item.label} className="bg-white/20 rounded-2xl p-3">
              <div className={`mb-1 ${fullscreen ? 'text-4xl' : 'text-2xl'}`}>{item.icon}</div>
              <p className="text-xs text-brand-200 font-medium">{item.label}</p>
              <p className={`font-bold ${fullscreen ? 'text-lg' : 'text-sm'}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Certificate CTA */}
        <button
          onClick={() => setShowCertificate(true)}
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-6 py-3 rounded-2xl transition-all hover:scale-105 shadow-lg"
        >
          <Award className="w-5 h-5" />
          Get Your Certificate
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Fullscreen overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <CelebrationContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && setShowCertificate(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-3xl p-6 w-full max-w-3xl shadow-2xl my-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Certificate of Completion</h3>
                </div>
                <button onClick={() => setShowCertificate(false)}
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-800 rounded-xl p-1 mb-5">
                <button
                  onClick={() => setTab('single')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'single' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  <User className="w-4 h-4" /> Single Student
                </button>
                <button
                  onClick={() => setTab('bulk')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'bulk' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  <Users className="w-4 h-4" /> Bulk from CSV
                </button>
              </div>

              {tab === 'single' && (
                <>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
                      <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Enter your full name..."
                        value={studentName}
                        onChange={e => setStudentName(e.target.value)}
                        className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm font-medium focus:outline-none"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleDownload}
                      disabled={!studentName.trim()}
                      className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed text-yellow-900 font-bold px-5 py-3 rounded-xl transition-all hover:scale-105"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-950">
                    <canvas ref={canvasRef} width={900} height={620} className="w-full h-auto" />
                  </div>
                  <p className="text-center text-gray-500 text-xs mt-3">High-resolution PNG · 900 × 620 px</p>
                </>
              )}

              {tab === 'bulk' && (
                <div className="space-y-4">
                  {/* CSV format hint */}
                  <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-brand-400" />
                      <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">CSV Format</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">One student name per row. Header row is auto-skipped.</p>
                    <pre className="text-xs text-emerald-400 bg-gray-900 rounded-lg p-3 font-mono">{`Name\nRahul Sharma\nPriya Patel\nAnkita Desai\nMohit Verma`}</pre>
                  </div>

                  {/* Upload area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-700 hover:border-brand-500 rounded-2xl p-6 text-center cursor-pointer transition-colors group"
                  >
                    <Upload className="w-8 h-8 text-gray-500 group-hover:text-brand-400 mx-auto mb-2 transition-colors" />
                    <p className="text-sm font-semibold text-gray-300">Click to upload CSV file</p>
                    <p className="text-xs text-gray-500 mt-1">.csv files only</p>
                    <input ref={fileInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleCSVUpload} />
                  </div>

                  {/* Parsed names list */}
                  {bulkNames.length > 0 && (
                    <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-white">{bulkNames.length} students detected</span>
                        <button onClick={() => { setBulkNames([]); setBulkStatus('idle') }}
                          className="text-xs text-gray-500 hover:text-rose-400 transition-colors">Clear</button>
                      </div>
                      <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                        {bulkNames.map((name, i) => (
                          <div key={i} className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2">
                            <span className="text-xs text-gray-500 w-5 text-right flex-shrink-0">{i + 1}</span>
                            <span className="text-sm text-white font-medium">{name}</span>
                            {bulkStatus === 'done' && <CheckCheck className="w-3.5 h-3.5 text-emerald-400 ml-auto flex-shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Progress bar */}
                  {bulkStatus === 'generating' && (
                    <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-white">Generating certificates...</span>
                        <span className="text-sm font-bold text-brand-400">{bulkProgress}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full"
                          animate={{ width: `${bulkProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Please wait — rendering each certificate on canvas...</p>
                    </div>
                  )}

                  {bulkStatus === 'done' && (
                    <div className="bg-emerald-900/40 border border-emerald-700 rounded-2xl p-4 text-center">
                      <CheckCheck className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                      <p className="text-emerald-300 font-bold text-sm">All {bulkNames.length} certificates downloaded!</p>
                      <p className="text-emerald-500 text-xs mt-0.5">Check your Downloads folder for BA-Workshop-Certificates.zip</p>
                    </div>
                  )}

                  {/* Download ZIP button */}
                  <button
                    onClick={handleBulkDownload}
                    disabled={bulkNames.length === 0 || bulkStatus === 'generating'}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-glow"
                  >
                    <Download className="w-5 h-5" />
                    {bulkStatus === 'generating'
                      ? `Generating... ${bulkProgress}%`
                      : `Download All ${bulkNames.length > 0 ? `(${bulkNames.length})` : ''} as ZIP`}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main page content */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-violet-600 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-4 shadow-glow">
            <Trophy className="w-4 h-4" />
            Workshop Complete!
          </motion.div>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            BA Journey — Complete Roadmap
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-gray-500 dark:text-gray-400">
            ShopEase Payment Portal — from Problem to Production
          </motion.p>
        </div>

        {/* Roadmap */}
        <div className="relative mb-10">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800" />
          <div className="space-y-3">
            {ROADMAP.map((item, i) => (
              <AnimatePresence key={item.step}>
                {i < visibleSteps && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex items-start gap-4 pl-4"
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 relative z-10 bg-white dark:bg-gray-900 ${colorMap[item.color]}`}>
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    <div className={`flex-1 flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      i < 12 ? colorMap[item.color] : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
                    } ${i >= 12 ? 'opacity-70' : ''}`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Step {item.step}</p>
                          {i < 12 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                          {i >= 12 && <span className="text-xs text-gray-400">(Next phase)</span>}
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
        </div>

        {/* ── BA Toolkit ── */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-10"
            >
              <BAToolkit />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration card */}
        <AnimatePresence>
          {showCelebration && !fullscreen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              <CelebrationContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
