'use client';

import { LevelInfo, Rank } from '@/lib/gamification/types';
import { RANK_CONFIG, LEVEL_THRESHOLDS } from '@/lib/gamification/constants';

interface LevelBadgeProps {
  level: LevelInfo;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTitle?: boolean;
  showRank?: boolean;
}

export function LevelBadge({ level, size = 'md', showTitle = true, showRank = true }: LevelBadgeProps) {
  const rankConfig = RANK_CONFIG[level.rank];

  const sizes = {
    sm: { badge: 'w-8 h-8', text: 'text-sm', title: 'text-xs', icon: 'text-base' },
    md: { badge: 'w-12 h-12', text: 'text-xl', title: 'text-sm', icon: 'text-xl' },
    lg: { badge: 'w-16 h-16', text: 'text-2xl', title: 'text-base', icon: 'text-2xl' },
    xl: { badge: 'w-24 h-24', text: 'text-4xl', title: 'text-lg', icon: 'text-4xl' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Level badge */}
      <div
        className={`
          ${s.badge}
          rounded-xl
          ${rankConfig.bgColor}
          border-2 ${rankConfig.borderColor}
          flex items-center justify-center
          shadow-lg
          relative
        `}
      >
        {/* Level number */}
        <span className={`${s.text} font-bold ${rankConfig.color}`}>
          {level.level}
        </span>

        {/* Rank icon in corner */}
        {showRank && (
          <span className="absolute -top-1 -right-1 text-sm">
            {rankConfig.icon}
          </span>
        )}
      </div>

      {/* Title */}
      {showTitle && (
        <div>
          <div className={`${s.title} font-medium ${rankConfig.color}`}>
            {level.title}
          </div>
          <div className="text-xs text-white/50">
            {rankConfig.name} Rank
          </div>
        </div>
      )}
    </div>
  );
}

// Rank badge only (without level number)
interface RankBadgeProps {
  rank: Rank;
  size?: 'sm' | 'md' | 'lg';
}

export function RankBadge({ rank, size = 'md' }: RankBadgeProps) {
  const config = RANK_CONFIG[rank];

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        ${sizes[size]}
        rounded-full
        ${config.bgColor}
        border ${config.borderColor}
        ${config.color}
        font-medium
      `}
    >
      <span>{config.icon}</span>
      <span>{config.name}</span>
    </span>
  );
}

// Level progress display with all ranks
interface LevelProgressDisplayProps {
  currentLevel: number;
  currentRank: Rank;
}

export function LevelProgressDisplay({ currentLevel, currentRank }: LevelProgressDisplayProps) {
  const ranks: Rank[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master'];

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h4 className="text-sm font-medium text-white mb-4">Level Progress</h4>

      <div className="flex items-center gap-2">
        {ranks.map((rank, index) => {
          const config = RANK_CONFIG[rank];
          const isCurrentRank = rank === currentRank;
          const isPastRank = ranks.indexOf(currentRank) > index;
          const isFutureRank = ranks.indexOf(currentRank) < index;

          return (
            <div key={rank} className="flex-1">
              {/* Rank badge */}
              <div
                className={`
                  h-10 rounded-lg flex items-center justify-center
                  transition-all duration-300
                  ${isCurrentRank
                    ? `${config.bgColor} border-2 ${config.borderColor} shadow-lg`
                    : isPastRank
                      ? 'bg-white/10'
                      : 'bg-white/5'
                  }
                `}
              >
                <span className={`text-xl ${isFutureRank ? 'opacity-30 grayscale' : ''}`}>
                  {config.icon}
                </span>
              </div>

              {/* Rank name */}
              <div
                className={`
                  text-[10px] text-center mt-1
                  ${isCurrentRank ? config.color : 'text-white/50'}
                `}
              >
                {config.name}
              </div>

              {/* Level range */}
              <div className="text-[9px] text-center text-white/30">
                {config.minLevel}-{config.maxLevel}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current level indicator */}
      <div className="mt-4 text-center">
        <span className="text-white/60 text-sm">Currently at </span>
        <span className={`font-bold ${RANK_CONFIG[currentRank].color}`}>
          Level {currentLevel}
        </span>
      </div>
    </div>
  );
}

// Level up celebration
interface LevelUpCelebrationProps {
  oldLevel: number;
  newLevel: number;
  newRank?: Rank;
  newTitle: string;
  onDismiss: () => void;
}

export function LevelUpCelebration({
  oldLevel,
  newLevel,
  newRank,
  newTitle,
  onDismiss,
}: LevelUpCelebrationProps) {
  const rankConfig = newRank ? RANK_CONFIG[newRank] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-md w-full mx-4">
        {/* Confetti effect placeholder */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated particles would go here */}
        </div>

        {/* Card */}
        <div
          className={`
            p-8 rounded-2xl text-center
            bg-gradient-to-b from-white/10 to-white/5
            border border-white/20
            shadow-2xl
            transform animate-scale-in
          `}
        >
          {/* Celebration header */}
          <div className="text-sm text-yellow-400 uppercase tracking-wider mb-2 animate-pulse">
            Level Up!
          </div>

          {/* Level transition */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-4xl text-white/50">{oldLevel}</div>
            <div className="text-2xl text-white/30">→</div>
            <div
              className={`
                w-20 h-20 rounded-2xl
                ${rankConfig?.bgColor || 'bg-cyan-500/20'}
                border-2 ${rankConfig?.borderColor || 'border-cyan-500/50'}
                flex items-center justify-center
                animate-bounce-slow
              `}
            >
              <span className="text-4xl font-bold text-white">{newLevel}</span>
            </div>
          </div>

          {/* New title */}
          <h2 className="text-2xl font-bold text-white mb-2">{newTitle}</h2>

          {/* New rank (if changed) */}
          {newRank && (
            <div className="mb-4">
              <span className="text-white/60">New Rank: </span>
              <RankBadge rank={newRank} size="md" />
            </div>
          )}

          {/* Motivational message */}
          <p className="text-white/60 mb-6">
            {newLevel <= 5
              ? "You're just getting started! Keep it up!"
              : newLevel <= 10
                ? "Great progress! You're becoming a math pro!"
                : newLevel <= 20
                  ? "Amazing dedication! You're mastering A-Math!"
                  : "Incredible! You're among the elite!"}
          </p>

          {/* Dismiss button */}
          <button
            onClick={onDismiss}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl text-white font-medium transition-all"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}
