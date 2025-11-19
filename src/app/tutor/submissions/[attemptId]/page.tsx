'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TOPIC_NAMES } from '@/lib/types'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

interface QuestionResult {
  id: string
  question_index: number
  question_text: string
  question: string
  options: string[]
  explanation?: string
  topic: string
  question_type: 'mcq' | 'multi_select'
  question_type_display: string
  student_answer: string | string[]
  correct_answer: string | string[]
  is_correct: boolean
  marks_awarded: number
  marks_possible: number
}

interface SubmissionDetails {
  id: string
  quiz: {
    id: string
    title: string
    topic: string
    difficulty: string
    total_marks: number
    time_limit_minutes: number
  }
  student: {
    id: string
    name: string
    email: string
  }
  started_at: string
  submitted_at: string
  completed: boolean
  score: number
  total_marks: number
  percentage: number
  grade: string
  time_taken_seconds: number
  time_used_display: string
  time_efficiency: number
}

interface SubmissionData {
  submission: SubmissionDetails
  summary: {
    total_questions: number
    correct_answers: number
    incorrect_answers: number
    accuracy: number
  }
  question_results: QuestionResult[]
}

export default function SubmissionReviewPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = use(params)
  const router = useRouter()
  const [data, setData] = useState<SubmissionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('tutorAuth')
    if (!isAuth) {
      router.push('/tutor')
      return
    }

    fetchSubmissionDetails()
  }, [router, attemptId])

  const fetchSubmissionDetails = async () => {
    try {
      const response = await fetch(`/api/tutor/submissions/${attemptId}`)
      const result = await response.json()

      if (response.ok && result.success) {
        setData(result)
      } else {
        setError(result.error || 'Failed to load submission')
      }
    } catch (err) {
      console.error('Error fetching submission:', err)
      setError('An error occurred while loading submission')
    } finally {
      setLoading(false)
    }
  }

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedQuestions(newExpanded)
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400 bg-green-500/20 border-green-500'
    if (grade.startsWith('B')) return 'text-blue-400 bg-blue-500/20 border-blue-500'
    if (grade.startsWith('C')) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500'
    if (grade.startsWith('D')) return 'text-orange-400 bg-orange-500/20 border-orange-500'
    return 'text-red-400 bg-red-500/20 border-red-500'
  }

  const renderTextWithLatex = (text: string) => {
    if (!text) return text

    const parts: React.ReactElement[] = []
    let remaining = text
    let key = 0

    while (remaining.includes('$')) {
      const start = remaining.indexOf('$')
      const end = remaining.indexOf('$', start + 1)

      if (end === -1) break

      if (start > 0) {
        parts.push(<span key={key++}>{remaining.substring(0, start)}</span>)
      }

      const latex = remaining.substring(start + 1, end)
      parts.push(<InlineMath key={key++} math={latex} />)

      remaining = remaining.substring(end + 1)
    }

    if (remaining) {
      parts.push(<span key={key++}>{remaining}</span>)
    }

    return parts.length > 0 ? <>{parts}</> : text
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-SG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-8 text-center">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-white mb-2">{error || 'Submission not found'}</h2>
            <Link href="/tutor/submissions" className="inline-block mt-4 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors">
              Back to Submissions
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { submission, summary, question_results } = data

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/50">
          <div className="container mx-auto px-4 py-4">
            <Link href="/tutor/submissions" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Submissions
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{submission.quiz.title}</h1>
                <p className="text-slate-400">
                  {TOPIC_NAMES[submission.quiz.topic as keyof typeof TOPIC_NAMES] || submission.quiz.topic} • {submission.quiz.difficulty}
                </p>
              </div>
              <span className={`px-6 py-3 rounded-xl border-2 text-3xl font-bold ${getGradeColor(submission.grade)}`}>
                {submission.grade}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Student</div>
                <div className="text-white font-semibold">{submission.student.name}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Score</div>
                <div className="text-white font-semibold">{submission.score}/{submission.total_marks}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Percentage</div>
                <div className="text-white font-semibold">{submission.percentage}%</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Time Used</div>
                <div className="text-white font-semibold">{submission.time_used_display}</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-400">
              Submitted: {formatDate(submission.submitted_at)}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-slate-400 text-sm mb-1">Questions</div>
                <div className="text-2xl font-bold text-white">{summary.total_questions}</div>
              </div>
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30 text-center">
                <div className="text-slate-400 text-sm mb-1">Correct</div>
                <div className="text-2xl font-bold text-green-400">{summary.correct_answers}</div>
              </div>
              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30 text-center">
                <div className="text-slate-400 text-sm mb-1">Incorrect</div>
                <div className="text-2xl font-bold text-red-400">{summary.incorrect_answers}</div>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30 text-center">
                <div className="text-slate-400 text-sm mb-1">Accuracy</div>
                <div className="text-2xl font-bold text-blue-400">{summary.accuracy}%</div>
              </div>
            </div>
          </div>

          {/* Question-by-Question Review */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Question Review</h2>
            <div className="space-y-3">
              {question_results.map((result, index) => {
                const isExpanded = expandedQuestions.has(index)
                const studentAnswerDisplay = Array.isArray(result.student_answer)
                  ? result.student_answer.join(', ')
                  : result.student_answer
                const correctAnswerDisplay = Array.isArray(result.correct_answer)
                  ? result.correct_answer.join(', ')
                  : result.correct_answer

                return (
                  <div
                    key={result.id}
                    className={`bg-white/5 rounded-lg border-2 ${result.is_correct ? 'border-green-500/30' : 'border-red-500/30'}`}
                  >
                    {/* Question Header */}
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${result.is_correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {result.is_correct ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-semibold">Question {index + 1}</span>
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded">
                              {result.marks_awarded}/{result.marks_possible} marks
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded">
                              {result.question_type_display}
                            </span>
                          </div>
                          <div className="text-slate-400 text-sm">
                            Student answer: <span className={result.is_correct ? 'text-green-400' : 'text-red-400'}>{studentAnswerDisplay || 'No answer'}</span>
                          </div>
                        </div>
                      </div>
                      <svg className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Question Details (Expanded) */}
                    {isExpanded && (
                      <div className="p-4 border-t border-white/10 space-y-4">
                        {/* Question Text */}
                        <div>
                          <div className="text-slate-400 text-sm mb-2">Question:</div>
                          <div className="text-white text-lg">
                            {renderTextWithLatex(result.question || result.question_text)}
                          </div>
                        </div>

                        {/* Options */}
                        {result.options && result.options.length > 0 && (
                          <div>
                            <div className="text-slate-400 text-sm mb-2">Options:</div>
                            <div className="space-y-2">
                              {result.options.map((option, optIndex) => {
                                const optionLetter = String.fromCharCode(65 + optIndex)
                                const isStudentAnswer = Array.isArray(result.student_answer)
                                  ? result.student_answer.includes(optionLetter)
                                  : result.student_answer === optionLetter
                                const isCorrectAnswer = Array.isArray(result.correct_answer)
                                  ? result.correct_answer.includes(optionLetter)
                                  : result.correct_answer === optionLetter

                                return (
                                  <div
                                    key={optIndex}
                                    className={`p-3 rounded-lg border ${
                                      isCorrectAnswer
                                        ? 'bg-green-500/10 border-green-500/50 text-green-400'
                                        : isStudentAnswer
                                        ? 'bg-red-500/10 border-red-500/50 text-red-400'
                                        : 'bg-white/5 border-white/10 text-slate-400'
                                    }`}
                                  >
                                    <span className="font-bold mr-2">{optionLetter}.</span>
                                    {renderTextWithLatex(option)}
                                    {isCorrectAnswer && (
                                      <span className="ml-2 text-xs">✓ Correct</span>
                                    )}
                                    {isStudentAnswer && !isCorrectAnswer && (
                                      <span className="ml-2 text-xs">✗ Student's answer</span>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Correct Answer */}
                        {!result.is_correct && (
                          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <div className="text-green-400 text-sm font-medium mb-1">Correct Answer:</div>
                            <div className="text-green-400">{correctAnswerDisplay}</div>
                          </div>
                        )}

                        {/* Explanation */}
                        {result.explanation && (
                          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <div className="text-blue-400 text-sm font-medium mb-1">Explanation:</div>
                            <div className="text-slate-300 text-sm">
                              {renderTextWithLatex(result.explanation)}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
