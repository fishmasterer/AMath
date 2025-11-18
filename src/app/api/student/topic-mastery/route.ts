import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { TOPIC_NAMES, QuizTopic } from '@/lib/types'

export async function GET() {
  try {
    const supabase = await createClient()
    const studentId = '00000000-0000-0000-0000-000000000001' // Single student setup

    // Fetch all question results with attempt info
    const { data: questionResults, error: resultsError } = await supabase
      .from('question_results')
      .select(`
        *,
        quiz_attempts!inner (
          student_id,
          completed,
          submitted_at
        )
      `)
      .eq('quiz_attempts.student_id', studentId)
      .eq('quiz_attempts.completed', true)

    if (resultsError) {
      console.error('Error fetching question results:', resultsError)
      throw resultsError
    }

    if (!questionResults || questionResults.length === 0) {
      return NextResponse.json({
        hasData: false,
        message: 'No question results yet',
      })
    }

    // Group by topic
    const topicStats = new Map<QuizTopic, {
      total_questions: number
      correct_questions: number
      total_marks: number
      marks_awarded: number
      quizzes: Set<string>
      last_attempt: string
    }>()

    questionResults.forEach(result => {
      const topic = result.topic as QuizTopic
      const current = topicStats.get(topic) || {
        total_questions: 0,
        correct_questions: 0,
        total_marks: 0,
        marks_awarded: 0,
        quizzes: new Set<string>(),
        last_attempt: result.created_at,
      }

      current.total_questions++
      if (result.is_correct) current.correct_questions++
      current.total_marks += result.marks_possible
      current.marks_awarded += result.marks_awarded
      current.quizzes.add(result.attempt_id)
      if (new Date(result.created_at) > new Date(current.last_attempt)) {
        current.last_attempt = result.created_at
      }

      topicStats.set(topic, current)
    })

    // Convert to array and calculate percentages
    const allTopics: QuizTopic[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'G1', 'G2', 'G3', 'C1']

    const topicMastery = allTopics.map(topic => {
      const stats = topicStats.get(topic)

      if (!stats) {
        return {
          topic,
          topic_name: TOPIC_NAMES[topic],
          total_questions: 0,
          correct_questions: 0,
          accuracy: 0,
          average_score: 0,
          quizzes_completed: 0,
          marks_awarded: 0,
          total_marks: 0,
          last_attempt: null,
          mastery_level: 'not_started' as const,
        }
      }

      const accuracy = Math.round((stats.correct_questions / stats.total_questions) * 100)
      const averageScore = Math.round((stats.marks_awarded / stats.total_marks) * 100)

      let masteryLevel: 'not_started' | 'beginner' | 'developing' | 'proficient' | 'mastered'
      if (stats.total_questions === 0) {
        masteryLevel = 'not_started'
      } else if (accuracy >= 90) {
        masteryLevel = 'mastered'
      } else if (accuracy >= 75) {
        masteryLevel = 'proficient'
      } else if (accuracy >= 60) {
        masteryLevel = 'developing'
      } else {
        masteryLevel = 'beginner'
      }

      return {
        topic,
        topic_name: TOPIC_NAMES[topic],
        total_questions: stats.total_questions,
        correct_questions: stats.correct_questions,
        accuracy,
        average_score: averageScore,
        quizzes_completed: stats.quizzes.size,
        marks_awarded: stats.marks_awarded,
        total_marks: stats.total_marks,
        last_attempt: stats.last_attempt,
        mastery_level: masteryLevel,
      }
    })

    // Sort by accuracy descending
    const sortedByAccuracy = [...topicMastery].sort((a, b) => b.accuracy - a.accuracy)

    // Calculate overall mastery
    const attemptedTopics = topicMastery.filter(t => t.total_questions > 0)
    const masteredTopics = topicMastery.filter(t => t.mastery_level === 'mastered').length
    const proficientTopics = topicMastery.filter(t => t.mastery_level === 'proficient').length
    const avgAccuracy = attemptedTopics.length > 0
      ? Math.round(attemptedTopics.reduce((sum, t) => sum + t.accuracy, 0) / attemptedTopics.length)
      : 0

    // Identify strengths and weaknesses
    const strengths = sortedByAccuracy.filter(t => t.accuracy >= 75 && t.total_questions >= 3).slice(0, 3)
    const weaknesses = sortedByAccuracy.filter(t => t.accuracy < 75 && t.total_questions >= 3).reverse().slice(0, 3)

    // Radar chart data (for all 10 topics)
    const radarData = topicMastery.map(t => ({
      topic: t.topic,
      topic_name: t.topic_name,
      accuracy: t.accuracy,
    }))

    return NextResponse.json({
      hasData: true,
      overview: {
        topics_attempted: attemptedTopics.length,
        topics_mastered: masteredTopics,
        topics_proficient: proficientTopics,
        average_accuracy: avgAccuracy,
      },
      topicMastery,
      strengths,
      weaknesses,
      radarData,
    })
  } catch (error) {
    console.error('Error in GET /api/student/topic-mastery:', error)
    return NextResponse.json(
      { error: 'Failed to fetch topic mastery' },
      { status: 500 }
    )
  }
}
