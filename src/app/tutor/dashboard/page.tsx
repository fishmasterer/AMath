'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  questions?: any[]; // Full quiz data when viewing details
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
  difficultyBreakdown?: Array<{
    difficulty: string;
    attempts: number;
    average_score: number;
  }>;
  scoreDistribution?: Array<{
    range: string;
    count: number;
    percentage: number;
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

export default function TutorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [jsonInput, setJsonInput] = useState('');
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    published: 'all', // 'all', 'true', 'false'
    topic: '',
    difficulty: ''
  });
  const [copyStatus, setCopyStatus] = useState('');
  const [viewingQuiz, setViewingQuiz] = useState<Quiz | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('tutorAuth');
    if (!isAuth) {
      router.push('/tutor');
    }
  }, [router]);

  // Fetch quizzes when manage tab is active
  useEffect(() => {
    if (activeTab === 'manage') {
      fetchQuizzes();
    }
  }, [activeTab, filters]);

  // Fetch analytics when analytics tab is active
  useEffect(() => {
    if (activeTab === 'analytics') {
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

      if (response.ok) {
        setQuizzes(data.quizzes || []);
      } else {
        console.error('Failed to fetch quizzes:', data.error);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      const response = await fetch('/api/tutor/analytics');
      const data = await response.json();

      if (response.ok) {
        setAnalytics(data);
      } else {
        console.error('Failed to fetch analytics:', data.error);
      }
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
        body: JSON.stringify({ published: !currentStatus })
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state
        setQuizzes(quizzes.map(q =>
          q.id === quizId ? { ...q, published: !currentStatus } : q
        ));
        setUploadStatus({
          type: 'success',
          message: `Quiz ${!currentStatus ? 'published' : 'unpublished'} successfully!`
        });
        setTimeout(() => setUploadStatus({ type: null, message: '' }), 3000);
      } else {
        setUploadStatus({ type: 'error', message: data.error || 'Failed to update quiz' });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Error updating quiz' });
      console.error('Error toggling published status:', error);
    }
  };

  const deleteQuiz = async (quizId: string) => {
    if (!confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/tutor/quizzes/${quizId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        setQuizzes(quizzes.filter(q => q.id !== quizId));
        setUploadStatus({ type: 'success', message: 'Quiz deleted successfully!' });
        setTimeout(() => setUploadStatus({ type: null, message: '' }), 3000);
      } else {
        setUploadStatus({ type: 'error', message: data.error || 'Failed to delete quiz' });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Error deleting quiz' });
      console.error('Error deleting quiz:', error);
    }
  };

  const viewQuizDetails = async (quizId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tutor/quizzes/${quizId}`);
      const data = await response.json();

      if (response.ok) {
        setViewingQuiz(data.quiz);
      } else {
        setUploadStatus({ type: 'error', message: 'Failed to load quiz details' });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Error loading quiz' });
      console.error('Error loading quiz details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tutorAuth');
    router.push('/');
  };

  const handleUpload = async () => {
    try {
      setUploadStatus({ type: null, message: '' });
      const quizData = JSON.parse(jsonInput);

      const response = await fetch('/api/quizzes/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });

      const result = await response.json();

      if (result.success) {
        setUploadStatus({ type: 'success', message: `Quiz "${result.data.title}" uploaded successfully!` });
        setJsonInput('');
        // Refresh quizzes list if on manage tab
        if (activeTab === 'manage') {
          fetchQuizzes();
        }
      } else {
        setUploadStatus({ type: 'error', message: result.error || 'Upload failed' });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: error instanceof Error ? error.message : 'Invalid JSON format' });
    }
  };

  const copyPromptTemplate = async () => {
    const promptTemplate = `Generate an O-Level Additional Mathematics quiz with [NUMBER] questions on [TOPIC] at [DIFFICULTY_LEVEL] level in JSON format.

**Quiz Metadata:**
- title: Clear, descriptive quiz name (e.g., "Quadratic Functions - Foundational Practice")
- topic: One of [A1: Quadratic Functions, A2: Equations & Inequalities, A3: Surds/Indices/Logs, A4: Polynomials & Partial Fractions, A5: Binomial Expansions, A6: Exponential & Logarithmic Functions, G1: Trigonometric Functions, G2: Coordinate Geometry, G3: Proofs in Plane Geometry, C1: Differentiation & Integration]
- week: Integer 1-52 (which week this quiz should be assigned)
- difficulty: One of [foundational: basic concepts & practice | intermediate: mixed problems with moderate complexity | exam_level: challenging exam-standard questions]
- time_limit_minutes: Recommended time based on difficulty (foundational: 15-20, intermediate: 25-35, exam_level: 40-50)
- due_date: ISO 8601 datetime format (e.g., "2025-12-31T23:59:59Z")
- published: Boolean (true = visible to students, false = draft in tutor portal only)

**Question Types & Structure:**

1. **MCQ (Multiple Choice - Single Answer)**
   - 4 options labeled A, B, C, D
   - correctAnswer: Single letter "A", "B", "C", or "D"
   - marks: Integer (typically 2-8 based on difficulty)
   - Use LaTeX for mathematical notation: $x^2$, $\\frac{a}{b}$, $\\sqrt{x}$, etc.

2. **Multi-Select (Multiple Correct Answers)**
   - 3-5 options labeled A, B, C, D, (E)
   - correctAnswers: Array of letters ["A", "C", "D"]
   - partialCredit: true (allows partial marks for partially correct answers)
   - marks: Integer (typically 4-8 based on difficulty)
   - Question text should indicate "Select all that apply"

**Mathematical Content Guidelines:**
- All calculations in explanations must be mathematically accurate
- Use proper LaTeX notation:
  - Inline math: $expression$
  - Fractions: $\\frac{numerator}{denominator}$
  - Exponents: $x^{power}$, $x^{a+b}$ (use braces for multi-character exponents)
  - Roots: $\\sqrt{x}$, $\\sqrt[n]{x}$
  - Trigonometric: $\\sin$, $\\cos$, $\\tan$, $\\sin^2 x$ (NOT $sin^2(x)$)
  - Greek letters: $\\alpha$, $\\beta$, $\\theta$, $\\pi$
  - Special: $\\times$, $\\div$, $\\leq$, $\\geq$, $\\neq$, $\\pm$
- Explanations should show step-by-step working
- Answer options should be plausible (include common mistakes as distractors)

**Difficulty Level Requirements:**

*Foundational (6 questions, ~15-20 marks total):*
- Direct application of formulas
- Single-step or two-step problems
- Clear, straightforward questions
- Marks per question: 2-3 for MCQ, 3-4 for multi-select

*Intermediate (6-7 questions, ~25-33 marks total):*
- Multi-step problem solving
- Combining multiple concepts
- Some word problems
- Marks per question: 4-5 for MCQ, 5-6 for multi-select

*Exam Level (7 questions, ~43-50 marks total):*
- Complex, exam-standard questions
- Proofs and derivations
- Multi-concept integration
- Challenging word problems
- Marks per question: 6-8 for MCQ, 6-8 for multi-select

**JSON Structure:**
\`\`\`json
{
  "title": "Quiz Title - Descriptive Name",
  "topic": "A1",
  "week": 1,
  "difficulty": "foundational",
  "time_limit_minutes": 20,
  "due_date": "2025-12-31T23:59:59Z",
  "published": false,
  "questions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "Find the roots of the quadratic equation $x^2 - 5x + 6 = 0$.",
      "options": [
        "$x = 2$ or $x = 3$",
        "$x = -2$ or $x = -3$",
        "$x = 1$ or $x = 6$",
        "$x = -1$ or $x = -6$"
      ],
      "correctAnswer": "A",
      "marks": 3,
      "explanation": "Factorizing: $x^2 - 5x + 6 = (x-2)(x-3) = 0$. Therefore $x = 2$ or $x = 3$."
    },
    {
      "id": 2,
      "type": "multi_select",
      "question": "Which of the following are properties of the quadratic function $y = x^2 - 4x + 3$? (Select all that apply)",
      "options": [
        "The minimum value is $-1$",
        "The axis of symmetry is $x = 2$",
        "The y-intercept is $3$",
        "The curve opens downward"
      ],
      "correctAnswers": ["A", "B", "C"],
      "partialCredit": true,
      "marks": 4,
      "explanation": "Completing the square: $y = (x-2)^2 - 1$. Minimum value is $-1$ ✓. Axis of symmetry $x = 2$ ✓. When $x=0$, $y=3$ (y-intercept) ✓. The coefficient of $x^2$ is positive, so curve opens upward ✗."
    }
  ]
}
\`\`\`

**Quality Checklist:**
- [ ] All mathematical expressions use proper LaTeX syntax
- [ ] All calculations verified for accuracy
- [ ] Explanations show clear working steps
- [ ] Correct answers match the options exactly
- [ ] Total marks approximately match difficulty guidelines
- [ ] Multi-select questions include "Select all that apply" in question text
- [ ] Distractors (wrong answers) are plausible based on common errors
- [ ] Question IDs are sequential starting from 1
- [ ] No duplicate questions or overly similar questions

**Example Usage:**
"Generate an O-Level Additional Mathematics quiz with 7 questions on A1: Quadratic Functions at exam_level difficulty in JSON format."`;

    try {
      await navigator.clipboard.writeText(promptTemplate);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (error) {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  const sampleQuiz = {
    title: "Quadratic Functions - Week 1",
    topic: "A1",
    week: 1,
    difficulty: "intermediate",
    time_limit_minutes: 30,
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "Find the minimum value of $f(x) = 2x^2 + 8x + 3$",
        options: ["$-5$", "$-2$", "$0$", "$3$"],
        correctAnswer: "A",
        marks: 3,
        explanation: "Complete the square: $f(x) = 2(x+2)^2 - 5$"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Tutor Dashboard</h1>
                  <p className="text-xs text-slate-400">AMath Management</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-red-500/50 hover:text-red-400 transition-all text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Quizzes', value: '0', icon: '📝', color: 'cyan' },
              { label: 'Active Students', value: '0', icon: '👥', color: 'blue' },
              { label: 'Avg Score', value: 'N/A', icon: '📊', color: 'indigo' },
              { label: 'This Week', value: '0', icon: '📅', color: 'violet' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-4 sm:p-6 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <div className={`text-xs px-2 py-1 rounded-full bg-${stat.color}-500/10 text-${stat.color}-400`}>
                    Live
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'upload', label: 'Upload Quiz', icon: '⬆️' },
              { id: 'manage', label: 'Manage', icon: '⚙️' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                    : 'bg-slate-900/50 border border-slate-800/50 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Welcome Back!</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Quick Start</h3>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• Click "Upload Quiz" to add a new quiz via JSON</li>
                      <li>• View and manage existing quizzes in the "Manage" tab</li>
                      <li>• Track student performance in "Analytics"</li>
                    </ul>
                  </div>

                  <div className="p-4 border border-slate-700/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Recent Activity</h3>
                    <p className="text-slate-400 text-sm">No recent activity. Upload your first quiz to get started!</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'upload' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Upload New Quiz</h2>
                  <button
                    onClick={copyPromptTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-all text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copyStatus || 'Copy AI Prompt Template'}
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Quiz JSON</label>
                    <button
                      onClick={() => setJsonInput(JSON.stringify(sampleQuiz, null, 2))}
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Load Example
                    </button>
                  </div>
                  <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Paste your quiz JSON here..."
                    className="w-full h-64 sm:h-96 bg-slate-950/50 border border-slate-700/50 rounded-lg p-4 text-slate-300 font-mono text-sm focus:border-cyan-500/50 focus:outline-none resize-none"
                  />
                </div>

                {uploadStatus.type && (
                  <div className={`mb-4 p-4 rounded-lg ${
                    uploadStatus.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}>
                    {uploadStatus.message}
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={!jsonInput.trim()}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-lg transition-colors"
                >
                  Upload Quiz
                </button>

                <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                  <h3 className="text-sm font-semibold text-white mb-2">📝 Quick Guide</h3>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• Click "Copy AI Prompt Template" to get a comprehensive quiz generation prompt</li>
                    <li>• Use the prompt with Claude or other AI to generate quiz JSON</li>
                    <li>• Paste the generated JSON above and click Upload</li>
                    <li>• Set <code className="text-cyan-400">published: false</code> to keep quizzes as drafts</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'manage' && (
              <div>
                {viewingQuiz ? (
                  // Quiz Detail View
                  <div>
                    <button
                      onClick={() => setViewingQuiz(null)}
                      className="mb-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Quiz List
                    </button>

                    <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-6 mb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">{viewingQuiz.title}</h2>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <span className="text-cyan-400">Topic: {viewingQuiz.topic}</span>
                            <span className="text-blue-400">Difficulty: {viewingQuiz.difficulty}</span>
                            <span className="text-violet-400">Time: {viewingQuiz.time_limit_minutes} min</span>
                            <span className="text-indigo-400">Week: {viewingQuiz.week}</span>
                            <span className="text-amber-400">Total: {viewingQuiz.total_marks} marks</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          viewingQuiz.published
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        }`}>
                          {viewingQuiz.published ? '✓ Published' : '○ Draft'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {viewingQuiz.questions?.map((q: any, idx: number) => (
                        <div key={idx} className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white">
                              Question {q.id} ({q.marks} mark{q.marks > 1 ? 's' : ''})
                            </h3>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                              {q.type === 'mcq' ? 'MCQ' : 'Multi-Select'}
                            </span>
                          </div>

                          <div className="mb-4 text-slate-300">
                            {renderLatex(q.question || '')}
                          </div>

                          <div className="space-y-2 mb-4">
                            <p className="text-sm font-medium text-slate-400">Options:</p>
                            {q.options?.map((opt: string, i: number) => {
                              const letter = String.fromCharCode(65 + i); // A, B, C, D
                              const isCorrect = q.type === 'mcq'
                                ? q.correctAnswer === letter
                                : q.correctAnswers?.includes(letter);

                              return (
                                <div key={i} className={`p-3 rounded-lg border ${
                                  isCorrect
                                    ? 'bg-green-500/10 border-green-500/30 text-green-300'
                                    : 'bg-slate-800/30 border-slate-700/30 text-slate-300'
                                }`}>
                                  <span className="font-semibold">{letter}.</span>{' '}
                                  <span>{renderLatex(opt)}</span>
                                  {isCorrect && <span className="ml-2 text-green-400">✓ Correct</span>}
                                </div>
                              );
                            })}
                          </div>

                          {q.explanation && (
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <p className="text-sm font-semibold text-blue-400 mb-2">Explanation:</p>
                              <div className="text-sm text-slate-300">
                                {renderLatex(q.explanation || '')}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Quiz List View
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Manage Quizzes</h2>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="px-3 py-2 bg-slate-950/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm focus:border-cyan-500/50 focus:outline-none"
                  />
                  <select
                    value={filters.published}
                    onChange={(e) => setFilters({ ...filters, published: e.target.value })}
                    className="px-3 py-2 bg-slate-950/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm focus:border-cyan-500/50 focus:outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                  <select
                    value={filters.topic}
                    onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
                    className="px-3 py-2 bg-slate-950/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm focus:border-cyan-500/50 focus:outline-none"
                  >
                    <option value="">All Topics</option>
                    <option value="A1">A1 - Quadratic Functions</option>
                    <option value="A2">A2 - Equations & Inequalities</option>
                    <option value="A3">A3 - Surds/Indices/Logs</option>
                    <option value="A4">A4 - Polynomials</option>
                    <option value="A5">A5 - Binomial</option>
                    <option value="A6">A6 - Exponential/Logs</option>
                    <option value="G1">G1 - Trigonometry</option>
                    <option value="G2">G2 - Coordinate Geometry</option>
                    <option value="G3">G3 - Proofs</option>
                    <option value="C1">C1 - Calculus</option>
                  </select>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className="px-3 py-2 bg-slate-950/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm focus:border-cyan-500/50 focus:outline-none"
                  >
                    <option value="">All Difficulties</option>
                    <option value="foundational">Foundational</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="exam_level">Exam Level</option>
                  </select>
                </div>

                {uploadStatus.type && (
                  <div className={`mb-4 p-4 rounded-lg ${
                    uploadStatus.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}>
                    {uploadStatus.message}
                  </div>
                )}

                {/* Quiz List */}
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading quizzes...</p>
                  </div>
                ) : quizzes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-slate-400">No quizzes found. Try adjusting your filters or upload a new quiz!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {quizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-white font-semibold truncate">{quiz.title}</h3>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                quiz.published
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                  : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                              }`}>
                                {quiz.published ? '✓ Published' : '○ Draft'}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                              <span className="flex items-center gap-1">
                                <span className="text-cyan-400">📖</span>
                                {quiz.topic}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="text-blue-400">📊</span>
                                {quiz.difficulty}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="text-violet-400">⏱️</span>
                                {quiz.time_limit_minutes} min
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="text-indigo-400">📅</span>
                                Week {quiz.week}
                              </span>
                              {quiz.total_marks && (
                                <span className="flex items-center gap-1">
                                  <span className="text-amber-400">⭐</span>
                                  {quiz.total_marks} marks
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewQuizDetails(quiz.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/20 border border-blue-500/50 text-blue-400 hover:bg-blue-500/30 transition-all"
                            >
                              View
                            </button>
                            <button
                              onClick={() => togglePublished(quiz.id, quiz.published)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                quiz.published
                                  ? 'bg-orange-500/20 border border-orange-500/50 text-orange-400 hover:bg-orange-500/30'
                                  : 'bg-green-500/20 border border-green-500/50 text-green-400 hover:bg-green-500/30'
                              }`}
                            >
                              {quiz.published ? 'Unpublish' : 'Publish'}
                            </button>
                            <button
                              onClick={() => deleteQuiz(quiz.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                  <h3 className="text-sm font-semibold text-white mb-2">💡 Tips</h3>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• <strong className="text-green-400">Published</strong> quizzes are visible to students</li>
                    <li>• <strong className="text-orange-400">Draft</strong> quizzes remain in the tutor portal only</li>
                    <li>• Use filters to quickly find specific quizzes</li>
                    <li>• Toggle publish status to control student access</li>
                  </ul>
                </div>
              </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Student Analytics</h2>
                  <Link
                    href="/tutor/submissions"
                    className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 transition-all text-sm font-medium"
                  >
                    View All Submissions
                  </Link>
                </div>

                {analyticsLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading analytics...</p>
                  </div>
                ) : !analytics?.hasData ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📈</div>
                    <p className="text-slate-400 mb-4">No analytics data yet.</p>
                    <p className="text-slate-500 text-sm">Analytics will appear once students start taking quizzes.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="text-slate-400 text-sm mb-1">Total Quizzes</div>
                        <div className="text-3xl font-bold text-white">{analytics.overview.total_quizzes}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          {analytics.overview.published_quizzes} published
                        </div>
                      </div>
                      <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="text-slate-400 text-sm mb-1">Total Attempts</div>
                        <div className="text-3xl font-bold text-white">{analytics.overview.total_attempts}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          {analytics.overview.completed_attempts} completed
                        </div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="text-slate-400 text-sm mb-1">Avg Score</div>
                        <div className="text-3xl font-bold text-green-400">{analytics.overview.average_score}%</div>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div className="text-slate-400 text-sm mb-1">Active Students</div>
                        <div className="text-3xl font-bold text-blue-400">{analytics.overview.active_students}</div>
                      </div>
                    </div>

                    {/* Topic Performance */}
                    {analytics.topicPerformance && analytics.topicPerformance.length > 0 && (
                      <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Topic Performance</h3>
                        <div className="space-y-3">
                          {analytics.topicPerformance.map(topic => (
                            <div key={topic.topic} className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-slate-300 text-sm">
                                    <span className="text-cyan-400 font-mono font-semibold">{topic.topic}</span> - {topic.topic_name}
                                  </span>
                                  <span className="text-white font-bold">{topic.average_score}%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${
                                      topic.average_score >= 80
                                        ? 'bg-green-500'
                                        : topic.average_score >= 60
                                        ? 'bg-blue-500'
                                        : 'bg-orange-500'
                                    }`}
                                    style={{ width: `${topic.average_score}%` }}
                                  />
                                </div>
                                <div className="text-xs text-slate-500 mt-1">{topic.attempts} attempts</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Difficulty Breakdown */}
                    {analytics.difficultyBreakdown && analytics.difficultyBreakdown.length > 0 && (
                      <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Performance by Difficulty</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {analytics.difficultyBreakdown.map(diff => (
                            <div key={diff.difficulty} className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
                              <div className="text-slate-400 text-sm mb-2 capitalize">{diff.difficulty.replace('_', ' ')}</div>
                              <div className="text-2xl font-bold text-white mb-1">{diff.average_score}%</div>
                              <div className="text-xs text-slate-500">{diff.attempts} attempts</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Score Distribution */}
                    {analytics.scoreDistribution && analytics.scoreDistribution.length > 0 && (
                      <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Score Distribution</h3>
                        <div className="space-y-2">
                          {analytics.scoreDistribution.map(range => (
                            <div key={range.range} className="flex items-center gap-4">
                              <div className="w-20 text-slate-400 text-sm">{range.range}%</div>
                              <div className="flex-1">
                                <div className="h-8 bg-slate-800 rounded-lg overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-end pr-2"
                                    style={{ width: `${Math.max(range.percentage, 5)}%` }}
                                  >
                                    <span className="text-white text-xs font-bold">{range.count}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="w-16 text-right text-slate-400 text-sm">{range.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Submissions */}
                    {analytics.recentSubmissions && analytics.recentSubmissions.length > 0 && (
                      <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-white">Recent Submissions</h3>
                          <Link
                            href="/tutor/submissions"
                            className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                          >
                            View all →
                          </Link>
                        </div>
                        <div className="space-y-2">
                          {analytics.recentSubmissions.map(sub => (
                            <Link
                              key={sub.attempt_id}
                              href={`/tutor/submissions/${sub.attempt_id}`}
                              className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-700/30 rounded-lg hover:border-cyan-500/30 transition-all"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="text-white text-sm font-medium truncate">{sub.quiz_title}</div>
                                <div className="text-slate-500 text-xs">
                                  {new Date(sub.submitted_at).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className={`text-lg font-bold ${
                                  sub.percentage >= 80 ? 'text-green-400' :
                                  sub.percentage >= 60 ? 'text-blue-400' :
                                  'text-orange-400'
                                }`}>
                                  {sub.percentage}%
                                </div>
                                <div className="text-xs text-slate-500">{sub.score}/{sub.total_marks}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
