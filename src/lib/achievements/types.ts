// Achievement and Badge System Types
// Comprehensive progression and mastery tracking

export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export type AchievementCategory =
  | 'mastery' // Topic mastery achievements
  | 'streak' // Consistency achievements
  | 'speed' // Time-based achievements
  | 'accuracy' // Precision achievements
  | 'explorer' // Discovery achievements
  | 'challenger' // Challenge mode achievements
  | 'social' // Community achievements
  | 'milestone' // Progress milestones
  | 'secret'; // Hidden achievements

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string;
  xpReward: number;
  coinReward: number;
  requirements: AchievementRequirement[];
  isSecret: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface AchievementRequirement {
  type: RequirementType;
  target: number;
  current?: number;
  topicId?: string;
  description: string;
}

export type RequirementType =
  | 'lessons_completed'
  | 'questions_answered'
  | 'correct_answers'
  | 'accuracy_percentage'
  | 'streak_days'
  | 'streak_questions'
  | 'xp_earned'
  | 'topic_mastery'
  | 'drills_completed'
  | 'exams_passed'
  | 'perfect_scores'
  | 'speed_record'
  | 'boss_defeated'
  | 'challenges_completed'
  | 'time_spent'
  | 'topics_explored';

// Mastery System
export type MasteryLevel = 'novice' | 'apprentice' | 'journeyman' | 'expert' | 'master' | 'grandmaster';

export interface TopicMastery {
  topicId: string;
  topicName: string;
  level: MasteryLevel;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  averageSpeed: number;
  lastPracticed?: Date;
  strengthAreas: string[];
  weakAreas: string[];
  milestones: MasteryMilestone[];
}

export interface MasteryMilestone {
  id: string;
  name: string;
  description: string;
  requirement: number;
  achieved: boolean;
  achievedAt?: Date;
  reward: {
    xp: number;
    coins: number;
    badgeId?: string;
  };
}

// Badge System
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  category: BadgeCategory;
  requirement: string;
  isEquipped: boolean;
  earnedAt?: Date;
}

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'champion';

export type BadgeCategory =
  | 'topic' // Topic-specific badges
  | 'skill' // Skill-based badges
  | 'event' // Event/seasonal badges
  | 'special'; // Unique badges

// Title System
export interface Title {
  id: string;
  name: string;
  description: string;
  rarity: AchievementRarity;
  requirement: string;
  isEquipped: boolean;
  earnedAt?: Date;
}

// Player Profile Display
export interface PlayerProfile {
  id: string;
  displayName: string;
  equippedTitle?: Title;
  equippedBadges: Badge[];
  showcaseAchievements: Achievement[];
  level: number;
  totalXP: number;
  rank: PlayerRank;
  topicMasteries: TopicMastery[];
  stats: PlayerStats;
}

export interface PlayerRank {
  tier: string;
  division: number;
  points: number;
  pointsToNextDivision: number;
}

export interface PlayerStats {
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  overallAccuracy: number;
  longestStreak: number;
  currentStreak: number;
  totalTimePracticed: number;
  lessonsCompleted: number;
  drillsCompleted: number;
  examsCompleted: number;
  perfectScores: number;
  challengesWon: number;
  bossesDefeated: number;
  achievementsUnlocked: number;
  badgesEarned: number;
  titlesEarned: number;
}

// Leaderboard
export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  displayName: string;
  title?: string;
  score: number;
  change: number; // Position change from last period
  badges: string[];
}

export interface Leaderboard {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'all-time' | 'topic';
  topicId?: string;
  entries: LeaderboardEntry[];
  lastUpdated: Date;
  playerRank?: number;
}
