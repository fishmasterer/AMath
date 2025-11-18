// app/api/quizzes/[id]/submit/route.ts
// API endpoint for submitting quiz attempts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { gradeQuiz } from '@/lib/utils/grading';
import { StudentAnswer } from '@/lib/types';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quizId = params.id;
    
    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const { answers, time_taken_seconds }: { 
      answers: StudentAnswer[];
      time_taken_seconds: number;
    } = await request.json();
    
    // Get quiz details
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single();
    
    if (quizError || !quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    // Get existing attempt
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('quiz_id', quizId)
      .eq('student_id', user.id)
      .single();
    
    if (attemptError || !attempt) {
      return NextResponse.json(
        { success: false, error: 'Attempt not found. Start quiz first.' },
        { status: 404 }
      );
    }
    
    // Check if already submitted
    if (attempt.completed) {
      return NextResponse.json(
        { success: false, error: 'Quiz already submitted' },
        { status: 400 }
      );
    }
    
    // Grade the quiz
    const gradingResult = gradeQuiz(quiz.questions, answers, quiz.topic);
    
    // Update attempt
    const { error: updateError } = await supabase
      .from('quiz_attempts')
      .update({
        answers,
        score: gradingResult.score,
        total_marks: gradingResult.total_marks,
        time_taken_seconds,
        completed: true,
        submitted_at: new Date().toISOString(),
      })
      .eq('id', attempt.id);
    
    if (updateError) {
      console.error('Failed to update attempt:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to submit quiz' },
        { status: 500 }
      );
    }
    
    // Insert question results (for mistakes journal)
    const questionResultsToInsert = gradingResult.question_results.map(result => ({
      attempt_id: attempt.id,
      ...result,
    }));
    
    const { error: resultsError } = await supabase
      .from('question_results')
      .insert(questionResultsToInsert);
    
    if (resultsError) {
      console.error('Failed to insert question results:', resultsError);
      // Non-critical error, continue
    }
    
    // Return results
    return NextResponse.json({
      success: true,
      data: {
        attempt_id: attempt.id,
        score: gradingResult.score,
        total_marks: gradingResult.total_marks,
        percentage: Math.round((gradingResult.score / gradingResult.total_marks) * 100),
        time_taken_seconds,
        question_results: gradingResult.question_results,
      },
    });
    
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
