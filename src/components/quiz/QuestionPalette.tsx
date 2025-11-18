'use client'

interface QuestionPaletteProps {
  totalQuestions: number
  currentQuestion: number
  answeredQuestions: Set<number>
  flaggedQuestions: Set<number>
  onQuestionSelect: (index: number) => void
}

export default function QuestionPalette({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  flaggedQuestions,
  onQuestionSelect,
}: QuestionPaletteProps) {
  const getQuestionColor = (index: number) => {
    if (index === currentQuestion) {
      return 'bg-blue-500 text-white border-blue-400'
    }
    if (flaggedQuestions.has(index)) {
      return 'bg-purple-500/20 text-purple-400 border-purple-500'
    }
    if (answeredQuestions.has(index)) {
      return 'bg-green-500/20 text-green-400 border-green-500'
    }
    return 'bg-white/5 text-gray-400 border-white/20 hover:bg-white/10'
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-semibold mb-3 flex items-center justify-between">
        <span>Questions</span>
        <span className="text-sm text-gray-400">
          {answeredQuestions.size}/{totalQuestions}
        </span>
      </h3>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded border border-blue-400" />
          <span className="text-gray-400">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500/20 rounded border border-green-500" />
          <span className="text-gray-400">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/5 rounded border border-white/20" />
          <span className="text-gray-400">Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500/20 rounded border border-purple-500" />
          <span className="text-gray-400">Flagged</span>
        </div>
      </div>

      {/* Question grid */}
      <div className="grid grid-cols-5 gap-2 max-h-[400px] overflow-y-auto pr-2">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionSelect(i)}
            className={`h-10 rounded border-2 font-semibold transition-all hover:scale-105 relative ${getQuestionColor(i)}`}
          >
            {i + 1}
            {flaggedQuestions.has(i) && (
              <svg className="w-3 h-3 absolute -top-1 -right-1 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 6l7-3 7 3v8l-7 3-7-3V6z" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Answered:</span>
          <span className="text-green-400 font-semibold">{answeredQuestions.size}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Not Answered:</span>
          <span className="text-red-400 font-semibold">{totalQuestions - answeredQuestions.size}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Flagged:</span>
          <span className="text-purple-400 font-semibold">{flaggedQuestions.size}</span>
        </div>
      </div>
    </div>
  )
}
