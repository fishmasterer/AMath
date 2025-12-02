'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  scale: number;
  rotation: number;
  delay: number;
}

interface XPCelebrationProps {
  show: boolean;
  amount: number;
  type?: 'small' | 'medium' | 'large' | 'epic';
  onComplete?: () => void;
}

const celebrationEmojis = {
  small: ['⭐', '✨'],
  medium: ['⭐', '✨', '🌟', '💫'],
  large: ['⭐', '✨', '🌟', '💫', '🔥', '💥'],
  epic: ['⭐', '✨', '🌟', '💫', '🔥', '💥', '🎉', '🏆', '👑', '💎'],
};

const particleCounts = {
  small: 8,
  medium: 15,
  large: 25,
  epic: 40,
};

export function XPCelebration({ show, amount, type = 'medium', onComplete }: XPCelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (show) {
      const emojis = celebrationEmojis[type];
      const count = particleCounts[type];

      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: 50 + (Math.random() - 0.5) * 80,
          y: 50 + (Math.random() - 0.5) * 60,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          scale: 0.5 + Math.random() * 1,
          rotation: Math.random() * 360,
          delay: Math.random() * 0.3,
        });
      }
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, type, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-[200] flex items-center justify-center"
        >
          {/* Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                opacity: 1,
                scale: 0,
                x: '50%',
                y: '50%',
              }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0, particle.scale, particle.scale * 0.5],
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                rotate: particle.rotation,
              }}
              transition={{
                duration: 1.5,
                delay: particle.delay,
                ease: 'easeOut',
              }}
              className="absolute text-2xl md:text-4xl"
              style={{ left: 0, top: 0 }}
            >
              {particle.emoji}
            </motion.div>
          ))}

          {/* XP Amount */}
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: [0, 1.2, 1], y: [20, -20, -40] }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-black text-4xl md:text-6xl px-8 py-4 rounded-2xl shadow-2xl shadow-amber-500/50">
              +{amount} XP
            </div>
          </motion.div>

          {/* Radial burst effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-amber-400/50 to-yellow-500/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mini XP popup that floats up
interface XPPopupProps {
  amount: number;
  show: boolean;
  position?: { x: number; y: number };
  onComplete?: () => void;
}

export function XPPopup({ amount, show, position, onComplete }: XPPopupProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], y: -60, scale: 1 }}
          transition={{ duration: 1.5, times: [0, 0.1, 0.7, 1] }}
          className="fixed z-[150] pointer-events-none"
          style={{
            left: position?.x ?? '50%',
            top: position?.y ?? '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white font-bold px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-lg">⭐</span>
            <span>+{amount}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Streak milestone celebration
interface StreakCelebrationProps {
  streak: number;
  show: boolean;
  onComplete?: () => void;
}

export function StreakCelebration({ streak, show, onComplete }: StreakCelebrationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const getMessage = () => {
    if (streak >= 30) return "Legendary! 30 day streak!";
    if (streak >= 14) return "Two weeks strong!";
    if (streak >= 7) return "One week streak!";
    if (streak >= 3) return "3 day streak!";
    return `${streak} day streak!`;
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 rounded-3xl shadow-2xl text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="text-7xl mb-4"
            >
              🔥
            </motion.div>
            <h2 className="text-3xl font-black text-white mb-2">{getMessage()}</h2>
            <p className="text-orange-200">Keep the fire burning!</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="mt-6 px-8 py-3 bg-white text-orange-600 font-bold rounded-xl shadow-lg"
            >
              Awesome!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
