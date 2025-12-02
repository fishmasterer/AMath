// Gamification System Types
// Duolingo-inspired XP, levels, streaks, and achievements for A-Math

import { QuizTopic } from '../types';

// ============================================================================
// RANKS & LEVELS
// ============================================================================

export type Rank = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master';

export interface LevelThreshold {
  level: number;
  xp_required: number;
  rank: Rank;
  title: string;
}

export interface LevelInfo {
  level: number;
  rank: Rank;
  title: string;
  currentXP: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  progressToNextLevel: number; // 0-100 percentage
  totalXP: number;
}

// ============================================================================
// XP SYSTEM
// ============================================================================

export type XPType =
  | 'quiz_completion'
  | 'quiz_perfect'
  | 'quiz_improvement'
  | 'lesson_completion'
  | 'practice_session'
  | 'daily_goal_bonus'
  | 'streak_bonus'
  | 'achievement_bonus'
  | 'first_of_day'
  | 'challenge_completion'
  | 'topic_mastery';

export interface XPTransaction {
  id: string;
  student_id: string;
  xp_amount: number;
  xp_type: XPType;
  reference_id?: string;
  reference_type?: string;
  difficulty_multiplier: number;
  streak_multiplier: number;
  description?: string;
  created_at: string;
}

export interface XPBreakdown {
  base: number;
  difficultyBonus: number;
  streakBonus: number;
  perfectBonus: number;
  firstOfDayBonus: number;
  total: number;
}

export interface XPAwardResult {
  xpAwarded: number;
  breakdown: XPBreakdown;
  newTotalXP: number;
  leveledUp: boolean;
  newLevel?: number;
  newRank?: Rank;
  achievementsUnlocked: Achievement[];
  dailyGoalMet: boolean;
  streakUpdated: boolean;
  newStreak?: number;
}

// ============================================================================
// STREAKS
// ============================================================================

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  isActiveToday: boolean;
  streakFreezeCount: number;
  willLoseStreakTomorrow: boolean;
}

export interface StreakUpdateResult {
  previousStreak: number;
  newStreak: number;
  streakMaintained: boolean;
  streakLost: boolean;
  streakIncreased: boolean;
  usedFreeze: boolean;
  milestonesReached: number[]; // Streak milestones like 7, 14, 30
}

// ============================================================================
// DAILY GOALS
// ============================================================================

export interface DailyGoal {
  targetXP: number;
  earnedXP: number;
  progress: number; // 0-100 percentage
  isComplete: boolean;
  consecutiveDaysComplete: number;
}

export interface DailyActivity {
  id: string;
  student_id: string;
  activity_date: string;
  xp_earned: number;
  quizzes_completed: number;
  lessons_completed: number;
  practice_sessions: number;
  time_spent_minutes: number;
  daily_goal_met: boolean;
}

// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export type AchievementCategory =
  | 'quiz'
  | 'streak'
  | 'mastery'
  | 'practice'
  | 'milestone'
  | 'special';

export type BadgeColor = 'blue' | 'green' | 'gold' | 'purple' | 'orange' | 'red' | 'rainbow' | 'diamond';

export type AchievementRequirementType =
  | 'count'
  | 'streak'
  | 'score'
  | 'topic'
  | 'special';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  badge_color: BadgeColor;
  requirement_type: AchievementRequirementType;
  requirement_value: number;
  requirement_topic?: QuizTopic;
  xp_reward: number;
  is_hidden: boolean;
  is_repeatable: boolean;
  sort_order: number;
}

export interface StudentAchievement {
  id: string;
  student_id: string;
  achievement_id: string;
  unlocked_at: string;
  times_earned: number;
  progress: number;
  notified: boolean;
  achievement?: Achievement;
}

export interface AchievementProgress {
  achievement: Achievement;
  isUnlocked: boolean;
  progress: number; // Current progress
  target: number; // Target to unlock
  percentage: number; // 0-100
  unlockedAt?: string;
  timesEarned?: number;
}

