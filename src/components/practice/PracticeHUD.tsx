'use client';

import { useState, useEffect, useRef } from 'react';
import { ComboState, DifficultyTier } from '@/lib/practice/types';

// =============================================================================
// PRACTICE HUD - Immersive heads-up display for practice sessions
// =============================================================================

interface PracticeHUDProps {
  mode: 'drill' | 'exam' | 'boss' | 'challenge';
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  maxScore: number;
  timeRemaining: number | null;
  comboState: ComboState;
  difficulty: DifficultyTier;
  topicName: string;
  onPause?: () => void;
}

export function PracticeHUD({
  mode,
  currentQuestion,
  totalQuestions,
  score,
  maxScore,
  timeRemaining,
  comboState,
  difficulty,
  topicName,
  onPause,
}: PracticeHUDProps) {
  const [pulseStreak, setPulseStreak] = useState(false);

  // Pulse effect on streak milestones
  useEffect(() => {
    if ([5, 10, 15, 20, 25, 30].includes(comboState.currentStreak)) {
      setPulseStreak(true);
      const timer = setTimeout(() => setPulseStreak(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [comboState.currentStreak]);

  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const scorePercentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  const getDifficultyColor = (tier: DifficultyTier) => {
    const colors: Record<DifficultyTier, string> = {
      bronze: 'from-amber-600 to-amber-800',
      silver: 'from-slate-400 to-slate-600',
      gold: 'from-yellow-400 to-yellow-600',
      platinum: 'from-cyan-300 to-cyan-500',
      diamond: 'from-purple-400 to-blue-500',
    };
    return colors[tier];
  };

  const getStreakStyle = () => {
    if (comboState.isLegendary) return 'text-purple-400 animate-pulse';
    if (comboState.isUnstoppable) return 'text-orange-400';
    if (comboState.isOnFire) return 'text-yellow-400';
    return 'text-slate-400';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/95 to-transparent pb-8 pt-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          {/* Left: Mode and Topic */}
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(difficulty)} text-white text-sm font-bold uppercase tracking-wider`}>
              {difficulty}
            </div>
            <div className="text-white font-medium">
              {topicName}
            </div>
          </div>

          {/* Center: Timer */}
          {timeRemaining !== null && (
            <Timer seconds={timeRemaining} />
          )}

          {/* Right: Pause Button */}
          {onPause && (
            <button
              onClick={onPause}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <PauseIcon className="w-5 h-5 text-slate-400" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between">
          {/* Question Counter */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{currentQuestion}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{totalQuestions}</span>
          </div>

          {/* Streak Display */}
          <div className={`flex items-center gap-2 transition-all duration-300 ${pulseStreak ? 'scale-125' : ''}`}>
            <FlameIcon className={`w-6 h-6 ${getStreakStyle()}`} />
            <span className={`text-xl font-bold ${getStreakStyle()}`}>
              {comboState.currentStreak}
            </span>
            {comboState.multiplier > 1 && (
              <span className="text-sm text-slate-500">
                x{comboState.multiplier.toFixed(1)}
              </span>
            )}
          </div>

          {/* Score Display */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-400">{score}</span>
            <span className="text-sm text-slate-500">pts</span>
          </div>
        </div>

        {/* Streak Banner */}
        {comboState.currentStreak >= 5 && (
          <StreakBanner streak={comboState.currentStreak} />
        )}
      </div>
    </div>
  );
}

// =============================================================================
// TIMER COMPONENT
// =============================================================================

interface TimerProps {
  seconds: number;
}

function Timer({ seconds }: TimerProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const isLow = seconds < 60;
  const isCritical = seconds < 30;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
      isCritical ? 'bg-red-900/50 animate-pulse' : isLow ? 'bg-amber-900/50' : 'bg-slate-800'
    }`}>
      <ClockIcon className={`w-5 h-5 ${isCritical ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-slate-400'}`} />
      <span className={`font-mono text-xl font-bold ${isCritical ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-white'}`}>
        {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
      </span>
    </div>
  );
}

// =============================================================================
// STREAK BANNER
// =============================================================================

interface StreakBannerProps {
  streak: number;
}

function StreakBanner({ streak }: StreakBannerProps) {
  const getMessage = () => {
    if (streak >= 30) return { text: 'GODLIKE', color: 'from-purple-500 via-pink-500 to-purple-500' };
    if (streak >= 20) return { text: 'LEGENDARY', color: 'from-yellow-400 via-orange-500 to-yellow-400' };
    if (streak >= 15) return { text: 'DOMINATING', color: 'from-orange-400 via-red-500 to-orange-400' };
    if (streak >= 10) return { text: 'UNSTOPPABLE', color: 'from-cyan-400 via-blue-500 to-cyan-400' };
    if (streak >= 5) return { text: 'ON FIRE', color: 'from-amber-400 via-yellow-500 to-amber-400' };
    return { text: '', color: '' };
  };

  const { text, color } = getMessage();

  if (!text) return null;

  return (
    <div className="mt-4 text-center">
      <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${color} text-white font-black text-lg tracking-widest animate-pulse shadow-lg`}>
        {text}
      </div>
    </div>
  );
}

// =============================================================================
// BOSS HEALTH BAR
// =============================================================================

interface BossHealthBarProps {
  bossName: string;
  bossTitle: string;
  currentHealth: number;
  maxHealth: number;
  currentPhase: number;
  totalPhases: number;
}

export function BossHealthBar({
  bossName,
  bossTitle,
  currentHealth,
  maxHealth,
  currentPhase,
  totalPhases,
}: BossHealthBarProps) {
  const healthPercentage = (currentHealth / maxHealth) * 100;

  const getHealthColor = () => {
    if (healthPercentage > 50) return 'from-red-500 to-red-700';
    if (healthPercentage > 25) return 'from-orange-500 to-orange-700';
    return 'from-red-600 to-red-900 animate-pulse';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-950 to-transparent p-4">
      <div className="max-w-3xl mx-auto">
        {/* Boss Info */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-black text-red-400 tracking-wider">{bossName}</h2>
            <p className="text-sm text-slate-500 italic">{bossTitle}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">PHASE {currentPhase}/{totalPhases}</div>
            <div className="text-lg font-bold text-white">{Math.round(currentHealth)}/{maxHealth}</div>
          </div>
        </div>

        {/* Health Bar */}
        <div className="relative h-6 bg-slate-800 rounded-full overflow-hidden border-2 border-slate-700">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.3)_10px,rgba(0,0,0,0.3)_20px)]" />

          {/* Health fill */}
          <div
            className={`absolute left-0 top-0 h-full bg-gradient-to-r ${getHealthColor()} transition-all duration-300`}
            style={{ width: `${healthPercentage}%` }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          </div>

          {/* Phase markers */}
          {Array.from({ length: totalPhases - 1 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-0.5 bg-slate-600"
              style={{ left: `${((i + 1) / totalPhases) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// PLAYER HEALTH BAR
// =============================================================================

interface PlayerHealthBarProps {
  health: number;
  maxHealth: number;
}

export function PlayerHealthBar({ health, maxHealth }: PlayerHealthBarProps) {
  const healthPercentage = (health / maxHealth) * 100;

  const getHealthColor = () => {
    if (healthPercentage > 50) return 'from-emerald-500 to-emerald-700';
    if (healthPercentage > 25) return 'from-yellow-500 to-yellow-700';
    return 'from-red-500 to-red-700 animate-pulse';
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-700">
        <div className="text-xs text-slate-400 mb-1">YOUR HEALTH</div>
        <div className="relative w-48 h-4 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full bg-gradient-to-r ${getHealthColor()} transition-all duration-300`}
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
        <div className="text-sm font-bold text-white mt-1">{health}/{maxHealth}</div>
      </div>
    </div>
  );
}

// =============================================================================
// DAMAGE INDICATOR
// =============================================================================

interface DamageIndicatorProps {
  damage: number;
  type: 'dealt' | 'received';
  position: { x: number; y: number };
}

export function DamageIndicator({ damage, type, position }: DamageIndicatorProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed z-50 pointer-events-none animate-float-up font-black text-3xl ${
        type === 'dealt' ? 'text-red-500' : 'text-yellow-400'
      }`}
      style={{ left: position.x, top: position.y }}
    >
      {type === 'dealt' ? `-${damage}` : `-${damage}`}
    </div>
  );
}

// =============================================================================
// ICONS
// =============================================================================

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.5 1.5-4.5 3-6 .5-.5 1-1 1.5-1.5.5 1.5 1.5 3 3 4 1.5-2 2.5-4.5 2.5-7 0-.5 0-1-.1-1.5 2.6 1.5 4.6 4.1 5 7.1.1.6.1 1.3.1 1.9 0 3.866-3.134 7-7 7z" />
    </svg>
  );
}

export default PracticeHUD;
