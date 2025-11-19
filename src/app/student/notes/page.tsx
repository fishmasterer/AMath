'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TOPIC_NAMES, QuizTopic } from '@/lib/types'
import { GraphRenderer, GraphPresets } from '@/components/GraphRenderer'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

// Note content structure
interface NoteSection {
  title: string
  content: string
  graphs?: Array<{
    title: string
    config: any
    description?: string
  }>
  keyPoints?: string[]
  examples?: Array<{
    question: string
    solution: string
    graph?: any
  }>
}

interface TopicNotes {
  topic: QuizTopic
  title: string
  sections: NoteSection[]
}

// Sample notes with graphs
const notesData: TopicNotes[] = [
  {
    topic: 'A1',
    title: 'Quadratic Functions',
    sections: [
      {
        title: 'Introduction to Quadratic Functions',
        content: `A quadratic function is a polynomial function of degree 2, written in the form $f(x) = ax^2 + bx + c$ where $a \\neq 0$.

The graph of a quadratic function is a **parabola**:
- If $a > 0$, the parabola opens upward
- If $a < 0$, the parabola opens downward

The **vertex** is the turning point of the parabola.`,
        graphs: [
          {
            title: 'Standard Quadratic: y = x²',
            config: GraphPresets.quadratic(1, 0, 0),
            description: 'Basic parabola opening upward with vertex at origin',
          },
          {
            title: 'Inverted Parabola: y = -x² + 4',
            config: GraphPresets.quadratic(-1, 0, 4),
            description: 'Parabola opening downward with vertex at (0, 4)',
          },
        ],
        keyPoints: [
          'The coefficient a determines the direction and width of the parabola',
          'The vertex form is y = a(x - h)² + k where (h, k) is the vertex',
          'The axis of symmetry is x = h (or x = -b/2a in standard form)',
          'Maximum/minimum value occurs at the vertex',
        ],
      },
      {
        title: 'Completing the Square',
        content: `To convert from standard form $ax^2 + bx + c$ to vertex form:

1. Factor out the coefficient of $x^2$ if $a \\neq 1$
2. Take half of the coefficient of $x$, square it
3. Add and subtract this value inside the parentheses
4. Simplify

$$y = x^2 + 6x + 5$$
$$y = (x^2 + 6x + 9) - 9 + 5$$
$$y = (x + 3)^2 - 4$$

Vertex: $(-3, -4)$`,
        graphs: [
          {
            title: 'Completed Square Example',
            config: {
              expressions: [
                {
                  latex: 'y = x^2 + 6x + 5',
                  color: '#2563eb',
                  label: 'Standard form',
                },
                {
                  latex: 'y = (x + 3)^2 - 4',
                  color: '#dc2626',
                  lineStyle: 'DASHED',
                  label: 'Vertex form',
                },
              ],
              bounds: { left: -10, right: 4, bottom: -6, top: 10 },
            },
            description: 'Both forms represent the same parabola',
          },
        ],
        examples: [
          {
            question: 'Complete the square for $y = 2x^2 - 8x + 3$',
            solution: `$y = 2x^2 - 8x + 3$
$y = 2(x^2 - 4x) + 3$
$y = 2(x^2 - 4x + 4 - 4) + 3$
$y = 2((x - 2)^2 - 4) + 3$
$y = 2(x - 2)^2 - 8 + 3$
$y = 2(x - 2)^2 - 5$

**Vertex:** $(2, -5)$
**Minimum value:** $-5$ (since $a = 2 > 0$)`,
            graph: GraphPresets.quadratic(2, -8, 3),
          },
        ],
      },
    ],
  },
  {
    topic: 'G1',
    title: 'Trigonometric Functions',
    sections: [
      {
        title: 'Basic Trigonometric Functions',
        content: `The three basic trigonometric functions are:

**Sine:** $y = \\sin x$
**Cosine:** $y = \\cos x$
**Tangent:** $y = \\tan x$

Key properties:
- Period of sin and cos: $2\\pi$ (360°)
- Period of tan: $\\pi$ (180°)
- Amplitude of sin and cos: 1
- Range: sin and cos: [-1, 1], tan: all real numbers`,
        graphs: [
          {
            title: 'Sine Function',
            config: GraphPresets.trigonometric('sin', 1, 1),
            description: 'y = sin(x) with period 2π',
          },
          {
            title: 'Cosine Function',
            config: GraphPresets.trigonometric('cos', 1, 1),
            description: 'y = cos(x) with period 2π',
          },
          {
            title: 'Tangent Function',
            config: {
              expressions: [
                {
                  latex: 'y = \\tan(x)',
                  color: '#16a34a',
                  label: 'tan(x)',
                },
              ],
              bounds: { left: -Math.PI, right: Math.PI, bottom: -5, top: 5 },
            },
            description: 'y = tan(x) with asymptotes at odd multiples of π/2',
          },
        ],
        keyPoints: [
          'sin(x) = 0 when x = nπ where n is any integer',
          'cos(x) = 0 when x = (2n+1)π/2',
          'tan(x) is undefined at x = (2n+1)π/2',
          'sin²(x) + cos²(x) = 1 (Pythagorean identity)',
        ],
      },
      {
        title: 'Transformations of Trigonometric Functions',
        content: `General form: $y = a\\sin(bx + c) + d$

**a**: Amplitude (vertical stretch)
**b**: Affects period (period = $2\\pi/b$)
**c**: Horizontal shift (phase shift = $-c/b$)
**d**: Vertical shift`,
        graphs: [
          {
            title: 'Amplitude Changes',
            config: {
              expressions: [
                { latex: 'y = \\sin(x)', color: '#2563eb', label: 'sin(x)' },
                { latex: 'y = 2\\sin(x)', color: '#dc2626', label: '2sin(x)' },
                { latex: 'y = 0.5\\sin(x)', color: '#16a34a', label: '0.5sin(x)' },
              ],
              bounds: { left: -2 * Math.PI, right: 2 * Math.PI, bottom: -3, top: 3 },
            },
            description: 'Different amplitudes of sine function',
          },
          {
            title: 'Period Changes',
            config: {
              expressions: [
                { latex: 'y = \\sin(x)', color: '#2563eb', label: 'sin(x)' },
                { latex: 'y = \\sin(2x)', color: '#dc2626', label: 'sin(2x)' },
                { latex: 'y = \\sin(0.5x)', color: '#16a34a', label: 'sin(0.5x)' },
              ],
              bounds: { left: -4 * Math.PI, right: 4 * Math.PI, bottom: -2, top: 2 },
            },
            description: 'Different periods of sine function',
          },
        ],
      },
    ],
  },
  {
    topic: 'C1',
    title: 'Differentiation & Integration',
    sections: [
      {
        title: 'Basic Differentiation',
        content: `The derivative of a function $f(x)$ represents the rate of change or slope of the function at any point.

**Power Rule:** If $f(x) = x^n$, then $f'(x) = nx^{n-1}$

**Common derivatives:**
- $\\frac{d}{dx}(c) = 0$ (constant)
- $\\frac{d}{dx}(x) = 1$
- $\\frac{d}{dx}(x^2) = 2x$
- $\\frac{d}{dx}(x^n) = nx^{n-1}$`,
        graphs: [
          {
            title: 'Function and its Derivative',
            config: GraphPresets.derivative('y = x^2', 'y = 2x'),
            description: 'The derivative shows the slope at each point',
          },
          {
            title: 'Cubic Function and Derivative',
            config: {
              expressions: [
                { latex: 'y = x^3 - 3x', color: '#2563eb', label: 'f(x) = x³ - 3x' },
                { latex: 'y = 3x^2 - 3', color: '#dc2626', lineStyle: 'DASHED', label: "f'(x) = 3x² - 3" },
              ],
              bounds: { left: -3, right: 3, bottom: -5, top: 5 },
            },
            description: 'Derivative crosses x-axis where original has turning points',
          },
        ],
        keyPoints: [
          'The derivative at a point gives the slope of the tangent line',
          'f\'(x) = 0 at local maxima and minima (turning points)',
          'f\'(x) > 0 means f is increasing',
          'f\'(x) < 0 means f is decreasing',
        ],
        examples: [
          {
            question: 'Find the derivative of $f(x) = 3x^4 - 2x^2 + 5x - 1$',
            solution: `Using the power rule on each term:
$f'(x) = 3(4x^3) - 2(2x) + 5(1) - 0$
$f'(x) = 12x^3 - 4x + 5$`,
          },
        ],
      },
    ],
  },
  {
    topic: 'A6',
    title: 'Exponential & Logarithmic Functions',
    sections: [
      {
        title: 'Exponential Functions',
        content: `An exponential function has the form $f(x) = a \\cdot b^x$ where $a > 0$ and $b > 0$, $b \\neq 1$.

**Special case:** $f(x) = e^x$ where $e \\approx 2.718$

Properties:
- Domain: all real numbers
- Range: $(0, \\infty)$ if $a > 0$
- Horizontal asymptote: $y = 0$
- Always increasing if $b > 1$, decreasing if $0 < b < 1$`,
        graphs: [
          {
            title: 'Exponential Growth',
            config: {
              expressions: [
                { latex: 'y = 2^x', color: '#2563eb', label: '2^x' },
                { latex: 'y = 3^x', color: '#dc2626', label: '3^x' },
                { latex: 'y = e^x', color: '#16a34a', label: 'e^x' },
              ],
              bounds: { left: -3, right: 3, bottom: -1, top: 8 },
            },
            description: 'Different exponential growth functions',
          },
          {
            title: 'Exponential Decay',
            config: {
              expressions: [
                { latex: 'y = (0.5)^x', color: '#2563eb', label: '(1/2)^x' },
                { latex: 'y = e^{-x}', color: '#dc2626', label: 'e^(-x)' },
              ],
              bounds: { left: -2, right: 4, bottom: -1, top: 5 },
            },
            description: 'Exponential decay functions',
          },
        ],
      },
      {
        title: 'Logarithmic Functions',
        content: `The logarithm is the inverse of the exponential function.

If $y = b^x$, then $x = \\log_b(y)$

**Natural logarithm:** $\\ln(x) = \\log_e(x)$

**Properties:**
- $\\log_b(xy) = \\log_b(x) + \\log_b(y)$
- $\\log_b(x/y) = \\log_b(x) - \\log_b(y)$
- $\\log_b(x^n) = n\\log_b(x)$
- $\\log_b(b) = 1$`,
        graphs: [
          {
            title: 'Natural Logarithm',
            config: GraphPresets.logarithmic(Math.E),
            description: 'y = ln(x), the inverse of e^x',
          },
          {
            title: 'Exponential and Logarithm (Inverses)',
            config: {
              expressions: [
                { latex: 'y = e^x', color: '#2563eb', label: 'e^x' },
                { latex: 'y = \\ln(x)', color: '#dc2626', label: 'ln(x)' },
                { latex: 'y = x', color: '#9333ea', lineStyle: 'DASHED', label: 'y = x' },
              ],
              bounds: { left: -3, right: 5, bottom: -3, top: 5 },
            },
            description: 'Exponential and logarithm are reflections across y=x',
          },
        ],
      },
    ],
  },
  {
    topic: 'A2',
    title: 'Equations and Inequalities',
    sections: [
      {
        title: 'Simultaneous Equations',
        content: `Solving systems of equations where two or more equations must be satisfied simultaneously.

**Methods:**
1. **Substitution:** Solve one equation for a variable, substitute into the other
2. **Elimination:** Add or subtract equations to eliminate a variable
3. **Graphical:** Find intersection point of the lines

**Example:** Solve $2x + y = 7$ and $x - y = 2$

Adding equations: $3x = 9$, so $x = 3$
Substituting: $3 - y = 2$, so $y = 1$
**Solution:** $(3, 1)$`,
        graphs: [
          {
            title: 'Linear System Example',
            config: {
              expressions: [
                { latex: 'y = -2x + 7', color: '#2563eb', lineWidth: 3, label: '2x + y = 7' },
                { latex: 'y = x - 2', color: '#dc2626', lineWidth: 3, label: 'x - y = 2' },
                { latex: '(3, 1)', color: '#10b981', points: true, label: 'Solution' },
              ],
              bounds: { left: -2, right: 6, bottom: -4, top: 8 },
            },
            description: 'Lines intersect at (3, 1)',
          },
        ],
        keyPoints: [
          'Intersection point satisfies both equations',
          'Parallel lines mean no solution',
          'Identical lines mean infinite solutions',
          'Always verify your solution by substituting back',
        ],
      },
      {
        title: 'Quadratic Inequalities',
        content: `Solving inequalities involving quadratic expressions.

**Steps:**
1. Rearrange to standard form: $ax^2 + bx + c > 0$ (or $<$, $\\geq$, $\\leq$)
2. Find roots by factoring or quadratic formula
3. Sketch the parabola
4. Determine solution region based on inequality sign

**Example:** Solve $x^2 - 5x + 6 < 0$

Factoring: $(x - 2)(x - 3) < 0$
Roots: $x = 2$ and $x = 3$
Since parabola opens upward, negative region is between roots.
**Solution:** $2 < x < 3$`,
        graphs: [
          {
            title: 'Quadratic Inequality',
            config: {
              expressions: [
                { latex: 'y = x^2 - 5x + 6', color: '#2563eb', lineWidth: 3 },
                { latex: 'y = 0', color: '#ef4444', lineStyle: 'DASHED' },
                { latex: 'x = 2', color: '#10b981', lineStyle: 'DOTTED' },
                { latex: 'x = 3', color: '#10b981', lineStyle: 'DOTTED' },
              ],
              bounds: { left: 0, right: 5, bottom: -2, top: 4 },
            },
            description: 'Solution region: 2 < x < 3 where y < 0',
          },
        ],
        keyPoints: [
          'Find roots first (quadratic formula or factoring)',
          'Sketch parabola to visualize solution regions',
          'Test a point in each region to confirm signs',
          'Use open circles (< , >) or closed circles (≤ , ≥)',
        ],
        examples: [
          {
            question: 'Solve $-x^2 + 4x - 3 \\geq 0$',
            solution: `$-x^2 + 4x - 3 \\geq 0$
Multiply by -1 (flip inequality): $x^2 - 4x + 3 \\leq 0$
Factor: $(x - 1)(x - 3) \\leq 0$
Roots: $x = 1$ and $x = 3$

Original parabola opens downward (coefficient is negative).
Non-negative region: between roots.

**Solution:** $1 \\leq x \\leq 3$`,
          },
        ],
      },
    ],
  },
  {
    topic: 'A3',
    title: 'Surds',
    sections: [
      {
        title: 'Simplifying Surds',
        content: `A surd is an irrational number involving roots that cannot be simplified to a rational number.

**Simplification Rules:**
- $\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$
- $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$
- $\\sqrt{a^2b} = a\\sqrt{b}$ (where $a \\geq 0$)

**Example:** Simplify $\\sqrt{72}$
$\\sqrt{72} = \\sqrt{36 \\times 2} = \\sqrt{36} \\times \\sqrt{2} = 6\\sqrt{2}$`,
        keyPoints: [
          'Look for perfect square factors',
          'Simplify by extracting squares from under the root',
          'Cannot add/subtract surds with different roots',
          'Like surds: √2 + 3√2 = 4√2',
        ],
        examples: [
          {
            question: 'Simplify $\\sqrt{50} + \\sqrt{32}$',
            solution: `$\\sqrt{50} + \\sqrt{32}$
$= \\sqrt{25 \\times 2} + \\sqrt{16 \\times 2}$
$= 5\\sqrt{2} + 4\\sqrt{2}$
$= 9\\sqrt{2}$`,
          },
        ],
      },
      {
        title: 'Rationalizing the Denominator',
        content: `Removing surds from denominators by multiplying by the conjugate.

**For single surd:** Multiply top and bottom by the surd
$\\frac{1}{\\sqrt{a}} = \\frac{1}{\\sqrt{a}} \\times \\frac{\\sqrt{a}}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}$

**For binomial:** Use conjugate $(a + b)(a - b) = a^2 - b^2$
$\\frac{1}{a + \\sqrt{b}} \\times \\frac{a - \\sqrt{b}}{a - \\sqrt{b}} = \\frac{a - \\sqrt{b}}{a^2 - b}$`,
        keyPoints: [
          'Conjugate of (a + √b) is (a - √b)',
          'Product of conjugates eliminates the surd',
          'Always simplify the result',
          'Rationalizing makes fractions easier to work with',
        ],
        examples: [
          {
            question: 'Rationalize $\\frac{6}{2 + \\sqrt{3}}$',
            solution: `$\\frac{6}{2 + \\sqrt{3}} \\times \\frac{2 - \\sqrt{3}}{2 - \\sqrt{3}}$

$= \\frac{6(2 - \\sqrt{3})}{(2 + \\sqrt{3})(2 - \\sqrt{3})}$

$= \\frac{12 - 6\\sqrt{3}}{4 - 3}$

$= \\frac{12 - 6\\sqrt{3}}{1}$

$= 12 - 6\\sqrt{3}$`,
          },
        ],
      },
    ],
  },
  {
    topic: 'A4',
    title: 'Polynomials and Partial Fractions',
    sections: [
      {
        title: 'Factor Theorem & Remainder Theorem',
        content: `**Remainder Theorem:** When polynomial $f(x)$ is divided by $(x - a)$, remainder is $f(a)$

**Factor Theorem:** $(x - a)$ is a factor of $f(x)$ if and only if $f(a) = 0$

**Example:** Is $(x - 2)$ a factor of $f(x) = x^3 - 5x^2 + 8x - 4$?

Check: $f(2) = 2^3 - 5(2)^2 + 8(2) - 4 = 8 - 20 + 16 - 4 = 0$

Yes! $(x - 2)$ is a factor because $f(2) = 0$.`,
        keyPoints: [
          'Factor theorem finds factors quickly',
          'Remainder theorem finds remainders without division',
          'Try small integers (±1, ±2, ±3) as potential roots',
          'Once you find one factor, use polynomial division for others',
        ],
        examples: [
          {
            question: 'Find the remainder when $x^3 + 2x^2 - 5x + 7$ is divided by $(x + 3)$',
            solution: `Using remainder theorem with $a = -3$:

$f(-3) = (-3)^3 + 2(-3)^2 - 5(-3) + 7$
$= -27 + 18 + 15 + 7$
$= 13$

**Remainder is 13**`,
          },
        ],
      },
      {
        title: 'Partial Fractions',
        content: `Decomposing rational expressions into simpler fractions.

**Type 1: Distinct Linear Factors**
$\\frac{A}{x + a} + \\frac{B}{x + b}$

**Type 2: Repeated Linear Factor**
$\\frac{A}{x + a} + \\frac{B}{(x + a)^2}$

**Type 3: Irreducible Quadratic**
$\\frac{Ax + B}{x^2 + bx + c}$

**Example:** Express $\\frac{5x + 1}{(x + 1)(x - 2)}$ in partial fractions

$\\frac{5x + 1}{(x + 1)(x - 2)} = \\frac{A}{x + 1} + \\frac{B}{x - 2}$

$5x + 1 = A(x - 2) + B(x + 1)$

Let $x = -1$: $-4 = -3A$, so $A = \\frac{4}{3}$
Let $x = 2$: $11 = 3B$, so $B = \\frac{11}{3}$

Answer: $\\frac{4/3}{x + 1} + \\frac{11/3}{x - 2}$`,
        keyPoints: [
          'Denominator must be factored first',
          'Cover-up rule for distinct linear factors',
          'Substitute convenient values to find constants',
          'Used in integration and Laplace transforms',
        ],
      },
    ],
  },
  {
    topic: 'A5',
    title: 'Binomial Expansions',
    sections: [
      {
        title: 'Binomial Theorem',
        content: `Expanding $(a + b)^n$ using Pascal's Triangle or the binomial formula.

**Binomial Formula:**
$(a + b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r$

Where $\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$

**Pascal's Triangle:**
\`\`\`
       1
      1 1
     1 2 1
    1 3 3 1
   1 4 6 4 1
\`\`\`

**Example:** Expand $(x + 2)^3$

$(x + 2)^3 = \\binom{3}{0}x^3(2)^0 + \\binom{3}{1}x^2(2)^1 + \\binom{3}{2}x^1(2)^2 + \\binom{3}{3}x^0(2)^3$

$= 1 \\cdot x^3 \\cdot 1 + 3 \\cdot x^2 \\cdot 2 + 3 \\cdot x \\cdot 4 + 1 \\cdot 1 \\cdot 8$

$= x^3 + 6x^2 + 12x + 8$`,
        keyPoints: [
          'Coefficients from Pascal\'s triangle or combination formula',
          'Powers of first term decrease, second term increase',
          'Total power in each term equals n',
          'General term: T_{r+1} = C(n,r) a^{n-r} b^r',
        ],
      },
      {
        title: 'Finding Specific Terms',
        content: `To find a specific term without full expansion:

**General Term:** $T_{r+1} = \\binom{n}{r} a^{n-r} b^r$

**Example:** Find the coefficient of $x^5$ in $(2x - 3)^7$

General term: $T_{r+1} = \\binom{7}{r} (2x)^{7-r} (-3)^r$

For $x^5$: power of $x$ is $7 - r = 5$, so $r = 2$

$T_3 = \\binom{7}{2} (2x)^5 (-3)^2$
$= 21 \\times 32x^5 \\times 9$
$= 6048x^5$

**Coefficient is 6048**`,
        keyPoints: [
          'Use general term formula for specific terms',
          'Match powers to find which term you need',
          'Be careful with negative signs',
          'Binomial coefficients: C(n,r) = n!/(r!(n-r)!)',
        ],
        examples: [
          {
            question: 'Find the constant term in $(x^2 - \\frac{1}{x})^6$',
            solution: `General term: $T_{r+1} = \\binom{6}{r} (x^2)^{6-r} (-\\frac{1}{x})^r$

$= \\binom{6}{r} x^{12-2r} \\times (-1)^r x^{-r}$

$= \\binom{6}{r} (-1)^r x^{12-3r}$

For constant term: $12 - 3r = 0$, so $r = 4$

$T_5 = \\binom{6}{4} (-1)^4 x^0 = 15 \\times 1 = 15$

**Constant term is 15**`,
          },
        ],
      },
    ],
  },
  {
    topic: 'G2',
    title: 'Coordinate Geometry',
    sections: [
      {
        title: 'Distance Formula & Midpoint',
        content: `**Distance Formula:** Distance between points $(x_1, y_1)$ and $(x_2, y_2)$:
$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$

**Midpoint Formula:**
$M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$

**Example:** Find distance and midpoint between $A(1, 2)$ and $B(7, 10)$

Distance: $d = \\sqrt{(7-1)^2 + (10-2)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$

Midpoint: $M = \\left(\\frac{1+7}{2}, \\frac{2+10}{2}\\right) = (4, 6)$`,
        keyPoints: [
          'Distance formula derived from Pythagoras theorem',
          'Midpoint is average of x-coordinates and y-coordinates',
          'Used for finding perimeters, areas, and centers',
          'Can extend to 3D with same principles',
        ],
      },
      {
        title: 'Equation of a Circle',
        content: `**Standard Form:** $(x - h)^2 + (y - k)^2 = r^2$
- Center: $(h, k)$
- Radius: $r$

**General Form:** $x^2 + y^2 + 2gx + 2fy + c = 0$
- Center: $(-g, -f)$
- Radius: $\\sqrt{g^2 + f^2 - c}$

**Converting:** Complete the square on both $x$ and $y$

**Example:** Find center and radius of $x^2 + y^2 - 6x + 4y - 3 = 0$

Complete the square:
$(x^2 - 6x + 9) + (y^2 + 4y + 4) = 3 + 9 + 4$
$(x - 3)^2 + (y + 2)^2 = 16$

**Center:** $(3, -2)$, **Radius:** $4$`,
        graphs: [
          {
            title: 'Circle Example',
            config: {
              expressions: [
                { latex: '(x - 3)^2 + (y + 2)^2 = 16', color: '#2563eb', lineWidth: 3 },
                { latex: '(3, -2)', color: '#ef4444', points: true, label: 'Center' },
              ],
              bounds: { left: -2, right: 8, bottom: -7, top: 3 },
            },
            description: 'Circle with center (3, -2) and radius 4',
          },
        ],
        keyPoints: [
          'Standard form shows center and radius directly',
          'Complete the square to convert general to standard form',
          'Point (x, y) is ON circle if it satisfies equation',
          'Tangent to circle is perpendicular to radius at point of contact',
        ],
      },
      {
        title: 'Parallel and Perpendicular Lines',
        content: `**Slope (Gradient):** $m = \\frac{y_2 - y_1}{x_2 - x_1}$

**Parallel Lines:** Same slope
If $m_1 = m_2$, lines are parallel

**Perpendicular Lines:** Product of slopes is -1
If $m_1 \\times m_2 = -1$, lines are perpendicular
Or: $m_2 = -\\frac{1}{m_1}$ (negative reciprocal)

**Example:** Are lines $y = 3x + 2$ and $y = -\\frac{1}{3}x + 5$ perpendicular?

$m_1 = 3$, $m_2 = -\\frac{1}{3}$

Check: $m_1 \\times m_2 = 3 \\times (-\\frac{1}{3}) = -1$ ✓

**Yes, they are perpendicular!**`,
        keyPoints: [
          'Parallel: m₁ = m₂ (equal slopes)',
          'Perpendicular: m₁ × m₂ = -1 (negative reciprocal)',
          'Vertical line (undefined slope) ⊥ horizontal line (slope = 0)',
          'Use point-slope form: y - y₁ = m(x - x₁)',
        ],
      },
    ],
  },
  {
    topic: 'G3',
    title: 'Proofs in Plane Geometry',
    sections: [
      {
        title: 'Triangle Congruence Tests',
        content: `Two triangles are **congruent** if they have the same shape and size.

**Four Congruence Tests:**

**1. SSS (Side-Side-Side):** All three sides equal
**2. SAS (Side-Angle-Side):** Two sides and included angle equal
**3. ASA (Angle-Side-Angle):** Two angles and included side equal
**4. RHS (Right angle-Hypotenuse-Side):** Right angle, hypotenuse, and one other side equal

**Example:** Prove △ABC ≅ △DEF given:
- AB = DE = 5 cm
- BC = EF = 7 cm
- ∠B = ∠E = 60°

**Proof:** Using SAS test:
- Two sides: AB = DE and BC = EF ✓
- Included angle: ∠B = ∠E ✓

Therefore △ABC ≅ △DEF by SAS`,
        keyPoints: [
          'SSS: Three sides determine a unique triangle',
          'SAS: Angle must be BETWEEN the two sides',
          'ASA: Side must be BETWEEN the two angles',
          'AAA is NOT a congruence test (shows similarity, not congruence)',
        ],
      },
      {
        title: 'Triangle Similarity Tests',
        content: `Two triangles are **similar** if they have the same shape (but not necessarily size).

**Three Similarity Tests:**

**1. AAA (Angle-Angle-Angle):** All three angles equal
**2. SSS Ratio:** All sides in same ratio
**3. SAS Ratio:** Two sides in same ratio and included angle equal

**Properties of Similar Triangles:**
- Corresponding angles are equal
- Corresponding sides are in proportion
- Ratio of areas = (ratio of sides)²

**Example:** △ABC ~ △DEF with AB:DE = 2:3
If area of △ABC = 12 cm², find area of △DEF

Ratio of sides = 2:3
Ratio of areas = 2²:3² = 4:9

$\\frac{12}{\\text{Area of DEF}} = \\frac{4}{9}$

Area of △DEF = $\\frac{12 \\times 9}{4} = 27$ cm²`,
        keyPoints: [
          'Similar triangles have equal angles, proportional sides',
          'AAA is sufficient for similarity (not for congruence)',
          'Areas scale with square of linear scale factor',
          'Volumes scale with cube of linear scale factor',
        ],
      },
      {
        title: 'Circle Theorems',
        content: `Key theorems for angles and lines in circles:

**1. Angle at Center = 2 × Angle at Circumference**
(when subtending the same arc)

**2. Angles in Same Segment are Equal**
(angles subtended by same arc at circumference)

**3. Angle in Semicircle = 90°**
(angle subtended by diameter)

**4. Opposite Angles in Cyclic Quadrilateral = 180°**
(quadrilateral with all vertices on circle)

**5. Tangent ⊥ Radius**
(tangent perpendicular to radius at point of contact)

**6. Alternate Segment Theorem**
(angle between tangent and chord = angle in alternate segment)`,
        keyPoints: [
          'Angles in same segment are equal',
          'Angle in semicircle is always 90°',
          'Tangent perpendicular to radius is key for many proofs',
          'Cyclic quadrilateral: opposite angles sum to 180°',
        ],
      },
    ],
  },
]

