'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GamificationState,
  StudentGamification,
  LevelInfo,
  StreakInfo,
  DailyGoal,
  AchievementProgress,
  StudentAchievement,
  XPTransaction,
  GamificationNotification,
} from '@/lib/gamification/types';
import {
  LEVEL_THRESHOLDS,
  DAILY_GOAL_CONFIG,
  getLevelFromXP,
  getProgressToNextLevel,
} from '@/lib/gamification/constants';

// Default values for initial state
const DEFAULT_PROFILE: StudentGamification = {
  student_id: '',
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
  created_at: '',
  updated_at: '',
};

const DEFAULT_LEVEL_INFO: LevelInfo = {
  level: 1,
  rank: 'bronze',
  title: 'Math Novice',
  currentXP: 0,
  xpForCurrentLevel: 0,
  xpForNextLevel: 100,
  progressToNextLevel: 0,
  totalXP: 0,
};

const DEFAULT_STREAK_INFO: StreakInfo = {
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  isActiveToday: false,
  streakFreezeCount: 0,
  willLoseStreakTomorrow: false,
};

const DEFAULT_DAILY_GOAL: DailyGoal = {
  targetXP: 50,
  earnedXP: 0,
  progress: 0,
  isComplete: false,
  consecutiveDaysComplete: 0,
};

// Retry with exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok && response.status >= 400 && response.status < 500 && response.status !== 429) {
        return response;
      }

      if (response.ok) {
        return response;
      }

      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      return response;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('Network error');

      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
    }
  }

  throw lastError || new Error('Request failed after retries');
}

export interface UseGamificationReturn {
  // State
  profile: StudentGamification;
  level: LevelInfo;
  streak: StreakInfo;
  dailyGoal: DailyGoal;
  achievements: AchievementProgress[];
  unlockedAchievements: StudentAchievement[];
  recentAchievements: StudentAchievement[];
  recentXP: XPTransaction[];

  // Loading states
  loading: boolean;
  error: string | null;

  // Notifications queue
  notifications: GamificationNotification[];
  dismissNotification: (index: number) => void;
  clearNotifications: () => void;

  // Actions
  refreshGamification: () => Promise<void>;
  updateDailyGoal: (newGoal: number) => Promise<void>;
  markAchievementsNotified: (achievementIds: string[]) => Promise<void>;

  // XP History
  fetchXPHistory: (limit?: number, offset?: number) => Promise<{
    transactions: XPTransaction[];
    pagination: { total: number; hasMore: boolean };
  }>;
}

