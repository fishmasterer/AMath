// Gamification Module
// Export all gamification functionality

// Types
export * from './types';

// Constants
export * from './constants';

// Core Engine
export {
  calculateQuizXP,
  applyBonuses,
  getLevelInfo,
  checkLevelUp,
  getTodayDate,
  getYesterdayDate,
  getStreakInfo,
  calculateStreakUpdate,
  getDailyGoalInfo,
  awardXP,
  initializeGamificationProfile,
  getGamificationState,
  updateDailyGoal,
} from './engine';

// Achievements
export {
  getAchievementsWithProgress,
  getUnlockedAchievements,
  checkAndAwardAchievements,
  markAchievementsNotified,
  getUnnotifiedAchievements,
} from './achievements';
