'use client'

import React from 'react'
import { Question, MCQQuestion, MultiSelectQuestion } from '@/lib/types'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import { GraphRenderer, GraphConfig } from '@/components/GraphRenderer'

interface QuestionRendererProps {
  question: Question
  questionNumber: number
  selectedAnswer: string | string[] | null
  onAnswerChange: (answer: string | string[]) => void
  isFlagged: boolean
  onToggleFlag: () => void
}

export default function QuestionRenderer({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerChange,
  isFlagged,
  onToggleFlag,
}: QuestionRendererProps) {
  // Function to render text with LaTeX support
  const renderTextWithLatex = (text: string) => {
    // Handle undefined/null text
    if (!text) return null

    // Split text by LaTeX delimiters
    const parts: React.ReactElement[] = []
    let remaining = text
    let key = 0

    // Process display math ($$...$$)
    while (remaining.includes('$$')) {
      const start = remaining.indexOf('$$')
      const end = remaining.indexOf('$$', start + 2)

      if (end === -1) break

      // Add text before LaTeX
      if (start > 0) {
        const before = remaining.substring(0, start)
        parts.push(<span key={key++}>{processInlineMath(before)}</span>)
      }

      // Add LaTeX
      const latex = remaining.substring(start + 2, end)
      parts.push(<BlockMath key={key++} math={latex} />)

      remaining = remaining.substring(end + 2)
    }

    // Add remaining text with inline math
    if (remaining) {
      parts.push(<span key={key++}>{processInlineMath(remaining)}</span>)
    }

    return parts.length > 0 ? <>{parts}</> : processInlineMath(text)
  }

  const processInlineMath = (text: string) => {
    // Handle undefined/null text
    if (!text) return null

    const parts: React.ReactElement[] = []
    let remaining = text
    let key = 0

    while (remaining.includes('$')) {
      const start = remaining.indexOf('$')
      const end = remaining.indexOf('$', start + 1)

      if (end === -1) break

      // Add text before LaTeX
      if (start > 0) {
        parts.push(<span key={key++}>{remaining.substring(0, start)}</span>)
      }

      // Add inline LaTeX
      const latex = remaining.substring(start + 1, end)
      parts.push(<InlineMath key={key++} math={latex} />)

      remaining = remaining.substring(end + 1)
    }

    // Add remaining text
    if (remaining) {
      parts.push(<span key={key++}>{remaining}</span>)
    }

    return parts.length > 0 ? <>{parts}</> : text
  }

  const handleMCQChange = (option: string) => {
    onAnswerChange(option)
  }

  const handleMultiSelectChange = (option: string) => {
    const currentAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : []
    if (currentAnswers.includes(option)) {
      onAnswerChange(currentAnswers.filter(a => a !== option))
    } else {
      onAnswerChange([...currentAnswers, option])
    }
  }

  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
      {/* Question header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg text-sm font-semibold">
              Question {questionNumber}
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-lg text-sm font-semibold">
              {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
            </span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg text-sm font-semibold">
              {question.type === 'mcq' ? 'Multiple Choice' : 'Multiple Select'}
            </span>
          </div>
        </div>
        <button
          onClick={onToggleFlag}
          className={`ml-4 p-2 rounded-lg transition-all ${
            isFlagged
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
          }`}
          title={isFlagged ? 'Unflag question' : 'Flag for review'}
        >
          <svg className="w-5 h-5" fill={isFlagged ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
        </button>
      </div>

      {/* Question text */}
      <div className="text-white text-lg leading-relaxed mb-6 transition-all duration-300">
        {question.question ? renderTextWithLatex(question.question) : (
          <div className="text-red-400">Question text not available</div>
        )}
      </div>

      {/* Graph (if provided) */}
      {(question as any).graph && (
        <div className="mb-6">
          <GraphRenderer
            config={(question as any).graph}
            height={350}
            className="animate-in fade-in duration-500"
          />
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.type === 'mcq' ? (
          // MCQ Options
          (question as MCQQuestion).options.map((option, index) => {
            const letter = optionLetters[index]
            const isSelected = selectedAnswer === letter

            return (
              <label
                key={letter}
                className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg ${
                  isSelected
                    ? 'bg-blue-500/20 border-blue-500 text-white shadow-blue-500/20 scale-[1.01]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={letter}
                  checked={isSelected}
                  onChange={() => handleMCQChange(letter)}
                  className="mt-1 w-5 h-5 text-blue-500 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="font-bold mr-2">{letter}.</span>
                  {renderTextWithLatex(option)}
                </div>
              </label>
            )
          })
        ) : (
          // Multi-select Options
          (question as MultiSelectQuestion).options.map((option, index) => {
            const letter = optionLetters[index]
            const isSelected = Array.isArray(selectedAnswer) && selectedAnswer.includes(letter)

            return (
              <label
                key={letter}
                className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg ${
                  isSelected
                    ? 'bg-blue-500/20 border-blue-500 text-white shadow-blue-500/20 scale-[1.01]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <input
                  type="checkbox"
                  name={`question-${question.id}-${letter}`}
                  value={letter}
                  checked={isSelected}
                  onChange={() => handleMultiSelectChange(letter)}
                  className="mt-1 w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="font-bold mr-2">{letter}.</span>
                  {renderTextWithLatex(option)}
                </div>
              </label>
            )
          })
        )}
      </div>

      {/* Multi-select hint */}
      {question.type === 'multi_select' && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Select all correct answers. {(question as MultiSelectQuestion).partialCredit && 'Partial credit may be awarded.'}
          </span>
        </div>
      )}

      {/* Selected answer summary */}
      {selectedAnswer && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>
            Answer selected: {Array.isArray(selectedAnswer) ? selectedAnswer.join(', ') : selectedAnswer}
          </span>
        </div>
      )}
    </div>
  )
}
