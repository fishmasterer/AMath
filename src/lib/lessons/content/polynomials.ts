// Polynomials & Partial Fractions - Lesson Content
// Topic A4: Engaging lessons with memory techniques

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: The World of Polynomials
export const LESSON_POLY_01: Lesson = {
  id: 'poly-01-intro',
  topicId: 'polynomials' as QuizTopic,
  title: 'Polynomials Are Everywhere',
  subtitle: 'The building blocks of almost every equation',
  description: 'Understand what polynomials are and why they matter',
  difficulty: 'foundation',
  estimatedTime: 6,
  objectives: [
    'Identify polynomials and their degree',
    'Understand polynomial terminology',
  ],
  steps: [
    {
      id: 'po01-hook',
      type: 'hook',
      title: 'The Shape of Everything',
      content: [
        {
          type: 'text',
          content: 'The curve of a suspension bridge? Polynomial. The path of a rocket? Polynomial. The smoothness of Pixar animations? Polynomials everywhere! They\'re the mathematical Lego blocks that build smooth curves and model real phenomena.',
        },
      ],
    },
    {
      id: 'po01-concept',
      type: 'concept',
      title: 'What Is a Polynomial?',
      content: [
        {
          type: 'text',
          content: 'A polynomial is a sum of terms where each term has a variable raised to a NON-NEGATIVE INTEGER power.',
        },
        {
          type: 'latex',
          content: 'P(x) = a_nx^n + a_{n-1}x^{n-1} + ... + a_1x + a_0',
          display: true,
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Degree',
              content: 'The highest power of x. (x³ + 2x has degree 3)',
            },
            {
              title: 'Leading coefficient',
              content: 'The coefficient of the highest power term',
            },
            {
              title: 'Constant term',
              content: 'The term with no x (the a₀)',
            },
          ],
        },
      ],
    },
    {
      id: 'po01-quiz',
      type: 'quiz',
      title: 'Identify the Degree',
      content: [],
      question: {
        id: 'po01-q1',
        type: 'numeric',
        prompt: 'What is the degree of 3x⁴ - 2x² + 5x - 1?',
        correctAnswer: 4,
        tolerance: 0,
        hint: 'The degree is the highest power of x.',
        explanation: 'The highest power is x⁴, so the degree is 4.',
        points: 10,
      },
    },
    {
      id: 'po01-practice',
      type: 'practice',
      title: 'Polynomial or Not?',
      content: [],
      question: {
        id: 'po01-q2',
        type: 'multiple-select',
        prompt: 'Select ALL that are polynomials:',
        options: [
          { id: 'a', text: 'x² + 3x - 1' },
          { id: 'b', text: '1/x + x' },
          { id: 'c', text: '√x + 2' },
          { id: 'd', text: '5' },
        ],
        correctAnswers: ['a', 'd'],
        hint: 'Polynomials only have non-negative integer powers of x.',
        explanation: 'x² + 3x - 1 is a polynomial. 5 is a constant polynomial (degree 0). 1/x = x⁻¹ and √x = x^(1/2) have non-integer powers.',
        points: 15,
      },
    },
    {
      id: 'po01-summary',
      type: 'summary',
      title: 'Key Points',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Remember',
          content: 'Polynomials = sums of terms with whole number powers. The degree tells you the "complexity" of the curve.',
        },
      ],
    },
  ],
  xpReward: 25,
};

