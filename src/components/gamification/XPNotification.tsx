'use client';

import { useEffect, useState } from 'react';
import { XPBreakdown, CelebrationLevel } from '@/lib/gamification/types';
import { getCelebrationLevel } from '@/lib/gamification/constants';

interface XPNotificationProps {
  xpAmount: number;
  breakdown?: XPBreakdown;
  onDismiss: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export function XPNotification({
  xpAmount,
  breakdown,
  onDismiss,
  autoHide = true,
  autoHideDelay = 3000,
}: XPNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const celebrationLevel = getCelebrationLevel(xpAmount);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onDismiss, 300);
      }, autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay, onDismiss]);

  const sizeClasses: Record<CelebrationLevel, string> = {
    small: 'text-sm py-2 px-4',
    medium: 'text-base py-3 px-5',
    large: 'text-lg py-4 px-6',
    epic: 'text-xl py-5 px-8',
  };

  const colorClasses: Record<CelebrationLevel, string> = {
    small: 'bg-cyan-500/90',
    medium: 'bg-blue-500/90',
    large: 'bg-purple-500/90',
    epic: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500',
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50
        ${sizeClasses[celebrationLevel]}
        ${colorClasses[celebrationLevel]}
        rounded-xl shadow-2xl
        flex items-center gap-3
        text-white font-bold
        transform transition-all duration-300
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
        animate-slide-in-right
      `}
    >
      {/* XP Icon */}
      <span className={celebrationLevel === 'epic' ? 'animate-bounce' : ''}>
        {celebrationLevel === 'epic' ? '⭐' : celebrationLevel === 'large' ? '✨' : '💫'}
      </span>

      {/* XP Amount */}
      <span>+{xpAmount} XP</span>

      {/* Breakdown tooltip on hover (for larger celebrations) */}
      {breakdown && celebrationLevel !== 'small' && (
        <div className="text-xs text-white/80 ml-2">
          {breakdown.perfectBonus > 0 && (
            <span className="mr-2">🎯 Perfect!</span>
          )}
          {breakdown.streakBonus > 0 && (
            <span className="mr-2">🔥 Streak!</span>
          )}
          {breakdown.firstOfDayBonus > 0 && (
            <span>🌅 First today!</span>
          )}
        </div>
      )}

      {/* Dismiss button */}
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(onDismiss, 300);
        }}
        className="ml-2 text-white/70 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}

// Floating XP animation (shows number floating up)
interface FloatingXPProps {
  amount: number;
  x: number;
  y: number;
  onComplete: () => void;
}

export function FloatingXP({ amount, x, y, onComplete }: FloatingXPProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed pointer-events-none z-50 font-bold text-xl text-yellow-400 animate-float-up"
      style={{ left: x, top: y }}
    >
      +{amount} XP
    </div>
  );
}

// XP breakdown detailed view
interface XPBreakdownDisplayProps {
  breakdown: XPBreakdown;
}

export function XPBreakdownDisplay({ breakdown }: XPBreakdownDisplayProps) {
  const items = [
    { label: 'Base XP', value: breakdown.base, icon: '📝' },
    { label: 'Difficulty Bonus', value: breakdown.difficultyBonus, icon: '📈', show: breakdown.difficultyBonus > 0 },
    { label: 'Streak Bonus', value: breakdown.streakBonus, icon: '🔥', show: breakdown.streakBonus > 0 },
    { label: 'Perfect/Speed Bonus', value: breakdown.perfectBonus, icon: '⭐', show: breakdown.perfectBonus > 0 },
    { label: 'First of Day', value: breakdown.firstOfDayBonus, icon: '🌅', show: breakdown.firstOfDayBonus > 0 },
  ].filter(item => item.show !== false);

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h4 className="text-sm font-medium text-white mb-3">XP Breakdown</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <span className="text-cyan-400 font-medium">+{item.value}</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-white">Total</span>
            <span className="font-bold text-lg text-yellow-400">+{breakdown.total} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Toast container for multiple notifications
interface NotificationContainerProps {
  children: React.ReactNode;
}

export function NotificationContainer({ children }: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {children}
    </div>
  );
}

// Combined result notification (XP + achievements + level up)
interface QuizResultNotificationProps {
  xpEarned: number;
  breakdown: XPBreakdown;
  leveledUp: boolean;
  newLevel?: number;
  achievementsUnlocked?: string[];
  dailyGoalMet?: boolean;
  onDismiss: () => void;
}

export function QuizResultNotification({
  xpEarned,
  breakdown,
  leveledUp,
  newLevel,
  achievementsUnlocked = [],
  dailyGoalMet,
  onDismiss,
}: QuizResultNotificationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-xl font-bold text-white">Quiz Complete!</h2>
        </div>

        {/* XP Earned */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              +{xpEarned} XP
            </div>
            <XPBreakdownDisplay breakdown={breakdown} />
          </div>
        </div>

        {/* Level Up */}
        {leveledUp && newLevel && (
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 mb-4 text-center">
            <div className="text-2xl mb-1">⬆️</div>
            <div className="text-purple-300 font-medium">Level Up!</div>
            <div className="text-2xl font-bold text-white">Level {newLevel}</div>
          </div>
        )}

        {/* Achievements */}
        {achievementsUnlocked.length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
            <div className="text-sm text-yellow-400 mb-2">
              🏆 {achievementsUnlocked.length} Achievement{achievementsUnlocked.length > 1 && 's'} Unlocked!
            </div>
            <div className="text-white/70 text-sm">
              {achievementsUnlocked.join(', ')}
            </div>
          </div>
        )}

        {/* Daily Goal */}
        {dailyGoalMet && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 mb-4 text-center">
            <span className="text-green-400">✓ Daily Goal Complete!</span>
          </div>
        )}

        {/* Dismiss */}
        <button
          onClick={onDismiss}
          className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
