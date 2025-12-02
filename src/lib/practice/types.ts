// Practice Mode Types
// Comprehensive system for drills, revision, and exam simulation

export type PracticeMode = 'drill' | 'revision' | 'exam' | 'challenge' | 'boss-battle';

export type DifficultyTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface PracticeSession {
  id: string;
  mode: PracticeMode;
  topicIds: string[];
  difficulty: DifficultyTier;
  questionCount: number;
  timeLimit: number | null; // seconds, null = untimed
  startedAt: Date;
  completedAt?: Date;
  questions: PracticeQuestion[];
  results?: PracticeResults;
}

export interface PracticeQuestion {
  id: string;
  topicId: string;
  content: string;
  latex?: string;
  type: 'mcq' | 'numeric' | 'expression' | 'proof' | 'graph';
  options?: string[];
  correctAnswer: string | number | string[];
  points: number;
  timeBonus: number; // extra points for fast answers
  hint?: string;
  solution: string;
  userAnswer?: string | number | string[];
  isCorrect?: boolean;
  timeTaken?: number;
  pointsEarned?: number;
}

export interface PracticeResults {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  totalPoints: number;
  maxPoints: number;
  timeTaken: number;
  averageTimePerQuestion: number;
  streakBonus: number;
  perfectBonus: number;
  speedBonus: number;
  xpEarned: number;
  coinsEarned: number;
  topicBreakdown: TopicPerformance[];
  newPersonalBests: PersonalBest[];
  unlockedAchievements: string[];
}

export interface TopicPerformance {
  topicId: string;
  topicName: string;
  correct: number;
  total: number;
  accuracy: number;
  masteryChange: number;
}

export interface PersonalBest {
  category: string;
  previousBest: number;
  newBest: number;
  improvement: number;
}

// Drill Mode Configuration
export interface DrillConfig {
  name: string;
  description: string;
  topicId: string;
  difficulty: DifficultyTier;
  questionCount: number;
  timePerQuestion: number; // seconds
  requiredAccuracy: number; // 0-1
  xpReward: number;
  unlockRequirement?: string;
}

// Revision Mode Configuration
export interface RevisionConfig {
  mode: 'weak-spots' | 'spaced-repetition' | 'random-mix' | 'topic-focus';
  questionCount: number;
  adaptiveDifficulty: boolean;
  includeHints: boolean;
  showSolutionsAfter: boolean;
}

// Exam Mode Configuration
export interface ExamConfig {
  name: string;
  description: string;
  paperType: 'paper-1' | 'paper-2' | 'mock-full' | 'topical';
  duration: number; // minutes
  totalMarks: number;
  sections: ExamSection[];
  passingScore: number;
  gradeBoundaries: GradeBoundary[];
}

export interface ExamSection {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  marksPerQuestion: number;
  topics: string[];
  timeRecommended: number;
}

export interface GradeBoundary {
  grade: string;
  minPercentage: number;
  description: string;
}

// Challenge Mode Configuration
export interface ChallengeConfig {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'special' | 'seasonal';
  difficulty: DifficultyTier;
  requirements: ChallengeRequirement[];
  rewards: ChallengeReward[];
  expiresAt?: Date;
  leaderboardEnabled: boolean;
}

export interface ChallengeRequirement {
  type: 'accuracy' | 'speed' | 'streak' | 'perfect' | 'completion';
  target: number;
  description: string;
}

export interface ChallengeReward {
  type: 'xp' | 'coins' | 'badge' | 'title' | 'cosmetic';
  amount?: number;
  itemId?: string;
  description: string;
}

// Boss Battle Configuration
export interface BossBattleConfig {
  id: string;
  name: string;
  description: string;
  bossName: string;
  bossTitle: string;
  bossHealth: number;
  topicId: string;
  phases: BossPhase[];
  rewards: ChallengeReward[];
  unlockRequirement: string;
}

export interface BossPhase {
  phaseNumber: number;
  name: string;
  healthThreshold: number; // percentage of health remaining to trigger
  questionDifficulty: DifficultyTier;
  questionCount: number;
  timeLimit: number;
  specialMechanic?: string;
}

// Streak and Combo System
export interface ComboState {
  currentStreak: number;
  maxStreak: number;
  multiplier: number;
  isOnFire: boolean; // 5+ streak
  isUnstoppable: boolean; // 10+ streak
  isLegendary: boolean; // 20+ streak
}

// Adaptive Difficulty
export interface AdaptiveState {
  currentDifficulty: number; // 0-100
  recentAccuracy: number[];
  consecutiveCorrect: number;
  consecutiveWrong: number;
  difficultyAdjustment: 'increase' | 'decrease' | 'maintain';
}
