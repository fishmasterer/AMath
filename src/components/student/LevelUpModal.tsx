'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LevelUpModalProps {
  show: boolean;
  newLevel: number;
  newRank?: string;
  newTitle?: string;
  onClose: () => void;
}

const rankColors: Record<string, { from: string; to: string; glow: string }> = {
  bronze: { from: 'from-amber-600', to: 'to-orange-700', glow: 'shadow-amber-500/50' },
  silver: { from: 'from-slate-300', to: 'to-slate-500', glow: 'shadow-slate-400/50' },
  gold: { from: 'from-yellow-400', to: 'to-amber-500', glow: 'shadow-yellow-500/50' },
  platinum: { from: 'from-cyan-300', to: 'to-blue-400', glow: 'shadow-cyan-400/50' },
  diamond: { from: 'from-purple-400', to: 'to-pink-500', glow: 'shadow-purple-500/50' },
  master: { from: 'from-rose-400', to: 'to-red-600', glow: 'shadow-rose-500/50' },
};

const rankEmojis: Record<string, string> = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '💎',
  diamond: '👑',
  master: '🏆',
};

export function LevelUpModal({ show, newLevel, newRank = 'bronze', newTitle = 'Math Explorer', onClose }: LevelUpModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const colors = rankColors[newRank] || rankColors.bronze;
  const emoji = rankEmojis[newRank] || '⭐';

  useEffect(() => {
    if (show) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Confetti particles */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    x: '50vw',
                    y: '-10vh',
                    rotate: 0,
                  }}
                  animate={{
                    opacity: [1, 1, 0],
                    x: `${20 + Math.random() * 60}vw`,
                    y: '110vh',
                    rotate: Math.random() * 720 - 360,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    ease: 'easeOut',
                  }}
                  className="absolute"
                  style={{
                    width: 8 + Math.random() * 8,
                    height: 8 + Math.random() * 8,
                    backgroundColor: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  }}
                />
              ))}
            </div>
          )}

          {/* Modal */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-w-md w-full"
          >
            {/* Glowing background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} rounded-3xl blur-xl opacity-50`} />

            <div className="relative bg-slate-900 rounded-3xl border border-white/20 overflow-hidden">
              {/* Header beam */}
              <div className={`h-2 bg-gradient-to-r ${colors.from} ${colors.to}`} />

              <div className="p-8 text-center">
                {/* Level badge */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="relative inline-block mb-6"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full blur-2xl opacity-50 scale-150`} />

                  {/* Badge */}
                  <div className={`relative w-32 h-32 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full flex items-center justify-center shadow-2xl ${colors.glow}`}>
                    <div className="text-center">
                      <div className="text-white font-black text-4xl">{newLevel}</div>
                      <div className="text-white/80 text-xs font-medium uppercase tracking-wider">Level</div>
                    </div>
                  </div>

                  {/* Rank emoji */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="absolute -top-2 -right-2 text-4xl"
                  >
                    {emoji}
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl font-black text-white mb-2">Level Up!</h2>
                  <p className={`text-lg font-bold bg-gradient-to-r ${colors.from} ${colors.to} bg-clip-text text-transparent`}>
                    {newTitle}
                  </p>
                  <p className="text-slate-400 mt-2 capitalize">{newRank} Rank</p>
                </motion.div>

                {/* Stats unlocked */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 grid grid-cols-2 gap-3"
                >
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-white font-bold">+10% XP</div>
                    <div className="text-slate-500 text-xs">Bonus unlocked</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="text-2xl mb-1">🏅</div>
                    <div className="text-white font-bold">New Badge</div>
                    <div className="text-slate-500 text-xs">Achievement</div>
                  </div>
                </motion.div>

                {/* Continue button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`mt-8 w-full py-4 bg-gradient-to-r ${colors.from} ${colors.to} text-white font-bold text-lg rounded-xl shadow-lg ${colors.glow} hover:shadow-xl transition-shadow`}
                >
                  Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
