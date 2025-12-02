// Practice Engine
// Core system for managing practice sessions, drills, and exams

import {
  PracticeMode,
  PracticeSession,
  PracticeQuestion,
  PracticeResults,
  DifficultyTier,
  DrillConfig,
  RevisionConfig,
  ExamConfig,
  ChallengeConfig,
  BossBattleConfig,
  ComboState,
  AdaptiveState,
  TopicPerformance,
} from './types';

// Difficulty multipliers for scoring
const DIFFICULTY_MULTIPLIERS: Record<DifficultyTier, number> = {
  bronze: 1.0,
  silver: 1.25,
  gold: 1.5,
  platinum: 2.0,
  diamond: 3.0,
};

// Time bonus thresholds (percentage of time limit)
const TIME_BONUS_THRESHOLDS = [
  { threshold: 0.25, bonus: 1.5 }, // Under 25% time = 50% bonus
  { threshold: 0.5, bonus: 1.25 }, // Under 50% time = 25% bonus
  { threshold: 0.75, bonus: 1.1 }, // Under 75% time = 10% bonus
];

// Streak bonuses
const STREAK_BONUSES = [
  { streak: 5, multiplier: 1.2, name: 'On Fire' },
  { streak: 10, multiplier: 1.5, name: 'Unstoppable' },
  { streak: 15, multiplier: 2.0, name: 'Dominating' },
  { streak: 20, multiplier: 2.5, name: 'Legendary' },
  { streak: 30, multiplier: 3.0, name: 'Godlike' },
];

export class PracticeEngine {
  private session: PracticeSession | null = null;
  private comboState: ComboState;
  private adaptiveState: AdaptiveState;
  private questionHistory: Map<string, { correct: number; total: number }>;

  constructor() {
    this.comboState = this.initComboState();
    this.adaptiveState = this.initAdaptiveState();
    this.questionHistory = new Map();
  }

  private initComboState(): ComboState {
    return {
      currentStreak: 0,
      maxStreak: 0,
      multiplier: 1.0,
      isOnFire: false,
      isUnstoppable: false,
      isLegendary: false,
    };
  }

  private initAdaptiveState(): AdaptiveState {
    return {
      currentDifficulty: 50,
      recentAccuracy: [],
      consecutiveCorrect: 0,
      consecutiveWrong: 0,
      difficultyAdjustment: 'maintain',
    };
  }

  // Start a new practice session
  startSession(
    mode: PracticeMode,
    topicIds: string[],
    difficulty: DifficultyTier,
    questionCount: number,
    timeLimit: number | null
  ): PracticeSession {
    this.session = {
      id: this.generateSessionId(),
      mode,
      topicIds,
      difficulty,
      questionCount,
      timeLimit,
      startedAt: new Date(),
      questions: [],
    };

    this.comboState = this.initComboState();
    return this.session;
  }

