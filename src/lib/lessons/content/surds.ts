// Surds - Lesson Content
// Topic A3: Fun, memorable lessons about square roots

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: What Are Surds?
export const LESSON_SURDS_01: Lesson = {
  id: 'surds-01-intro',
  topicId: 'surds' as QuizTopic,
  title: 'The Irrational Truth',
  subtitle: 'Why some numbers refuse to be written as fractions',
  description: 'Discover surds - the rebels of the number world',
  difficulty: 'foundation',
  estimatedTime: 6,
  objectives: [
    'Understand what surds are',
    'Recognize that surds are irrational numbers',
  ],
  steps: [
    {
      id: 'su01-hook',
      type: 'hook',
      title: 'The Number That Broke Math',
      content: [
        {
          type: 'text',
          content: '2,500 years ago, a Greek mathematician named Hippasus discovered √2. This number was SO strange - it couldn\'t be written as a fraction - that legend says he was thrown overboard from a ship for revealing it! These "unspeakable" numbers are called SURDS.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Mind-blowing fact',
          content: '√2 = 1.41421356237... The decimals go on FOREVER without repeating. You can never write it exactly as a decimal or fraction. That\'s what makes it irrational!',
        },
      ],
    },
    {
      id: 'su01-concept',
      type: 'concept',
      title: 'Surds Defined',
      content: [
        {
          type: 'text',
          content: 'A SURD is a root (square root, cube root, etc.) that cannot be simplified to a whole number or fraction.',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Surds (Irrational)',
              content: '√2, √3, √5, √7, √11... These never "clean up"',
            },
            {
              title: 'NOT Surds (Rational)',
              content: '√4 = 2, √9 = 3, √16 = 4... These simplify to whole numbers',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Quick test',
          content: 'Is the number under the √ a perfect square? If YES, it\'s not a surd. If NO, it\'s a surd!',
        },
      ],
    },
    {
      id: 'su01-visual',
      type: 'visual',
      title: 'Where Does √2 Live?',
      content: [
        {
          type: 'text',
          content: '√2 is between 1 and 2, closer to 1.4. You can see it on the number line - it\'s definitely there, just impossible to write exactly!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Locating √2',
            description: 'See where √2 sits on the number line',
            expressions: [
              { latex: 'y=0', color: '#ffffff' },
              { latex: '(\\sqrt{2}, 0)', color: '#ef4444' },
              { latex: '(1, 0)', color: '#22c55e' },
              { latex: '(2, 0)', color: '#22c55e' },
            ],
            bounds: { left: 0, right: 3, bottom: -1, top: 1 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'su01-quiz1',
      type: 'quiz',
      title: 'Surd or Not?',
      content: [],
      question: {
        id: 'su01-q1',
        type: 'multiple-select',
        prompt: 'Select ALL the surds:',
        options: [
          { id: 'a', text: '√5', latex: '\\sqrt{5}' },
          { id: 'b', text: '√36', latex: '\\sqrt{36}' },
          { id: 'c', text: '√12', latex: '\\sqrt{12}' },
          { id: 'd', text: '√100', latex: '\\sqrt{100}' },
        ],
        correctAnswers: ['a', 'c'],
        hint: 'Perfect squares (4, 9, 16, 25, 36...) are NOT surds.',
        explanation: '√5 and √12 are surds (5 and 12 aren\'t perfect squares). √36 = 6 and √100 = 10, so they\'re not surds.',
        points: 15,
      },
    },
    {
      id: 'su01-summary',
      type: 'summary',
      title: 'Key Takeaway',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Remember',
          content: 'Surds are "unfinished" roots - they can\'t simplify to nice numbers. But that\'s okay! We can work with them exactly without ever converting to decimals.',
        },
      ],
    },
  ],
  xpReward: 25,
};

// Lesson 2: Simplifying Surds
export const LESSON_SURDS_02: Lesson = {
  id: 'surds-02-simplifying',
  topicId: 'surds' as QuizTopic,
  title: 'Breaking Down Surds',
  subtitle: 'The art of simplifying square roots',
  description: 'Learn to simplify surds to their simplest form',
  difficulty: 'intermediate',
  estimatedTime: 8,
  prerequisites: ['surds-01-intro'],
  objectives: [
    'Simplify surds by extracting perfect squares',
    'Write surds in simplest form',
  ],
  steps: [
    {
      id: 'su02-hook',
      type: 'hook',
      title: 'Finding Hidden Treasure',
      content: [
        {
          type: 'text',
          content: '√18 looks messy, but there\'s a perfect square HIDING inside! 18 = 9 × 2, and 9 is a perfect square. So √18 = √9 × √2 = 3√2. We\'ve extracted the treasure!',
        },
      ],
    },
    {
      id: 'su02-concept',
      type: 'concept',
      title: 'The Treasure Hunt Method',
      content: [
        {
          type: 'text',
          content: 'To simplify √n, look for the LARGEST perfect square that divides n.',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Step 1: Factor hunt',
              content: 'Find the biggest perfect square factor (4, 9, 16, 25, 36...)',
            },
            {
              title: 'Step 2: Split',
              content: '√n = √(perfect square × other)',
            },
            {
              title: 'Step 3: Extract',
              content: '= √(perfect square) × √(other) = number × √(other)',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Perfect squares to memorize',
          content: '4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144',
        },
      ],
    },
    {
      id: 'su02-example',
      type: 'example',
      title: 'Worked Examples',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: '√48',
              content: '= √(16 × 3) = √16 × √3 = 4√3',
              latex: '\\sqrt{48} = \\sqrt{16 \\times 3} = 4\\sqrt{3}',
            },
            {
              title: '√72',
              content: '= √(36 × 2) = √36 × √2 = 6√2',
              latex: '\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}',
            },
            {
              title: '√200',
              content: '= √(100 × 2) = √100 × √2 = 10√2',
              latex: '\\sqrt{200} = \\sqrt{100 \\times 2} = 10\\sqrt{2}',
            },
          ],
        },
      ],
    },
    {
      id: 'su02-practice1',
      type: 'practice',
      title: 'Your Turn',
      content: [],
      question: {
        id: 'su02-q1',
        type: 'fill-blank',
        prompt: '√50 = [blank1]√[blank2]',
        blanks: [
          { id: 'blank1', placeholder: '?' },
          { id: 'blank2', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['5'],
          blank2: ['2'],
        },
        hint: '50 = 25 × 2, and √25 = 5',
        explanation: '√50 = √(25 × 2) = √25 × √2 = 5√2',
        points: 15,
      },
    },
    {
      id: 'su02-practice2',
      type: 'practice',
      title: 'Bigger Numbers',
      content: [],
      question: {
        id: 'su02-q2',
        type: 'multiple-choice',
        prompt: 'Simplify √98:',
        options: [
          { id: 'a', text: '7√2', latex: '7\\sqrt{2}' },
          { id: 'b', text: '2√49', latex: '2\\sqrt{49}' },
          { id: 'c', text: '49√2', latex: '49\\sqrt{2}' },
          { id: 'd', text: 'Cannot be simplified' },
        ],
        correctAnswer: 'a',
        hint: '98 = 49 × 2, and √49 = 7',
        explanation: '√98 = √(49 × 2) = √49 × √2 = 7√2',
        points: 15,
      },
    },
    {
      id: 'su02-summary',
      type: 'summary',
      title: 'Simplification Mastery',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Mantra',
          content: '"Hunt for the biggest perfect square hiding inside, then set it free!" Once you extract it, the surd is in simplest form.',
        },
      ],
    },
  ],
  xpReward: 35,
};

