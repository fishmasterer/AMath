'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function QuadraticFunctionsPage() {
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
                <div className="text-cyan-400 font-bold text-sm mb-1">TOPIC A1</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Quadratic Functions</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Master quadratic equations, functions, and their applications
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
                <h3 className="text-xl font-semibold text-white mb-3">Quadratic Equations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span><strong className="text-white">Standard form:</strong> <InlineMath math="ax^2 + bx + c = 0" /> where <InlineMath math="a \neq 0" /></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span><strong className="text-white">Roots/Solutions:</strong> Values of x that satisfy the equation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-3">Methods of Solving</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="font-semibold text-cyan-400 mb-2">1. Factorization</div>
                    <p className="text-sm">If <InlineMath math="ab = 0" /> then <InlineMath math="a = 0" /> or <InlineMath math="b = 0" /></p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="font-semibold text-cyan-400 mb-2">2. Completing the Square</div>
                    <p className="text-sm">Rewrite in perfect square form</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="font-semibold text-cyan-400 mb-2">3. Quadratic Formula</div>
                    <p className="text-sm">Use the general formula</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="font-semibold text-cyan-400 mb-2">4. Technology</div>
                    <p className="text-sm">Calculator or graphing methods</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Essential Formulas Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📐</span>
              Essential Formulas
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">The Quadratic Formula</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Completing the Square</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 + \left(c - \frac{b^2}{4a}\right)" />
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">The Discriminant (Δ)</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="\Delta = b^2 - 4ac" />
                </div>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <span className="text-green-400 font-bold">▹</span>
                    <span>If <InlineMath math="\Delta > 0" />: <strong className="text-green-400">two distinct real roots</strong></span>
                  </div>
                  <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <span className="text-yellow-400 font-bold">▹</span>
                    <span>If <InlineMath math="\Delta = 0" />: <strong className="text-yellow-400">one repeated real root</strong> (equal roots)</span>
                  </div>
                  <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <span className="text-red-400 font-bold">▹</span>
                    <span>If <InlineMath math="\Delta < 0" />: <strong className="text-red-400">no real roots</strong> (complex roots)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Sum and Product of Roots</h3>
                <p className="text-slate-300 mb-4">For <InlineMath math="ax^2 + bx + c = 0" /> with roots <InlineMath math="\alpha" /> and <InlineMath math="\beta" />:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-4">
                    <div className="text-cyan-400 font-semibold mb-2 text-sm">Sum of Roots</div>
                    <BlockMath math="\alpha + \beta = -\frac{b}{a}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-4">
                    <div className="text-cyan-400 font-semibold mb-2 text-sm">Product of Roots</div>
                    <BlockMath math="\alpha\beta = \frac{c}{a}" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quadratic Functions Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📊</span>
              Quadratic Functions
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Vertex Form</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="y = a(x - h)^2 + k" />
                </div>
                <p className="text-slate-300">where <InlineMath math="(h, k)" /> is the vertex</p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Finding the Vertex</h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/80 rounded-lg p-4">
                    <div className="text-cyan-400 text-sm mb-2">x-coordinate of vertex:</div>
                    <BlockMath math="x = -\frac{b}{2a}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-4">
                    <div className="text-cyan-400 text-sm mb-2">y-coordinate of vertex:</div>
                    <BlockMath math="y = f\left(-\frac{b}{2a}\right)" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4">Axis of Symmetry</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="x = -\frac{b}{2a}" />
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
                <div className="text-blue-400 font-bold mb-4">Question 1 - Nature of Roots</div>

                <div className="space-y-4 text-slate-300">
                  <div>
                    <strong className="text-white">(a)</strong> Find the range of values of k for which <InlineMath math="(k-3)x^2 + 4x + k" /> is always positive for all real values of x. <span className="text-slate-500">[2]</span>
                  </div>

                  <div>
                    <strong className="text-white">(b)</strong> Show that the roots of the equation <InlineMath math="6x^2 + 4(m-1) = 2(x + m)" /> are real if <InlineMath math="m \leq 2\frac{1}{12}" />. <span className="text-slate-500">[2]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solutions
                </div>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(a) Answer: k &gt; 4</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
                      <p>For <InlineMath math="(k-3)x^2 + 4x + k > 0" /> for all x:</p>
                      <p>• The discriminant must be negative: <InlineMath math="16 - 4k(k-3) < 0" /></p>
                      <p>• Simplifying: <InlineMath math="k^2 - 3k - 4 > 0" /></p>
                      <p>• Factoring: <InlineMath math="(k-4)(k+1) > 0" /></p>
                      <p>• So <InlineMath math="k > 4" /> or <InlineMath math="k < -1" /></p>
                      <p>• Since <InlineMath math="k-3 > 0" />, we need <InlineMath math="k > 3" /></p>
                      <p>• <strong className="text-green-400">Therefore k &gt; 4</strong></p>
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(b) Shown</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
                      <p>• Rearrange: <InlineMath math="6x^2 - 2x + 2m - 4 = 0" /></p>
                      <p>• Discriminant: <InlineMath math="\Delta = 4 - 48m + 96 = 100 - 48m" /></p>
                      <p>• For real roots: <InlineMath math="100 - 48m \geq 0" /></p>
                      <p>• Solving: <InlineMath math="m \leq \frac{100}{48} = 2\frac{1}{12}" /> ✓</p>
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
                  <span><InlineMath math="a > 0" />: parabola opens <strong className="text-green-400">upward</strong> (minimum point)</span>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span><InlineMath math="a < 0" />: parabola opens <strong className="text-red-400">downward</strong> (maximum point)</span>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>y-intercept occurs at <InlineMath math="(0, c)" /></span>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Use discriminant to determine line-curve intersection conditions</span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <Link
              href="/topics/a2"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              Next: Equations & Inequalities
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