export interface AchievementCheckResult {
  newlyUnlocked: Achievement[];
  progressUpdated: AchievementProgress[];
  totalXPFromAchievements: number;
}

// ============================================================================
// GAMIFICATION PROFILE (Main state)
// ============================================================================

export interface StudentGamification {
  student_id: string;

  // XP & Levels
  total_xp: number;
  current_level: number;
  current_rank: Rank;

  // Streaks
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  streak_freeze_count: number;

  // Daily Goals
  daily_xp_goal: number;
  daily_xp_earned: number;
  daily_goal_streak: number;

  // Stats
  total_quizzes_completed: number;
  total_perfect_scores: number;
  total_lessons_completed: number;
  total_practice_sessions: number;

  created_at: string;
  updated_at: string;
}

// ============================================================================
// GAMIFICATION STATE (UI-ready combined state)
// ============================================================================

export interface GamificationState {
  // Profile
  profile: StudentGamification;

  // Computed Level Info
  level: LevelInfo;

  // Streak Info
  streak: StreakInfo;

  // Daily Goal
  dailyGoal: DailyGoal;

  // Achievements
  unlockedAchievements: StudentAchievement[];
  achievementProgress: AchievementProgress[];
  recentAchievements: StudentAchievement[]; // Last 5 unlocked

  // Recent XP Transactions
  recentXP: XPTransaction[];

  // Loading states
  isLoading: boolean;
  error?: string;
}

// ============================================================================
// LEADERBOARD (Optional)
// ============================================================================

export interface LeaderboardEntry {
  rank: number;
  student_id: string;
  student_name: string;
  total_xp: number;
  current_level: number;
  current_streak: number;
  isCurrentUser: boolean;
}

export interface Leaderboard {
  type: 'weekly' | 'all_time';
  entries: LeaderboardEntry[];
  userPosition?: number;
}

// ============================================================================
// ACTION TRIGGERS (When to award XP)
// ============================================================================

export interface QuizCompletionAction {
  type: 'quiz_completion';
  quizId: string;
  score: number;
  totalMarks: number;
  difficulty: 'foundational' | 'intermediate' | 'exam_level';
  topic: QuizTopic;
  timeTakenSeconds: number;
  timeLimitSeconds: number;
  isPerfect: boolean;
  isRetry: boolean;
  previousScore?: number;
}

export interface LessonCompletionAction {
  type: 'lesson_completion';
  lessonId: string;
  topic: QuizTopic;
}

export interface PracticeSessionAction {
  type: 'practice_session';
  questionsAnswered: number;
  correctAnswers: number;
  topic: QuizTopic;
}

export interface ChallengeCompletionAction {
  type: 'challenge_completion';
  challengeId: string;
  score: number;
}

export type GamificationAction =
  | QuizCompletionAction
  | LessonCompletionAction
  | PracticeSessionAction
  | ChallengeCompletionAction;

// ============================================================================
// NOTIFICATIONS / CELEBRATIONS
// ============================================================================

export type CelebrationLevel = 'small' | 'medium' | 'large' | 'epic';

export interface XPNotification {
  type: 'xp_earned';
  amount: number;
  breakdown: XPBreakdown;
  celebrationLevel: CelebrationLevel;
}

export interface LevelUpNotification {
  type: 'level_up';
  oldLevel: number;
  newLevel: number;
  newRank?: Rank;
  newTitle: string;
  celebrationLevel: CelebrationLevel;
}

export interface AchievementNotification {
  type: 'achievement_unlocked';
  achievement: Achievement;
  celebrationLevel: CelebrationLevel;
}

export interface StreakNotification {
  type: 'streak_milestone';
  streak: number;
  celebrationLevel: CelebrationLevel;
}

export interface DailyGoalNotification {
  type: 'daily_goal_complete';
  xpEarned: number;
  consecutiveDays: number;
  celebrationLevel: CelebrationLevel;
}

export type GamificationNotification =
  | XPNotification
  | LevelUpNotification
  | AchievementNotification
  | StreakNotification
  | DailyGoalNotification;
