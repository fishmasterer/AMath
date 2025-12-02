// Equations & Inequalities - Lesson Content
// Topic A2: Engaging lessons with memory retention techniques

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: The Power of Equations - Hook & Modulus Intro
export const LESSON_EQ_01: Lesson = {
  id: 'equations-01-intro',
  topicId: 'equations_and_inequalities' as QuizTopic,
  title: 'Equations Are Superpowers',
  subtitle: 'How Netflix, Uber, and your phone use equations every second',
  description: 'Discover the hidden equations running the modern world',
  difficulty: 'foundation',
  estimatedTime: 6,
  objectives: [
    'Understand what modulus (absolute value) represents',
    'Visualize modulus as distance from zero',
  ],
  steps: [
    {
      id: 'eq01-hook',
      type: 'hook',
      title: 'The Algorithm Behind Everything',
      content: [
        {
          type: 'text',
          content: 'When Uber calculates your fare, it doesn\'t care if you went 5km NORTH or 5km SOUTH - it\'s still 5km. When your phone measures signal strength, it doesn\'t matter if it\'s +3dB or -3dB deviation - the "amount" of change is what matters.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'This is called ABSOLUTE VALUE',
          content: 'Written as |x|, it gives you the "size" or "magnitude" of a number, ignoring whether it\'s positive or negative. It\'s like asking "how far from zero?" instead of "which direction?"',
        },
      ],
    },
    {
      id: 'eq01-concept1',
      type: 'concept',
      title: 'Distance From Zero',
      content: [
        {
          type: 'text',
          content: 'Think of the number line as a street. Zero is your house. |5| asks "how far is 5 from my house?" Answer: 5 steps. |-5| asks "how far is -5 from my house?" Answer: also 5 steps!',
        },
        {
          type: 'latex',
          content: '|5| = 5 \\quad \\text{and} \\quad |-5| = 5',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory anchor',
          content: 'Absolute value = "How many steps from home?" The direction doesn\'t matter, only the distance.',
        },
      ],
    },
    {
      id: 'eq01-visual',
      type: 'visual',
      title: 'See It On The Number Line',
      content: [
        {
          type: 'text',
          content: 'Drag the point and watch how |x| is always positive - it\'s measuring DISTANCE, and distance can\'t be negative!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Absolute Value Visualizer',
            description: 'See how |x| works',
            expressions: [
              { latex: 'y=|x|', color: '#06b6d4' },
              { latex: 'y=x', color: '#ef4444' },
              { latex: '(a, |a|)', color: '#22c55e' },
              { latex: 'a=2' },
            ],
            bounds: { left: -6, right: 6, bottom: -2, top: 6 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'eq01-quiz1',
      type: 'quiz',
      title: 'Quick Check',
      content: [],
      question: {
        id: 'eq01-q1',
        type: 'numeric',
        prompt: 'What is |-7|?',
        correctAnswer: 7,
        tolerance: 0,
        hint: 'How far is -7 from zero?',
        explanation: '|-7| = 7. The absolute value strips away the negative sign because we\'re measuring distance, not direction.',
        points: 10,
      },
    },
    {
      id: 'eq01-practice',
      type: 'practice',
      title: 'Pattern Recognition',
      content: [],
      question: {
        id: 'eq01-q2',
        type: 'matching',
        prompt: 'Match each expression with its value:',
        leftItems: [
          { id: 'a', text: '|3|' },
          { id: 'b', text: '|-3|' },
          { id: 'c', text: '|0|' },
          { id: 'd', text: '|-10|' },
        ],
        rightItems: [
          { id: 'v0', text: '0' },
          { id: 'v3', text: '3' },
          { id: 'v10', text: '10' },
        ],
        correctMatches: { a: 'v3', b: 'v3', c: 'v0', d: 'v10' },
        hint: 'Remember: absolute value = distance from zero',
        explanation: '|3| = |-3| = 3 (both are 3 steps from zero). |0| = 0 (zero is zero steps from itself!). |-10| = 10.',
        points: 15,
      },
    },
    {
      id: 'eq01-summary',
      type: 'summary',
      title: 'Lock It In',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory Palace',
          content: 'Picture yourself at HOME (zero). |x| asks "how many steps to reach x?" Whether x is to your left (negative) or right (positive), you count the same number of steps.',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Key Insight',
              content: 'Absolute value measures magnitude (size), not direction.',
            },
            {
              title: 'Visual Shape',
              content: 'y = |x| makes a V-shape that bounces off the x-axis.',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 25,
};

// Lesson 2: Solving Modulus Equations
export const LESSON_EQ_02: Lesson = {
  id: 'equations-02-modulus-equations',
  topicId: 'equations_and_inequalities' as QuizTopic,
  title: 'Cracking the Modulus Code',
  subtitle: 'The two-case method that solves every modulus equation',
  description: 'Learn the systematic approach to solving |expression| = value',
  difficulty: 'intermediate',
  estimatedTime: 8,
  prerequisites: ['equations-01-intro'],
  objectives: [
    'Solve equations of the form |ax + b| = c',
    'Understand why modulus equations have two cases',
  ],
  steps: [
    {
      id: 'eq02-hook',
      type: 'hook',
      title: 'Two Roads to Rome',
      content: [
        {
          type: 'text',
          content: 'If I tell you "I walked 5km from home," you can\'t tell WHERE I ended up - I could be 5km to the EAST or 5km to the WEST. Same distance, different positions. This is why |x| = 5 has TWO solutions!',
        },
        {
          type: 'latex',
          content: '|x| = 5 \\implies x = 5 \\text{ or } x = -5',
          display: true,
        },
      ],
    },
    {
      id: 'eq02-concept',
      type: 'concept',
      title: 'The Two-Case Method',
      content: [
        {
          type: 'text',
          content: 'To solve |something| = k (where k ≥ 0):',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Case 1: The "something" is positive',
              content: 'Set something = k (remove the bars)',
            },
            {
              title: 'Case 2: The "something" is negative',
              content: 'Set something = -k (flip the sign)',
            },
            {
              title: 'Solve both cases',
              content: 'You might get two answers, one answer, or no answers!',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Watch out!',
          content: 'If |something| = negative number, there\'s NO solution. Distance can\'t be negative!',
        },
      ],
    },
    {
      id: 'eq02-example',
      type: 'example',
      title: 'Worked Example',
      content: [
        {
          type: 'text',
          content: 'Solve: |2x - 3| = 7',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Case 1: 2x - 3 = 7',
              content: '2x = 10, so x = 5',
              latex: '2x - 3 = 7 \\implies x = 5',
            },
            {
              title: 'Case 2: 2x - 3 = -7',
              content: '2x = -4, so x = -2',
              latex: '2x - 3 = -7 \\implies x = -2',
            },
            {
              title: 'Verify',
              content: '|2(5) - 3| = |7| = 7 ✓ and |2(-2) - 3| = |-7| = 7 ✓',
            },
          ],
        },
      ],
    },
    {
      id: 'eq02-visual',
      type: 'visual',
      title: 'See Both Solutions',
      content: [
        {
          type: 'text',
          content: 'The V-shaped graph of y = |2x - 3| intersects y = 7 at EXACTLY two points!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Graphical Solution',
            description: 'Where does |2x-3| equal 7?',
            expressions: [
              { latex: 'y=|2x-3|', color: '#06b6d4' },
              { latex: 'y=7', color: '#ef4444' },
              { latex: '(5, 7)', color: '#22c55e' },
              { latex: '(-2, 7)', color: '#22c55e' },
            ],
            bounds: { left: -5, right: 8, bottom: -1, top: 12 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'eq02-practice1',
      type: 'practice',
      title: 'Your Turn',
      content: [
        {
          type: 'text',
          content: 'Solve: |x + 4| = 9',
        },
      ],
      question: {
        id: 'eq02-q1',
        type: 'multiple-select',
        prompt: 'Select ALL solutions to |x + 4| = 9',
        options: [
          { id: 'a', text: 'x = 5' },
          { id: 'b', text: 'x = -5' },
          { id: 'c', text: 'x = 13' },
          { id: 'd', text: 'x = -13' },
        ],
        correctAnswers: ['a', 'd'],
        hint: 'Case 1: x + 4 = 9. Case 2: x + 4 = -9. Solve both!',
        explanation: 'x + 4 = 9 gives x = 5. x + 4 = -9 gives x = -13. So x = 5 or x = -13.',
        points: 15,
      },
    },
    {
      id: 'eq02-practice2',
      type: 'practice',
      title: 'Tricky One',
      content: [],
      question: {
        id: 'eq02-q2',
        type: 'multiple-choice',
        prompt: 'How many solutions does |x - 2| = -3 have?',
        options: [
          { id: 'a', text: '0 solutions' },
          { id: 'b', text: '1 solution' },
          { id: 'c', text: '2 solutions' },
          { id: 'd', text: 'Infinite solutions' },
        ],
        correctAnswer: 'a',
        hint: 'Can absolute value ever be negative?',
        explanation: 'Absolute value is ALWAYS ≥ 0. It can never equal -3, so there are NO solutions!',
        points: 10,
      },
    },
    {
      id: 'eq02-summary',
      type: 'summary',
      title: 'Method Locked In',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Mantra',
          content: '"Two cases, two chances!" When you see |stuff| = k, write stuff = k AND stuff = -k, then solve both.',
        },
      ],
    },
  ],
  xpReward: 35,
};

// Lesson 3: Modulus Inequalities
export const LESSON_EQ_03: Lesson = {
  id: 'equations-03-modulus-inequalities',
  topicId: 'equations_and_inequalities' as QuizTopic,
  title: 'Inside or Outside the Zone',
  subtitle: 'Modulus inequalities - the fence analogy',
  description: 'Master |x| < a and |x| > a with visual intuition',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['equations-02-modulus-equations'],
  objectives: [
    'Solve inequalities of the form |x| < a and |x| > a',
    'Interpret solutions as intervals on the number line',
  ],
  steps: [
    {
      id: 'eq03-hook',
      type: 'hook',
      title: 'The Security Zone',
      content: [
        {
          type: 'text',
          content: 'Imagine a VIP standing at position 0, with security guards positioned 5 meters away in each direction. |x| < 5 means "inside the security zone" (between the guards). |x| > 5 means "outside the security zone" (beyond the guards).',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Visual Memory Trick',
          content: '"Less than" = INSIDE the fence (sandwiched between -a and a). "Greater than" = OUTSIDE the fence (beyond -a or beyond a).',
        },
      ],
    },
    {
      id: 'eq03-concept1',
      type: 'concept',
      title: 'The Two Rules',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: '|x| < a means "inside"',
              content: '-a < x < a (x is sandwiched)',
              latex: '|x| < a \\iff -a < x < a',
            },
            {
              title: '|x| > a means "outside"',
              content: 'x < -a OR x > a (x is beyond)',
              latex: '|x| > a \\iff x < -a \\text{ or } x > a',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory hook',
          content: '"Less = bLess (blessed) to be inside, safe and sound." "Greater = Got to get away, run outside!"',
        },
      ],
    },
    {
      id: 'eq03-visual',
      type: 'visual',
      title: 'See the Zones',
      content: [
        {
          type: 'text',
          content: 'The shaded region shows where |x| < 3 (inside) vs |x| > 3 (outside). Toggle between them!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Inside vs Outside',
            description: 'Visualize modulus inequalities',
            expressions: [
              { latex: 'y=|x|', color: '#06b6d4' },
              { latex: 'y=3', color: '#ef4444' },
              { latex: '-3<x<3 \\{0<y<3\\}', color: '#22c55e' },
            ],
            bounds: { left: -6, right: 6, bottom: -1, top: 6 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'eq03-example',
      type: 'example',
      title: 'Worked Example',
      content: [
        {
          type: 'text',
          content: 'Solve: |2x - 1| < 5',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Apply "inside" rule',
              content: '-5 < 2x - 1 < 5',
              latex: '-5 < 2x - 1 < 5',
            },
            {
              title: 'Add 1 to all parts',
              content: '-4 < 2x < 6',
              latex: '-4 < 2x < 6',
            },
            {
              title: 'Divide all by 2',
              content: '-2 < x < 3',
              latex: '-2 < x < 3',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'example',
          content: 'Answer: x is between -2 and 3 (not including -2 and 3)',
        },
      ],
    },
    {
      id: 'eq03-practice1',
      type: 'practice',
      title: 'Inside the Zone',
      content: [],
      question: {
        id: 'eq03-q1',
        type: 'multiple-choice',
        prompt: 'Solve |x - 3| < 4. What is the solution?',
        options: [
          { id: 'a', text: '-1 < x < 7' },
          { id: 'b', text: 'x < -1 or x > 7' },
          { id: 'c', text: '-7 < x < 1' },
          { id: 'd', text: 'x < 7' },
        ],
        correctAnswer: 'a',
        hint: '|x - 3| < 4 means -4 < x - 3 < 4. Add 3 to all parts.',
        explanation: '-4 < x - 3 < 4, so -4 + 3 < x < 4 + 3, giving -1 < x < 7.',
        points: 15,
      },
    },
    {
      id: 'eq03-practice2',
      type: 'practice',
      title: 'Outside the Zone',
      content: [],
      question: {
        id: 'eq03-q2',
        type: 'multiple-choice',
        prompt: 'Solve |x + 2| > 6. What is the solution?',
        options: [
          { id: 'a', text: '-8 < x < 4' },
          { id: 'b', text: 'x < -8 or x > 4' },
          { id: 'c', text: 'x < -4 or x > 8' },
          { id: 'd', text: '-4 < x < 8' },
        ],
        correctAnswer: 'b',
        hint: '|x + 2| > 6 means "outside," so x + 2 < -6 OR x + 2 > 6.',
        explanation: 'x + 2 < -6 gives x < -8. x + 2 > 6 gives x > 4. So x < -8 or x > 4.',
        points: 15,
      },
    },
    {
      id: 'eq03-quiz',
      type: 'quiz',
      title: 'Remember the Rules',
      content: [],
      question: {
        id: 'eq03-q3',
        type: 'true-false',
        prompt: 'The solution to |x| < 5 is -5 < x < 5',
        correctAnswer: true,
        hint: '"Less than" = inside the fence',
        explanation: 'Correct! |x| < 5 means x is within 5 units of zero, which is -5 < x < 5.',
        points: 10,
      },
    },
    {
      id: 'eq03-summary',
      type: 'summary',
      title: 'Zone Rules Locked',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Fence Story',
          content: 'Imagine guards at -a and +a. "Less than" = stay INSIDE (between guards). "Greater than" = escape OUTSIDE (beyond guards in either direction).',
        },
      ],
    },
  ],
  xpReward: 45,
};

// Lesson 4: Quadratic Inequalities
export const LESSON_EQ_04: Lesson = {
  id: 'equations-04-quadratic-inequalities',
  topicId: 'equations_and_inequalities' as QuizTopic,
  title: 'Above or Below the Curve',
  subtitle: 'Solving quadratic inequalities with the sign test',
  description: 'Master x² inequalities using graphs and intervals',
  difficulty: 'advanced',
  estimatedTime: 12,
  prerequisites: ['equations-03-modulus-inequalities'],
  objectives: [
    'Solve quadratic inequalities algebraically',
    'Use the graphical method to verify solutions',
  ],
  steps: [
    {
      id: 'eq04-hook',
      type: 'hook',
      title: 'When Is a Rollercoaster Above Ground?',
      content: [
        {
          type: 'text',
          content: 'A rollercoaster\'s height follows a parabola. "When is the coaster above 50 meters?" is the same as solving y > 50 where y is quadratic. These are QUADRATIC INEQUALITIES, and they describe when curves are above or below certain levels.',
        },
      ],
    },
    {
      id: 'eq04-concept',
      type: 'concept',
      title: 'The Four-Step Method',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Step 1: Rearrange',
              content: 'Get everything on one side: ax² + bx + c > 0 (or < 0)',
            },
            {
              title: 'Step 2: Find roots',
              content: 'Solve ax² + bx + c = 0 to find where the curve crosses the x-axis',
            },
            {
              title: 'Step 3: Sketch',
              content: 'Draw the parabola (smile if a > 0, frown if a < 0)',
            },
            {
              title: 'Step 4: Read off',
              content: 'For > 0: where is curve ABOVE x-axis? For < 0: where is it BELOW?',
            },
          ],
        },
      ],
    },
    {
      id: 'eq04-example',
      type: 'example',
      title: 'Worked Example',
      content: [
        {
          type: 'text',
          content: 'Solve: x² - 5x + 6 > 0',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Find roots',
              content: 'x² - 5x + 6 = (x - 2)(x - 3) = 0, so x = 2 or x = 3',
              latex: 'x = 2 \\text{ or } x = 3',
            },
            {
              title: 'Sketch',
              content: 'Parabola opens UP (a = 1 > 0), crosses at x = 2 and x = 3',
            },
            {
              title: 'Read solution',
              content: 'Curve is ABOVE x-axis when x < 2 OR x > 3',
              latex: 'x < 2 \\text{ or } x > 3',
            },
          ],
        },
      ],
    },
    {
      id: 'eq04-visual',
      type: 'visual',
      title: 'See It Graphically',
      content: [
        {
          type: 'text',
          content: 'The curve is above the x-axis (positive) in the green regions!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Quadratic Inequality',
            description: 'Where is x² - 5x + 6 > 0?',
            expressions: [
              { latex: 'y=x^2-5x+6', color: '#06b6d4' },
              { latex: 'y=0', color: '#ef4444' },
              { latex: '(2,0)', color: '#22c55e' },
              { latex: '(3,0)', color: '#22c55e' },
            ],
            bounds: { left: -1, right: 6, bottom: -2, top: 6 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'eq04-practice1',
      type: 'practice',
      title: 'Your Turn',
      content: [],
      question: {
        id: 'eq04-q1',
        type: 'multiple-choice',
        prompt: 'Solve: x² - 4 < 0',
        options: [
          { id: 'a', text: 'x < -2 or x > 2' },
          { id: 'b', text: '-2 < x < 2' },
          { id: 'c', text: 'x < 2' },
          { id: 'd', text: 'x > -2' },
        ],
        correctAnswer: 'b',
        hint: 'x² - 4 = (x+2)(x-2) = 0 at x = ±2. The parabola opens UP. Where is it BELOW zero?',
        explanation: 'Roots at x = -2, 2. Parabola opens up. Below x-axis (negative) BETWEEN the roots: -2 < x < 2.',
        points: 15,
      },
    },
    {
      id: 'eq04-practice2',
      type: 'practice',
      title: 'Flip It',
      content: [
        {
          type: 'text',
          content: 'What if the parabola opens DOWN?',
        },
      ],
      question: {
        id: 'eq04-q2',
        type: 'multiple-choice',
        prompt: 'Solve: -x² + 4x - 3 > 0',
        options: [
          { id: 'a', text: 'x < 1 or x > 3' },
          { id: 'b', text: '1 < x < 3' },
          { id: 'c', text: 'All real x' },
          { id: 'd', text: 'No solution' },
        ],
        correctAnswer: 'b',
        hint: 'Factor: -(x-1)(x-3). Parabola opens DOWN (frowns). Where is it ABOVE zero?',
        explanation: 'Roots at x = 1, 3. Parabola opens DOWN. Above x-axis BETWEEN roots: 1 < x < 3.',
        points: 20,
      },
    },
    {
      id: 'eq04-summary',
      type: 'summary',
      title: 'Pattern Recognition',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Visual Shortcut',
          content: 'Smiley parabola (a > 0): above x-axis OUTSIDE the roots. Frowny parabola (a < 0): above x-axis BETWEEN the roots. Just remember: "Happy face runs away, sad face stays between!"',
        },
      ],
    },
  ],
  xpReward: 50,
};

