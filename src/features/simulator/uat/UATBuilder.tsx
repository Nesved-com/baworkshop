import { useState } from 'react'
import { motion } from 'framer-motion'
import { TestTube, ChevronRight, Download, Check, X, Clock } from 'lucide-react'
import { INITIAL_UAT_SCENARIOS } from '../../../data'
import type { UATScenario } from '../../../types'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'
import { Badge } from '../../../components/ui/Badge'

interface Props { onNext: () => void }

export function UATBuilder({ onNext }: Props) {
  const [scenarios, setScenarios] = useState<UATScenario[]>(INITIAL_UAT_SCENARIOS)

  const updateStatus = (id: string, status: UATScenario['status']) => {
    setScenarios(prev => prev.map(s => s.id === id ? { ...s, status } : s))
  }

  const passCount = scenarios.filter(s => s.status === 'pass').length
  const failCount = scenarios.filter(s => s.status === 'fail').length

  const handleDownload = () => {
    const lines = ['# UAT Scenarios — ShopEase Payment Portal\n']
    scenarios.forEach((s, i) => {
      lines.push(`## Scenario ${i + 1}: ${s.scenario}`)
      lines.push(`**Priority:** ${s.priority} | **Status:** ${s.status}`)
      lines.push(`\n**Steps:**\n${s.steps}`)
      lines.push(`\n**Expected Result:**\n${s.expectedResult}\n---\n`)
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'UAT-ShopEase-Payment.md'
    a.click()
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <SectionHeader
        icon={<TestTube className="w-5 h-5" />}
        title="UAT Builder"
        subtitle="User Acceptance Testing scenarios for each ShopEase payment method — mark Pass / Fail / Pending"
      />
      <SectionBanner
        color="rose"
        time="8 min"
        what="User Acceptance Testing (UAT) is the final validation phase where the business — not the QA team — confirms that the system meets their requirements. The BA creates UAT scenarios based directly on the Acceptance Criteria they wrote. If the AC was clear, UAT is straightforward."
        why="UAT is the last line of defence before go-live. A failed UAT means the system goes back to development — costing time and money. A BA who wrote precise AC earlier saves the company from expensive UAT failures. UAT also protects the BA — if something is missed, the AC is the evidence."
        tip="Ask students: 'Scenario 3 is EMI payment. If this scenario fails UAT, who is responsible — the Dev team or the BA?' Answer: if the requirement was clear and dev didn't follow it, Dev is responsible. If the requirement was ambiguous, the BA shares responsibility. This is why AC matters."
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Scenarios', value: scenarios.length, color: 'gray' },
          { label: 'Passed', value: passCount, color: 'emerald' },
          { label: 'Failed', value: failCount, color: 'rose' },
        ].map(item => (
          <div key={item.label} className={`rounded-2xl p-4 border text-center ${
            item.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' :
            item.color === 'rose' ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800' :
            'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
          }`}>
            <p className={`text-2xl font-bold ${
              item.color === 'emerald' ? 'text-emerald-700 dark:text-emerald-300' :
              item.color === 'rose' ? 'text-rose-700 dark:text-rose-300' :
              'text-gray-900 dark:text-white'
            }`}>{item.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Scenario</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Expected Result</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s, i) => (
                <motion.tr key={s.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-4 text-xs font-mono text-gray-400">{i + 1}</td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5">{s.scenario}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-pre-line leading-relaxed">{s.steps}</p>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{s.expectedResult}</p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Badge variant={s.priority === 'high' ? 'error' : s.priority === 'medium' ? 'warning' : 'default'}>
                      {s.priority}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => updateStatus(s.id, 'pass')}
                        title="Pass"
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${s.status === 'pass' ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400' : 'text-gray-300 dark:text-gray-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-500'}`}>
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => updateStatus(s.id, 'fail')}
                        title="Fail"
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${s.status === 'fail' ? 'bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400' : 'text-gray-300 dark:text-gray-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-500'}`}>
                        <X className="w-4 h-4" />
                      </button>
                      <button onClick={() => updateStatus(s.id, 'pending')}
                        title="Pending"
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${s.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400' : 'text-gray-300 dark:text-gray-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-500'}`}>
                        <Clock className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button onClick={handleDownload} variant="secondary" icon={<Download className="w-4 h-4" />}>
          Export UAT
        </Button>
        <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
          Next: Quiz
        </Button>
      </div>
    </div>
  )
}
