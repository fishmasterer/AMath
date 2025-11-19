import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: quizId } = await params
    const studentId = '00000000-0000-0000-0000-000000000001' // Single student setup

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

    // Fetch quiz details
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single()

    if (quizError) {
      console.error('Error fetching quiz:', quizError)
      if (quizError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Quiz not found' },
          { status: 404 }
        )
      }
      throw quizError
    }

    // Check if quiz is published
    if (!quiz.published) {
      return NextResponse.json(
        { error: 'Quiz not available' },
        { status: 403 }
      )
    }

    // Get student's attempts for this quiz
    const { data: attempts, error: attemptsError } = await supabase
      .from('quiz_attempts')
      .select('id, started_at, submitted_at, score, total_marks, completed, answers')
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })

    if (attemptsError) {
      console.error('Error fetching attempts:', attemptsError)
    }

    // Determine quiz status
    const now = new Date()
    const dueDate = new Date(quiz.due_date)
    const isOverdue = dueDate < now
    const latestAttempt = attempts?.[0]

    let status: 'not_started' | 'in_progress' | 'completed' | 'overdue'
    if (latestAttempt?.completed) {
      status = 'completed'
    } else if (isOverdue && !latestAttempt?.completed) {
      status = 'overdue'
    } else if (latestAttempt && !latestAttempt.completed) {
      status = 'in_progress'
    } else {
      status = 'not_started'
    }

    // Count questions by type
    const questions = quiz.questions || []
    const questionStats = {
      total: questions.length,
      mcq: questions.filter((q: any) => q.type === 'mcq').length,
      multiSelect: questions.filter((q: any) => q.type === 'multi_select').length,
    }

    // Return quiz with enriched data but WITHOUT question details (security)
    // Questions should only be revealed when quiz is started
    const response = {
      id: quiz.id,
      title: quiz.title,
      topic: quiz.topic,
      week: quiz.week,
      difficulty: quiz.difficulty,
      time_limit_minutes: quiz.time_limit_minutes,
      due_date: quiz.due_date,
      total_marks: quiz.total_marks,
      created_at: quiz.created_at,
      status,
      questionStats,
      attempts: attempts?.map(attempt => ({
        id: attempt.id,
        started_at: attempt.started_at,
        submitted_at: attempt.submitted_at,
        score: attempt.score,
        total_marks: attempt.total_marks,
        completed: attempt.completed,
      })) || [],
      canAttempt: !latestAttempt || latestAttempt.completed, // Can start if no attempt or previous completed
      isOverdue,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in GET /api/quizzes/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz' },
      { status: 500 }
    )
  }
}