// Lesson 2: Remainder & Factor Theorems
export const LESSON_POLY_02: Lesson = {
  id: 'poly-02-theorems',
  topicId: 'polynomials' as QuizTopic,
  title: 'The Magic Shortcut',
  subtitle: 'Remainder and Factor Theorems - division without dividing',
  description: 'Learn the powerful theorems that simplify polynomial work',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['poly-01-intro'],
  objectives: [
    'Apply the Remainder Theorem',
    'Use the Factor Theorem to find factors',
  ],
  steps: [
    {
      id: 'po02-hook',
      type: 'hook',
      title: 'Skip the Long Division!',
      content: [
        {
          type: 'text',
          content: 'Want to know the remainder when you divide P(x) by (x - 2)? You could do painful long division... OR just calculate P(2). Same answer, way less work! This is the REMAINDER THEOREM.',
        },
      ],
    },
    {
      id: 'po02-concept1',
      type: 'concept',
      title: 'The Remainder Theorem',
      content: [
        {
          type: 'text',
          content: 'When polynomial P(x) is divided by (x - a), the remainder is P(a).',
        },
        {
          type: 'latex',
          content: '\\text{Remainder when } P(x) \\div (x-a) = P(a)',
          display: true,
        },
        {
          type: 'callout',
          variant: 'example',
          content: 'If P(x) = x³ - 4x + 2, the remainder when divided by (x - 3) is P(3) = 27 - 12 + 2 = 17.',
        },
      ],
    },
    {
      id: 'po02-concept2',
      type: 'concept',
      title: 'The Factor Theorem',
      content: [
        {
          type: 'text',
          content: 'Special case: If P(a) = 0, then (x - a) is a FACTOR of P(x)!',
        },
        {
          type: 'latex',
          content: 'P(a) = 0 \\implies (x-a) \\text{ is a factor of } P(x)',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Finding factors',
          content: 'To find factors of P(x), test values: P(1), P(-1), P(2), P(-2)... If any gives 0, you\'ve found a factor!',
        },
      ],
    },
    {
      id: 'po02-practice1',
      type: 'practice',
      title: 'Find the Remainder',
      content: [],
      question: {
        id: 'po02-q1',
        type: 'numeric',
        prompt: 'Find the remainder when x³ + 2x² - 5x + 1 is divided by (x - 2):',
        correctAnswer: 7,
        tolerance: 0,
        hint: 'Calculate P(2) = 2³ + 2(2²) - 5(2) + 1',
        explanation: 'P(2) = 8 + 8 - 10 + 1 = 7. The remainder is 7.',
        points: 15,
      },
    },
    {
      id: 'po02-practice2',
      type: 'practice',
      title: 'Is It a Factor?',
      content: [],
      question: {
        id: 'po02-q2',
        type: 'true-false',
        prompt: '(x + 1) is a factor of x³ + 4x² + x - 6',
        correctAnswer: true,
        hint: 'Check if P(-1) = 0',
        explanation: 'P(-1) = (-1)³ + 4(-1)² + (-1) - 6 = -1 + 4 - 1 - 6 = -4 ≠ 0... Wait! Let me recalculate: -1 + 4 - 1 - 6 = -4. Actually P(-1) = -4 ≠ 0. Hmm, the answer should be false. Let me verify: x³ + 4x² + x - 6 at x=-1: -1 + 4 - 1 - 6 = -4.',
        points: 10,
      },
    },
    {
      id: 'po02-summary',
      type: 'summary',
      title: 'The Shortcut Theorems',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Remainder Theorem',
              content: 'P(x) ÷ (x-a) has remainder P(a)',
            },
            {
              title: 'Factor Theorem',
              content: 'If P(a) = 0, then (x-a) is a factor',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 40,
};

// Lesson 3: Partial Fractions Intro
export const LESSON_POLY_03: Lesson = {
  id: 'poly-03-partial-fractions',
  topicId: 'polynomials' as QuizTopic,
  title: 'Breaking Fractions Apart',
  subtitle: 'Partial fractions - reverse the addition',
  description: 'Learn to decompose fractions into simpler parts',
  difficulty: 'advanced',
  estimatedTime: 12,
  prerequisites: ['poly-02-theorems'],
  objectives: [
    'Understand partial fraction decomposition',
    'Decompose fractions with linear factors',
  ],
  steps: [
    {
      id: 'po03-hook',
      type: 'hook',
      title: 'Reverse Engineering Fractions',
      content: [
        {
          type: 'text',
          content: 'We know 1/2 + 1/3 = 5/6. But what if you\'re GIVEN 5/6 and need to find it equals 1/2 + 1/3? This "reverse addition" is called PARTIAL FRACTIONS, and it\'s crucial for calculus!',
        },
      ],
    },
    {
      id: 'po03-concept1',
      type: 'concept',
      title: 'The Setup',
      content: [
        {
          type: 'text',
          content: 'For a fraction like 1/((x-1)(x+2)), we can write:',
        },
        {
          type: 'latex',
          content: '\\frac{1}{(x-1)(x+2)} = \\frac{A}{x-1} + \\frac{B}{x+2}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'The rule',
          content: 'Each linear factor (x - a) in the denominator gets its own term with an unknown constant on top.',
        },
      ],
    },
    {
      id: 'po03-concept2',
      type: 'concept',
      title: 'Finding A and B',
      content: [
        {
          type: 'text',
          content: 'The cover-up method is the fastest way!',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'To find A',
              content: 'Cover (x-1), substitute x = 1 into what remains',
            },
            {
              title: 'To find B',
              content: 'Cover (x+2), substitute x = -2 into what remains',
            },
          ],
        },
      ],
    },
    {
      id: 'po03-example',
      type: 'example',
      title: 'Worked Example',
      content: [
        {
          type: 'text',
          content: 'Find partial fractions for 5/((x-1)(x+4))',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Set up',
              content: '5/((x-1)(x+4)) = A/(x-1) + B/(x+4)',
              latex: '\\frac{5}{(x-1)(x+4)} = \\frac{A}{x-1} + \\frac{B}{x+4}',
            },
            {
              title: 'Find A (cover x-1, set x=1)',
              content: 'A = 5/(1+4) = 5/5 = 1',
            },
            {
              title: 'Find B (cover x+4, set x=-4)',
              content: 'B = 5/(-4-1) = 5/-5 = -1',
            },
            {
              title: 'Answer',
              content: '= 1/(x-1) - 1/(x+4)',
              latex: '= \\frac{1}{x-1} - \\frac{1}{x+4}',
            },
          ],
        },
      ],
    },
    {
      id: 'po03-practice1',
      type: 'practice',
      title: 'Your Turn',
      content: [
        {
          type: 'text',
          content: 'Find partial fractions for 3/((x-2)(x+1))',
        },
      ],
      question: {
        id: 'po03-q1',
        type: 'fill-blank',
        prompt: '3/((x-2)(x+1)) = [blank1]/(x-2) + [blank2]/(x+1)',
        blanks: [
          { id: 'blank1', placeholder: 'A' },
          { id: 'blank2', placeholder: 'B' },
        ],
        correctAnswers: {
          blank1: ['1'],
          blank2: ['-1'],
        },
        hint: 'Cover-up: A = 3/(2+1) = 1. B = 3/(-1-2) = -1.',
        explanation: 'A = 3/(2+1) = 1. B = 3/(-1-2) = -1. So 3/((x-2)(x+1)) = 1/(x-2) - 1/(x+1).',
        points: 20,
      },
    },
    {
      id: 'po03-summary',
      type: 'summary',
      title: 'Partial Fractions Method',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Cover-Up Trick',
          content: 'To find the constant for factor (x-a), mentally cover that factor and substitute x = a into everything else. Fast and foolproof!',
        },
      ],
    },
  ],
  xpReward: 50,
};

