// Achievement System
// Check and award achievements based on student progress

import { SupabaseClient } from '@supabase/supabase-js';
import { QuizTopic } from '../types';
import {
  Achievement,
  StudentAchievement,
  AchievementProgress,
  AchievementCheckResult,
  StudentGamification,
} from './types';
import { XP_VALUES } from './constants';

// ============================================================================
// ACHIEVEMENT CHECKING LOGIC
// ============================================================================

interface AchievementContext {
  profile: StudentGamification;
  topicMastery: Record<QuizTopic, number>; // accuracy percentage per topic
  totalXP: number;
  quizzesCompleted: number;
  perfectScores: number;
  currentStreak: number;
  dailyGoalStreak: number;
  currentLevel: number;
  currentHour: number; // For time-based achievements
  currentDay: number; // 0 = Sunday, 6 = Saturday
}

/**
 * Check if an achievement should be unlocked
 */
function checkAchievementCriteria(
  achievement: Achievement,
  context: AchievementContext
): { shouldUnlock: boolean; progress: number; target: number } {
  const { requirement_type, requirement_value, requirement_topic, id } = achievement;

  switch (requirement_type) {
    case 'count':
      return checkCountAchievement(id, requirement_value, context);

    case 'streak':
      return {
        shouldUnlock: context.currentStreak >= requirement_value,
        progress: context.currentStreak,
        target: requirement_value,
      };

    case 'score':
      // Perfect score achievements
      return {
        shouldUnlock: context.perfectScores >= 1,
        progress: context.perfectScores,
        target: requirement_value,
      };

    case 'topic':
      if (requirement_topic) {
        const mastery = context.topicMastery[requirement_topic as QuizTopic] || 0;
        return {
          shouldUnlock: mastery >= requirement_value,
          progress: Math.round(mastery),
          target: requirement_value,
        };
      }
      return { shouldUnlock: false, progress: 0, target: requirement_value };

    case 'special':
      return checkSpecialAchievement(id, context);

    default:
      return { shouldUnlock: false, progress: 0, target: requirement_value };
  }
}

/**
 * Check count-based achievements
 */
function checkCountAchievement(
  achievementId: string,
  target: number,
  context: AchievementContext
): { shouldUnlock: boolean; progress: number; target: number } {
  let progress = 0;

  // Quiz completion achievements
  if (achievementId.startsWith('quiz_') || achievementId === 'first_quiz') {
    progress = context.quizzesCompleted;
  }
  // Perfect score achievements
  else if (achievementId.startsWith('perfect_') || achievementId === 'first_perfect') {
    progress = context.perfectScores;
  }
  // Daily goal streak achievements
  else if (achievementId.startsWith('daily_goal_')) {
    progress = context.dailyGoalStreak;
  }
  // Level achievements
  else if (achievementId.startsWith('level_')) {
    progress = context.currentLevel;
  }
  // XP achievements
  else if (achievementId.startsWith('xp_')) {
    progress = context.totalXP;
  }

  return {
    shouldUnlock: progress >= target,
    progress,
    target,
  };
}

/**
 * Check special achievements (time-based, etc.)
 */
function checkSpecialAchievement(
  achievementId: string,
  context: AchievementContext
): { shouldUnlock: boolean; progress: number; target: number } {
  switch (achievementId) {
    case 'early_bird':
      // Complete activity before 7 AM
      return {
        shouldUnlock: context.currentHour < 7,
        progress: context.currentHour < 7 ? 1 : 0,
        target: 1,
      };

    case 'night_owl':
      // Complete activity after 11 PM
      return {
        shouldUnlock: context.currentHour >= 23,
        progress: context.currentHour >= 23 ? 1 : 0,
        target: 1,
      };

    case 'weekend_warrior':
      // This needs to track weekend activity - simplified for now
      const isWeekend = context.currentDay === 0 || context.currentDay === 6;
      return {
        shouldUnlock: isWeekend,
        progress: isWeekend ? 1 : 0,
        target: 1,
      };

    case 'master_all':
      // Master all topics (90%+ on each)
      const topics: QuizTopic[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'G1', 'G2', 'G3', 'C1'];
      const masteredCount = topics.filter(t => (context.topicMastery[t] || 0) >= 90).length;
      return {
        shouldUnlock: masteredCount === topics.length,
        progress: masteredCount,
        target: topics.length,
      };

    default:
      return { shouldUnlock: false, progress: 0, target: 1 };
  }
}

