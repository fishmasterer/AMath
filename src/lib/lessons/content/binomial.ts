// Binomial Expansion - Lesson Content
// Topic A5: Making Pascal's Triangle fun

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: Pascal's Triangle
export const LESSON_BINOM_01: Lesson = {
  id: 'binomial-01-pascal',
  topicId: 'binomial' as QuizTopic,
  title: 'The Magic Triangle',
  subtitle: 'Pascal\'s Triangle - patterns hidden in plain sight',
  description: 'Discover the amazing patterns in Pascal\'s Triangle',
  difficulty: 'foundation',
  estimatedTime: 7,
  objectives: [
    'Construct Pascal\'s Triangle',
    'Identify patterns within the triangle',
  ],
  steps: [
    {
      id: 'bi01-hook',
      type: 'hook',
      title: 'A 900-Year-Old Secret',
      content: [
        {
          type: 'text',
          content: 'In 1653, Blaise Pascal published a triangle of numbers so powerful it predicted coin flip probabilities, solved counting problems, and expanded algebraic expressions. But Chinese mathematicians knew it 500 years earlier! This triangle is EVERYWHERE in math.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'The Pattern',
          content: 'Each number is the sum of the two numbers above it. Start and end each row with 1.',
        },
      ],
    },
    {
      id: 'bi01-concept',
      type: 'concept',
      title: 'Building the Triangle',
      content: [
        {
          type: 'text',
          content: 'Here\'s how Pascal\'s Triangle is built:',
        },
        {
          type: 'callout',
          variant: 'example',
          title: 'The First 6 Rows',
          content: 'Row 0:         1\nRow 1:        1  1\nRow 2:       1  2  1\nRow 3:      1  3  3  1\nRow 4:     1  4  6  4  1\nRow 5:    1  5  10  10  5  1',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Rule',
          content: 'Every number = sum of two numbers above. Edges are always 1.',
        },
      ],
    },
    {
      id: 'bi01-quiz1',
      type: 'quiz',
      title: 'Complete the Row',
      content: [],
      question: {
        id: 'bi01-q1',
        type: 'numeric',
        prompt: 'In Row 6 of Pascal\'s Triangle, the middle number is:',
        correctAnswer: 20,
        tolerance: 0,
        hint: 'Row 6 starts: 1, 6, 15, ?, 15, 6, 1. What\'s the middle?',
        explanation: 'Row 6 is: 1, 6, 15, 20, 15, 6, 1. The middle number is 20 (= 10 + 10 from row above).',
        points: 15,
      },
    },
    {
      id: 'bi01-concept2',
      type: 'concept',
      title: 'Hidden Patterns',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Diagonals',
              content: '1st diagonal: all 1s. 2nd: counting numbers. 3rd: triangular numbers!',
            },
            {
              title: 'Row Sums',
              content: 'Sum of row n = 2ⁿ. (Row 4: 1+4+6+4+1 = 16 = 2⁴)',
            },
            {
              title: 'Symmetry',
              content: 'Each row is symmetric (reads same forwards and backwards)',
            },
          ],
        },
      ],
    },
    {
      id: 'bi01-summary',
      type: 'summary',
      title: 'Triangle Power',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Why It Matters',
          content: 'Pascal\'s Triangle gives us the COEFFICIENTS for expanding (a + b)ⁿ. Row n contains all the numbers you need!',
        },
      ],
    },
  ],
  xpReward: 30,
};

