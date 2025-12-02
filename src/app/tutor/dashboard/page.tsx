'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileNav, StatCard, StatCardSkeleton, QuizCard, QuizCardSkeleton, EmptyState, useToast } from '@/components/tutor';
import { renderLatex } from '@/components/LatexRenderer';
import { TOPIC_NAMES } from '@/lib/types';

interface Quiz {
  id: string;
  title: string;
  topic: string;
  week: number;
  difficulty: string;
  time_limit_minutes: number;
  published: boolean;
  created_at: string;
  total_marks?: number;
  questions?: any[];
}

interface AnalyticsData {
  hasData: boolean;
  overview: {
    total_quizzes: number;
    published_quizzes: number;
    total_attempts: number;
    completed_attempts: number;
    average_score: number;
    active_students: number;
  };
  topicPerformance?: Array<{
    topic: string;
    topic_name: string;
    attempts: number;
    average_score: number;
  }>;
  recentSubmissions?: Array<{
    attempt_id: string;
    quiz_title: string;
    student_id: string;
    score: number;
    total_marks: number;
    percentage: number;
    submitted_at: string;
  }>;
}

type Tab = 'home' | 'upload' | 'manage' | 'analytics';

export default function TutorDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [jsonInput, setJsonInput] = useState('');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [viewingQuiz, setViewingQuiz] = useState<Quiz | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    published: 'all',
    topic: '',
    difficulty: '',
  });

  // Handle tab from URL params
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['home', 'upload', 'manage', 'analytics'].includes(tab)) {
      setActiveTab(tab as Tab);
    }
  }, [searchParams]);

  // Auth check
  useEffect(() => {
    const isAuth = sessionStorage.getItem('tutorAuth');
    if (!isAuth) {
      router.push('/tutor');
    }
  }, [router]);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'manage') fetchQuizzes();
    if (activeTab === 'analytics') fetchAnalytics();
    if (activeTab === 'home') {
      fetchQuizzes();
      fetchAnalytics();
    }
  }, [activeTab]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.published !== 'all') params.append('published', filters.published);
      if (filters.topic) params.append('topic', filters.topic);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      params.append('sortBy', 'created_at');
      params.append('sortOrder', 'desc');

      const response = await fetch(`/api/tutor/quizzes?${params.toString()}`);
      const data = await response.json();
      if (response.ok) setQuizzes(data.quizzes || []);
    } catch (error) {
      showToast('error', 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      const response = await fetch('/api/tutor/analytics');
      const data = await response.json();
      if (response.ok) setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const togglePublished = async (quizId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/tutor/quizzes/${quizId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (response.ok) {
        setQuizzes(quizzes.map(q => q.id === quizId ? { ...q, published: !currentStatus } : q));
        showToast('success', `Quiz ${!currentStatus ? 'published' : 'unpublished'}!`);
      } else {
        showToast('error', 'Failed to update quiz');
      }
    } catch (error) {
      showToast('error', 'Error updating quiz');
    }
  };

  const deleteQuiz = async (quizId: string) => {
    if (!confirm('Delete this quiz? This cannot be undone.')) return;

    try {
      const response = await fetch(`/api/tutor/quizzes/${quizId}`, { method: 'DELETE' });
      if (response.ok) {
        setQuizzes(quizzes.filter(q => q.id !== quizId));
        showToast('success', 'Quiz deleted');
      } else {
        showToast('error', 'Failed to delete quiz');
      }
    } catch (error) {
      showToast('error', 'Error deleting quiz');
    }
  };

  const viewQuizDetails = async (quizId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tutor/quizzes/${quizId}`);
      const data = await response.json();
      if (response.ok) setViewingQuiz(data.quiz);
    } catch (error) {
      showToast('error', 'Error loading quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      const quizData = JSON.parse(jsonInput);
      const response = await fetch('/api/quizzes/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });
      const result = await response.json();

      if (result.success) {
        showToast('success', `Quiz "${result.data.title}" uploaded!`);
        setJsonInput('');
        fetchQuizzes();
      } else {
        showToast('error', result.error || 'Upload failed');
      }
    } catch (error) {
      showToast('error', error instanceof Error ? error.message : 'Invalid JSON');
    }
  };

  const copyPromptTemplate = async () => {
    const template = `Generate an O-Level Additional Mathematics quiz with [NUMBER] questions on [TOPIC] at [DIFFICULTY] level in JSON format.

Required fields:
- title: Quiz name
- topic: A1-A6, G1-G3, or C1
- week: 1-52
- difficulty: foundational | intermediate | exam_level
- time_limit_minutes: 15-50
- published: false (for draft)
- questions: Array with id, type (mcq/multi_select), question, options, correctAnswer/correctAnswers, marks, explanation

Use LaTeX for math: $x^2$, $\\frac{a}{b}$, $\\sqrt{x}$`;

    try {
      await navigator.clipboard.writeText(template);
      showToast('success', 'Prompt copied!');
    } catch {
      showToast('error', 'Failed to copy');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tutorAuth');
    router.push('/');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setViewingQuiz(null);
    router.push(`/tutor/dashboard?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

      {/* Navigation */}
      <MobileNav />

      {/* Main Content */}
      <main className="relative z-10 md:ml-20 lg:ml-64 pb-24 md:pb-8">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 md:hidden bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <h1 className="text-lg font-bold text-white">AMath Tutor</h1>
              <p className="text-xs text-slate-400">
                {activeTab === 'home' && 'Dashboard'}
                {activeTab === 'upload' && 'Create Quiz'}
                {activeTab === 'manage' && 'Manage Quizzes'}
                {activeTab === 'analytics' && 'Analytics'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

          {/* Mobile Tab Pills */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {(['home', 'upload', 'manage', 'analytics'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
                }`}
              >
                {tab === 'home' && 'Home'}
                {tab === 'upload' && 'Create'}
                {tab === 'manage' && 'Quizzes'}
                {tab === 'analytics' && 'Stats'}
              </button>
            ))}
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:block sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {activeTab === 'home' && 'Dashboard'}
                {activeTab === 'upload' && 'Create Quiz'}
                {activeTab === 'manage' && 'Manage Quizzes'}
                {activeTab === 'analytics' && 'Analytics'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {activeTab === 'home' && 'Welcome back! Here\'s your overview.'}
                {activeTab === 'upload' && 'Upload a new quiz using JSON format.'}
                {activeTab === 'manage' && `${quizzes.length} quizzes total`}
                {activeTab === 'analytics' && 'Track student performance and progress.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/tutor/session-planner"
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Session Planner
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="px-4 md:px-6 py-6">
          <AnimatePresence mode="wait">
            {/* HOME TAB */}
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {analyticsLoading ? (
                    <>
                      <StatCardSkeleton />
                      <StatCardSkeleton />
                      <StatCardSkeleton />
                      <StatCardSkeleton />
                    </>
                  ) : (
                    <>
                      <StatCard
                        label="Total Quizzes"
                        value={analytics?.overview.total_quizzes || 0}
                        subtitle={`${analytics?.overview.published_quizzes || 0} published`}
                        color="cyan"
                        icon={
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        }
                        onClick={() => handleTabChange('manage')}
                      />
                      <StatCard
                        label="Active Students"
                        value={analytics?.overview.active_students || 0}
                        color="blue"
                        icon={
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        }
                      />
                      <StatCard
                        label="Avg Score"
                        value={analytics?.overview.average_score ? `${analytics.overview.average_score}%` : 'N/A'}
                        color="green"
                        icon={
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        }
                        onClick={() => handleTabChange('analytics')}
                      />
                      <StatCard
                        label="Attempts"
                        value={analytics?.overview.total_attempts || 0}
                        subtitle={`${analytics?.overview.completed_attempts || 0} completed`}
                        color="purple"
                        icon={
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        }
                      />
                    </>
                  )}
                </div>

                {/* Quick Actions */}
                <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTabChange('upload')}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Create Quiz</h3>
                      <p className="text-sm text-slate-400">Upload new quiz JSON</p>
                    </div>
                  </motion.button>

                  <Link href="/tutor/submissions">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Review Work</h3>
                        <p className="text-sm text-slate-400">Check submissions</p>
                      </div>
                    </motion.div>
                  </Link>

                  <Link href="/tutor/question-bank">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Question Bank</h3>
                        <p className="text-sm text-slate-400">Browse questions</p>
                      </div>
                    </motion.div>
                  </Link>
                </div>

                {/* Recent Quizzes */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Recent Quizzes</h2>
                  <button
                    onClick={() => handleTabChange('manage')}
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    View all
                  </button>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    <QuizCardSkeleton />
                    <QuizCardSkeleton />
                    <QuizCardSkeleton />
                  </div>
                ) : quizzes.length === 0 ? (
                  <EmptyState
                    icon="quizzes"
                    title="No quizzes yet"
                    description="Create your first quiz to get started"
                    action={{ label: 'Create Quiz', onClick: () => handleTabChange('upload') }}
                  />
                ) : (
                  <div className="space-y-3">
                    {quizzes.slice(0, 5).map((quiz) => (
                      <QuizCard
                        key={quiz.id}
                        quiz={quiz}
                        onView={viewQuizDetails}
                        onTogglePublish={togglePublished}
                        onDelete={deleteQuiz}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* UPLOAD TAB */}
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">Upload Quiz JSON</h2>
                    <button
                      onClick={copyPromptTemplate}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy AI Prompt
                    </button>
                  </div>

                  <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='{"title": "Quiz Name", "topic": "A1", ...}'
                    className="w-full h-64 md:h-80 bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-slate-300 font-mono text-sm focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none"
                  />

                  <button
                    onClick={handleUpload}
                    disabled={!jsonInput.trim()}
                    className="w-full mt-4 py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-cyan-500/20 disabled:shadow-none"
                  >
                    Upload Quiz
                  </button>

                  <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Quick Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">1.</span>
                        <span>Click "Copy AI Prompt" to get a template for ChatGPT/Claude</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">2.</span>
                        <span>Paste the generated JSON above</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">3.</span>
                        <span>Set <code className="text-cyan-400 bg-cyan-500/10 px-1 rounded">published: false</code> to save as draft</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MANAGE TAB */}
            {activeTab === 'manage' && (
              <motion.div
                key="manage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewingQuiz ? (
                  // Quiz Detail View
                  <div>
                    <button
                      onClick={() => setViewingQuiz(null)}
                      className="flex items-center gap-2 mb-6 text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to list
                    </button>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">{viewingQuiz.title}</h2>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                              {viewingQuiz.topic}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                              {viewingQuiz.difficulty}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                              {viewingQuiz.time_limit_minutes} min
                            </span>
                            {viewingQuiz.total_marks && (
                              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                                {viewingQuiz.total_marks} marks
                              </span>
                            )}
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-xl text-sm font-medium ${
                          viewingQuiz.published
                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                            : 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                        }`}>
                          {viewingQuiz.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {viewingQuiz.questions?.map((q: any, idx: number) => (
                        <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">
                              Q{q.id}. ({q.marks} mark{q.marks > 1 ? 's' : ''})
                            </h3>
                            <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium">
                              {q.type === 'mcq' ? 'MCQ' : 'Multi-Select'}
                            </span>
                          </div>

                          <div className="mb-4 text-slate-300">{renderLatex(q.question || '')}</div>

                          <div className="space-y-2 mb-4">
                            {q.options?.map((opt: string, i: number) => {
                              const letter = String.fromCharCode(65 + i);
                              const isCorrect = q.type === 'mcq'
                                ? q.correctAnswer === letter
                                : q.correctAnswers?.includes(letter);

                              return (
                                <div
                                  key={i}
                                  className={`p-3 rounded-xl border ${
                                    isCorrect
                                      ? 'bg-green-500/10 border-green-500/30 text-green-300'
                                      : 'bg-slate-900/50 border-slate-700/50 text-slate-300'
                                  }`}
                                >
                                  <span className="font-semibold">{letter}.</span> {renderLatex(opt)}
                                  {isCorrect && <span className="ml-2 text-green-400 text-sm">Correct</span>}
                                </div>
                              );
                            })}
                          </div>

                          {q.explanation && (
                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                              <p className="text-sm font-semibold text-blue-400 mb-2">Explanation:</p>
                              <div className="text-sm text-slate-300">{renderLatex(q.explanation)}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Quiz List View
                  <div>
                    {/* Search & Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search..."
                          value={filters.search}
                          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 text-sm focus:border-cyan-500/50 focus:outline-none"
                        />
                      </div>
                      <select
                        value={filters.published}
                        onChange={(e) => setFilters({ ...filters, published: e.target.value })}
                        className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 text-sm focus:border-cyan-500/50 focus:outline-none"
                      >
                        <option value="all">All Status</option>
                        <option value="true">Published</option>
                        <option value="false">Draft</option>
                      </select>
                      <select
                        value={filters.topic}
                        onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
                        className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 text-sm focus:border-cyan-500/50 focus:outline-none"
                      >
                        <option value="">All Topics</option>
                        {Object.entries(TOPIC_NAMES).map(([key, name]) => (
                          <option key={key} value={key}>{key} - {name}</option>
                        ))}
                      </select>
                      <select
                        value={filters.difficulty}
                        onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                        className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 text-sm focus:border-cyan-500/50 focus:outline-none"
                      >
                        <option value="">All Difficulties</option>
                        <option value="foundational">Foundation</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="exam_level">Exam Level</option>
                      </select>
                    </div>

                    {/* Quiz List */}
                    {loading ? (
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => <QuizCardSkeleton key={i} />)}
                      </div>
                    ) : quizzes.length === 0 ? (
                      <EmptyState
                        icon="search"
                        title="No quizzes found"
                        description="Try adjusting your filters or create a new quiz"
                        action={{ label: 'Create Quiz', onClick: () => handleTabChange('upload') }}
                      />
                    ) : (
                      <div className="space-y-3">
                        {quizzes.map((quiz) => (
                          <QuizCard
                            key={quiz.id}
                            quiz={quiz}
                            onView={viewQuizDetails}
                            onTogglePublish={togglePublished}
                            onDelete={deleteQuiz}
                          />
                        ))}
                      </div>
                    )}

                    {/* Mobile hint */}
                    <p className="md:hidden text-center text-slate-500 text-sm mt-6">
                      Swipe left on a quiz for quick actions
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {analyticsLoading ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                  </div>
                ) : !analytics?.hasData ? (
                  <EmptyState
                    icon="analytics"
                    title="No data yet"
                    description="Analytics will appear once students start taking quizzes"
                  />
                ) : (
                  <div className="space-y-8">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <StatCard
                        label="Total Quizzes"
                        value={analytics.overview.total_quizzes}
                        subtitle={`${analytics.overview.published_quizzes} published`}
                        color="cyan"
                        icon={
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        }
                      />
                      <StatCard
                        label="Total Attempts"
                        value={analytics.overview.total_attempts}
                        subtitle={`${analytics.overview.completed_attempts} completed`}
                        color="blue"
                        icon={
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        }
                      />
                      <StatCard
                        label="Average Score"
                        value={`${analytics.overview.average_score}%`}
                        color="green"
                        icon={
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        }
                      />
                      <StatCard
                        label="Active Students"
                        value={analytics.overview.active_students}
                        color="purple"
                        icon={
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        }
                      />
                    </div>

                    {/* Topic Performance */}
                    {analytics.topicPerformance && analytics.topicPerformance.length > 0 && (
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">Performance by Topic</h3>
                        <div className="space-y-4">
                          {analytics.topicPerformance.map((topic) => (
                            <div key={topic.topic}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <span className="text-cyan-400 font-mono font-semibold">{topic.topic}</span>
                                  <span className="text-slate-400 text-sm hidden sm:inline">{topic.topic_name}</span>
                                </div>
                                <span className="text-white font-bold">{topic.average_score}%</span>
                              </div>
                              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${topic.average_score}%` }}
                                  transition={{ duration: 1, ease: 'easeOut' }}
                                  className={`h-full rounded-full ${
                                    topic.average_score >= 80
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                                      : topic.average_score >= 60
                                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                                      : 'bg-gradient-to-r from-orange-500 to-yellow-400'
                                  }`}
                                />
                              </div>
                              <p className="text-xs text-slate-500 mt-1">{topic.attempts} attempts</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Submissions */}
                    {analytics.recentSubmissions && analytics.recentSubmissions.length > 0 && (
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-white">Recent Submissions</h3>
                          <Link
                            href="/tutor/submissions"
                            className="text-sm text-cyan-400 hover:text-cyan-300"
                          >
                            View all
                          </Link>
                        </div>
                        <div className="space-y-3">
                          {analytics.recentSubmissions.map((sub) => (
                            <Link
                              key={sub.attempt_id}
                              href={`/tutor/submissions/${sub.attempt_id}`}
                              className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                            >
                              <div className="min-w-0">
                                <p className="text-white font-medium truncate">{sub.quiz_title}</p>
                                <p className="text-sm text-slate-500">
                                  {new Date(sub.submitted_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <p className={`text-xl font-bold ${
                                  sub.percentage >= 80 ? 'text-green-400' :
                                  sub.percentage >= 60 ? 'text-blue-400' : 'text-orange-400'
                                }`}>
                                  {sub.percentage}%
                                </p>
                                <p className="text-xs text-slate-500">{sub.score}/{sub.total_marks}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
