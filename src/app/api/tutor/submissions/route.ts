import { NextRequest, NextResponse } from 'next/server'
import { getGradeLetter } from '@/lib/utils/grading'

export async function GET(request: NextRequest) {
  try {
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

    const { searchParams } = new URL(request.url)
    const quizId = searchParams.get('quiz_id')
    const studentId = searchParams.get('student_id')
    const completedOnly = searchParams.get('completed') !== 'false' // default true

    // Build query
    let query = supabase
      .from('quiz_attempts')
      .select(`
        *,
        quizzes (
          id,
          title,
          topic,
          difficulty,
          total_marks,
          time_limit_minutes
        ),
        students (
          id,
          name,
          email
        )
      `)
      .order('submitted_at', { ascending: false })

    if (quizId) {
      query = query.eq('quiz_id', quizId)
    }

    if (studentId) {
      query = query.eq('student_id', studentId)
    }

    if (completedOnly) {
      query = query.eq('completed', true)
    }

    const { data: attempts, error: attemptsError } = await query

    if (attemptsError) {
      console.error('Error fetching submissions:', attemptsError)
      throw attemptsError
    }

    // Format the results
    const submissions = (attempts || []).map(attempt => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      const student = Array.isArray(attempt.students) ? attempt.students[0] : attempt.students

      const percentage = attempt.completed && attempt.total_marks
        ? Math.round((attempt.score! / attempt.total_marks!) * 100)
        : 0

      const grade = attempt.completed && attempt.total_marks
        ? getGradeLetter(percentage)
        : 'N/A'

      return {
        id: attempt.id,
        quiz_id: attempt.quiz_id,
        quiz_title: quiz?.title || 'Unknown Quiz',
        quiz_topic: quiz?.topic,
        quiz_difficulty: quiz?.difficulty,
        quiz_total_marks: quiz?.total_marks,
        student_id: attempt.student_id,
        student_name: student?.name || 'Test Student',
        student_email: student?.email,
        started_at: attempt.started_at,
        submitted_at: attempt.submitted_at,
        completed: attempt.completed,
        score: attempt.score || 0,
        total_marks: attempt.total_marks || quiz?.total_marks || 0,
        percentage,
        grade,
        time_taken_seconds: attempt.time_taken_seconds,
        time_limit_minutes: quiz?.time_limit_minutes,
      }
    })

    return NextResponse.json({
      success: true,
      submissions,
      total: submissions.length,
    })
  } catch (error) {
    console.error('Error in GET /api/tutor/submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
