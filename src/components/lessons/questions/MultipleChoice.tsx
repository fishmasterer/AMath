'use client';

import { useState } from 'react';
import { MultipleChoiceQuestion } from '@/lib/lessons/types';
import { Check, X, Lightbulb, ArrowRight } from 'lucide-react';
import katex from 'katex';

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean, points: number) => void;
  showHints?: boolean;
}

export function MultipleChoice({ question, onAnswer, showHints = true }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selected === question.correctAnswer;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    onAnswer(isCorrect, isCorrect ? question.points : 0);
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

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selected === option.id;
          const isCorrectOption = option.id === question.correctAnswer;
          const letter = String.fromCharCode(65 + index); // A, B, C, D...

          let optionClass = 'border-white/20 hover:border-cyan-500/50 hover:bg-white/5';

          if (submitted) {
            if (isCorrectOption) {
              optionClass = 'border-green-500 bg-green-500/20';
            } else if (isSelected && !isCorrectOption) {
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
              onClick={() => !submitted && setSelected(option.id)}
              disabled={submitted}
              className={`
                w-full p-4 rounded-xl border-2 text-left
                flex items-center gap-4
                transition-all duration-200
                ${optionClass}
                ${!submitted && 'cursor-pointer'}
              `}
            >
              {/* Letter badge */}
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  font-bold text-lg flex-shrink-0
                  ${submitted && isCorrectOption
                    ? 'bg-green-500 text-white'
                    : submitted && isSelected && !isCorrectOption
                      ? 'bg-red-500 text-white'
                      : isSelected
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/10 text-white/70'
                  }
                `}
              >
                {submitted ? (
                  isCorrectOption ? (
                    <Check size={20} />
                  ) : isSelected ? (
                    <X size={20} />
                  ) : (
                    letter
                  )
                ) : (
                  letter
                )}
              </div>

              {/* Option text */}
              <div className="flex-1 text-white">
                {renderLatex(option.text, option.latex)}
              </div>
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
          disabled={!selected}
          className={`
            w-full py-4 rounded-xl font-medium text-lg
            flex items-center justify-center gap-2
            transition-all duration-200
            ${selected
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
            ${isCorrect
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
            }
          `}
        >
          <div className="flex items-center gap-2 mb-3">
            {isCorrect ? (
              <>
                <Check className="text-green-400" size={24} />
                <span className="text-green-400 font-bold text-lg">Correct! +{question.points} XP</span>
              </>
            ) : (
              <>
                <X className="text-red-400" size={24} />
                <span className="text-red-400 font-bold text-lg">Not quite right</span>
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
