'use client'

import { TOPIC_NAMES, QuizTopic } from '@/lib/types'

interface TopicMasteryData {
  topic: string
  topic_name: string
  accuracy: number
  mastery_level: 'not_started' | 'beginner' | 'developing' | 'proficient' | 'mastered'
  total_questions: number
}

interface MasteryHeatMapProps {
  topicMastery: TopicMasteryData[]
}

export function MasteryHeatMap({ topicMastery }: MasteryHeatMapProps) {
  // Organize topics into categories
  const algebraTopics = topicMastery.filter(t => t.topic.startsWith('A'))
  const geometryTopics = topicMastery.filter(t => t.topic.startsWith('G'))
  const calculusTopics = topicMastery.filter(t => t.topic.startsWith('C'))

  const getHeatColor = (accuracy: number, totalQuestions: number) => {
    if (totalQuestions === 0) {
      return {
        bg: 'bg-gray-800',
        border: 'border-gray-700',
        text: 'text-gray-500',
        label: 'Not Started'
      }
    }

    if (accuracy >= 90) {
      return {
        bg: 'bg-green-600',
        border: 'border-green-500',
        text: 'text-white',
        label: 'Mastered'
      }
    } else if (accuracy >= 75) {
      return {
        bg: 'bg-blue-600',
        border: 'border-blue-500',
        text: 'text-white',
        label: 'Proficient'
      }
    } else if (accuracy >= 60) {
      return {
        bg: 'bg-yellow-600',
        border: 'border-yellow-500',
        text: 'text-white',
        label: 'Developing'
      }
    } else if (accuracy >= 40) {
      return {
        bg: 'bg-orange-600',
        border: 'border-orange-500',
        text: 'text-white',
        label: 'Beginner'
      }
    } else {
      return {
        bg: 'bg-red-600',
        border: 'border-red-500',
        text: 'text-white',
        label: 'Needs Focus'
      }
    }
  }

  const renderTopicCell = (topic: TopicMasteryData) => {
    const colors = getHeatColor(topic.accuracy, topic.total_questions)

    return (
      <div
        key={topic.topic}
        className={`${colors.bg} ${colors.border} border-2 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group relative`}
      >
        <div className={`font-mono font-bold text-lg ${colors.text} mb-1`}>
          {topic.topic}
        </div>
        <div className={`text-sm ${colors.text} font-medium mb-2 line-clamp-2`}>
          {topic.topic_name}
        </div>

        {topic.total_questions > 0 ? (
          <>
            <div className={`text-3xl font-bold ${colors.text} mb-1`}>
              {topic.accuracy}%
            </div>
            <div className={`text-xs ${colors.text} opacity-80`}>
              {topic.total_questions} questions
            </div>
          </>
        ) : (
          <div className={`text-sm ${colors.text} opacity-80`}>
            Not attempted
          </div>
        )}

        {/* Tooltip on hover */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap border border-white/20">
            <div className="font-semibold mb-1">{topic.topic_name}</div>
            <div>Status: {colors.label}</div>
            {topic.total_questions > 0 && (
              <div>Accuracy: {topic.accuracy}%</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
        <span className="text-gray-400 font-medium text-sm mr-2">Mastery Levels:</span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-800 rounded border-2 border-gray-700"></div>
          <span className="text-gray-400 text-sm">Not Started</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded border-2 border-red-500"></div>
          <span className="text-gray-400 text-sm">&lt;40%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-600 rounded border-2 border-orange-500"></div>
          <span className="text-gray-400 text-sm">40-59%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-600 rounded border-2 border-yellow-500"></div>
          <span className="text-gray-400 text-sm">60-74%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded border-2 border-blue-500"></div>
          <span className="text-gray-400 text-sm">75-89%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded border-2 border-green-500"></div>
          <span className="text-gray-400 text-sm">≥90%</span>
        </div>
      </div>

      {/* Algebra Topics */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📐</span> Algebra Topics (A1-A6)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {algebraTopics.map(renderTopicCell)}
        </div>
      </div>

      {/* Geometry Topics */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📏</span> Geometry Topics (G1-G3)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {geometryTopics.map(renderTopicCell)}
        </div>
      </div>

      {/* Calculus Topics */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>∫</span> Calculus Topics (C1)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {calculusTopics.map(renderTopicCell)}
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-bold text-white mb-4">Overall Syllabus Coverage</h3>
        <div className="space-y-3">
          {/* Mastered */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-green-400 text-sm font-medium">Mastered (≥90%)</span>
              <span className="text-green-400 font-bold">
                {topicMastery.filter(t => t.accuracy >= 90 && t.total_questions > 0).length}/10
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600"
                style={{ width: `${(topicMastery.filter(t => t.accuracy >= 90 && t.total_questions > 0).length / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Proficient */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-blue-400 text-sm font-medium">Proficient (75-89%)</span>
              <span className="text-blue-400 font-bold">
                {topicMastery.filter(t => t.accuracy >= 75 && t.accuracy < 90 && t.total_questions > 0).length}/10
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${(topicMastery.filter(t => t.accuracy >= 75 && t.accuracy < 90 && t.total_questions > 0).length / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Developing */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-yellow-400 text-sm font-medium">Developing (60-74%)</span>
              <span className="text-yellow-400 font-bold">
                {topicMastery.filter(t => t.accuracy >= 60 && t.accuracy < 75 && t.total_questions > 0).length}/10
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-600"
                style={{ width: `${(topicMastery.filter(t => t.accuracy >= 60 && t.accuracy < 75 && t.total_questions > 0).length / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Needs Focus */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-red-400 text-sm font-medium">Needs Focus (&lt;60%)</span>
              <span className="text-red-400 font-bold">
                {topicMastery.filter(t => t.accuracy < 60 && t.total_questions > 0).length}/10
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600"
                style={{ width: `${(topicMastery.filter(t => t.accuracy < 60 && t.total_questions > 0).length / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Not Started */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-400 text-sm font-medium">Not Started</span>
              <span className="text-gray-400 font-bold">
                {topicMastery.filter(t => t.total_questions === 0).length}/10
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-700"
                style={{ width: `${(topicMastery.filter(t => t.total_questions === 0).length / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
