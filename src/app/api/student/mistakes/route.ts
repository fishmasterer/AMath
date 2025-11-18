import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { TOPIC_NAMES, QuizTopic } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const studentId = '00000000-0000-0000-0000-000000000001' // Single student setup
    const { searchParams } = new URL(request.url)

    // Parse filters
    const topicFilter = searchParams.get('topic') as QuizTopic | null
    const showResolved = searchParams.get('resolved') !== 'false' // Default: show all

    // Fetch all incorrect question results with quiz context
    const { data: mistakes, error: mistakesError } = await supabase
      .from('question_results')
      .select(`
        *,
        quiz_attempts!inner (
          student_id,
          completed,
          submitted_at,
          quiz_id,
          quizzes (
            title,
            topic,
            difficulty,
            questions
          )
        )
      `)
      .eq('quiz_attempts.student_id', studentId)
      .eq('quiz_attempts.completed', true)
      .eq('is_correct', false)
      .order('created_at', { ascending: false })

    if (mistakesError) {
      console.error('Error fetching mistakes:', mistakesError)
      throw mistakesError
    }

    if (!mistakes || mistakes.length === 0) {
      return NextResponse.json({
        hasData: false,
        message: 'No mistakes yet - great job!',
      })
    }

    // Enrich mistakes with question details
    const enrichedMistakes = mistakes.map(mistake => {
      const quiz = mistake.quiz_attempts?.quizzes
      const question = quiz?.questions?.[mistake.question_index]

      return {
        id: mistake.id,
        question_index: mistake.question_index,
        question_text: mistake.question_text,
        question_full: question?.question || mistake.question_text,
        options: question?.options || [],
        explanation: question?.explanation,
        topic: mistake.topic,
        topic_name: TOPIC_NAMES[mistake.topic as QuizTopic] || mistake.topic,
        question_type: mistake.question_type,
        student_answer: mistake.student_answer,
        correct_answer: mistake.correct_answer,
        marks_awarded: mistake.marks_awarded,
        marks_possible: mistake.marks_possible,
        created_at: mistake.created_at,
        quiz_id: mistake.quiz_attempts?.quiz_id,
        quiz_title: quiz?.title || 'Unknown Quiz',
        quiz_difficulty: quiz?.difficulty,
        submitted_at: mistake.quiz_attempts?.submitted_at,
      }
    })

    // Apply topic filter
    let filteredMistakes = enrichedMistakes
    if (topicFilter) {
      filteredMistakes = filteredMistakes.filter(m => m.topic === topicFilter)
    }

    // Group by topic
    const mistakesByTopic = new Map<string, typeof filteredMistakes>()
    filteredMistakes.forEach(mistake => {
      const current = mistakesByTopic.get(mistake.topic) || []
      current.push(mistake)
      mistakesByTopic.set(mistake.topic, current)
    })

    // Convert to array with stats
    const groupedMistakes = Array.from(mistakesByTopic.entries()).map(([topic, mistakes]) => ({
      topic,
      topic_name: TOPIC_NAMES[topic as QuizTopic] || topic,
      mistake_count: mistakes.length,
      mistakes: mistakes,
      latest_mistake: mistakes[0].created_at,
    }))

    // Sort by mistake count descending
    groupedMistakes.sort((a, b) => b.mistake_count - a.mistake_count)

    // Calculate overall stats
    const totalMistakes = filteredMistakes.length
    const topicsCoveredCount = groupedMistakes.length
    const mostCommonTopic = groupedMistakes[0]

    // Calculate mistake patterns
    const mcqMistakes = filteredMistakes.filter(m => m.question_type === 'mcq').length
    const multiSelectMistakes = filteredMistakes.filter(m => m.question_type === 'multi_select').length

    // Calculate marks lost
    const totalMarksLost = filteredMistakes.reduce((sum, m) => sum + (m.marks_possible - m.marks_awarded), 0)
    const avgMarksLostPerMistake = totalMistakes > 0 ? (totalMarksLost / totalMistakes).toFixed(1) : 0

    // Recent mistakes (last 10)
    const recentMistakes = filteredMistakes.slice(0, 10)

    return NextResponse.json({
      hasData: true,
      summary: {
        total_mistakes: totalMistakes,
        topics_with_mistakes: topicsCoveredCount,
        most_common_topic: mostCommonTopic ? mostCommonTopic.topic_name : 'N/A',
        mcq_mistakes: mcqMistakes,
        multi_select_mistakes: multiSelectMistakes,
        total_marks_lost: totalMarksLost,
        avg_marks_lost_per_mistake: avgMarksLostPerMistake,
      },
      groupedMistakes,
      recentMistakes,
    })
  } catch (error) {
    console.error('Error in GET /api/student/mistakes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mistakes' },
      { status: 500 }
    )
  }
}
