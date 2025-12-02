'use client';

import { useState } from 'react';
import { OrderingQuestion } from '@/lib/lessons/types';
import { Check, X, Lightbulb, ArrowRight, GripVertical, MoveUp, MoveDown } from 'lucide-react';
import katex from 'katex';

interface OrderingProps {
  question: OrderingQuestion;
  onAnswer: (correct: boolean, points: number) => void;
  showHints?: boolean;
}

export function Ordering({ question, onAnswer, showHints = true }: OrderingProps) {
  // Shuffle items initially
  const [orderedItems, setOrderedItems] = useState(() =>
    [...question.items].sort(() => Math.random() - 0.5)
  );
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (submitted) return;
    const newItems = [...orderedItems];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setOrderedItems(newItems);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      moveItem(draggedIndex, toIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSubmit = () => {
    const userOrder = orderedItems.map((item) => item.id);
    const newResults = userOrder.map((id, index) => id === question.correctOrder[index]);

    setResults(newResults);
    setSubmitted(true);

    const allCorrect = newResults.every(Boolean);
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

  const correctCount = results.filter(Boolean).length;

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

      {/* Instructions */}
      <div className="flex items-center gap-2 text-sm text-white/50">
        <GripVertical size={16} />
        <span>Drag to reorder, or use the arrows to move items</span>
      </div>

      {/* Ordering items */}
      <div className="space-y-2">
        {orderedItems.map((item, index) => {
          const isCorrect = submitted ? results[index] : null;
          const isDragging = draggedIndex === index;
          const isDragOver = dragOverIndex === index && draggedIndex !== index;

          return (
            <div
              key={item.id}
              draggable={!submitted}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                relative flex items-center gap-3 p-4 rounded-xl border-2
                transition-all duration-200
                ${submitted
                  ? isCorrect
                    ? 'border-green-500 bg-green-500/20'
                    : 'border-red-500 bg-red-500/20'
                  : isDragging
                    ? 'border-cyan-500 bg-cyan-500/30 opacity-50 scale-95'
                    : isDragOver
                      ? 'border-cyan-400 bg-cyan-500/20 scale-102'
                      : 'border-white/20 hover:border-white/40 bg-slate-800/50'
                }
                ${!submitted && 'cursor-grab active:cursor-grabbing'}
              `}
            >
              {/* Drag handle */}
              <div className="text-white/40">
                <GripVertical size={20} />
              </div>

              {/* Position number */}
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  font-bold text-lg flex-shrink-0
                  ${submitted
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-cyan-500/20 text-cyan-400'
                  }
                `}
              >
                {index + 1}
              </div>

              {/* Item content */}
              <div className="flex-1 text-white">
                {renderLatex(item.text, item.latex)}
              </div>

              {/* Move buttons (mobile friendly) */}
              {!submitted && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => index > 0 && moveItem(index, index - 1)}
                    disabled={index === 0}
                    className={`
                      p-1.5 rounded-lg transition-colors
                      ${index === 0
                        ? 'text-white/20 cursor-not-allowed'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <MoveUp size={16} />
                  </button>
                  <button
                    onClick={() =>
                      index < orderedItems.length - 1 && moveItem(index, index + 1)
                    }
                    disabled={index === orderedItems.length - 1}
                    className={`
                      p-1.5 rounded-lg transition-colors
                      ${index === orderedItems.length - 1
                        ? 'text-white/20 cursor-not-allowed'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <MoveDown size={16} />
                  </button>
                </div>
              )}

              {/* Correct position indicator (when wrong) */}
              {submitted && !isCorrect && (
                <div className="absolute -right-2 -top-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Should be #{question.correctOrder.indexOf(item.id) + 1}
                </div>
              )}
            </div>
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
          className="w-full py-4 rounded-xl font-medium text-lg bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center gap-2 transition-all duration-200"
        >
          Check Order
          <ArrowRight size={20} />
        </button>
      )}

      {/* Results */}
      {submitted && (
        <div
          className={`
            p-5 rounded-xl border-2
            ${correctCount === orderedItems.length
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
            }
          `}
        >
          <div className="flex items-center gap-2 mb-3">
            {correctCount === orderedItems.length ? (
              <>
                <Check className="text-green-400" size={24} />
                <span className="text-green-400 font-bold text-lg">
                  Perfect order! +{question.points} XP
                </span>
              </>
            ) : (
              <>
                <X className="text-red-400" size={24} />
                <span className="text-red-400 font-bold text-lg">
                  {correctCount}/{orderedItems.length} in correct position
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
