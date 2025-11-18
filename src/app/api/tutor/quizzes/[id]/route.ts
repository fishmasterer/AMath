import { createClient } from '@/lib/supabase/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

// PATCH /api/tutor/quizzes/[id] - Update quiz (toggle publish, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify user is a tutor
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'tutor') {
      return NextResponse.json(
        { error: 'Tutor access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { published } = body;

    // Validate input
    if (typeof published !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid published value. Must be boolean.' },
        { status: 400 }
      );
    }

    // Update quiz
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .update({ published, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating quiz:', error);
      return NextResponse.json(
        { error: 'Failed to update quiz' },
        { status: 500 }
      );
    }

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Quiz ${published ? 'published' : 'unpublished'} successfully`,
      quiz
    });

  } catch (error) {
    console.error('Unexpected error in quiz update route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/tutor/quizzes/[id] - Delete quiz
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify user is a tutor
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'tutor') {
      return NextResponse.json(
        { error: 'Tutor access required' },
        { status: 403 }
      );
    }

    // Delete quiz (this will cascade to quiz_attempts and question_results)
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting quiz:', error);
      return NextResponse.json(
        { error: 'Failed to delete quiz' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Quiz deleted successfully'
    });

  } catch (error) {
    console.error('Unexpected error in quiz delete route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
