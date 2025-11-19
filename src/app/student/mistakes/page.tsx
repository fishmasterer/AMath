'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { QuizTopic, TOPIC_NAMES } from '@/lib/types'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

interface Mistake {
  id: string
  question_index: number
  question_text: string
  question_full: string
  options: string[]
  explanation?: string
  topic: string
  topic_name: string
  question_type: 'mcq' | 'multi_select'
  student_answer: string | string[]
  correct_answer: string | string[]
  marks_awarded: number
  marks_possible: number
  created_at: string
  quiz_id: string
  quiz_title: string
  quiz_difficulty: string
  submitted_at: string
}

interface MistakesData {
  hasData: boolean
  message?: string
  summary: {
    total_mistakes: number
    topics_with_mistakes: number
    most_common_topic: string
    mcq_mistakes: number
    multi_select_mistakes: number
    total_marks_lost: number
    avg_marks_lost_per_mistake: string
  }
  groupedMistakes: Array<{
    topic: string
    topic_name: string
    mistake_count: number
    mistakes: Mistake[]
    latest_mistake: string
  }>
  recentMistakes: Mistake[]
}

export default function MistakesPage() {
  const [data, setData] = useState<MistakesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTopic, setSelectedTopic] = useState<string>('all')
  const [expandedMistakes, setExpandedMistakes] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'grouped' | 'recent'>('grouped')

  useEffect(() => {
    fetchMistakes()
  }, [selectedTopic])

  const fetchMistakes = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedTopic !== 'all') {
        params.append('topic', selectedTopic)
      }

      const response = await fetch(`/api/student/mistakes?${params}`)
      if (response.ok) {
        const mistakesData = await response.json()
        setData(mistakesData)
      }
    } catch (error) {
      console.error('Error fetching mistakes:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMistake = (id: string) => {
    const newExpanded = new Set(expandedMistakes)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedMistakes(newExpanded)
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
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const allTopics: QuizTopic[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'G1', 'G2', 'G3', 'C1']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!data?.hasData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-xl border border-green-500/30 p-12 text-center">
          <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">Perfect Record!</h2>
          <p className="text-gray-400">{data?.message || 'You haven\'t made any mistakes yet. Keep up the great work!'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Mistake Journal</h1>
        <p className="text-gray-400">Learn from your mistakes to improve your understanding</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-red-500/10 backdrop-blur-xl rounded-xl border border-red-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">{data.summary.total_mistakes}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Total Mistakes</h3>
        </div>

        <div className="bg-orange-500/10 backdrop-blur-xl rounded-xl border border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">{data.summary.topics_with_mistakes}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Topics Affected</h3>
        </div>

        <div className="bg-purple-500/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">{data.summary.most_common_topic}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Most Common</h3>
        </div>

        <div className="bg-blue-500/10 backdrop-blur-xl rounded-xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">{data.summary.total_marks_lost}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Marks Lost</h3>
        </div>
      </div>

      {/* Mistake Type Breakdown */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Mistake Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Multiple Choice (MCQ)</p>
                <p className="text-2xl font-bold text-white">{data.summary.mcq_mistakes}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">
                  {Math.round((data.summary.mcq_mistakes / data.summary.total_mistakes) * 100)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Multiple Select</p>
                <p className="text-2xl font-bold text-white">{data.summary.multi_select_mistakes}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">
                  {Math.round((data.summary.multi_select_mistakes / data.summary.total_mistakes) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
          <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Average marks lost per mistake: {data.summary.avg_marks_lost_per_mistake}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Topic Filter */}
          <div className="flex-1">
            <label className="text-gray-400 text-sm mb-2 block">Filter by Topic:</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full md:w-64 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Topics</option>
              {allTopics.map(topic => (
                <option key={topic} value={topic}>
                  {topic} - {TOPIC_NAMES[topic]}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-4 py-2 rounded transition-colors ${
                viewMode === 'grouped'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              By Topic
            </button>
            <button
              onClick={() => setViewMode('recent')}
              className={`px-4 py-2 rounded transition-colors ${
                viewMode === 'recent'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Recent
            </button>
          </div>
        </div>
      </div>

      {/* Mistakes Display */}
      {viewMode === 'grouped' ? (
        // Grouped by Topic
        <div className="space-y-6">
          {data.groupedMistakes.map(group => (
            <div key={group.topic} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-mono font-bold text-xl">{group.topic}</span>
                  <span className="text-white font-semibold text-lg">{group.topic_name}</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg text-sm font-semibold">
                    {group.mistake_count} {group.mistake_count === 1 ? 'mistake' : 'mistakes'}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  Latest: {formatDate(group.latest_mistake)}
                </span>
              </div>

              <div className="space-y-3">
                {group.mistakes.map((mistake) => {
                  const isExpanded = expandedMistakes.has(mistake.id)
                  const studentAnswerDisplay = Array.isArray(mistake.student_answer)
                    ? mistake.student_answer.join(', ')
                    : mistake.student_answer
                  const correctAnswerDisplay = Array.isArray(mistake.correct_answer)
                    ? mistake.correct_answer.join(', ')
                    : mistake.correct_answer

                  return (
                    <div
                      key={mistake.id}
                      className="bg-white/5 rounded-lg border-2 border-red-500/30"
                    >
                      {/* Mistake Header */}
                      <button
                        onClick={() => toggleMistake(mistake.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-semibold">{mistake.quiz_title}</span>
                              <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded">
                                -{((mistake.marks_possible ?? 0) - (mistake.marks_awarded ?? 0)).toFixed(1)} marks
                              </span>
                            </div>
                            <div className="text-gray-400 text-sm">
                              Your answer: <span className="text-red-400">{studentAnswerDisplay || 'No answer'}</span>
                              {' • '}
                              <span className="text-gray-500">{formatDate(mistake.submitted_at)}</span>
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Mistake Details (Expanded) */}
                      {isExpanded && (
                        <div className="p-4 border-t border-white/10 space-y-4">
                          {/* Question Text */}
                          <div>
                            <div className="text-gray-400 text-sm mb-2">Question:</div>
                            <div className="text-white text-lg">
                              {renderTextWithLatex(mistake.question_full)}
                            </div>
                          </div>

                          {/* Options */}
                          {mistake.options && mistake.options.length > 0 && (
                            <div>
                              <div className="text-gray-400 text-sm mb-2">Options:</div>
                              <div className="space-y-2">
                                {mistake.options.map((option, optIndex) => {
                                  const optionLetter = String.fromCharCode(65 + optIndex)
                                  const isStudentAnswer = Array.isArray(mistake.student_answer)
                                    ? mistake.student_answer.includes(optionLetter)
                                    : mistake.student_answer === optionLetter
                                  const isCorrectAnswer = Array.isArray(mistake.correct_answer)
                                    ? mistake.correct_answer.includes(optionLetter)
                                    : mistake.correct_answer === optionLetter

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
                                        <span className="ml-2 text-xs">✓ Correct Answer</span>
                                      )}
                                      {isStudentAnswer && !isCorrectAnswer && (
                                        <span className="ml-2 text-xs">✗ Your Answer</span>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {/* Correct Answer Highlight */}
                          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <div className="text-green-400 text-sm font-medium mb-1">Correct Answer:</div>
                            <div className="text-green-400 font-semibold">{correctAnswerDisplay}</div>
                          </div>

                          {/* Explanation */}
                          {mistake.explanation && (
                            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                              <div className="text-blue-400 text-sm font-medium mb-1">Explanation:</div>
                              <div className="text-gray-300 text-sm">
                                {renderTextWithLatex(mistake.explanation)}
                              </div>
                            </div>
                          )}

                          {/* Study Tip */}
                          <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <div className="text-purple-400 text-sm font-medium mb-1">💡 Study Tip:</div>
                            <div className="text-gray-300 text-sm">
                              Review the {group.topic_name} chapter and practice similar questions. Focus on understanding why the correct answer is right, not just memorizing it.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Recent Mistakes
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Mistakes</h2>
          <div className="space-y-3">
            {data.recentMistakes.map((mistake) => {
              const isExpanded = expandedMistakes.has(mistake.id)
              const studentAnswerDisplay = Array.isArray(mistake.student_answer)
                ? mistake.student_answer.join(', ')
                : mistake.student_answer
              const correctAnswerDisplay = Array.isArray(mistake.correct_answer)
                ? mistake.correct_answer.join(', ')
                : mistake.correct_answer

              return (
                <div
                  key={mistake.id}
                  className="bg-white/5 rounded-lg border-2 border-red-500/30"
                >
                  {/* Mistake Header */}
                  <button
                    onClick={() => toggleMistake(mistake.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-blue-400 font-mono text-sm">{mistake.topic}</span>
                          <span className="text-white font-semibold">{mistake.quiz_title}</span>
                        </div>
                        <div className="text-gray-400 text-sm">
                          {formatDate(mistake.submitted_at)}
                          {' • '}
                          Your answer: <span className="text-red-400">{studentAnswerDisplay || 'No answer'}</span>
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded content (same as grouped view) */}
                  {isExpanded && (
                    <div className="p-4 border-t border-white/10 space-y-4">
                      <div>
                        <div className="text-gray-400 text-sm mb-2">Question:</div>
                        <div className="text-white text-lg">
                          {renderTextWithLatex(mistake.question_full)}
                        </div>
                      </div>

                      {mistake.options && mistake.options.length > 0 && (
                        <div>
                          <div className="text-gray-400 text-sm mb-2">Options:</div>
                          <div className="space-y-2">
                            {mistake.options.map((option, optIndex) => {
                              const optionLetter = String.fromCharCode(65 + optIndex)
                              const isStudentAnswer = Array.isArray(mistake.student_answer)
                                ? mistake.student_answer.includes(optionLetter)
                                : mistake.student_answer === optionLetter
                              const isCorrectAnswer = Array.isArray(mistake.correct_answer)
                                ? mistake.correct_answer.includes(optionLetter)
                                : mistake.correct_answer === optionLetter

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
                                  {isCorrectAnswer && <span className="ml-2 text-xs">✓ Correct</span>}
                                  {isStudentAnswer && !isCorrectAnswer && <span className="ml-2 text-xs">✗ Your answer</span>}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="text-green-400 text-sm font-medium mb-1">Correct Answer:</div>
                        <div className="text-green-400 font-semibold">{correctAnswerDisplay}</div>
                      </div>

                      {mistake.explanation && (
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <div className="text-blue-400 text-sm font-medium mb-1">Explanation:</div>
                          <div className="text-gray-300 text-sm">
                            {renderTextWithLatex(mistake.explanation)}
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
      )}
    </div>
  )
}