// ============================================================================
// MAIN ACHIEVEMENT FUNCTIONS
// ============================================================================

/**
 * Get all achievements with progress for a student
 */
export async function getAchievementsWithProgress(
  supabase: SupabaseClient,
  studentId: string
): Promise<AchievementProgress[]> {
  // Get all achievements
  const { data: achievements, error: achievementsError } = await supabase
    .from('achievements')
    .select('*')
    .order('sort_order');

  if (achievementsError || !achievements) {
    throw new Error('Failed to fetch achievements');
  }

  // Get student's unlocked achievements
  const { data: studentAchievements } = await supabase
    .from('student_achievements')
    .select('*')
    .eq('student_id', studentId);

  const unlockedMap = new Map<string, StudentAchievement>();
  (studentAchievements || []).forEach(sa => {
    unlockedMap.set(sa.achievement_id, sa);
  });

  // Get context for checking progress
  const context = await getAchievementContext(supabase, studentId);

  // Calculate progress for each achievement
  return achievements.map(achievement => {
    const unlocked = unlockedMap.get(achievement.id);
    const { progress, target } = checkAchievementCriteria(achievement, context);

    return {
      achievement: achievement as Achievement,
      isUnlocked: !!unlocked,
      progress,
      target,
      percentage: Math.min(100, Math.round((progress / target) * 100)),
      unlockedAt: unlocked?.unlocked_at,
      timesEarned: unlocked?.times_earned,
    };
  });
}

/**
 * Get unlocked achievements for a student
 */
export async function getUnlockedAchievements(
  supabase: SupabaseClient,
  studentId: string
): Promise<StudentAchievement[]> {
  const { data, error } = await supabase
    .from('student_achievements')
    .select(`
      *,
      achievement:achievements(*)
    `)
    .eq('student_id', studentId)
    .order('unlocked_at', { ascending: false });

  if (error) {
    throw new Error('Failed to fetch unlocked achievements');
  }

  return data || [];
}

/**
 * Check for new achievements after an action
 * Returns newly unlocked achievements
 */
export async function checkAndAwardAchievements(
  supabase: SupabaseClient,
  studentId: string,
  profile: StudentGamification
): Promise<Achievement[]> {
  // Get all achievements
  const { data: achievements, error: achievementsError } = await supabase
    .from('achievements')
    .select('*');

  if (achievementsError || !achievements) {
    return [];
  }

  // Get already unlocked achievements
  const { data: studentAchievements } = await supabase
    .from('student_achievements')
    .select('achievement_id')
    .eq('student_id', studentId);

  const alreadyUnlocked = new Set((studentAchievements || []).map(sa => sa.achievement_id));

  // Get context
  const context = await getAchievementContext(supabase, studentId, profile);

  // Check each achievement
  const newlyUnlocked: Achievement[] = [];

  for (const achievement of achievements) {
    // Skip if already unlocked (unless repeatable)
    if (alreadyUnlocked.has(achievement.id) && !achievement.is_repeatable) {
      continue;
    }

    const { shouldUnlock, progress } = checkAchievementCriteria(achievement as Achievement, context);

    if (shouldUnlock) {
      // Award the achievement
      if (alreadyUnlocked.has(achievement.id)) {
        // Increment times_earned for repeatable achievements
        await supabase
          .from('student_achievements')
          .update({
            times_earned: supabase.rpc('increment_times_earned'),
          })
          .eq('student_id', studentId)
          .eq('achievement_id', achievement.id);
      } else {
        // Insert new achievement
        await supabase.from('student_achievements').insert({
          student_id: studentId,
          achievement_id: achievement.id,
          progress,
          notified: false,
        });

        // Award achievement XP bonus
        if (achievement.xp_reward > 0) {
          await supabase.from('xp_transactions').insert({
            student_id: studentId,
            xp_amount: achievement.xp_reward,
            xp_type: 'achievement_bonus',
            reference_id: achievement.id,
            reference_type: 'achievement',
            description: `Achievement unlocked: ${achievement.name}`,
          });

          // Update total XP
          await supabase
            .from('student_gamification')
            .update({
              total_xp: profile.total_xp + achievement.xp_reward,
            })
            .eq('student_id', studentId);
        }

        newlyUnlocked.push(achievement as Achievement);
      }
    } else {
      // Update progress for non-unlocked achievements
      const existingProgress = await supabase
        .from('student_achievements')
        .select('progress')
        .eq('student_id', studentId)
        .eq('achievement_id', achievement.id)
        .single();

      if (existingProgress.data) {
        // Update existing progress record
        await supabase
          .from('student_achievements')
          .update({ progress })
          .eq('student_id', studentId)
          .eq('achievement_id', achievement.id);
      }
    }
  }

  return newlyUnlocked;
}

