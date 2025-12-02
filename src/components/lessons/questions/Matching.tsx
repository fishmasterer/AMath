'use client';

import { useState } from 'react';
import { MatchingQuestion } from '@/lib/lessons/types';
import { Check, X, Lightbulb, ArrowRight, Link2, Unlink } from 'lucide-react';
import katex from 'katex';

interface MatchingProps {
  question: MatchingQuestion;
  onAnswer: (correct: boolean, points: number) => void;
  showHints?: boolean;
}

export function Matching({ question, onAnswer, showHints = true }: MatchingProps) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<{ side: 'left' | 'right'; id: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  // Shuffle right items for display
  const [shuffledRight] = useState(() =>
    [...question.rightItems].sort(() => Math.random() - 0.5)
  );

  const handleSelect = (side: 'left' | 'right', id: string) => {
    if (submitted) return;

    // If clicking on already matched item, unmatch it
    if (side === 'left' && matches[id]) {
      const newMatches = { ...matches };
      delete newMatches[id];
      setMatches(newMatches);
      setSelected(null);
      return;
    }

    // If right side is already matched to something, unmatch it
    if (side === 'right') {
      const leftKey = Object.keys(matches).find((k) => matches[k] === id);
      if (leftKey) {
        const newMatches = { ...matches };
        delete newMatches[leftKey];
        setMatches(newMatches);
        setSelected(null);
        return;
      }
    }

    if (!selected) {
      setSelected({ side, id });
    } else if (selected.side === side) {
      // Same side, change selection
      setSelected({ side, id });
    } else {
      // Different side, make match
      const leftId = side === 'left' ? id : selected.id;
      const rightId = side === 'right' ? id : selected.id;
      setMatches((prev) => ({ ...prev, [leftId]: rightId }));
      setSelected(null);
    }
  };

  const handleSubmit = () => {
    const newResults: Record<string, boolean> = {};
    let correctCount = 0;

    question.leftItems.forEach((item) => {
      const userMatch = matches[item.id];
      const correctMatch = question.correctMatches[item.id];
      const isCorrect = userMatch === correctMatch;
      newResults[item.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setResults(newResults);
    setSubmitted(true);
    const allCorrect = correctCount === question.leftItems.length;
    onAnswer(allCorrect, allCorrect ? question.points : 0);
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

  const isLeftSelected = (id: string) => selected?.side === 'left' && selected.id === id;
  const isRightSelected = (id: string) => selected?.side === 'right' && selected.id === id;
  const isLeftMatched = (id: string) => !!matches[id];
  const isRightMatched = (id: string) => Object.values(matches).includes(id);
  const getMatchColor = (leftId: string, index: number) => {
    const colors = [
      'border-cyan-500 bg-cyan-500/20',
      'border-purple-500 bg-purple-500/20',
      'border-pink-500 bg-pink-500/20',
      'border-orange-500 bg-orange-500/20',
      'border-green-500 bg-green-500/20',
    ];
    return colors[index % colors.length];
  };

  const getLeftMatchIndex = (leftId: string) => {
    const matchedLeftIds = question.leftItems.filter((i) => matches[i.id]).map((i) => i.id);
    return matchedLeftIds.indexOf(leftId);
  };

  const getRightMatchIndex = (rightId: string) => {
    const leftId = Object.keys(matches).find((k) => matches[k] === rightId);
    if (!leftId) return -1;
    return getLeftMatchIndex(leftId);
  };

  const allMatched = question.leftItems.every((item) => matches[item.id]);
  const correctCount = Object.values(results).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Question prompt */}
      <div className="text-lg text-white mb-2">
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

      {/* Instructions */}
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Link2 size={16} />
        <span>Tap items to match them. Tap matched items to disconnect.</span>
      </div>

      {/* Matching area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-3">
          {question.leftItems.map((item, idx) => {
            const matchIndex = getLeftMatchIndex(item.id);
            const matchColor = matchIndex >= 0 ? getMatchColor(item.id, matchIndex) : '';

            return (
              <button
                key={item.id}
                onClick={() => handleSelect('left', item.id)}
                disabled={submitted}
                className={`
                  w-full p-4 rounded-xl border-2 text-left
                  transition-all duration-200
                  ${submitted
                    ? results[item.id]
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-red-500 bg-red-500/20'
                    : isLeftSelected(item.id)
                      ? 'border-cyan-400 bg-cyan-500/30 scale-105'
                      : isLeftMatched(item.id)
                        ? matchColor
                        : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      font-bold text-sm flex-shrink-0
                      ${submitted
                        ? results[item.id]
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : isLeftMatched(item.id)
                          ? 'bg-white/20 text-white'
                          : 'bg-white/10 text-white/70'
                      }
                    `}
                  >
                    {idx + 1}
                  </div>
                  <div className="text-white">
                    {renderLatex(item.text, item.latex)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-3">
          {shuffledRight.map((item) => {
            const matchIndex = getRightMatchIndex(item.id);
            const matchColor = matchIndex >= 0 ? getMatchColor('', matchIndex) : '';
            const correctLeftId = Object.keys(question.correctMatches).find(
              (k) => question.correctMatches[k] === item.id
            );
            const actualLeftMatch = Object.keys(matches).find((k) => matches[k] === item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleSelect('right', item.id)}
                disabled={submitted}
                className={`
                  w-full p-4 rounded-xl border-2 text-left
                  transition-all duration-200
                  ${submitted
                    ? actualLeftMatch && results[actualLeftMatch]
                      ? 'border-green-500 bg-green-500/20'
                      : actualLeftMatch
                        ? 'border-red-500 bg-red-500/20'
                        : 'border-white/10 opacity-50'
                    : isRightSelected(item.id)
                      ? 'border-cyan-400 bg-cyan-500/30 scale-105'
                      : isRightMatched(item.id)
                        ? matchColor
                        : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                  }
                `}
              >
                <div className="text-white">
                  {renderLatex(item.text, item.latex)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Match lines visualization */}
      {Object.keys(matches).length > 0 && !submitted && (
        <div className="flex items-center justify-center gap-2 text-sm text-cyan-400">
          <Link2 size={16} />
          <span>{Object.keys(matches).length} / {question.leftItems.length} matched</span>
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
          disabled={!allMatched}
          className={`
            w-full py-4 rounded-xl font-medium text-lg
            flex items-center justify-center gap-2
            transition-all duration-200
            ${allMatched
              ? 'bg-cyan-500 hover:bg-cyan-400 text-white'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
            }
          `}
        >
          Check Matches
          <ArrowRight size={20} />
        </button>
      )}

      {/* Results */}
      {submitted && (
        <div
          className={`
            p-5 rounded-xl border-2
            ${correctCount === question.leftItems.length
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
            }
          `}
        >
          <div className="flex items-center gap-2 mb-3">
            {correctCount === question.leftItems.length ? (
              <>
                <Check className="text-green-400" size={24} />
                <span className="text-green-400 font-bold text-lg">
                  All matched correctly! +{question.points} XP
                </span>
              </>
            ) : (
              <>
                <X className="text-red-400" size={24} />
                <span className="text-red-400 font-bold text-lg">
                  {correctCount}/{question.leftItems.length} correct matches
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
