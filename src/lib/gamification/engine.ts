// Gamification Engine
// Core logic for XP calculation, level progression, streak management

import { SupabaseClient } from '@supabase/supabase-js';
import { QuizDifficulty, QuizTopic } from '../types';
import {
  XP_VALUES,
  LEVEL_THRESHOLDS,
  STREAK_CONFIG,
  getLevelFromXP,
  getStreakMultiplier,
  getDifficultyMultiplier,
  getCelebrationLevel,
  isStreakMilestone,
  getStreakBonusXP,
} from './constants';
import {
  StudentGamification,
  XPTransaction,
  XPAwardResult,
  XPBreakdown,
  XPType,
  LevelInfo,
  StreakInfo,
  StreakUpdateResult,
  DailyGoal,
  GamificationAction,
  QuizCompletionAction,
  Rank,
  Achievement,
} from './types';

// ============================================================================
// XP CALCULATION
// ============================================================================

/**
 * Calculate XP for completing a quiz
 */
export function calculateQuizXP(action: QuizCompletionAction): XPBreakdown {
  const { score, totalMarks, difficulty, isPerfect, isRetry, previousScore, timeTakenSeconds, timeLimitSeconds } = action;

  // Base XP + marks scored
  const base = XP_VALUES.quiz.base + (score * XP_VALUES.quiz.perMark);

  // Difficulty bonus
  const difficultyMultiplier = getDifficultyMultiplier(difficulty);
  const difficultyBonus = Math.round(base * (difficultyMultiplier - 1));

  // Perfect score bonus
  const perfectBonus = isPerfect ? XP_VALUES.quiz.perfect : 0;

  // Improvement bonus (if retry and improved)
  let improvementBonus = 0;
  if (isRetry && previousScore !== undefined && score > previousScore) {
    improvementBonus = XP_VALUES.quiz.improvement;
  }

  // Speed bonus (under half the time)
  const speedBonus = timeTakenSeconds < (timeLimitSeconds / 2) ? XP_VALUES.quiz.speedBonus : 0;

  return {
    base,
    difficultyBonus,
    streakBonus: 0, // Applied later based on user's streak
    perfectBonus: perfectBonus + improvementBonus + speedBonus,
    firstOfDayBonus: 0, // Applied later
    total: base + difficultyBonus + perfectBonus + improvementBonus + speedBonus,
  };
}

/**
 * Apply streak multiplier and first-of-day bonus to XP breakdown
 */
export function applyBonuses(
  breakdown: XPBreakdown,
  currentStreak: number,
  isFirstOfDay: boolean
): XPBreakdown {
  const streakMultiplier = getStreakMultiplier(currentStreak);
  const streakBonus = Math.round(breakdown.total * (streakMultiplier - 1));
  const firstOfDayBonus = isFirstOfDay ? XP_VALUES.daily.firstOfDay : 0;

  return {
    ...breakdown,
    streakBonus,
    firstOfDayBonus,
    total: breakdown.total + streakBonus + firstOfDayBonus,
  };
}

// ============================================================================
// LEVEL MANAGEMENT
// ============================================================================

/**
 * Get detailed level info from XP
 */
export function getLevelInfo(totalXP: number): LevelInfo {
  const currentThreshold = getLevelFromXP(totalXP);
  const currentLevel = currentThreshold.level;
  const isMaxLevel = currentLevel >= LEVEL_THRESHOLDS.length;

  // Calculate XP progress
  const xpForCurrentLevel = currentThreshold.xp_required;
  const xpForNextLevel = isMaxLevel
    ? currentThreshold.xp_required
    : LEVEL_THRESHOLDS[currentLevel].xp_required;

  const xpIntoLevel = totalXP - xpForCurrentLevel;
  const xpNeededForNext = xpForNextLevel - xpForCurrentLevel;
  const progressToNextLevel = isMaxLevel
    ? 100
    : Math.min(100, Math.round((xpIntoLevel / xpNeededForNext) * 100));

  return {
    level: currentLevel,
    rank: currentThreshold.rank,
    title: currentThreshold.title,
    currentXP: xpIntoLevel,
    xpForCurrentLevel,
    xpForNextLevel,
    progressToNextLevel,
    totalXP,
  };
}

