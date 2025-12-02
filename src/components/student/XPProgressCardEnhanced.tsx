'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface XPMultiplier {
  type: 'streak' | 'first_of_day' | 'weekend' | 'perfect';
  value: number;
  label: string;
  icon: string;
}

interface XPProgressCardEnhancedProps {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  rank?: string;
  title?: string;
  activeMultipliers?: XPMultiplier[];
  recentXPGain?: number;
  onLevelClick?: () => void;
}

const rankConfig: Record<string, { color: string; gradient: string; icon: string }> = {
  bronze: { color: 'text-amber-600', gradient: 'from-amber-600 to-orange-700', icon: '🥉' },
  silver: { color: 'text-slate-400', gradient: 'from-slate-300 to-slate-500', icon: '🥈' },
  gold: { color: 'text-yellow-400', gradient: 'from-yellow-400 to-amber-500', icon: '🥇' },
  platinum: { color: 'text-cyan-400', gradient: 'from-cyan-300 to-blue-400', icon: '💎' },
  diamond: { color: 'text-purple-400', gradient: 'from-purple-400 to-pink-500', icon: '👑' },
  master: { color: 'text-rose-400', gradient: 'from-rose-400 to-red-600', icon: '🏆' },
};

export function XPProgressCardEnhanced({
  level,
  currentXP,
  xpToNextLevel,
  totalXP,
  rank = 'bronze',
  title = 'Math Explorer',
  activeMultipliers = [],
  recentXPGain,
  onLevelClick,
}: XPProgressCardEnhancedProps) {
  const progress = (currentXP / xpToNextLevel) * 100;
  const config = rankConfig[rank] || rankConfig.bronze;
  const [displayXP, setDisplayXP] = useState(totalXP);
  const [showXPGain, setShowXPGain] = useState(false);
  const [hoveredMultiplier, setHoveredMultiplier] = useState<string | null>(null);

  // Animate XP counter
  useEffect(() => {
    if (totalXP !== displayXP) {
      const diff = totalXP - displayXP;
      const duration = Math.min(1000, Math.abs(diff) * 10);
      const steps = 30;
      const stepValue = diff / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        if (step >= steps) {
          setDisplayXP(totalXP);
          clearInterval(interval);
        } else {
          setDisplayXP((prev) => Math.round(prev + stepValue));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [totalXP, displayXP]);

  // Show XP gain animation
  useEffect(() => {
    if (recentXPGain && recentXPGain > 0) {
      setShowXPGain(true);
      const timer = setTimeout(() => setShowXPGain(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [recentXPGain]);

  // Calculate milestones
  const milestones = [25, 50, 75, 100];
  const nextMilestone = milestones.find((m) => progress < m);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Background glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r ${config.gradient} opacity-10 blur-3xl`} />

      {/* Active multipliers banner */}
      {activeMultipliers.length > 0 && (
        <div className="relative bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-amber-500/30 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-medium text-sm">Active Bonuses:</span>
              <div className="flex items-center gap-1">
                {activeMultipliers.map((mult) => (
                  <motion.div
                    key={mult.type}
                    whileHover={{ scale: 1.1 }}
                    onMouseEnter={() => setHoveredMultiplier(mult.type)}
                    onMouseLeave={() => setHoveredMultiplier(null)}
                    className="relative cursor-help"
                  >
                    <div className="flex items-center gap-1 bg-amber-500/30 px-2 py-1 rounded-full text-sm">
                      <span>{mult.icon}</span>
                      <span className="text-amber-300 font-bold">x{mult.value}</span>
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredMultiplier === mult.type && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-10"
                        >
                          {mult.label}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-amber-400 text-sm font-bold"
            >
              {activeMultipliers.reduce((acc, m) => acc * m.value, 1)}x Total
            </motion.div>
          </div>
        </div>
      )}

      <div className="relative p-5">
        <div className="flex items-center justify-between mb-4">
          {/* Level badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLevelClick}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`w-16 h-16 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <span className="text-2xl font-black text-white">{level}</span>
              </motion.div>
              <div className="absolute -top-1 -right-1 text-xl">{config.icon}</div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Level {level}</p>
              <p className="text-white font-bold text-lg">{title}</p>
              <p className={`text-sm font-medium capitalize ${config.color}`}>{rank} Rank</p>
            </div>
          </motion.div>

          {/* Total XP with animation */}
          <div className="text-right relative">
            <AnimatePresence>
              {showXPGain && recentXPGain && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -20 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-2 right-0 text-emerald-400 font-bold"
                >
                  +{recentXPGain} XP
                </motion.div>
              )}
            </AnimatePresence>
            <motion.p
              key={displayXP}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-amber-400 font-black text-2xl"
            >
              {displayXP.toLocaleString()}
            </motion.p>
            <p className="text-slate-500 text-xs">Total XP</p>
          </div>
        </div>

        {/* Progress bar with milestones */}
        <div className="relative mt-2">
          {/* Milestone markers */}
          <div className="absolute inset-x-0 top-0 h-4 flex items-center">
            {milestones.slice(0, -1).map((milestone) => (
              <div
                key={milestone}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${milestone}%` }}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${
                  progress >= milestone ? 'bg-emerald-400' : 'bg-slate-600'
                }`} />
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${config.gradient} rounded-full relative overflow-hidden`}
            >
              {/* Shine effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </motion.div>
          </div>

          {/* XP text */}
          <div className="flex justify-between mt-2 text-xs">
            <span className={`font-medium ${config.color}`}>{currentXP} XP</span>
            <span className="text-slate-500">
              {nextMilestone && nextMilestone < 100 && (
                <span className="text-emerald-400 mr-2">
                  {Math.round(nextMilestone - progress)}% to {nextMilestone}% milestone
                </span>
              )}
              {xpToNextLevel - currentXP} XP to level {level + 1}
            </span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-white">{Math.round(progress)}%</div>
            <div className="text-slate-500 text-xs">Progress</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-emerald-400">{xpToNextLevel - currentXP}</div>
            <div className="text-slate-500 text-xs">XP Needed</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-purple-400">#{level}</div>
            <div className="text-slate-500 text-xs">Level</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
