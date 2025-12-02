'use client';

import { motion, PanInfo } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface Quiz {
  id: string;
  title: string;
  topic: string;
  difficulty: 'foundational' | 'intermediate' | 'exam_level';
  due_date: string;
  total_marks: number;
  time_limit_minutes: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  score?: number;
}

interface StudentQuizCardProps {
  quiz: Quiz;
  index?: number;
}

const difficultyConfig = {
  foundational: {
    label: 'Beginner',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    stars: 1,
  },
  intermediate: {
    label: 'Intermediate',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    stars: 2,
  },
  exam_level: {
    label: 'Advanced',
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    stars: 3,
  },
};

const statusConfig = {
  not_started: {
    label: 'Start',
    bgColor: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
    icon: '▶',
  },
  in_progress: {
    label: 'Continue',
    bgColor: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-600',
    icon: '⏳',
  },
  completed: {
    label: 'Review',
    bgColor: 'bg-slate-600',
    hoverColor: 'hover:bg-slate-500',
    icon: '✓',
  },
  overdue: {
    label: 'Overdue',
    bgColor: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    icon: '!',
  },
};

export function StudentQuizCard({ quiz, index = 0 }: StudentQuizCardProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const difficulty = difficultyConfig[quiz.difficulty];
  const status = statusConfig[quiz.status];

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days left`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 50) {
      setSwipeOffset(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative overflow-hidden rounded-2xl"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ x: swipeOffset }}
        className="relative bg-slate-800/50 rounded-2xl border border-white/10 overflow-hidden"
      >
        <Link href={`/student/quizzes/${quiz.id}`} className="block p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-lg truncate pr-2">{quiz.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-emerald-400 text-sm font-mono">{quiz.topic}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${difficulty.color}`}>
                  {difficulty.label}
                </span>
              </div>
            </div>

            {/* Difficulty stars */}
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.1 }}
                  className={`text-lg ${i < difficulty.stars ? 'text-amber-400' : 'text-slate-700'}`}
                >
                  ★
                </motion.span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{quiz.time_limit_minutes}min</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{quiz.total_marks} marks</span>
            </div>
            <div className={`flex items-center gap-1 ml-auto font-medium ${
              quiz.status === 'overdue' ? 'text-red-400' : 'text-amber-400'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDueDate(quiz.due_date)}</span>
            </div>
          </div>

          {/* Score bar for completed quizzes */}
          {quiz.status === 'completed' && quiz.score !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Your score</span>
                <span className="text-emerald-400 font-bold">
                  {Math.round((quiz.score / quiz.total_marks) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(quiz.score / quiz.total_marks) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                />
              </div>
            </div>
          )}

          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 ${status.bgColor} ${status.hoverColor} text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2`}
          >
            <span>{status.icon}</span>
            <span>{status.label}</span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function StudentQuizCardSkeleton() {
  return (
    <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-4 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-5 w-3/4 bg-slate-700 rounded mb-2" />
          <div className="flex gap-2">
            <div className="h-4 w-12 bg-slate-700 rounded" />
            <div className="h-4 w-16 bg-slate-700 rounded" />
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-slate-700 rounded" />
          <div className="w-4 h-4 bg-slate-700 rounded" />
          <div className="w-4 h-4 bg-slate-700 rounded" />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="h-4 w-16 bg-slate-700 rounded" />
        <div className="h-4 w-16 bg-slate-700 rounded" />
        <div className="h-4 w-20 bg-slate-700 rounded ml-auto" />
      </div>
      <div className="h-12 bg-slate-700 rounded-xl" />
    </div>
  );
}
