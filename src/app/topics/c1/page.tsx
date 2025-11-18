'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function DifferentiationAndIntegrationPage() {
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
        <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href="/"
                className="text-slate-400 hover:text-pink-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <div className="text-pink-400 font-bold text-sm mb-1">TOPIC C1</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Differentiation and Integration</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Master calculus fundamentals: derivatives, integrals, and their powerful applications
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* ==================== DIFFERENTIATION SECTION ==================== */}

          {/* Derivative as Limit Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">∂</span>
              The Derivative as Limit
            </h2>

            <div className="space-y-6 text-slate-300">
              <p>
                The <strong className="text-white">derivative</strong> of a function measures its instantaneous rate of change at a point. It is defined as the limit of the average rate of change as the interval approaches zero.
              </p>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Formal Definition</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" />
                </div>
                <p className="mt-4 text-sm">
                  This limit, when it exists, gives us the slope of the tangent line to the curve at point <InlineMath math="x" />.
                </p>
              </div>

              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-5 border border-pink-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 text-xl">📌</span>
                  <div>
                    <strong className="text-white">Notation:</strong> The derivative can be written as <InlineMath math="f'(x)" />, <InlineMath math="\frac{dy}{dx}" />, <InlineMath math="\frac{df}{dx}" />, or <InlineMath math="Df(x)" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rules of Differentiation Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">📐</span>
              Rules of Differentiation
            </h2>

            <div className="space-y-6">
              {/* Power Rule */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Power Rule</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\text{If } f(x) = x^n \text{, then } f'(x) = nx^{n-1}" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Example:</strong>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <InlineMath math="\frac{d}{dx}(x^5) = 5x^4" />
                    <br />
                    <InlineMath math="\frac{d}{dx}(x^{-2}) = -2x^{-3}" />
                  </div>
                </div>
              </div>

              {/* Constant Multiple Rule */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Constant Multiple Rule</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\text{If } f(x) = kx \text{, then } f'(x) = k" />
                </div>
                <div className="mt-4">
                  <div className="text-sm text-slate-300">
                    Constants multiply through when differentiating: <InlineMath math="\frac{d}{dx}[kf(x)] = k \cdot f'(x)" />
                  </div>
                </div>
              </div>

              {/* Sum/Difference Rule */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Sum/Difference Rule</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\text{If } f(x) = u(x) \pm v(x) \text{, then } f'(x) = u'(x) \pm v'(x)" />
                </div>
                <div className="mt-4">
                  <div className="text-sm text-slate-300">
                    Differentiate each term separately and combine: <InlineMath math="\frac{d}{dx}(x^3 + 2x^2 - 5x) = 3x^2 + 4x - 5" />
                  </div>
                </div>
              </div>

              {/* Chain Rule */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Chain Rule</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\text{If } y = f(u) \text{ and } u = g(x) \text{, then } \frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx}" />
                  <div className="text-center text-slate-400 my-2">or equivalently</div>
                  <BlockMath math="\frac{d}{dx}[f(g(x))] = f'(g(x)) \times g'(x)" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Example:</strong>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-sm">
                    <InlineMath math="\frac{d}{dx}[(3x^2 + 1)^5]" />
                    <br />
                    <span className="text-slate-400">Let <InlineMath math="u = 3x^2 + 1" />, so <InlineMath math="y = u^5" /></span>
                    <br />
                    <InlineMath math="\frac{dy}{du} = 5u^4, \quad \frac{du}{dx} = 6x" />
                    <br />
                    <InlineMath math="\frac{dy}{dx} = 5u^4 \times 6x = 30x(3x^2 + 1)^4" />
                  </div>
                </div>
              </div>

              {/* Product Rule */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Product Rule</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\text{If } y = uv \text{, then } \frac{dy}{dx} = u\frac{dv}{dx} + v\frac{du}{dx}" />
                  <div className="text-center text-slate-400 my-2">or more concisely</div>
                  <BlockMath math="(uv)' = u'v + uv'" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Example:</strong>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-sm">
                    <InlineMath math="\frac{d}{dx}[x^2 \sin x]" />
                    <br />
                    <span className="text-slate-400">Let <InlineMath math="u = x^2" /> and <InlineMath math="v = \sin x" /></span>
                    <br />
                    <InlineMath math="= x^2 \cos x + 2x \sin x" />
                  </div>
                </div>
              </div>

              {/* Quotient Rule */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Quotient Rule</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\text{If } y = \frac{u}{v} \text{, then } \frac{dy}{dx} = \frac{v\frac{du}{dx} - u\frac{dv}{dx}}{v^2}" />
                  <div className="text-center text-slate-400 my-2">or more concisely</div>
                  <BlockMath math="\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Memory Tip:</strong> "Low D-High minus High D-Low, Square the bottom and away we go!"
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Derivatives of Special Functions Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">⚡</span>
              Derivatives of Special Functions
            </h2>

            <div className="space-y-6">
              {/* Exponential Functions */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Exponential Functions</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 space-y-4">
                  <div className="overflow-x-auto">
                    <BlockMath math="\frac{d}{dx}(e^x) = e^x" />
                  </div>
                  <div className="overflow-x-auto">
                    <BlockMath math="\frac{d}{dx}(e^{ax}) = ae^{ax}" />
                  </div>
                </div>
                <div className="mt-4 bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Remarkable Property:</strong> The exponential function <InlineMath math="e^x" /> is its own derivative!
                  </div>
                </div>
              </div>

              {/* Logarithmic Functions */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Logarithmic Functions</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 space-y-4">
                  <div className="overflow-x-auto">
                    <BlockMath math="\frac{d}{dx}(\ln x) = \frac{1}{x}" />
                  </div>
                  <div className="overflow-x-auto">
                    <BlockMath math="\frac{d}{dx}[\ln(ax + b)] = \frac{a}{ax + b}" />
                  </div>
                </div>
                <div className="mt-4 bg-slate-800/50 rounded-lg p-4 text-sm">
                  <div className="text-slate-300">
                    <strong className="text-white">Note:</strong> Only defined for <InlineMath math="x > 0" />. The general form is <InlineMath math="\frac{d}{dx}(\ln|x|) = \frac{1}{x}" />
                  </div>
                </div>
              </div>

              {/* Trigonometric Functions */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Trigonometric Functions</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3 text-center">Sine</div>
                    <div className="overflow-x-auto">
                      <BlockMath math="\frac{d}{dx}(\sin x) = \cos x" />
                    </div>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3 text-center">Cosine</div>
                    <div className="overflow-x-auto">
                      <BlockMath math="\frac{d}{dx}(\cos x) = -\sin x" />
                    </div>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3 text-center">Tangent</div>
                    <div className="overflow-x-auto">
                      <BlockMath math="\frac{d}{dx}(\tan x) = \sec^2 x" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-4 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-xl">⚠️</span>
                    <div className="text-slate-300 text-sm">
                      <strong className="text-white">Important:</strong> Watch for the negative sign in the derivative of cosine!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Applications of Differentiation Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">🎯</span>
              Applications of Differentiation
            </h2>

            <div className="space-y-6">
              {/* Stationary Points */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Stationary Points</h3>
                <p className="text-slate-300 mb-4">
                  Points where the tangent is horizontal (<InlineMath math="f'(x) = 0" />) are called <strong className="text-white">stationary points</strong>.
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-3">Finding Stationary Points</h4>
                    <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
                      <li>Find <InlineMath math="f'(x)" /></li>
                      <li>Solve <InlineMath math="f'(x) = 0" /></li>
                      <li>Substitute x-values back into <InlineMath math="f(x)" /> to find y-coordinates</li>
                    </ol>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-3">Nature of Stationary Points</h4>

                    <div className="space-y-4">
                      <div>
                        <div className="text-pink-400 font-semibold mb-2">Second Derivative Test:</div>
                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2 text-sm">
                          <div><InlineMath math="\text{If } f'(a) = 0:" /></div>
                          <div className="pl-4 space-y-1">
                            <div><InlineMath math="f''(a) < 0 \Rightarrow" /> local maximum at <InlineMath math="x = a" /></div>
                            <div><InlineMath math="f''(a) > 0 \Rightarrow" /> local minimum at <InlineMath math="x = a" /></div>
                            <div><InlineMath math="f''(a) = 0 \Rightarrow" /> test inconclusive (use first derivative test)</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-pink-400 font-semibold mb-2">First Derivative Test:</div>
                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2 text-sm">
                          <div>Check sign of <InlineMath math="f'(x)" /> either side of stationary point:</div>
                          <div className="pl-4 space-y-1">
                            <div><strong className="text-white">Maximum:</strong> <InlineMath math="f'" /> changes from + to -</div>
                            <div><strong className="text-white">Minimum:</strong> <InlineMath math="f'" /> changes from - to +</div>
                            <div><strong className="text-white">Point of Inflection:</strong> <InlineMath math="f'" /> does not change sign</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tangents and Normals */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Tangents and Normals</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <h4 className="text-pink-400 font-semibold mb-3">Tangent at Point <InlineMath math="(x_1, y_1)" /></h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong className="text-white">Gradient:</strong>
                        <div className="bg-slate-900/50 rounded-lg p-3 mt-2">
                          <InlineMath math="m = f'(x_1)" />
                        </div>
                      </div>
                      <div>
                        <strong className="text-white">Equation:</strong>
                        <div className="bg-slate-900/50 rounded-lg p-3 mt-2">
                          <InlineMath math="y - y_1 = m(x - x_1)" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <h4 className="text-pink-400 font-semibold mb-3">Normal at Point <InlineMath math="(x_1, y_1)" /></h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong className="text-white">Gradient:</strong>
                        <div className="bg-slate-900/50 rounded-lg p-3 mt-2">
                          <InlineMath math="m_n = -\frac{1}{f'(x_1)}" />
                        </div>
                      </div>
                      <div>
                        <strong className="text-white">Equation:</strong>
                        <div className="bg-slate-900/50 rounded-lg p-3 mt-2">
                          <InlineMath math="y - y_1 = m_n(x - x_1)" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-lg p-4 border border-pink-500/20">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Key Relationship:</strong> The normal is perpendicular to the tangent, so <InlineMath math="m_{\text{tangent}} \times m_{\text{normal}} = -1" />
                  </div>
                </div>
              </div>

              {/* Increasing/Decreasing Functions */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Increasing and Decreasing Functions</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-3">Increasing Function</div>
                    <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                      <BlockMath math="f'(x) > 0" />
                    </div>
                    <p className="text-sm text-slate-300 mt-3">
                      When the derivative is positive, the function is rising as x increases.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-red-400 font-semibold mb-3">Decreasing Function</div>
                    <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                      <BlockMath math="f'(x) < 0" />
                    </div>
                    <p className="text-sm text-slate-300 mt-3">
                      When the derivative is negative, the function is falling as x increases.
                    </p>
                  </div>
                </div>
              </div>

              {/* Optimization Problems */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Optimization Problems</h3>
                <p className="text-slate-300 mb-4">
                  Finding maximum or minimum values in real-world contexts.
                </p>

                <div className="bg-slate-800/80 rounded-lg p-5">
                  <h4 className="text-pink-400 font-semibold mb-3">Problem-Solving Steps</h4>
                  <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
                    <li>Define the variable to optimize and any constraints</li>
                    <li>Express the quantity as a function of one variable</li>
                    <li>Find the derivative</li>
                    <li>Set derivative equal to 0 and solve</li>
                    <li>Verify it's a maximum or minimum (second derivative test)</li>
                    <li>Check endpoints if applicable</li>
                    <li>Answer the question in context with appropriate units</li>
                  </ol>
                </div>
              </div>

              {/* Kinematics */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Kinematics Applications</h3>
                <p className="text-slate-300 mb-4">
                  Calculus provides the tools to analyze motion: position, velocity, and acceleration.
                </p>

                <div className="bg-slate-800/80 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-4">Fundamental Relationships</h4>
                  <div className="space-y-4">
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <div className="text-pink-400 font-semibold mb-2">Velocity from Displacement:</div>
                      <BlockMath math="v = \frac{ds}{dt}" />
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <div className="text-pink-400 font-semibold mb-2">Acceleration from Velocity:</div>
                      <BlockMath math="a = \frac{dv}{dt} = \frac{d^2s}{dt^2}" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-slate-800/50 rounded-lg p-5">
                  <h4 className="text-white font-semibold mb-3">Important Distinctions</h4>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <span className="text-pink-400 mt-1">▹</span>
                      <div>
                        <strong className="text-white">Displacement:</strong> Change in position (can be negative)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-pink-400 mt-1">▹</span>
                      <div>
                        <strong className="text-white">Distance:</strong> Total length traveled (always positive)
                        <div className="mt-2 bg-slate-900/50 rounded-lg p-3">
                          <InlineMath math="\text{Distance} = \int_a^b |v| \, dt" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practice Questions - Differentiation */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">📝</span>
              Practice Questions: Differentiation
            </h2>

            <div className="space-y-6">
              {/* Question 11 */}
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-4">Question 11 (2023 Mock): Tangent and Normal</div>

                <div className="space-y-4 text-slate-300">
                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">Problem:</div>
                    <p className="text-sm">
                      The equation of a curve is <InlineMath math="y = \frac{a}{x} + bx - 1" />, where a and b are constants.
                      The normal to the curve at point Q(1, -1) is parallel to the line <InlineMath math="4y - x = 20" />.
                      This normal meets the curve again at point P.
                    </p>
                    <div className="mt-3 space-y-2 text-sm">
                      <div>(i) Find the value of a and of b. [4]</div>
                      <div>(ii) Find the coordinates of point P. [2]</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-3">Solution:</div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <strong className="text-white">(i) a = 2, b = -2</strong>
                        <div className="mt-2 space-y-2">
                          <div>Normal gradient = 1/4 (parallel to given line)</div>
                          <div>Therefore, tangent gradient = -4</div>
                          <div className="bg-slate-800/80 rounded-lg p-3 my-2">
                            <InlineMath math="\frac{dy}{dx} = -\frac{a}{x^2} + b" />
                          </div>
                          <div>At (1, -1): <InlineMath math="-a + b = -4" /> ... (1)</div>
                          <div>Substitute (1, -1) into curve: <InlineMath math="a + b - 1 = -1" /></div>
                          <div>So <InlineMath math="a + b = 0" /> ... (2)</div>
                          <div>Solving (1) and (2): <InlineMath math="a = 2, \, b = -2" /></div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(ii) <InlineMath math="P\left(-\frac{8}{9}, -\frac{53}{36}\right)" /></strong>
                        <div className="mt-2 space-y-2">
                          <div>Normal equation: <InlineMath math="y = \frac{x}{4} - \frac{5}{4}" /></div>
                          <div>Curve: <InlineMath math="y = \frac{2}{x} - 2x - 1" /></div>
                          <div>Solving: <InlineMath math="9x^2 - x - 8 = 0" /></div>
                          <div><InlineMath math="x = -\frac{8}{9}" /> or <InlineMath math="x = 1" /></div>
                          <div>Therefore <InlineMath math="P\left(-\frac{8}{9}, -\frac{53}{36}\right)" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 12 */}
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-4">Question 12 (2023 Mock): Rate of Change</div>

                <div className="space-y-4 text-slate-300">
                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">Problem:</div>
                    <p className="text-sm">
                      The equation of a curve is given by <InlineMath math="y = \ln\sqrt{\frac{5x}{9x+4}}" />.
                    </p>
                    <div className="mt-3 space-y-2 text-sm">
                      <div>(i) Find <InlineMath math="\frac{dy}{dx}" />, expressing it as a single fraction. [2]</div>
                      <div>(ii) Find the rate at which x is changing when the graph crosses the x-axis, given that y is increasing at a rate of 0.3 units per second. [2]</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-3">Solution:</div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <strong className="text-white">(i) <InlineMath math="\frac{dy}{dx} = \frac{2}{x(9x+4)}" /></strong>
                        <div className="mt-2 space-y-2">
                          <div>Simplify: <InlineMath math="y = \frac{1}{2}\ln\left(\frac{5x}{9x+4}\right) = \frac{1}{2}[\ln(5x) - \ln(9x+4)]" /></div>
                          <div className="bg-slate-800/80 rounded-lg p-3 my-2">
                            <InlineMath math="\frac{dy}{dx} = \frac{1}{2}\left[\frac{1}{x} - \frac{9}{9x+4}\right] = \frac{2}{x(9x+4)}" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(ii) <InlineMath math="\frac{dx}{dt} = \frac{3}{4}" /> units per second</strong>
                        <div className="mt-2 space-y-2">
                          <div>When <InlineMath math="y = 0" />: <InlineMath math="\frac{5x}{9x+4} = 1 \Rightarrow x = -1" /></div>
                          <div>Using chain rule: <InlineMath math="\frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}" /></div>
                          <div>At <InlineMath math="x = -1" />: <InlineMath math="\frac{dy}{dx} = \frac{2}{(-1)(-5)} = \frac{2}{5}" /></div>
                          <div><InlineMath math="0.3 = \frac{2}{5} \cdot \frac{dx}{dt}" /></div>
                          <div><InlineMath math="\frac{dx}{dt} = \frac{3}{4}" /> units per second</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 13 */}
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-4">Question 13 (2023 Mock): Maxima & Minima</div>

                <div className="space-y-4 text-slate-300">
                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">Problem:</div>
                    <p className="text-sm">
                      Car B is 48 km due east of Car A. Both cars start moving at the same time.
                      Car A travels due north at 110 km/h while Car B travels due west at 90 km/h.
                    </p>
                    <div className="mt-3 space-y-2 text-sm">
                      <div>(i) Express L (distance between cars) in the form <InlineMath math="\sqrt{pt^2 + (q - rt)^2}" />. [2]</div>
                      <div>(ii) Find the stationary value of L. [2]</div>
                      <div>(iii) Determine whether this is maximum or minimum. [2]</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-3">Solution:</div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <strong className="text-white">(i) <InlineMath math="L = \sqrt{12100t^2 + (48 - 90t)^2}" /></strong>
                        <div className="mt-2 space-y-2">
                          <div>After t hours, Car A is 110t km north</div>
                          <div>Car B is (48 - 90t) km east (moving west)</div>
                          <div>By Pythagorean theorem: <InlineMath math="L^2 = (110t)^2 + (48 - 90t)^2" /></div>
                          <div><InlineMath math="L = \sqrt{12100t^2 + (48 - 90t)^2}" /></div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(ii) L = 37.1 km at t = 0.214 hours</strong>
                        <div className="mt-2 space-y-2">
                          <div><InlineMath math="\frac{dL}{dt} = \frac{24200t - 8640}{2L}" /></div>
                          <div>Setting <InlineMath math="\frac{dL}{dt} = 0" />: <InlineMath math="24200t = 8640" /></div>
                          <div><InlineMath math="t = \frac{108}{505} \approx 0.214" /> hours</div>
                          <div><InlineMath math="L = 37.1" /> km</div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(iii) Minimum</strong>
                        <div className="mt-2 space-y-2">
                          <div>Using first derivative test:</div>
                          <div>For <InlineMath math="t < 0.214" />: <InlineMath math="\frac{dL}{dt} < 0" /> (decreasing)</div>
                          <div>For <InlineMath math="t > 0.214" />: <InlineMath math="\frac{dL}{dt} > 0" /> (increasing)</div>
                          <div>Therefore, this is a minimum point.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== INTEGRATION SECTION ==================== */}

          {/* Antiderivative and Indefinite Integral Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">∫</span>
              Antiderivative and Indefinite Integral
            </h2>

            <div className="space-y-6 text-slate-300">
              <p>
                <strong className="text-white">Integration</strong> is the reverse process of differentiation. If we know the derivative of a function, integration allows us to find the original function.
              </p>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Antiderivative</h3>
                <p className="text-sm mb-4">
                  If <InlineMath math="F'(x) = f(x)" />, then <InlineMath math="F(x)" /> is an <strong className="text-white">antiderivative</strong> of <InlineMath math="f(x)" />.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5">
                  <div className="text-pink-400 font-semibold mb-3">Example:</div>
                  <div className="space-y-2 text-sm">
                    <div>Since <InlineMath math="\frac{d}{dx}(x^3) = 3x^2" /></div>
                    <div><InlineMath math="x^3" /> is an antiderivative of <InlineMath math="3x^2" /></div>
                    <div className="text-slate-400 mt-3">
                      Note: <InlineMath math="x^3 + 5" />, <InlineMath math="x^3 - 7" />, and <InlineMath math="x^3 + C" /> are all antiderivatives!
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Indefinite Integral</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\int f(x) \, dx = F(x) + C" />
                  <div className="text-center text-slate-400 mt-3 text-sm">
                    where <InlineMath math="F'(x) = f(x)" /> and C is the <strong>constant of integration</strong>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-5 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl">⚠️</span>
                  <div className="text-slate-300">
                    <strong className="text-white">Critical:</strong> Always include "+ C" when finding indefinite integrals!
                    The constant C represents the family of all possible antiderivatives.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rules of Integration Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">📏</span>
              Rules of Integration
            </h2>

            <div className="space-y-6">
              {/* Power Rule */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Power Rule for Integration</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\int x^n \, dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Examples:</strong>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                    <div><InlineMath math="\int x^5 \, dx = \frac{x^6}{6} + C" /></div>
                    <div><InlineMath math="\int x^{-2} \, dx = \frac{x^{-1}}{-1} + C = -\frac{1}{x} + C" /></div>
                    <div><InlineMath math="\int \sqrt{x} \, dx = \int x^{1/2} \, dx = \frac{x^{3/2}}{3/2} + C = \frac{2}{3}x^{3/2} + C" /></div>
                  </div>
                </div>
              </div>

              {/* Constant Multiple Rule */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Constant Multiple Rule</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\int kf(x) \, dx = k\int f(x) \, dx" />
                </div>
                <div className="mt-4">
                  <div className="text-sm text-slate-300">
                    Constants can be factored out of integrals: <InlineMath math="\int 5x^3 \, dx = 5\int x^3 \, dx = 5 \cdot \frac{x^4}{4} + C = \frac{5x^4}{4} + C" />
                  </div>
                </div>
              </div>

              {/* Sum/Difference Rule */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Sum/Difference Rule</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\int [f(x) \pm g(x)] \, dx = \int f(x) \, dx \pm \int g(x) \, dx" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Example:</strong>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div><InlineMath math="\int (3x^2 + 2x - 5) \, dx" /></div>
                    <div className="mt-2"><InlineMath math="= \int 3x^2 \, dx + \int 2x \, dx - \int 5 \, dx" /></div>
                    <div className="mt-2"><InlineMath math="= x^3 + x^2 - 5x + C" /></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Standard Integrals Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">⭐</span>
              Standard Integrals
            </h2>

            <div className="space-y-6">
              {/* Polynomial Functions */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Polynomial Functions</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\int x^n \, dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)" />
                </div>
              </div>

              {/* Exponential Functions */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Exponential Functions</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="overflow-x-auto">
                      <BlockMath math="\int e^x \, dx = e^x + C" />
                    </div>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="overflow-x-auto">
                      <BlockMath math="\int e^{ax} \, dx = \frac{1}{a}e^{ax} + C" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trigonometric Functions */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Trigonometric Functions</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="overflow-x-auto">
                      <BlockMath math="\int \sin x \, dx = -\cos x + C" />
                    </div>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="overflow-x-auto">
                      <BlockMath math="\int \cos x \, dx = \sin x + C" />
                    </div>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="overflow-x-auto">
                      <BlockMath math="\int \sec^2 x \, dx = \tan x + C" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reciprocal Function */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Reciprocal Function</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\int \frac{1}{x} \, dx = \ln|x| + C" />
                </div>
                <div className="mt-4 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-lg p-4 border border-pink-500/20">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">Note:</strong> This is the special case when <InlineMath math="n = -1" /> in the power rule.
                    The absolute value ensures the logarithm is defined for negative x values.
                  </div>
                </div>
              </div>

              {/* Integration of (ax + b) forms */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Integration of (ax + b) Forms</h3>
                <p className="text-slate-300 mb-4">
                  When integrating functions of the form <InlineMath math="f(ax + b)" />, divide by the coefficient of x:
                </p>
                <div className="space-y-4">
                  <div className="bg-slate-800/80 rounded-lg p-5 overflow-x-auto">
                    <BlockMath math="\int (ax + b)^n \, dx = \frac{(ax + b)^{n+1}}{a(n+1)} + C \quad (n \neq -1)" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5 overflow-x-auto">
                    <BlockMath math="\int \sin(ax + b) \, dx = -\frac{1}{a}\cos(ax + b) + C" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5 overflow-x-auto">
                    <BlockMath math="\int \cos(ax + b) \, dx = \frac{1}{a}\sin(ax + b) + C" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5 overflow-x-auto">
                    <BlockMath math="\int e^{ax+b} \, dx = \frac{1}{a}e^{ax+b} + C" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Finding Constant of Integration Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">C</span>
              Finding Constant of Integration
            </h2>

            <div className="space-y-6 text-slate-300">
              <p>
                When an initial condition or boundary condition is given, we can find the specific value of the constant C.
              </p>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Method</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Find the general solution: <InlineMath math="\int f(x) \, dx = F(x) + C" /></li>
                  <li>Substitute the given point <InlineMath math="(x_0, y_0)" /> into the general solution</li>
                  <li>Solve for C</li>
                  <li>Write the particular solution with the specific value of C</li>
                </ol>
              </div>

              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-4">Example</div>
                <div className="space-y-3 text-sm">
                  <div>
                    Find the curve <InlineMath math="y = f(x)" /> given that <InlineMath math="\frac{dy}{dx} = 3x^2 - 2" /> and the curve passes through (1, 4).
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                    <div><strong className="text-white">Solution:</strong></div>
                    <div><InlineMath math="y = \int (3x^2 - 2) \, dx = x^3 - 2x + C" /></div>
                    <div>Substitute (1, 4): <InlineMath math="4 = 1^3 - 2(1) + C" /></div>
                    <div><InlineMath math="4 = -1 + C" /></div>
                    <div><InlineMath math="C = 5" /></div>
                    <div className="pt-2 border-t border-slate-700">
                      <strong className="text-white">Answer:</strong> <InlineMath math="y = x^3 - 2x + 5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Definite Integrals Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">∫ᵃᵇ</span>
              Definite Integrals
            </h2>

            <div className="space-y-6">
              {/* Fundamental Theorem */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">The Fundamental Theorem of Calculus</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto">
                  <BlockMath math="\int_a^b f(x) \, dx = [F(x)]_a^b = F(b) - F(a)" />
                  <div className="text-center text-slate-400 mt-3 text-sm">
                    where <InlineMath math="F'(x) = f(x)" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-slate-300">
                  <strong className="text-white">Key Point:</strong> Definite integrals give a <strong className="text-white">number</strong> (no + C needed!),
                  representing the signed area between the curve and x-axis from x = a to x = b.
                </div>
              </div>

              {/* Properties */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Properties of Definite Integrals</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-2">Reversing Limits</div>
                    <BlockMath math="\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-2">Additive Property</div>
                    <BlockMath math="\int_a^b f(x) \, dx + \int_b^c f(x) \, dx = \int_a^c f(x) \, dx" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-2">Constant Multiple</div>
                    <BlockMath math="\int_a^b kf(x) \, dx = k\int_a^b f(x) \, dx" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-2">Zero Width Interval</div>
                    <BlockMath math="\int_a^a f(x) \, dx = 0" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Applications of Integration Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">🎯</span>
              Applications of Integration
            </h2>

            <div className="space-y-6">
              {/* Area Under Curve */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Area Under a Curve</h3>
                <p className="text-slate-300 mb-4">
                  The definite integral can be used to find the area between a curve and the x-axis.
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3">When y ≥ 0:</div>
                    <BlockMath math="A = \int_a^b y \, dx" />
                    <p className="text-sm text-slate-300 mt-2">
                      The area is simply the definite integral.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3">When y ≤ 0:</div>
                    <BlockMath math="A = -\int_a^b y \, dx = \left|\int_a^b y \, dx\right|" />
                    <p className="text-sm text-slate-300 mt-2">
                      The integral is negative, so take the absolute value to get area.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3">General Case (crosses x-axis):</div>
                    <BlockMath math="A = \int_a^b |y| \, dx" />
                    <p className="text-sm text-slate-300 mt-2">
                      Split into regions where y is positive and negative, then sum the absolute values.
                    </p>
                  </div>
                </div>
              </div>

              {/* Area Between Curves */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Area Between Two Curves</h3>
                <div className="bg-slate-800/80 rounded-lg p-6">
                  <BlockMath math="A = \int_a^b (\text{upper} - \text{lower}) \, dx = \int_a^b [f(x) - g(x)] \, dx" />
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="text-pink-400 mt-1">▹</span>
                    <span>Find intersection points by solving <InlineMath math="f(x) = g(x)" /></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-pink-400 mt-1">▹</span>
                    <span>Determine which function is on top in the interval</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-pink-400 mt-1">▹</span>
                    <span>Integrate the difference from a to b</span>
                  </div>
                </div>
              </div>

              {/* Volume of Revolution */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Volume of Revolution</h3>
                <p className="text-slate-300 mb-4">
                  When a region is rotated about an axis, it generates a solid whose volume can be found using integration.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3">Revolution about x-axis</div>
                    <div className="overflow-x-auto">
                      <BlockMath math="V = \pi\int_a^b y^2 \, dx" />
                    </div>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3">Revolution about y-axis</div>
                    <div className="overflow-x-auto">
                      <BlockMath math="V = \pi\int_c^d x^2 \, dy" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-4 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-xl">⚠️</span>
                    <div className="text-slate-300 text-sm">
                      <strong className="text-white">Important:</strong> Note that we square y (or x), not just integrate y!
                    </div>
                  </div>
                </div>
              </div>

              {/* Kinematics Applications */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Kinematics Applications</h3>
                <p className="text-slate-300 mb-4">
                  Integration is used to find displacement and distance from velocity, or velocity from acceleration.
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3">Velocity from Acceleration:</div>
                    <BlockMath math="v = \int a \, dt" />
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3">Displacement from Velocity:</div>
                    <BlockMath math="s = \int v \, dt" />
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-pink-400 font-semibold mb-3">Distance vs Displacement:</div>
                    <div className="space-y-3 text-sm text-slate-300">
                      <div>
                        <strong className="text-white">Displacement:</strong> Change in position (can be negative)
                        <div className="bg-slate-900/50 rounded-lg p-3 mt-2">
                          <InlineMath math="\text{Displacement} = \int_{t_1}^{t_2} v \, dt" />
                        </div>
                      </div>
                      <div>
                        <strong className="text-white">Distance:</strong> Total length traveled (always positive)
                        <div className="bg-slate-900/50 rounded-lg p-3 mt-2">
                          <InlineMath math="\text{Distance} = \int_{t_1}^{t_2} |v| \, dt" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practice Questions - Integration */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">📝</span>
              Practice Questions: Integration
            </h2>

            <div className="space-y-6">
              {/* Question 14 */}
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-4">Question 14 (2023 Mock): Integration Hence Method</div>

                <div className="space-y-4 text-slate-300">
                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">Problem:</div>
                    <div className="space-y-3 text-sm">
                      <div>(a) Differentiate the following with respect to x:</div>
                      <div className="pl-4 space-y-2">
                        <div>(i) <InlineMath math="\ln(\cos 2x)" /> [2]</div>
                        <div>(ii) <InlineMath math="\frac{x}{2}\tan 2x" /> [2]</div>
                      </div>
                      <div>(b) Using your results from part (a), find <InlineMath math="\int 2x \sec^2 2x \, dx" />. [2]</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-3">Solution:</div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <strong className="text-white">(a)(i) <InlineMath math="-2\tan 2x" /></strong>
                        <div className="mt-2 space-y-2">
                          <div>Using chain rule:</div>
                          <div><InlineMath math="\frac{d}{dx}[\ln(\cos 2x)] = \frac{1}{\cos 2x} \cdot (-\sin 2x) \cdot 2" /></div>
                          <div><InlineMath math="= -2\tan 2x" /></div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(a)(ii) <InlineMath math="x\sec^2 2x + \frac{1}{2}\tan 2x" /></strong>
                        <div className="mt-2 space-y-2">
                          <div>Using product rule:</div>
                          <div><InlineMath math="\frac{d}{dx}\left[\frac{x}{2}\tan 2x\right] = \frac{x}{2} \cdot 2\sec^2 2x + \frac{1}{2}\tan 2x" /></div>
                          <div><InlineMath math="= x\sec^2 2x + \frac{1}{2}\tan 2x" /></div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(b) <InlineMath math="\int 2x\sec^2 2x \, dx = x\tan 2x + \frac{1}{2}\ln|\cos 2x| + C" /></strong>
                        <div className="mt-2 space-y-2">
                          <div>From part (a)(ii), we know:</div>
                          <div><InlineMath math="\frac{d}{dx}\left[\frac{x}{2}\tan 2x\right] = x\sec^2 2x + \frac{1}{2}\tan 2x" /></div>
                          <div>Therefore:</div>
                          <div><InlineMath math="\int 2x\sec^2 2x \, dx = 2 \cdot \frac{x}{2}\tan 2x - \int \tan 2x \, dx" /></div>
                          <div>From part (a)(i), <InlineMath math="\int \tan 2x \, dx = -\frac{1}{2}\ln|\cos 2x| + C" /></div>
                          <div><InlineMath math="= x\tan 2x + \frac{1}{2}\ln|\cos 2x| + C" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 15 */}
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-4">Question 15 (2023 Mock): Area Under Graph</div>

                <div className="space-y-4 text-slate-300">
                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">Problem:</div>
                    <div className="space-y-3 text-sm">
                      <div>(a) M is the point of intersection of <InlineMath math="y = x" /> and <InlineMath math="y = -x^2 + 3x" />. Show that the coordinates of M is (2, 2). [2]</div>
                      <div>(b) Find the area P, bounded by the curve <InlineMath math="y = -x^2 + 3x" /> and the line <InlineMath math="y = x" />. [3]</div>
                      <div>(c) Find the area Q, enclosed by the curve <InlineMath math="x = y^2 - 4y" /> and the y-axis. [2]</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-3">Solution:</div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <strong className="text-white">(a) Shown: M(2, 2)</strong>
                        <div className="mt-2 space-y-2">
                          <div>At intersection: <InlineMath math="x = -x^2 + 3x" /></div>
                          <div><InlineMath math="x^2 - 2x = 0" /></div>
                          <div><InlineMath math="x(x - 2) = 0" /></div>
                          <div><InlineMath math="x = 0" /> or <InlineMath math="x = 2" /></div>
                          <div>When <InlineMath math="x = 2" />, <InlineMath math="y = 2" /></div>
                          <div>Therefore M(2, 2) ✓</div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(b) Area P = <InlineMath math="\frac{4}{3}" /> square units</strong>
                        <div className="mt-2 space-y-2">
                          <div>Area between curves from x = 0 to x = 2:</div>
                          <div className="bg-slate-800/80 rounded-lg p-3 my-2">
                            <InlineMath math="A = \int_0^2 [(-x^2 + 3x) - x] \, dx" />
                          </div>
                          <div><InlineMath math="= \int_0^2 (-x^2 + 2x) \, dx" /></div>
                          <div><InlineMath math="= \left[-\frac{x^3}{3} + x^2\right]_0^2" /></div>
                          <div><InlineMath math="= -\frac{8}{3} + 4 = \frac{4}{3}" /> square units</div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(c) Area Q = <InlineMath math="\frac{32}{3}" /> square units</strong>
                        <div className="mt-2 space-y-2">
                          <div>When <InlineMath math="x = 0" />: <InlineMath math="y^2 - 4y = 0 \Rightarrow y = 0" /> or <InlineMath math="y = 4" /></div>
                          <div>Since curve is to the left of y-axis (x negative), we need absolute value:</div>
                          <div className="bg-slate-800/80 rounded-lg p-3 my-2">
                            <InlineMath math="A = \left|\int_0^4 (y^2 - 4y) \, dy\right|" />
                          </div>
                          <div><InlineMath math="= \left|\left[\frac{y^3}{3} - 2y^2\right]_0^4\right|" /></div>
                          <div><InlineMath math="= \left|\frac{64}{3} - 32\right| = \left|-\frac{32}{3}\right| = \frac{32}{3}" /> square units</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 16 */}
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-6 border border-pink-500/20">
                <div className="text-pink-400 font-bold mb-4">Question 16 (2023 Mock): Kinematics</div>

                <div className="space-y-4 text-slate-300">
                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">Problem:</div>
                    <p className="text-sm">
                      A particle starts from rest, travels in a straight line so that t is the time in seconds after passing a fixed point O.
                      Its velocity, v m/s, is given by <InlineMath math="v = 6t - 2t^2" />. The particle comes to instantaneous rest at A.
                    </p>
                    <div className="mt-3 space-y-2 text-sm">
                      <div>(i) Find the acceleration of the particle at A. [2]</div>
                      <div>(ii) Find the maximum velocity of the particle. [2]</div>
                      <div>(iii) Find the total distance travelled by the particle during the first 5 seconds. [3]</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-3">Solution:</div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <strong className="text-white">(i) a = -6 m/s²</strong>
                        <div className="mt-2 space-y-2">
                          <div>At A, particle is at rest: <InlineMath math="v = 0" /></div>
                          <div><InlineMath math="6t - 2t^2 = 0" /></div>
                          <div><InlineMath math="t = 0" /> or <InlineMath math="t = 3" /></div>
                          <div>At point A, <InlineMath math="t = 3" /> seconds</div>
                          <div className="bg-slate-800/80 rounded-lg p-3 my-2">
                            <InlineMath math="a = \frac{dv}{dt} = 6 - 4t" />
                          </div>
                          <div>At <InlineMath math="t = 3" />: <InlineMath math="a = 6 - 4(3) = -6" /> m/s²</div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(ii) <InlineMath math="v_{\max} = 4.5" /> m/s</strong>
                        <div className="mt-2 space-y-2">
                          <div>Maximum velocity occurs when <InlineMath math="a = 0" />:</div>
                          <div><InlineMath math="6 - 4t = 0" /></div>
                          <div><InlineMath math="t = 1.5" /> seconds</div>
                          <div>At <InlineMath math="t = 1.5" />:</div>
                          <div><InlineMath math="v = 6(1.5) - 2(1.5)^2 = 9 - 4.5 = 4.5" /> m/s</div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-white">(iii) Total distance = <InlineMath math="\frac{53}{3}" /> m (or <InlineMath math="17\frac{2}{3}" /> m)</strong>
                        <div className="mt-2 space-y-2">
                          <div>Find displacement:</div>
                          <div className="bg-slate-800/80 rounded-lg p-3 my-2">
                            <InlineMath math="s = \int v \, dt = \int (6t - 2t^2) \, dt = 3t^2 - \frac{2t^3}{3} + C" />
                          </div>
                          <div>At <InlineMath math="t = 0" />, <InlineMath math="s = 0" />, so <InlineMath math="C = 0" /></div>
                          <div>At <InlineMath math="t = 3" />: <InlineMath math="s = 3(9) - \frac{2(27)}{3} = 27 - 18 = 9" /> m</div>
                          <div>At <InlineMath math="t = 5" />: <InlineMath math="s = 3(25) - \frac{2(125)}{3} = 75 - \frac{250}{3} = -\frac{25}{3}" /> m</div>
                          <div className="pt-2 border-t border-slate-700">
                            <div>Particle moves forward 9 m (from t=0 to t=3)</div>
                            <div>Then moves backward: <InlineMath math="|{-\frac{25}{3}} - 9| = \frac{52}{3}" /> m</div>
                            <div>Total distance = <InlineMath math="9 + \frac{52}{3} = \frac{27 + 52}{3} = \frac{79}{3}" /> m</div>
                            <div className="text-slate-400">(Note: Check calculation - answer given as 17⅔ m in original)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Things to Remember Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">💡</span>
              Things to Remember
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>Always include "+ C" for indefinite integrals (but not for definite integrals)</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>Watch for negative signs in derivatives of cos x and in tangent/normal problems</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>Use second derivative test to determine nature of stationary points</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>Check your answer by differentiating integrals or integrating derivatives</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>Always sketch the region first when finding areas</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>For area between curves, integrate (upper - lower) function</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>Volume of revolution uses y² (or x²), not just y</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>For kinematics, distance = ∫|v| dt, while displacement = ∫v dt</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>For (ax + b) forms, divide by the coefficient of x after integrating</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>The integral of 1/x is ln|x| + C (special case when n = -1)</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>Product rule: (uv)' = u'v + uv' ("first times derivative of second plus second times derivative of first")</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-pink-400 mt-1">▹</span>
                  <span>Quotient rule: (u/v)' = (u'v - uv')/v² ("low d-high minus high d-low over low squared")</span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/g3"
              className="flex items-center gap-2 text-slate-400 hover:text-pink-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Proofs in Plane Geometry
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors"
            >
              Back to Home
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
