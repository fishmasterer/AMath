'use client';

import { useState, useRef, useEffect } from 'react';
import { NumericQuestion } from '@/lib/lessons/types';
import { Check, X, Lightbulb, ArrowRight, Calculator, Delete } from 'lucide-react';
import katex from 'katex';

interface NumericProps {
  question: NumericQuestion;
  onAnswer: (correct: boolean, points: number) => void;
  showHints?: boolean;
  showNumpad?: boolean;
}

export function Numeric({
  question,
  onAnswer,
  showHints = true,
  showNumpad = true,
}: NumericProps) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!answer.trim()) return;

    const numericAnswer = parseFloat(answer);
    const tolerance = question.tolerance || 0;
    const correct =
      Math.abs(numericAnswer - question.correctAnswer) <= tolerance;

    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct, correct ? question.points : 0);
  };

  const handleNumpadClick = (value: string) => {
    if (submitted) return;

    if (value === 'clear') {
      setAnswer('');
    } else if (value === 'backspace') {
      setAnswer((prev) => prev.slice(0, -1));
    } else if (value === 'negative') {
      setAnswer((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    } else {
      // Prevent multiple decimals
      if (value === '.' && answer.includes('.')) return;
      setAnswer((prev) => prev + value);
    }
    inputRef.current?.focus();
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (submitted) return;

      if (e.key === 'Enter' && answer.trim()) {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answer, submitted]);

  const numpadButtons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['negative', '0', '.'],
  ];

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

      {/* Input field */}
      <div className="relative">
        <div className="flex items-center gap-3">
          <Calculator className="text-cyan-400" size={24} />
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            value={answer}
            onChange={(e) => !submitted && setAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Enter your answer"
            className={`
              flex-1 px-4 py-4 rounded-xl border-2 text-xl font-medium text-center
              bg-slate-900/50 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
              ${submitted
                ? isCorrect
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : 'border-red-500 bg-red-500/20 text-red-400'
                : 'border-cyan-500/50 text-white focus:border-cyan-500 focus:ring-cyan-500'
              }
            `}
          />
          {question.unit && (
            <span className="text-white/60 text-lg">{question.unit}</span>
          )}
        </div>
      </div>

      {/* Numpad */}
      {showNumpad && !submitted && (
        <div className="grid grid-cols-4 gap-2">
          {numpadButtons.map((row, rowIdx) => (
            row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleNumpadClick(btn)}
                className={`
                  py-4 rounded-xl font-medium text-xl
                  transition-all duration-150
                  ${btn === 'negative'
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }
                  active:scale-95
                `}
              >
                {btn === 'negative' ? '+/-' : btn}
              </button>
            ))
          ))}
          {/* Additional row with backspace and clear */}
          <button
            onClick={() => handleNumpadClick('backspace')}
            className="py-4 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 transition-all active:scale-95"
          >
            <Delete className="mx-auto" size={24} />
          </button>
        </div>
      )}

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
          disabled={!answer.trim()}
          className={`
            w-full py-4 rounded-xl font-medium text-lg
            flex items-center justify-center gap-2
            transition-all duration-200
            ${answer.trim()
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
                  Not quite! The answer is {question.correctAnswer}
                  {question.unit ? ` ${question.unit}` : ''}
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
