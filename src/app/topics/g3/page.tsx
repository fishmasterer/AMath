'use client'

import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function ProofsInPlaneGeometryPage() {
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
                <div className="text-purple-400 font-bold text-sm mb-1">TOPIC G3</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Proofs in Plane Geometry</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg">
              Mastering logical reasoning and rigorous mathematical proof in geometric contexts
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Introduction Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">📐</span>
              Introduction to Geometric Proofs
            </h2>

            <div className="space-y-4 text-slate-300">
              <p>
                A <strong className="text-white">geometric proof</strong> is a logical argument that uses definitions, axioms, postulates, and previously proven theorems to demonstrate that a geometric statement is true. Proofs are the foundation of mathematics, ensuring that our conclusions are based on solid reasoning rather than intuition alone.
              </p>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Why Proofs Matter</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Certainty:</strong> Proofs provide absolute certainty that a statement is true</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Understanding:</strong> Writing proofs deepens your understanding of geometric relationships</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Logical Thinking:</strong> Develops critical thinking and problem-solving skills</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Foundation:</strong> Forms the basis for advanced mathematics and real-world applications</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Proof Techniques Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">🔍</span>
              Common Proof Techniques
            </h2>

            <div className="space-y-6">
              {/* Direct Proof */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">1. Direct Proof</h3>
                <p className="text-slate-300 mb-4">
                  Start with known facts or assumptions and use logical steps to reach the desired conclusion.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5">
                  <div className="text-purple-400 font-semibold mb-3 text-sm">Structure:</div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div>1. Given/Known information</div>
                    <div>2. Apply definitions, theorems, or properties</div>
                    <div>3. Make logical deductions step by step</div>
                    <div>4. Arrive at the conclusion</div>
                  </div>
                </div>
              </div>

              {/* Indirect Proof */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">2. Indirect Proof (Proof by Contradiction)</h3>
                <p className="text-slate-300 mb-4">
                  Assume the opposite of what you want to prove, then show this assumption leads to a contradiction.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5">
                  <div className="text-purple-400 font-semibold mb-3 text-sm">Structure:</div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div>1. Assume the negation of the statement to be proved</div>
                    <div>2. Use logical reasoning from this assumption</div>
                    <div>3. Arrive at a contradiction (something impossible or contradicts a known fact)</div>
                    <div>4. Conclude that the original statement must be true</div>
                  </div>
                </div>
              </div>

              {/* Two-Column Proof */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">3. Two-Column Proof</h3>
                <p className="text-slate-300 mb-4">
                  A structured format with statements on the left and corresponding reasons on the right.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-purple-400 font-semibold">Statements</div>
                    <div className="text-purple-400 font-semibold">Reasons</div>
                    <div className="text-slate-300">Geometric fact or equation</div>
                    <div className="text-slate-300">Given, definition, theorem, or property</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Triangle Congruence Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">△</span>
              Triangle Congruence Criteria
            </h2>

            <div className="space-y-6">
              <p className="text-slate-300">
                Two triangles are <strong className="text-white">congruent</strong> if they have exactly the same shape and size. The following criteria guarantee triangle congruence:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* SSS */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-xl font-semibold text-white mb-3">SSS (Side-Side-Side)</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    If three sides of one triangle are equal to three sides of another triangle, the triangles are congruent.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center">
                    <InlineMath math="AB = DE, \, BC = EF, \, CA = FD" />
                    <div className="text-purple-400 text-sm mt-2">⇒ △ABC ≅ △DEF</div>
                  </div>
                </div>

                {/* SAS */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-xl font-semibold text-white mb-3">SAS (Side-Angle-Side)</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    If two sides and the included angle of one triangle are equal to the corresponding parts of another triangle.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center">
                    <InlineMath math="AB = DE, \, \angle A = \angle D, \, AC = DF" />
                    <div className="text-purple-400 text-sm mt-2">⇒ △ABC ≅ △DEF</div>
                  </div>
                </div>

                {/* ASA */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-xl font-semibold text-white mb-3">ASA (Angle-Side-Angle)</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    If two angles and the included side of one triangle are equal to the corresponding parts of another triangle.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center">
                    <InlineMath math="\angle A = \angle D, \, AB = DE, \, \angle B = \angle E" />
                    <div className="text-purple-400 text-sm mt-2">⇒ △ABC ≅ △DEF</div>
                  </div>
                </div>

                {/* RHS */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-xl font-semibold text-white mb-3">RHS (Right-Hypotenuse-Side)</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    If the hypotenuse and one side of a right-angled triangle are equal to the corresponding parts of another right-angled triangle.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center">
                    <InlineMath math="\angle A = \angle D = 90°, \, AC = DF, \, BC = EF" />
                    <div className="text-purple-400 text-sm mt-2">⇒ △ABC ≅ △DEF</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-5 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl">⚠️</span>
                  <div className="text-slate-300">
                    <strong className="text-white">Important:</strong> AAA (three angles equal) does NOT guarantee congruence - only similarity. SSA is also NOT a valid congruence criterion.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Circle Theorems Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">⭕</span>
              Circle Theorems
            </h2>

            <div className="space-y-6">
              {/* Tangent-Radius */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Tangent-Radius Theorem</h3>
                <p className="text-slate-300 mb-3">
                  A tangent to a circle is perpendicular to the radius at the point of contact.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5 text-center">
                  <InlineMath math="\text{If } PT \text{ is tangent at } P, \text{ then } OP \perp PT" />
                </div>
              </div>

              {/* Inscribed Angle */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Inscribed Angle Theorem</h3>
                <p className="text-slate-300 mb-3">
                  An angle inscribed in a circle is half the central angle that subtends the same arc.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5 text-center">
                  <InlineMath math="\angle APB = \frac{1}{2} \angle AOB" />
                  <div className="text-slate-400 text-sm mt-2">(where O is the center)</div>
                </div>
              </div>

              {/* Angles in Same Segment */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Angles in the Same Segment</h3>
                <p className="text-slate-300 mb-3">
                  Angles subtended by the same arc at the circumference are equal.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5 text-center">
                  <InlineMath math="\angle APB = \angle AQB" />
                  <div className="text-slate-400 text-sm mt-2">(both angles subtend arc AB)</div>
                </div>
              </div>

              {/* Angle in Semicircle */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Angle in a Semicircle</h3>
                <p className="text-slate-300 mb-3">
                  An angle inscribed in a semicircle is a right angle.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5 text-center">
                  <InlineMath math="\text{If } AB \text{ is diameter, then } \angle APB = 90°" />
                </div>
              </div>

              {/* Cyclic Quadrilateral */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Cyclic Quadrilateral</h3>
                <p className="text-slate-300 mb-3">
                  Opposite angles of a cyclic quadrilateral (inscribed in a circle) are supplementary.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5 text-center">
                  <InlineMath math="\angle A + \angle C = 180°" />
                  <br />
                  <InlineMath math="\angle B + \angle D = 180°" />
                </div>
              </div>

              {/* Alternate Segment */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Alternate Segment Theorem</h3>
                <p className="text-slate-300 mb-3">
                  The angle between a tangent and a chord equals the angle in the alternate segment.
                </p>
                <div className="bg-slate-800/80 rounded-lg p-5 text-center">
                  <InlineMath math="\angle BAT = \angle ACB" />
                  <div className="text-slate-400 text-sm mt-2">(where AT is tangent at A)</div>
                </div>
              </div>
            </div>
          </section>

          {/* Angle Properties Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">∠</span>
              Angle Properties
            </h2>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Vertically Opposite */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Vertically Opposite Angles</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    When two lines intersect, vertically opposite angles are equal.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center text-sm">
                    <InlineMath math="\angle a = \angle c" />
                    <br />
                    <InlineMath math="\angle b = \angle d" />
                  </div>
                </div>

                {/* Linear Pair */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Linear Pair (Supplementary)</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Adjacent angles on a straight line sum to 180°.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center text-sm">
                    <InlineMath math="\angle a + \angle b = 180°" />
                  </div>
                </div>

                {/* Angles at a Point */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Angles at a Point</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Angles around a point sum to 360°.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center text-sm">
                    <InlineMath math="\angle a + \angle b + \angle c + \angle d = 360°" />
                  </div>
                </div>

                {/* Triangle Angle Sum */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Triangle Angle Sum</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    The sum of interior angles in a triangle is 180°.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center text-sm">
                    <InlineMath math="\angle A + \angle B + \angle C = 180°" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Parallel Lines Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">∥</span>
              Parallel Line Properties
            </h2>

            <div className="space-y-6">
              <p className="text-slate-300">
                When a transversal crosses two parallel lines, several angle relationships emerge:
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {/* Corresponding */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Corresponding Angles</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Angles in matching positions are equal.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center text-sm">
                    <InlineMath math="\angle a = \angle e" />
                  </div>
                </div>

                {/* Alternate */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Alternate Angles</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Angles on opposite sides of the transversal are equal.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center text-sm">
                    <InlineMath math="\angle c = \angle e" />
                  </div>
                </div>

                {/* Co-interior */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Co-interior Angles</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Interior angles on the same side sum to 180°.
                  </p>
                  <div className="bg-slate-800/80 rounded-lg p-4 text-center text-sm">
                    <InlineMath math="\angle c + \angle f = 180°" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Proof Writing Guide Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">✍️</span>
              Proof Writing Guide
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Structure of a Good Proof</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-2 text-sm">1. Given Information</div>
                    <p className="text-slate-300 text-sm">
                      Clearly state what is given in the problem. Include all known facts, relationships, and conditions.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-2 text-sm">2. To Prove (Aim)</div>
                    <p className="text-slate-300 text-sm">
                      State precisely what you need to prove. This is your goal.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-2 text-sm">3. Proof (Step-by-step reasoning)</div>
                    <p className="text-slate-300 text-sm">
                      Present logical steps with clear justifications. Each statement should follow from previous statements or known theorems.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 rounded-lg p-5">
                    <div className="text-purple-400 font-semibold mb-2 text-sm">4. Conclusion</div>
                    <p className="text-slate-300 text-sm">
                      Restate what you have proved, often preceded by "Hence" or "Therefore".
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                <h3 className="text-xl font-semibold text-white mb-4">Tips for Writing Proofs</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-slate-300">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Be clear and precise:</strong> Use proper mathematical notation and terminology</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Justify every step:</strong> Always provide a reason (given, definition, theorem, etc.)</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Draw diagrams:</strong> Visualize the problem with clear, labeled diagrams</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Work backwards:</strong> Sometimes it helps to start from the conclusion and work back to the given</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Check your logic:</strong> Ensure each step follows logically from previous statements</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span><strong className="text-white">Be complete:</strong> Don't skip steps, even if they seem obvious</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Example Proofs Section */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">📝</span>
              Example Proofs
            </h2>

            <div className="space-y-6">
              {/* Example 1 - Isosceles Triangle */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-4">Example 1: Isosceles Triangle Theorem</div>

                <div className="space-y-4 text-slate-300">
                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">Given:</div>
                    <p className="text-sm">Triangle ABC where AB = AC</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">To Prove:</div>
                    <p className="text-sm"><InlineMath math="\angle ABC = \angle ACB" /></p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-3">Proof:</div>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-700">
                        <div className="text-purple-400 font-semibold">Statement</div>
                        <div className="text-purple-400 font-semibold">Reason</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>1. Draw AD perpendicular to BC, where D is on BC</div>
                        <div>Construction</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>2. AB = AC</div>
                        <div>Given</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>3. AD = AD</div>
                        <div>Common side</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>4. <InlineMath math="\angle ADB = \angle ADC = 90°" /></div>
                        <div>Construction (AD ⊥ BC)</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>5. △ABD ≅ △ACD</div>
                        <div>RHS congruence</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>6. <InlineMath math="\angle ABC = \angle ACB" /></div>
                        <div>Corresponding angles of congruent triangles</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-2">Conclusion:</div>
                    <p className="text-sm">Therefore, the base angles of an isosceles triangle are equal.</p>
                  </div>
                </div>
              </div>

              {/* Example 2 - Alternate Angles */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-4">Example 2: Proving Lines are Parallel</div>

                <div className="space-y-4 text-slate-300">
                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">Given:</div>
                    <p className="text-sm">
                      Two lines AB and CD are cut by a transversal EF at points P and Q respectively.
                      <InlineMath math="\angle APQ = \angle PQD = 65°" /> (alternate angles)
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">To Prove:</div>
                    <p className="text-sm">AB ∥ CD</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-3">Proof:</div>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-700">
                        <div className="text-purple-400 font-semibold">Statement</div>
                        <div className="text-purple-400 font-semibold">Reason</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>1. <InlineMath math="\angle APQ = 65°" /></div>
                        <div>Given</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>2. <InlineMath math="\angle PQD = 65°" /></div>
                        <div>Given</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>3. <InlineMath math="\angle APQ = \angle PQD" /></div>
                        <div>From steps 1 and 2</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>4. These are alternate angles</div>
                        <div>Position of angles</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>5. AB ∥ CD</div>
                        <div>If alternate angles are equal, lines are parallel</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-2">Conclusion:</div>
                    <p className="text-sm">Hence, AB is parallel to CD.</p>
                  </div>
                </div>
              </div>

              {/* Example 3 - Circle Theorem */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-4">Example 3: Angle in a Semicircle</div>

                <div className="space-y-4 text-slate-300">
                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">Given:</div>
                    <p className="text-sm">
                      Circle with center O. AB is a diameter. P is any point on the circle.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-2">To Prove:</div>
                    <p className="text-sm"><InlineMath math="\angle APB = 90°" /></p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-white font-semibold mb-3">Proof:</div>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-700">
                        <div className="text-purple-400 font-semibold">Statement</div>
                        <div className="text-purple-400 font-semibold">Reason</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>1. Draw radius OP</div>
                        <div>Construction</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>2. OA = OP = OB = r</div>
                        <div>Radii of the same circle</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>3. △OAP is isosceles</div>
                        <div>OA = OP</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>4. <InlineMath math="\angle OAP = \angle OPA = \alpha" /></div>
                        <div>Base angles of isosceles triangle</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>5. △OBP is isosceles</div>
                        <div>OB = OP</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>6. <InlineMath math="\angle OBP = \angle OPB = \beta" /></div>
                        <div>Base angles of isosceles triangle</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>7. <InlineMath math="\angle APB = \alpha + \beta" /></div>
                        <div>Angle addition</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>8. In △APB: <InlineMath math="2\alpha + 2\beta = 180°" /></div>
                        <div>Sum of angles in a triangle</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>9. <InlineMath math="\alpha + \beta = 90°" /></div>
                        <div>Divide step 8 by 2</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>10. <InlineMath math="\angle APB = 90°" /></div>
                        <div>From steps 7 and 9</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-5">
                    <div className="text-green-400 font-semibold mb-2">Conclusion:</div>
                    <p className="text-sm">Therefore, any angle inscribed in a semicircle is a right angle.</p>
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
                  <span>Always state what is given and what you need to prove</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Every step in a proof must have a valid reason or justification</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Congruent triangles have all corresponding sides and angles equal</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>A tangent to a circle is always perpendicular to the radius at the point of contact</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Equal alternate angles prove that two lines are parallel</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Draw clear diagrams and label all points, angles, and lines</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Use proper mathematical notation and symbols throughout your proof</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800/50">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 mt-1">▹</span>
                  <span>Practice recognizing when to use specific theorems and properties</span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Link
              href="/topics/g2"
              className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous: Coordinate Geometry in 2D
            </Link>
            <Link
              href="/topics/c1"
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
