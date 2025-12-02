// Exponentials & Logarithms - Lesson Content
// Topic A6: Making logs intuitive and fun

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: The Power of Exponentials
export const LESSON_EXP_01: Lesson = {
  id: 'exp-01-intro',
  topicId: 'exponentials' as QuizTopic,
  title: 'Growth Gone Wild',
  subtitle: 'Exponential growth - the most powerful force in the universe',
  description: 'Understand why Einstein called compound interest the 8th wonder',
  difficulty: 'foundation',
  estimatedTime: 7,
  objectives: [
    'Understand exponential growth and decay',
    'Recognize exponential patterns in real life',
  ],
  steps: [
    {
      id: 'ex01-hook',
      type: 'hook',
      title: 'The Rice on a Chessboard',
      content: [
        {
          type: 'text',
          content: 'Legend says an inventor asked a king for rice: 1 grain on square 1, 2 on square 2, 4 on square 3... doubling each square. The king laughed - until he calculated: by square 64, he\'d owe more rice than exists on Earth! This is EXPONENTIAL GROWTH.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Mind-blowing',
          content: '2⁶⁴ ≈ 18 quintillion grains. That\'s about 1,200 years of worldwide rice production!',
        },
      ],
    },
    {
      id: 'ex01-concept',
      type: 'concept',
      title: 'The Exponential Shape',
      content: [
        {
          type: 'text',
          content: 'Exponential functions have the variable in the EXPONENT:',
        },
        {
          type: 'latex',
          content: 'y = a^x \\quad \\text{or} \\quad y = e^x',
          display: true,
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Growth (a > 1)',
              content: 'Curve shoots upward - starts slow, then explodes',
            },
            {
              title: 'Decay (0 < a < 1)',
              content: 'Curve falls toward zero but never touches it',
            },
          ],
        },
      ],
    },
    {
      id: 'ex01-visual',
      type: 'visual',
      title: 'See the Growth',
      content: [
        {
          type: 'text',
          content: 'Compare y = 2ˣ (exponential) to y = x² (polynomial). Watch how 2ˣ eventually destroys x²!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Exponential vs Polynomial',
            description: 'Exponentials always win eventually',
            expressions: [
              { latex: 'y=2^x', color: '#06b6d4' },
              { latex: 'y=x^2', color: '#ef4444' },
            ],
            bounds: { left: -3, right: 8, bottom: -5, top: 50 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'ex01-quiz',
      type: 'quiz',
      title: 'Identify Growth',
      content: [],
      question: {
        id: 'ex01-q1',
        type: 'multiple-choice',
        prompt: 'Which represents exponential growth?',
        options: [
          { id: 'a', text: 'y = 3x + 5' },
          { id: 'b', text: 'y = x²' },
          { id: 'c', text: 'y = 5(2)ˣ' },
          { id: 'd', text: 'y = 2x²' },
        ],
        correctAnswer: 'c',
        hint: 'Look for x in the EXPONENT position.',
        explanation: 'y = 5(2)ˣ has x in the exponent - that\'s exponential. The others are linear or quadratic.',
        points: 10,
      },
    },
    {
      id: 'ex01-summary',
      type: 'summary',
      title: 'Exponential Power',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Remember',
          content: 'Exponential = variable in the power. It starts slow but eventually beats ANYTHING.',
        },
      ],
    },
  ],
  xpReward: 25,
};