  // Submit an answer and calculate points
  submitAnswer(
    questionId: string,
    answer: string | number | string[],
    timeTaken: number
  ): {
    isCorrect: boolean;
    pointsEarned: number;
    feedback: AnswerFeedback;
    comboState: ComboState;
  } {
    if (!this.session) {
      throw new Error('No active session');
    }

    const question = this.session.questions.find((q) => q.id === questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    const isCorrect = this.checkAnswer(question, answer);
    question.userAnswer = answer;
    question.isCorrect = isCorrect;
    question.timeTaken = timeTaken;

    // Update combo state
    this.updateComboState(isCorrect);

    // Calculate points
    const pointsEarned = this.calculatePoints(question, isCorrect, timeTaken);
    question.pointsEarned = pointsEarned;

    // Update adaptive difficulty
    this.updateAdaptiveDifficulty(isCorrect);

    // Generate feedback
    const feedback = this.generateFeedback(question, isCorrect, timeTaken);

    return {
      isCorrect,
      pointsEarned,
      feedback,
      comboState: { ...this.comboState },
    };
  }

  // Check if answer is correct
  private checkAnswer(question: PracticeQuestion, answer: string | number | string[]): boolean {
    const correct = question.correctAnswer;

    if (Array.isArray(correct) && Array.isArray(answer)) {
      return (
        correct.length === answer.length &&
        correct.every((c) => answer.includes(c))
      );
    }

    if (typeof correct === 'number' && typeof answer === 'number') {
      // Allow small tolerance for numeric answers
      return Math.abs(correct - answer) < 0.001;
    }

    if (typeof correct === 'string' && typeof answer === 'string') {
      // Normalize and compare
      return this.normalizeAnswer(correct) === this.normalizeAnswer(answer);
    }

    return String(correct) === String(answer);
  }

  private normalizeAnswer(answer: string): string {
    return answer
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^\w\d\+\-\*\/\^\(\)]/g, '');
  }

  // Update combo/streak state
  private updateComboState(isCorrect: boolean): void {
    if (isCorrect) {
      this.comboState.currentStreak++;
      this.comboState.maxStreak = Math.max(
        this.comboState.maxStreak,
        this.comboState.currentStreak
      );

      // Update multiplier based on streak
      const streakBonus = STREAK_BONUSES.filter(
        (b) => this.comboState.currentStreak >= b.streak
      ).pop();

      if (streakBonus) {
        this.comboState.multiplier = streakBonus.multiplier;
      }

      // Update streak flags
      this.comboState.isOnFire = this.comboState.currentStreak >= 5;
      this.comboState.isUnstoppable = this.comboState.currentStreak >= 10;
      this.comboState.isLegendary = this.comboState.currentStreak >= 20;
    } else {
      this.comboState.currentStreak = 0;
      this.comboState.multiplier = 1.0;
      this.comboState.isOnFire = false;
      this.comboState.isUnstoppable = false;
      this.comboState.isLegendary = false;
    }
  }

  // Calculate points for an answer
  private calculatePoints(
    question: PracticeQuestion,
    isCorrect: boolean,
    timeTaken: number
  ): number {
    if (!isCorrect) return 0;
    if (!this.session) return 0;

    let points = question.points;

    // Apply difficulty multiplier
    points *= DIFFICULTY_MULTIPLIERS[this.session.difficulty];

    // Apply time bonus
    if (question.timeBonus > 0 && this.session.timeLimit) {
      const timePerQuestion = this.session.timeLimit / this.session.questionCount;
      const timeRatio = timeTaken / timePerQuestion;

      for (const { threshold, bonus } of TIME_BONUS_THRESHOLDS) {
        if (timeRatio <= threshold) {
          points *= bonus;
          break;
        }
      }
    }

    // Apply streak multiplier
    points *= this.comboState.multiplier;

    return Math.round(points);
  }

  // Update adaptive difficulty
  private updateAdaptiveDifficulty(isCorrect: boolean): void {
    this.adaptiveState.recentAccuracy.push(isCorrect ? 1 : 0);
    if (this.adaptiveState.recentAccuracy.length > 10) {
      this.adaptiveState.recentAccuracy.shift();
    }

    if (isCorrect) {
      this.adaptiveState.consecutiveCorrect++;
      this.adaptiveState.consecutiveWrong = 0;
    } else {
      this.adaptiveState.consecutiveWrong++;
      this.adaptiveState.consecutiveCorrect = 0;
    }

    // Adjust difficulty
    const recentAvg =
      this.adaptiveState.recentAccuracy.reduce((a, b) => a + b, 0) /
      this.adaptiveState.recentAccuracy.length;

    if (recentAvg > 0.8 && this.adaptiveState.consecutiveCorrect >= 3) {
      this.adaptiveState.difficultyAdjustment = 'increase';
      this.adaptiveState.currentDifficulty = Math.min(
        100,
        this.adaptiveState.currentDifficulty + 5
      );
    } else if (recentAvg < 0.4 && this.adaptiveState.consecutiveWrong >= 2) {
      this.adaptiveState.difficultyAdjustment = 'decrease';
      this.adaptiveState.currentDifficulty = Math.max(
        0,
        this.adaptiveState.currentDifficulty - 5
      );
    } else {
      this.adaptiveState.difficultyAdjustment = 'maintain';
    }
  }

  // Generate feedback for answer
  private generateFeedback(
    question: PracticeQuestion,
    isCorrect: boolean,
    timeTaken: number
  ): AnswerFeedback {
    const encouragements = isCorrect
      ? this.getCorrectEncouragements()
      : this.getIncorrectEncouragements();

    const streakMessage = this.getStreakMessage();

    return {
      isCorrect,
      message: encouragements[Math.floor(Math.random() * encouragements.length)],
      streakMessage,
      solution: isCorrect ? undefined : question.solution,
      hint: isCorrect ? undefined : question.hint,
      timeTaken,
      pointsEarned: question.pointsEarned || 0,
    };
  }

  private getCorrectEncouragements(): string[] {
    const streak = this.comboState.currentStreak;

    if (streak >= 20) {
      return [
        'Legendary performance.',
        'Mathematical mastery achieved.',
        'Absolutely flawless.',
        'You have transcended.',
      ];
    }
    if (streak >= 10) {
      return [
        'Unstoppable.',
        'Nothing can slow you down.',
        'Pure dominance.',
        'Keep this momentum.',
      ];
    }
    if (streak >= 5) {
      return [
        'On fire.',
        'Building momentum.',
        'Sharp focus.',
        'Keep pushing.',
      ];
    }
    return [
      'Correct.',
      'Well done.',
      'Solid work.',
      'Moving forward.',
    ];
  }

  private getIncorrectEncouragements(): string[] {
    return [
      'Review the solution carefully.',
      'This concept will come up again.',
      'Take note of the method.',
      'Understanding the process matters.',
    ];
  }

  private getStreakMessage(): string | undefined {
    const streak = this.comboState.currentStreak;

    if (streak === 5) return 'STREAK: On Fire - 1.2x multiplier active';
    if (streak === 10) return 'STREAK: Unstoppable - 1.5x multiplier active';
    if (streak === 15) return 'STREAK: Dominating - 2.0x multiplier active';
    if (streak === 20) return 'STREAK: Legendary - 2.5x multiplier active';
    if (streak === 30) return 'STREAK: Godlike - 3.0x multiplier active';

    return undefined;
  }

  // End session and calculate final results
  endSession(): PracticeResults {
    if (!this.session) {
      throw new Error('No active session');
    }

    const completedAt = new Date();
    this.session.completedAt = completedAt;

    const totalQuestions = this.session.questions.length;
    const correctAnswers = this.session.questions.filter((q) => q.isCorrect).length;
    const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;

    const totalPoints = this.session.questions.reduce(
      (sum, q) => sum + (q.pointsEarned || 0),
      0
    );
    const maxPoints = this.session.questions.reduce(
      (sum, q) =>
        sum + q.points * DIFFICULTY_MULTIPLIERS[this.session!.difficulty] * 1.5,
      0
    );

    const timeTaken =
      (completedAt.getTime() - this.session.startedAt.getTime()) / 1000;
    const averageTimePerQuestion = timeTaken / totalQuestions;

    // Calculate bonuses
    const streakBonus = Math.round(this.comboState.maxStreak * 10);
    const perfectBonus = accuracy === 1 ? Math.round(totalPoints * 0.25) : 0;
    const speedBonus = this.calculateSpeedBonus(averageTimePerQuestion);

    // Calculate XP and coins
    const baseXP = totalPoints;
    const xpEarned = baseXP + streakBonus + perfectBonus + speedBonus;
    const coinsEarned = Math.round(xpEarned * 0.1);

    // Calculate topic breakdown
    const topicBreakdown = this.calculateTopicBreakdown();

    const results: PracticeResults = {
      totalQuestions,
      correctAnswers,
      accuracy,
      totalPoints,
      maxPoints: Math.round(maxPoints),
      timeTaken: Math.round(timeTaken),
      averageTimePerQuestion: Math.round(averageTimePerQuestion * 10) / 10,
      streakBonus,
      perfectBonus,
      speedBonus,
      xpEarned,
      coinsEarned,
      topicBreakdown,
      newPersonalBests: [],
      unlockedAchievements: [],
    };

    this.session.results = results;
    return results;
  }

  private calculateSpeedBonus(avgTime: number): number {
    // Bonus for fast completion
    if (avgTime < 15) return 100;
    if (avgTime < 30) return 50;
    if (avgTime < 45) return 25;
    return 0;
  }

  private calculateTopicBreakdown(): TopicPerformance[] {
    if (!this.session) return [];

    const topicStats = new Map<string, { correct: number; total: number }>();

    for (const question of this.session.questions) {
      const stats = topicStats.get(question.topicId) || { correct: 0, total: 0 };
      stats.total++;
      if (question.isCorrect) stats.correct++;
      topicStats.set(question.topicId, stats);
    }

    return Array.from(topicStats.entries()).map(([topicId, stats]) => ({
      topicId,
      topicName: topicId, // Would be looked up from syllabus
      correct: stats.correct,
      total: stats.total,
      accuracy: stats.total > 0 ? stats.correct / stats.total : 0,
      masteryChange: this.calculateMasteryChange(stats.correct, stats.total),
    }));
  }

  private calculateMasteryChange(correct: number, total: number): number {
    const accuracy = total > 0 ? correct / total : 0;
    if (accuracy >= 0.9) return 5;
    if (accuracy >= 0.7) return 2;
    if (accuracy >= 0.5) return 0;
    return -2;
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Getters
  getSession(): PracticeSession | null {
    return this.session;
  }

  getComboState(): ComboState {
    return { ...this.comboState };
  }

  getAdaptiveState(): AdaptiveState {
    return { ...this.adaptiveState };
  }
}

