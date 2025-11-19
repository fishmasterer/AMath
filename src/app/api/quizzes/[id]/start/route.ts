import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function POST(
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

    // Fetch quiz to ensure it exists and is published
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

    // Check if student already has an incomplete attempt
    const { data: existingAttempt, error: attemptCheckError } = await supabase
      .from('quiz_attempts')
      .select('id, completed')
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (attemptCheckError && attemptCheckError.code !== 'PGRST116') {
      console.error('Error checking existing attempt:', attemptCheckError)
    }

    // If there's an incomplete attempt, return it instead of creating new one
    if (existingAttempt && !existingAttempt.completed) {
      return NextResponse.json({
        attemptId: existingAttempt.id,
        message: 'Resuming existing attempt',
      })
    }

    // Create new attempt
    const { data: newAttempt, error: createError } = await supabase
      .from('quiz_attempts')
      .insert({
        quiz_id: quizId,
        student_id: studentId,
        started_at: new Date().toISOString(),
        answers: [],
        completed: false,
      })
      .select('id')
      .single()

    if (createError) {
      console.error('Error creating quiz attempt:', createError)
      throw createError
    }

    return NextResponse.json({
      attemptId: newAttempt.id,
      message: 'Quiz attempt started',
    })
  } catch (error) {
    console.error('Error in POST /api/quizzes/[id]/start:', error)
    return NextResponse.json(
      { error: 'Failed to start quiz' },
      { status: 500 }
    )
  }
}
