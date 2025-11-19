'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TOPIC_NAMES, QuizTopic } from '@/lib/types'

interface Question {
  id: string
  question_code?: string
  question_text: string
  question_type: 'mcq' | 'multi_select' | 'short_answer' | 'structured' | 'exam' | 'practice'
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'foundational' | 'intermediate' | 'exam_level'
  marks: number
  topic: QuizTopic
  subtopics?: string[]
  keywords?: string[]
  source_type?: string
  source_reference?: string
  source_year?: number
  times_used?: number
  created_at: string
}

interface Student {
  id: string
  full_name: string
  email: string
}

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    topic: '',
    difficulty: '',
    source_type: '',
    search: ''
  })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [dueDate, setDueDate] = useState('')
  const [assigning, setAssigning] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchQuestions()
    fetchStudents()
  }, [filters])

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/tutor/students')
      if (res.ok) {
        const data = await res.json()
        setStudents(data.students || [])
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const fetchQuestions = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.topic) params.append('topic', filters.topic)
      if (filters.difficulty) params.append('difficulty', filters.difficulty)
      if (filters.source_type) params.append('source_type', filters.source_type)
      if (filters.search) params.append('search', filters.search)

      const res = await fetch(`/api/tutor/question-bank?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setQuestions(data.questions || [])
        setTotal(data.total || 0)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
      case 'foundational':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'Medium':
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'Hard':
      case 'exam_level':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mcq':
      case 'multi_select':
        return '☑️'
      case 'short_answer':
        return '✏️'
      case 'structured':
        return '📝'
      case 'exam':
      case 'practice':
        return '📄'
      default:
        return '❓'
    }
  }

  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question)
    setShowViewModal(true)
  }

  const handleAssignQuestion = (question: Question) => {
    setSelectedQuestion(question)
    setSelectedStudents([])
    setDueDate('')
    setShowAssignModal(true)
  }

  const handleDeleteQuestion = (question: Question) => {
    setSelectedQuestion(question)
    setShowDeleteModal(true)
  }

  const assignHomework = async () => {
    if (!selectedQuestion || selectedStudents.length === 0) return

    setAssigning(true)
    try {
      for (const studentId of selectedStudents) {
        const res = await fetch('/api/tutor/assign-homework', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_id: studentId,
            question_ids: [selectedQuestion.id],
            due_date: dueDate || null
          })
        })

        if (!res.ok) {
          console.error('Failed to assign to student:', studentId)
        }
      }

      alert(`Successfully assigned to ${selectedStudents.length} student(s)!`)
      setShowAssignModal(false)
      setSelectedQuestion(null)
      setSelectedStudents([])
      setDueDate('')
    } catch (error) {
      console.error('Error assigning homework:', error)
      alert('Failed to assign homework. Please try again.')
    } finally {
      setAssigning(false)
    }
  }

  const deleteQuestion = async () => {
    if (!selectedQuestion) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/tutor/question-bank/${selectedQuestion.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        alert('Question deleted successfully!')
        setShowDeleteModal(false)
        setSelectedQuestion(null)
        fetchQuestions() // Refresh list
      } else {
        alert('Failed to delete question.')
      }
    } catch (error) {
      console.error('Error deleting question:', error)
      alert('Failed to delete question. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">📚 Question Bank</h1>
          <p className="text-gray-400">Organize and manage your question library with smart tagging</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/tutor/dashboard"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors"
          >
            Back
          </Link>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Question
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{total}</div>
              <div className="text-gray-400 text-sm">Total Questions</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">☑️</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {questions.filter(q => q.question_type === 'mcq').length}
              </div>
              <div className="text-gray-400 text-sm">MCQ Questions</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {questions.filter(q => q.question_type === 'structured').length}
              </div>
              <div className="text-gray-400 text-sm">Structured</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {questions.reduce((sum, q) => sum + (q.times_used || 0), 0)}
              </div>
              <div className="text-gray-400 text-sm">Times Used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h2 className="text-lg font-bold text-white mb-4">Filter Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Search</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search questions..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Topic Filter */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Topic</label>
            <select
              value={filters.topic}
              onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">All Topics</option>
              {Object.entries(TOPIC_NAMES).map(([code, name]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">All Difficulties</option>
              <option value="foundational">Foundational</option>
              <option value="intermediate">Intermediate</option>
              <option value="exam_level">Exam Level</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Source Type Filter */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Source</label>
            <select
              value={filters.source_type}
              onChange={(e) => setFilters({ ...filters, source_type: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">All Sources</option>
              <option value="past_paper">Past Paper</option>
              <option value="textbook">Textbook</option>
              <option value="custom">Custom</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.topic || filters.difficulty || filters.source_type || filters.search) && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-gray-400 text-sm">Active filters:</span>
            {filters.topic && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm flex items-center gap-2">
                Topic: {filters.topic}
                <button onClick={() => setFilters({ ...filters, topic: '' })} className="hover:text-blue-300">×</button>
              </span>
            )}
            {filters.difficulty && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm flex items-center gap-2">
                Difficulty: {filters.difficulty}
                <button onClick={() => setFilters({ ...filters, difficulty: '' })} className="hover:text-blue-300">×</button>
              </span>
            )}
            {filters.source_type && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm flex items-center gap-2">
                Source: {filters.source_type}
                <button onClick={() => setFilters({ ...filters, source_type: '' })} className="hover:text-blue-300">×</button>
              </span>
            )}
            {filters.search && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm flex items-center gap-2">
                Search: "{filters.search}"
                <button onClick={() => setFilters({ ...filters, search: '' })} className="hover:text-blue-300">×</button>
              </span>
            )}
            <button
              onClick={() => setFilters({ topic: '', difficulty: '', source_type: '', search: '' })}
              className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h2 className="text-lg font-bold text-white mb-4">Questions ({questions.length})</h2>

        {questions.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No Questions Found</h3>
            <p className="text-gray-400 mb-4">
              {filters.topic || filters.difficulty || filters.source_type || filters.search
                ? 'Try adjusting your filters or create a new question'
                : 'Start building your question bank by adding questions'}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Question
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white/5 rounded-lg p-5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getTypeIcon(question.question_type)}</span>
                      {question.question_code && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono font-bold border border-green-500/50">
                          {question.question_code}
                        </span>
                      )}
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-mono">
                        {question.topic}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty.replace('_', ' ')}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
                      </span>
                    </div>
                    <p className="text-white font-medium mb-2 line-clamp-2">
                      {question.question_text}
                    </p>
                    {question.subtopics && question.subtopics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {question.subtopics.map((subtopic, i) => (
                          <span key={i} className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-xs border border-purple-500/30">
                            {subtopic}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      {question.source_reference && (
                        <span>📄 {question.source_reference}</span>
                      )}
                      <span>Used {question.times_used || 0} times</span>
                      <span>{new Date(question.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewQuestion(question)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                      title="View Question"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleAssignQuestion(question)}
                      className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
                      title="Assign to Students"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                      title="Delete Question"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Question Modal */}
      {showViewModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl border border-white/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">View Question</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Metadata */}
              <div className="flex flex-wrap gap-3">
                {selectedQuestion.question_code && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-mono font-bold border border-green-500/50">
                    {selectedQuestion.question_code}
                  </span>
                )}
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-mono">
                  {selectedQuestion.topic} - {TOPIC_NAMES[selectedQuestion.topic as QuizTopic]}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                  {selectedQuestion.difficulty.replace('_', ' ')}
                </span>
                <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-lg text-sm border border-gray-500/50">
                  {selectedQuestion.marks} marks
                </span>
              </div>

              {/* Question Text */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Question:</h3>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-white whitespace-pre-wrap">{selectedQuestion.question_text}</p>
                </div>
              </div>

              {/* Source */}
              {selectedQuestion.source_reference && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Source:</h3>
                  <p className="text-gray-400">{selectedQuestion.source_reference}</p>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Homework Modal */}
      {showAssignModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Assign Homework</h2>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Question Preview */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  {selectedQuestion.question_code && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono font-bold border border-green-500/50">
                      {selectedQuestion.question_code}
                    </span>
                  )}
                  <span className="text-gray-400 text-sm">{selectedQuestion.topic}</span>
                  <span className="text-gray-400 text-sm">• {selectedQuestion.marks} marks</span>
                </div>
                <p className="text-white line-clamp-2">{selectedQuestion.question_text}</p>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Due Date (Optional)</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Student Selection */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Select Students ({selectedStudents.length} selected)
                </label>
                <div className="bg-white/5 border border-white/10 rounded-lg max-h-60 overflow-y-auto">
                  {students.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                      No students found. Make sure students are registered.
                    </div>
                  ) : (
                    students.map((student) => (
                      <label
                        key={student.id}
                        className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => toggleStudentSelection(student.id)}
                          className="w-4 h-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                        />
                        <div className="flex-1">
                          <div className="text-white font-medium">{student.full_name}</div>
                          <div className="text-gray-400 text-sm">{student.email}</div>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={assignHomework}
                  disabled={assigning || selectedStudents.length === 0}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {assigning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Assigning...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Assign to {selectedStudents.length} Student{selectedStudents.length !== 1 ? 's' : ''}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl border border-red-500/30 p-8 max-w-md w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Delete Question</h2>
                <p className="text-gray-400 text-sm">This action cannot be undone</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
              {selectedQuestion.question_code && (
                <div className="text-green-400 font-mono text-sm mb-1">{selectedQuestion.question_code}</div>
              )}
              <p className="text-white line-clamp-2">{selectedQuestion.question_text}</p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteQuestion}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Question
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl border border-white/20 p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">Add New Question</h2>
            <p className="text-gray-400 mb-6">Question creation form coming soon...</p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
