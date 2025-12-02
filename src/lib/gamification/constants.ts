// Gamification Constants
// XP values, multipliers, thresholds, and configuration

import { LevelThreshold, Rank } from './types';

// ============================================================================
// XP VALUES (Base amounts for each action)
// ============================================================================

export const XP_VALUES = {
  // Quiz Completion
  quiz: {
    base: 25, // Base XP for completing a quiz
    perMark: 2, // Additional XP per mark scored
    perfect: 50, // Bonus for 100% score
    improvement: 25, // Bonus for improving on a retry
    speedBonus: 15, // Bonus for finishing in under half time
  },

  // Difficulty Multipliers
  difficultyMultiplier: {
    foundational: 1.0,
    intermediate: 1.25,
    exam_level: 1.5,
  },

  // Lesson Completion
  lesson: {
    base: 15,
    withPractice: 25, // If they do practice questions after
  },

  // Practice Sessions
  practice: {
    base: 10,
    perCorrectAnswer: 3,
    streak5: 10, // Bonus for 5 correct in a row
    streak10: 25, // Bonus for 10 correct in a row
  },

  // Daily & Streak Bonuses
  daily: {
    firstOfDay: 10, // First activity of the day
    goalComplete: 25, // Completing daily goal
    goalStreak3: 50, // 3 days meeting goal
    goalStreak7: 100, // 7 days meeting goal
  },

  streak: {
    day3: 25,
    day7: 75,
    day14: 150,
    day30: 400,
    day60: 800,
    day100: 1500,
  },

  // Multiplier for current streak (capped at 2x)
  streakMultiplier: {
    base: 1.0,
    perDay: 0.02, // +2% per streak day
    max: 2.0, // Maximum 2x multiplier
  },

  // Topic Mastery
  topicMastery: {
    reached90: 100, // Bonus for reaching 90% mastery on a topic
    allTopics: 500, // Bonus for mastering all topics
  },

  // Challenges
  challenge: {
    completion: 50,
    perfect: 100,
  },
} as const;

// ============================================================================
// LEVEL THRESHOLDS
// ============================================================================

export const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { level: 1, xp_required: 0, rank: 'bronze', title: 'Math Novice' },
  { level: 2, xp_required: 100, rank: 'bronze', title: 'Number Explorer' },
  { level: 3, xp_required: 250, rank: 'bronze', title: 'Equation Learner' },
  { level: 4, xp_required: 500, rank: 'bronze', title: 'Problem Solver' },
  { level: 5, xp_required: 850, rank: 'bronze', title: 'Math Apprentice' },
  { level: 6, xp_required: 1300, rank: 'silver', title: 'Function Finder' },
  { level: 7, xp_required: 1850, rank: 'silver', title: 'Graph Grapher' },
  { level: 8, xp_required: 2500, rank: 'silver', title: 'Algebra Adept' },
  { level: 9, xp_required: 3300, rank: 'silver', title: 'Formula Master' },
  { level: 10, xp_required: 4250, rank: 'silver', title: 'Math Enthusiast' },
  { level: 11, xp_required: 5350, rank: 'gold', title: 'Quadratic Queen' },
  { level: 12, xp_required: 6600, rank: 'gold', title: 'Trig Tactician' },
  { level: 13, xp_required: 8000, rank: 'gold', title: 'Calculus Cadet' },
  { level: 14, xp_required: 9600, rank: 'gold', title: 'Proof Pioneer' },
  { level: 15, xp_required: 11400, rank: 'gold', title: 'Math Warrior' },
  { level: 16, xp_required: 13400, rank: 'platinum', title: 'Equation Expert' },
  { level: 17, xp_required: 15600, rank: 'platinum', title: 'Function Virtuoso' },
  { level: 18, xp_required: 18000, rank: 'platinum', title: 'Graph Genius' },
  { level: 19, xp_required: 20600, rank: 'platinum', title: 'Algebra Ace' },
  { level: 20, xp_required: 23500, rank: 'platinum', title: 'Math Champion' },
  { level: 21, xp_required: 26700, rank: 'diamond', title: 'Calculus Commander' },
  { level: 22, xp_required: 30200, rank: 'diamond', title: 'Proof Prodigy' },
  { level: 23, xp_required: 34000, rank: 'diamond', title: 'Formula Legend' },
  { level: 24, xp_required: 38100, rank: 'diamond', title: 'Math Mastermind' },
  { level: 25, xp_required: 42500, rank: 'diamond', title: 'Number Ninja' },
  { level: 26, xp_required: 47500, rank: 'master', title: 'A-Math Sage' },
  { level: 27, xp_required: 53000, rank: 'master', title: 'Equation Emperor' },
  { level: 28, xp_required: 59000, rank: 'master', title: 'Math Monarch' },
  { level: 29, xp_required: 65500, rank: 'master', title: 'Ultimate Scholar' },
  { level: 30, xp_required: 72500, rank: 'master', title: 'A-Math Legend' },
];

