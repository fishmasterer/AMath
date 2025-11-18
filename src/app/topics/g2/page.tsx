'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function CoordinateGeometryPage() {
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
                <div className="text-purple-400 font-bold text-sm mb-1">TOPIC G2</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Coordinate Geometry in 2D</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Exploring lines, circles, and geometric relationships in the coordinate plane
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Straight Lines Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">📏</span>
              Straight Lines
            </h2>

            <div className="space-y-6">
              {/* Gradient */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Gradient (Slope)</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\text{rise}}{\text{run}}" />
                </div>
                <p className="text-slate-300 text-sm">
                  where <InlineMath math="(x_1, y_1)" /> and <InlineMath math="(x_2, y_2)" /> are two points on the line
                </p>
              </div>

              {/* Three Forms of Equations */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Forms of Linear Equations</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">1. Gradient-Intercept Form</div>
                    <BlockMath math="y = mx + c" />
                    <p className="text-slate-300 text-sm mt-2">
                      where <InlineMath math="m" /> = gradient, <InlineMath math="c" /> = y-intercept
                    </p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">2. Point-Gradient Form</div>
                    <BlockMath math="y - y_1 = m(x - x_1)" />
                    <p className="text-slate-300 text-sm mt-2">
                      where <InlineMath math="m" /> = gradient, <InlineMath math="(x_1, y_1)" /> is a point on the line
                    </p>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">3. General Form</div>
                    <BlockMath math="ax + by + c = 0" />
                    <p className="text-slate-300 text-sm mt-2">
                      Standard form for representing any line
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Lines Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">➖</span>
              Special Lines
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Vertical Line</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="x = k" />
                </div>
                <p className="text-slate-300 text-sm">
                  Undefined gradient (parallel to y-axis)
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Horizontal Line</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="y = k" />
                </div>
                <p className="text-slate-300 text-sm">
                  Gradient = 0 (parallel to x-axis)
                </p>
              </div>
            </div>
          </section>

          {/* Parallel and Perpendicular Lines Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">⫽</span>
              Parallel and Perpendicular Lines
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Parallel Lines</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="m_1 = m_2" />
                </div>
                <p className="text-slate-300 text-sm">
                  If two lines are parallel, their gradients are equal
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Perpendicular Lines</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="m_1 \times m_2 = -1" />
                </div>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="m_2 = -\frac{1}{m_1}" />
                </div>
                <p className="text-slate-300 text-sm">
                  If two lines are perpendicular, the product of their gradients is -1
                </p>
              </div>
            </div>
          </section>

          {/* Midpoint and Distance Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">📍</span>
              Midpoint and Distance
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Midpoint of Line Segment</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="\text{Midpoint} = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)" />
                </div>
                <p className="text-slate-300 text-sm">
                  The midpoint is the average of the x-coordinates and y-coordinates
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Distance Between Two Points</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
                </div>
                <p className="text-slate-300 text-sm">
                  Derived from the Pythagorean theorem
                </p>
              </div>
            </div>
          </section>

          {/* Circles Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">⭕</span>
              Circles
            </h2>

            <div className="space-y-6">
              {/* Standard Form */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Standard Form</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-3">
                  <BlockMath math="(x - a)^2 + (y - b)^2 = r^2" />
                </div>
                <p className="text-slate-300 text-sm">
                  where <InlineMath math="(a, b)" /> is the center and <InlineMath math="r" /> is the radius
                </p>
              </div>

              {/* General Form */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">General Form</h3>
                <div className="bg-slate-800/80 rounded-lg p-6 overflow-x-auto mb-4">
                  <BlockMath math="x^2 + y^2 + 2gx + 2fy + c = 0" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Center</div>
                    <BlockMath math="(-g, -f)" />
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-3 text-sm">Radius</div>
                    <BlockMath math="r = \sqrt{g^2 + f^2 - c}" />
                  </div>
                </div>
              </div>

              {/* Converting Between Forms */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Finding Circle Properties</h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span>Convert general form to standard form by completing the square</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span>From <InlineMath math="x^2 + y^2 + 2gx + 2fy + c = 0" />, center is <InlineMath math="(-g, -f)" /></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span>Radius is <InlineMath math="r = \sqrt{g^2 + f^2 - c}" /></span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practice Questions Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">✏️</span>
              Practice Question (2023 Mock)
            </h2>

            <div className="space-y-6">
              {/* Question 7 */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-4">Question 7 - Circle and Tangent Problem</div>

                <div className="space-y-4 text-slate-300">
                  <p>
                    The equation of the tangent to a circle at the point A(8, 9) is given by <InlineMath math="4y + 3x = 60" />. The line <InlineMath math="y = 4x - 7" /> passes through the centre, P, of the circle.
                  </p>

                  <div>
                    <strong className="text-white">(a)</strong> Find the coordinates of P. <span className="text-slate-500">[2]</span>
                  </div>

                  <div>
                    <strong className="text-white">(b)</strong> Find the equation of the circle. <span className="text-slate-500">[2]</span>
                  </div>

                  <div>
                    The tangent to the circle at A meets the y-axis at point B.
                  </div>

                  <div>
                    <strong className="text-white">(c)</strong> Find the equation of another circle with BP as diameter. <span className="text-slate-500">[2]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✓</span> Solutions
                </div>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(a) Answer: P(2, 1)</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Find the gradient of the tangent</p>
                      <div className="ml-4">
                        <p className="text-slate-300">Tangent: <InlineMath math="4y + 3x = 60" /> → <InlineMath math="y = -\frac{3}{4}x + 15" /></p>
                        <BlockMath math="m_{\text{tangent}} = -\frac{3}{4}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Find the gradient of the normal (radius)</p>
                      <div className="ml-4">
                        <p className="text-slate-300">Since tangent ⊥ radius:</p>
                        <BlockMath math="m_{\text{normal}} = -\frac{1}{m_{\text{tangent}}} = -\frac{1}{-3/4} = \frac{4}{3}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Find equation of normal through A(8, 9)</p>
                      <div className="ml-4">
                        <BlockMath math="y - 9 = \frac{4}{3}(x - 8)" />
                        <BlockMath math="y = \frac{4}{3}x - \frac{32}{3} + 9 = \frac{4}{3}x - \frac{5}{3}" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 4:</strong> Solve for intersection with <InlineMath math="y = 4x - 7" /></p>
                      <div className="ml-4">
                        <BlockMath math="\frac{4}{3}x - \frac{5}{3} = 4x - 7" />
                        <BlockMath math="\frac{4x - 5}{3} = 4x - 7" />
                        <BlockMath math="4x - 5 = 12x - 21" />
                        <BlockMath math="-8x = -16 \implies x = 2" />
                        <BlockMath math="y = 4(2) - 7 = 1" />
                        <p className="text-green-400 font-semibold mt-2">Therefore, P(2, 1)</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(b) Answer: (x - 2)² + (y - 1)² = 100</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Calculate the radius using distance formula</p>
                      <div className="ml-4">
                        <p className="text-slate-300">Distance from P(2, 1) to A(8, 9):</p>
                        <BlockMath math="r = \sqrt{(8-2)^2 + (9-1)^2}" />
                        <BlockMath math="r = \sqrt{36 + 64} = \sqrt{100} = 10" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Write the equation</p>
                      <div className="ml-4">
                        <BlockMath math="(x - 2)^2 + (y - 1)^2 = 100" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-purple-400 font-semibold mb-3">(c) Answer: (x - 1)² + (y - 8)² = 50</div>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 text-sm">
                      <p><strong className="text-white">Step 1:</strong> Find coordinates of B</p>
                      <div className="ml-4">
                        <p className="text-slate-300">When x = 0 in tangent equation <InlineMath math="4y + 3x = 60" />:</p>
                        <BlockMath math="4y = 60 \implies y = 15" />
                        <p className="text-slate-300">So B(0, 15)</p>
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 2:</strong> Find center of new circle (midpoint of BP)</p>
                      <div className="ml-4">
                        <p className="text-slate-300">Midpoint of B(0, 15) and P(2, 1):</p>
                        <BlockMath math="\text{Center} = \left(\frac{0+2}{2}, \frac{15+1}{2}\right) = (1, 8)" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 3:</strong> Find radius (half of BP)</p>
                      <div className="ml-4">
                        <BlockMath math="BP = \sqrt{(2-0)^2 + (1-15)^2} = \sqrt{4 + 196} = \sqrt{200} = 10\sqrt{2}" />
                        <BlockMath math="r = \frac{BP}{2} = \frac{10\sqrt{2}}{2} = 5\sqrt{2}" />
                        <BlockMath math="r^2 = (5\sqrt{2})^2 = 50" />
                      </div>

                      <p className="mt-3"><strong className="text-white">Step 4:</strong> Write the equation</p>
                      <div className="ml-4">
                        <BlockMath math="(x - 1)^2 + (y - 8)^2 = 50" />
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
                  <span>Two points determine a unique line</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Parallel lines never intersect and have equal gradients</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Midpoint lies on the perpendicular bisector of a line segment</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Circle center and radius found by completing the square</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Tangent to a circle is perpendicular to the radius at the point of contact</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>For perpendicular lines: <InlineMath math="m_1 \times m_2 = -1" /></span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/g1"
              className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Trigonometric Functions
            </Link>
            <Link
              href="/topics/g3"
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
            >
              Next: Calculus
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