// Lesson 5: Simultaneous Equations Review
export const LESSON_EQ_05: Lesson = {
  id: 'equations-05-simultaneous',
  topicId: 'equations_and_inequalities' as QuizTopic,
  title: 'Two Equations, One Answer',
  subtitle: 'Simultaneous equations - finding the intersection',
  description: 'Review and master systems of equations',
  difficulty: 'intermediate',
  estimatedTime: 8,
  prerequisites: ['equations-04-quadratic-inequalities'],
  objectives: [
    'Solve simultaneous linear equations',
    'Solve one linear and one quadratic equation together',
  ],
  steps: [
    {
      id: 'eq05-hook',
      type: 'hook',
      title: 'Where Do They Meet?',
      content: [
        {
          type: 'text',
          content: 'If one car travels along path y = 2x + 1 and another along y = -x + 7, where will they meet? This is the "simultaneous equations" question - finding the ONE point that satisfies BOTH equations.',
        },
      ],
    },
    {
      id: 'eq05-concept',
      type: 'concept',
      title: 'Two Methods',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Substitution',
              content: 'Solve one equation for a variable, plug into the other',
            },
            {
              title: 'Elimination',
              content: 'Add/subtract equations to eliminate one variable',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Which to use?',
          content: 'Substitution is best when one equation easily gives x = ... or y = ...',
        },
      ],
    },
    {
      id: 'eq05-example',
      type: 'example',
      title: 'Linear + Quadratic',
      content: [
        {
          type: 'text',
          content: 'Solve: y = x + 1 and y = x² - 3',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Substitute',
              content: 'Since both equal y: x + 1 = x² - 3',
              latex: 'x + 1 = x^2 - 3',
            },
            {
              title: 'Rearrange',
              content: '0 = x² - x - 4',
              latex: 'x^2 - x - 4 = 0',
            },
            {
              title: 'Solve',
              content: 'Use quadratic formula to get x values, then find y for each',
            },
          ],
        },
      ],
    },
    {
      id: 'eq05-visual',
      type: 'visual',
      title: 'Intersection Points',
      content: [
        {
          type: 'text',
          content: 'A line and parabola can intersect at 0, 1, or 2 points!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Line Meets Curve',
            description: 'See where they intersect',
            expressions: [
              { latex: 'y=x+1', color: '#ef4444' },
              { latex: 'y=x^2-3', color: '#06b6d4' },
            ],
            bounds: { left: -4, right: 4, bottom: -5, top: 5 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'eq05-practice',
      type: 'practice',
      title: 'Find the Intersection',
      content: [],
      question: {
        id: 'eq05-q1',
        type: 'fill-blank',
        prompt: 'Solve y = 2x and y = x². One solution is x = 0, y = 0. The other is x = [blank1], y = [blank2].',
        blanks: [
          { id: 'blank1', placeholder: '?' },
          { id: 'blank2', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['2'],
          blank2: ['4'],
        },
        hint: '2x = x² means x² - 2x = 0, so x(x-2) = 0.',
        explanation: 'x(x - 2) = 0 gives x = 0 or x = 2. When x = 2, y = 2(2) = 4.',
        points: 15,
      },
    },
    {
      id: 'eq05-summary',
      type: 'summary',
      title: 'System Solving Strategy',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Golden Rule',
          content: 'Two equations, two unknowns = solvable! Make expressions equal (if both = y), then solve what remains.',
        },
      ],
    },
  ],
  xpReward: 40,
};

// Module definition
export const MODULE_EQUATIONS: LessonModule = {
  id: 'module-equations',
  topicId: 'equations_and_inequalities' as QuizTopic,
  title: 'Equations & Inequalities',
  description: 'Master modulus, inequalities, and simultaneous equations',
  lessons: [
    'equations-01-intro',
    'equations-02-modulus-equations',
    'equations-03-modulus-inequalities',
    'equations-04-quadratic-inequalities',
    'equations-05-simultaneous',
  ],
  totalXP: 195,
};

// Export all lessons
export const EQUATIONS_LESSONS: Lesson[] = [
  LESSON_EQ_01,
  LESSON_EQ_02,
  LESSON_EQ_03,
  LESSON_EQ_04,
  LESSON_EQ_05,
];
