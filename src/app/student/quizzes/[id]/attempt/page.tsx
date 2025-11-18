'use client'

import { use, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Timer from '@/components/quiz/Timer'
import QuestionPalette from '@/components/quiz/QuestionPalette'
import QuestionRenderer from '@/components/quiz/QuestionRenderer'
import { Question, StudentAnswer } from '@/lib/types'

interface QuizAttemptData {
  attemptId: string
  quiz: {
    id: string
    title: string
    topic: string
    difficulty: string
    time_limit_minutes: number
    due_date: string
    total_marks: number
    questions: Question[]
  }
  answers: StudentAnswer[]
  startedAt: string
  elapsedSeconds: number
  remainingSeconds: number
  timeIsUp: boolean
}

export default function QuizAttemptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [attemptData, setAttemptData] = useState<QuizAttemptData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<number, string | string[]>>(new Map())
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [autoSaving, setAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initializeQuiz()
  }, [id])

  const initializeQuiz = async () => {
    try {
      // First, try to start the quiz (or get existing attempt)
      const startRes = await fetch(`/api/quizzes/${id}/start`, {
        method: 'POST',
      })

      if (!startRes.ok) {
        const error = await startRes.json()
        setError(error.error || 'Failed to start quiz')
        setLoading(false)
        return
      }

      // Then fetch the full attempt data
      const attemptRes = await fetch(`/api/quizzes/${id}/attempt`)

      if (!attemptRes.ok) {
        const error = await attemptRes.json()
        setError(error.error || 'Failed to load quiz')
        setLoading(false)
        return
      }

      const data: QuizAttemptData = await attemptRes.json()
      console.log('Quiz attempt data:', data)
      console.log('Questions:', data.quiz?.questions)
      console.log('Questions type:', typeof data.quiz?.questions)
      console.log('Questions is array?', Array.isArray(data.quiz?.questions))
      console.log('Questions length:', data.quiz?.questions?.length)
      console.log('First question:', data.quiz?.questions?.[0])

      if (!data.quiz?.questions || !Array.isArray(data.quiz.questions) || data.quiz.questions.length === 0) {
        setError('Quiz has no questions. Please contact support.')
        setLoading(false)
        return
      }

      setAttemptData(data)

      // Load existing answers
      const answerMap = new Map<number, string | string[]>()
      data.answers.forEach(answer => {
        answerMap.set(answer.question_id, answer.answer)
      })
      setAnswers(answerMap)

      // Don't auto-submit if time is up - let user manually submit
      // The timer will show 00:00 and they can still submit

      setLoading(false)
    } catch (err) {
      console.error('Error initializing quiz:', err)
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!attemptData) return

    const interval = setInterval(() => {
      saveAnswers()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [attemptData, answers])

  const saveAnswers = useCallback(async () => {
    if (!attemptData || autoSaving) return

    setAutoSaving(true)
    try {
      const answersArray: StudentAnswer[] = Array.from(answers.entries()).map(
        ([question_id, answer]) => ({
          question_id,
          answer,
          time_spent_seconds: 0, // Could track per-question time if needed
        })
      )

      const response = await fetch(`/api/quizzes/${id}/attempt`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersArray }),
      })

      if (response.ok) {
        setLastSaved(new Date())
      }
    } catch (err) {
      console.error('Error saving answers:', err)
    } finally {
      setAutoSaving(false)
    }
  }, [attemptData, answers, id, autoSaving])

  const handleAnswerChange = (answer: string | string[]) => {
    if (!attemptData) return

    const questionId = attemptData.quiz.questions[currentQuestionIndex].id
    const newAnswers = new Map(answers)
    newAnswers.set(questionId, answer)
    setAnswers(newAnswers)

    // Save after answer change (debounced by auto-save)
    saveAnswers()
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNextQuestion = () => {
    if (attemptData && currentQuestionIndex < attemptData.quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleToggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions)
    if (newFlagged.has(currentQuestionIndex)) {
      newFlagged.delete(currentQuestionIndex)
    } else {
      newFlagged.add(currentQuestionIndex)
    }
    setFlaggedQuestions(newFlagged)
  }

  const getAnsweredQuestions = () => {
    if (!attemptData) return new Set<number>()

    const answered = new Set<number>()
    attemptData.quiz.questions.forEach((q, index) => {
      if (answers.has(q.id)) {
        answered.add(index)
      }
    })
    return answered
  }

  const handleTimeUp = async () => {
    // Auto-submit when time is up
    await handleSubmit(answers)
  }

  const handleTimeWarning = (secondsRemaining: number) => {
    const minutes = Math.floor(secondsRemaining / 60)
    // Could show a toast notification here
    console.log(`⚠️ ${minutes} minutes remaining!`)
  }

  const handleSubmitClick = () => {
    setShowSubmitModal(true)
  }

  const handleSubmit = async (answersToSubmit: Map<number, string | string[]> = answers) => {
    if (!attemptData || submitting) return

    setSubmitting(true)
    try {
      // Calculate time taken
      const startedAt = new Date(attemptData.startedAt)
      const now = new Date()
      const timeTakenSeconds = Math.floor((now.getTime() - startedAt.getTime()) / 1000)

      // Prepare answers array
      const answersArray: StudentAnswer[] = Array.from(answersToSubmit.entries()).map(
        ([question_id, answer]) => ({
          question_id,
          answer,
          time_spent_seconds: 0,
        })
      )

      // Submit the quiz
      const response = await fetch(`/api/quizzes/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId: attemptData.attemptId,
          answers: answersArray,
          time_taken_seconds: timeTakenSeconds,
        }),
      })

      if (response.ok) {
        // Navigate to results page
        router.push(`/student/quizzes/${id}/results`)
      } else {
        const error = await response.json()
        console.error('Submit error response:', error)
        const errorMessage = error.details
          ? `${error.error}: ${error.details}`
          : error.error || 'Failed to submit quiz'
        setError(errorMessage)
        setSubmitting(false)
        setShowSubmitModal(false)
      }
    } catch (err) {
      console.error('Error submitting quiz:', err)
      setError('An unexpected error occurred')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (error || !attemptData) {
    return (
      <div className="max-w-2xl mx-auto mt-20">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">{error || 'Failed to load quiz'}</h2>
          <button
            onClick={() => router.push(`/student/quizzes/${id}`)}
            className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Back to Quiz Details
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = attemptData.quiz.questions[currentQuestionIndex]
  const currentAnswer = answers.get(currentQuestion.id) || null
  const answeredQuestions = getAnsweredQuestions()

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Error banner */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] max-w-2xl w-full mx-4 animate-in slide-in-from-top duration-300">
          <div className="bg-red-500/10 border-2 border-red-500 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-red-400 font-semibold mb-1">Error</h3>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with timer */}
      <div className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{attemptData.quiz.title}</h1>
              <p className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {attemptData.quiz.questions.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Auto-save indicator */}
              <div className="text-sm text-gray-400 flex items-center gap-2">
                {autoSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500"></div>
                    <span>Saving...</span>
                  </>
                ) : lastSaved ? (
                  <>
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Saved {lastSaved.toLocaleTimeString()}</span>
                  </>
                ) : null}
              </div>

              {/* Timer */}
              <div className="w-64">
                <Timer
                  initialSeconds={attemptData.remainingSeconds}
                  onTimeUp={handleTimeUp}
                  onWarning={handleTimeWarning}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Question */}
            <QuestionRenderer
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={currentAnswer}
              onAnswerChange={handleAnswerChange}
              isFlagged={flaggedQuestions.has(currentQuestionIndex)}
              onToggleFlag={handleToggleFlag}
            />

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {currentQuestionIndex === attemptData.quiz.questions.length - 1 ? (
                <button
                  onClick={handleSubmitClick}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-2xl shadow-lg shadow-green-500/50 flex items-center gap-2"
                >
                  Submit Quiz
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-2xl shadow-lg shadow-blue-500/50 flex items-center gap-2"
                >
                  Next
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <QuestionPalette
              totalQuestions={attemptData.quiz.questions.length}
              currentQuestion={currentQuestionIndex}
              answeredQuestions={answeredQuestions}
              flaggedQuestions={flaggedQuestions}
              onQuestionSelect={setCurrentQuestionIndex}
            />
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">Submit Quiz?</h2>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Total Questions:</span>
                <span className="text-white font-semibold">{attemptData.quiz.questions.length}</span>
              </div>
              <div className="flex justify-between p-3 bg-green-500/10 rounded-lg">
                <span className="text-gray-400">Answered:</span>
                <span className="text-green-400 font-semibold">{answeredQuestions.size}</span>
              </div>
              <div className="flex justify-between p-3 bg-red-500/10 rounded-lg">
                <span className="text-gray-400">Unanswered:</span>
                <span className="text-red-400 font-semibold">
                  {attemptData.quiz.questions.length - answeredQuestions.size}
                </span>
              </div>
            </div>

            {answeredQuestions.size < attemptData.quiz.questions.length && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-6 text-yellow-400 text-sm">
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                You have unanswered questions. Are you sure you want to submit?
              </div>
            )}

            <p className="text-gray-400 text-sm mb-6">
              Once submitted, you cannot change your answers. Your quiz will be graded automatically.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                disabled={submitting}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit()}
                disabled={submitting}
                className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Confirm Submit
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