export function useGamification(): UseGamificationReturn {
  // State
  const [profile, setProfile] = useState<StudentGamification>(DEFAULT_PROFILE);
  const [level, setLevel] = useState<LevelInfo>(DEFAULT_LEVEL_INFO);
  const [streak, setStreak] = useState<StreakInfo>(DEFAULT_STREAK_INFO);
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>(DEFAULT_DAILY_GOAL);
  const [achievements, setAchievements] = useState<AchievementProgress[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<StudentAchievement[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<StudentAchievement[]>([]);
  const [recentXP, setRecentXP] = useState<XPTransaction[]>([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<GamificationNotification[]>([]);

  // Prevent concurrent fetches
  const fetchingRef = useRef(false);

  // Fetch gamification state
  const fetchGamification = useCallback(async () => {
    if (fetchingRef.current) return;

    try {
      fetchingRef.current = true;
      setLoading(true);
      setError(null);

      const response = await fetchWithRetry('/api/student/gamification');

      if (!response.ok) {
        throw new Error('Failed to fetch gamification state');
      }

      const data = await response.json();

      // Update state
      setProfile(data.profile || DEFAULT_PROFILE);
      setLevel(data.level || DEFAULT_LEVEL_INFO);
      setStreak(data.streak || DEFAULT_STREAK_INFO);
      setDailyGoal(data.dailyGoal || DEFAULT_DAILY_GOAL);
      setAchievements(data.achievementProgress || []);
      setUnlockedAchievements(data.unlockedAchievements || []);
      setRecentAchievements(data.recentAchievements || []);
      setRecentXP(data.recentXP || []);
    } catch (err) {
      console.error('Error fetching gamification state:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch gamification state');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, []);

  // Update daily goal
  const updateDailyGoalAction = useCallback(async (newGoal: number) => {
    if (newGoal < DAILY_GOAL_CONFIG.minGoal || newGoal > DAILY_GOAL_CONFIG.maxGoal) {
      throw new Error(`Daily goal must be between ${DAILY_GOAL_CONFIG.minGoal} and ${DAILY_GOAL_CONFIG.maxGoal} XP`);
    }

    try {
      const response = await fetchWithRetry('/api/student/gamification', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dailyGoal: newGoal }),
      });

      if (!response.ok) {
        throw new Error('Failed to update daily goal');
      }

      const data = await response.json();
      setProfile(data.profile || profile);
      setDailyGoal(data.dailyGoal || dailyGoal);
    } catch (err) {
      console.error('Error updating daily goal:', err);
      throw err;
    }
  }, [profile, dailyGoal]);

  // Mark achievements as notified
  const markAchievementsNotifiedAction = useCallback(async (achievementIds: string[]) => {
    try {
      const response = await fetchWithRetry('/api/student/gamification/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievementIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark achievements as notified');
      }

      // Update local state
      setUnlockedAchievements((prev) =>
        prev.map((a) =>
          achievementIds.includes(a.achievement_id) ? { ...a, notified: true } : a
        )
      );
    } catch (err) {
      console.error('Error marking achievements as notified:', err);
    }
  }, []);

  // Fetch XP history
  const fetchXPHistory = useCallback(async (limit = 50, offset = 0) => {
    try {
      const response = await fetchWithRetry(
        `/api/student/gamification/xp-history?limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch XP history');
      }

      const data = await response.json();
      return {
        transactions: data.transactions || [],
        pagination: {
          total: data.pagination?.total || 0,
          hasMore: data.pagination?.hasMore || false,
        },
      };
    } catch (err) {
      console.error('Error fetching XP history:', err);
      return { transactions: [], pagination: { total: 0, hasMore: false } };
    }
  }, []);

  // Notification management
  const dismissNotification = useCallback((index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchGamification();
  }, [fetchGamification]);

  // Poll for updates every 30 seconds (optional, can be disabled)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchGamification();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchGamification]);

  return {
    profile,
    level,
    streak,
    dailyGoal,
    achievements,
    unlockedAchievements,
    recentAchievements,
    recentXP,
    loading,
    error,
    notifications,
    dismissNotification,
    clearNotifications,
    refreshGamification: fetchGamification,
    updateDailyGoal: updateDailyGoalAction,
    markAchievementsNotified: markAchievementsNotifiedAction,
    fetchXPHistory,
  };
}

// Separate hook for just XP display (lighter weight)
export function useXPDisplay() {
  const [totalXP, setTotalXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchXP = async () => {
      try {
        const response = await fetch('/api/student/gamification');
        if (response.ok) {
          const data = await response.json();
          setTotalXP(data.profile?.total_xp || 0);
          setLevel(data.level?.level || 1);
          setProgress(data.level?.progressToNextLevel || 0);
        }
      } catch (err) {
        console.error('Error fetching XP:', err);
      }
    };

    fetchXP();
  }, []);

  return { totalXP, level, progress };
}

// Hook for streak display
export function useStreakDisplay() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isActiveToday, setIsActiveToday] = useState(false);
  const [willLoseStreak, setWillLoseStreak] = useState(false);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const response = await fetch('/api/student/gamification');
        if (response.ok) {
          const data = await response.json();
          setCurrentStreak(data.streak?.currentStreak || 0);
          setIsActiveToday(data.streak?.isActiveToday || false);
          setWillLoseStreak(data.streak?.willLoseStreakTomorrow || false);
        }
      } catch (err) {
        console.error('Error fetching streak:', err);
      }
    };

    fetchStreak();
  }, []);

  return { currentStreak, isActiveToday, willLoseStreak };
}
