'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function PartialFractionsPage() {
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
                <div className="text-cyan-400 font-bold text-sm mb-1">TOPIC A5</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Partial Fractions</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Breaking down complex rational functions into simpler fractions
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Definition Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📘</span>
              Definition
            </h2>

            <div className="space-y-6 text-slate-300">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                <p className="text-lg leading-relaxed">
                  <strong className="text-white">Partial fractions</strong> (or partial fraction decomposition) is a method of breaking down a complex rational function into simpler fractions that are easier to integrate or work with.
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-5">
                <div className="text-cyan-400 font-semibold mb-3">Key Principle:</div>
                <p>A rational function with a polynomial denominator can be decomposed into simpler fractions.</p>
              </div>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">✓</span>
              Requirements
            </h2>

            <div className="space-y-4">
              <p className="text-slate-300 mb-4">For partial fraction decomposition to work:</p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-800/50">
                  <div className="text-cyan-400 font-semibold mb-3 text-lg">1. Proper Fraction</div>
                  <p className="text-slate-300 text-sm">
                    The fraction must be <strong className="text-white">proper</strong> (degree of numerator &lt; degree of denominator)
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-800/50">
                  <div className="text-cyan-400 font-semibold mb-3 text-lg">2. Division First</div>
                  <p className="text-slate-300 text-sm">
                    If not proper, perform <strong className="text-white">polynomial long division</strong> first
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-800/50">
                  <div className="text-cyan-400 font-semibold mb-3 text-lg">3. Factorable</div>
                  <p className="text-slate-300 text-sm">
                    The denominator must be <strong className="text-white">factorable</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Three Cases Section - MAIN CONTENT */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">🔢</span>
              The Three Cases
            </h2>

            <div className="space-y-8">
              {/* CASE 1: Distinct Linear Factors */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm">Case 1</span>
                  Distinct Linear Factors
                </h3>

                <p className="text-slate-300 mb-4">
                  When denominator has factors like <InlineMath math="(ax + b)(cx + d)\ldots" />
                </p>

                <div className="bg-slate-800/80 rounded-lg p-6 mb-4">
                  <div className="text-cyan-400 text-sm mb-3 font-semibold">Form:</div>
                  <BlockMath math="\frac{P(x)}{(ax+b)(cx+d)} = \frac{A}{ax+b} + \frac{B}{cx+d}" />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 mb-4">
                  <div className="text-blue-400 font-semibold mb-2 text-sm">Method:</div>
                  <p className="text-slate-300 text-sm">Substitution method (usually faster)</p>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-5">
                  <div className="text-cyan-400 font-semibold mb-4">Example:</div>
                  <div className="space-y-3 text-slate-300 text-sm">
                    <p className="text-white">Express <InlineMath math="\frac{5x+1}{(x-1)(x+2)}" /> as partial fractions</p>

                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                      <p><strong className="text-white">Solution:</strong></p>
                      <BlockMath math="\frac{5x+1}{(x-1)(x+2)} = \frac{A}{x-1} + \frac{B}{x+2}" />

                      <p>Multiply both sides by <InlineMath math="(x-1)(x+2)" />:</p>
                      <BlockMath math="5x + 1 = A(x+2) + B(x-1)" />

                      <p className="text-cyan-400">Substitute <InlineMath math="x = 1" />:</p>
                      <BlockMath math="5(1) + 1 = A(1+2) + 0" />
                      <BlockMath math="6 = 3A \quad \Rightarrow \quad A = 2" />

                      <p className="text-cyan-400">Substitute <InlineMath math="x = -2" />:</p>
                      <BlockMath math="5(-2) + 1 = 0 + B(-2-1)" />
                      <BlockMath math="-9 = -3B \quad \Rightarrow \quad B = 3" />

                      <div className="pt-3 border-t border-slate-700">
                        <p className="text-green-400 font-semibold">Answer:</p>
                        <BlockMath math="\frac{5x+1}{(x-1)(x+2)} = \frac{2}{x-1} + \frac{3}{x+2}" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CASE 2: Repeated Linear Factors */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm">Case 2</span>
                  Repeated Linear Factors
                </h3>

                <p className="text-slate-300 mb-4">
                  When denominator has repeated factors like <InlineMath math="(ax + b)^2" />
                </p>

                <div className="bg-slate-800/80 rounded-lg p-6 mb-4">
                  <div className="text-cyan-400 text-sm mb-3 font-semibold">Form:</div>
                  <BlockMath math="\frac{P(x)}{(ax+b)^2} = \frac{A}{ax+b} + \frac{B}{(ax+b)^2}" />
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <BlockMath math="\frac{P(x)}{(ax+b)^2(cx+d)} = \frac{A}{ax+b} + \frac{B}{(ax+b)^2} + \frac{C}{cx+d}" />
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 mb-4">
                  <div className="text-blue-400 font-semibold mb-2 text-sm">Method:</div>
                  <p className="text-slate-300 text-sm">Substitution + Equating Coefficients</p>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-5">
                  <div className="text-cyan-400 font-semibold mb-4">Example:</div>
                  <div className="space-y-3 text-slate-300 text-sm">
                    <p className="text-white">Express <InlineMath math="\frac{3x+5}{(x+1)^2}" /> as partial fractions</p>

                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                      <p><strong className="text-white">Solution:</strong></p>
                      <BlockMath math="\frac{3x+5}{(x+1)^2} = \frac{A}{x+1} + \frac{B}{(x+1)^2}" />

                      <p>Multiply by <InlineMath math="(x+1)^2" />:</p>
                      <BlockMath math="3x + 5 = A(x+1) + B" />

                      <p className="text-cyan-400">Substitute <InlineMath math="x = -1" />:</p>
                      <BlockMath math="3(-1) + 5 = 0 + B" />
                      <BlockMath math="2 = B" />

                      <p className="text-cyan-400">Substitute <InlineMath math="x = 0" />:</p>
                      <BlockMath math="5 = A(1) + 2" />
                      <BlockMath math="A = 3" />

                      <div className="pt-3 border-t border-slate-700">
                        <p className="text-green-400 font-semibold">Answer:</p>
                        <BlockMath math="\frac{3x+5}{(x+1)^2} = \frac{3}{x+1} + \frac{2}{(x+1)^2}" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CASE 3: Irreducible Quadratic Factors */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm">Case 3</span>
                  Irreducible Quadratic Factors
                </h3>

                <p className="text-slate-300 mb-4">
                  When denominator has quadratic factors that don't factor (like <InlineMath math="x^2 + 1" />)
                </p>

                <div className="bg-slate-800/80 rounded-lg p-6 mb-4">
                  <div className="text-cyan-400 text-sm mb-3 font-semibold">Form:</div>
                  <BlockMath math="\frac{P(x)}{(ax+b)(x^2+c)} = \frac{A}{ax+b} + \frac{Bx+C}{x^2+c}" />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 mb-4">
                  <div className="text-blue-400 font-semibold mb-2 text-sm">Key Point:</div>
                  <p className="text-slate-300 text-sm">Numerator over quadratic is <strong className="text-white">linear</strong> <InlineMath math="(Bx + C)" />, not just constant</p>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-5">
                  <div className="text-cyan-400 font-semibold mb-4">Example:</div>
                  <div className="space-y-3 text-slate-300 text-sm">
                    <p className="text-white">Express <InlineMath math="\frac{1}{(x-1)(x^2+1)}" /> as partial fractions</p>

                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                      <p><strong className="text-white">Solution:</strong></p>
                      <BlockMath math="\frac{1}{(x-1)(x^2+1)} = \frac{A}{x-1} + \frac{Bx+C}{x^2+1}" />

                      <p>Multiply by <InlineMath math="(x-1)(x^2+1)" />:</p>
                      <BlockMath math="1 = A(x^2+1) + (Bx+C)(x-1)" />

                      <p className="text-cyan-400">Substitute <InlineMath math="x = 1" />:</p>
                      <BlockMath math="1 = A(2) + 0" />
                      <BlockMath math="A = \frac{1}{2}" />

                      <p className="text-cyan-400">Expand and equate coefficients:</p>
                      <BlockMath math="1 = Ax^2 + A + Bx^2 - Bx + Cx - C" />
                      <BlockMath math="1 = (A+B)x^2 + (C-B)x + (A-C)" />

                      <p>Coefficient of <InlineMath math="x^2" />: <InlineMath math="0 = A + B \Rightarrow B = -\frac{1}{2}" /></p>
                      <p>Constant term: <InlineMath math="1 = A - C \Rightarrow C = -\frac{1}{2}" /></p>

                      <div className="pt-3 border-t border-slate-700">
                        <p className="text-green-400 font-semibold">Answer:</p>
                        <BlockMath math="\frac{1}{(x-1)(x^2+1)} = \frac{1}{2(x-1)} + \frac{-\frac{1}{2}x - \frac{1}{2}}{x^2+1}" />
                      </div>
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
                <div className="text-blue-400 font-bold mb-4">Question 5(c) - Partial Fractions</div>

                <div className="space-y-4 text-slate-300">
                  <div>
                    Express <InlineMath math="\frac{4x^3 + x^2 + 6}{(x-2)(x^2+2)}" /> in partial fractions. <span className="text-slate-500">[4]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solution
                </div>

                <div className="space-y-4 text-slate-300">
                  <div className="text-cyan-400 font-semibold mb-3">
                    Answer: <InlineMath math="4 + \frac{7}{x-2} + \frac{2x-4}{x^2+2}" />
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                    <p><strong className="text-white">Step 1:</strong> Check if proper fraction</p>
                    <p className="ml-4">Numerator degree (3) ≥ denominator degree (3), so perform division first</p>

                    <p className="mt-3"><strong className="text-white">Step 2:</strong> After polynomial division:</p>
                    <BlockMath math="\frac{4x^3 + x^2 + 6}{(x-2)(x^2+2)} = 4 + \frac{Ax^2 + Bx + C}{(x-2)(x^2+2)}" />

                    <p className="mt-3"><strong className="text-white">Step 3:</strong> Set up partial fractions for the remainder:</p>
                    <BlockMath math="\frac{Ax^2 + Bx + C}{(x-2)(x^2+2)} = \frac{A}{x-2} + \frac{Bx+C}{x^2+2}" />

                    <p className="mt-3">Multiply by <InlineMath math="(x-2)(x^2+2)" />:</p>
                    <BlockMath math="4x^3 + x^2 + 6 = 4(x-2)(x^2+2) + A(x^2+2) + (Bx+C)(x-2)" />

                    <p className="mt-3 text-cyan-400"><strong>Substitute <InlineMath math="x = 2" />:</strong></p>
                    <BlockMath math="32 + 4 + 6 = A(6)" />
                    <BlockMath math="A = 7" />

                    <p className="mt-3 text-cyan-400"><strong>Substitute <InlineMath math="x = 0" />:</strong></p>
                    <BlockMath math="6 = -16 + 2(7) + C(-2)" />
                    <BlockMath math="C = -4" />

                    <p className="mt-3 text-cyan-400"><strong>Compare <InlineMath math="x^2" /> coefficients:</strong></p>
                    <BlockMath math="1 = -8 + 7 + B" />
                    <BlockMath math="B = 2" />

                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-green-400 font-semibold text-base">Final Answer:</p>
                      <BlockMath math="\frac{4x^3 + x^2 + 6}{(x-2)(x^2+2)} = 4 + \frac{7}{x-2} + \frac{2x-4}{x^2+2}" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Method Summary Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📋</span>
              Method Summary
            </h2>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
              <h3 className="text-lg font-semibold text-white mb-4">Steps for Partial Fractions:</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-bold flex-shrink-0">1</span>
                  <div>
                    <strong className="text-white">Check if proper fraction</strong>
                    <p className="text-sm mt-1">If not, do polynomial division first</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-bold flex-shrink-0">2</span>
                  <div>
                    <strong className="text-white">Factor denominator</strong>
                    <p className="text-sm mt-1">Factor completely into linear and/or quadratic terms</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-bold flex-shrink-0">3</span>
                  <div>
                    <strong className="text-white">Set up form</strong>
                    <p className="text-sm mt-1">Based on factor types (distinct linear, repeated, or irreducible quadratic)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-bold flex-shrink-0">4</span>
                  <div>
                    <strong className="text-white">Find unknowns</strong>
                    <p className="text-sm mt-1">Use substitution method (substitute convenient x values) or equating coefficients method (expand and compare coefficients), or combination of both</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-bold flex-shrink-0">5</span>
                  <div>
                    <strong className="text-white">Write final answer</strong>
                    <p className="text-sm mt-1">Verify by adding fractions back together</p>
                  </div>
                </li>
              </ul>
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
                  <span>Each repeated factor <InlineMath math="(x-a)^2" /> requires separate terms for <InlineMath math="(x-a)" /> and <InlineMath math="(x-a)^2" /></span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Irreducible quadratic denominators get linear numerators <InlineMath math="(Bx + C)" /></span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Always verify answer by adding fractions back together</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Partial fractions are essential for integration of rational functions</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50 sm:col-span-2">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Practice changing signs when denominators have <InlineMath math="(a-x)" /> form</span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/a4"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Polynomials
            </Link>
            <Link
              href="/topics/a6"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              Next: Binomial Expansion
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
