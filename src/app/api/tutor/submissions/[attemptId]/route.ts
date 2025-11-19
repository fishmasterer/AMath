import { NextRequest, NextResponse } from 'next/server'
import { getGradeLetter } from '@/lib/utils/grading'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    const { attemptId } = await params

    // Use service role to bypass RLS for tutor operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Fetch attempt with related data
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        quizzes (
          id,
          title,
          topic,
          difficulty,
          total_marks,
          time_limit_minutes,
          questions
        )
      `)
      .eq('id', attemptId)
      .single()

    if (attemptError || !attempt) {
      return NextResponse.json(
        { error: 'Attempt not found' },
        { status: 404 }
      )
    }

    // Fetch question results
    const { data: questionResults, error: resultsError } = await supabase
      .from('question_results')
      .select('*')
      .eq('attempt_id', attemptId)
      .order('question_index', { ascending: true })

    if (resultsError) {
      console.error('Error fetching question results:', resultsError)
      throw resultsError
    }

    const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes

    const percentage = attempt.completed && attempt.total_marks
      ? Math.round((attempt.score! / attempt.total_marks!) * 100)
      : 0

    const grade = attempt.completed && attempt.total_marks
      ? getGradeLetter(percentage)
      : 'N/A'

    // Enrich question results with full question data
    const detailedResults = (questionResults || []).map(result => {
      const question = quiz?.questions?.[result.question_index]

      return {
        ...result,
        question: question?.question || question?.text || result.question_text,
        options: question?.options || [],
        explanation: question?.explanation,
        question_type_display: result.question_type === 'mcq' ? 'Multiple Choice' : 'Multiple Select',
      }
    })

    // Calculate statistics
    const correctAnswers = detailedResults.filter(q => q.is_correct).length
    const incorrectAnswers = detailedResults.filter(q => !q.is_correct).length
    const accuracy = detailedResults.length > 0
      ? Math.round((correctAnswers / detailedResults.length) * 100)
      : 0

    // Time efficiency
    const timeUsedMinutes = attempt.time_taken_seconds
      ? Math.floor(attempt.time_taken_seconds / 60)
      : 0
    const timeUsedSeconds = attempt.time_taken_seconds
      ? attempt.time_taken_seconds % 60
      : 0
    const timeEfficiency = attempt.time_taken_seconds && quiz?.time_limit_minutes
      ? Math.round((attempt.time_taken_seconds / (quiz.time_limit_minutes * 60)) * 100)
      : 0

    return NextResponse.json({
      success: true,
      submission: {
        id: attempt.id,
        quiz: {
          id: quiz?.id,
          title: quiz?.title || 'Unknown Quiz',
          topic: quiz?.topic,
          difficulty: quiz?.difficulty,
          total_marks: quiz?.total_marks,
          time_limit_minutes: quiz?.time_limit_minutes,
        },
        student: {
          id: attempt.student_id,
          name: 'Test Student', // Single student setup
          email: null,
        },
        started_at: attempt.started_at,
        submitted_at: attempt.submitted_at,
        completed: attempt.completed,
        score: attempt.score || 0,
        total_marks: attempt.total_marks || 0,
        percentage,
        grade,
        time_taken_seconds: attempt.time_taken_seconds,
        time_used_display: `${timeUsedMinutes}m ${timeUsedSeconds}s`,
        time_efficiency: timeEfficiency,
        answers: attempt.answers,
      },
      summary: {
        total_questions: detailedResults.length,
        correct_answers: correctAnswers,
        incorrect_answers: incorrectAnswers,
        accuracy,
      },
      question_results: detailedResults,
    })
  } catch (error) {
    console.error('Error in GET /api/tutor/submissions/[attemptId]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submission details' },
      { status: 500 }
    )
  }
}