export interface AnswerFeedback {
  isCorrect: boolean;
  message: string;
  streakMessage?: string;
  solution?: string;
  hint?: string;
  timeTaken: number;
  pointsEarned: number;
}

// Pre-configured drill templates
export const DRILL_TEMPLATES: DrillConfig[] = [
  {
    name: 'Speed Algebra',
    description: 'Quick-fire algebraic manipulation',
    topicId: 'quadratics',
    difficulty: 'bronze',
    questionCount: 10,
    timePerQuestion: 30,
    requiredAccuracy: 0.7,
    xpReward: 50,
  },
  {
    name: 'Calculus Fundamentals',
    description: 'Master differentiation basics',
    topicId: 'calculus',
    difficulty: 'silver',
    questionCount: 15,
    timePerQuestion: 45,
    requiredAccuracy: 0.6,
    xpReward: 100,
  },
  {
    name: 'Trigonometry Gauntlet',
    description: 'All trig identities and equations',
    topicId: 'trigonometry',
    difficulty: 'gold',
    questionCount: 20,
    timePerQuestion: 60,
    requiredAccuracy: 0.65,
    xpReward: 150,
  },
  {
    name: 'Integration Marathon',
    description: 'Extended integration practice',
    topicId: 'calculus',
    difficulty: 'platinum',
    questionCount: 25,
    timePerQuestion: 90,
    requiredAccuracy: 0.6,
    xpReward: 250,
  },
  {
    name: 'Diamond Challenge',
    description: 'The ultimate test across all topics',
    topicId: 'mixed',
    difficulty: 'diamond',
    questionCount: 30,
    timePerQuestion: 120,
    requiredAccuracy: 0.5,
    xpReward: 500,
  },
];

