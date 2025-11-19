import { NextResponse } from 'next/server'
import { TOPIC_NAMES, QuizTopic } from '@/lib/types'

export async function GET() {
  try {
    // Use service role to bypass RLS for tutor operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Fetch all completed attempts
    const { data: attempts, error: attemptsError } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        quizzes (
          id,
          title,
          topic,
          difficulty,
          total_marks,
          published
        )
      `)
      .eq('completed', true)
      .order('submitted_at', { ascending: true })

    if (attemptsError) {
      console.error('Error fetching attempts:', attemptsError)
      throw attemptsError
    }

    // Fetch all quizzes for quiz stats
    const { data: allQuizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('id, title, topic, difficulty, published')

    if (quizzesError) {
      console.error('Error fetching quizzes:', quizzesError)
      throw quizzesError
    }

    const totalQuizzes = allQuizzes?.length || 0
    const publishedQuizzes = allQuizzes?.filter(q => q.published).length || 0

    if (!attempts || attempts.length === 0) {
      return NextResponse.json({
        hasData: false,
        overview: {
          total_quizzes: totalQuizzes,
          published_quizzes: publishedQuizzes,
          total_attempts: 0,
          completed_attempts: 0,
          average_score: 0,
          active_students: 0,
        },
      })
    }

    // Calculate overall statistics
    const totalAttempts = attempts.length
    const totalScore = attempts.reduce((sum, a) => sum + (a.score || 0), 0)
    const totalPossible = attempts.reduce((sum, a) => sum + (a.total_marks || 0), 0)
    const averageScore = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0

    // Count unique students
    const uniqueStudents = new Set(attempts.map(a => a.student_id))
    const activeStudents = uniqueStudents.size

    // Topic performance
    const topicStats = new Map<string, { attempts: number; totalScore: number; totalPossible: number }>()
    attempts.forEach(attempt => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      const topic = quiz?.topic
      if (!topic) return

      const current = topicStats.get(topic) || { attempts: 0, totalScore: 0, totalPossible: 0 }
      current.attempts++
      current.totalScore += attempt.score || 0
      current.totalPossible += attempt.total_marks || 0
      topicStats.set(topic, current)
    })

    const topicPerformance = Array.from(topicStats.entries()).map(([topic, stats]) => ({
      topic,
      topic_name: TOPIC_NAMES[topic as QuizTopic] || topic,
      attempts: stats.attempts,
      average_score: stats.totalPossible > 0
        ? Math.round((stats.totalScore / stats.totalPossible) * 100)
        : 0,
    })).sort((a, b) => b.average_score - a.average_score)

    // Difficulty breakdown
    const difficultyStats = new Map<string, { attempts: number; totalScore: number; totalPossible: number }>()
    attempts.forEach(attempt => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      const difficulty = quiz?.difficulty || 'unknown'

      const current = difficultyStats.get(difficulty) || { attempts: 0, totalScore: 0, totalPossible: 0 }
      current.attempts++
      current.totalScore += attempt.score || 0
      current.totalPossible += attempt.total_marks || 0
      difficultyStats.set(difficulty, current)
    })

    const difficultyBreakdown = Array.from(difficultyStats.entries()).map(([difficulty, stats]) => ({
      difficulty,
      attempts: stats.attempts,
      average_score: stats.totalPossible > 0
        ? Math.round((stats.totalScore / stats.totalPossible) * 100)
        : 0,
    }))

    // Recent activity (last 10 submissions)
    const recentSubmissions = attempts.slice(-10).reverse().map(attempt => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      const percentage = attempt.total_marks
        ? Math.round((attempt.score! / attempt.total_marks!) * 100)
        : 0

      return {
        attempt_id: attempt.id,
        quiz_id: attempt.quiz_id,
        quiz_title: quiz?.title || 'Unknown',
        topic: quiz?.topic,
        difficulty: quiz?.difficulty,
        student_id: attempt.student_id,
        score: attempt.score,
        total_marks: attempt.total_marks,
        percentage,
        submitted_at: attempt.submitted_at,
      }
    })

    // Quiz completion rates
    const quizCompletionMap = new Map<string, { title: string; attempts: number; topic: string }>()
    attempts.forEach(attempt => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      if (!quiz) return

      const current = quizCompletionMap.get(attempt.quiz_id) || {
        title: quiz.title || 'Unknown',
        attempts: 0,
        topic: quiz.topic || 'Unknown',
      }
      current.attempts++
      quizCompletionMap.set(attempt.quiz_id, current)
    })

    const quizCompletionRates = Array.from(quizCompletionMap.entries())
      .map(([quizId, data]) => ({
        quiz_id: quizId,
        quiz_title: data.title,
        topic: data.topic,
        completion_count: data.attempts,
      }))
      .sort((a, b) => b.completion_count - a.completion_count)
      .slice(0, 10)

    // Score distribution
    const scoreRanges = {
      '90-100': 0,
      '80-89': 0,
      '70-79': 0,
      '60-69': 0,
      '50-59': 0,
      '0-49': 0,
    }

    attempts.forEach(attempt => {
      if (!attempt.total_marks) return
      const percentage = Math.round((attempt.score! / attempt.total_marks!) * 100)

      if (percentage >= 90) scoreRanges['90-100']++
      else if (percentage >= 80) scoreRanges['80-89']++
      else if (percentage >= 70) scoreRanges['70-79']++
      else if (percentage >= 60) scoreRanges['60-69']++
      else if (percentage >= 50) scoreRanges['50-59']++
      else scoreRanges['0-49']++
    })

    const scoreDistribution = Object.entries(scoreRanges).map(([range, count]) => ({
      range,
      count,
      percentage: totalAttempts > 0 ? Math.round((count / totalAttempts) * 100) : 0,
    }))

    return NextResponse.json({
      hasData: true,
      overview: {
        total_quizzes: totalQuizzes,
        published_quizzes: publishedQuizzes,
        total_attempts: totalAttempts,
        completed_attempts: totalAttempts,
        average_score: averageScore,
        active_students: activeStudents,
      },
      topicPerformance,
      difficultyBreakdown,
      quizCompletionRates,
      scoreDistribution,
      recentSubmissions,
    })
  } catch (error) {
    console.error('Error in GET /api/tutor/analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
