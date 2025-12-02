// Quadratic Equations & Functions - Lesson Content
// Topic A1: Complete bite-sized lessons for quadratics

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: Introduction to Quadratics - Real World Hook
export const LESSON_QUADRATICS_01: Lesson = {
  id: 'quadratics-01-intro',
  topicId: 'quadratic_equations' as QuizTopic,
  title: 'The Amazing Quadratic',
  subtitle: 'Why basketball players, engineers, and game designers all need quadratics',
  description: 'Discover why quadratic equations are everywhere in the real world',
  difficulty: 'foundation',
  estimatedTime: 5,
  objectives: [
    'Recognize quadratic patterns in real-world scenarios',
    'Understand the basic shape of a parabola',
  ],
  steps: [
    {
      id: 'q01-hook',
      type: 'hook',
      title: 'Every Shot Follows a Curve',
      content: [
        {
          type: 'text',
          content: 'When Stephen Curry launches a three-pointer, the ball follows a perfect mathematical curve. When SpaceX lands a rocket, they calculate that same curve. When Angry Birds fly through the air... you guessed it - it\'s the same math!',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'This curve has a name',
          content: 'It\'s called a PARABOLA, and the math behind it is called a QUADRATIC equation. Once you master this, you\'ll see parabolas everywhere!',
        },
      ],
    },
    {
      id: 'q01-visual',
      type: 'visual',
      title: 'The Parabola in Action',
      duration: 2,
      content: [
        {
          type: 'text',
          content: 'This is a parabola - the signature shape of every quadratic equation. Play with the slider to see how changing the equation changes the curve.',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Interactive Parabola',
            description: 'Adjust the slider to see the parabola change',
            expressions: [
              { latex: 'y=ax^2', color: '#06b6d4' },
              { latex: 'a=1' },
            ],
            bounds: { left: -10, right: 10, bottom: -5, top: 15 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'q01-concept',
      type: 'concept',
      title: 'What Makes It Quadratic?',
      content: [
        {
          type: 'text',
          content: 'A quadratic equation is any equation where the highest power of x is 2. That little "squared" is what creates the curved shape.',
        },
        {
          type: 'latex',
          content: 'y = ax^2 + bx + c',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Easy way to remember',
          content: '"Quadr" comes from the Latin word for "square" - like a square has 4 sides, quadratic has x² (x to the power of 2)!',
        },
      ],
    },
    {
      id: 'q01-quiz',
      type: 'quiz',
      title: 'Quick Check',
      content: [
        {
          type: 'text',
          content: 'Let\'s see if you can spot a quadratic equation!',
        },
      ],
      question: {
        id: 'q01-q1',
        type: 'multiple-choice',
        prompt: 'Which of these is a quadratic equation?',
        options: [
          { id: 'a', text: 'y = 3x + 5', latex: 'y = 3x + 5' },
          { id: 'b', text: 'y = x² - 4', latex: 'y = x^2 - 4' },
          { id: 'c', text: 'y = 2/x', latex: 'y = \\frac{2}{x}' },
          { id: 'd', text: 'y = x³ + 1', latex: 'y = x^3 + 1' },
        ],
        correctAnswer: 'b',
        hint: 'Look for the equation with x to the power of 2 (x²)',
        explanation: 'y = x² - 4 is quadratic because x is raised to the power of 2. The others have x to the power of 1, -1, or 3.',
        points: 10,
      },
    },
    {
      id: 'q01-summary',
      type: 'summary',
      title: 'What You Learned',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Parabolas are everywhere',
              content: 'From sports to rockets to video games, quadratic curves appear constantly in the real world.',
            },
            {
              title: 'The signature shape',
              content: 'Quadratic equations always produce a U-shaped curve called a parabola.',
            },
            {
              title: 'The key identifier',
              content: 'If the highest power of x is 2 (x²), it\'s a quadratic equation.',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 25,
};

// Lesson 2: Standard Form and Key Parts
export const LESSON_QUADRATICS_02: Lesson = {
  id: 'quadratics-02-standard-form',
  topicId: 'quadratic_equations' as QuizTopic,
  title: 'The Quadratic DNA',
  subtitle: 'Understanding a, b, and c - the building blocks of every quadratic',
  description: 'Learn how the coefficients a, b, and c shape every quadratic equation',
  difficulty: 'foundation',
  estimatedTime: 7,
  prerequisites: ['quadratics-01-intro'],
  objectives: [
    'Identify a, b, and c in standard form',
    'Understand how each coefficient affects the parabola',
  ],
  steps: [
    {
      id: 'q02-hook',
      type: 'hook',
      title: 'Three Numbers That Control Everything',
      content: [
        {
          type: 'text',
          content: 'Imagine you\'re a game designer creating the perfect projectile arc. With just THREE numbers, you can control exactly how high it goes, where it lands, and how fast it curves. These three numbers are called a, b, and c.',
        },
      ],
    },
    {
      id: 'q02-concept1',
      type: 'concept',
      title: 'Meet the Standard Form',
      content: [
        {
          type: 'latex',
          content: 'y = ax^2 + bx + c',
          display: true,
        },
        {
          type: 'text',
          content: 'Every quadratic can be written in this form. Let\'s decode what each letter means:',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'a - The Director',
              content: 'Controls whether the parabola opens up (a > 0) or down (a < 0), and how wide or narrow it is.',
            },
            {
              title: 'b - The Shifter',
              content: 'Moves the parabola left or right and affects where the vertex sits.',
            },
            {
              title: 'c - The Lifter',
              content: 'This is the y-intercept - where the parabola crosses the y-axis. It lifts the whole curve up or down.',
            },
          ],
        },
      ],
    },
    {
      id: 'q02-visual',
      type: 'visual',
      title: 'Play with a, b, and c',
      content: [
        {
          type: 'text',
          content: 'Use the sliders to see how each coefficient transforms the parabola. Try to make the parabola as wide as possible, then as narrow as possible!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Coefficient Explorer',
            description: 'Adjust a, b, and c to transform the parabola',
            expressions: [
              { latex: 'y=ax^2+bx+c', color: '#06b6d4' },
              { latex: 'a=1' },
              { latex: 'b=0' },
              { latex: 'c=0' },
              { latex: '(0,c)', color: '#ef4444' },
            ],
            bounds: { left: -10, right: 10, bottom: -10, top: 10 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'q02-practice1',
      type: 'practice',
      title: 'Identify the Coefficients',
      content: [
        {
          type: 'text',
          content: 'For the equation below, identify the values of a, b, and c.',
        },
        {
          type: 'latex',
          content: 'y = 2x^2 - 5x + 3',
          display: true,
        },
      ],
      question: {
        id: 'q02-q1',
        type: 'matching',
        prompt: 'Match each coefficient with its value:',
        leftItems: [
          { id: 'coef-a', text: 'a' },
          { id: 'coef-b', text: 'b' },
          { id: 'coef-c', text: 'c' },
        ],
        rightItems: [
          { id: 'val-2', text: '2' },
          { id: 'val-neg5', text: '-5' },
          { id: 'val-3', text: '3' },
        ],
        correctMatches: {
          'coef-a': 'val-2',
          'coef-b': 'val-neg5',
          'coef-c': 'val-3',
        },
        hint: 'Remember: a is the coefficient of x², b is the coefficient of x, and c is the constant term.',
        explanation: 'In y = 2x² - 5x + 3: a = 2 (coefficient of x²), b = -5 (coefficient of x, note the negative!), c = 3 (the constant).',
        points: 15,
      },
    },
    {
      id: 'q02-concept2',
      type: 'concept',
      title: 'The Sign of a is Crucial',
      content: [
        {
          type: 'callout',
          variant: 'warning',
          title: 'Most Important Rule',
          content: 'If a > 0 (positive), the parabola smiles (opens upward). If a < 0 (negative), the parabola frowns (opens downward).',
        },
        {
          type: 'text',
          content: 'Think of it like this: when you\'re happy (positive), you smile up. When you\'re negative, you frown down!',
        },
      ],
    },
    {
      id: 'q02-quiz',
      type: 'quiz',
      title: 'Quick Check',
      content: [],
      question: {
        id: 'q02-q2',
        type: 'true-false',
        prompt: 'The parabola y = -3x² + 2x - 1 opens downward.',
        correctAnswer: true,
        hint: 'Check the sign of a (the coefficient of x²).',
        explanation: 'Since a = -3 (negative), the parabola opens downward. The negative coefficient makes it "frown".',
        points: 10,
      },
    },
    {
      id: 'q02-practice2',
      type: 'practice',
      title: 'Find the y-intercept',
      content: [
        {
          type: 'text',
          content: 'The y-intercept is where the parabola crosses the y-axis. This happens when x = 0.',
        },
      ],
      question: {
        id: 'q02-q3',
        type: 'numeric',
        prompt: 'What is the y-intercept of y = x² + 4x - 7?',
        correctAnswer: -7,
        tolerance: 0,
        hint: 'When x = 0, what is y? (Substitute x = 0 into the equation)',
        explanation: 'When x = 0: y = (0)² + 4(0) - 7 = -7. The y-intercept is always equal to c!',
        points: 10,
      },
    },
    {
      id: 'q02-summary',
      type: 'summary',
      title: 'Coefficient Mastery',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Standard Form',
              content: 'y = ax² + bx + c is the standard form of a quadratic equation.',
              latex: 'y = ax^2 + bx + c',
            },
            {
              title: 'The a coefficient',
              content: 'Controls direction (positive = up, negative = down) and width of the parabola.',
            },
            {
              title: 'The c coefficient',
              content: 'Is always the y-intercept - where the parabola crosses the y-axis.',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 35,
};

// Lesson 3: Solving by Factoring
export const LESSON_QUADRATICS_03: Lesson = {
  id: 'quadratics-03-factoring',
  topicId: 'quadratic_equations' as QuizTopic,
  title: 'Cracking the Code: Factoring',
  subtitle: 'The elegant art of breaking quadratics into simpler pieces',
  description: 'Learn to solve quadratic equations by factoring',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['quadratics-02-standard-form'],
  objectives: [
    'Factor simple quadratic expressions',
    'Use the zero product property to solve equations',
    'Find roots/x-intercepts of quadratic equations',
  ],
  steps: [
    {
      id: 'q03-hook',
      type: 'hook',
      title: 'Reverse Engineering',
      content: [
        {
          type: 'text',
          content: 'Imagine you\'re a detective, and you found this clue: x² + 5x + 6. Your job is to figure out what two expressions were multiplied together to create this. This is factoring - working backwards to find the original pieces!',
        },
        {
          type: 'latex',
          content: 'x^2 + 5x + 6 = (\\text{?})(\\text{?})',
          display: true,
        },
      ],
    },
    {
      id: 'q03-concept1',
      type: 'concept',
      title: 'The Zero Product Property',
      content: [
        {
          type: 'text',
          content: 'Here\'s a powerful rule: if two things multiply to give zero, at least one of them MUST be zero.',
        },
        {
          type: 'latex',
          content: '\\text{If } ab = 0 \\text{, then } a = 0 \\text{ or } b = 0',
          display: true,
        },
        {
          type: 'callout',
          variant: 'example',
          content: 'Think about it: 5 × 0 = 0, 0 × 7 = 0, 0 × 0 = 0. There\'s no way to multiply two non-zero numbers and get zero!',
        },
      ],
    },
    {
      id: 'q03-concept2',
      type: 'concept',
      title: 'The Factoring Method',
      content: [
        {
          type: 'text',
          content: 'For x² + bx + c, we need two numbers that:',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'ADD to give b',
              content: 'The two numbers must add up to the coefficient of x.',
            },
            {
              title: 'MULTIPLY to give c',
              content: 'The same two numbers must multiply to give the constant term.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory trick',
          content: '"Sum and Product" - find numbers with the right Sum (for b) and Product (for c).',
        },
      ],
    },
    {
      id: 'q03-example',
      type: 'example',
      title: 'Worked Example',
      content: [
        {
          type: 'text',
          content: 'Let\'s factor and solve: x² + 5x + 6 = 0',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Find two numbers',
              content: 'Need numbers that: ADD to 5, MULTIPLY to 6. Those numbers are 2 and 3!',
              latex: '2 + 3 = 5 \\text{ and } 2 \\times 3 = 6',
            },
            {
              title: 'Write in factored form',
              content: 'Put each number in a bracket with x.',
              latex: 'x^2 + 5x + 6 = (x + 2)(x + 3)',
            },
            {
              title: 'Set each factor to zero',
              content: 'Use the zero product property.',
              latex: '(x + 2) = 0 \\text{ or } (x + 3) = 0',
            },
            {
              title: 'Solve each equation',
              content: 'Find the values of x.',
              latex: 'x = -2 \\text{ or } x = -3',
            },
          ],
        },
      ],
    },
    {
      id: 'q03-practice1',
      type: 'practice',
      title: 'Your Turn',
      content: [
        {
          type: 'text',
          content: 'Factor x² + 7x + 12',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Find two numbers that ADD to 7 and MULTIPLY to 12.',
        },
      ],
      question: {
        id: 'q03-q1',
        type: 'fill-blank',
        prompt: 'x² + 7x + 12 = (x + [blank1])(x + [blank2])',
        blanks: [
          { id: 'blank1', placeholder: '?' },
          { id: 'blank2', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['3', '4'],
          blank2: ['4', '3'],
        },
        hint: 'What two numbers add to 7 and multiply to 12?',
        explanation: '3 + 4 = 7 and 3 × 4 = 12, so x² + 7x + 12 = (x + 3)(x + 4)',
        points: 15,
      },
    },
    {
      id: 'q03-visual',
      type: 'visual',
      title: 'See the Roots',
      content: [
        {
          type: 'text',
          content: 'The solutions (roots) are where the parabola crosses the x-axis. When we solve x² + 5x + 6 = 0, we find x = -2 and x = -3. Look at where the curve crosses!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Roots Visualization',
            description: 'The parabola crosses the x-axis at the solutions',
            expressions: [
              { latex: 'y=x^2+5x+6', color: '#06b6d4' },
              { latex: '(-2,0)', color: '#ef4444' },
              { latex: '(-3,0)', color: '#ef4444' },
            ],
            bounds: { left: -6, right: 2, bottom: -2, top: 8 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'q03-practice2',
      type: 'practice',
      title: 'Solve by Factoring',
      content: [
        {
          type: 'text',
          content: 'Solve: x² - 9 = 0',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Special pattern',
          content: 'This is a "difference of squares": a² - b² = (a+b)(a-b)',
        },
      ],
      question: {
        id: 'q03-q2',
        type: 'multiple-select',
        prompt: 'Select ALL the solutions to x² - 9 = 0',
        options: [
          { id: 'a', text: 'x = 3' },
          { id: 'b', text: 'x = -3' },
          { id: 'c', text: 'x = 9' },
          { id: 'd', text: 'x = -9' },
        ],
        correctAnswers: ['a', 'b'],
        hint: 'x² - 9 = (x + 3)(x - 3). What makes each factor equal to zero?',
        explanation: 'x² - 9 = (x+3)(x-3) = 0. Setting each factor to zero: x + 3 = 0 gives x = -3, and x - 3 = 0 gives x = 3.',
        points: 15,
      },
    },
    {
      id: 'q03-quiz',
      type: 'quiz',
      title: 'Final Challenge',
      content: [],
      question: {
        id: 'q03-q3',
        type: 'ordering',
        prompt: 'Put these steps in order to solve x² + 2x - 15 = 0 by factoring:',
        items: [
          { id: 'step1', text: 'Find numbers that add to 2 and multiply to -15' },
          { id: 'step2', text: 'Write the equation in standard form' },
          { id: 'step3', text: 'Set each factor equal to zero' },
          { id: 'step4', text: 'Write in factored form: (x + 5)(x - 3) = 0' },
          { id: 'step5', text: 'Solve: x = -5 or x = 3' },
        ],
        correctOrder: ['step2', 'step1', 'step4', 'step3', 'step5'],
        hint: 'Start with the standard form, then find the factors, then solve.',
        explanation: 'First ensure standard form, then find the two numbers (5 and -3), write the factored form, apply zero product property, then solve each equation.',
        points: 20,
      },
    },
    {
      id: 'q03-summary',
      type: 'summary',
      title: 'Factoring Mastery',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Zero Product Property',
              content: 'If ab = 0, then a = 0 or b = 0.',
            },
            {
              title: 'Sum and Product Method',
              content: 'For x² + bx + c, find numbers that add to b and multiply to c.',
            },
            {
              title: 'Difference of Squares',
              content: 'a² - b² = (a + b)(a - b) is a special pattern.',
              latex: 'a^2 - b^2 = (a+b)(a-b)',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 50,
};

// Lesson 4: The Quadratic Formula
export const LESSON_QUADRATICS_04: Lesson = {
  id: 'quadratics-04-formula',
  topicId: 'quadratic_equations' as QuizTopic,
  title: 'The Ultimate Weapon',
  subtitle: 'The quadratic formula - solves EVERY quadratic equation',
  description: 'Master the quadratic formula for solving any quadratic equation',
  difficulty: 'intermediate',
  estimatedTime: 12,
  prerequisites: ['quadratics-03-factoring'],
  objectives: [
    'Memorize and apply the quadratic formula',
    'Calculate the discriminant and interpret its meaning',
    'Determine the nature of roots',
  ],
  steps: [
    {
      id: 'q04-hook',
      type: 'hook',
      title: 'The Swiss Army Knife of Math',
      content: [
        {
          type: 'text',
          content: 'What if I told you there\'s ONE formula that can solve ANY quadratic equation, no matter how ugly? Equations that can\'t be factored? No problem. Irrational answers? Handles it. This is the quadratic formula - and once you master it, no quadratic can defeat you.',
        },
      ],
    },
    {
      id: 'q04-concept1',
      type: 'concept',
      title: 'The Quadratic Formula',
      content: [
        {
          type: 'latex',
          content: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
          display: true,
        },
        {
          type: 'text',
          content: 'This formula works for any equation ax² + bx + c = 0. Just plug in the values of a, b, and c!',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory Song',
          content: '"Negative b, plus or minus the square root, of b squared minus four a c, all over two a!" (Sing it to "Pop Goes the Weasel")',
        },
      ],
    },
    {
      id: 'q04-concept2',
      type: 'concept',
      title: 'The Discriminant - Your Crystal Ball',
      content: [
        {
          type: 'text',
          content: 'The expression under the square root has a special name: the DISCRIMINANT.',
        },
        {
          type: 'latex',
          content: 'D = b^2 - 4ac',
          display: true,
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'D > 0 (Positive)',
              content: '2 distinct real roots - the parabola crosses the x-axis twice',
            },
            {
              title: 'D = 0 (Zero)',
              content: '1 repeated root - the parabola touches the x-axis exactly once',
            },
            {
              title: 'D < 0 (Negative)',
              content: 'No real roots - the parabola never touches the x-axis',
            },
          ],
        },
      ],
    },
    {
      id: 'q04-visual',
      type: 'visual',
      title: 'See the Discriminant in Action',
      content: [
        {
          type: 'text',
          content: 'Move the slider to change c and watch how the discriminant affects the number of roots.',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Discriminant Explorer',
            description: 'See how the discriminant determines the number of roots',
            expressions: [
              { latex: 'y=x^2-4x+c', color: '#06b6d4' },
              { latex: 'c=3' },
              { latex: 'D=16-4c', color: '#ef4444' },
            ],
            bounds: { left: -2, right: 6, bottom: -5, top: 10 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'q04-example',
      type: 'example',
      title: 'Worked Example',
      content: [
        {
          type: 'text',
          content: 'Solve: 2x² - 4x - 6 = 0',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Identify a, b, c',
              content: 'a = 2, b = -4, c = -6',
            },
            {
              title: 'Calculate discriminant',
              content: 'D = (-4)² - 4(2)(-6) = 16 + 48 = 64',
              latex: 'D = (-4)^2 - 4(2)(-6) = 64',
            },
            {
              title: 'Apply formula',
              content: 'Substitute into the formula',
              latex: 'x = \\frac{-(-4) \\pm \\sqrt{64}}{2(2)} = \\frac{4 \\pm 8}{4}',
            },
            {
              title: 'Find both solutions',
              content: 'x = (4+8)/4 = 3 or x = (4-8)/4 = -1',
              latex: 'x = 3 \\text{ or } x = -1',
            },
          ],
        },
      ],
    },
    {
      id: 'q04-practice1',
      type: 'practice',
      title: 'Calculate the Discriminant',
      content: [
        {
          type: 'text',
          content: 'For the equation x² + 6x + 9 = 0, calculate the discriminant.',
        },
      ],
      question: {
        id: 'q04-q1',
        type: 'numeric',
        prompt: 'What is the discriminant of x² + 6x + 9 = 0?',
        correctAnswer: 0,
        tolerance: 0,
        hint: 'D = b² - 4ac. Here a=1, b=6, c=9.',
        explanation: 'D = 6² - 4(1)(9) = 36 - 36 = 0. This means the equation has exactly one repeated root!',
        points: 15,
      },
    },
    {
      id: 'q04-quiz1',
      type: 'quiz',
      title: 'Nature of Roots',
      content: [],
      question: {
        id: 'q04-q2',
        type: 'multiple-choice',
        prompt: 'If the discriminant of a quadratic equation is negative, the equation has:',
        options: [
          { id: 'a', text: 'Two distinct real roots' },
          { id: 'b', text: 'One repeated real root' },
          { id: 'c', text: 'No real roots' },
          { id: 'd', text: 'Three real roots' },
        ],
        correctAnswer: 'c',
        hint: 'Can you take the square root of a negative number (in real numbers)?',
        explanation: 'When D < 0, we would need to take the square root of a negative number, which has no real solution. The parabola doesn\'t cross the x-axis.',
        points: 10,
      },
    },
    {
      id: 'q04-practice2',
      type: 'practice',
      title: 'Solve Using the Formula',
      content: [
        {
          type: 'text',
          content: 'Solve: x² - 2x - 8 = 0 using the quadratic formula.',
        },
      ],
      question: {
        id: 'q04-q3',
        type: 'multiple-select',
        prompt: 'Select ALL solutions to x² - 2x - 8 = 0',
        options: [
          { id: 'a', text: 'x = 4', latex: 'x = 4' },
          { id: 'b', text: 'x = -2', latex: 'x = -2' },
          { id: 'c', text: 'x = 2', latex: 'x = 2' },
          { id: 'd', text: 'x = -4', latex: 'x = -4' },
        ],
        correctAnswers: ['a', 'b'],
        hint: 'a=1, b=-2, c=-8. Calculate D first, then use the formula.',
        explanation: 'D = 4 + 32 = 36. x = (2 ± 6)/2. So x = 8/2 = 4 or x = -4/2 = -2.',
        points: 20,
      },
    },
    {
      id: 'q04-summary',
      type: 'summary',
      title: 'Formula Mastery',
      content: [
        {
          type: 'latex',
          content: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
          display: true,
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Works for everything',
              content: 'The quadratic formula solves any quadratic equation.',
            },
            {
              title: 'The Discriminant',
              content: 'D = b² - 4ac tells you the nature of the roots before solving.',
            },
            {
              title: 'Interpret the result',
              content: 'D > 0 means 2 roots, D = 0 means 1 root, D < 0 means no real roots.',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 60,
};

// Lesson 5: Completing the Square
export const LESSON_QUADRATICS_05: Lesson = {
  id: 'quadratics-05-completing-square',
  topicId: 'quadratic_equations' as QuizTopic,
  title: 'The Perfect Square Trick',
  subtitle: 'Completing the square - unlocking vertex form',
  description: 'Learn to complete the square and convert to vertex form',
  difficulty: 'advanced',
  estimatedTime: 12,
  prerequisites: ['quadratics-04-formula'],
  objectives: [
    'Complete the square for any quadratic expression',
    'Convert between standard form and vertex form',
    'Find the vertex of a parabola',
  ],
  steps: [
    {
      id: 'q05-hook',
      type: 'hook',
      title: 'The Hidden Pattern',
      content: [
        {
          type: 'text',
          content: 'Ever notice that (x + 3)² = x² + 6x + 9? The 9 isn\'t random - it\'s (6/2)² = 9. This pattern lets us rewrite ANY quadratic as a perfect square plus a number. It\'s called "completing the square" and it\'s how the quadratic formula was actually discovered!',
        },
      ],
    },
    {
      id: 'q05-concept1',
      type: 'concept',
      title: 'Perfect Squares',
      content: [
        {
          type: 'text',
          content: 'A perfect square trinomial has a special form:',
        },
        {
          type: 'latex',
          content: '(x + k)^2 = x^2 + 2kx + k^2',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Secret',
          content: 'The constant term is always (half the x-coefficient) squared!',
        },
      ],
    },
    {
      id: 'q05-concept2',
      type: 'concept',
      title: 'The Method',
      content: [
        {
          type: 'text',
          content: 'To complete the square for x² + bx:',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Take half of b',
              content: 'Calculate b/2',
            },
            {
              title: 'Square it',
              content: 'Calculate (b/2)²',
            },
            {
              title: 'Add and subtract',
              content: 'Add (b/2)² to make a perfect square, but subtract it too to keep the expression equal',
              latex: 'x^2 + bx = (x + \\frac{b}{2})^2 - (\\frac{b}{2})^2',
            },
          ],
        },
      ],
    },
    {
      id: 'q05-example',
      type: 'example',
      title: 'Worked Example',
      content: [
        {
          type: 'text',
          content: 'Complete the square: x² + 6x + 5',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Half of 6 is 3',
              content: 'b/2 = 6/2 = 3',
            },
            {
              title: 'Square it: 9',
              content: '(b/2)² = 3² = 9',
            },
            {
              title: 'Rewrite',
              content: 'x² + 6x + 5 = (x² + 6x + 9) - 9 + 5',
              latex: 'x^2 + 6x + 5 = (x^2 + 6x + 9) - 9 + 5',
            },
            {
              title: 'Simplify',
              content: '= (x + 3)² - 4',
              latex: '= (x + 3)^2 - 4',
            },
          ],
        },
      ],
    },
    {
      id: 'q05-practice1',
      type: 'practice',
      title: 'Complete the Square',
      content: [
        {
          type: 'text',
          content: 'Complete the square for x² + 8x',
        },
      ],
      question: {
        id: 'q05-q1',
        type: 'fill-blank',
        prompt: 'x² + 8x = (x + [blank1])² - [blank2]',
        blanks: [
          { id: 'blank1', placeholder: '?' },
          { id: 'blank2', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['4'],
          blank2: ['16'],
        },
        hint: 'Half of 8 is 4. What is 4 squared?',
        explanation: 'Half of 8 is 4, and 4² = 16. So x² + 8x = (x + 4)² - 16',
        points: 15,
      },
    },
    {
      id: 'q05-concept3',
      type: 'concept',
      title: 'Vertex Form',
      content: [
        {
          type: 'text',
          content: 'Completing the square converts a quadratic to VERTEX FORM:',
        },
        {
          type: 'latex',
          content: 'y = a(x - h)^2 + k',
          display: true,
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'The Vertex',
          content: 'In this form, the vertex is at the point (h, k). This is the maximum or minimum point of the parabola!',
        },
      ],
    },
    {
      id: 'q05-visual',
      type: 'visual',
      title: 'Finding the Vertex',
      content: [
        {
          type: 'text',
          content: 'The vertex is the turning point of the parabola. Try moving h and k to see how they control the vertex position.',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Vertex Form Explorer',
            description: 'Move h and k to control the vertex',
            expressions: [
              { latex: 'y=(x-h)^2+k', color: '#06b6d4' },
              { latex: 'h=2' },
              { latex: 'k=-3' },
              { latex: '(h,k)', color: '#ef4444' },
            ],
            bounds: { left: -5, right: 8, bottom: -8, top: 5 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'q05-practice2',
      type: 'practice',
      title: 'Find the Vertex',
      content: [
        {
          type: 'text',
          content: 'Given y = (x - 3)² + 5, what is the vertex?',
        },
      ],
      question: {
        id: 'q05-q2',
        type: 'multiple-choice',
        prompt: 'The vertex of y = (x - 3)² + 5 is:',
        options: [
          { id: 'a', text: '(3, 5)' },
          { id: 'b', text: '(-3, 5)' },
          { id: 'c', text: '(3, -5)' },
          { id: 'd', text: '(-3, -5)' },
        ],
        correctAnswer: 'a',
        hint: 'In y = (x - h)² + k, the vertex is (h, k). What values make the square equal to zero?',
        explanation: 'Comparing with y = (x - h)² + k, we have h = 3 and k = 5. The vertex is (3, 5).',
        points: 10,
      },
    },
    {
      id: 'q05-quiz',
      type: 'quiz',
      title: 'Master Challenge',
      content: [
        {
          type: 'text',
          content: 'Convert y = x² - 4x + 7 to vertex form to find the vertex.',
        },
      ],
      question: {
        id: 'q05-q3',
        type: 'multiple-choice',
        prompt: 'The vertex of y = x² - 4x + 7 is:',
        options: [
          { id: 'a', text: '(2, 3)', latex: '(2, 3)' },
          { id: 'b', text: '(-2, 3)', latex: '(-2, 3)' },
          { id: 'c', text: '(2, -3)', latex: '(2, -3)' },
          { id: 'd', text: '(-2, -3)', latex: '(-2, -3)' },
        ],
        correctAnswer: 'a',
        hint: 'Complete the square: x² - 4x = (x - 2)² - 4',
        explanation: 'x² - 4x + 7 = (x² - 4x + 4) - 4 + 7 = (x - 2)² + 3. Vertex is (2, 3).',
        points: 20,
      },
    },
    {
      id: 'q05-summary',
      type: 'summary',
      title: 'Completing the Square Mastery',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'The Process',
              content: 'Add and subtract (b/2)² to create a perfect square.',
            },
            {
              title: 'Vertex Form',
              content: 'y = a(x - h)² + k has vertex at (h, k).',
              latex: 'y = a(x - h)^2 + k',
            },
            {
              title: 'Quick vertex',
              content: 'For ax² + bx + c, vertex x-coordinate is -b/(2a).',
              latex: 'x_{vertex} = -\\frac{b}{2a}',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 60,
};

// Module definition
export const MODULE_QUADRATICS: LessonModule = {
  id: 'module-quadratics',
  topicId: 'quadratic_equations' as QuizTopic,
  title: 'Quadratic Equations & Functions',
  description: 'Master quadratic equations from basics to advanced techniques',
  lessons: [
    'quadratics-01-intro',
    'quadratics-02-standard-form',
    'quadratics-03-factoring',
    'quadratics-04-formula',
    'quadratics-05-completing-square',
  ],
  totalXP: 230,
};

// Export all lessons
export const QUADRATIC_LESSONS: Lesson[] = [
  LESSON_QUADRATICS_01,
  LESSON_QUADRATICS_02,
  LESSON_QUADRATICS_03,
  LESSON_QUADRATICS_04,
  LESSON_QUADRATICS_05,
];