/**
 * Check if leveled up after gaining XP
 */
export function checkLevelUp(
  oldXP: number,
  newXP: number
): { leveledUp: boolean; newLevel?: number; newRank?: Rank; newTitle?: string } {
  const oldLevel = getLevelFromXP(oldXP);
  const newLevel = getLevelFromXP(newXP);

  if (newLevel.level > oldLevel.level) {
    return {
      leveledUp: true,
      newLevel: newLevel.level,
      newRank: newLevel.rank !== oldLevel.rank ? newLevel.rank : undefined,
      newTitle: newLevel.title,
    };
  }

  return { leveledUp: false };
}

// ============================================================================
// STREAK MANAGEMENT
// ============================================================================

/**
 * Get current date in configured timezone
 */
export function getTodayDate(): string {
  const now = new Date();
  // Use Singapore timezone
  const sgDate = new Date(now.toLocaleString('en-US', { timeZone: STREAK_CONFIG.timezone }));
  return sgDate.toISOString().split('T')[0];
}

/**
 * Get yesterday's date in configured timezone
 */
export function getYesterdayDate(): string {
  const today = new Date(getTodayDate());
  today.setDate(today.getDate() - 1);
  return today.toISOString().split('T')[0];
}

/**
 * Check if within grace period (activity counts for previous day)
 */
export function isWithinGracePeriod(): boolean {
  const now = new Date();
  const sgTime = new Date(now.toLocaleString('en-US', { timeZone: STREAK_CONFIG.timezone }));
  return sgTime.getHours() < STREAK_CONFIG.gracePeriodHours;
}

/**
 * Get streak info from gamification profile
 */
export function getStreakInfo(profile: StudentGamification): StreakInfo {
  const today = getTodayDate();
  const yesterday = getYesterdayDate();
  const lastActivity = profile.last_activity_date;

  const isActiveToday = lastActivity === today;
  const wasActiveYesterday = lastActivity === yesterday;

  // Will lose streak if not active today and wasn't active yesterday
  const willLoseStreakTomorrow = !isActiveToday && profile.current_streak > 0;

  return {
    currentStreak: profile.current_streak,
    longestStreak: profile.longest_streak,
    lastActivityDate: lastActivity,
    isActiveToday,
    streakFreezeCount: profile.streak_freeze_count,
    willLoseStreakTomorrow,
  };
}

/**
 * Update streak based on activity
 * Returns the streak update result and any bonus XP earned
 */
export function calculateStreakUpdate(
  currentStreak: number,
  longestStreak: number,
  lastActivityDate: string | null,
  streakFreezeCount: number
): StreakUpdateResult {
  const today = getTodayDate();
  const yesterday = getYesterdayDate();

  // If already active today, no change
  if (lastActivityDate === today) {
    return {
      previousStreak: currentStreak,
      newStreak: currentStreak,
      streakMaintained: true,
      streakLost: false,
      streakIncreased: false,
      usedFreeze: false,
      milestonesReached: [],
    };
  }

  // Was active yesterday - increase streak
  if (lastActivityDate === yesterday) {
    const newStreak = currentStreak + 1;
    const milestones = STREAK_CONFIG.milestones.filter(m => m === newStreak);

    return {
      previousStreak: currentStreak,
      newStreak,
      streakMaintained: true,
      streakLost: false,
      streakIncreased: true,
      usedFreeze: false,
      milestonesReached: milestones,
    };
  }

  // Missed a day - check if we can use a freeze
  if (streakFreezeCount > 0 && lastActivityDate !== null) {
    // Use freeze to maintain streak
    return {
      previousStreak: currentStreak,
      newStreak: currentStreak + 1, // Still increment since we're active now
      streakMaintained: true,
      streakLost: false,
      streakIncreased: true,
      usedFreeze: true,
      milestonesReached: STREAK_CONFIG.milestones.filter(m => m === currentStreak + 1),
    };
  }

  // Lost streak - start fresh at 1
  return {
    previousStreak: currentStreak,
    newStreak: 1,
    streakMaintained: false,
    streakLost: currentStreak > 0,
    streakIncreased: false,
    usedFreeze: false,
    milestonesReached: [],
  };
}

// ============================================================================
// DAILY GOAL
// ============================================================================

