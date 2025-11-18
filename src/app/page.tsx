export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Floating orbs for depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
              AMath Tutor
            </div>
          </div>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Advanced quiz and learning management system for Singapore O-Level Additional Mathematics
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Students Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">For Students</h3>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Take timed quizzes with instant feedback</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Track your progress across all topics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Review mistakes in your personal journal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Master all A-Math topics systematically</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tutors Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">For Tutors</h3>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Upload quizzes via JSON format</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Monitor student progress in real-time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>View detailed analytics and insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Manage assignments efficiently</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Complete Topic Coverage
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { code: 'A1', name: 'Quadratic Functions', colorClass: 'text-cyan-400', href: '/topics/a1' },
              { code: 'A2', name: 'Equations & Inequalities', colorClass: 'text-cyan-400', href: '/topics/a2' },
              { code: 'A3', name: 'Surds', colorClass: 'text-cyan-400', href: '/topics/a3' },
              { code: 'A4', name: 'Polynomials', colorClass: 'text-cyan-400', href: '/topics/a4' },
              { code: 'A5', name: 'Partial Fractions', colorClass: 'text-blue-400', href: '/topics/a5' },
              { code: 'A6', name: 'Binomial Expansion', colorClass: 'text-blue-400', href: '/topics/a6' },
              { code: 'A7', name: 'Exponential & Log', colorClass: 'text-blue-400', href: '/topics/a7' },
              { code: 'G1', name: 'Trigonometry', colorClass: 'text-purple-400', href: '/topics/g1' },
              { code: 'G2', name: 'Coordinate Geometry', colorClass: 'text-purple-400', href: '/topics/g2' },
              { code: 'G3', name: 'Proofs', colorClass: 'text-purple-400', href: '/topics/g3' },
              { code: 'C1', name: 'Calculus', colorClass: 'text-pink-400', href: '/topics/c1' },
            ].map((topic) => (
              <a
                key={topic.code}
                href={topic.href}
                className="group relative bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className={`${topic.colorClass} font-bold text-lg mb-1`}>
                  {topic.code}
                </div>
                <div className="text-slate-400 text-sm leading-tight">
                  {topic.name}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Status & Access */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-full px-6 py-3 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-slate-300">System Online</span>
          </div>
          <div className="flex items-center justify-center gap-6 mb-2">
            <a
              href="/student/dashboard"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Student Portal →
            </a>
            <a
              href="/tutor"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Tutor Portal →
            </a>
          </div>
          <p className="text-slate-500 text-sm">
            Secure access for students and tutors
          </p>
        </div>
      </div>
    </main>
  );
}
