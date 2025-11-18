'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TOPIC_NAMES } from '@/lib/types'

interface AnalyticsData {
  hasData: boolean
  overall: {
    total_quizzes: number
    average_score: number
    total_score: number
    total_possible: number
    avg_time_efficiency: number
    improvement_trend: number | null
  }
  scoreTrend: Array<{
    quiz_number: number
    quiz_title: string
    percentage: number
    score: number
    total: number
    date: string
    topic: string
  }>
  difficultyBreakdown: Array<{
    difficulty: string
    average: number
    quizzes_taken: number
  }>
  best: {
    quiz_title: string
    percentage: number
    score: number
    total: number
    date: string
  }
  worst: {
    quiz_title: string
    percentage: number
    score: number
    total: number
    date: string
  }
  recentActivity: Array<{
    quiz_title: string
    topic: string
    score: number
    total_marks: number
    percentage: number
    submitted_at: string
  }>
}

interface TopicMasteryData {
  hasData: boolean
  overview: {
    topics_attempted: number
    topics_mastered: number
    topics_proficient: number
    average_accuracy: number
  }
  topicMastery: Array<{
    topic: string
    topic_name: string
    total_questions: number
    correct_questions: number
    accuracy: number
    average_score: number
    quizzes_completed: number
    marks_awarded: number
    total_marks: number
    last_attempt: string | null
    mastery_level: 'not_started' | 'beginner' | 'developing' | 'proficient' | 'mastered'
  }>
  strengths: Array<any>
  weaknesses: Array<any>
  radarData: Array<{
    topic: string
    topic_name: string
    accuracy: number
  }>
}

