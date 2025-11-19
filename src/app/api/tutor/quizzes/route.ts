import { createClient } from '@/lib/supabase/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/tutor/quizzes - Fetch all quizzes including unpublished (tutor only)
export async function GET(request: NextRequest) {
  try {
    // Use service role to bypass RLS for tutor access
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Note: Using service role key to bypass RLS
    // In production, implement proper tutor authentication

    // Get query parameters for filtering and pagination
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const published = searchParams.get('published'); // 'true', 'false', or null (all)
    const topic = searchParams.get('topic') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('quizzes')
      .select('*', { count: 'exact' });

    // Apply filters
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    if (published !== null) {
      query = query.eq('published', published === 'true');
    }

    if (topic) {
      query = query.eq('topic', topic);
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: quizzes, error, count } = await query;

    if (error) {
      console.error('Error fetching tutor quizzes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch quizzes' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      quizzes: quizzes || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (error) {
    console.error('Unexpected error in tutor quizzes route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
