'use client';

import { useState, useEffect, useRef } from 'react';
import { GraphInteractQuestion } from '@/lib/lessons/types';
import { Check, X, Lightbulb, ArrowRight, Target, RefreshCw } from 'lucide-react';
import katex from 'katex';
import { DesmosCalculator } from '@/types/desmos';

interface GraphInteractProps {
  question: GraphInteractQuestion;
  onAnswer: (correct: boolean, points: number) => void;
  showHints?: boolean;
}

export function GraphInteract({ question, onAnswer, showHints = true }: GraphInteractProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<DesmosCalculator | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userValue, setUserValue] = useState<string | null>(null);

  // Load Desmos API
  useEffect(() => {
    const loadDesmos = () => {
      if (window.Desmos) {
        initCalculator();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
      script.async = true;
      script.onload = () => {
        initCalculator();
      };
      document.body.appendChild(script);
    };

    const initCalculator = () => {
      if (!containerRef.current || !window.Desmos) return;

      calculatorRef.current = new window.Desmos.GraphingCalculator(containerRef.current, {
        expressions: true,
        settingsMenu: false,
        zoomButtons: true,
        expressionsTopbar: false,
        border: false,
        lockViewport: false,
        fontSize: 16,
      });

      // Set initial expressions
      question.initialGraph.expressions.forEach((expr, idx) => {
        calculatorRef.current?.setExpression({
          id: `expr_${idx}`,
          latex: expr.latex,
          color: expr.color || '#2563eb',
          hidden: expr.hidden,
        });
      });

      // Set bounds if specified
      if (question.initialGraph.bounds) {
        calculatorRef.current.setMathBounds(question.initialGraph.bounds);
      }

      // Add user input expression based on validation type
      if (question.validation.type === 'point') {
        calculatorRef.current.setExpression({
          id: 'user_point',
          latex: '(0, 0)',
          color: '#ef4444',
        });
      } else if (question.validation.type === 'expression') {
        calculatorRef.current.setExpression({
          id: 'user_expr',
          latex: 'y=',
          color: '#ef4444',
        });
      }

      setIsLoaded(true);
    };

    loadDesmos();

    return () => {
      calculatorRef.current?.destroy();
    };
  }, []);

  const handleReset = () => {
    if (!calculatorRef.current || submitted) return;

    // Reset to initial state
    if (question.validation.type === 'point') {
      calculatorRef.current.setExpression({
        id: 'user_point',
        latex: '(0, 0)',
        color: '#ef4444',
      });
    } else if (question.validation.type === 'expression') {
      calculatorRef.current.setExpression({
        id: 'user_expr',
        latex: 'y=',
        color: '#ef4444',
      });
    }
  };

  const handleSubmit = () => {
    if (!calculatorRef.current) return;

    const expressions = calculatorRef.current.getExpressions();
    let correct = false;
    let userAnswer = '';

    if (question.validation.type === 'point') {
      const pointExpr = expressions.find((e) => e.id === 'user_point');
      if (pointExpr) {
        userAnswer = pointExpr.latex;
        // Parse the point and check against target
        const match = pointExpr.latex.match(/\(([^,]+),\s*([^)]+)\)/);
        if (match) {
          const x = parseFloat(match[1]);
          const y = parseFloat(match[2]);
          const targetMatch = question.validation.target.match(/\(([^,]+),\s*([^)]+)\)/);
          if (targetMatch) {
            const targetX = parseFloat(targetMatch[1]);
            const targetY = parseFloat(targetMatch[2]);
            const tolerance = question.validation.tolerance || 0.5;
            correct = Math.abs(x - targetX) <= tolerance && Math.abs(y - targetY) <= tolerance;
          }
        }
      }
    } else if (question.validation.type === 'value') {
      // Check a specific expression evaluation
      const analysis = calculatorRef.current.expressionAnalysis;
      const targetValue = parseFloat(question.validation.target);
      const tolerance = question.validation.tolerance || 0.01;

      Object.values(analysis).forEach((a) => {
        if (a.evaluation?.value !== undefined) {
          if (Math.abs(a.evaluation.value - targetValue) <= tolerance) {
            correct = true;
            userAnswer = a.evaluation.value.toString();
          }
        }
      });
    } else if (question.validation.type === 'expression') {
      const userExpr = expressions.find((e) => e.id === 'user_expr');
      if (userExpr) {
        userAnswer = userExpr.latex;
        // Normalize and compare expressions
        const normalizedUser = userExpr.latex.replace(/\s/g, '').toLowerCase();
        const normalizedTarget = question.validation.target.replace(/\s/g, '').toLowerCase();
        correct = normalizedUser === normalizedTarget;
      }
    }

    setUserValue(userAnswer);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct, correct ? question.points : 0);
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

      {/* Task description */}
      <div className="flex items-start gap-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
        <Target className="text-cyan-400 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-cyan-400 font-medium">Your Task:</p>
          <p className="text-white/80">{question.task}</p>
        </div>
      </div>

      {/* Graph container */}
      <div className="relative">
        <div
          ref={containerRef}
          className={`
            w-full h-[400px] rounded-xl overflow-hidden border-2
            ${submitted
              ? isCorrect
                ? 'border-green-500'
                : 'border-red-500'
              : 'border-white/20'
            }
          `}
        />

        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-white/60 text-sm">Loading graph...</span>
            </div>
          </div>
        )}

        {/* Reset button */}
        {isLoaded && !submitted && (
          <button
            onClick={handleReset}
            className="absolute top-3 right-3 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white/70 hover:text-white transition-colors"
            title="Reset"
          >
            <RefreshCw size={18} />
          </button>
        )}
      </div>

      {/* Graph instructions */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
        <span>Click and drag to pan</span>
        <span>Scroll to zoom</span>
        <span>Edit expressions in the sidebar</span>
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
          disabled={!isLoaded}
          className={`
            w-full py-4 rounded-xl font-medium text-lg
            flex items-center justify-center gap-2
            transition-all duration-200
            ${isLoaded
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
                  Not quite right
                </span>
              </>
            )}
          </div>

          {userValue && !isCorrect && (
            <div className="mb-3 text-sm text-white/60">
              Your answer: <span className="text-red-400 font-mono">{userValue}</span>
              <br />
              Expected: <span className="text-green-400 font-mono">{question.validation.target}</span>
            </div>
          )}

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
