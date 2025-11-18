import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { TOPIC_NAMES, QuizTopic } from '@/lib/types'

export async function GET() {
  try {
    const supabase = await createClient()
    const studentId = '00000000-0000-0000-0000-000000000001' // Single student setup

    // Fetch all completed attempts with quiz info
    const { data: attempts, error: attemptsError } = await supabase
      .from('quiz_attempts')
      .select(`
        id,
        quiz_id,
        started_at,
        submitted_at,
        score,
        total_marks,
        time_taken_seconds,
        completed,
        quizzes (
          title,
          topic,
          difficulty,
          week,
          time_limit_minutes
        )
      `)
      .eq('student_id', studentId)
      .eq('completed', true)
      .order('submitted_at', { ascending: true })

    if (attemptsError) {
      console.error('Error fetching attempts:', attemptsError)
      throw attemptsError
    }

    if (!attempts || attempts.length === 0) {
      return NextResponse.json({
        hasData: false,
        message: 'No completed quizzes yet',
      })
    }

    // Calculate overall stats
    const totalQuizzes = attempts.length
    const totalScore = attempts.reduce((sum, a) => sum + (a.score || 0), 0)
    const totalPossible = attempts.reduce((sum, a) => sum + (a.total_marks || 0), 0)
    const overallAverage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0

    // Score trend (last 20 attempts or all if less)
    const recentAttempts = attempts.slice(-20)
    const scoreTrend = recentAttempts.map((attempt, index) => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      return {
        quiz_number: attempts.length - recentAttempts.length + index + 1,
        quiz_title: quiz?.title || 'Unknown',
        percentage: Math.round((attempt.score! / attempt.total_marks!) * 100),
        score: attempt.score,
        total: attempt.total_marks,
        date: attempt.submitted_at,
        topic: quiz?.topic,
      }
    })

    // Difficulty performance
    const difficultyStats = new Map<string, { total: number; score: number; count: number }>()
    attempts.forEach(attempt => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      const difficulty = quiz?.difficulty || 'unknown'
      const current = difficultyStats.get(difficulty) || { total: 0, score: 0, count: 0 }
      current.total += attempt.total_marks || 0
      current.score += attempt.score || 0
      current.count++
      difficultyStats.set(difficulty, current)
    })

    const difficultyBreakdown = Array.from(difficultyStats.entries()).map(([difficulty, stats]) => ({
      difficulty,
      average: Math.round((stats.score / stats.total) * 100),
      quizzes_taken: stats.count,
    }))

    // Time efficiency
    const avgTimeEfficiency = attempts.reduce((sum, attempt) => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      const efficiency = (attempt.time_taken_seconds! / (quiz!.time_limit_minutes * 60)) * 100
      return sum + efficiency
    }, 0) / attempts.length

    // Best and worst performance
    const sortedByPercentage = [...attempts].sort((a, b) => {
      const aPerc = (a.score! / a.total_marks!) * 100
      const bPerc = (b.score! / b.total_marks!) * 100
      return bPerc - aPerc
    })

    const bestQuiz = sortedByPercentage[0]
    const worstQuiz = sortedByPercentage[sortedByPercentage.length - 1]

    // Recent activity (last 5 quizzes)
    const recentActivity = attempts.slice(-5).reverse().map(attempt => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      return {
        quiz_title: quiz?.title || 'Unknown',
        topic: quiz?.topic,
        score: attempt.score,
        total_marks: attempt.total_marks,
        percentage: Math.round((attempt.score! / attempt.total_marks!) * 100),
        submitted_at: attempt.submitted_at,
      }
    })

    // Improvement trend (compare first 5 vs last 5)
    let improvement = null
    if (attempts.length >= 10) {
      const first5Avg = attempts.slice(0, 5).reduce((sum, a) =>
        sum + ((a.score! / a.total_marks!) * 100), 0) / 5
      const last5Avg = attempts.slice(-5).reduce((sum, a) =>
        sum + ((a.score! / a.total_marks!) * 100), 0) / 5
      improvement = Math.round(last5Avg - first5Avg)
    }

    const bestQuizData = Array.isArray(bestQuiz.quizzes) ? bestQuiz.quizzes[0] : bestQuiz.quizzes
    const worstQuizData = Array.isArray(worstQuiz.quizzes) ? worstQuiz.quizzes[0] : worstQuiz.quizzes

    return NextResponse.json({
      hasData: true,
      overall: {
        total_quizzes: totalQuizzes,
        average_score: overallAverage,
        total_score: totalScore,
        total_possible: totalPossible,
        avg_time_efficiency: Math.round(avgTimeEfficiency),
        improvement_trend: improvement,
      },
      scoreTrend,
      difficultyBreakdown,
      best: {
        quiz_title: bestQuizData?.title || 'Unknown',
        percentage: Math.round((bestQuiz.score! / bestQuiz.total_marks!) * 100),
        score: bestQuiz.score,
        total: bestQuiz.total_marks,
        date: bestQuiz.submitted_at,
      },
      worst: {
        quiz_title: worstQuizData?.title || 'Unknown',
        percentage: Math.round((worstQuiz.score! / worstQuiz.total_marks!) * 100),
        score: worstQuiz.score,
        total: worstQuiz.total_marks,
        date: worstQuiz.submitted_at,
      },
      recentActivity,
    })
  } catch (error) {
    console.error('Error in GET /api/student/analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