export const MAX_LEVEL = 30;

// ============================================================================
// RANK CONFIGURATION
// ============================================================================

export const RANK_CONFIG: Record<Rank, {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  minLevel: number;
  maxLevel: number;
}> = {
  bronze: {
    name: 'Bronze',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50',
    icon: '🥉',
    minLevel: 1,
    maxLevel: 5,
  },
  silver: {
    name: 'Silver',
    color: 'text-slate-300',
    bgColor: 'bg-slate-400/20',
    borderColor: 'border-slate-400/50',
    icon: '🥈',
    minLevel: 6,
    maxLevel: 10,
  },
  gold: {
    name: 'Gold',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/50',
    icon: '🥇',
    minLevel: 11,
    maxLevel: 15,
  },
  platinum: {
    name: 'Platinum',
    color: 'text-cyan-300',
    bgColor: 'bg-cyan-500/20',
    borderColor: 'border-cyan-500/50',
    icon: '💎',
    minLevel: 16,
    maxLevel: 20,
  },
  diamond: {
    name: 'Diamond',
    color: 'text-blue-300',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/50',
    icon: '💠',
    minLevel: 21,
    maxLevel: 25,
  },
  master: {
    name: 'Master',
    color: 'text-purple-300',
    bgColor: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/50',
    icon: '👑',
    minLevel: 26,
    maxLevel: 30,
  },
};

// ============================================================================
// STREAK CONFIGURATION
// ============================================================================

export const STREAK_CONFIG = {
  // Time zone handling (use Singapore time for your student)
  timezone: 'Asia/Singapore',

  // Streak freeze
  maxFreezes: 3,
  freezeEarnedEvery: 7, // Earn a freeze every 7 days of streak

  // Streak milestones that trigger achievements/bonuses
  milestones: [3, 7, 14, 30, 60, 100],

  // Grace period in hours (activity counts for previous day if within grace period)
  gracePeriodHours: 4, // Until 4 AM, activity counts for previous day
};

// ============================================================================
// DAILY GOAL CONFIGURATION
// ============================================================================

export const DAILY_GOAL_CONFIG = {
  defaultGoal: 50,
  minGoal: 20,
  maxGoal: 200,
  goalOptions: [20, 30, 50, 75, 100, 150, 200],
};

// ============================================================================
// ACHIEVEMENT BADGE COLORS
// ============================================================================

export const BADGE_COLORS: Record<string, {
  bg: string;
  border: string;
  text: string;
  glow: string;
}> = {
  blue: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/50',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/30',
  },
  green: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/50',
    text: 'text-green-400',
    glow: 'shadow-green-500/30',
  },
  gold: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    text: 'text-yellow-400',
    glow: 'shadow-yellow-500/30',
  },
  purple: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/50',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/30',
  },
  orange: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/50',
    text: 'text-orange-400',
    glow: 'shadow-orange-500/30',
  },
  red: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/50',
    text: 'text-red-400',
    glow: 'shadow-red-500/30',
  },
  rainbow: {
    bg: 'bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-blue-500/20',
    border: 'border-pink-500/50',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400',
    glow: 'shadow-pink-500/30',
  },
  diamond: {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-400/50',
    text: 'text-cyan-300',
    glow: 'shadow-cyan-500/30',
  },
};