// Lesson 3: Operations with Surds
export const LESSON_SURDS_03: Lesson = {
  id: 'surds-03-operations',
  topicId: 'surds' as QuizTopic,
  title: 'Surd Arithmetic',
  subtitle: 'Adding, subtracting, multiplying surds like a pro',
  description: 'Master the four operations with surds',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['surds-02-simplifying'],
  objectives: [
    'Add and subtract like surds',
    'Multiply and divide surds',
  ],
  steps: [
    {
      id: 'su03-hook',
      type: 'hook',
      title: 'Surds Are Like Fruit',
      content: [
        {
          type: 'text',
          content: '3 apples + 2 apples = 5 apples. But 3 apples + 2 oranges = ...you can\'t add them! Surds work the same way: 3√2 + 2√2 = 5√2, but 3√2 + 2√3 stays as is (different "fruit").',
        },
      ],
    },
    {
      id: 'su03-concept1',
      type: 'concept',
      title: 'Adding & Subtracting',
      content: [
        {
          type: 'text',
          content: 'You can only combine surds with the SAME number under the root:',
        },
        {
          type: 'latex',
          content: 'a\\sqrt{n} + b\\sqrt{n} = (a+b)\\sqrt{n}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Common mistake',
          content: '√2 + √3 ≠ √5! You cannot add different surds into one.',
        },
      ],
    },
    {
      id: 'su03-example1',
      type: 'example',
      title: 'Addition Examples',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Like surds',
              content: '4√3 + 2√3 = 6√3 (same "fruit")',
              latex: '4\\sqrt{3} + 2\\sqrt{3} = 6\\sqrt{3}',
            },
            {
              title: 'Hidden like surds',
              content: '√8 + √18 = 2√2 + 3√2 = 5√2 (simplify first!)',
              latex: '\\sqrt{8} + \\sqrt{18} = 2\\sqrt{2} + 3\\sqrt{2} = 5\\sqrt{2}',
            },
          ],
        },
      ],
    },
    {
      id: 'su03-concept2',
      type: 'concept',
      title: 'Multiplying Surds',
      content: [
        {
          type: 'text',
          content: 'Multiplication is easier - you CAN multiply different surds:',
        },
        {
          type: 'latex',
          content: '\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Special case',
          content: '√a × √a = √(a²) = a. The surd "cancels itself out!"',
        },
      ],
    },
    {
      id: 'su03-practice1',
      type: 'practice',
      title: 'Add These',
      content: [],
      question: {
        id: 'su03-q1',
        type: 'fill-blank',
        prompt: '√27 + √12 = [blank1]√3',
        blanks: [
          { id: 'blank1', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['5'],
        },
        hint: 'Simplify first: √27 = 3√3, √12 = 2√3',
        explanation: '√27 = √(9×3) = 3√3. √12 = √(4×3) = 2√3. So 3√3 + 2√3 = 5√3.',
        points: 15,
      },
    },
    {
      id: 'su03-practice2',
      type: 'practice',
      title: 'Multiply These',
      content: [],
      question: {
        id: 'su03-q2',
        type: 'numeric',
        prompt: 'Simplify: √6 × √24',
        correctAnswer: 12,
        tolerance: 0,
        hint: '√6 × √24 = √(6 × 24) = √144',
        explanation: '√6 × √24 = √(6 × 24) = √144 = 12',
        points: 15,
      },
    },
    {
      id: 'su03-practice3',
      type: 'practice',
      title: 'Expand This',
      content: [
        {
          type: 'text',
          content: 'Use FOIL to expand (2 + √3)(1 + √3)',
        },
      ],
      question: {
        id: 'su03-q3',
        type: 'fill-blank',
        prompt: '(2 + √3)(1 + √3) = [blank1] + [blank2]√3',
        blanks: [
          { id: 'blank1', placeholder: '?' },
          { id: 'blank2', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['5'],
          blank2: ['3'],
        },
        hint: 'FOIL: 2(1) + 2(√3) + √3(1) + √3(√3) = 2 + 2√3 + √3 + 3',
        explanation: '= 2 + 2√3 + √3 + 3 = (2+3) + (2+1)√3 = 5 + 3√3',
        points: 20,
      },
    },
    {
      id: 'su03-summary',
      type: 'summary',
      title: 'Operation Rules',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Remember',
          content: 'Add/subtract: same surds only (like fruit). Multiply: any surds work (roots combine under one √).',
        },
      ],
    },
  ],
  xpReward: 45,
};

