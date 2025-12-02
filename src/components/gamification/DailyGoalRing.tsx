'use client';

import { DailyGoal } from '@/lib/gamification/types';
import { DAILY_GOAL_CONFIG } from '@/lib/gamification/constants';

interface DailyGoalRingProps {
  dailyGoal: DailyGoal;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export function DailyGoalRing({ dailyGoal, size = 'md', showDetails = true }: DailyGoalRingProps) {
  const sizes = {
    sm: { ring: 80, stroke: 6, text: 'text-lg', label: 'text-xs' },
    md: { ring: 120, stroke: 8, text: 'text-2xl', label: 'text-sm' },
    lg: { ring: 160, stroke: 10, text: 'text-3xl', label: 'text-base' },
  };

  const s = sizes[size];
  const radius = (s.ring - s.stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(dailyGoal.progress, 100);
  const offset = circumference - (progress / 100) * circumference;

  const isComplete = dailyGoal.isComplete;
  const progressColor = isComplete
    ? 'stroke-green-500'
    : progress >= 75
      ? 'stroke-cyan-400'
      : progress >= 50
        ? 'stroke-blue-400'
        : 'stroke-blue-600';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: s.ring, height: s.ring }}>
        {/* Background ring */}
        <svg className="absolute inset-0 -rotate-90" width={s.ring} height={s.ring}>
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={s.stroke}
            className="text-white/10"
          />
        </svg>

        {/* Progress ring */}
        <svg className="absolute inset-0 -rotate-90" width={s.ring} height={s.ring}>
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={radius}
            fill="none"
            strokeWidth={s.stroke}
            strokeLinecap="round"
            className={`${progressColor} transition-all duration-500 ease-out`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isComplete ? (
            <>
              <span className="text-2xl mb-1">✓</span>
              <span className="text-green-400 font-bold text-sm">Complete!</span>
            </>
          ) : (
            <>
              <span className={`${s.text} font-bold text-white`}>{dailyGoal.earnedXP}</span>
              <span className={`${s.label} text-white/60`}>/ {dailyGoal.targetXP} XP</span>
            </>
          )}
        </div>

        {/* Celebration effect for completion */}
        {isComplete && (
          <div className="absolute inset-0 animate-ping-once">
            <svg className="-rotate-90 opacity-50" width={s.ring} height={s.ring}>
              <circle
                cx={s.ring / 2}
                cy={s.ring / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={s.stroke}
                className="text-green-500"
              />
            </svg>
          </div>
        )}
      </div>

      {showDetails && (
        <div className="mt-3 text-center">
          <div className="text-sm font-medium text-white">Daily Goal</div>
          {dailyGoal.consecutiveDaysComplete > 0 && (
            <div className="text-xs text-cyan-400 mt-1">
              🎯 {dailyGoal.consecutiveDaysComplete} day streak!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Compact version for sidebar/header
export function DailyGoalCompact({ dailyGoal }: { dailyGoal: DailyGoal }) {
  const progress = Math.min(dailyGoal.progress, 100);
  const isComplete = dailyGoal.isComplete;

  return (
    <div className={`
      flex items-center gap-2 px-3 py-1.5 rounded-full border
      ${isComplete
        ? 'bg-green-500/20 border-green-500/30'
        : 'bg-cyan-500/10 border-cyan-500/20'
      }
    `}>
      <div className="relative w-5 h-5">
        <svg className="-rotate-90" width={20} height={20}>
          <circle cx={10} cy={10} r={8} fill="none" stroke="currentColor" strokeWidth={2} className="text-white/10" />
          <circle
            cx={10}
            cy={10}
            r={8}
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            className={isComplete ? 'stroke-green-500' : 'stroke-cyan-400'}
            style={{
              strokeDasharray: 50.27,
              strokeDashoffset: 50.27 - (progress / 100) * 50.27,
            }}
          />
        </svg>
        {isComplete && (
          <span className="absolute inset-0 flex items-center justify-center text-[8px]">✓</span>
        )}
      </div>
      <span className={`text-xs font-medium ${isComplete ? 'text-green-400' : 'text-white/80'}`}>
        {dailyGoal.earnedXP}/{dailyGoal.targetXP}
      </span>
    </div>
  );
}

// Settings component for changing daily goal
interface DailyGoalSettingsProps {
  currentGoal: number;
  onGoalChange: (newGoal: number) => void;
}

export function DailyGoalSettings({ currentGoal, onGoalChange }: DailyGoalSettingsProps) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h4 className="text-sm font-medium text-white mb-3">Daily XP Goal</h4>
      <div className="flex flex-wrap gap-2">
        {DAILY_GOAL_CONFIG.goalOptions.map((goal) => (
          <button
            key={goal}
            onClick={() => onGoalChange(goal)}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${currentGoal === goal
                ? 'bg-cyan-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
              }
            `}
          >
            {goal} XP
          </button>
        ))}
      </div>
      <p className="text-xs text-white/50 mt-2">
        Higher goals = more challenge, more rewards!
      </p>
    </div>
  );
}
