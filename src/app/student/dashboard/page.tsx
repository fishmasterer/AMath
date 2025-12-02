'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  XPProgressCardSkeleton,
  XPProgressCardEnhanced,
  StreakCard,
  StreakCardSkeleton,
  DailyGoalCard,
  DailyGoalCardSkeleton,
  QuickActionButton,
  QuickActionButtonSkeleton,
  StudentQuizCard,
  StudentQuizCardSkeleton,
  TopicProgressCard,
  StudentEmptyState,
  XPCelebration,
  LevelUpModal,
  RankProgressDisplay,
  useStudentToast,
} from '@/components/student';
import { useGamification } from '@/lib/hooks/useGamification';

interface Stats {
  quizzesDue: number;
  averageScore: number;
  topicsMastered: number;
  studyStreak: number;
  totalQuizzes: number;
  completedQuizzes: number;
}

interface Profile {
  full_name: string;
}

interface UpcomingQuiz {
  id: string;
  title: string;
  topic: string;
  due_date: string;
  difficulty: 'foundational' | 'intermediate' | 'exam_level';
  total_marks: number;
  time_limit_minutes: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  score?: number;
}

interface TopicProgress {
  code: string;
  name: string;
  progress: number;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
}

interface XPMultiplier {
  type: 'streak' | 'first_of_day' | 'weekend' | 'perfect';
  value: number;
  label: string;
  icon: string;
}

