'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function SurdsPage() {
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
                <div className="text-cyan-400 font-bold text-sm mb-1">TOPIC A3</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Surds</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Master operations with surds and rationalization techniques
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Key Concepts Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📘</span>
              Key Concepts
            </h2>

            <div className="space-y-6 text-slate-300">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-3">Surd Definition</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span><strong className="text-white">Surd:</strong> A root of a number that cannot be simplified to remove the root sign</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span><strong className="text-white">Like surds:</strong> Surds with the same radical part (e.g., <InlineMath math="2\sqrt{3}" /> and <InlineMath math="5\sqrt{3}" />)</span>
                  </li>
                </ul>
                <div className="mt-4 bg-slate-800/50 rounded-lg p-4">
                  <div className="text-cyan-400 text-sm mb-2">Examples:</div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span><InlineMath math="\sqrt{2}" />, <InlineMath math="\sqrt{3}" />, <InlineMath math="\sqrt{5}" /> are surds</span>
                    <span><InlineMath math="\sqrt{4} = 2" /> is NOT a surd</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Operations with Surds Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📐</span>
              Operations with Surds
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Basic Rules</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-4">
                    <div className="text-cyan-400 text-sm mb-2">Multiplication</div>
                    <BlockMath math="\sqrt{a} \times \sqrt{b} = \sqrt{ab}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-4">
                    <div className="text-cyan-400 text-sm mb-2">Division</div>
                    <BlockMath math="\frac{\sqrt{a}}{\sqrt{b}} = \sqrt{\frac{a}{b}}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-4">
                    <div className="text-cyan-400 text-sm mb-2">Squaring</div>
                    <BlockMath math="(\sqrt{a})^2 = a" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rationalizing the Denominator Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">🔄</span>
              Rationalizing the Denominator
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Case 1: Single Surd</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="\frac{1}{\sqrt{a}} = \frac{\sqrt{a}}{a}" />
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-blue-400 font-semibold text-sm mb-2">Example:</div>
                  <div className="text-slate-300 text-sm">
                    <BlockMath math="\frac{1}{\sqrt{5}} = \frac{1}{\sqrt{5}} \times \frac{\sqrt{5}}{\sqrt{5}} = \frac{\sqrt{5}}{5}" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Case 2: Sum or Difference with Surd</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-cyan-400 text-sm mb-2">When denominator is <InlineMath math="a + \sqrt{b}" />:</div>
                    <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                      <BlockMath math="\frac{1}{a + \sqrt{b}} = \frac{a - \sqrt{b}}{a^2 - b}" />
                    </div>
                  </div>
                  <div>
                    <div className="text-cyan-400 text-sm mb-2">When denominator is <InlineMath math="\sqrt{a} + \sqrt{b}" />:</div>
                    <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                      <BlockMath math="\frac{1}{\sqrt{a} + \sqrt{b}} = \frac{\sqrt{a} - \sqrt{b}}{a - b}" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practice Question Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">✏️</span>
              Practice Question (2023 Mock)
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                <div className="text-blue-400 font-bold mb-4">Question 2 - Surds</div>
                <div className="text-slate-300">
                  Express <InlineMath math="\left(\frac{\sqrt{5}+\sqrt{3}}{\sqrt{5}-\sqrt{3}}\right)^2" /> in the form <InlineMath math="a + b\sqrt{15}" />, where a and b are integers. <span className="text-slate-500">[2]</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solution
                </div>

                <div className="space-y-4 text-slate-300">
                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">Answer: <InlineMath math="31 + 8\sqrt{15}" /></div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Rationalize the fraction first:</p>
                      <BlockMath math="\frac{\sqrt{5}+\sqrt{3}}{\sqrt{5}-\sqrt{3}} = \frac{(\sqrt{5}+\sqrt{3})(\sqrt{5}+\sqrt{3})}{(\sqrt{5}-\sqrt{3})(\sqrt{5}+\sqrt{3})}" />

                      <p><strong className="text-white">Step 2:</strong> Expand the numerator:</p>
                      <BlockMath math="= \frac{5 + 2\sqrt{15} + 3}{5 - 3} = \frac{8 + 2\sqrt{15}}{2}" />

                      <p><strong className="text-white">Step 3:</strong> Simplify:</p>
                      <BlockMath math="= 4 + \sqrt{15}" />

                      <p><strong className="text-white">Step 4:</strong> Square the result:</p>
                      <BlockMath math="(4 + \sqrt{15})^2 = 16 + 8\sqrt{15} + 15 = 31 + 8\sqrt{15}" />
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
                    <InlineMath math="\sqrt{a^2} = |a|" /> not just <InlineMath math="a" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-red-400 text-xl">⚠</span>
                  <div>
                    Cannot simplify <InlineMath math="\sqrt{a + b}" /> to <InlineMath math="\sqrt{a} + \sqrt{b}" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <div>
                    Always <strong className="text-white">rationalize denominators</strong> before calculating
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <div>
                    Check for simplification: <InlineMath math="\sqrt{8} = 2\sqrt{2}" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips Section */}
          <section className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-2xl">💎</span>
              Pro Tips
            </h2>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                <span>To rationalize <InlineMath math="a + \sqrt{b}" />, multiply by <InlineMath math="a - \sqrt{b}" /> (conjugate)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                <span>Always simplify surds before performing operations: <InlineMath math="\sqrt{12} = 2\sqrt{3}" /></span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                <span>When adding/subtracting surds, combine only like terms</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                <span>Use conjugate pairs: <InlineMath math="(a+\sqrt{b})(a-\sqrt{b}) = a^2 - b" /></span>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/a2"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Equations & Inequalities
            </Link>
            <Link
              href="/topics/a4"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              Next: Polynomials
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
