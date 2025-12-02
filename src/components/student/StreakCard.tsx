'use client';

import { motion } from 'framer-motion';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  streakDays: boolean[];
}

export function StreakCard({ currentStreak, longestStreak, streakDays }: StreakCardProps) {
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/20 p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={currentStreak > 0 ? {
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            {currentStreak > 0 ? '🔥' : '🕯️'}
          </motion.div>
          <div>
            <p className="text-slate-400 text-sm">Current Streak</p>
            <p className={`font-bold text-2xl ${currentStreak > 0 ? 'text-orange-400' : 'text-slate-500'}`}>
              {currentStreak} days
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-xs">Best</p>
          <p className="text-amber-400 font-bold">{longestStreak} days</p>
        </div>
      </div>

      {/* Week view */}
      <div className="flex justify-between gap-1">
        {dayNames.map((day, index) => {
          const isToday = index === today;
          const isActive = streakDays[index];
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className={`flex-1 flex flex-col items-center gap-1`}
            >
              <span className={`text-xs ${isToday ? 'text-white font-bold' : 'text-slate-500'}`}>
                {day}
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                    : isToday
                    ? 'bg-slate-700 border-2 border-dashed border-orange-400/50 text-slate-500'
                    : 'bg-slate-800 text-slate-600'
                }`}
              >
                {isActive ? '✓' : isToday ? '?' : ''}
              </div>
            </motion.div>
          );
        })}
      </div>

      {currentStreak > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-orange-400 text-sm mt-4 font-medium"
        >
          Keep it going! Practice today to extend your streak
        </motion.p>
      )}
    </motion.div>
  );
}

export function StreakCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-2xl border border-white/10 p-5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-800 rounded-full" />
          <div>
            <div className="h-3 w-20 bg-slate-800 rounded mb-2" />
            <div className="h-6 w-16 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-1">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="h-3 w-3 bg-slate-800 rounded" />
            <div className="w-8 h-8 bg-slate-800 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