function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-6 space-y-6">
      <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
      <XPProgressCardSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StreakCardSkeleton />
        <DailyGoalCardSkeleton />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <QuickActionButtonSkeleton key={i} />
        ))}
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <StudentQuizCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function StudentDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'home';
  const { showToast } = useStudentToast();

  const [stats, setStats] = useState<Stats | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState<UpcomingQuiz[]>([]);
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Celebration states
  const [showXPCelebration, setShowXPCelebration] = useState(false);
  const [xpCelebrationAmount, setXPCelebrationAmount] = useState(0);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [newLevelInfo, setNewLevelInfo] = useState({ level: 1, rank: 'bronze', title: 'Math Novice' });
  const [showRankProgress, setShowRankProgress] = useState(false);
  const [recentXPGain, setRecentXPGain] = useState<number | undefined>();
  const [previousTotalXP, setPreviousTotalXP] = useState<number>(0);

  const {
    level,
    streak,
    dailyGoal,
    unlockedAchievements,
    recentXP,
    loading: gamificationLoading,
  } = useGamification();

  // Calculate active multipliers
  const getActiveMultipliers = useCallback((): XPMultiplier[] => {
    const multipliers: XPMultiplier[] = [];

    if (streak.currentStreak >= 3) {
      const streakMultiplier = 1 + Math.min(streak.currentStreak * 0.1, 0.5);
      multipliers.push({
        type: 'streak',
        value: parseFloat(streakMultiplier.toFixed(1)),
        label: `${streak.currentStreak} day streak bonus`,
        icon: '🔥',
      });
    }

    if (!streak.isActiveToday) {
      multipliers.push({
        type: 'first_of_day',
        value: 1.5,
        label: 'First quiz of the day bonus',
        icon: '🌅',
      });
    }

    const today = new Date().getDay();
    if (today === 0 || today === 6) {
      multipliers.push({
        type: 'weekend',
        value: 1.2,
        label: 'Weekend bonus',
        icon: '🎉',
      });
    }

    return multipliers;
  }, [streak]);

  // Track XP changes for animations
  useEffect(() => {
    if (level.totalXP > previousTotalXP && previousTotalXP > 0) {
      const xpGained = level.totalXP - previousTotalXP;
      setRecentXPGain(xpGained);

      // Show celebration for significant XP gains
      if (xpGained >= 50) {
        setXPCelebrationAmount(xpGained);
        setShowXPCelebration(true);
      }

      // Clear after animation
      setTimeout(() => setRecentXPGain(undefined), 3000);
    }
    setPreviousTotalXP(level.totalXP);
  }, [level.totalXP, previousTotalXP]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, profileRes, quizzesRes] = await Promise.all([
        fetch('/api/student/stats'),
        fetch('/api/student/profile'),
        fetch('/api/quizzes?limit=5&sortBy=due_date&sortOrder=asc'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
      }

      if (quizzesRes.ok) {
        const quizzesData = await quizzesRes.json();
        setUpcomingQuizzes(quizzesData.quizzes?.slice(0, 5) || []);
      }

      // Mock topic progress for demo
      setTopicProgress([
        { code: 'A1', name: 'Quadratic Functions', progress: 85, totalQuizzes: 5, completedQuizzes: 4, averageScore: 88 },
        { code: 'A2', name: 'Equations & Inequalities', progress: 60, totalQuizzes: 5, completedQuizzes: 3, averageScore: 75 },
        { code: 'A3', name: 'Surds', progress: 40, totalQuizzes: 5, completedQuizzes: 2, averageScore: 70 },
        { code: 'A4', name: 'Polynomials & Partial Fractions', progress: 20, totalQuizzes: 5, completedQuizzes: 1, averageScore: 65 },
        { code: 'G1', name: 'Trigonometric Functions', progress: 0, totalQuizzes: 5, completedQuizzes: 0, averageScore: 0 },
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = () => {
    if (streak.currentStreak >= 7) return "You're on fire! Keep it up!";
    if (streak.currentStreak >= 3) return "Great momentum! Don't break the chain!";
    if (dailyGoal.isComplete) return "Daily goal crushed!";
    return "Let's make today count!";
  };

  // Calculate streak days for the week
  const getStreakDays = () => {
    const today = new Date().getDay();
    const streakDays = new Array(7).fill(false);
    for (let i = 0; i < Math.min(streak.currentStreak, 7); i++) {
      const dayIndex = (today - i + 7) % 7;
      streakDays[dayIndex] = true;
    }
    return streakDays;
  };

  // Handle level click to show rank progress
  const handleLevelClick = () => {
    setShowRankProgress(!showRankProgress);
  };

  // Demo: Trigger level up (for testing)
  const triggerDemoLevelUp = () => {
    setNewLevelInfo({
      level: level.level + 1,
      rank: level.rank,
      title: level.title,
    });
    setShowLevelUpModal(true);
  };

  if (loading || gamificationLoading) {
    return <DashboardLoading />;
  }

  const activeMultipliers = getActiveMultipliers();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* XP Celebration Overlay */}
      <XPCelebration
        show={showXPCelebration}
        amount={xpCelebrationAmount}
        type={xpCelebrationAmount >= 100 ? 'large' : 'medium'}
        onComplete={() => setShowXPCelebration(false)}
      />

      {/* Level Up Modal */}
      <LevelUpModal
        show={showLevelUpModal}
        newLevel={newLevelInfo.level}
        newRank={newLevelInfo.rank}
        newTitle={newLevelInfo.title}
        onClose={() => setShowLevelUpModal(false)}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-bold text-white"
              >
                {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Student'}!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-sm"
              >
                {getMotivationalMessage()}
              </motion.p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Demo XP celebration
                  setXPCelebrationAmount(50);
                  setShowXPCelebration(true);
                }}
                className="flex items-center gap-1 bg-amber-500/20 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <span className="text-lg">⭐</span>
                <span className="text-amber-400 font-bold text-sm">{level.totalXP.toLocaleString()}</span>
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                animate={streak.currentStreak > 0 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1 bg-orange-500/20 px-3 py-1.5 rounded-full"
              >
                <span className="text-lg">{streak.currentStreak > 0 ? '🔥' : '🕯️'}</span>
                <span className={`font-bold text-sm ${streak.currentStreak > 0 ? 'text-orange-400' : 'text-slate-500'}`}>
                  {streak.currentStreak}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 md:p-6 space-y-6">
        {/* Enhanced XP Progress */}
        <XPProgressCardEnhanced
          level={level.level}
          currentXP={level.currentXP}
          xpToNextLevel={level.xpForNextLevel}
          totalXP={level.totalXP}
          rank={level.rank}
          title={level.title}
          activeMultipliers={activeMultipliers}
          recentXPGain={recentXPGain}
          onLevelClick={handleLevelClick}
        />

        {/* Rank Progression (toggleable) */}
        <AnimatePresence>
          {showRankProgress && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <RankProgressDisplay
                currentLevel={level.level}
                currentRank={level.rank}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Streak & Daily Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StreakCard
            currentStreak={streak.currentStreak}
            longestStreak={streak.longestStreak}
            streakDays={getStreakDays()}
          />
          <DailyGoalCard
            completed={dailyGoal.earnedXP}
            target={dailyGoal.targetXP}
            xpEarned={dailyGoal.earnedXP}
          />
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickActionButton
              href="/student/quizzes"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
              label="Quizzes"
              sublabel={stats?.quizzesDue ? `${stats.quizzesDue} due` : 'Practice'}
              color="emerald"
              badge={stats?.quizzesDue ? String(stats.quizzesDue) : undefined}
              delay={0}
            />
            <QuickActionButton
              href="/student/notes"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              label="Learn"
              sublabel="Study notes"
              color="blue"
              delay={0.05}
            />
            <QuickActionButton
              href="/student/models"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              }
              label="Models"
              sublabel="Interactive"
              color="cyan"
              delay={0.1}
            />
            <QuickActionButton
              href="/student/mistakes"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
              label="Mistakes"
              sublabel="Review errors"
              color="orange"
              delay={0.15}
            />
          </div>
        </section>

        {/* Upcoming Quizzes */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">Upcoming Quizzes</h2>
            <Link
              href="/student/quizzes"
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {upcomingQuizzes.length > 0 ? (
              <div className="space-y-3">
                {upcomingQuizzes.map((quiz, index) => (
                  <StudentQuizCard key={quiz.id} quiz={quiz} index={index} />
                ))}
              </div>
            ) : (
              <StudentEmptyState
                icon="quizzes"
                title="No Quizzes Yet"
                description="Your tutor hasn't assigned any quizzes yet. Check back later!"
                action={{
                  label: 'Browse Study Materials',
                  href: '/student/notes',
                }}
              />
            )}
          </AnimatePresence>
        </section>

        {/* Topic Progress */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">Topic Progress</h2>
            <Link
              href="/student/progress"
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1"
            >
              Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="space-y-2">
            {topicProgress.map((topic, index) => (
              <TopicProgressCard key={topic.code} topic={topic} index={index} />
            ))}
          </div>
        </section>

        {/* Recent Achievements */}
        {unlockedAchievements.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-white">Recent Achievements</h2>
              <Link
                href="/student/profile?tab=achievements"
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {unlockedAchievements.slice(0, 4).map((studentAchievement, index) => (
                <motion.div
                  key={studentAchievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-500/20 p-4 text-center"
                >
                  <div className="text-3xl mb-2">{studentAchievement.achievement?.icon || '🏆'}</div>
                  <h4 className="text-white font-medium text-sm truncate">{studentAchievement.achievement?.name || 'Achievement'}</h4>
                  <p className="text-slate-500 text-xs truncate">{studentAchievement.achievement?.description || ''}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Motivational Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8"
        >
          <p className="text-slate-500 text-sm">
            "The only way to learn mathematics is to do mathematics." - Paul Halmos
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <StudentDashboardContent />
    </Suspense>
  );
}
