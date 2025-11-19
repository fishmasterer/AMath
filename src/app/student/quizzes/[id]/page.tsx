'use client'

import { use, useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { QuizTopic, QuizDifficulty, TOPIC_NAMES } from '@/lib/types'

interface QuizDetail {
  id: string
  title: string
  topic: QuizTopic
  week: number
  difficulty: QuizDifficulty
  time_limit_minutes: number
  due_date: string
  total_marks: number
  created_at: string
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue'
  questionStats: {
    total: number
    mcq: number
    multiSelect: number
  }
  attempts: Array<{
    id: string
    started_at: string
    submitted_at?: string
    score?: number
    total_marks?: number
    completed: boolean
  }>
  canAttempt: boolean
  isOverdue: boolean
}

export default function QuizDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [quiz, setQuiz] = useState<QuizDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQuizDetail()
  }, [id])

  const fetchQuizDetail = async () => {
    try {
      const response = await fetch(`/api/quizzes/${id}`)
      if (response.ok) {
        const data = await response.json()
        setQuiz(data)
      } else if (response.status === 404) {
        setError('Quiz not found')
      } else if (response.status === 403) {
        setError('This quiz is not available')
      } else {
        setError('Failed to load quiz')
      }
    } catch (err) {
      console.error('Error fetching quiz:', err)
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleStartQuiz = useCallback(() => {
    // Navigate to quiz attempt page (to be built in Chunk 3)
    router.push(`/student/quizzes/${id}/attempt`)
  }, [router, id])

  const getDifficultyColor = (difficulty: QuizDifficulty) => {
    switch (difficulty) {
      case 'foundational':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'exam_level':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'overdue':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDueDate = useCallback((dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { text: 'Overdue', urgent: true }
    if (diffDays === 0) return { text: 'Due today', urgent: true }
    if (diffDays === 1) return { text: 'Due tomorrow', urgent: true }
    if (diffDays < 7) return { text: `Due in ${diffDays} days`, urgent: false }
    return { text: formatDate(dateString), urgent: false }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">{error || 'Quiz not found'}</h2>
          <p className="text-gray-400 mb-6">The quiz you're looking for doesn't exist or is no longer available.</p>
          <Link href="/student/quizzes" className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
            Back to Quizzes
          </Link>
        </div>
      </div>
    )
  }

  const dueInfo = formatDueDate(quiz.due_date)
  const latestAttempt = quiz.attempts[0]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/student/quizzes" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Quizzes
      </Link>

      {/* Main Quiz Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-lg border text-sm font-medium ${getStatusColor(quiz.status)}`}>
                {quiz.status.replace('_', ' ')}
              </span>
              <span className="text-blue-400 font-mono text-sm">{quiz.topic}</span>
              <span className={`px-3 py-1 rounded-lg border text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                {quiz.difficulty.replace('_', ' ')}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{quiz.title}</h1>
            <p className="text-gray-400">{TOPIC_NAMES[quiz.topic]} • Week {quiz.week}</p>
          </div>
        </div>

        {/* Due Date Alert */}
        <div className={`p-4 rounded-lg border mb-6 ${dueInfo.urgent ? 'bg-red-500/10 border-red-500/50' : 'bg-orange-500/10 border-orange-500/50'}`}>
          <div className="flex items-center gap-3">
            <svg className={`w-6 h-6 ${dueInfo.urgent ? 'text-red-400' : 'text-orange-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className={`font-semibold ${dueInfo.urgent ? 'text-red-400' : 'text-orange-400'}`}>{dueInfo.text}</p>
              <p className="text-gray-400 text-sm">{formatDate(quiz.due_date)}</p>
            </div>
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-gray-400 text-sm mb-1">Questions</div>
            <div className="text-2xl font-bold text-white">{quiz.questionStats.total}</div>
            <div className="text-xs text-gray-500 mt-1">{quiz.questionStats.mcq} MCQ, {quiz.questionStats.multiSelect} Multi</div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-gray-400 text-sm mb-1">Total Marks</div>
            <div className="text-2xl font-bold text-white">{quiz.total_marks}</div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-gray-400 text-sm mb-1">Time Limit</div>
            <div className="text-2xl font-bold text-white">{quiz.time_limit_minutes}</div>
            <div className="text-xs text-gray-500 mt-1">minutes</div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-gray-400 text-sm mb-1">Attempts</div>
            <div className="text-2xl font-bold text-white">{quiz.attempts.length}</div>
          </div>
        </div>

        {/* Action Button */}
        {quiz.status === 'completed' && latestAttempt ? (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">Quiz Completed</h3>
              <p className="text-white text-2xl font-bold">
                {latestAttempt.score}/{latestAttempt.total_marks} ({Math.round((latestAttempt.score! / latestAttempt.total_marks!) * 100)}%)
              </p>
              <p className="text-gray-400 text-sm mt-1">Submitted on {formatDate(latestAttempt.submitted_at!)}</p>
            </div>
            <button
              onClick={() => router.push(`/student/quizzes/${quiz.id}/results`)}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              View Results
            </button>
          </div>
        ) : quiz.status === 'in_progress' ? (
          <button
            onClick={handleStartQuiz}
            className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Resume Quiz
          </button>
        ) : (
          <button
            onClick={handleStartQuiz}
            disabled={!quiz.canAttempt}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 ${
              quiz.canAttempt
                ? quiz.isOverdue
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {quiz.canAttempt ? 'Start Quiz' : 'Quiz Already Started'}
          </button>
        )}
      </div>

      {/* Instructions Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Instructions</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>You have <strong>{quiz.time_limit_minutes} minutes</strong> to complete this quiz</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>The quiz contains <strong>{quiz.questionStats.total} questions</strong> worth a total of <strong>{quiz.total_marks} marks</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Your answers will be automatically saved as you progress</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>You can navigate between questions using the question palette</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>The timer will continue even if you leave the page</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Submit the quiz before the timer runs out to have your answers graded</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span>Once submitted, you cannot modify your answers</span>
          </li>
        </ul>
      </div>

      {/* Attempt History */}
      {quiz.attempts.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Attempt History</h2>
          <div className="space-y-3">
            {quiz.attempts.map((attempt, index) => (
              <div key={attempt.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Attempt #{quiz.attempts.length - index}</p>
                    <p className="text-gray-400 text-sm">Started: {formatDate(attempt.started_at)}</p>
                    {attempt.submitted_at && (
                      <p className="text-gray-400 text-sm">Submitted: {formatDate(attempt.submitted_at)}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {attempt.completed ? (
                      <>
                        <p className="text-white font-bold text-xl">
                          {attempt.score}/{attempt.total_marks}
                        </p>
                        <p className="text-green-400 text-sm">
                          {Math.round((attempt.score! / attempt.total_marks!) * 100)}%
                        </p>
                      </>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded text-sm">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
