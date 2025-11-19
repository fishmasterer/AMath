'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TOPIC_NAMES } from '@/lib/types'

interface Submission {
  id: string
  quiz_id: string
  quiz_title: string
  quiz_topic: string
  quiz_difficulty: string
  quiz_total_marks: number
  student_id: string
  student_name: string
  student_email: string
  started_at: string
  submitted_at: string
  completed: boolean
  score: number
  total_marks: number
  percentage: number
  grade: string
  time_taken_seconds: number
  time_limit_minutes: number
}

export default function SubmissionsPage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    quiz_id: '',
    student_id: '',
  })

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('tutorAuth')
    if (!isAuth) {
      router.push('/tutor')
      return
    }

    fetchSubmissions()
  }, [router, filters])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.quiz_id) params.append('quiz_id', filters.quiz_id)
      if (filters.student_id) params.append('student_id', filters.student_id)

      const response = await fetch(`/api/tutor/submissions?${params.toString()}`)
      const data = await response.json()

      if (response.ok && data.success) {
        setSubmissions(data.submissions || [])
      } else {
        console.error('Failed to fetch submissions:', data.error)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400 bg-green-500/20 border-green-500'
    if (grade.startsWith('B')) return 'text-blue-400 bg-blue-500/20 border-blue-500'
    if (grade.startsWith('C')) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500'
    if (grade.startsWith('D')) return 'text-orange-400 bg-orange-500/20 border-orange-500'
    return 'text-red-400 bg-red-500/20 border-red-500'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-SG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/tutor/dashboard" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-white">Student Submissions</h1>
                  <p className="text-xs text-slate-400">Review quiz attempts</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-6">
              <div className="text-slate-400 text-sm mb-1">Total Submissions</div>
              <div className="text-3xl font-bold text-white">{submissions.length}</div>
            </div>
            <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-6">
              <div className="text-slate-400 text-sm mb-1">Avg Score</div>
              <div className="text-3xl font-bold text-green-400">
                {submissions.length > 0
                  ? Math.round(submissions.reduce((sum, s) => sum + s.percentage, 0) / submissions.length)
                  : 0}%
              </div>
            </div>
            <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6">
              <div className="text-slate-400 text-sm mb-1">Unique Quizzes</div>
              <div className="text-3xl font-bold text-blue-400">
                {new Set(submissions.map(s => s.quiz_id)).size}
              </div>
            </div>
            <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
              <div className="text-slate-400 text-sm mb-1">Students</div>
              <div className="text-3xl font-bold text-purple-400">
                {new Set(submissions.map(s => s.student_id)).size}
              </div>
            </div>
          </div>

          {/* Submissions List */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">All Submissions</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                <p className="text-slate-400">Loading submissions...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-slate-400">No submissions yet. Students haven't completed any quizzes.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-semibold">{submission.quiz_title}</h3>
                          <span className={`px-3 py-1 rounded-lg border text-sm font-bold ${getGradeColor(submission.grade)}`}>
                            {submission.grade}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-2">
                          <span className="flex items-center gap-1">
                            <span className="text-cyan-400">👤</span>
                            {submission.student_name}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-blue-400">📖</span>
                            {TOPIC_NAMES[submission.quiz_topic as keyof typeof TOPIC_NAMES] || submission.quiz_topic}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-violet-400">📊</span>
                            {submission.quiz_difficulty}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-green-400">✓</span>
                            {submission.score}/{submission.total_marks} ({submission.percentage}%)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-amber-400">⏱️</span>
                            {formatTime(submission.time_taken_seconds)}
                          </span>
                        </div>

                        <div className="text-xs text-slate-500">
                          Submitted: {formatDate(submission.submitted_at)}
                        </div>
                      </div>

                      <Link
                        href={`/tutor/submissions/${submission.id}`}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 transition-all whitespace-nowrap"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
