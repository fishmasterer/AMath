import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { QuizSession } from '@/lib/types'

export async function GET(request: Request) {
  try {
    const studentId = '00000000-0000-0000-0000-000000000001'; // Single student setup
    const { searchParams } = new URL(request.url)
    const quizId = searchParams.get('quiz_id')

    // Use service role to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    if (!quizId) {
      return NextResponse.json(
        { error: 'quiz_id parameter is required' },
        { status: 400 }
      )
    }

    // Fetch quiz session from Supabase
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)
      .single()

    if (sessionError && sessionError.code !== 'PGRST116') {
      console.error('Error fetching quiz session:', sessionError)
      return NextResponse.json(
        { error: 'Failed to fetch quiz session' },
        { status: 500 }
      )
    }

    // Return null if no session exists (not an error)
    if (!session) {
      return NextResponse.json(null)
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error('Error fetching quiz session:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz session' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const studentId = '00000000-0000-0000-0000-000000000001'; // Single student setup
    const body = await request.json()

    // Use service role to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const { quiz_id, current_question, time_remaining_seconds, session_data } = body

    if (!quiz_id) {
      return NextResponse.json(
        { error: 'quiz_id is required' },
        { status: 400 }
      )
    }

    // Upsert quiz session (create or update)
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .upsert({
        quiz_id,
        student_id: studentId,
        current_question: current_question ?? 0,
        time_remaining_seconds,
        session_data: session_data ?? {}
      }, {
        onConflict: 'quiz_id,student_id'
      })
      .select()
      .single()

    if (sessionError) {
      console.error('Error upserting quiz session:', sessionError)
      return NextResponse.json(
        { error: 'Failed to save quiz session' },
        { status: 500 }
      )
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error('Error saving quiz session:', error)
    return NextResponse.json(
      { error: 'Failed to save quiz session' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const studentId = '00000000-0000-0000-0000-000000000001'; // Single student setup
    const { searchParams } = new URL(request.url)
    const quizId = searchParams.get('quiz_id')

    // Use service role to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    if (!quizId) {
      return NextResponse.json(
        { error: 'quiz_id parameter is required' },
        { status: 400 }
      )
    }

    // Delete quiz session
    const { error: deleteError } = await supabase
      .from('quiz_sessions')
      .delete()
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)

    if (deleteError) {
      console.error('Error deleting quiz session:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete quiz session' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting quiz session:', error)
    return NextResponse.json(
      { error: 'Failed to delete quiz session' },
      { status: 500 }
    )
  }
}
