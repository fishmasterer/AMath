'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function TrigonometricFunctionsPage() {
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
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href="/"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <div className="text-purple-400 font-bold text-sm mb-1">TOPIC G1</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Trigonometric Functions</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Exploring trigonometric ratios, identities, and equations
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Radian Measure Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">⭕</span>
              Radian Measure
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Conversion Formulas</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="\pi \text{ radians} = 180°" />
                </div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="1 \text{ radian} \approx 57.3°" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Degrees to Radians</div>
                    <BlockMath math="\text{Multiply by } \frac{\pi}{180}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Radians to Degrees</div>
                    <BlockMath math="\text{Multiply by } \frac{180}{\pi}" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Arc Length and Sector Area Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">📏</span>
              Arc Length and Sector Area
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Arc Length</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="s = r\theta" />
                </div>
                <p className="text-slate-300 text-sm">
                  where <InlineMath math="r" /> = radius and <InlineMath math="\theta" /> = angle in radians
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Sector Area</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="A = \frac{1}{2}r^2\theta" />
                </div>
                <p className="text-slate-300 text-sm">
                  where <InlineMath math="\theta" /> is in radians
                </p>
              </div>
            </div>
          </section>

          {/* Six Trigonometric Functions Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">📐</span>
              Six Trigonometric Functions
            </h2>

            <div className="space-y-6">
              {/* Primary Ratios */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Primary Ratios</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Sine</div>
                    <BlockMath math="\sin \theta = \frac{y}{r} = \frac{\text{opp}}{\text{hyp}}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Cosine</div>
                    <BlockMath math="\cos \theta = \frac{x}{r} = \frac{\text{adj}}{\text{hyp}}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Tangent</div>
                    <BlockMath math="\tan \theta = \frac{y}{x} = \frac{\text{opp}}{\text{adj}}" />
                  </div>
                </div>
              </div>

              {/* Reciprocal Ratios */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Reciprocal Ratios</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Cosecant</div>
                    <BlockMath math="\csc \theta = \frac{1}{\sin \theta}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Secant</div>
                    <BlockMath math="\sec \theta = \frac{1}{\cos \theta}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Cotangent</div>
                    <BlockMath math="\cot \theta = \frac{1}{\tan \theta}" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Angles Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">⭐</span>
              Special Angles
            </h2>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
              <h3 className="text-xl font-semibold text-white mb-4">Common Angle Values</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-slate-300">
                  <thead className="border-b border-slate-700">
                    <tr>
                      <th className="text-left py-3 px-4 text-purple-400">Angle (degrees)</th>
                      <th className="text-center py-3 px-4 text-purple-400">0°</th>
                      <th className="text-center py-3 px-4 text-purple-400">30°</th>
                      <th className="text-center py-3 px-4 text-purple-400">45°</th>
                      <th className="text-center py-3 px-4 text-purple-400">60°</th>
                      <th className="text-center py-3 px-4 text-purple-400">90°</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4 text-purple-400">Angle (radians)</td>
                      <td className="text-center py-3 px-4">0</td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{\pi}{6}" /></td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{\pi}{4}" /></td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{\pi}{3}" /></td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{\pi}{2}" /></td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4"><InlineMath math="\sin \theta" /></td>
                      <td className="text-center py-3 px-4">0</td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{1}{2}" /></td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{\sqrt{2}}{2}" /></td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{\sqrt{3}}{2}" /></td>
                      <td className="text-center py-3 px-4">1</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4"><InlineMath math="\cos \theta" /></td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{\sqrt{3}}{2}" /></td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{\sqrt{2}}{2}" /></td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{1}{2}" /></td>
                      <td className="text-center py-3 px-4">0</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><InlineMath math="\tan \theta" /></td>
                      <td className="text-center py-3 px-4">0</td>
                      <td className="text-center py-3 px-4"><InlineMath math="\frac{\sqrt{3}}{3}" /></td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="text-center py-3 px-4"><InlineMath math="\sqrt{3}" /></td>
                      <td className="text-center py-3 px-4">undef</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Graphs Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">📊</span>
              Graphs of Trigonometric Functions
            </h2>

            <div className="space-y-6">
              {/* Sine */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4"><InlineMath math="y = \sin x" /></h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Domain</div>
                    <p className="text-slate-300">All real numbers</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Range</div>
                    <p className="text-slate-300">[-1, 1]</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Period</div>
                    <p className="text-slate-300"><InlineMath math="2\pi" /></p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Amplitude</div>
                    <p className="text-slate-300">1</p>
                  </div>
                </div>
              </div>

              {/* Cosine */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4"><InlineMath math="y = \cos x" /></h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Domain</div>
                    <p className="text-slate-300">All real numbers</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Range</div>
                    <p className="text-slate-300">[-1, 1]</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Period</div>
                    <p className="text-slate-300"><InlineMath math="2\pi" /></p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Amplitude</div>
                    <p className="text-slate-300">1</p>
                  </div>
                </div>
              </div>

              {/* Tangent */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4"><InlineMath math="y = \tan x" /></h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Domain</div>
                    <p className="text-slate-300">All reals except <InlineMath math="x = \frac{\pi}{2} + n\pi" /></p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Range</div>
                    <p className="text-slate-300">All real numbers</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Period</div>
                    <p className="text-slate-300"><InlineMath math="\pi" /></p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Asymptotes</div>
                    <p className="text-slate-300"><InlineMath math="x = \frac{\pi}{2} + n\pi" /></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Transformed Functions Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">🔄</span>
              Transformed Trigonometric Functions
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">General Form</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="y = a\sin(bx + c) + d" />
                </div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="y = a\cos(bx + c) + d" />
                </div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="y = a\tan(bx + c) + d" />
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Parameters</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Amplitude</div>
                    <BlockMath math="|a|" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Period</div>
                    <p className="text-slate-300 text-sm mb-2"><InlineMath math="\frac{2\pi}{|b|}" /> (for sin, cos)</p>
                    <p className="text-slate-300 text-sm"><InlineMath math="\frac{\pi}{|b|}" /> (for tan)</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Phase Shift</div>
                    <BlockMath math="-\frac{c}{b}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Vertical Shift</div>
                    <BlockMath math="d" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trigonometric Identities Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">🔗</span>
              Trigonometric Identities
            </h2>

            <div className="space-y-6">
              {/* Pythagorean Identities */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Pythagorean Identities</h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\sin^2\theta + \cos^2\theta = 1" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="1 + \tan^2\theta = \sec^2\theta" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="1 + \cot^2\theta = \csc^2\theta" />
                  </div>
                </div>
              </div>

              {/* Quotient Identities */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Quotient Identities</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\tan\theta = \frac{\sin\theta}{\cos\theta}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\cot\theta = \frac{\cos\theta}{\sin\theta}" />
                  </div>
                </div>
              </div>

              {/* Compound Angle Formulae */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Compound Angle Formulae</h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\sin(A \pm B) = \sin A \cos B \pm \cos A \sin B" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\cos(A \pm B) = \cos A \cos B \mp \sin A \sin B" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A \tan B}" />
                  </div>
                </div>
              </div>

              {/* Double Angle Formulae */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Double Angle Formulae</h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\sin 2A = 2\sin A \cos A" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\cos 2A = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\tan 2A = \frac{2\tan A}{1 - \tan^2 A}" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practice Questions Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">✏️</span>
              Practice Questions (2023 Mock)
            </h2>

            <div className="space-y-6">
              {/* Question 9 */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-4">Question 9 - Trigonometric Proof and Equations</div>

                <div className="space-y-4 text-slate-300">
                  <div>
                    <strong className="text-white">(a)(i)</strong> Prove that <InlineMath math="\frac{\sin x}{\sec x + 1} + \frac{\sin x}{\sec x - 1} = 2\cot x" />. <span className="text-slate-500">[3]</span>
                  </div>

                  <div>
                    <strong className="text-white">(a)(ii)</strong> Hence find, for <InlineMath math="0 \leq x \leq 4" />, the exact solutions of the equation <InlineMath math="\frac{\sin x}{\sec x + 1} + \frac{\sin x}{\sec x - 1} = \frac{2\tan x}{3}" />. <span className="text-slate-500">[3]</span>
                  </div>

                  <div>
                    <strong className="text-white">(b)</strong> Given that <InlineMath math="\theta" /> is obtuse and that <InlineMath math="\sin\theta = \frac{1}{\sqrt{3}}" />, express, without the use of a calculator, <InlineMath math="\frac{1}{\sin\theta - \cos\theta}" /> in the form <InlineMath math="\sqrt{a} - \sqrt{b}" /> where a and b are integers. <span className="text-slate-500">[3]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solutions
                </div>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(a)(i) Proof</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Combine the fractions on the left-hand side</p>
                      <div className="ml-4">
                        <BlockMath math="\text{LHS} = \frac{\sin x(\sec x - 1) + \sin x(\sec x + 1)}{(\sec x + 1)(\sec x - 1)}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Simplify the numerator</p>
                      <div className="ml-4">
                        <BlockMath math="= \frac{\sin x \sec x - \sin x + \sin x \sec x + \sin x}{\sec^2 x - 1}" />
                        <BlockMath math="= \frac{2\sin x \sec x}{\sec^2 x - 1}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Use the identity <InlineMath math="\sec^2 x - 1 = \tan^2 x" /></p>
                      <div className="ml-4">
                        <BlockMath math="= \frac{2\sin x \sec x}{\tan^2 x}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 4:</strong> Simplify using <InlineMath math="\sec x = \frac{1}{\cos x}" /> and <InlineMath math="\tan x = \frac{\sin x}{\cos x}" /></p>
                      <div className="ml-4">
                        <BlockMath math="= \frac{2\sin x \cdot \frac{1}{\cos x}}{\frac{\sin^2 x}{\cos^2 x}} = \frac{2\sin x}{\cos x} \cdot \frac{\cos^2 x}{\sin^2 x}" />
                        <BlockMath math="= \frac{2\cos x}{\sin x} = 2\cot x = \text{RHS} \quad \checkmark" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(a)(ii) Answer: x = π/3, 2π/3</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Use the result from part (i)</p>
                      <div className="ml-4">
                        <BlockMath math="2\cot x = \frac{2\tan x}{3}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Simplify</p>
                      <div className="ml-4">
                        <BlockMath math="2 \cdot \frac{1}{\tan x} = \frac{2\tan x}{3}" />
                        <BlockMath math="\frac{2}{\tan x} = \frac{2\tan x}{3}" />
                        <BlockMath math="6 = 2\tan^2 x" />
                        <BlockMath math="\tan^2 x = 3" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Solve for x</p>
                      <div className="ml-4">
                        <BlockMath math="\tan x = \pm\sqrt{3}" />
                        <p className="text-slate-300 mt-2">For <InlineMath math="0 \leq x \leq 4" />:</p>
                        <BlockMath math="x = \frac{\pi}{3}, \, \frac{2\pi}{3}" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(b) Answer: √6 - √3</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Find <InlineMath math="\cos\theta" /> using the Pythagorean identity</p>
                      <div className="ml-4">
                        <BlockMath math="\sin^2\theta + \cos^2\theta = 1" />
                        <BlockMath math="\left(\frac{1}{\sqrt{3}}\right)^2 + \cos^2\theta = 1" />
                        <BlockMath math="\cos^2\theta = 1 - \frac{1}{3} = \frac{2}{3}" />
                        <p className="text-slate-300 mt-2">Since <InlineMath math="\theta" /> is obtuse, <InlineMath math="\cos\theta < 0" />:</p>
                        <BlockMath math="\cos\theta = -\frac{\sqrt{2}}{\sqrt{3}}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Substitute into the expression</p>
                      <div className="ml-4">
                        <BlockMath math="\frac{1}{\sin\theta - \cos\theta} = \frac{1}{\frac{1}{\sqrt{3}} - \left(-\frac{\sqrt{2}}{\sqrt{3}}\right)}" />
                        <BlockMath math="= \frac{1}{\frac{1}{\sqrt{3}} + \frac{\sqrt{2}}{\sqrt{3}}} = \frac{1}{\frac{1 + \sqrt{2}}{\sqrt{3}}}" />
                        <BlockMath math="= \frac{\sqrt{3}}{1 + \sqrt{2}}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Rationalize the denominator</p>
                      <div className="ml-4">
                        <BlockMath math="= \frac{\sqrt{3}}{1 + \sqrt{2}} \times \frac{1 - \sqrt{2}}{1 - \sqrt{2}}" />
                        <BlockMath math="= \frac{\sqrt{3}(1 - \sqrt{2})}{1 - 2} = \frac{\sqrt{3}(1 - \sqrt{2})}{-1}" />
                        <BlockMath math="= -\sqrt{3}(1 - \sqrt{2}) = -\sqrt{3} + \sqrt{6}" />
                        <BlockMath math="= \sqrt{6} - \sqrt{3}" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 10 */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-4">Question 10 - R Formula Application</div>

                <div className="space-y-4 text-slate-300">
                  <p>
                    The figure shows a stage prop ABC used by a member of the theatre, leaning against a vertical wall OP. It is given that AB = 30 cm, BC = 100 cm, <InlineMath math="\angle ABC = \angle AOC = 90°" /> and <InlineMath math="\angle BCO = \theta" />.
                  </p>

                  <div>
                    <strong className="text-white">(i)</strong> Show that <InlineMath math="OC = (100\cos\theta + 30\sin\theta)" /> cm. <span className="text-slate-500">[2]</span>
                  </div>

                  <div>
                    <strong className="text-white">(ii)</strong> Express OC in terms of <InlineMath math="R\cos(\theta - \alpha)" />, where R is a positive constant and <InlineMath math="\alpha" /> is an acute angle. <span className="text-slate-500">[2]</span>
                  </div>

                  <div>
                    <strong className="text-white">(iii)</strong> State the maximum value of OC and the corresponding value of <InlineMath math="\theta" />. <span className="text-slate-500">[2]</span>
                  </div>

                  <div>
                    <strong className="text-white">(iv)</strong> Find the value of <InlineMath math="\theta" /> for which OC = 80 cm. <span className="text-slate-500">[2]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solutions
                </div>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(i) Proof</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Analyze the geometry</p>
                      <div className="ml-4">
                        <p className="text-slate-300">From triangle BCD (where D is the projection of C onto the horizontal):</p>
                        <BlockMath math="CD = BC\cos\theta = 100\cos\theta" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Find the contribution from AB</p>
                      <div className="ml-4">
                        <p className="text-slate-300">From triangle ABE (where E is the projection of A onto the vertical):</p>
                        <BlockMath math="AE = AB\sin\theta = 30\sin\theta" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Add the components</p>
                      <div className="ml-4">
                        <BlockMath math="OC = CD + AE = 100\cos\theta + 30\sin\theta \quad \checkmark" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(ii) Answer: OC = 10√109 cos(θ - 16.7°)</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Find R using <InlineMath math="R = \sqrt{a^2 + b^2}" /></p>
                      <div className="ml-4">
                        <BlockMath math="R = \sqrt{100^2 + 30^2} = \sqrt{10000 + 900} = \sqrt{10900} = 10\sqrt{109}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Find <InlineMath math="\alpha" /> using <InlineMath math="\tan\alpha = \frac{b}{a}" /></p>
                      <div className="ml-4">
                        <BlockMath math="\tan\alpha = \frac{30}{100} = \frac{3}{10}" />
                        <BlockMath math="\alpha = \tan^{-1}\left(\frac{3}{10}\right) \approx 16.7°" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Express in R formula</p>
                      <div className="ml-4">
                        <BlockMath math="OC = 10\sqrt{109}\cos(\theta - 16.7°)" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(iii) Answer: OC_max = 10√109 cm when θ = 16.7°</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p className="text-white">
                        The maximum value of <InlineMath math="R\cos(\theta - \alpha)" /> is R, which occurs when <InlineMath math="\cos(\theta - \alpha) = 1" />.
                      </p>
                      <div className="ml-4">
                        <p>This happens when <InlineMath math="\theta - \alpha = 0" />, i.e., <InlineMath math="\theta = \alpha" />.</p>
                        <BlockMath math="OC_{\text{max}} = 10\sqrt{109} \text{ cm when } \theta = 16.7°" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(iv) Answer: θ = 56.7°</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Substitute OC = 80 into the R formula</p>
                      <div className="ml-4">
                        <BlockMath math="80 = 10\sqrt{109}\cos(\theta - 16.7°)" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Solve for the angle</p>
                      <div className="ml-4">
                        <BlockMath math="\cos(\theta - 16.7°) = \frac{80}{10\sqrt{109}} = \frac{8}{\sqrt{109}}" />
                        <BlockMath math="\theta - 16.7° = \cos^{-1}\left(\frac{8}{\sqrt{109}}\right) \approx 40°" />
                        <BlockMath math="\theta \approx 40° + 16.7° = 56.7°" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Things to Remember Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">💡</span>
              Things to Remember
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Always check calculator is in correct mode (degrees/radians)</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>General solution: add period × n where <InlineMath math="n \in \mathbb{Z}" /></span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Verify solutions in original equation to avoid extraneous solutions</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Solutions must be in the given range only unless stated otherwise</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Use the unit circle to determine signs of trig functions in each quadrant</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Master the special angles (0°, 30°, 45°, 60°, 90°) for quick calculations</span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/a7"
              className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Exponential & Log
            </Link>
            <Link
              href="/topics/g2"
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
            >
              Next: Coordinate Geometry
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
