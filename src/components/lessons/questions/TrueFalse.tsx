'use client';

import { useState } from 'react';
import { TrueFalseQuestion } from '@/lib/lessons/types';
import { Check, X, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import katex from 'katex';

interface TrueFalseProps {
  question: TrueFalseQuestion;
  onAnswer: (correct: boolean, points: number) => void;
  showHints?: boolean;
}

export function TrueFalse({ question, onAnswer, showHints = true }: TrueFalseProps) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selected === question.correctAnswer;

  const handleSelect = (value: boolean) => {
    if (submitted) return;
    setSelected(value);
    // Auto-submit for true/false
    setSubmitted(true);
    onAnswer(value === question.correctAnswer, value === question.correctAnswer ? question.points : 0);
  };

  return (
    <div className="space-y-6">
      {/* Question prompt */}
      <div className="p-6 bg-slate-800/50 rounded-xl border border-white/10">
        <div className="text-xl text-white text-center">
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
      </div>

      {/* True/False buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* True button */}
        <button
          onClick={() => handleSelect(true)}
          disabled={submitted}
          className={`
            relative p-6 rounded-xl border-2
            flex flex-col items-center justify-center gap-3
            transition-all duration-300
            ${submitted
              ? question.correctAnswer === true
                ? 'border-green-500 bg-green-500/20'
                : selected === true
                  ? 'border-red-500 bg-red-500/20'
                  : 'border-white/10 opacity-40'
              : selected === true
                ? 'border-cyan-500 bg-cyan-500/20'
                : 'border-white/20 hover:border-green-500/50 hover:bg-green-500/10'
            }
          `}
        >
          <CheckCircle
            size={48}
            className={`
              transition-colors
              ${submitted
                ? question.correctAnswer === true
                  ? 'text-green-400'
                  : selected === true
                    ? 'text-red-400'
                    : 'text-white/30'
                : selected === true
                  ? 'text-cyan-400'
                  : 'text-green-400/60'
              }
            `}
          />
          <span
            className={`
              text-2xl font-bold transition-colors
              ${submitted
                ? question.correctAnswer === true
                  ? 'text-green-400'
                  : selected === true
                    ? 'text-red-400'
                    : 'text-white/30'
                : selected === true
                  ? 'text-cyan-400'
                  : 'text-white'
              }
            `}
          >
            TRUE
          </span>

          {/* Result icon */}
          {submitted && question.correctAnswer === true && (
            <div className="absolute top-2 right-2">
              <Check className="text-green-400" size={24} />
            </div>
          )}
          {submitted && selected === true && !isCorrect && (
            <div className="absolute top-2 right-2">
              <X className="text-red-400" size={24} />
            </div>
          )}
        </button>

        {/* False button */}
        <button
          onClick={() => handleSelect(false)}
          disabled={submitted}
          className={`
            relative p-6 rounded-xl border-2
            flex flex-col items-center justify-center gap-3
            transition-all duration-300
            ${submitted
              ? question.correctAnswer === false
                ? 'border-green-500 bg-green-500/20'
                : selected === false
                  ? 'border-red-500 bg-red-500/20'
                  : 'border-white/10 opacity-40'
              : selected === false
                ? 'border-cyan-500 bg-cyan-500/20'
                : 'border-white/20 hover:border-red-500/50 hover:bg-red-500/10'
            }
          `}
        >
          <XCircle
            size={48}
            className={`
              transition-colors
              ${submitted
                ? question.correctAnswer === false
                  ? 'text-green-400'
                  : selected === false
                    ? 'text-red-400'
                    : 'text-white/30'
                : selected === false
                  ? 'text-cyan-400'
                  : 'text-red-400/60'
              }
            `}
          />
          <span
            className={`
              text-2xl font-bold transition-colors
              ${submitted
                ? question.correctAnswer === false
                  ? 'text-green-400'
                  : selected === false
                    ? 'text-red-400'
                    : 'text-white/30'
                : selected === false
                  ? 'text-cyan-400'
                  : 'text-white'
              }
            `}
          >
            FALSE
          </span>

          {/* Result icon */}
          {submitted && question.correctAnswer === false && (
            <div className="absolute top-2 right-2">
              <Check className="text-green-400" size={24} />
            </div>
          )}
          {submitted && selected === false && !isCorrect && (
            <div className="absolute top-2 right-2">
              <X className="text-red-400" size={24} />
            </div>
          )}
        </button>
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
                <span className="text-green-400 font-bold text-lg">
                  Correct! +{question.points} XP
                </span>
              </>
            ) : (
              <>
                <X className="text-red-400" size={24} />
                <span className="text-red-400 font-bold text-lg">
                  The statement is {question.correctAnswer ? 'TRUE' : 'FALSE'}
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
