'use client';

import { motion } from 'framer-motion';

interface DailyGoalCardProps {
  completed: number;
  target: number;
  xpEarned: number;
}

export function DailyGoalCard({ completed, target, xpEarned }: DailyGoalCardProps) {
  const progress = Math.min((completed / target) * 100, 100);
  const isComplete = completed >= target;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`rounded-2xl border p-5 ${
        isComplete
          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30'
          : 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Circular progress */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-800"
            />
            <motion.circle
              cx="48"
              cy="48"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ strokeDasharray: circumference }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isComplete ? '#10b981' : '#a855f7'} />
                <stop offset="100%" stopColor={isComplete ? '#34d399' : '#ec4899'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isComplete ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-3xl"
              >
                ✅
              </motion.span>
            ) : (
              <>
                <span className="text-white font-bold text-xl">{completed}</span>
                <span className="text-slate-500 text-xs">/ {target}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1">
            {isComplete ? 'Goal Complete!' : 'Daily Goal'}
          </h3>
          <p className="text-slate-400 text-sm mb-2">
            {isComplete
              ? 'Great job! You hit your daily target.'
              : `Complete ${target - completed} more ${target - completed === 1 ? 'quiz' : 'quizzes'}`}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className={`font-bold ${isComplete ? 'text-green-400' : 'text-purple-400'}`}>
              +{xpEarned} XP today
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function DailyGoalCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl border border-white/10 p-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-slate-800 rounded-full" />
        <div className="flex-1">
          <div className="h-5 w-24 bg-slate-800 rounded mb-2" />
          <div className="h-4 w-32 bg-slate-800 rounded mb-2" />
          <div className="h-6 w-20 bg-slate-800 rounded" />
        </div>
      </div>
    </div>
  );
}
