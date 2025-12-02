'use client';

import { motion } from 'framer-motion';

interface XPProgressCardProps {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
}

export function XPProgressCard({ level, currentXP, xpToNextLevel, totalXP }: XPProgressCardProps) {
  const progress = (currentXP / xpToNextLevel) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-2xl border border-emerald-500/20 p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30"
          >
            <span className="text-2xl font-bold text-white">{level}</span>
          </motion.div>
          <div>
            <p className="text-slate-400 text-sm">Level</p>
            <p className="text-white font-bold text-lg">Math Explorer</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-emerald-400 font-bold text-xl">{totalXP.toLocaleString()}</p>
          <p className="text-slate-500 text-xs">Total XP</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full relative"
          >
            <motion.div
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-emerald-400 font-medium">{currentXP} XP</span>
          <span className="text-slate-500">{xpToNextLevel} XP to level {level + 1}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function XPProgressCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-blue-500/5 rounded-2xl border border-white/10 p-5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-slate-800 rounded-xl" />
          <div>
            <div className="h-3 w-12 bg-slate-800 rounded mb-2" />
            <div className="h-5 w-24 bg-slate-800 rounded" />
          </div>
        </div>
        <div className="text-right">
          <div className="h-6 w-16 bg-slate-800 rounded mb-1" />
          <div className="h-3 w-12 bg-slate-800 rounded" />
        </div>
      </div>
      <div className="h-4 bg-slate-800 rounded-full" />
    </div>
  );
}