// Lesson 2: Laws of Exponents
export const LESSON_EXP_02: Lesson = {
  id: 'exp-02-laws',
  topicId: 'exponentials' as QuizTopic,
  title: 'The Power Laws',
  subtitle: 'Master the rules of exponents',
  description: 'Learn and apply all exponent rules fluently',
  difficulty: 'foundation',
  estimatedTime: 8,
  prerequisites: ['exp-01-intro'],
  objectives: [
    'Apply multiplication and division laws',
    'Handle negative and fractional exponents',
  ],
  steps: [
    {
      id: 'ex02-hook',
      type: 'hook',
      title: 'Six Rules to Rule Them All',
      content: [
        {
          type: 'text',
          content: 'Every exponent manipulation boils down to 6 simple rules. Master these, and you can simplify any exponential expression!',
        },
      ],
    },
    {
      id: 'ex02-concept',
      type: 'concept',
      title: 'The Six Laws',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Multiplication',
              content: 'aᵐ × aⁿ = aᵐ⁺ⁿ (add powers)',
              latex: 'a^m \\times a^n = a^{m+n}',
            },
            {
              title: 'Division',
              content: 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ (subtract powers)',
              latex: 'a^m \\div a^n = a^{m-n}',
            },
            {
              title: 'Power of a power',
              content: '(aᵐ)ⁿ = aᵐⁿ (multiply powers)',
              latex: '(a^m)^n = a^{mn}',
            },
            {
              title: 'Zero power',
              content: 'a⁰ = 1 (anything to zero power is 1)',
              latex: 'a^0 = 1',
            },
            {
              title: 'Negative power',
              content: 'a⁻ⁿ = 1/aⁿ (flip it)',
              latex: 'a^{-n} = \\frac{1}{a^n}',
            },
            {
              title: 'Fractional power',
              content: 'a^(1/n) = ⁿ√a (root)',
              latex: 'a^{1/n} = \\sqrt[n]{a}',
            },
          ],
        },
      ],
    },
    {
      id: 'ex02-practice1',
      type: 'practice',
      title: 'Simplify These',
      content: [],
      question: {
        id: 'ex02-q1',
        type: 'matching',
        prompt: 'Match each expression with its simplified form:',
        leftItems: [
          { id: 'a', text: '2³ × 2⁴', latex: '2^3 \\times 2^4' },
          { id: 'b', text: '3⁵ ÷ 3²', latex: '3^5 \\div 3^2' },
          { id: 'c', text: '(5²)³', latex: '(5^2)^3' },
          { id: 'd', text: '4⁻²', latex: '4^{-2}' },
        ],
        rightItems: [
          { id: 'v1', text: '2⁷', latex: '2^7' },
          { id: 'v2', text: '3³', latex: '3^3' },
          { id: 'v3', text: '5⁶', latex: '5^6' },
          { id: 'v4', text: '1/16', latex: '\\frac{1}{16}' },
        ],
        correctMatches: { a: 'v1', b: 'v2', c: 'v3', d: 'v4' },
        hint: 'Multiply: add powers. Divide: subtract. Power of power: multiply. Negative: flip.',
        explanation: '2³×2⁴ = 2⁷. 3⁵÷3² = 3³. (5²)³ = 5⁶. 4⁻² = 1/16.',
        points: 20,
      },
    },
    {
      id: 'ex02-practice2',
      type: 'practice',
      title: 'Fractional Powers',
      content: [],
      question: {
        id: 'ex02-q2',
        type: 'numeric',
        prompt: 'What is 27^(2/3)?',
        correctAnswer: 9,
        tolerance: 0,
        hint: '27^(2/3) = (27^(1/3))² = (∛27)²',
        explanation: '27^(1/3) = ∛27 = 3. Then 3² = 9.',
        points: 15,
      },
    },
    {
      id: 'ex02-summary',
      type: 'summary',
      title: 'Law Summary',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Quick Reference',
          content: 'Same base multiply: ADD powers. Same base divide: SUBTRACT powers. Power of power: MULTIPLY. Negative power: FLIP. Fractional power: ROOT.',
        },
      ],
    },
  ],
  xpReward: 35,
};

// Lesson 3: Introduction to Logarithms
export const LESSON_EXP_03: Lesson = {
  id: 'exp-03-logs-intro',
  topicId: 'exponentials' as QuizTopic,
  title: 'Logs: The Inverse Operation',
  subtitle: 'Logarithms - asking the reverse question',
  description: 'Understand logarithms as the opposite of exponentiation',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['exp-02-laws'],
  objectives: [
    'Understand logarithms as inverse of exponents',
    'Convert between exponential and log form',
  ],
  steps: [
    {
      id: 'ex03-hook',
      type: 'hook',
      title: 'The Reverse Question',
      content: [
        {
          type: 'text',
          content: '"What\'s 2³?" is easy - it\'s 8. But "2 to WHAT power gives 8?" That\'s a LOG question! log₂(8) = 3 because 2³ = 8. Logarithms answer: "what exponent do I need?"',
        },
      ],
    },
    {
      id: 'ex03-concept1',
      type: 'concept',
      title: 'The Definition',
      content: [
        {
          type: 'latex',
          content: '\\log_a(x) = y \\iff a^y = x',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Read it as',
          content: '"log base a of x equals y" means "a to the power y equals x"',
        },
        {
          type: 'callout',
          variant: 'example',
          content: 'log₂(8) = 3 because 2³ = 8. log₁₀(100) = 2 because 10² = 100.',
        },
      ],
    },
    {
      id: 'ex03-concept2',
      type: 'concept',
      title: 'Common Bases',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'log (no base)',
              content: 'Usually means log₁₀ (common log)',
            },
            {
              title: 'ln',
              content: 'Means logₑ (natural log, base e ≈ 2.718)',
            },
          ],
        },
      ],
    },
    {
      id: 'ex03-visual',
      type: 'visual',
      title: 'Log Graph',
      content: [
        {
          type: 'text',
          content: 'The log curve is a reflection of the exponential curve. Notice how it passes through (1, 0).',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Exponential and Log',
            description: 'Mirror images across y = x',
            expressions: [
              { latex: 'y=2^x', color: '#06b6d4' },
              { latex: 'y=\\log_2(x)', color: '#ef4444' },
              { latex: 'y=x', color: '#ffffff' },
            ],
            bounds: { left: -3, right: 6, bottom: -3, top: 6 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'ex03-practice1',
      type: 'practice',
      title: 'Convert to Log Form',
      content: [],
      question: {
        id: 'ex03-q1',
        type: 'multiple-choice',
        prompt: '5² = 25 in log form is:',
        options: [
          { id: 'a', text: 'log₅(25) = 2' },
          { id: 'b', text: 'log₂(25) = 5' },
          { id: 'c', text: 'log₂₅(5) = 2' },
          { id: 'd', text: 'log₅(2) = 25' },
        ],
        correctAnswer: 'a',
        hint: 'aⁿ = x becomes log_a(x) = n',
        explanation: '5² = 25 → log₅(25) = 2. Base stays as base, answer becomes what\'s inside the log.',
        points: 15,
      },
    },
    {
      id: 'ex03-practice2',
      type: 'practice',
      title: 'Evaluate Logs',
      content: [],
      question: {
        id: 'ex03-q2',
        type: 'numeric',
        prompt: 'What is log₃(81)?',
        correctAnswer: 4,
        tolerance: 0,
        hint: '3 to what power gives 81?',
        explanation: '3⁴ = 81, so log₃(81) = 4.',
        points: 15,
      },
    },
    {
      id: 'ex03-summary',
      type: 'summary',
      title: 'The Big Idea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Remember',
          content: 'log_a(x) asks "a to what power gives x?" It\'s just the exponent question in disguise!',
        },
      ],
    },
  ],
  xpReward: 45,
};

