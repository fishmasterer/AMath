// app/api/quizzes/[id]/submit/route.ts
// API endpoint for submitting quiz attempts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/supabase-server';
import { gradeQuiz } from '@/lib/utils/grading';
import { StudentAnswer } from '@/lib/types';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: quizId } = await params;
    const studentId = '00000000-0000-0000-0000-000000000001'; // Single student setup

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
      .eq('student_id', studentId)
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
    
    // Transform questions to ensure correct format
    console.log('Raw quiz.questions type:', typeof quiz.questions);
    console.log('Raw quiz.questions value:', JSON.stringify(quiz.questions).substring(0, 300));
    console.log('Is quiz.questions an array?', Array.isArray(quiz.questions));

    // Parse questions if it's a string
    let questionsData = quiz.questions;
    if (typeof questionsData === 'string') {
      console.log('Questions is a string, parsing...');
      try {
        questionsData = JSON.parse(questionsData);
      } catch (parseError) {
        console.error('Failed to parse questions JSON:', parseError);
        throw new Error('Invalid questions data format');
      }
    }

    // Convert numeric correct answers to letters (A, B, C, D, etc.)
    const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    const transformedQuestions = Array.isArray(questionsData)
      ? questionsData.map((q: any) => {
          const transformed: any = {
            ...q,
            question: q.question || q.text || '',
          };

          // Convert numeric correctAnswer to letter for MCQ
          if (q.type === 'mcq') {
            if (typeof q.correctAnswer === 'number') {
              transformed.correctAnswer = optionLetters[q.correctAnswer] || optionLetters[0];
            } else if (typeof q.correctAnswer === 'string') {
              // Already a string, keep it
              transformed.correctAnswer = q.correctAnswer;
            } else {
              // Fallback
              transformed.correctAnswer = optionLetters[0];
            }
          }

          // Convert numeric correctAnswers array to letters for multi-select
          if (q.type === 'multi_select') {
            if (Array.isArray(q.correctAnswers)) {
              transformed.correctAnswers = q.correctAnswers.map((idx: any) =>
                typeof idx === 'number' ? optionLetters[idx] : idx
              );
            } else {
              // Fallback to empty array
              transformed.correctAnswers = [];
            }
          }

          return transformed;
        })
      : [];

    console.log('Starting grading with:', {
      questionsCount: transformedQuestions.length,
      answersCount: answers.length,
      topic: quiz.topic,
      questionsType: typeof questionsData,
      questionsIsArray: Array.isArray(questionsData),
      transformedQuestionsIsArray: Array.isArray(transformedQuestions),
      firstQuestion: transformedQuestions[0]
    });

    if (!Array.isArray(transformedQuestions) || transformedQuestions.length === 0) {
      throw new Error(`Questions must be a non-empty array. Got: ${typeof transformedQuestions}, length: ${transformedQuestions?.length || 0}`);
    }

    let gradingResult;
    try {
      gradingResult = gradeQuiz(transformedQuestions, answers, quiz.topic);
      console.log('Grading result:', JSON.stringify(gradingResult, null, 2));
    } catch (gradingError) {
      console.error('Grading failed:', gradingError);
      throw new Error(`Grading failed: ${gradingError instanceof Error ? gradingError.message : 'Unknown error'}`);
    }

    // Update attempt
    const { error: updateError } = await supabase
      .from('quiz_attempts')
      .update({
        answers: answers.map(a => ({
          question_id: a.question_id,
          answer: a.answer,
          time_spent_seconds: a.time_spent_seconds
        })),
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
        { success: false, error: 'Failed to submit quiz', details: updateError.message },
        { status: 500 }
      );
    }

    // Insert question results (for mistakes journal)
    const questionResultsToInsert = gradingResult.question_results.map(result => ({
      attempt_id: attempt.id,
      question_index: result.question_index,
      question_text: result.question_text,
      topic: result.topic,
      question_type: result.question_type,
      // Keep student_answer and correct_answer as-is (string for MCQ, array for multi-select)
      // Supabase will automatically convert to JSONB
      student_answer: result.student_answer !== undefined && result.student_answer !== null
        ? result.student_answer
        : (result.question_type === 'multi_select' ? [] : ''),
      correct_answer: result.correct_answer,
      is_correct: result.is_correct,
      marks_awarded: result.marks_awarded,
      marks_possible: result.marks_possible,
    }));

    console.log('Inserting question results count:', questionResultsToInsert.length);
    console.log('First result to insert:', JSON.stringify(questionResultsToInsert[0], null, 2));

    const { error: resultsError } = await supabase
      .from('question_results')
      .insert(questionResultsToInsert);

    if (resultsError) {
      console.error('Failed to insert question results:', resultsError);
      return NextResponse.json(
        { success: false, error: 'Failed to save question results', details: resultsError.message },
        { status: 500 }
      );
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error details:', { message: errorMessage, stack: errorStack });

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
