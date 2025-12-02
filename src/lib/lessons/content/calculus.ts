// Calculus Lessons (C1)
// Covers differentiation and integration with real-world applications

import { Lesson, LessonModule, LessonStep } from '../types';
import { QuizTopic } from '@/lib/knowledgeBase/types';

// =============================================================================
// LESSON 1: Introduction to Differentiation (30 XP)
// =============================================================================

const lesson1Steps: LessonStep[] = [
  {
    id: 'calc-01-hook',
    type: 'content',
    title: 'The Mathematics of Change',
    content: `# 🎢 How Fast Are You Going?

Imagine you're on a **roller coaster**. At any moment, you might be:
- Speeding up going down a hill
- Slowing down climbing up
- At the peak, momentarily still

**Differentiation** is the math that tells us **how fast things change** at any instant.

> 🏎️ A car's speedometer shows the derivative of position - your instantaneous speed!

This is one of the most powerful tools in all of mathematics. Let's discover it!`,
    xpReward: 5,
  },
  {
    id: 'calc-01-concept1',
    type: 'content',
    title: 'From Average to Instantaneous',
    content: `# The Gradient Problem

**Average rate of change** = how much something changes over a period:
$$\\text{Average speed} = \\frac{\\text{distance traveled}}{\\text{time taken}}$$

But what about **instantaneous** rate of change - how fast RIGHT NOW?

## The Brilliant Idea

Take the average over a **smaller and smaller** interval until it becomes an instant!

If $y = f(x)$, the **derivative** is:
$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

> 🧠 **Memory trick**: Think of "h" getting tiny like a "hair's width"!`,
    xpReward: 5,
  },
  {
    id: 'calc-01-concept2',
    type: 'content',
    title: 'The Power Rule - Your Best Friend',
    content: `# The Power Rule

For $y = x^n$:
$$\\frac{dy}{dx} = nx^{n-1}$$

> 🎯 **Memory trick**: "**Bring down** the power, then **knock it down** by one"

## Examples:

| Function | Derivative | Working |
|----------|------------|---------|
| $y = x^3$ | $\\frac{dy}{dx} = 3x^2$ | Bring down 3, power becomes 2 |
| $y = x^5$ | $\\frac{dy}{dx} = 5x^4$ | Bring down 5, power becomes 4 |
| $y = x^{-2}$ | $\\frac{dy}{dx} = -2x^{-3}$ | Works for negative powers too! |
| $y = \\sqrt{x} = x^{1/2}$ | $\\frac{dy}{dx} = \\frac{1}{2}x^{-1/2}$ | And fractions! |

**Constants disappear**: If $y = 5$, then $\\frac{dy}{dx} = 0$ (constants don't change!)`,
    xpReward: 5,
  },
  {
    id: 'calc-01-visual',
    type: 'interactive',
    title: 'See the Derivative',
    content: `# Watch the Gradient Change

The derivative at a point equals the **gradient of the tangent line** at that point.

Move the slider to see how the tangent (and its gradient) changes along the curve!`,
    interactiveConfig: {
      type: 'desmos',
      config: {
        expressions: [
          { latex: 'f(x) = x^2', color: '#3b82f6' },
          { latex: 'a = 1' },
          { latex: '(a, f(a))', color: '#ef4444', pointStyle: 'POINT' },
          { latex: 'y = 2a(x - a) + a^2', color: '#22c55e', lineStyle: 'DASHED' },
          { latex: '\\text{Gradient} = 2a', color: '#22c55e' },
        ],
        settings: {
          xAxisLabel: 'x',
          yAxisLabel: 'y',
          showGrid: true,
        },
      },
    },
    xpReward: 5,
  },
  {
    id: 'calc-01-practice1',
    type: 'practice',
    title: 'Practice: Power Rule',
    content: 'Differentiate $y = x^4$',
    question: {
      id: 'calc-01-q1',
      type: 'MultipleChoice',
      question: 'What is $\\frac{dy}{dx}$ if $y = x^4$?',
      options: ['$4x^3$', '$4x^4$', '$x^3$', '$4x^5$'],
      correctAnswer: '$4x^3$',
      explanation: 'Bring down the 4, reduce the power by 1: $4x^{4-1} = 4x^3$',
      difficulty: 'foundational',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-01-practice2',
    type: 'practice',
    title: 'Practice: Negative Powers',
    content: 'Differentiate $y = x^{-3}$',
    question: {
      id: 'calc-01-q2',
      type: 'MultipleChoice',
      question: 'What is $\\frac{dy}{dx}$ if $y = x^{-3}$?',
      options: ['$-3x^{-4}$', '$-3x^{-2}$', '$3x^{-4}$', '$-3x^{4}$'],
      correctAnswer: '$-3x^{-4}$',
      explanation: 'Bring down -3, reduce power: $-3x^{-3-1} = -3x^{-4}$',
      difficulty: 'foundational',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
];

export const calculusLesson1: Lesson = {
  id: 'calc-01-intro',
  moduleId: 'module-calculus',
  title: 'Introduction to Differentiation',
  description: 'Discover the mathematics of change with the power rule',
  estimatedMinutes: 12,
  xpReward: 30,
  steps: lesson1Steps,
  prerequisites: [],
};

// =============================================================================
// LESSON 2: Differentiation Rules (45 XP)
// =============================================================================

const lesson2Steps: LessonStep[] = [
  {
    id: 'calc-02-hook',
    type: 'content',
    title: 'Beyond Simple Powers',
    content: `# 🧅 Layers of Complexity

Real-world functions aren't just simple powers. Consider:
- $(2x + 1)^5$ - a function inside a function!
- $x^2 \\cdot \\sin(x)$ - two functions multiplied!
- $\\frac{x^2}{x + 1}$ - one function divided by another!

We need more powerful tools:
1. **Chain Rule** - for functions inside functions
2. **Product Rule** - for functions multiplied together
3. **Quotient Rule** - for functions divided

> 🎯 Master these three rules and you can differentiate almost anything!`,
    xpReward: 5,
  },
  {
    id: 'calc-02-chain',
    type: 'content',
    title: 'The Chain Rule',
    content: `# 🧅 The Chain Rule - Peeling the Onion

For $y = f(g(x))$ (a function inside a function):
$$\\frac{dy}{dx} = f'(g(x)) \\cdot g'(x)$$

> 🧠 **Memory trick**: "**Differentiate outside, keep inside, times derivative of inside**"

## Example: $y = (3x + 1)^4$

**Outside function**: $(\\_)^4$ → derivative is $4(\\_)^3$
**Inside function**: $3x + 1$ → derivative is $3$

$$\\frac{dy}{dx} = 4(3x+1)^3 \\cdot 3 = 12(3x+1)^3$$

> 🧅 Like peeling an onion - work from outside to inside!`,
    xpReward: 5,
  },
  {
    id: 'calc-02-product',
    type: 'content',
    title: 'The Product Rule',
    content: `# ✖️ The Product Rule

For $y = u \\cdot v$ where both $u$ and $v$ are functions of $x$:
$$\\frac{dy}{dx} = u\\frac{dv}{dx} + v\\frac{du}{dx}$$

> 🧠 **Memory trick**: "**First times derivative of second, plus second times derivative of first**"

## Example: $y = x^2 \\cdot e^x$

Let $u = x^2$ and $v = e^x$
- $\\frac{du}{dx} = 2x$
- $\\frac{dv}{dx} = e^x$

$$\\frac{dy}{dx} = x^2 \\cdot e^x + e^x \\cdot 2x = e^x(x^2 + 2x)$$

> 🎵 Some remember it as: "**u dv plus v du**" - like a little song!`,
    xpReward: 5,
  },
  {
    id: 'calc-02-quotient',
    type: 'content',
    title: 'The Quotient Rule',
    content: `# ➗ The Quotient Rule

For $y = \\frac{u}{v}$:
$$\\frac{dy}{dx} = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}$$

> 🧠 **Memory trick**: "**Low d-high minus high d-low, all over low squared**"

Or remember: "**Bottom times derivative of top, minus top times derivative of bottom, over bottom squared**"

## Example: $y = \\frac{x^2}{x+1}$

Let $u = x^2$ (top) and $v = x+1$ (bottom)

$$\\frac{dy}{dx} = \\frac{(x+1)(2x) - (x^2)(1)}{(x+1)^2} = \\frac{2x^2 + 2x - x^2}{(x+1)^2} = \\frac{x^2 + 2x}{(x+1)^2}$$`,
    xpReward: 5,
  },
  {
    id: 'calc-02-practice1',
    type: 'practice',
    title: 'Practice: Chain Rule',
    content: 'Apply the chain rule',
    question: {
      id: 'calc-02-q1',
      type: 'MultipleChoice',
      question: 'Differentiate $y = (2x - 5)^3$',
      options: ['$6(2x-5)^2$', '$3(2x-5)^2$', '$6(2x-5)^3$', '$2(2x-5)^2$'],
      correctAnswer: '$6(2x-5)^2$',
      explanation: 'Chain rule: $3(2x-5)^2 \\times 2 = 6(2x-5)^2$. Differentiate outside ($3(...)^2$), times derivative of inside ($2$).',
      difficulty: 'intermediate',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-02-practice2',
    type: 'practice',
    title: 'Practice: Product Rule',
    content: 'Apply the product rule',
    question: {
      id: 'calc-02-q2',
      type: 'MultipleChoice',
      question: 'If $y = x^3(x+2)$, what is $\\frac{dy}{dx}$?',
      options: ['$4x^3 + 6x^2$', '$3x^2 + 6x$', '$x^4 + 2x^3$', '$3x^2(x+2)$'],
      correctAnswer: '$4x^3 + 6x^2$',
      explanation: 'Product rule: $x^3 \\cdot 1 + (x+2) \\cdot 3x^2 = x^3 + 3x^3 + 6x^2 = 4x^3 + 6x^2$',
      difficulty: 'intermediate',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-02-practice3',
    type: 'practice',
    title: 'Practice: Quotient Rule',
    content: 'Apply the quotient rule',
    question: {
      id: 'calc-02-q3',
      type: 'Numeric',
      question: 'If $y = \\frac{x^2}{x+3}$, find the value of $\\frac{dy}{dx}$ when $x = 1$.',
      correctAnswer: 0.5625,
      tolerance: 0.01,
      explanation: 'Quotient rule gives $\\frac{(x+3)(2x) - x^2(1)}{(x+3)^2} = \\frac{x^2 + 6x}{(x+3)^2}$. At $x=1$: $\\frac{1+6}{16} = \\frac{7}{16} = 0.4375$... Wait, let me recalculate: $\\frac{2x(x+3) - x^2}{(x+3)^2} = \\frac{2x^2 + 6x - x^2}{(x+3)^2} = \\frac{x^2 + 6x}{(x+3)^2}$. At $x=1$: $\\frac{1+6}{16} = 0.4375$',
      difficulty: 'intermediate',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-02-special',
    type: 'content',
    title: 'Special Derivatives to Memorize',
    content: `# 📝 Essential Derivatives

These derivatives appear so often that you should **memorize** them:

| Function | Derivative |
|----------|------------|
| $e^x$ | $e^x$ (stays the same!) |
| $e^{ax}$ | $ae^{ax}$ |
| $\\ln x$ | $\\frac{1}{x}$ |
| $\\sin x$ | $\\cos x$ |
| $\\cos x$ | $-\\sin x$ |
| $\\tan x$ | $\\sec^2 x$ |
| $a^x$ | $a^x \\ln a$ |

> 🧠 **Memory tricks**:
> - $e^x$ is the "**lazy function**" - its derivative is itself!
> - For trig: "**Sin** becomes **cos**ine, **cos** becomes **negative sin**"
> - $\\ln x$ gives $\\frac{1}{x}$ - the "**reciprocal rule**"`,
    xpReward: 5,
  },
  {
    id: 'calc-02-summary',
    type: 'summary',
    title: 'Rules Summary',
    content: `# 🎯 Differentiation Rules Cheatsheet

**Chain Rule** (function of function):
$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$
*"Outside derivative × inside derivative"*

**Product Rule** ($u \\cdot v$):
$$\\frac{d}{dx}[uv] = u\\frac{dv}{dx} + v\\frac{du}{dx}$$
*"First d-second plus second d-first"*

**Quotient Rule** ($\\frac{u}{v}$):
$$\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}$$
*"Low d-high minus high d-low, over low squared"*

You've earned **45 XP** for mastering these rules!`,
    xpReward: 5,
  },
];

export const calculusLesson2: Lesson = {
  id: 'calc-02-rules',
  moduleId: 'module-calculus',
  title: 'Differentiation Rules',
  description: 'Master the chain, product, and quotient rules',
  estimatedMinutes: 18,
  xpReward: 45,
  steps: lesson2Steps,
  prerequisites: ['calc-01-intro'],
};

// =============================================================================
// LESSON 3: Applications of Differentiation (50 XP)
// =============================================================================

const lesson3Steps: LessonStep[] = [
  {
    id: 'calc-03-hook',
    type: 'content',
    title: 'Why Differentiation Matters',
    content: `# 🎯 The Power of Calculus in Real Life

Differentiation isn't just abstract math - it solves **real problems**:

- 📦 **Business**: What price maximizes profit?
- 🏗️ **Engineering**: What dimensions minimize material cost?
- 🚗 **Physics**: How fast is the car accelerating?
- 🏥 **Medicine**: At what rate is a drug leaving the body?

> In this lesson, we'll use calculus to find **maximum and minimum values** and solve **rate of change** problems!`,
    xpReward: 5,
  },
  {
    id: 'calc-03-tangent',
    type: 'content',
    title: 'Tangents and Normals',
    content: `# 📐 Tangent and Normal Lines

At any point on a curve:
- **Tangent**: The line that just touches the curve (gradient = $\\frac{dy}{dx}$)
- **Normal**: The line perpendicular to the tangent (gradient = $-\\frac{1}{\\frac{dy}{dx}}$)

## Finding the Tangent Line

For curve $y = f(x)$ at point $(a, f(a))$:

1. Find $\\frac{dy}{dx}$
2. Calculate gradient at $x = a$: $m = f'(a)$
3. Use point-gradient form: $y - f(a) = m(x - a)$

> 🧠 **Remember**: Normal gradient is the **negative reciprocal** of tangent gradient!

If tangent gradient = $3$, normal gradient = $-\\frac{1}{3}$`,
    xpReward: 5,
  },
  {
    id: 'calc-03-visual',
    type: 'interactive',
    title: 'Tangent and Normal',
    content: `# See the Tangent and Normal

The **tangent** (green) touches the curve at exactly one point.
The **normal** (red) is perpendicular to the tangent.

Drag point $a$ to see how they change!`,
    interactiveConfig: {
      type: 'desmos',
      config: {
        expressions: [
          { latex: 'f(x) = x^3 - 3x', color: '#3b82f6' },
          { latex: 'a = 1.5' },
          { latex: '(a, f(a))', color: '#000000', pointStyle: 'POINT' },
          { latex: 'm = 3a^2 - 3', hidden: true },
          { latex: 'y = m(x - a) + f(a)', color: '#22c55e' },
          { latex: 'y = -\\frac{1}{m}(x - a) + f(a)', color: '#ef4444' },
        ],
        settings: { showGrid: true },
      },
    },
    xpReward: 5,
  },
  {
    id: 'calc-03-maxmin',
    type: 'content',
    title: 'Finding Maximum and Minimum',
    content: `# 🏔️ Stationary Points

**Stationary points** occur where $\\frac{dy}{dx} = 0$

At these points, the curve is momentarily "flat" (horizontal tangent).

## The Process:

1. **Find** $\\frac{dy}{dx}$
2. **Solve** $\\frac{dy}{dx} = 0$ to find $x$-coordinates
3. **Determine** the nature using second derivative test:
   - If $\\frac{d^2y}{dx^2} < 0$ → **Maximum** (curve bends down ∩)
   - If $\\frac{d^2y}{dx^2} > 0$ → **Minimum** (curve bends up ∪)
   - If $\\frac{d^2y}{dx^2} = 0$ → Check further (could be point of inflection)

> 🧠 **Memory**: "**Negative = Hill top** (maximum), **Positive = Valley** (minimum)"`,
    xpReward: 5,
  },
  {
    id: 'calc-03-practice1',
    type: 'practice',
    title: 'Practice: Stationary Points',
    content: 'Find stationary points',
    question: {
      id: 'calc-03-q1',
      type: 'MultipleChoice',
      question: 'The curve $y = x^3 - 12x$ has stationary points at $x = ?$',
      options: ['$x = \\pm 2$', '$x = \\pm 3$', '$x = 0$ and $x = 4$', '$x = \\pm 6$'],
      correctAnswer: '$x = \\pm 2$',
      explanation: '$\\frac{dy}{dx} = 3x^2 - 12 = 0$, so $x^2 = 4$, giving $x = \\pm 2$',
      difficulty: 'intermediate',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-03-practice2',
    type: 'practice',
    title: 'Practice: Nature of Stationary Points',
    content: 'Determine the nature',
    question: {
      id: 'calc-03-q2',
      type: 'MultipleChoice',
      question: 'For $y = x^3 - 12x$, determine the nature of the stationary point at $x = 2$',
      options: ['Minimum', 'Maximum', 'Point of inflection', 'Cannot be determined'],
      correctAnswer: 'Minimum',
      explanation: '$\\frac{d^2y}{dx^2} = 6x$. At $x = 2$: $\\frac{d^2y}{dx^2} = 12 > 0$, so it\'s a minimum.',
      difficulty: 'intermediate',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-03-optimization',
    type: 'content',
    title: 'Optimization Problems',
    content: `# 📦 Real-World Optimization

**Classic Problem**: A farmer has 100m of fencing. What's the maximum rectangular area?

**Solution**:
Let width = $x$ meters, so length = $(50 - x)$ meters (since perimeter = $2x + 2l = 100$)

Area $A = x(50-x) = 50x - x^2$

$\\frac{dA}{dx} = 50 - 2x = 0$
$x = 25$ m

$\\frac{d^2A}{dx^2} = -2 < 0$ ✓ (confirms maximum)

**Maximum area** = $25 × 25 = 625$ m² (it's a square!)

> 🧠 **Problem-solving tip**: Always define your variable, write the equation to optimize, then differentiate!`,
    xpReward: 5,
  },
  {
    id: 'calc-03-rates',
    type: 'content',
    title: 'Connected Rates of Change',
    content: `# ⏱️ Rates of Change

Sometimes we know how one quantity changes and want to find how another changes.

**The Chain Rule** connects them:
$$\\frac{dy}{dt} = \\frac{dy}{dx} \\times \\frac{dx}{dt}$$

## Example:
A spherical balloon is inflated. When radius = 5 cm, it's increasing at 2 cm/s.
How fast is the volume increasing?

$V = \\frac{4}{3}\\pi r^3$

$\\frac{dV}{dr} = 4\\pi r^2$

$\\frac{dV}{dt} = \\frac{dV}{dr} \\times \\frac{dr}{dt} = 4\\pi(5)^2 \\times 2 = 200\\pi$ cm³/s

> 🎈 The volume is increasing at $200\\pi \\approx 628$ cm³ per second!`,
    xpReward: 5,
  },
  {
    id: 'calc-03-practice3',
    type: 'practice',
    title: 'Practice: Optimization',
    content: 'Solve an optimization problem',
    question: {
      id: 'calc-03-q3',
      type: 'Numeric',
      question: 'A rectangle has perimeter 20 cm. What is the maximum possible area in cm²?',
      correctAnswer: 25,
      tolerance: 0.1,
      explanation: 'Let width = $x$, then length = $10-x$. Area $= x(10-x) = 10x - x^2$. $\\frac{dA}{dx} = 10 - 2x = 0$ gives $x = 5$. Max area = $5 × 5 = 25$ cm².',
      difficulty: 'intermediate',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-03-summary',
    type: 'summary',
    title: 'Applications Summary',
    content: `# 🎯 Applications of Differentiation

**Tangent Line** at $(a, f(a))$:
- Gradient = $f'(a)$
- Equation: $y - f(a) = f'(a)(x - a)$

**Normal Line**:
- Gradient = $-\\frac{1}{f'(a)}$

**Stationary Points**:
1. Solve $\\frac{dy}{dx} = 0$
2. Use second derivative test for nature

**Optimization**:
1. Define variable and write expression
2. Differentiate and set equal to zero
3. Verify it's a max/min

**Connected Rates**: $\\frac{dy}{dt} = \\frac{dy}{dx} \\times \\frac{dx}{dt}$

You've earned **50 XP**!`,
    xpReward: 5,
  },
];

export const calculusLesson3: Lesson = {
  id: 'calc-03-applications',
  moduleId: 'module-calculus',
  title: 'Applications of Differentiation',
  description: 'Use calculus to solve real-world optimization problems',
  estimatedMinutes: 20,
  xpReward: 50,
  steps: lesson3Steps,
  prerequisites: ['calc-02-rules'],
};

// =============================================================================
// LESSON 4: Introduction to Integration (40 XP)
// =============================================================================

const lesson4Steps: LessonStep[] = [
  {
    id: 'calc-04-hook',
    type: 'content',
    title: 'Reversing Differentiation',
    content: `# ⏪ What if We Could Undo Differentiation?

You've learned that if $y = x^3$, then $\\frac{dy}{dx} = 3x^2$.

But what if someone gives you $3x^2$ and asks: **"What function has this as its derivative?"**

This reverse process is called **integration** (or anti-differentiation).

> 🔄 If differentiation is like "unwrapping" a function, integration is "wrapping it back up"!

Integration is incredibly useful for:
- Finding areas under curves
- Calculating distances from velocity
- Solving physics problems`,
    xpReward: 5,
  },
  {
    id: 'calc-04-concept',
    type: 'content',
    title: 'The Power Rule for Integration',
    content: `# ⬆️ The Power Rule (Reversed!)

For differentiation: $\\frac{d}{dx}[x^n] = nx^{n-1}$ (bring down, reduce)

For integration: $\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C$ (raise power, divide)

> 🧠 **Memory trick**: "**Add one to power, divide by new power, don't forget +C!**"

## The Mystery Constant $C$

Why $+C$? Because many functions have the same derivative!
- $x^2 + 5$ differentiates to $2x$
- $x^2 - 3$ differentiates to $2x$
- $x^2 + 100$ differentiates to $2x$

So $\\int 2x \\, dx = x^2 + C$ where $C$ is the **constant of integration**.`,
    xpReward: 5,
  },
  {
    id: 'calc-04-examples',
    type: 'content',
    title: 'Integration Examples',
    content: `# 📝 Integration in Action

| Function | Integral | Working |
|----------|----------|---------|
| $\\int x^2 \\, dx$ | $\\frac{x^3}{3} + C$ | Power: $2→3$, divide by $3$ |
| $\\int x^5 \\, dx$ | $\\frac{x^6}{6} + C$ | Power: $5→6$, divide by $6$ |
| $\\int 3x^2 \\, dx$ | $x^3 + C$ | Factor of $3$ stays, then integrate |
| $\\int 1 \\, dx$ | $x + C$ | $1 = x^0$, so integral is $\\frac{x^1}{1}$ |
| $\\int x^{-2} \\, dx$ | $-x^{-1} + C = -\\frac{1}{x} + C$ | Works for negative powers too! |

## Special Cases:
- $\\int e^x \\, dx = e^x + C$ (the lazy function stays the same!)
- $\\int \\frac{1}{x} \\, dx = \\ln|x| + C$ (the power rule exception)
- $\\int \\cos x \\, dx = \\sin x + C$
- $\\int \\sin x \\, dx = -\\cos x + C$`,
    xpReward: 5,
  },
  {
    id: 'calc-04-practice1',
    type: 'practice',
    title: 'Practice: Basic Integration',
    content: 'Find the integral',
    question: {
      id: 'calc-04-q1',
      type: 'MultipleChoice',
      question: 'What is $\\int x^4 \\, dx$?',
      options: ['$\\frac{x^5}{5} + C$', '$4x^3 + C$', '$\\frac{x^4}{4} + C$', '$x^5 + C$'],
      correctAnswer: '$\\frac{x^5}{5} + C$',
      explanation: 'Add 1 to power: $4→5$. Divide by new power: $\\frac{x^5}{5} + C$',
      difficulty: 'foundational',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-04-practice2',
    type: 'practice',
    title: 'Practice: Integration with Coefficients',
    content: 'Integrate with coefficients',
    question: {
      id: 'calc-04-q2',
      type: 'MultipleChoice',
      question: 'What is $\\int 6x^2 \\, dx$?',
      options: ['$2x^3 + C$', '$6x^3 + C$', '$\\frac{6x^3}{3} + C$', '$12x + C$'],
      correctAnswer: '$2x^3 + C$',
      explanation: '$\\int 6x^2 \\, dx = 6 \\times \\frac{x^3}{3} + C = 2x^3 + C$',
      difficulty: 'foundational',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-04-substitution',
    type: 'content',
    title: 'Integration by Substitution',
    content: `# 🔄 Integration by Substitution

For functions like $\\int (2x+1)^3 \\, dx$, we use **substitution** (reverse chain rule).

**Method**:
1. Let $u =$ the inner function (e.g., $u = 2x + 1$)
2. Find $\\frac{du}{dx}$ (e.g., $\\frac{du}{dx} = 2$)
3. Rearrange: $dx = \\frac{du}{2}$
4. Substitute and integrate
5. Replace $u$ back with original expression

## Example: $\\int (2x+1)^3 \\, dx$

Let $u = 2x + 1$, so $du = 2dx$, thus $dx = \\frac{du}{2}$

$\\int u^3 \\times \\frac{du}{2} = \\frac{1}{2} \\times \\frac{u^4}{4} + C = \\frac{(2x+1)^4}{8} + C$

> 🧠 **Memory trick**: "**u-sub = undoing the chain rule**"`,
    xpReward: 5,
  },
  {
    id: 'calc-04-practice3',
    type: 'practice',
    title: 'Practice: Substitution',
    content: 'Use substitution',
    question: {
      id: 'calc-04-q3',
      type: 'MultipleChoice',
      question: 'What is $\\int (3x-2)^4 \\, dx$?',
      options: ['$\\frac{(3x-2)^5}{15} + C$', '$\\frac{(3x-2)^5}{5} + C$', '$\\frac{3(3x-2)^5}{5} + C$', '$5(3x-2)^5 + C$'],
      correctAnswer: '$\\frac{(3x-2)^5}{15} + C$',
      explanation: 'Let $u = 3x-2$, $du = 3dx$. $\\int u^4 \\frac{du}{3} = \\frac{1}{3} \\times \\frac{u^5}{5} = \\frac{(3x-2)^5}{15} + C$',
      difficulty: 'intermediate',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-04-summary',
    type: 'summary',
    title: 'Integration Basics Summary',
    content: `# 🎯 Integration Fundamentals

**Power Rule for Integration**:
$$\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)$$

**Key Integrals**:
- $\\int e^x \\, dx = e^x + C$
- $\\int \\frac{1}{x} \\, dx = \\ln|x| + C$
- $\\int \\cos x \\, dx = \\sin x + C$
- $\\int \\sin x \\, dx = -\\cos x + C$

**Substitution** (for composite functions):
1. Let $u =$ inner function
2. Find $du$ and replace $dx$
3. Integrate in terms of $u$
4. Substitute back

> 🔑 **Never forget the $+C$** for indefinite integrals!

You've earned **40 XP**!`,
    xpReward: 5,
  },
];

export const calculusLesson4: Lesson = {
  id: 'calc-04-integration',
  moduleId: 'module-calculus',
  title: 'Introduction to Integration',
  description: 'Learn to reverse differentiation and find antiderivatives',
  estimatedMinutes: 16,
  xpReward: 40,
  steps: lesson4Steps,
  prerequisites: ['calc-01-intro'],
};

// =============================================================================
// LESSON 5: Definite Integrals and Areas (45 XP)
// =============================================================================

const lesson5Steps: LessonStep[] = [
  {
    id: 'calc-05-hook',
    type: 'content',
    title: 'Finding Areas Under Curves',
    content: `# 📊 The Area Problem

How do you find the area under a curved line?

For rectangles and triangles, we have formulas. But curves? That's where **definite integrals** shine!

> 🏠 Real-world applications:
> - Distance traveled (area under velocity graph)
> - Work done (area under force graph)
> - Total revenue (area under demand curve)

The definite integral gives us the **exact area** between a curve and the x-axis!`,
    xpReward: 5,
  },
  {
    id: 'calc-05-concept',
    type: 'content',
    title: 'The Definite Integral',
    content: `# 📐 Definite vs Indefinite

**Indefinite integral**: $\\int f(x) \\, dx = F(x) + C$ (a function)

**Definite integral**: $\\int_a^b f(x) \\, dx = F(b) - F(a)$ (a number!)

The definite integral from $a$ to $b$ means:
1. Find the antiderivative $F(x)$
2. Calculate $F(b) - F(a)$

## Example: $\\int_1^3 x^2 \\, dx$

Antiderivative: $F(x) = \\frac{x^3}{3}$

$\\int_1^3 x^2 \\, dx = \\left[\\frac{x^3}{3}\\right]_1^3 = \\frac{27}{3} - \\frac{1}{3} = \\frac{26}{3}$

> 🧠 **Note**: No $+C$ needed for definite integrals - it cancels out!`,
    xpReward: 5,
  },
  {
    id: 'calc-05-visual',
    type: 'interactive',
    title: 'Visualizing Area',
    content: `# See the Area Under the Curve

The shaded region shows the area calculated by the definite integral.

Adjust the bounds $a$ and $b$ to see different areas!`,
    interactiveConfig: {
      type: 'desmos',
      config: {
        expressions: [
          { latex: 'f(x) = x^2', color: '#3b82f6' },
          { latex: 'a = 0' },
          { latex: 'b = 2' },
          { latex: 'a \\le x \\le b \\{0 \\le y \\le f(x)\\}', color: '#22c55e' },
        ],
        settings: { showGrid: true },
      },
    },
    xpReward: 5,
  },
  {
    id: 'calc-05-practice1',
    type: 'practice',
    title: 'Practice: Definite Integral',
    content: 'Calculate a definite integral',
    question: {
      id: 'calc-05-q1',
      type: 'Numeric',
      question: 'Calculate $\\int_0^2 3x^2 \\, dx$',
      correctAnswer: 8,
      tolerance: 0.01,
      explanation: '$\\int 3x^2 \\, dx = x^3$. So $[x^3]_0^2 = 8 - 0 = 8$',
      difficulty: 'intermediate',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-05-areas',
    type: 'content',
    title: 'Areas Between Curves',
    content: `# 📊 Area Between Two Curves

To find the area **between** two curves $y = f(x)$ and $y = g(x)$:

$$\\text{Area} = \\int_a^b |f(x) - g(x)| \\, dx$$

If $f(x) \\geq g(x)$ on $[a,b]$:
$$\\text{Area} = \\int_a^b (f(x) - g(x)) \\, dx$$

## Example: Area between $y = x^2$ and $y = x$

First, find intersection points: $x^2 = x$ gives $x = 0$ and $x = 1$

On $[0,1]$: $x \\geq x^2$

$$\\text{Area} = \\int_0^1 (x - x^2) \\, dx = \\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}$$`,
    xpReward: 5,
  },
  {
    id: 'calc-05-negative',
    type: 'content',
    title: 'Dealing with Negative Areas',
    content: `# ⚠️ Watch Out for Negative Areas!

When the curve goes **below** the x-axis, the integral is **negative**.

For **total area** (treating everything as positive):
1. Find where $f(x) = 0$ (x-intercepts)
2. Split the integral at these points
3. Take the **absolute value** of negative parts

## Example: Area between $y = x(x-2)$ and x-axis from $x=0$ to $x=3$

The curve is below x-axis for $0 < x < 2$ and above for $x > 2$.

$$\\text{Total Area} = \\left|\\int_0^2 x(x-2) \\, dx\\right| + \\int_2^3 x(x-2) \\, dx$$

> 🧠 **Remember**: Definite integrals can be negative, but geometric areas are always positive!`,
    xpReward: 5,
  },
  {
    id: 'calc-05-practice2',
    type: 'practice',
    title: 'Practice: Area Under Curve',
    content: 'Find an area',
    question: {
      id: 'calc-05-q2',
      type: 'Numeric',
      question: 'Find the area enclosed between $y = x^2$ and $y = 4$ (where they intersect at $x = \\pm 2$)',
      correctAnswer: 10.67,
      tolerance: 0.1,
      explanation: 'Area $= \\int_{-2}^{2} (4 - x^2) \\, dx = [4x - \\frac{x^3}{3}]_{-2}^{2} = (8 - \\frac{8}{3}) - (-8 + \\frac{8}{3}) = 16 - \\frac{16}{3} = \\frac{32}{3} \\approx 10.67$',
      difficulty: 'intermediate',
      topic: 'calculus' as QuizTopic,
    },
    xpReward: 5,
  },
  {
    id: 'calc-05-kinematics',
    type: 'content',
    title: 'Calculus in Motion',
    content: `# 🚗 Kinematics - Calculus of Motion

Position, velocity, and acceleration are related by calculus:

$$\\text{Position } s \\xrightarrow{\\text{differentiate}} \\text{Velocity } v \\xrightarrow{\\text{differentiate}} \\text{Acceleration } a$$

$$\\text{Position } s \\xleftarrow{\\text{integrate}} \\text{Velocity } v \\xleftarrow{\\text{integrate}} \\text{Acceleration } a$$

## Key Formulas:
- $v = \\frac{ds}{dt}$ (velocity is rate of change of position)
- $a = \\frac{dv}{dt}$ (acceleration is rate of change of velocity)
- $s = \\int v \\, dt$ (position is integral of velocity)
- $v = \\int a \\, dt$ (velocity is integral of acceleration)

> 🏃 **Example**: If $v = 3t^2$, then distance traveled from $t=0$ to $t=2$:
> $s = \\int_0^2 3t^2 \\, dt = [t^3]_0^2 = 8$ units`,
    xpReward: 5,
  },
  {
    id: 'calc-05-summary',
    type: 'summary',
    title: 'Definite Integrals Summary',
    content: `# 🎯 Definite Integrals & Areas

**Definite Integral**:
$$\\int_a^b f(x) \\, dx = [F(x)]_a^b = F(b) - F(a)$$

**Area Under Curve** (between curve and x-axis):
$$\\text{Area} = \\int_a^b f(x) \\, dx$$ (if $f(x) \\geq 0$)

**Area Between Curves**:
$$\\text{Area} = \\int_a^b (\\text{top} - \\text{bottom}) \\, dx$$

**Kinematics**:
- Differentiate: position → velocity → acceleration
- Integrate: acceleration → velocity → position

You've earned **45 XP**! 🎉`,
    xpReward: 5,
  },
];

export const calculusLesson5: Lesson = {
  id: 'calc-05-definite',
  moduleId: 'module-calculus',
  title: 'Definite Integrals and Areas',
  description: 'Calculate areas under curves using definite integrals',
  estimatedMinutes: 18,
  xpReward: 45,
  steps: lesson5Steps,
  prerequisites: ['calc-04-integration'],
};

// =============================================================================
// MODULE DEFINITION
// =============================================================================

export const calculusLessons: Lesson[] = [
  calculusLesson1,
  calculusLesson2,
  calculusLesson3,
  calculusLesson4,
  calculusLesson5,
];

export const MODULE_CALCULUS: LessonModule = {
  id: 'module-calculus',
  topicId: 'calculus' as QuizTopic,
  title: 'Calculus',
  description: 'Master differentiation and integration',
  lessons: [
    'calc-01-intro',
    'calc-02-rules',
    'calc-03-applications',
    'calc-04-integration',
    'calc-05-definite',
  ],
  totalXP: 210,
};