export default function ProgressPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [topicMastery, setTopicMastery] = useState<TopicMasteryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [analyticsRes, topicRes] = await Promise.all([
        fetch('/api/student/analytics'),
        fetch('/api/student/topic-mastery'),
      ])

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json()
        setAnalytics(analyticsData)
      }

      if (topicRes.ok) {
        const topicData = await topicRes.json()
        setTopicMastery(topicData)
      }
    } catch (error) {
      console.error('Error fetching progress data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMasteryColor = (level: string) => {
    switch (level) {
      case 'mastered':
        return 'bg-green-500/20 text-green-400 border-green-500'
      case 'proficient':
        return 'bg-blue-500/20 text-blue-400 border-blue-500'
      case 'developing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
      case 'beginner':
        return 'bg-orange-500/20 text-orange-400 border-orange-500'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!analytics?.hasData && !topicMastery?.hasData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-12 text-center">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">No Progress Data Yet</h2>
          <p className="text-gray-400 mb-6">Complete some quizzes to see your progress and analytics!</p>
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
        <h1 className="text-3xl font-bold text-white mb-2">Progress & Analytics</h1>
        <p className="text-gray-400">Track your performance across all quizzes and topics</p>
      </div>

      {/* Overall Stats */}
      {analytics?.hasData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-white">{analytics.overall.total_quizzes}</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Quizzes Completed</h3>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-white">{analytics.overall.average_score}%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Average Score</h3>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-white">{analytics.overall.avg_time_efficiency}%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Time Efficiency</h3>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-white">
                  {analytics.overall.improvement_trend !== null ? (
                    analytics.overall.improvement_trend > 0 ? `+${analytics.overall.improvement_trend}%` : `${analytics.overall.improvement_trend}%`
                  ) : 'N/A'}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Improvement Trend</h3>
              {analytics.overall.improvement_trend !== null && (
                <p className="text-xs text-gray-500 mt-1">Last 5 vs First 5</p>
              )}
            </div>
          </div>

          {/* Score Trend Chart */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Score Trend</h2>
            {analytics.scoreTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.scoreTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="quiz_number"
                    stroke="#9CA3AF"
                    label={{ value: 'Quiz Number', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    domain={[0, 100]}
                    label={{ value: 'Score %', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    formatter={(value: any, name: string) => {
                      if (name === 'percentage') return [`${value}%`, 'Score']
                      return [value, name]
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-8">No quiz data available</p>
            )}
          </div>

          {/* Difficulty Breakdown */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Performance by Difficulty</h2>
            {analytics.difficultyBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analytics.difficultyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="difficulty" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="average" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-8">No difficulty data available</p>
            )}
          </div>

          {/* Best and Worst */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 backdrop-blur-xl rounded-xl border border-green-500/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-400">Best Performance</h3>
              </div>
              <div className="space-y-2">
                <p className="text-white font-semibold">{analytics.best.quiz_title}</p>
                <p className="text-green-400 text-2xl font-bold">{analytics.best.percentage}%</p>
                <p className="text-gray-400 text-sm">{analytics.best.score}/{analytics.best.total} marks</p>
                <p className="text-gray-500 text-xs">{new Date(analytics.best.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-red-500/10 backdrop-blur-xl rounded-xl border border-red-500/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-400">Needs Improvement</h3>
              </div>
              <div className="space-y-2">
                <p className="text-white font-semibold">{analytics.worst.quiz_title}</p>
                <p className="text-red-400 text-2xl font-bold">{analytics.worst.percentage}%</p>
                <p className="text-gray-400 text-sm">{analytics.worst.score}/{analytics.worst.total} marks</p>
                <p className="text-gray-500 text-xs">{new Date(analytics.worst.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Topic Mastery */}
      {topicMastery?.hasData && (
        <>
          {/* Topic Overview */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Topic Mastery Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white">{topicMastery.overview.topics_attempted}/10</div>
                <div className="text-gray-400 text-sm mt-1">Topics Attempted</div>
              </div>
              <div className="bg-green-500/10 rounded-lg p-4 text-center border border-green-500/30">
                <div className="text-3xl font-bold text-green-400">{topicMastery.overview.topics_mastered}</div>
                <div className="text-gray-400 text-sm mt-1">Mastered (≥90%)</div>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-4 text-center border border-blue-500/30">
                <div className="text-3xl font-bold text-blue-400">{topicMastery.overview.topics_proficient}</div>
                <div className="text-gray-400 text-sm mt-1">Proficient (≥75%)</div>
              </div>
              <div className="bg-purple-500/10 rounded-lg p-4 text-center border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400">{topicMastery.overview.average_accuracy}%</div>
                <div className="text-gray-400 text-sm mt-1">Avg Accuracy</div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={topicMastery.radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="topic" stroke="#9CA3AF" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9CA3AF" />
                  <Radar name="Accuracy" dataKey="accuracy" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Topic Breakdown Table */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Detailed Topic Breakdown</h2>
            <div className="space-y-3">
              {topicMastery.topicMastery.map(topic => (
                <div key={topic.topic} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-400 font-mono font-bold text-lg">{topic.topic}</span>
                      <span className="text-gray-300 font-medium">{topic.topic_name}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getMasteryColor(topic.mastery_level)}`}>
                      {topic.mastery_level.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  {topic.total_questions > 0 ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-gray-400 text-xs">Questions</div>
                          <div className="text-white font-semibold">{topic.correct_questions}/{topic.total_questions}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs">Accuracy</div>
                          <div className="text-white font-semibold">{topic.accuracy}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs">Marks</div>
                          <div className="text-white font-semibold">{topic.marks_awarded}/{topic.total_marks}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs">Quizzes</div>
                          <div className="text-white font-semibold">{topic.quizzes_completed}</div>
                        </div>
                      </div>

                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            topic.accuracy >= 90
                              ? 'bg-green-500'
                              : topic.accuracy >= 75
                              ? 'bg-blue-500'
                              : topic.accuracy >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${topic.accuracy}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 text-sm">No attempts yet</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strengths and Weaknesses */}
          {(topicMastery.strengths.length > 0 || topicMastery.weaknesses.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topicMastery.strengths.length > 0 && (
                <div className="bg-green-500/10 backdrop-blur-xl rounded-xl border border-green-500/30 p-6">
                  <h3 className="text-lg font-bold text-green-400 mb-4">💪 Your Strengths</h3>
                  <div className="space-y-2">
                    {topicMastery.strengths.map(topic => (
                      <div key={topic.topic} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{topic.topic_name}</span>
                        <span className="text-green-400 font-bold">{topic.accuracy}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {topicMastery.weaknesses.length > 0 && (
                <div className="bg-orange-500/10 backdrop-blur-xl rounded-xl border border-orange-500/30 p-6">
                  <h3 className="text-lg font-bold text-orange-400 mb-4">📚 Focus Areas</h3>
                  <div className="space-y-2">
                    {topicMastery.weaknesses.map(topic => (
                      <div key={topic.topic} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{topic.topic_name}</span>
                        <span className="text-orange-400 font-bold">{topic.accuracy}%</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mt-4">💡 Review mistakes in these topics to improve</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
