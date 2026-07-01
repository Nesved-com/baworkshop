import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronRight, Info, Download, Check } from 'lucide-react'
import { BRD_SECTIONS } from '../../../data'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'

interface Props { onNext: () => void }

export function BRDBuilder({ onNext }: Props) {
  const [contents, setContents] = useState<Record<string, string>>(
    Object.fromEntries(BRD_SECTIONS.map(s => [s.id, s.content]))
  )
  const [activeSection, setActiveSection] = useState(BRD_SECTIONS[0].id)
  const [showHint, setShowHint] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const completedCount = Object.values(contents).filter(v => v.trim().length > 10).length

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDownload = () => {
    downloadFile(buildMarkdownDocument(), 'BRD-Payment-Portal.md', 'text/markdown')
  }

  const handleDownloadDoc = () => {
    downloadFile(buildWordDocument(), 'BRD-Payment-Portal.doc', 'application/msword')
  }

  const buildMarkdownDocument = () => {
    const lines: string[] = ['# Business Requirements Document', '## ShopEase Digital Payment Portal', '', '---', '']
    BRD_SECTIONS.forEach(section => {
      lines.push(`## ${section.title}`)
      lines.push('')
      lines.push(contents[section.id] || '_[Not completed]_')
      lines.push('')
      lines.push('---')
      lines.push('')
    })
    return lines.join('\n')
  }

  const buildWordDocument = () => {
    const sections = BRD_SECTIONS.map(section => `
      <h2>${escapeHtml(section.title)}</h2>
      <p class="description">${escapeHtml(section.description)}</p>
      <div class="content">${formatDocText(contents[section.id] || '[Not completed]')}</div>
    `).join('')

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Business Requirements Document</title>
  <style>
    body { font-family: Arial, sans-serif; color: #111827; line-height: 1.55; padding: 32px; }
    h1 { font-size: 28px; margin-bottom: 4px; }
    h2 { font-size: 20px; margin-top: 28px; border-bottom: 1px solid #d1d5db; padding-bottom: 6px; }
    .subtitle { color: #4b5563; margin-bottom: 28px; }
    .description { color: #6b7280; font-size: 13px; margin-bottom: 10px; }
    .content { background: #f9fafb; border: 1px solid #e5e7eb; padding: 14px; border-radius: 8px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <h1>Business Requirements Document</h1>
  <p class="subtitle">ShopEase Digital Payment Portal | Mission: Build Payment Portal from Scratch</p>
  ${sections}
</body>
</html>`
  }

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentSection = BRD_SECTIONS.find(s => s.id === activeSection)!

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<FileText className="w-5 h-5" />}
        title="BRD Builder"
        subtitle="Build your Business Requirements Document. Each section guides you with examples."
      />
      <SectionBanner
        color="blue"
        time="10 min"
        what="A Business Requirements Document (BRD) is the formal agreement between the business and the development team. It captures the objective, scope, stakeholders, business rules, and success metrics for a project. The BRD is owned by the BA."
        why="The BRD is the single source of truth. Without it, each team member works from a different assumption. When something goes wrong in production, teams look at the BRD to determine whether it was a requirement gap or a development gap."
        tip="Highlight the Business Rules section: Every rule you write becomes a test case in UAT. A vague rule like 'UPI should work' gives testers nothing to test. A good BA writes: 'UPI payment must complete within 5 minutes or display a timeout error with retry option.'"
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Section nav */}
        <div className="w-full lg:w-52 flex-shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3 shadow-card">
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500 dark:text-gray-400">Progress</span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">{completedCount}/{BRD_SECTIONS.length}</span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full"
                  animate={{ width: `${(completedCount / BRD_SECTIONS.length) * 100}%` }}
                />
              </div>
            </div>
            {BRD_SECTIONS.map(section => {
              const isDone = contents[section.id]?.trim().length > 10
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left mb-1 ${
                    activeSection === section.id
                      ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="flex-1 truncate">{section.title}</span>
                  {isDone && <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{currentSection.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{currentSection.description}</p>
                  </div>
                  <button
                    onClick={() => setShowHint(h => h === activeSection ? null : activeSection)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors flex-shrink-0"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Hint
                  </button>
                </div>

                <AnimatePresence>
                  {showHint === activeSection && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3 overflow-hidden"
                    >
                      <p className="text-xs text-amber-800 dark:text-amber-200">{currentSection.hint}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-6">
                <textarea
                  value={contents[activeSection]}
                  onChange={e => setContents(prev => ({ ...prev, [activeSection]: e.target.value }))}
                  placeholder={currentSection.placeholder}
                  className="w-full h-48 text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
                />

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-gray-400 dark:text-gray-600">
                    {contents[activeSection]?.length || 0} characters
                  </p>
                  <div className="flex gap-2">
                    {/* Fill with example */}
                    <button
                      onClick={() => setContents(prev => ({ ...prev, [activeSection]: currentSection.placeholder.replace(/^e\.g\., /i, '') }))}
                      className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      Fill Example
                    </button>
                    <button
                      onClick={handleSave}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        saved
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                          : 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 hover:bg-brand-100'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      {saved ? 'Saved!' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigate sections */}
              <div className="px-6 pb-5 flex justify-between">
                <button
                  onClick={() => {
                    const i = BRD_SECTIONS.findIndex(s => s.id === activeSection)
                    if (i > 0) setActiveSection(BRD_SECTIONS[i - 1].id)
                  }}
                  className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  disabled={activeSection === BRD_SECTIONS[0].id}
                >
                  ← Previous Section
                </button>
                <button
                  onClick={() => {
                    const i = BRD_SECTIONS.findIndex(s => s.id === activeSection)
                    if (i < BRD_SECTIONS.length - 1) setActiveSection(BRD_SECTIONS[i + 1].id)
                  }}
                  className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
                  disabled={activeSection === BRD_SECTIONS[BRD_SECTIONS.length - 1].id}
                >
                  Next Section →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleDownload}
            variant="secondary"
            icon={<Download className="w-4 h-4" />}
          >
            Export .md
          </Button>
          <Button
            onClick={handleDownloadDoc}
            variant="secondary"
            icon={<Download className="w-4 h-4" />}
          >
            Export .doc
          </Button>
        </div>
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: User Stories
        </Button>
      </div>
    </div>
  )
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatDocText(value: string) {
  return escapeHtml(value).replace(/\n/g, '<br />')
}
