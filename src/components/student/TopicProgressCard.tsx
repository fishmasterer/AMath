'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface TopicProgress {
  code: string;
  name: string;
  progress: number;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
}

interface TopicProgressCardProps {
  topic: TopicProgress;
  index?: number;
}

const topicColors: Record<string, { bg: string; bar: string; text: string }> = {
  A1: { bg: 'from-blue-500/20', bar: 'from-blue-400 to-blue-600', text: 'text-blue-400' },
  A2: { bg: 'from-purple-500/20', bar: 'from-purple-400 to-purple-600', text: 'text-purple-400' },
  A3: { bg: 'from-pink-500/20', bar: 'from-pink-400 to-pink-600', text: 'text-pink-400' },
  A4: { bg: 'from-cyan-500/20', bar: 'from-cyan-400 to-cyan-600', text: 'text-cyan-400' },
  A5: { bg: 'from-teal-500/20', bar: 'from-teal-400 to-teal-600', text: 'text-teal-400' },
  A6: { bg: 'from-indigo-500/20', bar: 'from-indigo-400 to-indigo-600', text: 'text-indigo-400' },
  G1: { bg: 'from-green-500/20', bar: 'from-green-400 to-green-600', text: 'text-green-400' },
  G2: { bg: 'from-emerald-500/20', bar: 'from-emerald-400 to-emerald-600', text: 'text-emerald-400' },
  G3: { bg: 'from-lime-500/20', bar: 'from-lime-400 to-lime-600', text: 'text-lime-400' },
  C1: { bg: 'from-orange-500/20', bar: 'from-orange-400 to-orange-600', text: 'text-orange-400' },
};

export function TopicProgressCard({ topic, index = 0 }: TopicProgressCardProps) {
  const colors = topicColors[topic.code] || topicColors.A1;
  const isMastered = topic.progress >= 80;

  return (
    <Link href={`/student/notes?topic=${topic.code}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`relative bg-gradient-to-r ${colors.bg} to-transparent rounded-xl border border-white/10 p-4 cursor-pointer overflow-hidden`}
      >
        {/* Mastery badge */}
        {isMastered && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-2 right-2"
          >
            <span className="text-xl">🏆</span>
          </motion.div>
        )}

        <div className="flex items-center gap-4">
          {/* Topic code */}
          <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${colors.text} font-bold text-lg`}>
            {topic.code}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium truncate">{topic.name}</h4>
            <p className="text-slate-500 text-sm">
              {topic.completedQuizzes}/{topic.totalQuizzes} quizzes
              {topic.averageScore > 0 && ` • ${Math.round(topic.averageScore)}% avg`}
            </p>
          </div>

          {/* Progress */}
          <div className="flex flex-col items-end gap-1">
            <span className={`font-bold ${colors.text}`}>{topic.progress}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${topic.progress}%` }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${colors.bar} rounded-full`}
          />
        </div>
      </motion.div>
    </Link>
  );
}

export function TopicProgressCardSkeleton() {
  return (
    <div className="bg-slate-800/30 rounded-xl border border-white/10 p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-700 rounded-xl" />
        <div className="flex-1">
          <div className="h-4 w-32 bg-slate-700 rounded mb-1" />
          <div className="h-3 w-24 bg-slate-700 rounded" />
        </div>
        <div className="h-5 w-10 bg-slate-700 rounded" />
      </div>
      <div className="mt-3 h-2 bg-slate-700 rounded-full" />
    </div>
  );
}
