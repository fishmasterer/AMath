'use client';

import { useState } from 'react';
import { MultipleSelectQuestion } from '@/lib/lessons/types';
import { Check, X, Lightbulb, ArrowRight, Square, CheckSquare } from 'lucide-react';
import katex from 'katex';

interface MultipleSelectProps {
  question: MultipleSelectQuestion;
  onAnswer: (correct: boolean, points: number) => void;
  showHints?: boolean;
}

export function MultipleSelect({ question, onAnswer, showHints = true }: MultipleSelectProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const toggleOption = (optionId: string) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(optionId)) {
        next.delete(optionId);
      } else {
        next.add(optionId);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) return;
    setSubmitted(true);

    // Check if all correct answers are selected and no incorrect ones
    const correctSet = new Set(question.correctAnswers);
    const isFullyCorrect =
      selected.size === correctSet.size &&
      [...selected].every((id) => correctSet.has(id));

    onAnswer(isFullyCorrect, isFullyCorrect ? question.points : 0);
  };

  const renderLatex = (text: string, latex?: string) => {
    if (latex) {
      try {
        return (
          <span
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(latex, { throwOnError: false }),
            }}
          />
        );
      } catch {
        return <span>{text}</span>;
      }
    }
    return <span>{text}</span>;
  };

  const correctSet = new Set(question.correctAnswers);
  const correctCount = [...selected].filter((id) => correctSet.has(id)).length;
  const isFullyCorrect =
    submitted &&
    selected.size === correctSet.size &&
    [...selected].every((id) => correctSet.has(id));

  return (
    <div className="space-y-6">
      {/* Question prompt */}
      <div className="text-lg text-white">
        {question.promptLatex ? (
          <div
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(question.promptLatex, {
                throwOnError: false,
                displayMode: true,
              }),
            }}
          />
        ) : (
          question.prompt
        )}
      </div>

      {/* Selection hint */}
      <div className="text-sm text-cyan-400/80">
        Select all that apply ({question.correctAnswers.length} correct answers)
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selected.has(option.id);
          const isCorrectOption = correctSet.has(option.id);

          let optionClass = 'border-white/20 hover:border-cyan-500/50 hover:bg-white/5';

          if (submitted) {
            if (isCorrectOption && isSelected) {
              optionClass = 'border-green-500 bg-green-500/20';
            } else if (isCorrectOption && !isSelected) {
              optionClass = 'border-yellow-500 bg-yellow-500/20'; // Missed correct answer
            } else if (!isCorrectOption && isSelected) {
              optionClass = 'border-red-500 bg-red-500/20';
            } else {
              optionClass = 'border-white/10 opacity-50';
            }
          } else if (isSelected) {
            optionClass = 'border-cyan-500 bg-cyan-500/20';
          }

          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              disabled={submitted}
              className={`
                w-full p-4 rounded-xl border-2 text-left
                flex items-center gap-4
                transition-all duration-200
                ${optionClass}
                ${!submitted && 'cursor-pointer'}
              `}
            >
              {/* Checkbox */}
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  flex-shrink-0 transition-colors
                  ${submitted && isCorrectOption && isSelected
                    ? 'bg-green-500 text-white'
                    : submitted && isCorrectOption && !isSelected
                      ? 'bg-yellow-500 text-white'
                      : submitted && !isCorrectOption && isSelected
                        ? 'bg-red-500 text-white'
                        : isSelected
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/10 text-white/70'
                  }
                `}
              >
                {submitted ? (
                  isCorrectOption ? (
                    isSelected ? (
                      <Check size={20} />
                    ) : (
                      <Check size={20} className="opacity-50" />
                    )
                  ) : isSelected ? (
                    <X size={20} />
                  ) : (
                    <Square size={20} />
                  )
                ) : isSelected ? (
                  <CheckSquare size={20} />
                ) : (
                  <Square size={20} />
                )}
              </div>

              {/* Option text */}
              <div className="flex-1 text-white">
                {renderLatex(option.text, option.latex)}
              </div>

              {/* Feedback badge */}
              {submitted && isCorrectOption && !isSelected && (
                <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">
                  Missed
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Hint button */}
      {showHints && question.hint && !submitted && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <Lightbulb size={16} />
          {showHint ? 'Hide hint' : 'Need a hint?'}
        </button>
      )}

      {/* Hint content */}
      {showHint && !submitted && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <p className="text-yellow-200 text-sm">{question.hint}</p>
        </div>
      )}

      {/* Submit button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected.size === 0}
          className={`
            w-full py-4 rounded-xl font-medium text-lg
            flex items-center justify-center gap-2
            transition-all duration-200
            ${selected.size > 0
              ? 'bg-cyan-500 hover:bg-cyan-400 text-white'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
            }
          `}
        >
          Check Answer
          <ArrowRight size={20} />
        </button>
      )}

      {/* Explanation after submit */}
      {submitted && (
        <div
          className={`
            p-5 rounded-xl border-2
            ${isFullyCorrect
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
            }
          `}
        >
          <div className="flex items-center gap-2 mb-3">
            {isFullyCorrect ? (
              <>
                <Check className="text-green-400" size={24} />
                <span className="text-green-400 font-bold text-lg">
                  Perfect! +{question.points} XP
                </span>
              </>
            ) : (
              <>
                <X className="text-red-400" size={24} />
                <span className="text-red-400 font-bold text-lg">
                  {correctCount}/{question.correctAnswers.length} correct selections
                </span>
              </>
            )}
          </div>
          <div className="text-white/80">
            {question.explanationLatex ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(question.explanationLatex, {
                    throwOnError: false,
                    displayMode: false,
                  }),
                }}
              />
            ) : (
              question.explanation
            )}
          </div>
        </div>
      )}
    </div>
  );
}
