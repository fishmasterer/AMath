import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const tutorId = '00000000-0000-0000-0000-000000000002'; // Hardcoded tutor ID
    const { searchParams } = new URL(request.url)

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

    // Get filter parameters
    const topic = searchParams.get('topic')
    const difficulty = searchParams.get('difficulty')
    const source_type = searchParams.get('source_type')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query - show both tutor's questions AND textbook questions (tutor_id = NULL)
    let query = supabase
      .from('question_bank')
      .select('*', { count: 'exact' })
      .or(`tutor_id.eq.${tutorId},tutor_id.is.null`)
      .order('created_at', { ascending: false })

    // Apply filters
    if (topic) query = query.eq('topic', topic)
    if (difficulty) query = query.eq('difficulty', difficulty)
    if (source_type) query = query.eq('source_type', source_type)

    // Text search in question_text, keywords, or subtopics
    if (search) {
      query = query.or(`question_text.ilike.%${search}%,keywords.cs.{${search}},subtopics.cs.{${search}}`)
    }

    query = query.range(offset, offset + limit - 1)

    const { data: questions, error, count } = await query

    if (error) {
      console.error('Error fetching questions:', error)
      throw error
    }

    return NextResponse.json({
      questions: questions || [],
      total: count || 0,
      page: Math.floor(offset / limit) + 1,
      pages: count ? Math.ceil(count / limit) : 0
    })
  } catch (error) {
    console.error('Error in GET /api/tutor/question-bank:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const tutorId = '00000000-0000-0000-0000-000000000002'; // Hardcoded tutor ID
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

    // Validate required fields
    const {
      question_text,
      question_type,
      difficulty,
      marks,
      correct_answer,
      topic,
      options,
      explanation,
      solution_steps,
      subtopics,
      keywords,
      source_type,
      source_reference,
      source_year,
      source_school,
      has_graph,
      graph_config
    } = body

    if (!question_text || !question_type || !difficulty || !marks || !correct_answer || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert question
    const { data: question, error } = await supabase
      .from('question_bank')
      .insert({
        tutor_id: tutorId,
        question_text,
        question_type,
        difficulty,
        marks,
        correct_answer,
        topic,
        options: options || null,
        explanation: explanation || null,
        solution_steps: solution_steps || null,
        subtopics: subtopics || [],
        keywords: keywords || [],
        source_type: source_type || null,
        source_reference: source_reference || null,
        source_year: source_year || null,
        source_school: source_school || null,
        has_graph: has_graph || false,
        graph_config: graph_config || null
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating question:', error)
      throw error
    }

    return NextResponse.json(question, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/tutor/question-bank:', error)
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    )
  }
}
