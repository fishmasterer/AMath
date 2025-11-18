// app/api/quizzes/upload/route.ts
// API endpoint for uploading new quizzes

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateQuizUpload } from '@/lib/validators/quiz.validator';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user is tutor
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profile?.role !== 'tutor') {
      return NextResponse.json(
        { success: false, error: 'Only tutors can upload quizzes' },
        { status: 403 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate quiz data
    const validation = validateQuizUpload(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          errors: validation.errors 
        },
        { status: 400 }
      );
    }
    
    // Insert quiz into database
    const { data: quiz, error: insertError } = await supabase
      .from('quizzes')
      .insert({
        title: validation.data.title,
        topic: validation.data.topic,
        week: validation.data.week,
        difficulty: validation.data.difficulty,
        time_limit_minutes: validation.data.time_limit_minutes,
        due_date: validation.data.due_date,
        total_marks: validation.data.total_marks,
        questions: validation.data.questions,
        created_by: user.id,
        published: true, // Auto-publish (or add a flag to control this)
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to create quiz' },
        { status: 500 }
      );
    }
    
    // Return success with quiz ID
    return NextResponse.json(
      { 
        success: true, 
        data: {
          id: quiz.id,
          title: quiz.title,
          total_marks: quiz.total_marks,
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Quiz upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