// Pre-configured exam templates
export const EXAM_TEMPLATES: ExamConfig[] = [
  {
    name: 'Paper 1 Mock',
    description: 'Full Paper 1 examination simulation',
    paperType: 'paper-1',
    duration: 120,
    totalMarks: 80,
    passingScore: 40,
    sections: [
      {
        id: 'section-a',
        name: 'Section A',
        description: 'Short answer questions',
        questionCount: 12,
        marksPerQuestion: 4,
        topics: ['quadratics', 'equations_inequalities', 'surds', 'polynomials'],
        timeRecommended: 48,
      },
      {
        id: 'section-b',
        name: 'Section B',
        description: 'Structured questions',
        questionCount: 4,
        marksPerQuestion: 8,
        topics: ['trigonometry', 'calculus', 'coordinate_geometry'],
        timeRecommended: 72,
      },
    ],
    gradeBoundaries: [
      { grade: 'A1', minPercentage: 85, description: 'Distinction' },
      { grade: 'A2', minPercentage: 75, description: 'Merit' },
      { grade: 'B3', minPercentage: 65, description: 'Credit' },
      { grade: 'B4', minPercentage: 55, description: 'Pass with Credit' },
      { grade: 'C5', minPercentage: 50, description: 'Pass' },
      { grade: 'C6', minPercentage: 45, description: 'Sub-Pass' },
      { grade: 'D7', minPercentage: 40, description: 'Below Average' },
      { grade: 'E8', minPercentage: 30, description: 'Weak' },
      { grade: 'F9', minPercentage: 0, description: 'Fail' },
    ],
  },
  {
    name: 'Paper 2 Mock',
    description: 'Full Paper 2 examination simulation',
    paperType: 'paper-2',
    duration: 150,
    totalMarks: 100,
    passingScore: 50,
    sections: [
      {
        id: 'section-a',
        name: 'Section A',
        description: 'Compulsory questions',
        questionCount: 10,
        marksPerQuestion: 5,
        topics: ['binomial', 'exponentials', 'coordinate_geometry', 'geometry_proofs'],
        timeRecommended: 50,
      },
      {
        id: 'section-b',
        name: 'Section B',
        description: 'Extended response',
        questionCount: 5,
        marksPerQuestion: 10,
        topics: ['calculus', 'trigonometry', 'polynomials'],
        timeRecommended: 100,
      },
    ],
    gradeBoundaries: [
      { grade: 'A1', minPercentage: 85, description: 'Distinction' },
      { grade: 'A2', minPercentage: 75, description: 'Merit' },
      { grade: 'B3', minPercentage: 65, description: 'Credit' },
      { grade: 'B4', minPercentage: 55, description: 'Pass with Credit' },
      { grade: 'C5', minPercentage: 50, description: 'Pass' },
      { grade: 'C6', minPercentage: 45, description: 'Sub-Pass' },
      { grade: 'D7', minPercentage: 40, description: 'Below Average' },
      { grade: 'E8', minPercentage: 30, description: 'Weak' },
      { grade: 'F9', minPercentage: 0, description: 'Fail' },
    ],
  },
];

export default PracticeEngine;
