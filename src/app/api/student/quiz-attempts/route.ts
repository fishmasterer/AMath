import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    const studentId = user.id

    // Optional filters
    const quizId = searchParams.get('quiz_id')
    const completed = searchParams.get('completed')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    let query = supabase
      .from('quiz_attempts')
      .select(`
        id,
        quiz_id,
        started_at,
        submitted_at,
        score,
        total_marks,
        time_taken_seconds,
        completed,
        created_at,
        quizzes (
          title,
          topic,
          difficulty,
          due_date
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (quizId) {
      query = query.eq('quiz_id', quizId)
    }

    if (completed !== null && completed !== undefined) {
      query = query.eq('completed', completed === 'true')
    }

    const { data: attempts, error } = await query

    if (error) {
      console.error('Error fetching quiz attempts:', error)
      throw error
    }

    // Format response
    const formattedAttempts = attempts?.map(attempt => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      return {
        id: attempt.id,
        quiz_id: attempt.quiz_id,
        quiz_title: quiz?.title || 'Unknown Quiz',
        quiz_topic: quiz?.topic,
        quiz_difficulty: quiz?.difficulty,
        quiz_due_date: quiz?.due_date,
        started_at: attempt.started_at,
        submitted_at: attempt.submitted_at,
        score: attempt.score,
        total_marks: attempt.total_marks,
        percentage: attempt.total_marks && attempt.score !== null
          ? Math.round((attempt.score / attempt.total_marks) * 100)
          : null,
        time_taken_seconds: attempt.time_taken_seconds,
        completed: attempt.completed,
        created_at: attempt.created_at,
      }
    }) || []

    return NextResponse.json({
      attempts: formattedAttempts,
      count: formattedAttempts.length,
    })
  } catch (error) {
    console.error('Error in GET /api/student/quiz-attempts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz attempts' },
      { status: 500 }
    )
  }
}