// Lesson 4: Log Laws
export const LESSON_EXP_04: Lesson = {
  id: 'exp-04-log-laws',
  topicId: 'exponentials' as QuizTopic,
  title: 'The Log Laws',
  subtitle: 'Master the rules that simplify logarithms',
  description: 'Learn and apply the laws of logarithms',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['exp-03-logs-intro'],
  objectives: [
    'Apply log multiplication, division, and power laws',
    'Simplify complex log expressions',
  ],
  steps: [
    {
      id: 'ex04-hook',
      type: 'hook',
      title: 'Logs Turn Hard into Easy',
      content: [
        {
          type: 'text',
          content: 'Logs have a superpower: they turn multiplication into addition, division into subtraction, and powers into multiplication. These rules made calculations possible before calculators existed!',
        },
      ],
    },
    {
      id: 'ex04-concept',
      type: 'concept',
      title: 'The Three Laws',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Product Law',
              content: 'log(AB) = log(A) + log(B)',
              latex: '\\log(AB) = \\log(A) + \\log(B)',
            },
            {
              title: 'Quotient Law',
              content: 'log(A/B) = log(A) - log(B)',
              latex: '\\log(\\frac{A}{B}) = \\log(A) - \\log(B)',
            },
            {
              title: 'Power Law',
              content: 'log(Aⁿ) = n·log(A)',
              latex: '\\log(A^n) = n \\cdot \\log(A)',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Pattern',
          content: 'Same as exponent rules but "downgraded": multiply→add, divide→subtract, power→multiply.',
        },
      ],
    },
    {
      id: 'ex04-practice1',
      type: 'practice',
      title: 'Expand This',
      content: [],
      question: {
        id: 'ex04-q1',
        type: 'multiple-choice',
        prompt: 'Expand: log(x²y/z)',
        options: [
          { id: 'a', text: '2log(x) + log(y) - log(z)' },
          { id: 'b', text: '2log(x) × log(y) ÷ log(z)' },
          { id: 'c', text: 'log(2x) + log(y) - log(z)' },
          { id: 'd', text: '2log(xy) - log(z)' },
        ],
        correctAnswer: 'a',
        hint: 'Use all three laws: power brings down 2, product splits x²y, quotient subtracts z.',
        explanation: 'log(x²y/z) = log(x²y) - log(z) = log(x²) + log(y) - log(z) = 2log(x) + log(y) - log(z)',
        points: 20,
      },
    },
    {
      id: 'ex04-practice2',
      type: 'practice',
      title: 'Simplify This',
      content: [],
      question: {
        id: 'ex04-q2',
        type: 'fill-blank',
        prompt: 'log₂(8) + log₂(4) = log₂([blank1])',
        blanks: [
          { id: 'blank1', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['32'],
        },
        hint: 'Product law: log(A) + log(B) = log(AB)',
        explanation: 'log₂(8) + log₂(4) = log₂(8×4) = log₂(32)',
        points: 15,
      },
    },
    {
      id: 'ex04-summary',
      type: 'summary',
      title: 'Law Memory',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Mantra',
          content: 'Logs downgrade operations: × becomes +, ÷ becomes -, power becomes ×. Think "logs are lazy - they make everything easier!"',
        },
      ],
    },
  ],
  xpReward: 45,
};

