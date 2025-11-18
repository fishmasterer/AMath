import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()
    const quizId = params.id
    const studentId = '00000000-0000-0000-0000-000000000001' // Single student setup

    // Fetch quiz with questions
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single()

    if (quizError || !quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      )
    }

    if (!quiz.published) {
      return NextResponse.json(
        { error: 'Quiz not available' },
        { status: 403 }
      )
    }

    // Fetch current attempt
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)
      .eq('completed', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (attemptError) {
      if (attemptError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'No active attempt found. Please start the quiz first.' },
          { status: 404 }
        )
      }
      console.error('Error fetching attempt:', attemptError)
      throw attemptError
    }

    // Calculate time remaining
    const startedAt = new Date(attempt.started_at)
    const now = new Date()
    const elapsedSeconds = Math.floor((now.getTime() - startedAt.getTime()) / 1000)
    const totalTimeSeconds = quiz.time_limit_minutes * 60
    const remainingSeconds = Math.max(0, totalTimeSeconds - elapsedSeconds)

    // Check if time is up
    const timeIsUp = remainingSeconds === 0

    return NextResponse.json({
      attemptId: attempt.id,
      quiz: {
        id: quiz.id,
        title: quiz.title,
        topic: quiz.topic,
        difficulty: quiz.difficulty,
        time_limit_minutes: quiz.time_limit_minutes,
        due_date: quiz.due_date,
        total_marks: quiz.total_marks,
        questions: quiz.questions, // Include full questions for active attempt
      },
      answers: attempt.answers || [],
      startedAt: attempt.started_at,
      elapsedSeconds,
      remainingSeconds,
      timeIsUp,
    })
  } catch (error) {
    console.error('Error in GET /api/quizzes/[id]/attempt:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz attempt' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()
    const quizId = params.id
    const studentId = '00000000-0000-0000-0000-000000000001' // Single student setup
    const body = await request.json()

    // Validate request body
    if (!body.answers || !Array.isArray(body.answers)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // Fetch current attempt
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .select('id, completed')
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)
      .eq('completed', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (attemptError) {
      if (attemptError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'No active attempt found' },
          { status: 404 }
        )
      }
      console.error('Error fetching attempt:', attemptError)
      throw attemptError
    }

    // Update answers
    const { error: updateError } = await supabase
      .from('quiz_attempts')
      .update({
        answers: body.answers,
      })
      .eq('id', attempt.id)

    if (updateError) {
      console.error('Error updating answers:', updateError)
      throw updateError
    }

    return NextResponse.json({
      success: true,
      message: 'Answers saved',
    })
  } catch (error) {
    console.error('Error in PATCH /api/quizzes/[id]/attempt:', error)
    return NextResponse.json(
      { error: 'Failed to save answers' },
      { status: 500 }
    )
  }
}
