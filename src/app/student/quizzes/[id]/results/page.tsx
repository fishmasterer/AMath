'use client'

import React, { use, useEffect, useState } from 'react'
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
  topic: string
  question_type: 'mcq' | 'multi_select'
  question_type_display: string
  student_answer: string | string[]
  correct_answer: string | string[]
  is_correct: boolean
  marks_awarded: number
  marks_possible: number
  explanation?: string
}

interface ResultsData {
  quiz: {
    id: string
    title: string
    topic: string
    difficulty: string
    total_marks: number
    time_limit_minutes: number
  }
  attempt: {
    id: string
    started_at: string
    submitted_at: string
    score: number
    total_marks: number
    percentage: number
    grade: string
    time_taken_seconds: number
    time_used_display: string
    time_efficiency: number
  }
  summary: {
    total_questions: number
    correct_answers: number
    incorrect_answers: number
    accuracy: number
  }
  topicStats: Array<{
    topic: string
    correct: number
    total: number
    accuracy: number
    marks: number
    possible: number
  }>
  questionResults: QuestionResult[]
}

export default function QuizResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [results, setResults] = useState<ResultsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchResults()
  }, [id])

  const fetchResults = async () => {
    try {
      const response = await fetch(`/api/quizzes/${id}/results`)
      if (response.ok) {
        const data = await response.json()
        setResults(data)
      } else {
        const error = await response.json()
        setError(error.error || 'Failed to load results')
      }
    } catch (err) {
      console.error('Error fetching results:', err)
      setError('An unexpected error occurred')
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !results) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">{error || 'Results not found'}</h2>
          <Link href="/student/quizzes" className="inline-block mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
            Back to Quizzes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/student/quizzes" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Quizzes
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
        <h1 className="text-3xl font-bold text-white mb-2">{results.quiz.title}</h1>
        <p className="text-gray-400">{TOPIC_NAMES[results.quiz.topic as keyof typeof TOPIC_NAMES]} • {results.quiz.difficulty.replace('_', ' ')}</p>
      </div>

      {/* Score Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-4 mb-4">
            <div>
              <div className="text-6xl font-bold text-white mb-2">
                {results.attempt.score}/{results.attempt.total_marks}
              </div>
              <div className="text-2xl text-gray-400">{results.attempt.percentage}%</div>
            </div>
            <div className={`px-6 py-3 rounded-xl border-2 text-3xl font-bold ${getGradeColor(results.attempt.grade)}`}>
              {results.attempt.grade}
            </div>
          </div>
          <p className="text-gray-400">Submitted on {new Date(results.attempt.submitted_at).toLocaleString()}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
            <div className="text-gray-400 text-sm mb-1">Questions</div>
            <div className="text-2xl font-bold text-white">{results.summary.total_questions}</div>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30 text-center">
            <div className="text-gray-400 text-sm mb-1">Correct</div>
            <div className="text-2xl font-bold text-green-400">{results.summary.correct_answers}</div>
          </div>
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30 text-center">
            <div className="text-gray-400 text-sm mb-1">Incorrect</div>
            <div className="text-2xl font-bold text-red-400">{results.summary.incorrect_answers}</div>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30 text-center">
            <div className="text-gray-400 text-sm mb-1">Accuracy</div>
            <div className="text-2xl font-bold text-blue-400">{results.summary.accuracy}%</div>
          </div>
        </div>

        {/* Time Stats */}
        <div className="mt-4 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Time Used: {results.attempt.time_used_display} / {results.quiz.time_limit_minutes}m</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Time Efficiency: {results.attempt.time_efficiency}%</span>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      {results.topicStats.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Topic Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.topicStats.map(stat => (
              <div key={stat.topic} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-mono font-semibold">{stat.topic}</span>
                  <span className={`text-lg font-bold ${stat.accuracy >= 80 ? 'text-green-400' : stat.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {stat.accuracy}%
                  </span>
                </div>
                <div className="text-gray-400 text-sm mb-2">
                  {stat.correct}/{stat.total} correct • {stat.marks}/{stat.possible} marks
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stat.accuracy >= 80 ? 'bg-green-500' : stat.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${stat.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question-by-Question Review */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Question Review</h2>
        <div className="space-y-3">
          {results.questionResults.map((result, index) => {
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
                      <div className="text-gray-400 text-sm">
                        Your answer: <span className={result.is_correct ? 'text-green-400' : 'text-red-400'}>{studentAnswerDisplay || 'No answer'}</span>
                      </div>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Question Details (Expanded) */}
                {isExpanded && (
                  <div className="p-4 border-t border-white/10 space-y-4">
                    {/* Question Text */}
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Question:</div>
                      <div className="text-white text-lg">
                        {renderTextWithLatex(result.question || result.question_text)}
                      </div>
                    </div>

                    {/* Options */}
                    {result.options && result.options.length > 0 && (
                      <div>
                        <div className="text-gray-400 text-sm mb-2">Options:</div>
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
                                    : 'bg-white/5 border-white/10 text-gray-400'
                                }`}
                              >
                                <span className="font-bold mr-2">{optionLetter}.</span>
                                {renderTextWithLatex(option)}
                                {isCorrectAnswer && (
                                  <span className="ml-2 text-xs">✓ Correct</span>
                                )}
                                {isStudentAnswer && !isCorrectAnswer && (
                                  <span className="ml-2 text-xs">✗ Your answer</span>
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
                        <div className="text-gray-300 text-sm">
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

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/student/mistakes"
          className="flex-1 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-400 rounded-lg font-medium text-center transition-colors"
        >
          Review Mistakes
        </Link>
        <Link
          href="/student/progress"
          className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-center transition-colors"
        >
          View Progress
        </Link>
      </div>
    </div>
  )
}
