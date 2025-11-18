'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function EquationsInequalitiesPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href="/"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <div className="text-cyan-400 font-bold text-sm mb-1">TOPIC A2</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Equations and Inequalities</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Solve quadratic inequalities, rational inequalities, and simultaneous equations
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Quadratic Inequalities Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📘</span>
              Quadratic Inequalities
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Method 1: Graphical Approach</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">1.</span>
                    <span>Sketch the parabola <InlineMath math="y = ax^2 + bx + c" /></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">2.</span>
                    <span>Identify critical values (roots where the curve crosses the x-axis)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">3.</span>
                    <span>Read solution from the graph based on inequality sign</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Method 2: Sign Diagram</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">1.</span>
                    <span>Find and mark critical values on a number line</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">2.</span>
                    <span>Test the sign of the expression in each interval</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">3.</span>
                    <span>Select intervals where the inequality is satisfied</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Rational Inequalities Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📐</span>
              Rational Inequalities
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">General Form</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\frac{ax + b}{cx + d} > 0, \quad <, \quad \geq, \quad \leq" />
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Solution Steps</h3>
                <div className="space-y-3 text-slate-300">
                  <div className="bg-slate-800/50 rounded-lg p-4 flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">1.</span>
                    <span>Find critical values: set numerator = 0 and denominator = 0</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">2.</span>
                    <span>Create a sign diagram on a number line</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">3.</span>
                    <span>Test each interval to determine the sign</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">4.</span>
                    <span>Select intervals satisfying the inequality</span>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-4 flex items-start gap-3 border border-red-500/20">
                    <span className="text-red-400 font-bold">⚠</span>
                    <span><strong className="text-red-400">Important:</strong> Always exclude values where denominator = 0</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Simultaneous Equations Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">🔄</span>
              Simultaneous Equations
            </h2>

            <div className="space-y-6 text-slate-300">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">One Linear, One Quadratic</h3>
                <div className="space-y-4">
                  <p>When solving a system with one linear and one quadratic equation:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400">▹</span>
                      <span><strong className="text-white">Solution method:</strong> Substitution</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400">▹</span>
                      <span><strong className="text-white">Possible outcomes:</strong> 0, 1, or 2 solutions</span>
                    </li>
                  </ul>

                  <div className="bg-slate-800/50 rounded-lg p-4 mt-4">
                    <div className="text-cyan-400 text-sm font-semibold mb-3">Geometric Interpretation:</div>
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-green-400">2 solutions:</strong> Line intersects curve at 2 points</p>
                      <p><strong className="text-yellow-400">1 solution:</strong> Line is tangent to curve</p>
                      <p><strong className="text-red-400">0 solutions:</strong> Line does not intersect curve</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Things to Remember Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">💡</span>
              Things to Remember
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-red-400 text-xl">⚠</span>
                  <div>
                    <strong className="text-white">Don't</strong> divide by an unknown when solving inequalities
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <div>
                    When multiplying/dividing by a <strong className="text-white">negative number</strong>, reverse the inequality sign
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <div>
                    Always <strong className="text-white">check</strong> your solution satisfies the original inequality
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <div>
                    For rational inequalities, <strong className="text-white">never</strong> include points where denominator = 0
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Tips Section */}
          <section className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-2xl">💎</span>
              Pro Tips
            </h2>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                <span>Always sketch a diagram or graph to visualize the problem</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                <span>Test a value in each region to verify your sign diagram</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                <span>Pay attention to whether boundaries are included (&le;, &ge;) or excluded (&lt;, &gt;)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                <span>For exam questions, show all working clearly including your sign diagram</span>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/a1"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Quadratic Functions
            </Link>
            <Link
              href="/topics/a3"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              Next: Surds
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
