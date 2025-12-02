'use client';

import { motion } from 'framer-motion';

interface RankInfo {
  name: string;
  minLevel: number;
  icon: string;
  color: string;
  gradient: string;
}

const ranks: RankInfo[] = [
  { name: 'Bronze', minLevel: 1, icon: '🥉', color: 'text-amber-600', gradient: 'from-amber-600 to-orange-700' },
  { name: 'Silver', minLevel: 10, icon: '🥈', color: 'text-slate-400', gradient: 'from-slate-300 to-slate-500' },
  { name: 'Gold', minLevel: 25, icon: '🥇', color: 'text-yellow-400', gradient: 'from-yellow-400 to-amber-500' },
  { name: 'Platinum', minLevel: 50, icon: '💎', color: 'text-cyan-400', gradient: 'from-cyan-300 to-blue-400' },
  { name: 'Diamond', minLevel: 75, icon: '👑', color: 'text-purple-400', gradient: 'from-purple-400 to-pink-500' },
  { name: 'Master', minLevel: 100, icon: '🏆', color: 'text-rose-400', gradient: 'from-rose-400 to-red-600' },
];

interface RankProgressDisplayProps {
  currentLevel: number;
  currentRank: string;
  compact?: boolean;
}

export function RankProgressDisplay({ currentLevel, currentRank, compact = false }: RankProgressDisplayProps) {
  const currentRankIndex = ranks.findIndex((r) => r.name.toLowerCase() === currentRank.toLowerCase());
  const nextRank = ranks[currentRankIndex + 1];

  const getProgressToNextRank = () => {
    if (!nextRank) return 100;
    const currentMin = ranks[currentRankIndex]?.minLevel || 1;
    const nextMin = nextRank.minLevel;
    return Math.min(100, ((currentLevel - currentMin) / (nextMin - currentMin)) * 100);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {ranks.map((rank, index) => {
          const isActive = index <= currentRankIndex;
          const isCurrent = index === currentRankIndex;
          return (
            <motion.div
              key={rank.name}
              whileHover={{ scale: 1.2 }}
              className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                isActive
                  ? `bg-gradient-to-br ${rank.gradient}`
                  : 'bg-slate-800 border border-slate-700'
              }`}
            >
              <span className={`text-sm ${isActive ? '' : 'grayscale opacity-50'}`}>{rank.icon}</span>
              {isCurrent && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${rank.gradient} opacity-30`}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-white/10 p-5"
    >
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <span>Rank Progression</span>
        <span className="text-xs text-slate-500">Level {currentLevel}</span>
      </h3>

      {/* Rank timeline */}
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-6 left-4 right-4 h-1 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentRankIndex / (ranks.length - 1)) * 100 + getProgressToNextRank() / (ranks.length - 1)}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400"
          />
        </div>

        {/* Rank nodes */}
        <div className="flex justify-between relative z-10">
          {ranks.map((rank, index) => {
            const isUnlocked = index <= currentRankIndex;
            const isCurrent = index === currentRankIndex;
            const isNext = index === currentRankIndex + 1;

            return (
              <motion.div
                key={rank.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {/* Node */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                    isUnlocked
                      ? `bg-gradient-to-br ${rank.gradient}`
                      : 'bg-slate-800 border-2 border-slate-700'
                  }`}
                >
                  <span className={`text-xl ${!isUnlocked && 'grayscale opacity-50'}`}>
                    {rank.icon}
                  </span>

                  {/* Current indicator */}
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full border-2 border-white`}
                    />
                  )}

                  {/* Locked overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </motion.div>

                {/* Label */}
                <div className="mt-2 text-center">
                  <p className={`text-xs font-medium ${isUnlocked ? rank.color : 'text-slate-600'}`}>
                    {rank.name}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Lvl {rank.minLevel}+
                  </p>
                </div>

                {/* Levels to next */}
                {isNext && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 text-xs text-center"
                  >
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                      {rank.minLevel - currentLevel} levels
                    </span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Next rank info */}
      {nextRank && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 p-4 bg-white/5 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl grayscale opacity-50">{nextRank.icon}</span>
              <div>
                <p className="text-white font-medium">Next: {nextRank.name}</p>
                <p className="text-slate-500 text-sm">Reach level {nextRank.minLevel}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 font-bold">{nextRank.minLevel - currentLevel}</p>
              <p className="text-slate-500 text-xs">levels away</p>
            </div>
          </div>

          {/* Progress bar to next rank */}
          <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressToNextRank()}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${nextRank.gradient}`}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