// Lesson 2: Binomial Expansion
export const LESSON_BINOM_02: Lesson = {
  id: 'binomial-02-expansion',
  topicId: 'binomial' as QuizTopic,
  title: 'Expanding Powers',
  subtitle: 'Using Pascal\'s Triangle to expand (a + b)ⁿ',
  description: 'Master binomial expansion with coefficients from Pascal\'s Triangle',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['binomial-01-pascal'],
  objectives: [
    'Expand (a + b)ⁿ using Pascal\'s Triangle',
    'Identify patterns in the expansion',
  ],
  steps: [
    {
      id: 'bi02-hook',
      type: 'hook',
      title: 'Expand Without Multiplying',
      content: [
        {
          type: 'text',
          content: 'What\'s (x + 2)⁴? You could multiply (x+2)(x+2)(x+2)(x+2)... OR use Pascal\'s Triangle to write the answer immediately!',
        },
      ],
    },
    {
      id: 'bi02-concept',
      type: 'concept',
      title: 'The Pattern',
      content: [
        {
          type: 'text',
          content: 'For (a + b)ⁿ, use row n of Pascal\'s Triangle as coefficients:',
        },
        {
          type: 'latex',
          content: '(a+b)^4 = 1a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + 1b^4',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Pattern',
          content: 'Powers of a: go DOWN from n to 0. Powers of b: go UP from 0 to n. Coefficients: from Pascal\'s row n.',
        },
      ],
    },
    {
      id: 'bi02-example',
      type: 'example',
      title: 'Worked Example',
      content: [
        {
          type: 'text',
          content: 'Expand (x + 3)³',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Get coefficients',
              content: 'Row 3: 1, 3, 3, 1',
            },
            {
              title: 'Write pattern',
              content: '= 1·x³·3⁰ + 3·x²·3¹ + 3·x¹·3² + 1·x⁰·3³',
            },
            {
              title: 'Calculate',
              content: '= x³ + 9x² + 27x + 27',
              latex: '= x^3 + 9x^2 + 27x + 27',
            },
          ],
        },
      ],
    },
    {
      id: 'bi02-practice1',
      type: 'practice',
      title: 'Your Turn',
      content: [],
      question: {
        id: 'bi02-q1',
        type: 'fill-blank',
        prompt: '(x + 2)³ = x³ + [blank1]x² + [blank2]x + [blank3]',
        blanks: [
          { id: 'blank1', placeholder: '?' },
          { id: 'blank2', placeholder: '?' },
          { id: 'blank3', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['6'],
          blank2: ['12'],
          blank3: ['8'],
        },
        hint: 'Row 3: 1, 3, 3, 1. Multiply by powers of 2.',
        explanation: '= x³ + 3(x²)(2) + 3(x)(4) + 1(8) = x³ + 6x² + 12x + 8',
        points: 20,
      },
    },
    {
      id: 'bi02-practice2',
      type: 'practice',
      title: 'Find a Specific Term',
      content: [],
      question: {
        id: 'bi02-q2',
        type: 'numeric',
        prompt: 'In the expansion of (x + 1)⁵, what is the coefficient of x³?',
        correctAnswer: 10,
        tolerance: 0,
        hint: 'Row 5: 1, 5, 10, 10, 5, 1. Which position has x³?',
        explanation: 'x³ means a³b² position. Coefficient = 10 (3rd from the middle in row 5).',
        points: 15,
      },
    },
    {
      id: 'bi02-summary',
      type: 'summary',
      title: 'Expansion Method',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Quick Recipe',
          content: '1. Get row n from Pascal\'s Triangle. 2. Powers of first term: n down to 0. 3. Powers of second term: 0 up to n. 4. Multiply it all out!',
        },
      ],
    },
  ],
  xpReward: 45,
};