// Lesson 5: Solving Exponential & Log Equations
export const LESSON_EXP_05: Lesson = {
  id: 'exp-05-solving',
  topicId: 'exponentials' as QuizTopic,
  title: 'Solving Log Equations',
  subtitle: 'Strategies for exponential and logarithmic equations',
  description: 'Solve various types of exponential and log equations',
  difficulty: 'advanced',
  estimatedTime: 12,
  prerequisites: ['exp-04-log-laws'],
  objectives: [
    'Solve exponential equations using logs',
    'Solve logarithmic equations',
  ],
  steps: [
    {
      id: 'ex05-hook',
      type: 'hook',
      title: 'When\'s My Investment Worth $1M?',
      content: [
        {
          type: 'text',
          content: 'If you invest $10,000 at 7% interest, when will it reach $1,000,000? This is an exponential equation: 10000(1.07)ᵗ = 1000000. Logs are the key to solving for t!',
        },
      ],
    },
    {
      id: 'ex05-concept1',
      type: 'concept',
      title: 'Solving aˣ = b',
      content: [
        {
          type: 'text',
          content: 'Take log of both sides to bring x down:',
        },
        {
          type: 'latex',
          content: 'a^x = b \\implies x = \\frac{\\log(b)}{\\log(a)}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Method',
          content: 'log both sides → use power rule to bring x down → solve for x',
        },
      ],
    },
    {
      id: 'ex05-example',
      type: 'example',
      title: 'Worked Example',
      content: [
        {
          type: 'text',
          content: 'Solve: 3ˣ = 20',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Take log of both sides',
              content: 'log(3ˣ) = log(20)',
              latex: '\\log(3^x) = \\log(20)',
            },
            {
              title: 'Power rule',
              content: 'x·log(3) = log(20)',
            },
            {
              title: 'Solve',
              content: 'x = log(20)/log(3) ≈ 2.73',
              latex: 'x = \\frac{\\log(20)}{\\log(3)} \\approx 2.73',
            },
          ],
        },
      ],
    },
    {
      id: 'ex05-practice1',
      type: 'practice',
      title: 'Solve Exponential',
      content: [],
      question: {
        id: 'ex05-q1',
        type: 'multiple-choice',
        prompt: 'Solve 2ˣ = 32:',
        options: [
          { id: 'a', text: 'x = 4' },
          { id: 'b', text: 'x = 5' },
          { id: 'c', text: 'x = 6' },
          { id: 'd', text: 'x = 16' },
        ],
        correctAnswer: 'b',
        hint: '32 = 2⁵',
        explanation: '2ˣ = 32 = 2⁵, so x = 5.',
        points: 10,
      },
    },
    {
      id: 'ex05-concept2',
      type: 'concept',
      title: 'Solving Log Equations',
      content: [
        {
          type: 'text',
          content: 'Convert to exponential form:',
        },
        {
          type: 'latex',
          content: '\\log_a(x) = b \\implies x = a^b',
          display: true,
        },
      ],
    },
    {
      id: 'ex05-practice2',
      type: 'practice',
      title: 'Solve Log Equation',
      content: [],
      question: {
        id: 'ex05-q2',
        type: 'numeric',
        prompt: 'Solve log₂(x) = 5:',
        correctAnswer: 32,
        tolerance: 0,
        hint: 'Convert to exponential: x = 2⁵',
        explanation: 'log₂(x) = 5 means x = 2⁵ = 32.',
        points: 15,
      },
    },
    {
      id: 'ex05-summary',
      type: 'summary',
      title: 'Solving Strategies',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'For aˣ = b',
              content: 'Take log of both sides, bring x down with power rule',
            },
            {
              title: 'For log_a(x) = b',
              content: 'Convert to exponential: x = aᵇ',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 50,
};

// Module definition
export const MODULE_EXPONENTIALS: LessonModule = {
  id: 'module-exponentials',
  topicId: 'exponentials' as QuizTopic,
  title: 'Exponentials & Logarithms',
  description: 'Master growth, decay, and the power of logs',
  lessons: [
    'exp-01-intro',
    'exp-02-laws',
    'exp-03-logs-intro',
    'exp-04-log-laws',
    'exp-05-solving',
  ],
  totalXP: 200,
};

// Export all lessons
export const EXPONENTIALS_LESSONS: Lesson[] = [
  LESSON_EXP_01,
  LESSON_EXP_02,
  LESSON_EXP_03,
  LESSON_EXP_04,
  LESSON_EXP_05,
];
