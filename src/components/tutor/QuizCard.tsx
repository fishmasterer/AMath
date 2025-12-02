'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { TOPIC_NAMES } from '@/lib/types';

interface Quiz {
  id: string;
  title: string;
  topic: string;
  week: number;
  difficulty: string;
  time_limit_minutes: number;
  published: boolean;
  created_at: string;
  total_marks?: number;
}

interface QuizCardProps {
  quiz: Quiz;
  onView: (id: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
}

const difficultyConfig = {
  foundational: {
    label: 'Foundation',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
  },
  exam_level: {
    label: 'Exam Level',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
  },
};

export function QuizCard({ quiz, onView, onTogglePublish, onDelete }: QuizCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const difficulty = difficultyConfig[quiz.difficulty as keyof typeof difficultyConfig] || difficultyConfig.foundational;
  const topicName = TOPIC_NAMES[quiz.topic as keyof typeof TOPIC_NAMES] || quiz.topic;

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -100) {
      setShowActions(true);
      setSwipeOffset(-120);
    } else {
      setShowActions(false);
      setSwipeOffset(0);
    }
  };

  const handleDrag = (_: any, info: PanInfo) => {
    if (info.offset.x < 0) {
      setSwipeOffset(Math.max(info.offset.x, -120));
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Swipe action buttons (revealed on swipe) */}
      <div className="absolute right-0 top-0 bottom-0 flex items-stretch">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: showActions ? 1 : 0 }}
          onClick={() => {
            onTogglePublish(quiz.id, quiz.published);
            setShowActions(false);
            setSwipeOffset(0);
          }}
          className={`w-16 flex items-center justify-center ${
            quiz.published ? 'bg-orange-500' : 'bg-green-500'
          }`}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {quiz.published ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            )}
          </svg>
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: showActions ? 1 : 0 }}
          onClick={() => onDelete(quiz.id)}
          className="w-16 flex items-center justify-center bg-red-500"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </motion.button>
      </div>

      {/* Main card content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ x: swipeOffset }}
        onClick={() => {
          if (!showActions) onView(quiz.id);
          else {
            setShowActions(false);
            setSwipeOffset(0);
          }
        }}
        className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 cursor-pointer active:bg-slate-800 transition-colors touch-pan-y"
      >
        <div className="flex items-start gap-4">
          {/* Status indicator */}
          <div className={`w-2 h-full min-h-[60px] rounded-full ${quiz.published ? 'bg-green-500' : 'bg-orange-500'}`} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-white font-semibold truncate text-base">{quiz.title}</h3>
              <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${difficulty.bg} ${difficulty.color} ${difficulty.border} border`}>
                {difficulty.label}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="text-cyan-400 font-medium">{quiz.topic}</span>
              <span className="text-slate-500">{topicName}</span>
            </div>

            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {quiz.time_limit_minutes}m
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Week {quiz.week}
              </span>
              {quiz.total_marks && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {quiz.total_marks} marks
                </span>
              )}
            </div>
          </div>

          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(quiz.id);
              }}
              className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePublish(quiz.id, quiz.published);
              }}
              className={`p-2 rounded-lg transition-colors ${
                quiz.published
                  ? 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400'
                  : 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
              }`}
            >
              {quiz.published ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(quiz.id);
              }}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile swipe hint */}
        <div className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 opacity-30">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

// Skeleton for loading state
export function QuizCardSkeleton() {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-2 h-16 bg-slate-700 rounded-full" />
        <div className="flex-1 space-y-3">
          <div className="flex justify-between">
            <div className="h-5 w-48 bg-slate-700 rounded" />
            <div className="h-5 w-20 bg-slate-700 rounded-full" />
          </div>
          <div className="h-4 w-32 bg-slate-700 rounded" />
          <div className="flex gap-4">
            <div className="h-4 w-16 bg-slate-700 rounded" />
            <div className="h-4 w-16 bg-slate-700 rounded" />
            <div className="h-4 w-16 bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
