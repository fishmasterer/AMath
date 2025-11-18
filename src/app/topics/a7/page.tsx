'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function ExponentialLogarithmicPage() {
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
                <div className="text-blue-400 font-bold text-sm mb-1">TOPIC A7</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Exponential and Logarithmic Functions</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Understanding exponential growth and decay, and the inverse relationship with logarithms
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Index Laws Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📐</span>
              Index Laws
            </h2>

            <div className="space-y-6">
              {/* Basic Laws */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Basic Laws</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="a^m \times a^n = a^{m+n}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="a^m \div a^n = a^{m-n}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="(a^m)^n = a^{mn}" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="a^0 = 1 \quad (a \neq 0)" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5 sm:col-span-2">
                    <BlockMath math="a^{-n} = \frac{1}{a^n}" />
                  </div>
                </div>
              </div>

              {/* Rational Indices */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Rational Indices</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="a^{1/n} = \sqrt[n]{a}" />
                </div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="a^{m/n} = \sqrt[n]{a^m} = (\sqrt[n]{a})^m" />
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 mt-4">
                  <div className="text-blue-400 font-semibold mb-2 text-sm">Example:</div>
                  <p className="text-slate-300 text-sm">
                    <InlineMath math="8^{2/3} = \sqrt[3]{8^2} = \sqrt[3]{64} = 4" /> or <InlineMath math="8^{2/3} = (\sqrt[3]{8})^2 = 2^2 = 4" />
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Exponential Functions Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📈</span>
              Exponential Functions
            </h2>

            <div className="space-y-6">
              {/* General Form */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">General Form</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="y = a^x \quad \text{where } a > 0, \, a \neq 1" />
                </div>
              </div>

              {/* Natural Exponential */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">The Natural Exponential</h3>
                <p className="text-slate-300 mb-4">
                  The natural exponential function uses Euler's number e as the base:
                </p>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="e \approx 2.71828..." />
                </div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="y = e^x" />
                </div>
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-5 mt-4">
                  <div className="text-cyan-400 font-semibold mb-3">Why e is special:</div>
                  <p className="text-slate-300 text-sm">
                    The natural exponential function <InlineMath math="e^x" /> is unique in that its derivative equals itself: <InlineMath math="\frac{d}{dx}(e^x) = e^x" />
                  </p>
                </div>
              </div>

              {/* Properties */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Properties of <InlineMath math="y = a^x" /></h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Domain</div>
                    <p className="text-slate-300">All real numbers</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Range</div>
                    <p className="text-slate-300"><InlineMath math="y > 0" /></p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">y-intercept</div>
                    <p className="text-slate-300">(0, 1)</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Horizontal Asymptote</div>
                    <p className="text-slate-300"><InlineMath math="y = 0" /></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practice Questions Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">✏️</span>
              Practice Questions (2023 Mock)
            </h2>

            <div className="space-y-6">
              {/* Question 3 */}
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                <div className="text-blue-400 font-bold mb-4">Question 3 - Exponential Cooling</div>

                <div className="space-y-4 text-slate-300">
                  <p>
                    An object is heated until it reaches a temperature of <InlineMath math="T_0" />°C. It is then allowed to cool. Its temperature, T°C, when it has been cooled for n minutes, is given by the equation <InlineMath math="T = 33 + 12e^{-3n/4}" />.
                  </p>

                  <div>
                    <strong className="text-white">(i)</strong> Find the value of <InlineMath math="T_0" />. <span className="text-slate-500">[1]</span>
                  </div>

                  <div>
                    <strong className="text-white">(ii)</strong> Find the value of n when T = 37°C. <span className="text-slate-500">[1]</span>
                  </div>

                  <div>
                    <strong className="text-white">(iii)</strong> Find the value of n at which the rate of decrease of temperature is 0.67°C/minute. <span className="text-slate-500">[1]</span>
                  </div>

                  <div>
                    <strong className="text-white">(iv)</strong> Explain why the temperature of the object is always greater than 33°C. <span className="text-slate-500">[1]</span>
                  </div>

                  <div>
                    <strong className="text-white">(v)</strong> Sketch the graph of <InlineMath math="T = 33 + 12e^{-3n/4}" />. <span className="text-slate-500">[1]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solutions
                </div>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(i) Answer: T₀ = 45°C</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Substitute n = 0 into the equation</p>
                      <div className="ml-4">
                        <BlockMath math="T_0 = 33 + 12e^{0}" />
                        <BlockMath math="T_0 = 33 + 12(1) = 45\text{°C}" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(ii) Answer: n = 1.46 minutes</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Substitute T = 37 into the equation</p>
                      <div className="ml-4">
                        <BlockMath math="37 = 33 + 12e^{-3n/4}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Solve for n</p>
                      <div className="ml-4">
                        <BlockMath math="4 = 12e^{-3n/4}" />
                        <BlockMath math="e^{-3n/4} = \frac{1}{3}" />
                        <BlockMath math="-\frac{3n}{4} = \ln\left(\frac{1}{3}\right) = -\ln 3" />
                        <BlockMath math="n = \frac{4\ln 3}{3} \approx 1.46" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(iii) Answer: n = 3.46 minutes</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Find the derivative</p>
                      <div className="ml-4">
                        <BlockMath math="\frac{dT}{dn} = 12 \times \left(-\frac{3}{4}\right)e^{-3n/4} = -9e^{-3n/4}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Set rate equal to -0.67</p>
                      <div className="ml-4">
                        <BlockMath math="-0.67 = -9e^{-3n/4}" />
                        <BlockMath math="e^{-3n/4} = \frac{0.67}{9}" />
                        <BlockMath math="-\frac{3n}{4} = \ln\left(\frac{0.67}{9}\right)" />
                        <BlockMath math="n \approx 3.46" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(iv) Explanation</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p className="text-white">
                        Since <InlineMath math="12e^{-3n/4} > 0" /> for all values of n (exponential functions are always positive), we have:
                      </p>
                      <div className="ml-4">
                        <BlockMath math="T = 33 + 12e^{-3n/4} > 33" />
                      </div>
                      <p className="text-white">
                        Therefore, the temperature is always greater than 33°C.
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(v) Graph Description</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p className="text-white">The graph shows:</p>
                      <ul className="ml-4 space-y-2">
                        <li>• Exponential decay curve</li>
                        <li>• Starting point at (0, 45)</li>
                        <li>• Approaching horizontal asymptote y = 33 as n → ∞</li>
                        <li>• Always decreasing and always above y = 33</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 4 */}
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                <div className="text-blue-400 font-bold mb-4">Question 4 - Logarithmic Equations</div>

                <div className="space-y-4 text-slate-300">
                  <div>
                    <strong className="text-white">(a)</strong> Find the value(s) of y that satisfy the equation <InlineMath math="\log_4(2y) = \log_{16}(y-3) + 3\log_9 3" />. <span className="text-slate-500">[3]</span>
                  </div>

                  <div>
                    <strong className="text-white">(b)</strong> Solve the equation <InlineMath math="3\log_x 3 = 8 - 4\log_3 x" />. <span className="text-slate-500">[3]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solutions
                </div>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(a) Answer: y = 4 or y = 12</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Convert all logarithms to base 4</p>
                      <div className="ml-4 space-y-2">
                        <p><InlineMath math="\log_{16}(y-3) = \frac{\log_4(y-3)}{\log_4 16} = \frac{\log_4(y-3)}{2}" /></p>
                        <p><InlineMath math="3\log_9 3 = 3 \times \frac{1}{2} = \frac{3}{2}" /></p>
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Substitute into the equation</p>
                      <div className="ml-4">
                        <BlockMath math="\log_4(2y) = \frac{\log_4(y-3)}{2} + \frac{3}{2}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Multiply by 2</p>
                      <div className="ml-4">
                        <BlockMath math="2\log_4(2y) = \log_4(y-3) + 3" />
                        <BlockMath math="\log_4[(2y)^2] = \log_4(y-3) + 3" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 4:</strong> Simplify</p>
                      <div className="ml-4">
                        <BlockMath math="\log_4\left[\frac{(2y)^2}{y-3}\right] = 3" />
                        <BlockMath math="\frac{4y^2}{y-3} = 4^3 = 64" />
                        <BlockMath math="4y^2 = 64(y-3)" />
                        <BlockMath math="y^2 = 16y - 48" />
                        <BlockMath math="y^2 - 16y + 48 = 0" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 5:</strong> Factor and solve</p>
                      <div className="ml-4">
                        <BlockMath math="(y-4)(y-12) = 0" />
                        <BlockMath math="y = 4 \text{ or } y = 12" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-400 font-semibold mb-3">(b) Answer: x = 3^(1/3) or x = 3^(2/3)</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Use the property <InlineMath math="\log_x 3 = \frac{1}{\log_3 x}" /></p>
                      <div className="ml-4">
                        <p>Let <InlineMath math="u = \log_3 x" />, then <InlineMath math="\log_x 3 = \frac{1}{u}" /></p>
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Substitute into equation</p>
                      <div className="ml-4">
                        <BlockMath math="3 \times \frac{1}{u} = 8 - 4u" />
                        <BlockMath math="\frac{3}{u} = 8 - 4u" />
                        <BlockMath math="3 = 8u - 4u^2" />
                        <BlockMath math="4u^2 - 8u + 3 = 0" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Solve using quadratic formula</p>
                      <div className="ml-4">
                        <BlockMath math="u = \frac{8 \pm \sqrt{64-48}}{8} = \frac{8 \pm 4}{8}" />
                        <BlockMath math="u = \frac{3}{2} \text{ or } u = \frac{1}{2}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 4:</strong> Convert back to x</p>
                      <div className="ml-4">
                        <p>If <InlineMath math="u = \frac{3}{2}" />: <InlineMath math="\log_3 x = \frac{3}{2}" />, so <InlineMath math="x = 3^{3/2}" /></p>
                        <p>If <InlineMath math="u = \frac{1}{2}" />: <InlineMath math="\log_3 x = \frac{1}{2}" />, so <InlineMath math="x = 3^{1/2}" /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Logarithmic Functions Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📉</span>
              Logarithmic Functions
            </h2>

            <div className="space-y-6">
              {/* Definition */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Definition</h3>
                <p className="text-slate-300 mb-4">
                  The logarithm is the inverse operation of exponentiation:
                </p>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="\text{If } a^x = b \text{ then } \log_a b = x" />
                </div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\text{where } a > 0, \, a \neq 1, \, b > 0" />
                </div>
              </div>

              {/* Special Logarithms */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Special Logarithms</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Common Logarithm (base 10)</div>
                    <BlockMath math="\log_{10} x = \lg x" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Natural Logarithm (base e)</div>
                    <BlockMath math="\log_e x = \ln x" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Laws of Logarithms Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">⚖️</span>
              Laws of Logarithms
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-cyan-400 font-semibold mb-3">Product Rule</div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\log_a(PQ) = \log_a P + \log_a Q" />
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-cyan-400 font-semibold mb-3">Quotient Rule</div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\log_a\left(\frac{P}{Q}\right) = \log_a P - \log_a Q" />
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-cyan-400 font-semibold mb-3">Power Rule</div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\log_a(P^b) = b\log_a P" />
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-cyan-400 font-semibold mb-3">Special Values</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\log_a a = 1" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <BlockMath math="\log_a 1 = 0" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-cyan-400 font-semibold mb-3">Change of Base Rule</div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="\log_a b = \frac{\log_c b}{\log_c a}" />
                </div>
                <p className="text-slate-300 text-sm mb-3">Commonly used with base 10 or base e:</p>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\log_a b = \frac{\ln b}{\ln a} = \frac{\lg b}{\lg a}" />
                </div>
              </div>
            </div>
          </section>

          {/* Solving Equations Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">🔍</span>
              Solving Equations
            </h2>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
              <h3 className="text-xl font-semibold text-white mb-4">Solving <InlineMath math="a^x = b" /></h3>
              <p className="text-slate-300 mb-4">
                To solve exponential equations, take logarithms of both sides:
              </p>
              <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                <BlockMath math="x = \log_a b = \frac{\ln b}{\ln a}" />
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 mt-4">
                <div className="text-blue-400 font-semibold mb-2 text-sm">Example:</div>
                <p className="text-slate-300 text-sm">
                  Solve <InlineMath math="2^x = 10" />: <InlineMath math="x = \log_2 10 = \frac{\ln 10}{\ln 2} \approx 3.32" />
                </p>
              </div>
            </div>
          </section>

          {/* Graphs Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">📊</span>
              Graphs
            </h2>

            <div className="space-y-6">
              {/* Exponential Graphs */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Graphs of <InlineMath math="y = a^x" /></h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>All graphs pass through (0, 1)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>If <InlineMath math="a > 1" />: the graph is increasing (exponential growth)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>If <InlineMath math="0 < a < 1" />: the graph is decreasing (exponential decay)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>y-axis is a vertical asymptote in the limit</span>
                  </div>
                </div>
              </div>

              {/* Logarithmic Graphs */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Graphs of <InlineMath math="y = \log_a x" /></h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Domain</div>
                    <p className="text-slate-300"><InlineMath math="x > 0" /></p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Range</div>
                    <p className="text-slate-300">All real numbers</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">x-intercept</div>
                    <p className="text-slate-300">(1, 0)</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-cyan-400 font-semibold mb-3 text-sm">Vertical Asymptote</div>
                    <p className="text-slate-300"><InlineMath math="x = 0" /></p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-5">
                  <div className="text-cyan-400 font-semibold mb-3">Inverse Relationship:</div>
                  <p className="text-slate-300 text-sm">
                    The graph of <InlineMath math="y = \log_a x" /> is the reflection of <InlineMath math="y = a^x" /> in the line <InlineMath math="y = x" />
                  </p>
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
                  <span><InlineMath math="\log_a(\text{negative number})" /> is undefined</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span><InlineMath math="\log_a 0" /> is undefined</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span><InlineMath math="\ln e = 1" /> (natural log of e equals 1)</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>If <InlineMath math="\log_a x = \log_a y" /> then <InlineMath math="x = y" /></span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Always use consistent base when solving logarithmic equations</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Check solutions to ensure they don't produce logarithms of negative numbers or zero</span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/a6"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Binomial Expansion
            </Link>
            <Link
              href="/topics/g1"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              Next: Trigonometry
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