export default function NotesPage() {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic>('A1')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['0']))

  const currentNotes = notesData.find(n => n.topic === selectedTopic)

  const toggleSection = (index: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedSections(newExpanded)
  }

  const renderLatex = (text: string) => {
    const parts: React.ReactElement[] = []
    let remaining = text
    let key = 0

    // Handle block math
    while (remaining.includes('$$')) {
      const start = remaining.indexOf('$$')
      const end = remaining.indexOf('$$', start + 2)
      if (end === -1) break

      if (start > 0) {
        parts.push(<span key={key++}>{processInlineLatex(remaining.substring(0, start))}</span>)
      }

      const latex = remaining.substring(start + 2, end)
      parts.push(
        <div key={key++} className="my-4">
          <BlockMath math={latex} />
        </div>
      )

      remaining = remaining.substring(end + 2)
    }

    if (remaining) {
      parts.push(<span key={key++}>{processInlineLatex(remaining)}</span>)
    }

    return parts.length > 0 ? <>{parts}</> : processInlineLatex(text)
  }

  const processInlineLatex = (text: string) => {
    const parts: React.ReactElement[] = []
    let remaining = text
    let key = 0

    while (remaining.includes('$')) {
      const start = remaining.indexOf('$')
      const end = remaining.indexOf('$', start + 1)
      if (end === -1) break

      if (start > 0) {
        parts.push(<span key={key++}>{remaining.substring(0, start)}</span>)
      }

      const latex = remaining.substring(start + 1, end)
      parts.push(<InlineMath key={key++} math={latex} />)

      remaining = remaining.substring(end + 1)
    }

    if (remaining) {
      parts.push(<span key={key++}>{remaining}</span>)
    }

    return parts.length > 0 ? <>{parts}</> : text
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">📚 Study Notes</h1>
          <p className="text-gray-400">Interactive notes with graphs for O-Level Additional Mathematics</p>

          {/* Link to Models */}
          <Link
            href="/student/models"
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <span className="font-semibold">Explore Real-World Applications</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Topic Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sticky top-4">
              <h2 className="text-lg font-bold text-white mb-4">Topics</h2>
              <div className="space-y-2">
                {notesData.map(note => (
                  <button
                    key={note.topic}
                    onClick={() => {
                      setSelectedTopic(note.topic)
                      setExpandedSections(new Set(['0']))
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedTopic === note.topic
                        ? 'bg-cyan-500/20 border-2 border-cyan-500 text-cyan-400'
                        : 'bg-white/5 border-2 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="font-mono font-bold text-sm">{note.topic}</div>
                    <div className="text-xs">{TOPIC_NAMES[note.topic]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Content */}
          <div className="lg:col-span-3">
            {currentNotes && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{currentNotes.title}</h2>
                  <p className="text-gray-400">{TOPIC_NAMES[currentNotes.topic]}</p>
                </div>

                {currentNotes.sections.map((section, index) => {
                  const isExpanded = expandedSections.has(index.toString())

                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection(index.toString())}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                      >
                        <h3 className="text-xl font-bold text-white">{section.title}</h3>
                        <svg
                          className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="p-6 pt-0 space-y-6">
                          {/* Content */}
                          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {renderLatex(section.content)}
                          </div>

                          {/* Key Points */}
                          {section.keyPoints && (
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                              <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                                </svg>
                                Key Points
                              </h4>
                              <ul className="space-y-2 text-gray-300">
                                {section.keyPoints.map((point, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>{renderLatex(point)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Graphs */}
                          {section.graphs && section.graphs.map((graph, i) => (
                            <div key={i} className="space-y-2">
                              <h4 className="text-cyan-400 font-bold">{graph.title}</h4>
                              {graph.description && (
                                <p className="text-gray-400 text-sm">{graph.description}</p>
                              )}
                              <GraphRenderer config={graph.config} height={400} />
                            </div>
                          ))}

                          {/* Examples */}
                          {section.examples && (
                            <div className="space-y-4">
                              <h4 className="text-green-400 font-bold text-lg flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                </svg>
                                Worked Examples
                              </h4>
                              {section.examples.map((example, i) => (
                                <div key={i} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
                                  <div>
                                    <span className="text-green-400 font-bold">Question: </span>
                                    <span className="text-gray-300">{renderLatex(example.question)}</span>
                                  </div>
                                  <div>
                                    <span className="text-green-400 font-bold">Solution:</span>
                                    <div className="text-gray-300 mt-2 whitespace-pre-line">
                                      {renderLatex(example.solution)}
                                    </div>
                                  </div>
                                  {example.graph && (
                                    <GraphRenderer config={example.graph} height={350} />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
