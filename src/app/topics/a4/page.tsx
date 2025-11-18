'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function PolynomialsPage() {
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
                <div className="text-cyan-400 font-bold text-sm mb-1">TOPIC A4</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Polynomials</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Understand remainder theorem, factor theorem, and polynomial division
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
                <h3 className="text-xl font-semibold text-white mb-3">Definition</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="P(x) = a_nx^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0" />
                </div>
                <p>where <InlineMath math="n" /> is a non-negative integer</p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-3">Degree of Polynomial</h3>
                <p>The <strong className="text-white">degree</strong> is the highest power of <InlineMath math="x" /> with a non-zero coefficient</p>
                <div className="mt-4 bg-slate-800/50 rounded-lg p-4">
                  <div className="text-cyan-400 text-sm mb-2">Examples:</div>
                  <ul className="space-y-2 text-sm">
                    <li><InlineMath math="3x^4 - 2x^2 + 5" /> has degree 4</li>
                    <li><InlineMath math="7x^2 + x - 1" /> has degree 2</li>
                    <li><InlineMath math="5" /> has degree 0 (constant)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Remainder Theorem Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📐</span>
              The Remainder Theorem
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Statement</h3>
                <p className="text-slate-300 mb-4">When <InlineMath math="P(x)" /> is divided by <InlineMath math="(x - a)" />, the remainder is <InlineMath math="P(a)" /></p>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="P(x) = Q(x)(x - a) + R" />
                  <div className="text-center mt-2 text-slate-400 text-sm">where <InlineMath math="R = P(a)" /></div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                <div className="text-blue-400 font-semibold mb-3">Example:</div>
                <div className="text-slate-300 text-sm space-y-2">
                  <p>Find the remainder when <InlineMath math="P(x) = 2x^3 + 3x^2 - 5x + 1" /> is divided by <InlineMath math="(x - 2)" /></p>
                  <p><strong className="text-white">Solution:</strong> <InlineMath math="P(2) = 2(2)^3 + 3(2)^2 - 5(2) + 1 = 16 + 12 - 10 + 1 = 19" /></p>
                  <p className="text-green-400">Therefore, the remainder is 19.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Factor Theorem Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">⚡</span>
              The Factor Theorem
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Statement</h3>
                <p className="text-slate-300 mb-4"><InlineMath math="(x - a)" /> is a factor of <InlineMath math="P(x)" /> if and only if <InlineMath math="P(a) = 0" /></p>

                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4 mt-4">
                  <div className="text-cyan-400 font-semibold mb-3 text-sm">Key Insight:</div>
                  <p className="text-slate-300 text-sm">This theorem connects three equivalent statements:</p>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">1.</span>
                      <span><InlineMath math="a" /> is a <strong className="text-white">zero</strong> of <InlineMath math="P(x)" /></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">2.</span>
                      <span><InlineMath math="a" /> is a <strong className="text-white">root</strong> of <InlineMath math="P(x) = 0" /></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">3.</span>
                      <span><InlineMath math="(x - a)" /> is a <strong className="text-white">factor</strong> of <InlineMath math="P(x)" /></span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Applications</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-cyan-400 font-semibold mb-2 text-sm">Finding Factors</div>
                    <p className="text-slate-300 text-xs">Test values to find roots, then determine factors</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-cyan-400 font-semibold mb-2 text-sm">Solving Equations</div>
                    <p className="text-slate-300 text-xs">Factor polynomials to solve polynomial equations</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-cyan-400 font-semibold mb-2 text-sm">Finding Coefficients</div>
                    <p className="text-slate-300 text-xs">Use known factors to determine unknown coefficients</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Polynomial Division Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">➗</span>
              Polynomial Division
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Long Division Method</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">1.</span>
                    <span>Divide the leading terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">2.</span>
                    <span>Multiply the divisor by the quotient term</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">3.</span>
                    <span>Subtract from the dividend</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">4.</span>
                    <span>Repeat until the degree of remainder &lt; degree of divisor</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Synthetic Division</h3>
                <p className="text-slate-300">Quick method for dividing by <InlineMath math="(x - a)" /> - useful for finding remainders and quotients efficiently</p>
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
                <div className="text-blue-400 font-bold mb-4">Question 5 - Polynomial</div>

                <div className="space-y-4 text-slate-300">
                  <div>
                    <strong className="text-white">(a)</strong> Factorise completely <InlineMath math="27a^3 - 125b^3" />. <span className="text-slate-500">[2]</span>
                  </div>

                  <div>
                    <strong className="text-white">(b)</strong> It is given that <InlineMath math="3x^3 + 3x^2 - 11x - 6" /> when divided by <InlineMath math="x + a" /> has a remainder that is half the remainder when it is divided by <InlineMath math="x - a" />.
                    <div className="ml-6 mt-2 space-y-2">
                      <div><strong>(i)</strong> Show that <InlineMath math="3a^3 - a^2 = 11a - 2" />. <span className="text-slate-500">[2]</span></div>
                      <div><strong>(ii)</strong> Solve <InlineMath math="3a^3 - a^2 = 11a - 2" />, giving your answer to two decimal places where necessary. <span className="text-slate-500">[3]</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solutions
                </div>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(a) Answer: <InlineMath math="(3a - 5b)(9a^2 + 15ab + 25b^2)" /></div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
                      <p>Using the difference of cubes formula: <InlineMath math="a^3 - b^3 = (a - b)(a^2 + ab + b^2)" /></p>
                      <BlockMath math="27a^3 - 125b^3 = (3a)^3 - (5b)^3" />
                      <BlockMath math="= (3a - 5b)[(3a)^2 + (3a)(5b) + (5b)^2]" />
                      <BlockMath math="= (3a - 5b)(9a^2 + 15ab + 25b^2)" />
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(b)(i) Shown</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
                      <p>Let <InlineMath math="f(x) = 3x^3 + 3x^2 - 11x - 6" /></p>
                      <p>By remainder theorem:</p>
                      <p>• <InlineMath math="f(-a) = -3a^3 + 3a^2 + 11a - 6" /></p>
                      <p>• <InlineMath math="f(a) = 3a^3 + 3a^2 - 11a - 6" /></p>
                      <p>Given: <InlineMath math="f(-a) = \frac{1}{2}f(a)" /></p>
                      <p>Substituting and simplifying gives: <InlineMath math="3a^3 - a^2 = 11a - 2" /> ✓</p>
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(b)(ii) Answer: <InlineMath math="a = 2, 0.18, \text{ or } -1.85" /></div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
                      <p>Rearrange: <InlineMath math="3a^3 - a^2 - 11a + 2 = 0" /></p>
                      <p>Testing <InlineMath math="a = 2" />: <InlineMath math="(a - 2)" /> is a factor</p>
                      <p>Factoring: <InlineMath math="(a - 2)(3a^2 + 5a - 1) = 0" /></p>
                      <p>Using quadratic formula on <InlineMath math="3a^2 + 5a - 1 = 0" />:</p>
                      <BlockMath math="a = \frac{-5 \pm \sqrt{37}}{6}" />
                      <p className="text-green-400">Solutions: <InlineMath math="a = 2, 0.18, \text{ or } -1.85" /></p>
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
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Number of roots ≤ degree of polynomial</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>For degree 2: Sum of roots = <InlineMath math="-b/a" /></span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Product of roots = <InlineMath math="(-1)^n \times \frac{\text{constant}}{\text{leading coeff}}" /></span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Check factors by substitution: <InlineMath math="P(a) = 0" /></span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/a3"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Surds
            </Link>
            <Link
              href="/topics/a5"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              Next: Partial Fractions
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
