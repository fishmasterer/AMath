import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { QuizTopic } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Verify user is a tutor
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'tutor') {
      return NextResponse.json(
        { error: 'Unauthorized - Tutors only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const topicFilter = searchParams.get('topic') as QuizTopic | null
    const typeFilter = searchParams.get('type') // 'exam' or 'practice'

    // Build query - get all questions (including textbook questions with NULL tutor_id)
    let query = supabase
      .from('question_bank')
      .select('*')
      .order('question_code', { ascending: true })

    // Apply filters
    if (topicFilter) {
      query = query.eq('topic', topicFilter)
    }
    if (typeFilter) {
      query = query.eq('question_type', typeFilter)
    }

    const { data: questions, error } = await query

    if (error) {
      console.error('Error fetching questions:', error)
      throw error
    }

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Error in GET /api/tutor/questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}
