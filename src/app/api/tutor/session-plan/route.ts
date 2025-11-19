import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { TOPIC_NAMES, QuizTopic } from '@/lib/types'

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

    // Get date range for last 7 days
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    // Fetch recent quiz attempts (last 7 days)
    const { data: recentAttempts, error: attemptsError } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        quizzes (
          id,
          title,
          topic,
          difficulty,
          total_marks
        )
      `)
      .eq('student_id', studentId)
      .eq('completed', true)
      .gte('submitted_at', oneWeekAgo.toISOString())
      .order('submitted_at', { ascending: false })

    if (attemptsError) {
      console.error('Error fetching recent attempts:', attemptsError)
      throw attemptsError
    }

    // Fetch all question results to analyze patterns
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
      .gte('quiz_attempts.submitted_at', oneWeekAgo.toISOString())

    if (resultsError) {
      console.error('Error fetching question results:', resultsError)
      throw resultsError
    }

    // Calculate topic-specific metrics
    const topicMetrics = new Map<QuizTopic, {
      total_questions: number
      correct_questions: number
      total_marks: number
      marks_awarded: number
      recent_attempts: number
      recent_accuracy: number
      needs_attention: boolean
    }>()

    const allTopics: QuizTopic[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'G1', 'G2', 'G3', 'C1']

    // Initialize all topics
    allTopics.forEach(topic => {
      topicMetrics.set(topic, {
        total_questions: 0,
        correct_questions: 0,
        total_marks: 0,
        marks_awarded: 0,
        recent_attempts: 0,
        recent_accuracy: 0,
        needs_attention: false
      })
    })

    // Analyze question results
    questionResults?.forEach(result => {
      const topic = result.topic as QuizTopic
      const metrics = topicMetrics.get(topic)!

      metrics.total_questions++
      if (result.is_correct) metrics.correct_questions++
      metrics.total_marks += result.marks_possible
      metrics.marks_awarded += result.marks_awarded
    })

    // Count recent attempts per topic
    recentAttempts?.forEach(attempt => {
      const quiz = Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes
      if (quiz) {
        const topic = quiz.topic as QuizTopic
        const metrics = topicMetrics.get(topic)
        if (metrics) {
          metrics.recent_attempts++
        }
      }
    })

    // Calculate accuracy and flag topics needing attention
    const topicAnalysis = allTopics.map(topic => {
      const metrics = topicMetrics.get(topic)!
      const accuracy = metrics.total_questions > 0
        ? Math.round((metrics.correct_questions / metrics.total_questions) * 100)
        : 0

      metrics.recent_accuracy = accuracy

      // Flag topics needing attention if:
      // - Accuracy < 70%
      // - OR very few attempts (< 3 questions)
      // - OR no recent practice
      const needsAttention = (
        (metrics.total_questions >= 3 && accuracy < 70) ||
        (metrics.total_questions > 0 && metrics.total_questions < 3) ||
        (metrics.recent_attempts === 0 && metrics.total_questions > 0)
      )

      metrics.needs_attention = needsAttention

      return {
        topic,
        topic_name: TOPIC_NAMES[topic],
        ...metrics,
        accuracy
      }
    })

    // Sort by priority (topics needing attention first, then by accuracy)
    const priorityTopics = topicAnalysis
      .filter(t => t.needs_attention)
      .sort((a, b) => a.accuracy - b.accuracy)

    const strongTopics = topicAnalysis
      .filter(t => !t.needs_attention && t.accuracy >= 75)
      .sort((a, b) => b.accuracy - a.accuracy)

    const notStartedTopics = topicAnalysis
      .filter(t => t.total_questions === 0)

    // Generate lesson recommendations
    const recommendations = []

    if (priorityTopics.length > 0) {
      const topPriority = priorityTopics[0]
      recommendations.push({
        type: 'review',
        priority: 'high',
        topic: topPriority.topic,
        topic_name: topPriority.topic_name,
        reason: topPriority.accuracy < 70
          ? `Low accuracy (${topPriority.accuracy}%) - needs reinforcement`
          : topPriority.recent_attempts === 0
          ? 'Not practiced recently - review needed'
          : 'Limited practice - needs more questions',
        suggested_duration: 30,
        focus_areas: ['Conceptual understanding', 'Common mistakes', 'Practice problems']
      })
    }

    if (priorityTopics.length > 1) {
      const secondPriority = priorityTopics[1]
      recommendations.push({
        type: 'practice',
        priority: 'medium',
        topic: secondPriority.topic,
        topic_name: secondPriority.topic_name,
        reason: `Accuracy: ${secondPriority.accuracy}% - additional practice needed`,
        suggested_duration: 20,
        focus_areas: ['Practice questions', 'Speed improvement']
      })
    }

    if (notStartedTopics.length > 0 && priorityTopics.length < 2) {
      const newTopic = notStartedTopics[0]
      recommendations.push({
        type: 'new_topic',
        priority: 'medium',
        topic: newTopic.topic,
        topic_name: newTopic.topic_name,
        reason: 'Not yet covered - ready to introduce',
        suggested_duration: 45,
        focus_areas: ['Concept introduction', 'Worked examples', 'Basic practice']
      })
    }

    // Generate structured lesson plan
    const lessonPlan = {
      week_summary: {
        quizzes_completed: recentAttempts?.length || 0,
        total_questions: questionResults?.length || 0,
        average_score: questionResults?.length > 0
          ? Math.round((questionResults.filter(q => q.is_correct).length / questionResults.length) * 100)
          : 0,
        topics_practiced: new Set(recentAttempts?.map(a => {
          const quiz = Array.isArray(a.quizzes) ? a.quizzes[0] : a.quizzes
          return quiz?.topic
        }).filter(Boolean)).size
      },
      priority_topics: priorityTopics.slice(0, 3),
      strong_topics: strongTopics.slice(0, 3),
      not_started_topics: notStartedTopics,
      recommendations,
      suggested_session_structure: {
        warmup: {
          duration: 10,
          activity: 'Quick review of previous week\'s topics',
          topics: strongTopics.slice(0, 2).map(t => t.topic_name)
        },
        main_focus: {
          duration: 30,
          activity: recommendations[0]?.type === 'review' ? 'Review and reinforce weak topic' : 'Introduce new topic',
          topic: recommendations[0]?.topic_name || 'Continue syllabus',
          focus_areas: recommendations[0]?.focus_areas || []
        },
        practice: {
          duration: 15,
          activity: 'Guided practice questions',
          topic: recommendations[0]?.topic_name || '',
          recommended_count: 5
        },
        wrap_up: {
          duration: 5,
          activity: 'Summary and homework assignment'
        }
      }
    }

    return NextResponse.json({
      hasData: (recentAttempts?.length || 0) > 0,
      lessonPlan,
      detailed_analysis: topicAnalysis
    })
  } catch (error) {
    console.error('Error in GET /api/tutor/session-plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate session plan' },
      { status: 500 }
    )
  }
}
