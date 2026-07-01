import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Presentation, X } from 'lucide-react'
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

        {/* Info box */}
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-5">
          <p className="text-xs text-violet-700 font-semibold mb-1">What's included</p>
          <ul className="text-xs text-violet-800 space-y-1">
            <li>✓ Full 75-minute timing breakdown (15 sections)</li>
            <li>✓ Teaching objectives & faculty speaker notes</li>
            <li>✓ Student activities & discussion questions</li>
            <li>✓ Expected answers & key takeaways</li>
            <li>✓ Quiz questions per section</li>
          </ul>
        </div>

        {/* Download buttons */}
        <div className="space-y-3">
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