/**
 * Get achievement context (stats needed for checking achievements)
 */
async function getAchievementContext(
  supabase: SupabaseClient,
  studentId: string,
  profile?: StudentGamification
): Promise<AchievementContext> {
  // Get profile if not provided
  if (!profile) {
    const { data } = await supabase
      .from('student_gamification')
      .select('*')
      .eq('student_id', studentId)
      .single();
    profile = data;
  }

  // Get topic mastery from question results
  const { data: topicStats } = await supabase
    .from('question_results')
    .select('topic, is_correct')
    .eq('attempt_id', supabase.rpc('get_student_attempt_ids', { student_id_param: studentId }));

  // Calculate topic accuracy
  const topicMastery: Record<QuizTopic, number> = {} as Record<QuizTopic, number>;

  if (topicStats) {
    const topicCounts: Record<string, { correct: number; total: number }> = {};

    topicStats.forEach((result: { topic: string; is_correct: boolean }) => {
      if (!topicCounts[result.topic]) {
        topicCounts[result.topic] = { correct: 0, total: 0 };
      }
      topicCounts[result.topic].total++;
      if (result.is_correct) {
        topicCounts[result.topic].correct++;
      }
    });

    Object.entries(topicCounts).forEach(([topic, counts]) => {
      topicMastery[topic as QuizTopic] = (counts.correct / counts.total) * 100;
    });
  }

  // Get current time for time-based achievements
  const now = new Date();
  const sgTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));

  return {
    profile: profile!,
    topicMastery,
    totalXP: profile?.total_xp || 0,
    quizzesCompleted: profile?.total_quizzes_completed || 0,
    perfectScores: profile?.total_perfect_scores || 0,
    currentStreak: profile?.current_streak || 0,
    dailyGoalStreak: profile?.daily_goal_streak || 0,
    currentLevel: profile?.current_level || 1,
    currentHour: sgTime.getHours(),
    currentDay: sgTime.getDay(),
  };
}

/**
 * Mark achievements as notified (user has seen them)
 */
export async function markAchievementsNotified(
  supabase: SupabaseClient,
  studentId: string,
  achievementIds: string[]
): Promise<void> {
  await supabase
    .from('student_achievements')
    .update({ notified: true })
    .eq('student_id', studentId)
    .in('achievement_id', achievementIds);
}

/**
 * Get unnotified achievements
 */
export async function getUnnotifiedAchievements(
  supabase: SupabaseClient,
  studentId: string
): Promise<StudentAchievement[]> {
  const { data, error } = await supabase
    .from('student_achievements')
    .select(`
      *,
      achievement:achievements(*)
    `)
    .eq('student_id', studentId)
    .eq('notified', false)
    .order('unlocked_at', { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
}

/**
 * Get achievement leaderboard (students with most achievements)
 */
export async function getAchievementLeaderboard(
  supabase: SupabaseClient,
  limit: number = 10
): Promise<{ student_id: string; student_name: string; achievement_count: number }[]> {
  const { data, error } = await supabase.rpc('get_achievement_leaderboard', { limit_count: limit });

  if (error) {
    return [];
  }

  return data || [];
}
