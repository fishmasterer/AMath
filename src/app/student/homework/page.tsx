'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { QuizTopic, TOPIC_NAMES, HomeworkAssignmentWithQuestion } from '@/lib/types'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

interface HomeworkData {
  assignments: HomeworkAssignmentWithQuestion[]
  summary: {
    total_assigned: number
    total_completed: number
    pending: number
    overdue: number
    completion_rate: number
  }
}

export default function HomeworkPage() {
  const [data, setData] = useState<HomeworkData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTopic, setSelectedTopic] = useState<string>('all')
  const [completedFilter, setCompletedFilter] = useState<string>('all')
  const [expandedAssignments, setExpandedAssignments] = useState<Set<string>>(new Set())
  const [showAnswers, setShowAnswers] = useState<Set<string>>(new Set())
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchHomework()
  }, [selectedTopic, completedFilter])

  const fetchHomework = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedTopic !== 'all') {
        params.append('topic', selectedTopic)
      }
      if (completedFilter !== 'all') {
        params.append('completed', completedFilter)
      }

      const response = await fetch(`/api/student/homework?${params}`)
      if (response.ok) {
        const homeworkData = await response.json()
        setData(homeworkData)
      }
    } catch (error) {
      console.error('Error fetching homework:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleAssignment = (id: string) => {
    const newExpanded = new Set(expandedAssignments)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedAssignments(newExpanded)
  }

  const toggleAnswer = (id: string) => {
    const newShowAnswers = new Set(showAnswers)
    if (newShowAnswers.has(id)) {
      newShowAnswers.delete(id)
    } else {
      newShowAnswers.add(id)
    }
    setShowAnswers(newShowAnswers)
  }

  const markAsCompleted = async (assignmentId: string, completed: boolean) => {
    setUpdatingIds(prev => new Set(prev).add(assignmentId))
    try {
      const response = await fetch('/api/student/homework', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment_id: assignmentId, completed })
      })

      if (response.ok) {
        // Refresh data
        await fetchHomework()
      }
    } catch (error) {
      console.error('Error updating homework:', error)
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(assignmentId)
        return newSet
      })
    }
  }

  const renderTextWithLatex = (text: string) => {
    if (!text) return text

    const parts: React.ReactElement[] = []
    let remaining = text
    let key = 0

    // Handle block math ($$...$$ or \[...\])
    if (remaining.includes('$$') || remaining.includes('\\[')) {
      const blockMathRegex = /\$\$(.*?)\$\$|\\\[(.*?)\\\]/gs
      const matches = remaining.matchAll(blockMathRegex)
      let lastIndex = 0

      for (const match of matches) {
        const beforeMatch = remaining.substring(lastIndex, match.index)
        if (beforeMatch) {
          parts.push(<span key={key++}>{beforeMatch}</span>)
        }

        const latex = match[1] || match[2]
        parts.push(<BlockMath key={key++} math={latex} />)
        lastIndex = match.index! + match[0].length
      }

      remaining = remaining.substring(lastIndex)
    }

    // Handle inline math ($...$)
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date'
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return <span className="text-red-400">Overdue</span>
    if (diffDays === 0) return <span className="text-orange-400">Due today</span>
    if (diffDays === 1) return <span className="text-yellow-400">Due tomorrow</span>
    if (diffDays < 7) return <span className="text-blue-400">Due in {diffDays} days</span>
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

  if (!data || data.assignments.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-xl border border-blue-500/30 p-12 text-center">
          <svg className="w-16 h-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">No Homework Assigned</h2>
          <p className="text-gray-400">Your tutor hasn&apos;t assigned any homework yet. Check back later!</p>
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
        <h1 className="text-3xl font-bold text-white mb-2">Paper-Based Homework</h1>
        <p className="text-gray-400">Practice questions from your O-Level textbook - Do these on paper!</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500/10 backdrop-blur-xl rounded-xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">{data.summary.total_assigned}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Total Assigned</h3>
        </div>

        <div className="bg-green-500/10 backdrop-blur-xl rounded-xl border border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">{data.summary.total_completed}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Completed</h3>
        </div>

        <div className="bg-orange-500/10 backdrop-blur-xl rounded-xl border border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">{data.summary.pending}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Pending</h3>
        </div>

        <div className="bg-purple-500/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">{data.summary.completion_rate}%</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Completion Rate</h3>
        </div>
      </div>

      {/* Overdue Alert */}
      {data.summary.overdue > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-400 font-semibold">You have {data.summary.overdue} overdue assignment{data.summary.overdue > 1 ? 's' : ''}!</p>
              <p className="text-gray-400 text-sm">Complete them as soon as possible.</p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Topic Filter */}
          <div className="flex-1">
            <label className="text-gray-400 text-sm mb-2 block">Filter by Topic:</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Topics</option>
              {allTopics.map(topic => (
                <option key={topic} value={topic}>
                  {topic} - {TOPIC_NAMES[topic]}
                </option>
              ))}
            </select>
          </div>

          {/* Completion Filter */}
          <div className="flex-1">
            <label className="text-gray-400 text-sm mb-2 block">Filter by Status:</label>
            <select
              value={completedFilter}
              onChange={(e) => setCompletedFilter(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Assignments</option>
              <option value="false">Pending Only</option>
              <option value="true">Completed Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {data.assignments.map((assignment) => {
          const isExpanded = expandedAssignments.has(assignment.id)
          const answerVisible = showAnswers.has(assignment.id)
          const isUpdating = updatingIds.has(assignment.id)
          const isOverdue = !assignment.completed && assignment.due_date && new Date(assignment.due_date) < new Date()

          return (
            <div
              key={assignment.id}
              className={`bg-white/5 backdrop-blur-xl rounded-xl border ${
                isOverdue ? 'border-red-500/50' : assignment.completed ? 'border-green-500/30' : 'border-white/10'
              }`}
            >
              {/* Assignment Header */}
              <button
                onClick={() => toggleAssignment(assignment.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Status Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    assignment.completed ? 'bg-green-500/20' : 'bg-blue-500/20'
                  }`}>
                    {assignment.completed ? (
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 font-mono font-bold">{assignment.question.question_code}</span>
                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded text-xs">
                        {assignment.question.topic} - {TOPIC_NAMES[assignment.question.topic as QuizTopic]}
                      </span>
                      {assignment.question.marks && (
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 border border-orange-500/50 rounded text-xs">
                          {assignment.question.marks} marks
                        </span>
                      )}
                      {assignment.question.difficulty && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded text-xs capitalize">
                          {assignment.question.difficulty.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {assignment.question.question_type === 'exam' ? '📝 Exam Question' : '📖 Practice Question'}
                      {' • '}
                      Due: {formatDate(assignment.due_date)}
                      {assignment.completed && assignment.completed_at && (
                        <>
                          {' • '}
                          <span className="text-green-400">Completed {new Date(assignment.completed_at).toLocaleDateString()}</span>
                        </>
                      )}
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

              {/* Assignment Details (Expanded) */}
              {isExpanded && (
                <div className="p-6 border-t border-white/10 space-y-4">
                  {/* Question Text */}
                  <div>
                    <div className="text-gray-400 text-sm mb-2 font-medium">Question:</div>
                    <div className="text-white text-lg leading-relaxed bg-white/5 p-4 rounded-lg border border-white/10">
                      {renderTextWithLatex(assignment.question.question_text)}
                    </div>
                  </div>

                  {/* Source */}
                  {assignment.question.source && (
                    <div className="text-gray-400 text-sm">
                      <span className="font-medium">Source:</span> {assignment.question.source}
                    </div>
                  )}

                  {/* Answer Section */}
                  <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                    <button
                      onClick={() => toggleAnswer(assignment.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-green-400 font-medium">
                          {answerVisible ? 'Hide Answer' : 'Show Answer'}
                        </span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${answerVisible ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {answerVisible && (
                      <div className="p-4 border-t border-white/10 bg-green-500/5">
                        <div className="text-green-400 text-sm font-medium mb-2">Answer:</div>
                        <div className="text-gray-300 leading-relaxed">
                          {renderTextWithLatex(assignment.question.answer_text)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    {!assignment.completed ? (
                      <button
                        onClick={() => markAsCompleted(assignment.id, true)}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isUpdating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Mark as Completed
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => markAsCompleted(assignment.id, false)}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isUpdating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Mark as Incomplete
                          </>
                        )}
                      </button>
                    )}

                    <div className="text-gray-400 text-sm italic ml-auto">
                      💡 Do this question on paper, then check your answer!
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