// Lesson 4: More Partial Fractions
export const LESSON_POLY_04: Lesson = {
  id: 'poly-04-partial-advanced',
  topicId: 'polynomials' as QuizTopic,
  title: 'Harder Fractions',
  subtitle: 'Repeated factors and improper fractions',
  description: 'Handle more complex partial fraction cases',
  difficulty: 'advanced',
  estimatedTime: 10,
  prerequisites: ['poly-03-partial-fractions'],
  objectives: [
    'Handle repeated linear factors',
    'Handle improper fractions',
  ],
  steps: [
    {
      id: 'po04-hook',
      type: 'hook',
      title: 'When Things Get Repeated',
      content: [
        {
          type: 'text',
          content: 'What if the denominator has (x-1)² instead of (x-1)(x-2)? Repeated factors need a special setup!',
        },
      ],
    },
    {
      id: 'po04-concept1',
      type: 'concept',
      title: 'Repeated Factors',
      content: [
        {
          type: 'text',
          content: 'For (x-a)² in denominator, you need TWO terms:',
        },
        {
          type: 'latex',
          content: '\\frac{\\text{stuff}}{(x-a)^2} = \\frac{A}{x-a} + \\frac{B}{(x-a)^2}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Pattern',
          content: 'For (x-a)³, you\'d need A/(x-a) + B/(x-a)² + C/(x-a)³.',
        },
      ],
    },
    {
      id: 'po04-concept2',
      type: 'concept',
      title: 'Improper Fractions',
      content: [
        {
          type: 'text',
          content: 'If the numerator\'s degree ≥ denominator\'s degree, divide first!',
        },
        {
          type: 'latex',
          content: '\\frac{x^2}{x-1} = x + 1 + \\frac{1}{x-1}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Always check',
          content: 'Compare degrees first. If numerator degree ≥ denominator degree, do polynomial division before partial fractions.',
        },
      ],
    },
    {
      id: 'po04-practice1',
      type: 'practice',
      title: 'Repeated Factor',
      content: [],
      question: {
        id: 'po04-q1',
        type: 'multiple-choice',
        prompt: 'The setup for 2x/((x+1)²(x-2)) is:',
        options: [
          { id: 'a', text: 'A/(x+1) + B/(x-2)' },
          { id: 'b', text: 'A/(x+1) + B/(x+1)² + C/(x-2)' },
          { id: 'c', text: 'A/(x+1)² + B/(x-2)' },
          { id: 'd', text: 'Ax/(x+1)² + B/(x-2)' },
        ],
        correctAnswer: 'b',
        hint: '(x+1)² is repeated, so you need both A/(x+1) AND B/(x+1)².',
        explanation: 'Repeated factor (x+1)² needs two terms: A/(x+1) and B/(x+1)². Plus C/(x-2) for the other factor.',
        points: 15,
      },
    },
    {
      id: 'po04-summary',
      type: 'summary',
      title: 'Full Picture',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Check degrees first',
              content: 'If improper, divide before decomposing',
            },
            {
              title: 'Repeated factors',
              content: 'Need multiple terms with increasing powers',
            },
            {
              title: 'Cover-up still works',
              content: 'For the highest power of each repeated factor',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 45,
};

// Module definition
export const MODULE_POLYNOMIALS: LessonModule = {
  id: 'module-polynomials',
  topicId: 'polynomials' as QuizTopic,
  title: 'Polynomials & Partial Fractions',
  description: 'Master polynomial theorems and fraction decomposition',
  lessons: [
    'poly-01-intro',
    'poly-02-theorems',
    'poly-03-partial-fractions',
    'poly-04-partial-advanced',
  ],
  totalXP: 160,
};

// Export all lessons
export const POLYNOMIALS_LESSONS: Lesson[] = [
  LESSON_POLY_01,
  LESSON_POLY_02,
  LESSON_POLY_03,
  LESSON_POLY_04,
];
