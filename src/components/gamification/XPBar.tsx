'use client';

import { LevelInfo } from '@/lib/gamification/types';
import { RANK_CONFIG } from '@/lib/gamification/constants';

interface XPBarProps {
  level: LevelInfo;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function XPBar({ level, showDetails = true, size = 'md', animated = true }: XPBarProps) {
  const rankConfig = RANK_CONFIG[level.rank];

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="w-full">
      {showDetails && (
        <div className={`flex justify-between items-center mb-1 ${textSizes[size]}`}>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${rankConfig.color}`}>
              Level {level.level}
            </span>
            <span className="text-white/60">{level.title}</span>
          </div>
          <div className="text-white/80">
            <span className="font-semibold">{level.currentXP.toLocaleString()}</span>
            <span className="text-white/50">
              {' '}/ {(level.xpForNextLevel - level.xpForCurrentLevel).toLocaleString()} XP
            </span>
          </div>
        </div>
      )}

      {/* Progress bar container */}
      <div className={`w-full ${sizeClasses[size]} bg-white/10 rounded-full overflow-hidden`}>
        {/* Progress fill */}
        <div
          className={`h-full rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{
            width: `${level.progressToNextLevel}%`,
            background: `linear-gradient(90deg, ${getGradientColors(level.rank)})`,
          }}
        >
          {/* Shimmer effect */}
          {animated && level.progressToNextLevel > 0 && (
            <div className="h-full w-full relative overflow-hidden">
              <div
                className="absolute inset-0 animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  backgroundSize: '200% 100%',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <div className={`flex justify-between mt-1 ${textSizes[size]} text-white/50`}>
          <span>{level.progressToNextLevel}% to next level</span>
          <span>{level.totalXP.toLocaleString()} total XP</span>
        </div>
      )}
    </div>
  );
}

// Compact version for headers
export function XPBarCompact({ level }: { level: LevelInfo }) {
  const rankConfig = RANK_CONFIG[level.rank];

  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${rankConfig.bgColor} ${rankConfig.borderColor} border`}>
        <span className="text-lg">{rankConfig.icon}</span>
        <span className={`font-bold text-sm ${rankConfig.color}`}>{level.level}</span>
      </div>

      <div className="flex-1 max-w-[120px]">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${level.progressToNextLevel}%`,
              background: `linear-gradient(90deg, ${getGradientColors(level.rank)})`,
            }}
          />
        </div>
      </div>

      <span className="text-xs text-white/60 font-medium">
        {level.totalXP.toLocaleString()} XP
      </span>
    </div>
  );
}

function getGradientColors(rank: string): string {
  switch (rank) {
    case 'bronze':
      return '#CD7F32, #B87333';
    case 'silver':
      return '#C0C0C0, #A8A8A8';
    case 'gold':
      return '#FFD700, #FFA500';
    case 'platinum':
      return '#00CED1, #20B2AA';
    case 'diamond':
      return '#00BFFF, #1E90FF';
    case 'master':
      return '#9400D3, #FF1493';
    default:
      return '#60A5FA, #3B82F6';
  }
}
