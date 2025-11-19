'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface WeekSummary {
  quizzes_completed: number
  total_questions: number
  average_score: number
  topics_practiced: number
}

interface TopicMetric {
  topic: string
  topic_name: string
  total_questions: number
  correct_questions: number
  accuracy: number
  recent_attempts: number
  needs_attention: boolean
}

interface Recommendation {
  type: 'review' | 'practice' | 'new_topic'
  priority: 'high' | 'medium' | 'low'
  topic: string
  topic_name: string
  reason: string
  suggested_duration: number
  focus_areas: string[]
}

interface SessionStructure {
  warmup: { duration: number; activity: string; topics: string[] }
  main_focus: { duration: number; activity: string; topic: string; focus_areas: string[] }
  practice: { duration: number; activity: string; topic: string; recommended_count: number }
  wrap_up: { duration: number; activity: string }
}

interface SessionPlanData {
  hasData: boolean
  lessonPlan: {
    week_summary: WeekSummary
    priority_topics: TopicMetric[]
    strong_topics: TopicMetric[]
    not_started_topics: TopicMetric[]
    recommendations: Recommendation[]
    suggested_session_structure: SessionStructure
  }
  detailed_analysis: TopicMetric[]
}

export default function SessionPlannerPage() {
  const [planData, setPlanData] = useState<SessionPlanData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessionPlan()
  }, [])

  const fetchSessionPlan = async () => {
    try {
      const res = await fetch('/api/tutor/session-plan')
      if (res.ok) {
        const data = await res.json()
        setPlanData(data)
      }
    } catch (error) {
      console.error('Error fetching session plan:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'review':
        return { icon: '🔄', label: 'Review', color: 'text-orange-400' }
      case 'practice':
        return { icon: '📝', label: 'Practice', color: 'text-blue-400' }
      case 'new_topic':
        return { icon: '🆕', label: 'New Topic', color: 'text-green-400' }
      default:
        return { icon: '📚', label: 'General', color: 'text-gray-400' }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!planData?.hasData) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link href="/tutor/dashboard" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>

        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-12 text-center">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">No Recent Activity</h2>
          <p className="text-gray-400 mb-6">Student hasn't completed any quizzes in the last 7 days.</p>
          <Link href="/tutor/create-quiz" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Create a Quiz
          </Link>
        </div>
      </div>
    )
  }

  const { lessonPlan, detailed_analysis } = planData
  const { week_summary, priority_topics, strong_topics, not_started_topics, recommendations, suggested_session_structure } = lessonPlan

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/tutor/dashboard" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">📅 Session Planning Assistant</h1>
        <p className="text-gray-400">AI-powered lesson plan based on student's last 7 days performance</p>
      </div>

      {/* Week Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{week_summary.quizzes_completed}</div>
              <div className="text-gray-400 text-sm">Quizzes Done</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{week_summary.total_questions}</div>
              <div className="text-gray-400 text-sm">Questions</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{week_summary.average_score}%</div>
              <div className="text-gray-400 text-sm">Avg Score</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{week_summary.topics_practiced}</div>
              <div className="text-gray-400 text-sm">Topics Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Recommendations */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🎯</span> Recommended Focus for Next Session
        </h2>

        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec, index) => {
              const typeBadge = getTypeBadge(rec.type)
              return (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg border border-white/10 p-5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{typeBadge.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`text-lg font-bold ${typeBadge.color}`}>{rec.topic_name}</h3>
                          <span className="text-gray-500 text-sm">({rec.topic})</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{rec.reason}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-lg border text-xs font-semibold ${getPriorityBadge(rec.priority)}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                      <span className="text-blue-400 text-sm font-semibold">{rec.suggested_duration} mins</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm mb-2 font-medium">Suggested Focus Areas:</div>
                    <div className="flex flex-wrap gap-2">
                      {rec.focus_areas.map((area, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-md text-sm border border-blue-500/30">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">All topics are performing well! Continue with regular syllabus coverage.</p>
        )}
      </div>

      {/* Suggested Session Structure */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>⏰</span> Suggested 60-Minute Session Structure
        </h2>

        <div className="space-y-4">
          {/* Warm-up */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
              <span className="text-xl font-bold text-purple-400">{suggested_session_structure.warmup.duration}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">Warm-up</h3>
              <p className="text-gray-400 text-sm mb-2">{suggested_session_structure.warmup.activity}</p>
              {suggested_session_structure.warmup.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {suggested_session_structure.warmup.topics.map((topic, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded border border-purple-500/30">
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Focus */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <span className="text-xl font-bold text-blue-400">{suggested_session_structure.main_focus.duration}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">Main Focus</h3>
              <p className="text-gray-400 text-sm mb-2">{suggested_session_structure.main_focus.activity}</p>
              <div className="text-blue-400 font-medium mb-2">{suggested_session_structure.main_focus.topic}</div>
              {suggested_session_structure.main_focus.focus_areas.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {suggested_session_structure.main_focus.focus_areas.map((area, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/30">
                      {area}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Practice */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
              <span className="text-xl font-bold text-green-400">{suggested_session_structure.practice.duration}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">Practice Session</h3>
              <p className="text-gray-400 text-sm mb-2">{suggested_session_structure.practice.activity}</p>
              <div className="text-green-400 font-medium">{suggested_session_structure.practice.topic} - ~{suggested_session_structure.practice.recommended_count} questions</div>
            </div>
          </div>

          {/* Wrap-up */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
              <span className="text-xl font-bold text-orange-400">{suggested_session_structure.wrap_up.duration}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">Wrap-up</h3>
              <p className="text-gray-400 text-sm">{suggested_session_structure.wrap_up.activity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Priority Topics */}
        {priority_topics.length > 0 && (
          <div className="bg-red-500/10 backdrop-blur-xl rounded-xl border border-red-500/30 p-6">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <span>⚠️</span> Needs Attention ({priority_topics.length})
            </h3>
            <div className="space-y-3">
              {priority_topics.map(topic => (
                <div key={topic.topic} className="bg-white/5 rounded-lg p-3 border border-red-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{topic.topic_name}</span>
                    <span className="text-red-400 font-bold">{topic.accuracy}%</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {topic.correct_questions}/{topic.total_questions} questions correct
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strong Topics */}
        {strong_topics.length > 0 && (
          <div className="bg-green-500/10 backdrop-blur-xl rounded-xl border border-green-500/30 p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
              <span>💪</span> Strong Areas ({strong_topics.length})
            </h3>
            <div className="space-y-3">
              {strong_topics.map(topic => (
                <div key={topic.topic} className="bg-white/5 rounded-lg p-3 border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{topic.topic_name}</span>
                    <span className="text-green-400 font-bold">{topic.accuracy}%</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {topic.correct_questions}/{topic.total_questions} questions correct
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not Started */}
        {not_started_topics.length > 0 && (
          <div className="bg-blue-500/10 backdrop-blur-xl rounded-xl border border-blue-500/30 p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
              <span>📝</span> Not Yet Covered ({not_started_topics.length})
            </h3>
            <div className="space-y-2">
              {not_started_topics.map(topic => (
                <div key={topic.topic} className="bg-white/5 rounded-lg p-3 border border-blue-500/20">
                  <span className="text-white font-medium">{topic.topic_name}</span>
                  <div className="text-xs text-gray-400 mt-1">Ready to introduce</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