// Lesson 3: The Binomial Formula
export const LESSON_BINOM_03: Lesson = {
  id: 'binomial-03-formula',
  topicId: 'binomial' as QuizTopic,
  title: 'The nCr Formula',
  subtitle: 'Binomial coefficients without building the whole triangle',
  description: 'Use the formula to find any coefficient directly',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['binomial-02-expansion'],
  objectives: [
    'Calculate nCr using the formula',
    'Find specific terms in a binomial expansion',
  ],
  steps: [
    {
      id: 'bi03-hook',
      type: 'hook',
      title: 'What\'s in Row 100?',
      content: [
        {
          type: 'text',
          content: 'You can\'t build 100 rows of Pascal\'s Triangle on an exam! But with the nCr formula, you can find ANY coefficient in ANY row directly. Time to level up!',
        },
      ],
    },
    {
      id: 'bi03-concept',
      type: 'concept',
      title: 'The nCr Formula',
      content: [
        {
          type: 'latex',
          content: '^nC_r = \\frac{n!}{r!(n-r)!}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'What it means',
          content: 'ⁿCᵣ gives you the coefficient in position r of row n. Also written as C(n,r) or (n choose r).',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Factorial reminder',
          content: 'n! = n × (n-1) × (n-2) × ... × 2 × 1. So 5! = 120, 4! = 24, etc.',
        },
      ],
    },
    {
      id: 'bi03-example',
      type: 'example',
      title: 'Calculate ⁵C₂',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Apply formula',
              content: '⁵C₂ = 5!/(2! × 3!)',
              latex: '^5C_2 = \\frac{5!}{2! \\times 3!}',
            },
            {
              title: 'Expand',
              content: '= (5×4×3!)/(2×1×3!) = (5×4)/2 = 10',
              latex: '= \\frac{5 \\times 4}{2} = 10',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Shortcut',
          content: 'Cancel the (n-r)! with part of n! to simplify. You only need to multiply r terms.',
        },
      ],
    },
    {
      id: 'bi03-concept2',
      type: 'concept',
      title: 'The General Term',
      content: [
        {
          type: 'text',
          content: 'The (r+1)th term in (a + b)ⁿ is:',
        },
        {
          type: 'latex',
          content: 'T_{r+1} = {^nC_r} \\cdot a^{n-r} \\cdot b^r',
          display: true,
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Watch the index!',
          content: 'r starts at 0. So the "3rd term" has r = 2.',
        },
      ],
    },
    {
      id: 'bi03-practice1',
      type: 'practice',
      title: 'Calculate nCr',
      content: [],
      question: {
        id: 'bi03-q1',
        type: 'numeric',
        prompt: 'Calculate ⁶C₂:',
        correctAnswer: 15,
        tolerance: 0,
        hint: '⁶C₂ = 6!/(2!×4!) = (6×5)/(2×1)',
        explanation: '⁶C₂ = (6×5)/2 = 15',
        points: 15,
      },
    },
    {
      id: 'bi03-practice2',
      type: 'practice',
      title: 'Find Specific Term',
      content: [],
      question: {
        id: 'bi03-q2',
        type: 'multiple-choice',
        prompt: 'Find the coefficient of x⁴ in (2x + 1)⁶:',
        options: [
          { id: 'a', text: '60' },
          { id: 'b', text: '240' },
          { id: 'c', text: '15' },
          { id: 'd', text: '192' },
        ],
        correctAnswer: 'b',
        hint: 'x⁴ means (2x)⁴×1², so r=2. Coefficient = ⁶C₂ × 2⁴ × 1²',
        explanation: 'Term with x⁴: ⁶C₂ × (2x)⁴ × 1² = 15 × 16x⁴ = 240x⁴. Coefficient is 240.',
        points: 20,
      },
    },
    {
      id: 'bi03-summary',
      type: 'summary',
      title: 'Formula Power',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'When to Use',
          content: 'Small n (≤5): Pascal\'s Triangle is faster. Large n or specific terms: use nCr formula.',
        },
      ],
    },
  ],
  xpReward: 50,
};

// Module definition
export const MODULE_BINOMIAL: LessonModule = {
  id: 'module-binomial',
  topicId: 'binomial' as QuizTopic,
  title: 'Binomial Expansion',
  description: 'Master Pascal\'s Triangle and binomial coefficients',
  lessons: [
    'binomial-01-pascal',
    'binomial-02-expansion',
    'binomial-03-formula',
  ],
  totalXP: 125,
};

// Export all lessons
export const BINOMIAL_LESSONS: Lesson[] = [
  LESSON_BINOM_01,
  LESSON_BINOM_02,
  LESSON_BINOM_03,
];
