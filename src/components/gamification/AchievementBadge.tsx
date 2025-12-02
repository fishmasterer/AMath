'use client';

import { Achievement, AchievementProgress, StudentAchievement } from '@/lib/gamification/types';
import { BADGE_COLORS } from '@/lib/gamification/constants';

interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked?: boolean;
  progress?: number;
  target?: number;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  onClick?: () => void;
}

export function AchievementBadge({
  achievement,
  isUnlocked = false,
  progress = 0,
  target = 1,
  size = 'md',
  showProgress = true,
  onClick,
}: AchievementBadgeProps) {
  const colors = BADGE_COLORS[achievement.badge_color] || BADGE_COLORS.blue;
  const percentage = Math.min(100, Math.round((progress / target) * 100));

  const sizes = {
    sm: { container: 'w-16 p-2', icon: 'text-2xl', name: 'text-xs' },
    md: { container: 'w-24 p-3', icon: 'text-4xl', name: 'text-sm' },
    lg: { container: 'w-32 p-4', icon: 'text-5xl', name: 'text-base' },
  };

  const s = sizes[size];

  return (
    <div
      className={`
        ${s.container}
        rounded-xl border transition-all duration-300
        ${isUnlocked
          ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
          : 'bg-white/5 border-white/10 opacity-60'
        }
        ${onClick ? 'cursor-pointer hover:scale-105' : ''}
        ${achievement.is_hidden && !isUnlocked ? 'opacity-40' : ''}
        flex flex-col items-center text-center
      `}
      onClick={onClick}
    >
      {/* Icon */}
      <div className={`${s.icon} ${isUnlocked ? '' : 'grayscale'} mb-1`}>
        {achievement.is_hidden && !isUnlocked ? '❓' : achievement.icon}
      </div>

      {/* Name */}
      <div className={`${s.name} font-medium ${isUnlocked ? colors.text : 'text-white/50'} line-clamp-2`}>
        {achievement.is_hidden && !isUnlocked ? '???' : achievement.name}
      </div>

      {/* Progress bar (for locked achievements) */}
      {showProgress && !isUnlocked && !achievement.is_hidden && (
        <div className="w-full mt-2">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${colors.bg.replace('/20', '')} rounded-full transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-[10px] text-white/50 mt-0.5">
            {progress}/{target}
          </div>
        </div>
      )}

      {/* XP reward */}
      {isUnlocked && achievement.xp_reward > 0 && (
        <div className="text-[10px] text-yellow-400 mt-1">
          +{achievement.xp_reward} XP
        </div>
      )}
    </div>
  );
}

// Detailed achievement card with description
interface AchievementCardProps {
  achievementProgress: AchievementProgress;
  onClick?: () => void;
}

export function AchievementCard({ achievementProgress, onClick }: AchievementCardProps) {
  const { achievement, isUnlocked, progress, target, percentage, unlockedAt } = achievementProgress;
  const colors = BADGE_COLORS[achievement.badge_color] || BADGE_COLORS.blue;

  return (
    <div
      className={`
        p-4 rounded-xl border transition-all duration-300
        ${isUnlocked
          ? `${colors.bg} ${colors.border}`
          : 'bg-white/5 border-white/10'
        }
        ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`text-4xl ${isUnlocked ? '' : 'grayscale opacity-60'}`}>
          {achievement.is_hidden && !isUnlocked ? '❓' : achievement.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={`font-semibold ${isUnlocked ? colors.text : 'text-white/70'}`}>
              {achievement.is_hidden && !isUnlocked ? '???' : achievement.name}
            </h4>
            {isUnlocked && (
              <span className="text-green-400 text-sm">✓</span>
            )}
          </div>

          <p className="text-sm text-white/60 mt-0.5">
            {achievement.is_hidden && !isUnlocked
              ? 'Keep playing to unlock this mystery achievement!'
              : achievement.description
            }
          </p>

          {/* Progress or unlock date */}
          <div className="mt-2">
            {isUnlocked ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">
                  Unlocked {unlockedAt ? new Date(unlockedAt).toLocaleDateString() : 'recently'}
                </span>
                {achievement.xp_reward > 0 && (
                  <span className="text-xs text-yellow-400">+{achievement.xp_reward} XP</span>
                )}
              </div>
            ) : !achievement.is_hidden && (
              <div>
                <div className="flex justify-between text-xs text-white/50 mb-1">
                  <span>Progress</span>
                  <span>{progress}/{target}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid of achievements
interface AchievementGridProps {
  achievements: AchievementProgress[];
  showLocked?: boolean;
  columns?: 4 | 5 | 6;
}

export function AchievementGrid({ achievements, showLocked = true, columns = 5 }: AchievementGridProps) {
  const filtered = showLocked ? achievements : achievements.filter((a) => a.isUnlocked);

  const gridCols = {
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3`}>
      {filtered.map((ap) => (
        <AchievementBadge
          key={ap.achievement.id}
          achievement={ap.achievement}
          isUnlocked={ap.isUnlocked}
          progress={ap.progress}
          target={ap.target}
          size="md"
        />
      ))}
    </div>
  );
}

// Recently unlocked achievements showcase
interface RecentAchievementsProps {
  achievements: StudentAchievement[];
  limit?: number;
}

export function RecentAchievements({ achievements, limit = 3 }: RecentAchievementsProps) {
  const recent = achievements.slice(0, limit);

  if (recent.length === 0) {
    return (
      <div className="text-center py-4 text-white/50 text-sm">
        No achievements unlocked yet. Keep learning!
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {recent.map((sa) => {
        const achievement = sa.achievement as Achievement;
        if (!achievement) return null;

        const colors = BADGE_COLORS[achievement.badge_color] || BADGE_COLORS.blue;

        return (
          <div
            key={sa.id}
            className={`
              flex-1 p-3 rounded-xl border
              ${colors.bg} ${colors.border}
              flex items-center gap-3
            `}
          >
            <span className="text-2xl">{achievement.icon}</span>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${colors.text} truncate`}>
                {achievement.name}
              </div>
              <div className="text-xs text-white/50">
                {new Date(sa.unlocked_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Celebration popup when achievement is unlocked
interface AchievementUnlockedProps {
  achievement: Achievement;
  onDismiss: () => void;
}

export function AchievementUnlocked({ achievement, onDismiss }: AchievementUnlockedProps) {
  const colors = BADGE_COLORS[achievement.badge_color] || BADGE_COLORS.blue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`
          ${colors.bg} ${colors.border} border-2
          p-8 rounded-2xl shadow-2xl ${colors.glow} shadow-xl
          transform animate-scale-in
          max-w-sm w-full mx-4 text-center
        `}
      >
        {/* Icon with glow */}
        <div className="text-7xl mb-4 animate-bounce-slow">
          {achievement.icon}
        </div>

        {/* Title */}
        <div className="text-sm text-white/60 uppercase tracking-wider mb-1">
          Achievement Unlocked!
        </div>
        <h2 className={`text-2xl font-bold ${colors.text} mb-2`}>
          {achievement.name}
        </h2>
        <p className="text-white/70 mb-4">
          {achievement.description}
        </p>

        {/* XP reward */}
        {achievement.xp_reward > 0 && (
          <div className="inline-block px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-400 font-bold mb-4">
            +{achievement.xp_reward} XP
          </div>
        )}

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="block w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
