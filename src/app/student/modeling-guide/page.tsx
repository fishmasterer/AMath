'use client'

import Link from 'next/link'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function ModelingGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/student/models"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Models
          </Link>

          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-8">
            <h1 className="text-4xl font-bold text-white mb-3">
              📊 Mathematical Modeling Guide
            </h1>
            <p className="text-gray-300 text-lg">
              A step-by-step approach to solving real-world problems using mathematics
            </p>
          </div>
        </div>

        {/* What is Mathematical Modeling */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-6">
          <h2 className="text-3xl font-bold text-white mb-4">What is Mathematical Modeling?</h2>
          <p className="text-gray-300 mb-4">
            Mathematical modeling is the process of creating a mathematical representation of a
            real-world situation to make predictions, understand behavior, and make decisions. It
            bridges the gap between abstract mathematics and practical applications.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-blue-400 font-semibold mb-3 text-xl">Why Model?</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">•</span>
                <span>
                  <strong>Predict Future Behavior:</strong> Forecast population growth, stock
                  prices, or weather patterns
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">•</span>
                <span>
                  <strong>Optimize Decisions:</strong> Find the best price point, minimize costs,
                  or maximize efficiency
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">•</span>
                <span>
                  <strong>Understand Relationships:</strong> Explore how variables interact and
                  affect each other
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">•</span>
                <span>
                  <strong>Test Scenarios Safely:</strong> Experiment with "what-if" situations
                  without real-world consequences
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* The Modeling Cycle */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-6">
          <h2 className="text-3xl font-bold text-white mb-6">The Modeling Cycle</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-blue-400 mb-3">Identify the Problem</h3>
                  <p className="text-gray-300 mb-4">
                    Clearly define what you're trying to solve or understand. What question needs
                    answering?
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Example:</h4>
                    <p className="text-gray-300 italic">
                      "A company wants to know: What price should we set to maximize our revenue?"
                    </p>
                  </div>
                  <div className="mt-4 bg-blue-500/10 rounded-lg p-4">
                    <h4 className="text-blue-300 font-semibold mb-2">Key Questions:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• What are we trying to find out?</li>
                      <li>• What is the goal or objective?</li>
                      <li>• What decisions need to be made?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-400 mb-3">
                    Make Assumptions & Identify Variables
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Simplify the problem by identifying key variables and making reasonable
                    assumptions. What can we ignore? What matters most?
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-semibold mb-2">Example:</h4>
                    <p className="text-gray-300">
                      <strong>Variables:</strong>
                    </p>
                    <ul className="text-gray-300 ml-4 mt-2 space-y-1">
                      <li>• <InlineMath math="p" /> = price per unit ($)</li>
                      <li>• <InlineMath math="q" /> = quantity sold (units)</li>
                      <li>• <InlineMath math="R" /> = revenue ($)</li>
                    </ul>
                    <p className="text-gray-300 mt-3">
                      <strong>Assumptions:</strong>
                    </p>
                    <ul className="text-gray-300 ml-4 mt-2 space-y-1">
                      <li>• As price increases, demand decreases linearly</li>
                      <li>• No competitors enter the market</li>
                      <li>• Production costs are constant</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-4">
                    <h4 className="text-green-300 font-semibold mb-2">Tips:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Assumptions simplify reality - that's okay!</li>
                      <li>• Focus on the most important factors</li>
                      <li>• Document what you're ignoring and why</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3">
                    Formulate the Mathematical Model
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Create equations that represent the relationships between variables. This is
                    where math concepts come in!
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-semibold mb-3">Example:</h4>
                    <p className="text-gray-300 mb-2">Based on data, demand follows:</p>
                    <div className="bg-black/30 rounded p-3 mb-3">
                      <BlockMath math="q = 1000 - 20p" />
                    </div>
                    <p className="text-gray-300 mb-2">Revenue is price × quantity:</p>
                    <div className="bg-black/30 rounded p-3 mb-3">
                      <BlockMath math="R = p \cdot q = p(1000 - 20p)" />
                    </div>
                    <p className="text-gray-300 mb-2">Simplifying:</p>
                    <div className="bg-black/30 rounded p-3">
                      <BlockMath math="R(p) = -20p^2 + 1000p" />
                    </div>
                    <p className="text-gray-400 text-sm mt-3">
                      This is a quadratic function! We can use what we know about parabolas.
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-4">
                    <h4 className="text-yellow-300 font-semibold mb-2">Common Model Types:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• <strong>Linear:</strong> Constant rate of change</li>
                      <li>• <strong>Quadratic:</strong> Optimization problems</li>
                      <li>• <strong>Exponential:</strong> Growth/decay over time</li>
                      <li>• <strong>Trigonometric:</strong> Periodic/cyclical behavior</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-purple-400 mb-3">
                    Solve the Mathematical Problem
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Use appropriate mathematical techniques to find the answer. Apply what you've
                    learned!
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-semibold mb-3">Example:</h4>
                    <p className="text-gray-300 mb-2">
                      To maximize <InlineMath math="R(p) = -20p^2 + 1000p" />, find the vertex:
                    </p>
                    <div className="bg-black/30 rounded p-3 mb-3">
                      <BlockMath math="p = -\frac{b}{2a} = -\frac{1000}{2(-20)} = 25" />
                    </div>
                    <p className="text-gray-300 mb-2">Calculate maximum revenue:</p>
                    <div className="bg-black/30 rounded p-3 mb-3">
                      <BlockMath math="R(25) = -20(25)^2 + 1000(25) = 12{,}500" />
                    </div>
                    <p className="text-green-400 font-semibold">
                      Answer: Set price at $25 for maximum revenue of $12,500
                    </p>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-4">
                    <h4 className="text-purple-300 font-semibold mb-2">Techniques You Might Use:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Completing the square (quadratics)</li>
                      <li>• Differentiation (finding maximums/minimums)</li>
                      <li>• Logarithms (exponential equations)</li>
                      <li>• Trigonometric identities (periodic functions)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-red-400 mb-3">
                    Interpret & Validate Results
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Translate your mathematical answer back to the real-world context. Does it make
                    sense? Is it reasonable?
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-semibold mb-2">Example Interpretation:</h4>
                    <p className="text-gray-300">
                      "The company should set their price at <strong>$25 per unit</strong>. At this
                      price, they'll sell{' '}
                      <InlineMath math="q = 1000 - 20(25) = 500" /> units, generating{' '}
                      <strong>$12,500 in revenue</strong>."
                    </p>
                    <div className="mt-4 border-t border-gray-700 pt-4">
                      <h4 className="text-white font-semibold mb-2">Validation Questions:</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>✓ Is $25 within a reasonable price range? Yes</li>
                        <li>✓ Does selling 500 units seem realistic? Yes</li>
                        <li>✓ Is this price competitive? Need to check market</li>
                        <li>✗ Warning: Model assumes linear demand - verify this!</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-4">
                    <h4 className="text-red-300 font-semibold mb-2">Always Check:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Does the answer make practical sense?</li>
                      <li>• Are the values within reasonable ranges?</li>
                      <li>• What are the model's limitations?</li>
                      <li>• When might the model break down?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-indigo-400 mb-3">
                    Refine & Iterate (Optional)
                  </h3>
                  <p className="text-gray-300 mb-4">
                    If the model doesn't fit reality well, go back and improve it. Add complexity,
                    adjust assumptions, or collect better data.
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-semibold mb-2">Possible Refinements:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <span>
                          Use actual sales data to verify the linear demand assumption
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <span>
                          Add production costs to model profit instead of just revenue
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <span>
                          Include seasonal variations in demand
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <span>
                          Account for competitor pricing strategies
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-indigo-500/10 rounded-lg p-4">
                    <p className="text-indigo-300 text-sm italic">
                      "All models are wrong, but some are useful." - George Box
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      The goal isn't perfection - it's creating a model that's good enough to make
                      better decisions than guessing!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Reference: Model Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-cyan-400 font-bold mb-2">Quadratic Models</h3>
              <p className="text-gray-300 text-sm mb-2">
                Form: <InlineMath math="y = ax^2 + bx + c" />
              </p>
              <p className="text-gray-400 text-xs">
                Used for: Projectile motion, optimization (revenue, area), parabolic shapes
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-green-400 font-bold mb-2">Exponential Models</h3>
              <p className="text-gray-300 text-sm mb-2">
                Form: <InlineMath math="y = ab^x" /> or <InlineMath math="y = ae^{kx}" />
              </p>
              <p className="text-gray-400 text-xs">
                Used for: Population growth, radioactive decay, compound interest, viral spread
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-purple-400 font-bold mb-2">Trigonometric Models</h3>
              <p className="text-gray-300 text-sm mb-2">
                Form: <InlineMath math="y = A\sin(Bx + C) + D" />
              </p>
              <p className="text-gray-400 text-xs">
                Used for: Waves, oscillations, seasonal patterns, periodic motion
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-yellow-400 font-bold mb-2">Calculus-Based Models</h3>
              <p className="text-gray-300 text-sm mb-2">
                Uses: <InlineMath math="\frac{dy}{dx}" />, integration
              </p>
              <p className="text-gray-400 text-xs">
                Used for: Rate of change, accumulation, optimization with constraints
              </p>
            </div>
          </div>
        </div>

        {/* Practice Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/student/models"
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all group"
          >
            <h3 className="text-white font-bold text-xl mb-2">Try Interactive Models</h3>
            <p className="text-gray-300 text-sm mb-4">
              Practice the modeling cycle with real-world scenarios and adjustable parameters
            </p>
            <span className="text-blue-400 group-hover:translate-x-2 transition-transform inline-block">
              Explore Models →
            </span>
          </Link>

          <Link
            href="/student/quizzes"
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 hover:from-green-500/20 hover:to-emerald-500/20 transition-all group"
          >
            <h3 className="text-white font-bold text-xl mb-2">Test Your Skills</h3>
            <p className="text-gray-300 text-sm mb-4">
              Apply modeling techniques to solve quiz problems with real-world contexts
            </p>
            <span className="text-green-400 group-hover:translate-x-2 transition-transform inline-block">
              Take Quiz →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
