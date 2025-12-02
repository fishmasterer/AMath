'use client';

import { useState, useCallback, useEffect } from 'react';
import { Lesson, LessonProgress, LessonModule } from '@/lib/lessons/types';
import { useGamification } from './useGamification';

interface LessonProgressState {
  completedLessons: Set<string>;
  lessonProgress: Map<string, LessonProgress>;
  moduleProgress: Map<string, { completed: number; total: number; xpEarned: number }>;
}

interface UseLessonProgressReturn {
  // State
  completedLessons: string[];
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
  getModuleProgress: (moduleId: string) => { completed: number; total: number; xpEarned: number };
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonUnlocked: (lesson: Lesson, allLessons: Lesson[]) => boolean;

  // Actions
  completeLesson: (progress: LessonProgress) => Promise<void>;
  startLesson: (lessonId: string) => void;

  // Loading
  loading: boolean;
}

export function useLessonProgress(): UseLessonProgressReturn {
  const [state, setState] = useState<LessonProgressState>({
    completedLessons: new Set(),
    lessonProgress: new Map(),
    moduleProgress: new Map(),
  });
  const [loading, setLoading] = useState(true);

  const { refreshGamification } = useGamification();

  // Load progress from localStorage (or API in production)
  useEffect(() => {
    const loadProgress = () => {
      try {
        const savedProgress = localStorage.getItem('lessonProgress');
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          setState({
            completedLessons: new Set(parsed.completedLessons || []),
            lessonProgress: new Map(Object.entries(parsed.lessonProgress || {})),
            moduleProgress: new Map(Object.entries(parsed.moduleProgress || {})),
          });
        }
      } catch (error) {
        console.error('Error loading lesson progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newState: LessonProgressState) => {
    try {
      const toSave = {
        completedLessons: Array.from(newState.completedLessons),
        lessonProgress: Object.fromEntries(newState.lessonProgress),
        moduleProgress: Object.fromEntries(newState.moduleProgress),
      };
      localStorage.setItem('lessonProgress', JSON.stringify(toSave));
    } catch (error) {
      console.error('Error saving lesson progress:', error);
    }
  }, []);

  // Complete a lesson
  const completeLesson = useCallback(async (progress: LessonProgress) => {
    try {
      // Update local state
      setState((prev) => {
        const newState = {
          completedLessons: new Set([...prev.completedLessons, progress.lessonId]),
          lessonProgress: new Map(prev.lessonProgress).set(progress.lessonId, progress),
          moduleProgress: prev.moduleProgress,
        };
        saveProgress(newState);
        return newState;
      });

      // Award XP via API
      const response = await fetch('/api/student/gamification/award-xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: progress.xpEarned,
          source: 'lesson',
          sourceId: progress.lessonId,
          description: `Completed lesson: ${progress.lessonId}`,
        }),
      });

      if (!response.ok) {
        console.error('Failed to award XP');
      }

      // Refresh gamification state to show updated XP
      await refreshGamification();
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  }, [saveProgress, refreshGamification]);

  // Start a lesson (track in progress)
  const startLesson = useCallback((lessonId: string) => {
    setState((prev) => {
      const existingProgress = prev.lessonProgress.get(lessonId);
      if (existingProgress) return prev;

      const newProgress: LessonProgress = {
        lessonId,
        startedAt: new Date().toISOString(),
        currentStep: 0,
        stepResults: [],
        totalScore: 0,
        xpEarned: 0,
      };

      const newState = {
        ...prev,
        lessonProgress: new Map(prev.lessonProgress).set(lessonId, newProgress),
      };
      saveProgress(newState);
      return newState;
    });
  }, [saveProgress]);

  // Get lesson progress
  const getLessonProgress = useCallback(
    (lessonId: string) => state.lessonProgress.get(lessonId),
    [state.lessonProgress]
  );

  // Get module progress
  const getModuleProgress = useCallback(
    (moduleId: string) =>
      state.moduleProgress.get(moduleId) || { completed: 0, total: 0, xpEarned: 0 },
    [state.moduleProgress]
  );

  // Check if lesson is completed
  const isLessonCompleted = useCallback(
    (lessonId: string) => state.completedLessons.has(lessonId),
    [state.completedLessons]
  );

  // Check if lesson is unlocked (all prerequisites completed)
  const isLessonUnlocked = useCallback(
    (lesson: Lesson, allLessons: Lesson[]) => {
      if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
        return true;
      }
      return lesson.prerequisites.every((prereqId) =>
        state.completedLessons.has(prereqId)
      );
    },
    [state.completedLessons]
  );

  return {
    completedLessons: Array.from(state.completedLessons),
    getLessonProgress,
    getModuleProgress,
    isLessonCompleted,
    isLessonUnlocked,
    completeLesson,
    startLesson,
    loading,
  };
}

// Hook for module-level progress tracking
export function useModuleProgress(module: LessonModule, lessons: Lesson[]) {
  const { completedLessons, isLessonCompleted, isLessonUnlocked } = useLessonProgress();

  const moduleLessons = lessons.filter((l) => module.lessons.includes(l.id));
  const completedCount = moduleLessons.filter((l) => isLessonCompleted(l.id)).length;
  const totalCount = moduleLessons.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isModuleComplete = completedCount === totalCount;

  const earnedXP = moduleLessons
    .filter((l) => isLessonCompleted(l.id))
    .reduce((sum, l) => sum + l.xpReward, 0);

  const nextLesson = moduleLessons.find(
    (l) => !isLessonCompleted(l.id) && isLessonUnlocked(l, lessons)
  );

  return {
    completedCount,
    totalCount,
    progressPercent,
    isModuleComplete,
    earnedXP,
    totalXP: module.totalXP,
    nextLesson,
    moduleLessons,
  };
}
