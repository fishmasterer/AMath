import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/supabase-server'
import { QuizTopic, QuizDifficulty } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)

    // For single student setup
    const studentId = '00000000-0000-0000-0000-000000000001'

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'due_date'
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc'

    // Parse array filters
    const topics = searchParams.get('topics')?.split(',').filter(Boolean) as QuizTopic[] | undefined
    const difficulties = searchParams.get('difficulties')?.split(',').filter(Boolean) as QuizDifficulty[] | undefined
    const weeks = searchParams.get('weeks')?.split(',').map(Number).filter(Boolean)
    const status = searchParams.get('status') // 'not_started', 'in_progress', 'completed', 'overdue'

    // Start building query
    let query = supabase
      .from('quizzes')
      .select('id, title, topic, week, difficulty, due_date, total_marks, time_limit_minutes, published, created_at', { count: 'exact' })
      .eq('published', true)

    // Apply filters
    if (topics && topics.length > 0) {
      query = query.in('topic', topics)
    }

    if (difficulties && difficulties.length > 0) {
      query = query.in('difficulty', difficulties)
    }

    if (weeks && weeks.length > 0) {
      query = query.in('week', weeks)
    }

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }

    // Execute query
    const { data: quizzes, error: quizzesError, count } = await query

    if (quizzesError) {
      console.error('Error fetching quizzes:', quizzesError)
      throw quizzesError
    }

    // Get all attempts for this student to determine status
    const { data: attempts, error: attemptsError } = await supabase
      .from('quiz_attempts')
      .select('quiz_id, completed, started_at, submitted_at, score, total_marks')
      .eq('student_id', studentId)

    if (attemptsError) {
      console.error('Error fetching attempts:', attemptsError)
    }

    // Create a map of quiz_id to attempt
    const attemptsMap = new Map()
    attempts?.forEach(attempt => {
      attemptsMap.set(attempt.quiz_id, attempt)
    })

    // Enrich quizzes with attempt status
    const now = new Date()
    let enrichedQuizzes = quizzes?.map(quiz => {
      const attempt = attemptsMap.get(quiz.id)
      const dueDate = new Date(quiz.due_date)
      const isOverdue = dueDate < now && !attempt?.completed

      let quizStatus: 'not_started' | 'in_progress' | 'completed' | 'overdue'
      if (attempt?.completed) {
        quizStatus = 'completed'
      } else if (isOverdue) {
        quizStatus = 'overdue'
      } else if (attempt && !attempt.completed) {
        quizStatus = 'in_progress'
      } else {
        quizStatus = 'not_started'
      }

      return {
        ...quiz,
        status: quizStatus,
        attempt: attempt ? {
          id: attempt.quiz_id,
          started_at: attempt.started_at,
          submitted_at: attempt.submitted_at,
          score: attempt.score,
          total_marks: attempt.total_marks,
          completed: attempt.completed,
        } : undefined,
      }
    }) || []

    // Filter by status if specified
    if (status) {
      enrichedQuizzes = enrichedQuizzes.filter(quiz => quiz.status === status)
    }

    // Sort quizzes
    enrichedQuizzes.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'due_date':
          comparison = new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          break
        case 'difficulty':
          const difficultyOrder = { foundational: 1, intermediate: 2, exam_level: 3 }
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
          break
        case 'topic':
          comparison = a.topic.localeCompare(b.topic)
          break
        case 'time_limit':
          comparison = a.time_limit_minutes - b.time_limit_minutes
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        default:
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      }

      return sortOrder === 'desc' ? -comparison : comparison
    })

    // Apply pagination
    const totalItems = enrichedQuizzes.length
    const totalPages = Math.ceil(totalItems / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedQuizzes = enrichedQuizzes.slice(startIndex, endIndex)

    return NextResponse.json({
      quizzes: paginatedQuizzes,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    })
  } catch (error) {
    console.error('Error in GET /api/quizzes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    )
  }
}
