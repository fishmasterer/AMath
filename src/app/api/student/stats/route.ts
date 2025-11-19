import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function GET() {
  try {
    const studentId = '00000000-0000-0000-0000-000000000001'; // Single student setup

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

    // Get all quiz attempts for this student
    const { data: attempts, error: attemptsError } = await supabase
      .from('quiz_attempts')
      .select('id, quiz_id, score, total_marks, completed, submitted_at, created_at')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })

    if (attemptsError) {
      console.error('Error fetching attempts:', attemptsError)
      throw attemptsError
    }

    // Get all published quizzes
    const { data: allQuizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('id, due_date, published')
      .eq('published', true)

    if (quizzesError) {
      console.error('Error fetching quizzes:', quizzesError)
      throw quizzesError
    }

    // Calculate stats
    const completedAttempts = attempts?.filter(a => a.completed) || []
    const totalQuizzes = allQuizzes?.length || 0
    const completedQuizzes = completedAttempts.length

    // Calculate average score
    const totalScore = completedAttempts.reduce((sum, a) => sum + (a.score || 0), 0)
    const totalPossible = completedAttempts.reduce((sum, a) => sum + (a.total_marks || 0), 0)
    const averagePercentage = totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0

    // Count quizzes due soon (next 7 days)
    const now = new Date()
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const attemptedQuizIds = new Set(attempts?.map(a => a.quiz_id) || [])

    const quizzesDue = allQuizzes?.filter(q => {
      const dueDate = new Date(q.due_date)
      return dueDate >= now && dueDate <= oneWeekFromNow && !attemptedQuizIds.has(q.id)
    }).length || 0

    // Calculate topics mastered (>= 80% accuracy)
    const { data: questionResults, error: resultsError } = await supabase
      .from('question_results')
      .select('topic, is_correct')
      .in('attempt_id', completedAttempts.map(a => a.id))

    if (resultsError) {
      console.error('Error fetching question results:', resultsError)
    }

    // Group by topic and calculate mastery
    const topicStats = new Map<string, { correct: number; total: number }>()
    questionResults?.forEach(result => {
      const current = topicStats.get(result.topic) || { correct: 0, total: 0 }
      current.total++
      if (result.is_correct) current.correct++
      topicStats.set(result.topic, current)
    })

    const topicsMastered = Array.from(topicStats.values()).filter(
      stats => stats.total > 0 && (stats.correct / stats.total) >= 0.8
    ).length

    // Calculate study streak (consecutive days with completed quizzes)
    let streak = 0
    if (completedAttempts.length > 0) {
      const sortedDates = completedAttempts
        .map(a => new Date(a.submitted_at || a.created_at).toDateString())
        .filter((date, index, self) => self.indexOf(date) === index) // unique dates
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

      const today = new Date().toDateString()
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()

      // Only count streak if there's activity today or yesterday
      if (sortedDates[0] === today || sortedDates[0] === yesterday) {
        streak = 1
        let currentDate = new Date(sortedDates[0])

        for (let i = 1; i < sortedDates.length; i++) {
          const prevDate = new Date(currentDate)
          prevDate.setDate(prevDate.getDate() - 1)

          if (sortedDates[i] === prevDate.toDateString()) {
            streak++
            currentDate = prevDate
          } else {
            break
          }
        }
      }
    }

    // Get recent quiz history for chart (last 10 attempts)
    const recentAttempts = completedAttempts.slice(0, 10).reverse()
    const performanceHistory = recentAttempts.map((attempt, index) => {
      const percentage = attempt.total_marks
        ? Math.round((attempt.score! / attempt.total_marks) * 100)
        : 0
      return {
        quiz_number: completedQuizzes - recentAttempts.length + index + 1,
        percentage,
        score: attempt.score,
        total: attempt.total_marks,
        date: attempt.submitted_at || attempt.created_at,
      }
    })

    const stats = {
      quizzesDue,
      averageScore: Math.round(averagePercentage),
      topicsMastered,
      studyStreak: streak,
      totalQuizzes,
      completedQuizzes,
      performanceHistory,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching student stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
