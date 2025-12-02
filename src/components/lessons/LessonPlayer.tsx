'use client';

import { useState, useEffect, useCallback } from 'react';
import { Lesson, LessonStep, LessonQuestion, LessonProgress } from '@/lib/lessons/types';
import { ContentBlocks } from './ContentBlock';
import { QuestionRenderer } from './QuestionRenderer';
import {
  ArrowRight,
  ArrowLeft,
  Trophy,
  Flame,
  Star,
  Clock,
  Target,
  CheckCircle,
  Sparkles,
  X,
} from 'lucide-react';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete?: (progress: LessonProgress) => void;
  onExit?: () => void;
  initialStep?: number;
}

export function LessonPlayer({
  lesson,
  onComplete,
  onExit,
  initialStep = 0,
}: LessonPlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep);
  const [stepResults, setStepResults] = useState<Map<string, { completed: boolean; score: number; attempts: number }>>(
    new Map()
  );
  const [totalScore, setTotalScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime] = useState(Date.now());
  const [canProceed, setCanProceed] = useState(false);

  const currentStep = lesson.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / lesson.steps.length) * 100;
  const hasQuestion = !!currentStep.question;

  // Check if step requires interaction to proceed
  useEffect(() => {
    if (!hasQuestion) {
      setCanProceed(true);
    } else {
      const result = stepResults.get(currentStep.id);
      setCanProceed(result?.completed || false);
    }
  }, [currentStepIndex, hasQuestion, stepResults, currentStep.id]);

  const handleQuestionAnswer = useCallback(
    (correct: boolean, points: number) => {
      const existingResult = stepResults.get(currentStep.id);
      const attempts = (existingResult?.attempts || 0) + 1;

      setStepResults((prev) => {
        const next = new Map(prev);
        next.set(currentStep.id, {
          completed: true,
          score: correct ? points : 0,
          attempts,
        });
        return next;
      });

      if (correct) {
        setTotalScore((prev) => prev + points);
      }

      setCanProceed(true);
    },
    [currentStep.id, stepResults]
  );

  const goToNextStep = () => {
    if (!canProceed) return;

    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setCanProceed(false);
    } else {
      // Lesson complete
      handleLessonComplete();
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleLessonComplete = () => {
    setIsComplete(true);
    setShowCelebration(true);

    const progressData: LessonProgress = {
      lessonId: lesson.id,
      startedAt: new Date(startTime).toISOString(),
      completedAt: new Date().toISOString(),
      currentStep: lesson.steps.length - 1,
      stepResults: Array.from(stepResults.entries()).map(([stepId, result]) => ({
        stepId,
        ...result,
      })),
      totalScore,
      xpEarned: lesson.xpReward + totalScore,
    };

    setTimeout(() => {
      setShowCelebration(false);
      onComplete?.(progressData);
    }, 3000);
  };

  const getStepTypeIcon = (type: LessonStep['type']) => {
    switch (type) {
      case 'hook':
        return <Sparkles size={16} />;
      case 'concept':
        return <Target size={16} />;
      case 'visual':
        return <Star size={16} />;
      case 'example':
        return <CheckCircle size={16} />;
      case 'practice':
      case 'quiz':
        return <Flame size={16} />;
      case 'summary':
        return <Trophy size={16} />;
      default:
        return null;
    }
  };

  const getStepTypeLabel = (type: LessonStep['type']) => {
    const labels = {
      hook: 'Real World',
      concept: 'Learn',
      visual: 'Explore',
      example: 'Example',
      practice: 'Practice',
      quiz: 'Quiz',
      summary: 'Summary',
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            {/* Exit button */}
            <button
              onClick={onExit}
              className="p-2 -ml-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Lesson title */}
            <h1 className="text-sm font-medium text-white/80 truncate px-4">
              {lesson.title}
            </h1>

            {/* XP indicator */}
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={18} />
              <span className="text-sm font-medium">{totalScore}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-between mt-2 text-xs text-white/50">
            <span className="flex items-center gap-1">
              {getStepTypeIcon(currentStep.type)}
              {getStepTypeLabel(currentStep.type)}
            </span>
            <span>
              {currentStepIndex + 1} / {lesson.steps.length}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Step title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">{currentStep.title}</h2>
          {currentStep.duration && (
            <div className="flex items-center gap-1 mt-2 text-sm text-white/50">
              <Clock size={14} />
              <span>{currentStep.duration} min</span>
            </div>
          )}
        </div>

        {/* Step content blocks */}
        <div className="mb-8">
          <ContentBlocks blocks={currentStep.content} />
        </div>

        {/* Question (if any) */}
        {currentStep.question && (
          <div className="mb-8 p-6 bg-slate-800/50 rounded-2xl border border-white/10">
            <QuestionRenderer
              question={currentStep.question}
              onAnswer={handleQuestionAnswer}
            />
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={goToPrevStep}
            disabled={currentStepIndex === 0}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl font-medium
              transition-all duration-200
              ${currentStepIndex === 0
                ? 'text-white/30 cursor-not-allowed'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {lesson.steps.map((step, idx) => {
              const result = stepResults.get(step.id);
              return (
                <div
                  key={step.id}
                  className={`
                    w-2 h-2 rounded-full transition-all
                    ${idx === currentStepIndex
                      ? 'w-6 bg-cyan-500'
                      : result?.completed
                        ? 'bg-green-500'
                        : idx < currentStepIndex
                          ? 'bg-white/40'
                          : 'bg-white/20'
                    }
                  `}
                />
              );
            })}
          </div>

          {/* Next/Complete button */}
          <button
            onClick={goToNextStep}
            disabled={!canProceed}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium
              transition-all duration-200
              ${canProceed
                ? currentStepIndex === lesson.steps.length - 1
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-white'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
              }
            `}
          >
            {currentStepIndex === lesson.steps.length - 1 ? (
              <>
                Complete
                <Trophy size={20} />
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="text-center animate-scale-in">
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Trophy className="text-white" size={64} />
              </div>
              {/* Confetti effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full animate-confetti"
                    style={{
                      background: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
                      animationDelay: `${i * 0.1}s`,
                      transform: `rotate(${i * 30}deg) translateY(-60px)`,
                    }}
                  />
                ))}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Lesson Complete!</h2>
            <p className="text-white/70 mb-4">{lesson.title}</p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{totalScore}</div>
                <div className="text-xs text-white/50">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">+{lesson.xpReward + totalScore}</div>
                <div className="text-xs text-white/50">Total XP</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
