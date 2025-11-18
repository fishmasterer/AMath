import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { getGradeLetter } from '@/lib/utils/grading'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id: quizId } = await params
    const studentId = '00000000-0000-0000-0000-000000000001' // Single student setup

    // Fetch quiz details
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, topic, difficulty, total_marks, time_limit_minutes, questions')
      .eq('id', quizId)
      .single()

    if (quizError || !quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      )
    }

    // Fetch latest completed attempt
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)
      .eq('completed', true)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single()

    if (attemptError) {
      if (attemptError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'No completed attempt found for this quiz' },
          { status: 404 }
        )
      }
      console.error('Error fetching attempt:', attemptError)
      throw attemptError
    }

    // Fetch question results
    const { data: questionResults, error: resultsError } = await supabase
      .from('question_results')
      .select('*')
      .eq('attempt_id', attempt.id)
      .order('question_index', { ascending: true })

    if (resultsError) {
      console.error('Error fetching question results:', resultsError)
      throw resultsError
    }

    // Calculate percentage and grade
    const percentage = (attempt.score! / attempt.total_marks!) * 100
    const grade = getGradeLetter(percentage)

    // Calculate time stats
    const timeUsedMinutes = Math.floor(attempt.time_taken_seconds! / 60)
    const timeUsedSeconds = attempt.time_taken_seconds! % 60
    const timeEfficiency = (attempt.time_taken_seconds! / (quiz.time_limit_minutes * 60)) * 100

    // Group results by correctness
    const correctAnswers = questionResults?.filter(q => q.is_correct).length || 0
    const incorrectAnswers = questionResults?.filter(q => !q.is_correct).length || 0

    // Calculate topic breakdown
    const topicBreakdown = new Map<string, { correct: number; total: number; marks: number; possible: number }>()
    questionResults?.forEach(result => {
      const current = topicBreakdown.get(result.topic) || { correct: 0, total: 0, marks: 0, possible: 0 }
      current.total++
      current.possible += result.marks_possible
      current.marks += result.marks_awarded
      if (result.is_correct) current.correct++
      topicBreakdown.set(result.topic, current)
    })

    const topicStats = Array.from(topicBreakdown.entries()).map(([topic, stats]) => ({
      topic,
      correct: stats.correct,
      total: stats.total,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      marks: stats.marks,
      possible: stats.possible,
    }))

    // Prepare detailed question results with original questions
    const detailedResults = questionResults?.map(result => {
      const question = quiz.questions[result.question_index]
      return {
        ...result,
        question: question?.question || '',
        options: question?.options || [],
        explanation: question?.explanation,
        question_type_display: result.question_type === 'mcq' ? 'Multiple Choice' : 'Multiple Select',
      }
    }) || []

    return NextResponse.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        topic: quiz.topic,
        difficulty: quiz.difficulty,
        total_marks: quiz.total_marks,
        time_limit_minutes: quiz.time_limit_minutes,
      },
      attempt: {
        id: attempt.id,
        started_at: attempt.started_at,
        submitted_at: attempt.submitted_at,
        score: attempt.score,
        total_marks: attempt.total_marks,
        percentage: Math.round(percentage),
        grade,
        time_taken_seconds: attempt.time_taken_seconds,
        time_used_display: `${timeUsedMinutes}m ${timeUsedSeconds}s`,
        time_efficiency: Math.round(timeEfficiency),
      },
      summary: {
        total_questions: questionResults?.length || 0,
        correct_answers: correctAnswers,
        incorrect_answers: incorrectAnswers,
        accuracy: Math.round((correctAnswers / (questionResults?.length || 1)) * 100),
      },
      topicStats,
      questionResults: detailedResults,
    })
  } catch (error) {
    console.error('Error in GET /api/quizzes/[id]/results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz results' },
      { status: 500 }
    )
  }
}
