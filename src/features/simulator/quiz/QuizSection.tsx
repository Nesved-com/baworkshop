import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, HelpCircle, XCircle, RotateCcw, Award } from 'lucide-react'
import { QUIZ_QUESTIONS } from '../../../data'
import { Button } from '../../../components/ui/Button'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'
import { ProgressBar } from '../../../components/ui/ProgressBar'

interface Props { onNext: () => void }

export function QuizSection({ onNext }: Props) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [finished, setFinished] = useState(false)

  const question = QUIZ_QUESTIONS[currentQ]
  const isAnswered = selected !== null
  const isCorrect = selected === question.correct
  const score = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length

  const handleSelect = (idx: number) => {
    if (answers[currentQ] !== null) return
    setSelected(idx)
    setShowResult(true)
    setAnswers(prev => { const n = [...prev]; n[currentQ] = idx; return n })
  }

  const goNext = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1)
      setSelected(answers[currentQ + 1])
      setShowResult(answers[currentQ + 1] !== null)
    } else {
      setFinished(true)
    }
  }

  const restart = () => {
    setCurrentQ(0)
    setSelected(null)
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null))
    setShowResult(false)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100)
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">ShopEase Payment Portal BA Assessment</p>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card p-8 mb-8">
            <p className="text-6xl font-bold gradient-text mb-2">{score}/{QUIZ_QUESTIONS.length}</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{pct}% correct</p>
            <ProgressBar value={pct} color={pct >= 70 ? 'green' : pct >= 50 ? 'amber' : 'rose'} size="lg" />
            <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              {pct >= 90 ? '🏆 Expert BA — Outstanding!' :
               pct >= 70 ? '🎯 Proficient BA — Well done!' :
               pct >= 50 ? '📚 Learning BA — Good effort!' :
               '💪 Keep practising — Review the sections and retry!'}
            </p>
          </div>

          {/* Per question review */}
          <div className="space-y-2 mb-8 text-left">
            {QUIZ_QUESTIONS.map((q, i) => {
              const ans = answers[i]
              const correct = ans === q.correct
              return (
                <div key={q.id} className={`flex items-center gap-3 p-3 rounded-xl ${correct ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-rose-50 dark:bg-rose-950/30'}`}>
                  {correct
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    : <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />}
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 line-clamp-1">{q.question}</span>
                  <span className={`ml-auto text-xs font-bold flex-shrink-0 ${correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {correct ? '+1' : '0'}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex gap-3">
            <Button onClick={restart} variant="secondary" icon={<RotateCcw className="w-4 h-4" />}>Retry Quiz</Button>
            <Button onClick={onNext} variant="primary" icon={<ChevronRight className="w-4 h-4" />}>Next: Activity</Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <SectionHeader
        icon={<HelpCircle className="w-5 h-5" />}
        title="BA Knowledge Quiz"
        subtitle="10 questions on ShopEase payment portal business analysis"
      />
      <SectionBanner
        color="amber"
        time="10 min"
        what="This quiz tests your understanding of the Business Analysis concepts and ShopEase case study covered in this workshop. Each question is based on real BA scenarios — the kind you would face in an actual project or a BA job interview."
        why="Assessment reinforces learning. Research shows that testing yourself on material significantly improves long-term retention compared to re-reading notes. Every question here maps to a skill a working BA uses on the job."
        tip="Tell students: 'Attempt every question before looking at the explanation. Even a wrong answer teaches you something. These are the exact types of questions that come up in CBAP certification exams and BA interviews at companies like Vois, Reliance, and TCS.'"
      />

      {/* Progress */}
      <div className="flex items-center gap-4 mb-8">
        <ProgressBar value={currentQ} max={QUIZ_QUESTIONS.length} color="blue" className="flex-1" />
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex-shrink-0">
          {currentQ + 1} / {QUIZ_QUESTIONS.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQ}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

          {/* Category badge */}
          <div className="inline-flex items-center gap-1.5 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            {question.category}
          </div>

          {/* Question */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card p-6 mb-4">
            <p className="text-base font-semibold text-gray-900 dark:text-white leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => {
              const isSelected = selected === idx
              const isRight = idx === question.correct
              let style = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-700'
              if (showResult && isRight) style = 'border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
              else if (showResult && isSelected && !isRight) style = 'border-rose-400 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/40'
              else if (isSelected) style = 'border-brand-400 dark:border-brand-600 bg-brand-50 dark:bg-brand-950/40'

              return (
                <button key={idx} onClick={() => handleSelect(idx)}
                  disabled={showResult}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${style} disabled:cursor-default`}>
                  <span className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                    showResult && isRight ? 'border-emerald-500 bg-emerald-500 text-white' :
                    showResult && isSelected && !isRight ? 'border-rose-500 bg-rose-500 text-white' :
                    'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  }`}>
                    {showResult && isRight ? <CheckCircle2 className="w-4 h-4" /> :
                     showResult && isSelected && !isRight ? <XCircle className="w-4 h-4" /> :
                     String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`text-sm font-medium flex-1 ${
                    showResult && isRight ? 'text-emerald-800 dark:text-emerald-200' :
                    showResult && isSelected && !isRight ? 'text-rose-800 dark:text-rose-200' :
                    'text-gray-800 dark:text-gray-200'
                  }`}>{option}</span>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-4 mb-6 ${isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800'
                }`}>
                <p className={`text-xs font-bold mb-2 ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>
                  {isCorrect ? '✓ Correct!' : '✗ Not quite — here\'s why:'}
                </p>
                <p className={`text-sm leading-relaxed ${isCorrect ? 'text-emerald-800 dark:text-emerald-200' : 'text-amber-800 dark:text-amber-200'}`}>
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${
                  i === currentQ ? 'w-6 bg-brand-500' :
                  answers[i] === QUIZ_QUESTIONS[i].correct ? 'w-1.5 bg-emerald-500' :
                  answers[i] !== null ? 'w-1.5 bg-rose-500' :
                  'w-1.5 bg-gray-200 dark:bg-gray-700'
                }`} />
              ))}
            </div>
            <Button onClick={goNext} variant="primary" disabled={!showResult} icon={<ChevronRight className="w-4 h-4" />}>
              {currentQ < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