/**
 * Get daily goal info
 */
export function getDailyGoalInfo(profile: StudentGamification): DailyGoal {
  const progress = Math.min(100, Math.round((profile.daily_xp_earned / profile.daily_xp_goal) * 100));

  return {
    targetXP: profile.daily_xp_goal,
    earnedXP: profile.daily_xp_earned,
    progress,
    isComplete: profile.daily_xp_earned >= profile.daily_xp_goal,
    consecutiveDaysComplete: profile.daily_goal_streak,
  };
}

/**
 * Check if daily goal was just completed
 */
export function checkDailyGoalComplete(
  previousEarned: number,
  newEarned: number,
  targetXP: number
): boolean {
  return previousEarned < targetXP && newEarned >= targetXP;
}

// ============================================================================
// MAIN XP AWARD FUNCTION
// ============================================================================

/**
 * Award XP for an action and update all gamification state
 * This is the main entry point for the gamification engine
 */
export async function awardXP(
  supabase: SupabaseClient,
  studentId: string,
  action: GamificationAction,
  checkAchievements: (studentId: string, profile: StudentGamification) => Promise<Achievement[]>
): Promise<XPAwardResult> {
  const today = getTodayDate();

  // Get current gamification profile
  const { data: profile, error: profileError } = await supabase
    .from('student_gamification')
    .select('*')
    .eq('student_id', studentId)
    .single();

  if (profileError || !profile) {
    throw new Error('Failed to fetch gamification profile');
  }

  // Check if first activity of the day
  const isFirstOfDay = profile.last_activity_date !== today;

  // Calculate base XP based on action type
  let baseBreakdown: XPBreakdown;
  let xpType: XPType;
  let referenceId: string | undefined;
  let referenceType: string | undefined;
  let description: string | undefined;

  switch (action.type) {
    case 'quiz_completion':
      baseBreakdown = calculateQuizXP(action);
      xpType = action.isPerfect ? 'quiz_perfect' : 'quiz_completion';
      referenceId = action.quizId;
      referenceType = 'quiz';
      description = action.isPerfect
        ? `Perfect score on quiz!`
        : `Completed quiz (${action.score}/${action.totalMarks})`;
      break;

    case 'lesson_completion':
      baseBreakdown = {
        base: XP_VALUES.lesson.base,
        difficultyBonus: 0,
        streakBonus: 0,
        perfectBonus: 0,
        firstOfDayBonus: 0,
        total: XP_VALUES.lesson.base,
      };
      xpType = 'lesson_completion';
      referenceId = action.lessonId;
      referenceType = 'lesson';
      description = `Completed lesson on ${action.topic}`;
      break;

    case 'practice_session':
      const practiceBase = XP_VALUES.practice.base +
        (action.correctAnswers * XP_VALUES.practice.perCorrectAnswer);
      baseBreakdown = {
        base: practiceBase,
        difficultyBonus: 0,
        streakBonus: 0,
        perfectBonus: 0,
        firstOfDayBonus: 0,
        total: practiceBase,
      };
      xpType = 'practice_session';
      referenceType = 'practice';
      description = `Practice session: ${action.correctAnswers}/${action.questionsAnswered} correct`;
      break;

    case 'challenge_completion':
      baseBreakdown = {
        base: XP_VALUES.challenge.completion,
        difficultyBonus: 0,
        streakBonus: 0,
        perfectBonus: action.score === 100 ? XP_VALUES.challenge.perfect : 0,
        firstOfDayBonus: 0,
        total: XP_VALUES.challenge.completion + (action.score === 100 ? XP_VALUES.challenge.perfect : 0),
      };
      xpType = 'challenge_completion';
      referenceId = action.challengeId;
      referenceType = 'challenge';
      description = `Completed challenge`;
      break;

    default:
      throw new Error('Unknown action type');
  }

  // Apply streak multiplier and first-of-day bonus
  const finalBreakdown = applyBonuses(baseBreakdown, profile.current_streak, isFirstOfDay);

  // Calculate streak update
  const streakUpdate = calculateStreakUpdate(
    profile.current_streak,
    profile.longest_streak,
    profile.last_activity_date,
    profile.streak_freeze_count
  );

  // Calculate new totals
  const newTotalXP = profile.total_xp + finalBreakdown.total;
  const newDailyXP = (profile.last_activity_date === today ? profile.daily_xp_earned : 0) + finalBreakdown.total;

  // Check for level up
  const levelUpResult = checkLevelUp(profile.total_xp, newTotalXP);

  // Check if daily goal was just completed
  const previousDailyXP = profile.last_activity_date === today ? profile.daily_xp_earned : 0;
  const dailyGoalJustCompleted = checkDailyGoalComplete(previousDailyXP, newDailyXP, profile.daily_xp_goal);

  // Calculate daily goal streak
  let newDailyGoalStreak = profile.daily_goal_streak;
  if (dailyGoalJustCompleted) {
    newDailyGoalStreak = profile.daily_goal_streak + 1;
  }

  // Award streak milestone bonus if applicable
  let streakBonusXP = 0;
  if (streakUpdate.milestonesReached.length > 0) {
    streakBonusXP = streakUpdate.milestonesReached.reduce((sum, m) => sum + getStreakBonusXP(m), 0);
  }

  // Award daily goal bonus
  let dailyGoalBonusXP = 0;
  if (dailyGoalJustCompleted) {
    dailyGoalBonusXP = XP_VALUES.daily.goalComplete;

    // Check for daily goal streaks
    if (newDailyGoalStreak === 3) dailyGoalBonusXP += XP_VALUES.daily.goalStreak3;
    if (newDailyGoalStreak === 7) dailyGoalBonusXP += XP_VALUES.daily.goalStreak7;
  }

  // Add bonus XP to total
  const totalWithBonuses = newTotalXP + streakBonusXP + dailyGoalBonusXP;

  // Update gamification profile
  const updateData: Partial<StudentGamification> = {
    total_xp: totalWithBonuses,
    current_level: getLevelFromXP(totalWithBonuses).level,
    current_rank: getLevelFromXP(totalWithBonuses).rank,
    current_streak: streakUpdate.newStreak,
    longest_streak: Math.max(profile.longest_streak, streakUpdate.newStreak),
    last_activity_date: today,
    streak_freeze_count: streakUpdate.usedFreeze
      ? profile.streak_freeze_count - 1
      : profile.streak_freeze_count,
    daily_xp_earned: newDailyXP + streakBonusXP + dailyGoalBonusXP,
    daily_goal_streak: newDailyGoalStreak,
  };

  // Update stats based on action type
  if (action.type === 'quiz_completion') {
    updateData.total_quizzes_completed = profile.total_quizzes_completed + 1;
    if (action.isPerfect) {
      updateData.total_perfect_scores = profile.total_perfect_scores + 1;
    }
  } else if (action.type === 'lesson_completion') {
    updateData.total_lessons_completed = profile.total_lessons_completed + 1;
  } else if (action.type === 'practice_session') {
    updateData.total_practice_sessions = profile.total_practice_sessions + 1;
  }

  // Save updated profile
  const { error: updateError } = await supabase
    .from('student_gamification')
    .update(updateData)
    .eq('student_id', studentId);

  if (updateError) {
    throw new Error('Failed to update gamification profile');
  }

  // Record XP transaction
  const { error: txError } = await supabase.from('xp_transactions').insert({
    student_id: studentId,
    xp_amount: finalBreakdown.total,
    xp_type: xpType,
    reference_id: referenceId,
    reference_type: referenceType,
    difficulty_multiplier: action.type === 'quiz_completion'
      ? getDifficultyMultiplier(action.difficulty)
      : 1.0,
    streak_multiplier: getStreakMultiplier(profile.current_streak),
    description,
  });

  if (txError) {
    console.error('Failed to record XP transaction:', txError);
  }

  // Record bonus XP transactions
  if (streakBonusXP > 0) {
    await supabase.from('xp_transactions').insert({
      student_id: studentId,
      xp_amount: streakBonusXP,
      xp_type: 'streak_bonus',
      description: `${streakUpdate.newStreak}-day streak bonus!`,
    });
  }

  if (dailyGoalBonusXP > 0) {
    await supabase.from('xp_transactions').insert({
      student_id: studentId,
      xp_amount: dailyGoalBonusXP,
      xp_type: 'daily_goal_bonus',
      description: `Daily goal completed!`,
    });
  }

  // Update or create daily activity record
  await supabase.from('daily_activity').upsert({
    student_id: studentId,
    activity_date: today,
    xp_earned: newDailyXP + streakBonusXP + dailyGoalBonusXP,
    quizzes_completed: action.type === 'quiz_completion'
      ? (profile.last_activity_date === today ? 1 : 1)
      : 0,
    lessons_completed: action.type === 'lesson_completion' ? 1 : 0,
    practice_sessions: action.type === 'practice_session' ? 1 : 0,
    daily_goal_met: newDailyXP + streakBonusXP + dailyGoalBonusXP >= profile.daily_xp_goal,
  }, {
    onConflict: 'student_id,activity_date',
  });

  // Check for unlocked achievements
  const updatedProfile = { ...profile, ...updateData } as StudentGamification;
  const achievementsUnlocked = await checkAchievements(studentId, updatedProfile);

  return {
    xpAwarded: finalBreakdown.total + streakBonusXP + dailyGoalBonusXP,
    breakdown: finalBreakdown,
    newTotalXP: totalWithBonuses,
    leveledUp: levelUpResult.leveledUp,
    newLevel: levelUpResult.newLevel,
    newRank: levelUpResult.newRank,
    achievementsUnlocked,
    dailyGoalMet: dailyGoalJustCompleted,
    streakUpdated: streakUpdate.streakIncreased,
    newStreak: streakUpdate.streakIncreased ? streakUpdate.newStreak : undefined,
  };
}