// Lesson 4: Rationalizing the Denominator
export const LESSON_SURDS_04: Lesson = {
  id: 'surds-04-rationalizing',
  topicId: 'surds' as QuizTopic,
  title: 'Clearing the Roots',
  subtitle: 'Rationalizing denominators - the conjugate trick',
  description: 'Learn to eliminate surds from denominators',
  difficulty: 'advanced',
  estimatedTime: 10,
  prerequisites: ['surds-03-operations'],
  objectives: [
    'Rationalize simple surd denominators',
    'Use conjugates for complex denominators',
  ],
  steps: [
    {
      id: 'su04-hook',
      type: 'hook',
      title: 'Why Clean Up Denominators?',
      content: [
        {
          type: 'text',
          content: 'Mathematicians hate surds in denominators - they\'re messy and hard to compare. 1/√2 looks ugly, but √2/2 looks clean. Same value, nicer form! This "cleaning" process is called RATIONALIZING.',
        },
      ],
    },
    {
      id: 'su04-concept1',
      type: 'concept',
      title: 'Simple Case: Just √a',
      content: [
        {
          type: 'text',
          content: 'To rationalize 1/√a, multiply top and bottom by √a:',
        },
        {
          type: 'latex',
          content: '\\frac{1}{\\sqrt{a}} = \\frac{1}{\\sqrt{a}} \\times \\frac{\\sqrt{a}}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Why it works',
          content: '√a × √a = a. The surd disappears from the bottom!',
        },
      ],
    },
    {
      id: 'su04-practice1',
      type: 'practice',
      title: 'Simple Rationalization',
      content: [],
      question: {
        id: 'su04-q1',
        type: 'fill-blank',
        prompt: '3/√5 = [blank1]√5/[blank2]',
        blanks: [
          { id: 'blank1', placeholder: '?' },
          { id: 'blank2', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['3'],
          blank2: ['5'],
        },
        hint: 'Multiply top and bottom by √5',
        explanation: '3/√5 × √5/√5 = 3√5/5',
        points: 15,
      },
    },
    {
      id: 'su04-concept2',
      type: 'concept',
      title: 'The Conjugate Trick',
      content: [
        {
          type: 'text',
          content: 'For (a + √b) in denominator, multiply by the CONJUGATE: (a - √b)',
        },
        {
          type: 'latex',
          content: '(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b',
          display: true,
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Why conjugates work',
          content: 'This is the difference of squares! (x+y)(x-y) = x² - y². When y is a surd, y² becomes rational!',
        },
      ],
    },
    {
      id: 'su04-example',
      type: 'example',
      title: 'Conjugate Example',
      content: [
        {
          type: 'text',
          content: 'Rationalize: 1/(2 + √3)',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Find conjugate',
              content: 'Conjugate of (2 + √3) is (2 - √3)',
            },
            {
              title: 'Multiply',
              content: '1/(2+√3) × (2-√3)/(2-√3)',
              latex: '\\frac{1}{2+\\sqrt{3}} \\times \\frac{2-\\sqrt{3}}{2-\\sqrt{3}}',
            },
            {
              title: 'Simplify bottom',
              content: '(2+√3)(2-√3) = 4 - 3 = 1',
              latex: '(2+\\sqrt{3})(2-\\sqrt{3}) = 4 - 3 = 1',
            },
            {
              title: 'Final answer',
              content: '= (2 - √3)/1 = 2 - √3',
              latex: '= 2 - \\sqrt{3}',
            },
          ],
        },
      ],
    },
    {
      id: 'su04-practice2',
      type: 'practice',
      title: 'Use the Conjugate',
      content: [],
      question: {
        id: 'su04-q2',
        type: 'multiple-choice',
        prompt: 'Rationalize: 1/(3 - √2)',
        options: [
          { id: 'a', text: '(3 + √2)/7', latex: '\\frac{3+\\sqrt{2}}{7}' },
          { id: 'b', text: '(3 - √2)/7', latex: '\\frac{3-\\sqrt{2}}{7}' },
          { id: 'c', text: '(3 + √2)/11', latex: '\\frac{3+\\sqrt{2}}{11}' },
          { id: 'd', text: '(3 + √2)', latex: '3+\\sqrt{2}' },
        ],
        correctAnswer: 'a',
        hint: 'Conjugate of (3-√2) is (3+√2). Bottom becomes 9 - 2 = 7.',
        explanation: '1/(3-√2) × (3+√2)/(3+√2) = (3+√2)/(9-2) = (3+√2)/7',
        points: 20,
      },
    },
    {
      id: 'su04-summary',
      type: 'summary',
      title: 'Rationalization Mastery',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Simple √a',
              content: 'Multiply by √a/√a',
            },
            {
              title: 'Complex (a ± √b)',
              content: 'Multiply by conjugate: (a ∓ √b)/(a ∓ √b)',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 50,
};

// Module definition
export const MODULE_SURDS: LessonModule = {
  id: 'module-surds',
  topicId: 'surds' as QuizTopic,
  title: 'Surds',
  description: 'Master irrational roots and their operations',
  lessons: [
    'surds-01-intro',
    'surds-02-simplifying',
    'surds-03-operations',
    'surds-04-rationalizing',
  ],
  totalXP: 155,
};

// Export all lessons
export const SURDS_LESSONS: Lesson[] = [
  LESSON_SURDS_01,
  LESSON_SURDS_02,
  LESSON_SURDS_03,
  LESSON_SURDS_04,
];
