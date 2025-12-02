'use client';

import { useState } from 'react';
import { FillBlankQuestion } from '@/lib/lessons/types';
import { Check, X, Lightbulb, ArrowRight, Type } from 'lucide-react';
import katex from 'katex';

interface FillBlankProps {
  question: FillBlankQuestion;
  onAnswer: (correct: boolean, points: number) => void;
  showHints?: boolean;
}

export function FillBlank({ question, onAnswer, showHints = true }: FillBlankProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleInputChange = (blankId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [blankId]: value }));
  };

  const checkAnswers = () => {
    const newResults: Record<string, boolean> = {};
    let allCorrect = true;

    question.blanks.forEach((blank) => {
      const userAnswer = answers[blank.id]?.trim().toLowerCase() || '';
      const acceptableAnswers = question.correctAnswers[blank.id] || [];
      const isCorrect = acceptableAnswers.some(
        (ans) => ans.toLowerCase() === userAnswer
      );
      newResults[blank.id] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setResults(newResults);
    setSubmitted(true);
    onAnswer(allCorrect, allCorrect ? question.points : 0);
  };

  const allFilled = question.blanks.every((blank) => answers[blank.id]?.trim());

  // Render prompt with blanks
  const renderPromptWithBlanks = () => {
    // Split prompt by [blank_id] patterns
    const parts = question.prompt.split(/\[([^\]]+)\]/);

    return (
      <div className="flex flex-wrap items-center gap-2 text-lg text-white">
        {parts.map((part, idx) => {
          // Check if this part is a blank id
          const blank = question.blanks.find((b) => b.id === part);

          if (blank) {
            const isCorrect = results[blank.id];
            const correctAnswer = question.correctAnswers[blank.id]?.[0] || '';

            return (
              <div key={idx} className="relative inline-flex flex-col">
                <input
                  type="text"
                  value={answers[blank.id] || ''}
                  onChange={(e) => handleInputChange(blank.id, e.target.value)}
                  disabled={submitted}
                  placeholder={blank.placeholder || '...'}
                  className={`
                    w-32 px-3 py-2 rounded-lg border-2 text-center font-medium
                    bg-slate-900/50 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                    ${submitted
                      ? isCorrect
                        ? 'border-green-500 bg-green-500/20 text-green-400 focus:ring-green-500'
                        : 'border-red-500 bg-red-500/20 text-red-400 focus:ring-red-500'
                      : 'border-cyan-500/50 text-white focus:border-cyan-500 focus:ring-cyan-500'
                    }
                  `}
                />
                {submitted && !isCorrect && (
                  <span className="absolute -bottom-6 left-0 right-0 text-xs text-green-400 text-center">
                    {correctAnswer}
                  </span>
                )}
              </div>
            );
          }

          return <span key={idx}>{part}</span>;
        })}
      </div>
    );
  };

  // Calculate score
  const correctCount = Object.values(results).filter(Boolean).length;
  const totalBlanks = question.blanks.length;

  return (
    <div className="space-y-6">
      {/* Question prompt with blanks */}
      <div className="p-6 bg-slate-800/50 rounded-xl border border-white/10">
        {question.promptLatex ? (
          <div
            className="mb-4"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(question.promptLatex, {
                throwOnError: false,
                displayMode: true,
              }),
            }}
          />
        ) : null}

        <div className="min-h-[60px] flex items-center">
          {renderPromptWithBlanks()}
        </div>
      </div>

      {/* Visual indicator */}
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Type size={16} />
        <span>Fill in the blanks to complete the equation</span>
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
          onClick={checkAnswers}
          disabled={!allFilled}
          className={`
            w-full py-4 rounded-xl font-medium text-lg
            flex items-center justify-center gap-2
            transition-all duration-200
            ${allFilled
              ? 'bg-cyan-500 hover:bg-cyan-400 text-white'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
            }
          `}
        >
          Check Answer
          <ArrowRight size={20} />
        </button>
      )}

      {/* Results */}
      {submitted && (
        <div
          className={`
            p-5 rounded-xl border-2
            ${correctCount === totalBlanks
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
            }
          `}
        >
          <div className="flex items-center gap-2 mb-3">
            {correctCount === totalBlanks ? (
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
                  {correctCount}/{totalBlanks} correct
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