// ============================================================================
// PROFILE INITIALIZATION
// ============================================================================

/**
 * Initialize gamification profile for a new student
 */
export async function initializeGamificationProfile(
  supabase: SupabaseClient,
  studentId: string
): Promise<StudentGamification> {
  const defaultProfile: Partial<StudentGamification> = {
    student_id: studentId,
    total_xp: 0,
    current_level: 1,
    current_rank: 'bronze',
    current_streak: 0,
    longest_streak: 0,
    last_activity_date: null,
    streak_freeze_count: 0,
    daily_xp_goal: 50,
    daily_xp_earned: 0,
    daily_goal_streak: 0,
    total_quizzes_completed: 0,
    total_perfect_scores: 0,
    total_lessons_completed: 0,
    total_practice_sessions: 0,
  };

  const { data, error } = await supabase
    .from('student_gamification')
    .upsert(defaultProfile, { onConflict: 'student_id' })
    .select()
    .single();

  if (error) {
    throw new Error('Failed to initialize gamification profile');
  }

  return data;
}

/**
 * Get full gamification state for a student
 */
export async function getGamificationState(
  supabase: SupabaseClient,
  studentId: string
): Promise<{
  profile: StudentGamification;
  level: LevelInfo;
  streak: StreakInfo;
  dailyGoal: DailyGoal;
  recentXP: XPTransaction[];
}> {
  // Get profile
  let { data: profile, error } = await supabase
    .from('student_gamification')
    .select('*')
    .eq('student_id', studentId)
    .single();

  // If no profile, initialize one
  if (error || !profile) {
    profile = await initializeGamificationProfile(supabase, studentId);
  }

  // Check if we need to reset daily XP (new day)
  const today = getTodayDate();
  if (profile.last_activity_date !== today && profile.last_activity_date !== null) {
    // Reset daily XP for new day
    await supabase
      .from('student_gamification')
      .update({ daily_xp_earned: 0 })
      .eq('student_id', studentId);
    profile.daily_xp_earned = 0;
  }

  // Get recent XP transactions
  const { data: recentXP } = await supabase
    .from('xp_transactions')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
    .limit(10);

  return {
    profile,
    level: getLevelInfo(profile.total_xp),
    streak: getStreakInfo(profile),
    dailyGoal: getDailyGoalInfo(profile),
    recentXP: recentXP || [],
  };
}

/**
 * Update daily XP goal
 */
export async function updateDailyGoal(
  supabase: SupabaseClient,
  studentId: string,
  newGoal: number
): Promise<void> {
  const { error } = await supabase
    .from('student_gamification')
    .update({ daily_xp_goal: newGoal })
    .eq('student_id', studentId);

  if (error) {
    throw new Error('Failed to update daily goal');
  }
}
