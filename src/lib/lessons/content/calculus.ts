// Calculus Lessons (C1)
// Covers differentiation and integration with real-world applications

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: Introduction to Differentiation
export const LESSON_CALC_01: Lesson = {
  id: 'calculus-01-intro',
  topicId: 'calculus' as QuizTopic,
  title: 'The Mathematics of Change',
  subtitle: 'Discover how calculus describes motion and change',
  description: 'Learn what differentiation means and why it matters',
  difficulty: 'foundation',
  estimatedTime: 8,
  objectives: [
    'Understand what a derivative represents',
    'Apply the power rule for differentiation',
    'Connect gradients to rates of change',
  ],
  steps: [
    {
      id: 'calc01-hook',
      type: 'hook',
      title: 'How Fast Are You Going Right Now?',
      content: [
        {
          type: 'text',
          content: 'Imagine you\'re on a roller coaster. At any moment, you might be speeding up going down a hill, slowing down climbing up, or at the peak, momentarily still. Differentiation is the math that tells us how fast things change at any instant.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Real-world connection',
          content: 'A car\'s speedometer shows the derivative of position - your instantaneous speed! This is one of the most powerful tools in all of mathematics.',
        },
      ],
    },
    {
      id: 'calc01-concept1',
      type: 'concept',
      title: 'From Average to Instantaneous',
      content: [
        {
          type: 'text',
          content: 'Average rate of change tells us how much something changes over a period. But what about instantaneous rate of change - how fast RIGHT NOW?',
        },
        {
          type: 'latex',
          content: '\\text{Average speed} = \\frac{\\text{distance traveled}}{\\text{time taken}}',
          display: true,
        },
        {
          type: 'text',
          content: 'The brilliant idea: take the average over a smaller and smaller interval until it becomes an instant!',
        },
        {
          type: 'latex',
          content: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory trick',
          content: 'Think of "h" getting tiny like a "hair\'s width"!',
        },
      ],
    },
    {
      id: 'calc01-concept2',
      type: 'concept',
      title: 'The Power Rule - Your Best Friend',
      content: [
        {
          type: 'text',
          content: 'For y = x^n, the derivative follows a simple pattern:',
        },
        {
          type: 'latex',
          content: '\\frac{dy}{dx} = nx^{n-1}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Easy way to remember',
          content: '"Bring down the power, then knock it down by one." For y = x^3, bring down the 3, then reduce the power: 3x^2',
        },
        {
          type: 'text',
          content: 'This works for any power - positive, negative, or fractional!',
        },
      ],
    },
    {
      id: 'calc01-visual',
      type: 'visual',
      title: 'See the Derivative',
      content: [
        {
          type: 'text',
          content: 'The derivative at a point equals the gradient of the tangent line at that point. Move the slider to see how the tangent changes along the curve.',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            expressions: [
              { latex: 'f(x) = x^2', color: '#3b82f6' },
              { latex: 'a = 1' },
              { latex: '(a, f(a))', color: '#ef4444' },
              { latex: 'y = 2a(x - a) + a^2', color: '#22c55e' },
            ],
            bounds: { left: -5, right: 5, bottom: -2, top: 10 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'calc01-quiz1',
      type: 'quiz',
      title: 'Quick Check',
      content: [],
      question: {
        id: 'calc01-q1',
        type: 'multiple-choice',
        prompt: 'What is the derivative of y = x^4?',
        options: [
          { id: 'a', text: '4x^3' },
          { id: 'b', text: '4x^4' },
          { id: 'c', text: 'x^3' },
          { id: 'd', text: '4x^5' },
        ],
        correctAnswer: 'a',
        hint: 'Bring down the 4, reduce the power by 1',
        explanation: 'Using the power rule: bring down 4, reduce power by 1, giving 4x^3',
        points: 10,
      },
    },
    {
      id: 'calc01-quiz2',
      type: 'quiz',
      title: 'Practice',
      content: [],
      question: {
        id: 'calc01-q2',
        type: 'numeric',
        prompt: 'If y = x^5, what is dy/dx when x = 2?',
        correctAnswer: 80,
        tolerance: 0.1,
        hint: 'First find dy/dx, then substitute x = 2',
        explanation: 'dy/dx = 5x^4. When x = 2: 5(2)^4 = 5(16) = 80',
        points: 15,
      },
    },
    {
      id: 'calc01-summary',
      type: 'summary',
      title: 'Key Takeaways',
      content: [
        {
          type: 'text',
          content: 'You\'ve learned the fundamentals of differentiation!',
        },
        {
          type: 'steps',
          steps: [
            { title: 'Derivative', content: 'Measures instantaneous rate of change' },
            { title: 'Power Rule', content: 'For x^n, derivative is nx^(n-1)' },
            { title: 'Gradient', content: 'Derivative equals slope of tangent line' },
          ],
        },
      ],
    },
  ],
  xpReward: 30,
};

// Lesson 2: Differentiation Rules
export const LESSON_CALC_02: Lesson = {
  id: 'calculus-02-rules',
  topicId: 'calculus' as QuizTopic,
  title: 'Differentiation Rules',
  subtitle: 'Master the chain, product, and quotient rules',
  description: 'Learn to differentiate complex functions',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['calculus-01-intro'],
  objectives: [
    'Apply the chain rule for composite functions',
    'Apply the product rule',
    'Apply the quotient rule',
  ],
  steps: [
    {
      id: 'calc02-hook',
      type: 'hook',
      title: 'Beyond Simple Powers',
      content: [
        {
          type: 'text',
          content: 'Real-world functions aren\'t just simple powers. Consider (2x + 1)^5 - a function inside a function! Or x^2 * sin(x) - two functions multiplied together!',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Three powerful rules',
          content: 'Chain Rule for functions inside functions, Product Rule for functions multiplied, Quotient Rule for functions divided.',
        },
      ],
    },
    {
      id: 'calc02-concept1',
      type: 'concept',
      title: 'The Chain Rule',
      content: [
        {
          type: 'text',
          content: 'For y = f(g(x)) - a function inside a function:',
        },
        {
          type: 'latex',
          content: "\\frac{dy}{dx} = f'(g(x)) \\cdot g'(x)",
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory trick',
          content: '"Differentiate outside, keep inside, times derivative of inside" - like peeling an onion layer by layer!',
        },
        {
          type: 'text',
          content: 'Example: For y = (3x + 1)^4, outside is ( )^4, inside is 3x + 1. Result: 4(3x+1)^3 * 3 = 12(3x+1)^3',
        },
      ],
    },
    {
      id: 'calc02-concept2',
      type: 'concept',
      title: 'The Product Rule',
      content: [
        {
          type: 'text',
          content: 'For y = u * v where both are functions of x:',
        },
        {
          type: 'latex',
          content: "\\frac{dy}{dx} = u\\frac{dv}{dx} + v\\frac{du}{dx}",
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory trick',
          content: '"First times derivative of second, plus second times derivative of first" or simply "u dv + v du"',
        },
      ],
    },
    {
      id: 'calc02-concept3',
      type: 'concept',
      title: 'The Quotient Rule',
      content: [
        {
          type: 'text',
          content: 'For y = u/v:',
        },
        {
          type: 'latex',
          content: "\\frac{dy}{dx} = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}",
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory trick',
          content: '"Low d-high minus high d-low, all over low squared" - bottom times derivative of top, minus top times derivative of bottom, over bottom squared.',
        },
      ],
    },
    {
      id: 'calc02-quiz1',
      type: 'quiz',
      title: 'Chain Rule Practice',
      content: [],
      question: {
        id: 'calc02-q1',
        type: 'multiple-choice',
        prompt: 'Differentiate y = (2x - 5)^3',
        options: [
          { id: 'a', text: '6(2x-5)^2' },
          { id: 'b', text: '3(2x-5)^2' },
          { id: 'c', text: '6(2x-5)^3' },
          { id: 'd', text: '2(2x-5)^2' },
        ],
        correctAnswer: 'a',
        hint: 'Use chain rule: differentiate outside, times derivative of inside',
        explanation: 'Chain rule: 3(2x-5)^2 * 2 = 6(2x-5)^2. Differentiate ( )^3 to get 3( )^2, then multiply by derivative of inside (2).',
        points: 15,
      },
    },
    {
      id: 'calc02-quiz2',
      type: 'quiz',
      title: 'Product Rule Practice',
      content: [],
      question: {
        id: 'calc02-q2',
        type: 'multiple-choice',
        prompt: 'If y = x^3(x+2), what is dy/dx?',
        options: [
          { id: 'a', text: '4x^3 + 6x^2' },
          { id: 'b', text: '3x^2 + 6x' },
          { id: 'c', text: 'x^4 + 2x^3' },
          { id: 'd', text: '3x^2(x+2)' },
        ],
        correctAnswer: 'a',
        hint: 'Use product rule: u*dv + v*du',
        explanation: 'Product rule: x^3*1 + (x+2)*3x^2 = x^3 + 3x^3 + 6x^2 = 4x^3 + 6x^2',
        points: 15,
      },
    },
    {
      id: 'calc02-summary',
      type: 'summary',
      title: 'Rules Summary',
      content: [
        {
          type: 'steps',
          steps: [
            { title: 'Chain Rule', content: 'f(g(x)): differentiate outside * derivative of inside' },
            { title: 'Product Rule', content: 'uv: u*dv + v*du' },
            { title: 'Quotient Rule', content: 'u/v: (v*du - u*dv)/v^2' },
          ],
        },
      ],
    },
  ],
  xpReward: 45,
};

// Lesson 3: Applications of Differentiation
export const LESSON_CALC_03: Lesson = {
  id: 'calculus-03-applications',
  topicId: 'calculus' as QuizTopic,
  title: 'Applications of Differentiation',
  subtitle: 'Use calculus to solve real-world problems',
  description: 'Find tangents, stationary points, and optimize functions',
  difficulty: 'intermediate',
  estimatedTime: 12,
  prerequisites: ['calculus-02-rules'],
  objectives: [
    'Find equations of tangent lines',
    'Locate and classify stationary points',
    'Solve optimization problems',
  ],
  steps: [
    {
      id: 'calc03-hook',
      type: 'hook',
      title: 'Why Differentiation Matters',
      content: [
        {
          type: 'text',
          content: 'Businesses use calculus to maximize profit. Engineers use it to minimize material costs. Doctors use it to model drug absorption rates. The applications are endless!',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'In this lesson',
          content: 'We\'ll use differentiation to find maximum and minimum values, and solve real optimization problems.',
        },
      ],
    },
    {
      id: 'calc03-concept1',
      type: 'concept',
      title: 'Finding Tangent Lines',
      content: [
        {
          type: 'text',
          content: 'At any point on a curve, the tangent is a line that just touches the curve. Its gradient equals the derivative at that point.',
        },
        {
          type: 'latex',
          content: '\\text{Tangent at } (a, f(a)): y - f(a) = f\'(a)(x - a)',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Normal line',
          content: 'The normal is perpendicular to the tangent. Its gradient is -1/f\'(a) (negative reciprocal).',
        },
      ],
    },
    {
      id: 'calc03-concept2',
      type: 'concept',
      title: 'Stationary Points',
      content: [
        {
          type: 'text',
          content: 'Stationary points occur where dy/dx = 0 (the curve is momentarily flat). To find them:',
        },
        {
          type: 'steps',
          steps: [
            { title: 'Step 1', content: 'Find dy/dx' },
            { title: 'Step 2', content: 'Solve dy/dx = 0 to find x values' },
            { title: 'Step 3', content: 'Use second derivative to classify' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Second derivative test',
          content: 'If d^2y/dx^2 < 0: Maximum (hill). If d^2y/dx^2 > 0: Minimum (valley). If = 0: check further.',
        },
      ],
    },
    {
      id: 'calc03-visual',
      type: 'visual',
      title: 'Visualizing Stationary Points',
      content: [
        {
          type: 'text',
          content: 'See how the tangent becomes horizontal at stationary points.',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            expressions: [
              { latex: 'f(x) = x^3 - 3x', color: '#3b82f6' },
              { latex: 'a = 0' },
              { latex: '(a, f(a))', color: '#ef4444' },
              { latex: 'm = 3a^2 - 3' },
              { latex: 'y = m(x - a) + f(a)', color: '#22c55e' },
            ],
            bounds: { left: -4, right: 4, bottom: -5, top: 5 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'calc03-quiz1',
      type: 'quiz',
      title: 'Finding Stationary Points',
      content: [],
      question: {
        id: 'calc03-q1',
        type: 'multiple-choice',
        prompt: 'The curve y = x^3 - 12x has stationary points at x = ?',
        options: [
          { id: 'a', text: 'x = +/-2' },
          { id: 'b', text: 'x = +/-3' },
          { id: 'c', text: 'x = 0 and x = 4' },
          { id: 'd', text: 'x = +/-6' },
        ],
        correctAnswer: 'a',
        hint: 'Set dy/dx = 0 and solve',
        explanation: 'dy/dx = 3x^2 - 12 = 0, so x^2 = 4, giving x = +/-2',
        points: 15,
      },
    },
    {
      id: 'calc03-example',
      type: 'example',
      title: 'Optimization Problem',
      content: [
        {
          type: 'text',
          content: 'A farmer has 100m of fencing. What\'s the maximum rectangular area?',
        },
        {
          type: 'steps',
          steps: [
            { title: 'Define variable', content: 'Let width = x, so length = (50-x) since perimeter = 2x + 2l = 100' },
            { title: 'Write expression', content: 'Area A = x(50-x) = 50x - x^2' },
            { title: 'Differentiate', content: 'dA/dx = 50 - 2x' },
            { title: 'Solve dA/dx = 0', content: '50 - 2x = 0, so x = 25' },
            { title: 'Answer', content: 'Maximum area = 25 * 25 = 625 m^2 (a square!)' },
          ],
        },
      ],
    },
    {
      id: 'calc03-quiz2',
      type: 'quiz',
      title: 'Optimization Practice',
      content: [],
      question: {
        id: 'calc03-q2',
        type: 'numeric',
        prompt: 'A rectangle has perimeter 20 cm. What is the maximum possible area in cm^2?',
        correctAnswer: 25,
        tolerance: 0.1,
        hint: 'Let width = x, find length, write area formula, differentiate',
        explanation: 'If width = x, length = 10-x. Area = x(10-x) = 10x - x^2. dA/dx = 10 - 2x = 0 gives x = 5. Max area = 5 * 5 = 25 cm^2.',
        points: 20,
      },
    },
    {
      id: 'calc03-summary',
      type: 'summary',
      title: 'Applications Summary',
      content: [
        {
          type: 'steps',
          steps: [
            { title: 'Tangent line', content: 'Gradient = f\'(a), use point-gradient form' },
            { title: 'Stationary points', content: 'Solve f\'(x) = 0, classify with f\'\'(x)' },
            { title: 'Optimization', content: 'Define variable, write expression, differentiate, solve' },
          ],
        },
      ],
    },
  ],
  xpReward: 50,
};

// Lesson 4: Introduction to Integration
export const LESSON_CALC_04: Lesson = {
  id: 'calculus-04-integration',
  topicId: 'calculus' as QuizTopic,
  title: 'Introduction to Integration',
  subtitle: 'Reversing differentiation',
  description: 'Learn to find antiderivatives and indefinite integrals',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['calculus-01-intro'],
  objectives: [
    'Understand integration as reverse differentiation',
    'Apply the power rule for integration',
    'Use integration by substitution',
  ],
  steps: [
    {
      id: 'calc04-hook',
      type: 'hook',
      title: 'Reversing the Process',
      content: [
        {
          type: 'text',
          content: 'You\'ve learned that if y = x^3, then dy/dx = 3x^2. But what if someone gives you 3x^2 and asks: "What function has this as its derivative?"',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Integration',
          content: 'This reverse process is called integration (or anti-differentiation). If differentiation is "unwrapping" a function, integration is "wrapping it back up"!',
        },
      ],
    },
    {
      id: 'calc04-concept1',
      type: 'concept',
      title: 'The Power Rule for Integration',
      content: [
        {
          type: 'text',
          content: 'For differentiation: bring down power, reduce by 1. For integration: add 1 to power, divide by new power!',
        },
        {
          type: 'latex',
          content: '\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'The + C',
          content: 'The constant C is essential! Since the derivative of any constant is 0, many functions have the same derivative (e.g., x^2 + 5 and x^2 - 3 both differentiate to 2x).',
        },
      ],
    },
    {
      id: 'calc04-quiz1',
      type: 'quiz',
      title: 'Basic Integration',
      content: [],
      question: {
        id: 'calc04-q1',
        type: 'multiple-choice',
        prompt: 'What is the integral of x^4 dx?',
        options: [
          { id: 'a', text: 'x^5/5 + C' },
          { id: 'b', text: '4x^3 + C' },
          { id: 'c', text: 'x^4/4 + C' },
          { id: 'd', text: 'x^5 + C' },
        ],
        correctAnswer: 'a',
        hint: 'Add 1 to power, divide by new power',
        explanation: 'Add 1 to power (4 becomes 5), divide by new power: x^5/5 + C',
        points: 10,
      },
    },
    {
      id: 'calc04-concept2',
      type: 'concept',
      title: 'Integration by Substitution',
      content: [
        {
          type: 'text',
          content: 'For functions like (2x+1)^3, we use substitution - the reverse of the chain rule.',
        },
        {
          type: 'steps',
          steps: [
            { title: 'Step 1', content: 'Let u = inner function (e.g., u = 2x + 1)' },
            { title: 'Step 2', content: 'Find du/dx and rearrange (du = 2dx, so dx = du/2)' },
            { title: 'Step 3', content: 'Substitute and integrate in terms of u' },
            { title: 'Step 4', content: 'Replace u with the original expression' },
          ],
        },
      ],
    },
    {
      id: 'calc04-quiz2',
      type: 'quiz',
      title: 'Substitution Practice',
      content: [],
      question: {
        id: 'calc04-q2',
        type: 'multiple-choice',
        prompt: 'What is the integral of (3x-2)^4 dx?',
        options: [
          { id: 'a', text: '(3x-2)^5/15 + C' },
          { id: 'b', text: '(3x-2)^5/5 + C' },
          { id: 'c', text: '3(3x-2)^5/5 + C' },
          { id: 'd', text: '5(3x-2)^5 + C' },
        ],
        correctAnswer: 'a',
        hint: 'Use substitution: u = 3x-2, du = 3dx',
        explanation: 'Let u = 3x-2, du = 3dx. Integral of u^4 * (du/3) = u^5/(5*3) = (3x-2)^5/15 + C',
        points: 15,
      },
    },
    {
      id: 'calc04-summary',
      type: 'summary',
      title: 'Integration Basics',
      content: [
        {
          type: 'steps',
          steps: [
            { title: 'Power Rule', content: 'Integral of x^n = x^(n+1)/(n+1) + C' },
            { title: 'Always add + C', content: 'The constant of integration is essential' },
            { title: 'Substitution', content: 'Reverse chain rule for composite functions' },
          ],
        },
      ],
    },
  ],
  xpReward: 40,
};

// Lesson 5: Definite Integrals and Areas
export const LESSON_CALC_05: Lesson = {
  id: 'calculus-05-definite',
  topicId: 'calculus' as QuizTopic,
  title: 'Definite Integrals and Areas',
  subtitle: 'Calculate areas under curves',
  description: 'Use definite integrals to find exact areas',
  difficulty: 'advanced',
  estimatedTime: 12,
  prerequisites: ['calculus-04-integration'],
  objectives: [
    'Evaluate definite integrals',
    'Calculate areas under curves',
    'Handle areas below the x-axis',
  ],
  steps: [
    {
      id: 'calc05-hook',
      type: 'hook',
      title: 'Finding Areas Under Curves',
      content: [
        {
          type: 'text',
          content: 'How do you find the area under a curved line? For rectangles and triangles, we have formulas. But curves? That\'s where definite integrals shine!',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Real applications',
          content: 'Distance traveled (area under velocity graph), work done (area under force graph), total revenue (area under demand curve).',
        },
      ],
    },
    {
      id: 'calc05-concept1',
      type: 'concept',
      title: 'The Definite Integral',
      content: [
        {
          type: 'text',
          content: 'Unlike indefinite integrals (which give functions), definite integrals give numbers - actual areas!',
        },
        {
          type: 'latex',
          content: '\\int_a^b f(x) \\, dx = F(b) - F(a)',
          display: true,
        },
        {
          type: 'text',
          content: 'Find the antiderivative F(x), then calculate F(b) - F(a). No + C needed - it cancels out!',
        },
      ],
    },
    {
      id: 'calc05-visual',
      type: 'visual',
      title: 'Visualizing Area',
      content: [
        {
          type: 'text',
          content: 'The shaded region shows the area calculated by the definite integral.',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            expressions: [
              { latex: 'f(x) = x^2', color: '#3b82f6' },
              { latex: 'a = 0' },
              { latex: 'b = 2' },
              { latex: '0 \\le y \\le f(x) \\{a \\le x \\le b\\}', color: '#22c55e' },
            ],
            bounds: { left: -2, right: 4, bottom: -1, top: 6 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'calc05-quiz1',
      type: 'quiz',
      title: 'Definite Integral Practice',
      content: [],
      question: {
        id: 'calc05-q1',
        type: 'numeric',
        prompt: 'Calculate the integral of 3x^2 from x=0 to x=2',
        correctAnswer: 8,
        tolerance: 0.01,
        hint: 'Integral of 3x^2 = x^3. Then evaluate at bounds.',
        explanation: 'Integral of 3x^2 = x^3. [x^3] from 0 to 2 = 8 - 0 = 8',
        points: 15,
      },
    },
    {
      id: 'calc05-concept2',
      type: 'concept',
      title: 'Areas Below the x-axis',
      content: [
        {
          type: 'text',
          content: 'When a curve goes below the x-axis, the integral is negative. For total area, split at x-intercepts and take absolute values.',
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Important distinction',
          content: 'Definite integrals can be negative (signed area), but geometric areas are always positive. Split and use |...| for total area.',
        },
      ],
    },
    {
      id: 'calc05-quiz2',
      type: 'quiz',
      title: 'Area Practice',
      content: [],
      question: {
        id: 'calc05-q2',
        type: 'numeric',
        prompt: 'Find the area enclosed between y = x^2 and y = 4 (intersecting at x = +/-2)',
        correctAnswer: 10.67,
        tolerance: 0.1,
        hint: 'Integrate (top - bottom) = (4 - x^2) from -2 to 2',
        explanation: 'Area = integral from -2 to 2 of (4 - x^2) dx = [4x - x^3/3] = (8 - 8/3) - (-8 + 8/3) = 32/3 = 10.67',
        points: 20,
      },
    },
    {
      id: 'calc05-summary',
      type: 'summary',
      title: 'Definite Integrals Summary',
      content: [
        {
          type: 'steps',
          steps: [
            { title: 'Definite integral', content: 'F(b) - F(a) gives the signed area' },
            { title: 'Area under curve', content: 'Integrate from a to b where f(x) >= 0' },
            { title: 'Area between curves', content: 'Integrate (top - bottom)' },
          ],
        },
      ],
    },
  ],
  xpReward: 45,
};

// Export all calculus lessons
export const CALCULUS_LESSONS: Lesson[] = [
  LESSON_CALC_01,
  LESSON_CALC_02,
  LESSON_CALC_03,
  LESSON_CALC_04,
  LESSON_CALC_05,
];

// Module definition
export const MODULE_CALCULUS: LessonModule = {
  id: 'module-calculus',
  topicId: 'calculus' as QuizTopic,
  title: 'Calculus',
  description: 'Master differentiation and integration',
  lessons: [
    'calculus-01-intro',
    'calculus-02-rules',
    'calculus-03-applications',
    'calculus-04-integration',
    'calculus-05-definite',
  ],
  totalXP: 210,
};
