'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { QuizTopic, QuizDifficulty, TOPIC_NAMES } from '@/lib/types'

interface Quiz {
  id: string
  title: string
  topic: QuizTopic
  week: number
  difficulty: QuizDifficulty
  due_date: string
  total_marks: number
  time_limit_minutes: number
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue'
  attempt?: {
    score: number
    total_marks: number
  }
}

type ViewMode = 'grid' | 'list'
type SortOption = 'due_date' | 'difficulty' | 'topic' | 'time_limit' | 'title'

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // Filters
  const [selectedTopics, setSelectedTopics] = useState<QuizTopic[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<QuizDifficulty[]>([])
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  // Sorting
  const [sortBy, setSortBy] = useState<SortOption>('due_date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // UI state
  const [showFilters, setShowFilters] = useState(true)

  useEffect(() => {
    fetchQuizzes()
  }, [selectedTopics, selectedDifficulties, selectedWeeks, selectedStatus, searchQuery, sortBy, sortOrder, currentPage])

  const fetchQuizzes = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        sortBy,
        sortOrder,
      })

      if (selectedTopics.length > 0) {
        params.append('topics', selectedTopics.join(','))
      }
      if (selectedDifficulties.length > 0) {
        params.append('difficulties', selectedDifficulties.join(','))
      }
      if (selectedWeeks.length > 0) {
        params.append('weeks', selectedWeeks.join(','))
      }
      if (selectedStatus) {
        params.append('status', selectedStatus)
      }
      if (searchQuery) {
        params.append('search', searchQuery)
      }

      const response = await fetch(`/api/quizzes?${params}`)
      if (response.ok) {
        const data = await response.json()
        setQuizzes(data.quizzes)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTopic = (topic: QuizTopic) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
    setCurrentPage(1)
  }

  const toggleDifficulty = (difficulty: QuizDifficulty) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedTopics([])
    setSelectedDifficulties([])
    setSelectedWeeks([])
    setSelectedStatus('')
    setSearchQuery('')
    setCurrentPage(1)
  }

  const hasActiveFilters = selectedTopics.length > 0 || selectedDifficulties.length > 0 ||
    selectedWeeks.length > 0 || selectedStatus || searchQuery

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

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'Overdue'
    if (diffDays === 0) return 'Due today'
    if (diffDays === 1) return 'Due tomorrow'
    if (diffDays < 7) return `Due in ${diffDays}d`
    return date.toLocaleDateString()
  }

  const getActionButton = (quiz: Quiz) => {
    switch (quiz.status) {
      case 'completed':
        return { text: 'Review', color: 'bg-green-500 hover:bg-green-600' }
      case 'in_progress':
        return { text: 'Resume', color: 'bg-yellow-500 hover:bg-yellow-600' }
      case 'overdue':
        return { text: 'Attempt', color: 'bg-red-500 hover:bg-red-600' }
      default:
        return { text: 'Start Quiz', color: 'bg-blue-500 hover:bg-blue-600' }
    }
  }

  const allTopics: QuizTopic[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'G1', 'G2', 'G3', 'C1']
  const allDifficulties: QuizDifficulty[] = ['foundational', 'intermediate', 'exam_level']

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back button */}
      <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Quiz Library</h1>
        <p className="text-gray-400">Browse and take your assigned quizzes</p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="due_date">Due Date</option>
              <option value="difficulty">Difficulty</option>
              <option value="topic">Topic</option>
              <option value="time_limit">Time Limit</option>
              <option value="title">Title</option>
            </select>

            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white hover:bg-white/10 transition-colors"
              title={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
            >
              {sortOrder === 'asc' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              )}
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Toggle Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white hover:bg-white/10 transition-colors"
          >
            Filters {hasActiveFilters && `(${[selectedTopics.length, selectedDifficulties.length, selectedWeeks.length, selectedStatus ? 1 : 0].filter(n => n > 0).length})`}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="mb-6">
                <h4 className="text-gray-400 text-sm font-medium mb-2">Status</h4>
                <div className="space-y-2">
                  {[
                    { value: '', label: 'All' },
                    { value: 'not_started', label: 'Not Started' },
                    { value: 'in_progress', label: 'In Progress' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'overdue', label: 'Overdue' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={selectedStatus === option.value}
                        onChange={() => {
                          setSelectedStatus(option.value)
                          setCurrentPage(1)
                        }}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Topic Filter */}
              <div className="mb-6">
                <h4 className="text-gray-400 text-sm font-medium mb-2">Topics</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {allTopics.map(topic => (
                    <label key={topic} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-blue-400 font-mono">{topic}</span>
                      <span className="text-gray-400 text-xs">{TOPIC_NAMES[topic]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-6">
                <h4 className="text-gray-400 text-sm font-medium mb-2">Difficulty</h4>
                <div className="space-y-2">
                  {allDifficulties.map(difficulty => (
                    <label key={difficulty} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDifficulties.includes(difficulty)}
                        onChange={() => toggleDifficulty(difficulty)}
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-gray-300 capitalize">{difficulty.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Quiz List */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : quizzes.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-12 text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">No quizzes found</h3>
              <p className="text-gray-400 mb-4">
                {hasActiveFilters ? 'Try adjusting your filters' : 'No quizzes available yet'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-4'}>
                {quizzes.map(quiz => {
                  const action = getActionButton(quiz)
                  return (
                    <Link
                      key={quiz.id}
                      href={`/student/quizzes/${quiz.id}`}
                      className="block bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-5 hover:bg-white/10 hover:border-blue-500/50 transition-all"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-white font-semibold text-lg flex-1 pr-2">{quiz.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs border font-medium ${getStatusColor(quiz.status)}`}>
                          {quiz.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-blue-400 text-sm font-mono">{quiz.topic}</span>
                        <span className={`px-2 py-0.5 rounded text-xs border ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty.replace('_', ' ')}
                        </span>
                        <span className="text-gray-400 text-xs">Week {quiz.week}</span>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {quiz.time_limit_minutes} minutes
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {quiz.total_marks} marks
                        </div>
                        <div className={`flex items-center gap-2 font-medium ${quiz.status === 'overdue' ? 'text-red-400' : 'text-orange-400'}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDueDate(quiz.due_date)}
                        </div>
                      </div>

                      {/* Score (if completed) */}
                      {quiz.status === 'completed' && quiz.attempt && (
                        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="text-green-400 text-sm font-medium">
                            Score: {quiz.attempt.score}/{quiz.attempt.total_marks} ({Math.round((quiz.attempt.score / quiz.attempt.total_marks) * 100)}%)
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <button className={`w-full py-2 ${action.color} text-white rounded-lg font-medium transition-colors`}>
                        {action.text}
                      </button>
                    </Link>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