// ============================================================================
// CELEBRATION CONFIGURATION
// ============================================================================

export const CELEBRATION_CONFIG = {
  // Thresholds for celebration levels
  xp: {
    small: 25, // Small celebration for 25+ XP
    medium: 50, // Medium for 50+ XP
    large: 100, // Large for 100+ XP
    epic: 200, // Epic for 200+ XP
  },

  // Animation durations (ms)
  duration: {
    small: 1500,
    medium: 2500,
    large: 3500,
    epic: 5000,
  },

  // Confetti particles
  confetti: {
    small: 20,
    medium: 50,
    large: 100,
    epic: 200,
  },
};

// ============================================================================
// TOPIC NAMES (For achievements)
// ============================================================================

export const TOPIC_DISPLAY_NAMES: Record<string, string> = {
  A1: 'Quadratic Functions',
  A2: 'Equations & Inequalities',
  A3: 'Surds',
  A4: 'Polynomials',
  A5: 'Binomial Expansions',
  A6: 'Exponentials & Logs',
  G1: 'Trigonometry',
  G2: 'Coordinate Geometry',
  G3: 'Geometric Proofs',
  C1: 'Calculus',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get level info from XP
 */
export function getLevelFromXP(xp: number): LevelThreshold {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].xp_required) {
      return LEVEL_THRESHOLDS[i];
    }
  }
  return LEVEL_THRESHOLDS[0];
}

/**
 * Get XP required for next level
 */
export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= MAX_LEVEL) return 0;
  return LEVEL_THRESHOLDS[currentLevel].xp_required;
}

/**
 * Get progress to next level as percentage
 */
export function getProgressToNextLevel(xp: number): number {
  const currentLevel = getLevelFromXP(xp);
  if (currentLevel.level >= MAX_LEVEL) return 100;

  const nextLevel = LEVEL_THRESHOLDS[currentLevel.level];
  const xpIntoCurrentLevel = xp - currentLevel.xp_required;
  const xpNeededForNextLevel = nextLevel.xp_required - currentLevel.xp_required;

  return Math.min(100, Math.round((xpIntoCurrentLevel / xpNeededForNextLevel) * 100));
}

/**
 * Calculate streak multiplier
 */
export function getStreakMultiplier(streakDays: number): number {
  const { base, perDay, max } = XP_VALUES.streakMultiplier;
  return Math.min(max, base + (streakDays * perDay));
}

/**
 * Calculate difficulty multiplier
 */
export function getDifficultyMultiplier(difficulty: 'foundational' | 'intermediate' | 'exam_level'): number {
  return XP_VALUES.difficultyMultiplier[difficulty];
}

/**
 * Get celebration level based on XP earned
 */
export function getCelebrationLevel(xpEarned: number): 'small' | 'medium' | 'large' | 'epic' {
  const { xp } = CELEBRATION_CONFIG;
  if (xpEarned >= xp.epic) return 'epic';
  if (xpEarned >= xp.large) return 'large';
  if (xpEarned >= xp.medium) return 'medium';
  return 'small';
}

/**
 * Check if streak milestone reached
 */
export function isStreakMilestone(streak: number): boolean {
  return STREAK_CONFIG.milestones.includes(streak);
}

/**
 * Get streak bonus XP
 */
export function getStreakBonusXP(streak: number): number {
  switch (streak) {
    case 3: return XP_VALUES.streak.day3;
    case 7: return XP_VALUES.streak.day7;
    case 14: return XP_VALUES.streak.day14;
    case 30: return XP_VALUES.streak.day30;
    case 60: return XP_VALUES.streak.day60;
    case 100: return XP_VALUES.streak.day100;
    default: return 0;
  }
}
