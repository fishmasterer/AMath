'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function BinomialExpansionPage() {
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
                <div className="text-blue-400 font-bold text-sm mb-1">TOPIC A6</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Binomial Expansion</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Expanding powers of binomials using the binomial theorem
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* The Binomial Theorem Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📘</span>
              The Binomial Theorem
            </h2>

            <div className="space-y-6">
              {/* Expansion Formula */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Expansion Formula</h3>
                <p className="text-slate-300 mb-4">
                  The binomial theorem provides a formula for expanding <InlineMath math="(a + b)^n" /> where n is a positive integer:
                </p>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="(a + b)^n = \sum_{r=0}^{n} \binom{n}{r} a^{n-r}b^r" />
                </div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="(a + b)^n = \binom{n}{0}a^n + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^2 + \ldots + \binom{n}{n}b^n" />
                </div>
              </div>

              {/* General Term */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">General Term</h3>
                <p className="text-slate-300 mb-4">
                  The <InlineMath math="(r+1)" />th term in the expansion of <InlineMath math="(a + b)^n" /> is:
                </p>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="T_{r+1} = \binom{n}{r} a^{n-r}b^r" />
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 mt-4">
                  <div className="text-blue-400 font-semibold mb-2 text-sm">Important Note:</div>
                  <p className="text-slate-300 text-sm">
                    The general term is <InlineMath math="T_{r+1}" /> (not <InlineMath math="T_r" />), which means the first term corresponds to <InlineMath math="r=0" />, second term to <InlineMath math="r=1" />, etc.
                  </p>
                </div>
              </div>

              {/* Pascal's Triangle */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Pascal's Triangle</h3>
                <p className="text-slate-300 mb-4">
                  Pascal's Triangle provides a visual way to find binomial coefficients. Each number is the sum of the two numbers directly above it:
                </p>
                <div className="bg-slate-800/80 rounded-lg p-8 overflow-x-auto">
                  <pre className="text-cyan-400 font-mono text-center text-sm sm:text-base">
{`        1
      1   1
    1   2   1
  1   3   3   1
1   4   6   4   1
              `}
                  </pre>
                </div>
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-5 mt-4">
                  <div className="text-cyan-400 font-semibold mb-3">Pattern:</div>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <p>• Row 0: coefficients for <InlineMath math="(a+b)^0 = 1" /></p>
                    <p>• Row 1: coefficients for <InlineMath math="(a+b)^1 = 1a + 1b" /></p>
                    <p>• Row 2: coefficients for <InlineMath math="(a+b)^2 = 1a^2 + 2ab + 1b^2" /></p>
                    <p>• Row 3: coefficients for <InlineMath math="(a+b)^3 = 1a^3 + 3a^2b + 3ab^2 + 1b^3" /></p>
                    <p>• Row 4: coefficients for <InlineMath math="(a+b)^4 = 1a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + 1b^4" /></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Combinations Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">🔢</span>
              Combinations
            </h2>

            <div className="space-y-6">
              {/* Formula */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Formula</h3>
                <p className="text-slate-300 mb-4">
                  The binomial coefficient <InlineMath math="\binom{n}{r}" /> (read as "n choose r") is calculated using:
                </p>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\binom{n}{r} = ^nC_r = \frac{n!}{r!(n-r)!}" />
                </div>
                <div className="mt-4 text-slate-400 text-sm">
                  <p>where <InlineMath math="n!" /> (n factorial) means <InlineMath math="n \times (n-1) \times (n-2) \times \ldots \times 2 \times 1" /></p>
                </div>
              </div>

              {/* Properties */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Properties of <InlineMath math="^nC_r" /></h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Property 1: Boundary Values</div>
                    <div className="space-y-2">
                      <BlockMath math="^nC_0 = 1" />
                      <BlockMath math="^nC_n = 1" />
                    </div>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Property 2: Symmetry</div>
                    <BlockMath math="^nC_r = ^nC_{n-r}" />
                    <p className="text-slate-400 text-xs mt-2">Choosing r items is same as leaving (n-r) items</p>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5 sm:col-span-2">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Property 3: Pascal's Identity</div>
                    <BlockMath math="^nC_r + ^nC_{r+1} = ^{n+1}C_{r+1}" />
                    <p className="text-slate-400 text-xs mt-2">This is the fundamental property that generates Pascal's Triangle</p>
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
                <div className="text-blue-400 font-bold mb-4">Question 6 - Binomial Theorem</div>

                <div className="space-y-4 text-slate-300">
                  <div>
                    <strong className="text-white">(a)</strong> By considering the general term in the binomial expansion of <InlineMath math="\left(kx - \frac{1}{x^3}\right)^7" />, where k is a constant, explain why there are no even powers of x in this expansion. <span className="text-slate-500">[3]</span>
                  </div>

                  <div>
                    <strong className="text-white">(b)</strong> Given that the coefficient of the third term is thrice the coefficient of the second term, find the value of k. <span className="text-slate-500">[3]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solutions
                </div>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(a) Explanation:</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Write the general term</p>
                      <div className="ml-4">
                        <BlockMath math="T_{r+1} = \binom{7}{r}(kx)^{7-r}\left(-\frac{1}{x^3}\right)^r" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Simplify</p>
                      <div className="ml-4">
                        <BlockMath math="T_{r+1} = \binom{7}{r}k^{7-r}(-1)^r \cdot x^{7-r} \cdot x^{-3r}" />
                        <BlockMath math="T_{r+1} = \binom{7}{r}k^{7-r}(-1)^r \cdot x^{7-4r}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Analyze the power of x</p>
                      <div className="ml-4 space-y-2">
                        <p className="text-slate-300">Power of x = <InlineMath math="7 - 4r" /></p>
                        <p className="text-slate-300">We can rewrite this as: <InlineMath math="7 - 4r = 2(3 - 2r) + 1" /></p>
                        <p className="text-cyan-400">This is of the form <InlineMath math="2m + 1" /> where <InlineMath math="m = 3 - 2r" /> is an integer</p>
                      </div>

                      <div className="pt-3 border-t border-slate-700">
                        <p className="text-green-400 font-semibold">Conclusion:</p>
                        <p className="text-white">Since the power of x is always of the form <InlineMath math="2m + 1" /> (i.e., odd), there are no even powers of x in this expansion.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(b) Answer: k = -1</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Find the coefficient of the second term (r = 1)</p>
                      <div className="ml-4">
                        <p>Coefficient of <InlineMath math="T_2" />: <InlineMath math="\binom{7}{1}k^{6}(-1)^1 = -7k^6" /></p>
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Find the coefficient of the third term (r = 2)</p>
                      <div className="ml-4">
                        <p>Coefficient of <InlineMath math="T_3" />: <InlineMath math="\binom{7}{2}k^{5}(-1)^2 = 21k^5" /></p>
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Set up the equation</p>
                      <div className="ml-4">
                        <p>Given: Coefficient of third term = 3 × Coefficient of second term</p>
                        <BlockMath math="21k^5 = 3 \times (-7k^6)" />
                        <BlockMath math="21k^5 = -21k^6" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 4:</strong> Solve for k</p>
                      <div className="ml-4 space-y-2">
                        <BlockMath math="21k^5 = -21k^6" />
                        <BlockMath math="1 = -k" />
                        <BlockMath math="k = -1" />
                      </div>

                      <div className="pt-3 border-t border-slate-700">
                        <p className="text-green-400 font-semibold text-base">Final Answer: <InlineMath math="k = -1" /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Cases Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">⭐</span>
              Special Cases
            </h2>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
              <h3 className="text-xl font-semibold text-white mb-4">Expansion of <InlineMath math="(1 + x)^n" /></h3>
              <p className="text-slate-300 mb-4">
                When <InlineMath math="a = 1" /> and <InlineMath math="b = x" />, we get the special case:
              </p>
              <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                <BlockMath math="(1 + x)^n = 1 + nx + \frac{n(n-1)}{2!}x^2 + \frac{n(n-1)(n-2)}{3!}x^3 + \ldots" />
              </div>
              <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                <BlockMath math="(1 + x)^n = \sum_{r=0}^{n} \binom{n}{r} x^r" />
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 mt-4">
                <div className="text-blue-400 font-semibold mb-2 text-sm">Common Applications:</div>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>This form is frequently used in approximation problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Useful for finding specific terms or coefficients quickly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Can be extended to negative and fractional powers (for <InlineMath math="|x| < 1" />)</span>
                  </li>
                </ul>
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
                  <span>The middle term in a binomial expansion has the largest coefficient</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Sum of all coefficients = <InlineMath math="2^n" /> (substitute <InlineMath math="a = b = 1" />)</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>The expansion has <InlineMath math="(n+1)" /> terms when n is a positive integer</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Watch out for negative signs and fractional powers in terms like <InlineMath math="(x - y)^n" /> or <InlineMath math="\left(x - \frac{1}{x}\right)^n" /></span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Remember to simplify powers when dealing with terms like <InlineMath math="(x^2)^n" /> or <InlineMath math="(x^{-1})^r" /></span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Use symmetry property <InlineMath math="^nC_r = ^nC_{n-r}" /> to simplify calculations</span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/a5"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Partial Fractions
            </Link>
            <Link
              href="/topics/a7"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              Next: Exponential & Log
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
