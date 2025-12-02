'use client';

import { StreakInfo } from '@/lib/gamification/types';

interface StreakCounterProps {
  streak: StreakInfo;
  size?: 'sm' | 'md' | 'lg';
  showFreezes?: boolean;
}

export function StreakCounter({ streak, size = 'md', showFreezes = true }: StreakCounterProps) {
  const isActive = streak.currentStreak > 0;

  const sizeClasses = {
    sm: { container: 'p-2', icon: 'text-xl', text: 'text-sm' },
    md: { container: 'p-3', icon: 'text-3xl', text: 'text-base' },
    lg: { container: 'p-4', icon: 'text-5xl', text: 'text-lg' },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={`
        ${classes.container}
        rounded-xl border
        ${isActive
          ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30'
          : 'bg-white/5 border-white/10'
        }
        flex flex-col items-center gap-1
      `}
    >
      {/* Fire icon with animation */}
      <div className={`${classes.icon} ${isActive ? 'animate-fire' : 'opacity-40'}`}>
        {isActive ? '🔥' : '🕯️'}
      </div>

      {/* Streak count */}
      <div className={`${classes.text} font-bold text-center`}>
        <span className={isActive ? 'text-orange-400' : 'text-white/50'}>
          {streak.currentStreak}
        </span>
        <span className="text-white/50 text-sm ml-1">
          {streak.currentStreak === 1 ? 'day' : 'days'}
        </span>
      </div>

      {/* Status message */}
      <div className="text-xs text-center">
        {streak.isActiveToday ? (
          <span className="text-green-400">Active today!</span>
        ) : streak.willLoseStreakTomorrow && streak.currentStreak > 0 ? (
          <span className="text-yellow-400">Study today to keep streak!</span>
        ) : (
          <span className="text-white/40">Start your streak!</span>
        )}
      </div>

      {/* Streak freezes */}
      {showFreezes && streak.streakFreezeCount > 0 && (
        <div className="flex items-center gap-1 mt-1">
          <span className="text-sm">❄️</span>
          <span className="text-xs text-cyan-400">
            {streak.streakFreezeCount} freeze{streak.streakFreezeCount !== 1 && 's'}
          </span>
        </div>
      )}
    </div>
  );
}

// Compact inline version
export function StreakCounterInline({ streak }: { streak: StreakInfo }) {
  const isActive = streak.currentStreak > 0;

  return (
    <div className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
      ${isActive
        ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
        : 'bg-white/5 border border-white/10'
      }
    `}>
      <span className={`text-base ${isActive ? 'animate-pulse' : 'opacity-40'}`}>
        {isActive ? '🔥' : '🕯️'}
      </span>
      <span className={`font-bold text-sm ${isActive ? 'text-orange-400' : 'text-white/50'}`}>
        {streak.currentStreak}
      </span>
    </div>
  );
}

// Large display for dashboard
export function StreakDisplay({ streak }: { streak: StreakInfo }) {
  const milestones = [3, 7, 14, 30, 60, 100];
  const nextMilestone = milestones.find((m) => m > streak.currentStreak) || 100;
  const progressToMilestone = (streak.currentStreak / nextMilestone) * 100;

  return (
    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Streak</h3>
        {streak.streakFreezeCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-cyan-400">
            <span>❄️</span>
            <span>{streak.streakFreezeCount} freeze{streak.streakFreezeCount !== 1 && 's'}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Main streak display */}
        <div className="flex flex-col items-center">
          <div className={`text-5xl ${streak.currentStreak > 0 ? 'animate-bounce-slow' : ''}`}>
            {streak.currentStreak > 0 ? '🔥' : '🕯️'}
          </div>
          <div className="mt-2 text-center">
            <span className="text-4xl font-bold text-orange-400">{streak.currentStreak}</span>
            <span className="text-white/60 ml-2">days</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-3">
          {/* Progress to next milestone */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/60">Next milestone</span>
              <span className="text-orange-400">{nextMilestone} days</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                style={{ width: `${progressToMilestone}%` }}
              />
            </div>
          </div>

          {/* Longest streak */}
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Longest streak</span>
            <span className="text-white font-medium">
              {streak.longestStreak} days
              {streak.currentStreak === streak.longestStreak && streak.longestStreak > 0 && (
                <span className="ml-1 text-yellow-400">👑</span>
              )}
            </span>
          </div>

          {/* Status */}
          <div className="text-sm">
            {streak.isActiveToday ? (
              <div className="flex items-center gap-2 text-green-400">
                <span>✓</span>
                <span>You've studied today!</span>
              </div>
            ) : streak.willLoseStreakTomorrow && streak.currentStreak > 0 ? (
              <div className="flex items-center gap-2 text-yellow-400">
                <span>⚠️</span>
                <span>Study now to keep your streak!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-white/50">
                <span>→</span>
                <span>Start studying to begin your streak</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
