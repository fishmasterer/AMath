import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: quizId } = await params

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    const studentId = user.id

    // Use service role to bypass RLS for quiz operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

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

    // Log the quiz data for debugging
    console.log('Quiz ID:', quiz.id)
    console.log('Quiz title:', quiz.title)
    console.log('Quiz questions type:', typeof quiz.questions)
    console.log('Quiz questions:', JSON.stringify(quiz.questions).substring(0, 200))
    console.log('Questions is array?', Array.isArray(quiz.questions))
    console.log('First question:', quiz.questions?.[0])

    // Transform questions to ensure correct field names
    const transformedQuestions = (quiz.questions || []).map((q: any) => ({
      ...q,
      question: q.question || q.text || '', // Support both field names
    }))

    const responseData = {
      attemptId: attempt.id,
      quiz: {
        id: quiz.id,
        title: quiz.title,
        topic: quiz.topic,
        difficulty: quiz.difficulty,
        time_limit_minutes: quiz.time_limit_minutes,
        due_date: quiz.due_date,
        total_marks: quiz.total_marks,
        questions: transformedQuestions, // Include full questions for active attempt
      },
      answers: attempt.answers || [],
      startedAt: attempt.started_at,
      elapsedSeconds,
      remainingSeconds,
      timeIsUp,
    }

    console.log('Response questions:', JSON.stringify(responseData.quiz.questions).substring(0, 200))

    return NextResponse.json(responseData)
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: quizId } = await params

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    const studentId = user.id
    const body = await request.json()

    // Use service role to bypass RLS for quiz operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

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
