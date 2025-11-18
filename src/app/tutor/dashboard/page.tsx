'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TutorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [jsonInput, setJsonInput] = useState('');
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('tutorAuth');
    if (!isAuth) {
      router.push('/tutor');
    }
  }, [router]);

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
      } else {
        setUploadStatus({ type: 'error', message: result.error || 'Upload failed' });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: error instanceof Error ? error.message : 'Invalid JSON format' });
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
                <h2 className="text-2xl font-bold text-white mb-6">Upload New Quiz</h2>

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
                  <h3 className="text-sm font-semibold text-white mb-2">📝 JSON Format Guide</h3>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• <code className="text-cyan-400">title</code>: Quiz name</li>
                    <li>• <code className="text-cyan-400">topic</code>: A1-A6, G1-G3, or C1</li>
                    <li>• <code className="text-cyan-400">difficulty</code>: foundational, intermediate, or exam_level</li>
                    <li>• <code className="text-cyan-400">time_limit_minutes</code>: Quiz duration</li>
                    <li>• <code className="text-cyan-400">due_date</code>: ISO 8601 format</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'manage' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Manage Quizzes</h2>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-slate-400">No quizzes yet. Upload your first quiz to see it here!</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Student Analytics</h2>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📈</div>
                  <p className="text-slate-400">Analytics will appear once students start taking quizzes.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
