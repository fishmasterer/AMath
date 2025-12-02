// Coordinate Geometry - Lesson Content
// Topic G2: Making geometry visual and fun

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: Straight Lines Revisited
export const LESSON_COORD_01: Lesson = {
  id: 'coord-01-lines',
  topicId: 'coordinate_geometry' as QuizTopic,
  title: 'Lines Have Personality',
  subtitle: 'Understanding slope and intercept - what they really mean',
  description: 'Master the equation of a straight line',
  difficulty: 'foundation',
  estimatedTime: 7,
  objectives: [
    'Understand gradient as steepness and direction',
    'Write equations of lines in different forms',
  ],
  steps: [
    {
      id: 'cg01-hook',
      type: 'hook',
      title: 'Roads Have Gradients',
      content: [
        {
          type: 'text',
          content: 'Road signs say "10% gradient" - that means for every 100m forward, you go 10m up (or down). That\'s a slope of 0.1! Lines in math work the same way: gradient tells you how steep the climb is.',
        },
      ],
    },
    {
      id: 'cg01-concept',
      type: 'concept',
      title: 'Three Ways to Write a Line',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Slope-Intercept: y = mx + c',
              content: 'm is gradient (steepness), c is y-intercept (where it crosses y-axis)',
            },
            {
              title: 'Point-Slope: y - y₁ = m(x - x₁)',
              content: 'Use when you know gradient and one point',
            },
            {
              title: 'Two-Point Formula',
              content: 'm = (y₂ - y₁)/(x₂ - x₁)',
              latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}',
            },
          ],
        },
      ],
    },
    {
      id: 'cg01-visual',
      type: 'visual',
      title: 'See the Gradient',
      content: [
        {
          type: 'text',
          content: 'Drag the slider to change the gradient. Positive = uphill, negative = downhill, zero = flat.',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Gradient Explorer',
            description: 'See how gradient affects the line',
            expressions: [
              { latex: 'y=mx+2', color: '#06b6d4' },
              { latex: 'm=1' },
              { latex: '(0,2)', color: '#ef4444' },
            ],
            bounds: { left: -5, right: 5, bottom: -3, top: 7 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'cg01-practice1',
      type: 'practice',
      title: 'Find the Gradient',
      content: [],
      question: {
        id: 'cg01-q1',
        type: 'numeric',
        prompt: 'What is the gradient of the line passing through (1, 3) and (4, 9)?',
        correctAnswer: 2,
        tolerance: 0,
        hint: 'Use m = (y₂ - y₁)/(x₂ - x₁)',
        explanation: 'm = (9 - 3)/(4 - 1) = 6/3 = 2',
        points: 15,
      },
    },
    {
      id: 'cg01-summary',
      type: 'summary',
      title: 'Line Basics',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Remember',
          content: 'Gradient = rise/run. y = mx + c tells the whole story: how steep (m) and where it starts (c).',
        },
      ],
    },
  ],
  xpReward: 25,
};

// Lesson 2: Parallel and Perpendicular
export const LESSON_COORD_02: Lesson = {
  id: 'coord-02-parallel-perp',
  topicId: 'coordinate_geometry' as QuizTopic,
  title: 'Parallel and Perpendicular',
  subtitle: 'The relationship between line gradients',
  description: 'Understand how parallel and perpendicular lines relate',
  difficulty: 'intermediate',
  estimatedTime: 8,
  prerequisites: ['coord-01-lines'],
  objectives: [
    'Identify parallel lines using gradients',
    'Find perpendicular line gradients',
  ],
  steps: [
    {
      id: 'cg02-hook',
      type: 'hook',
      title: 'Train Tracks and T-Junctions',
      content: [
        {
          type: 'text',
          content: 'Train tracks are parallel - they have the SAME gradient. A T-junction makes a 90° angle - those lines are perpendicular. The relationship between their gradients? Pure mathematical beauty!',
        },
      ],
    },
    {
      id: 'cg02-concept1',
      type: 'concept',
      title: 'Parallel Lines',
      content: [
        {
          type: 'text',
          content: 'Parallel lines have the SAME gradient:',
        },
        {
          type: 'latex',
          content: 'm_1 = m_2 \\implies \\text{parallel}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'example',
          content: 'y = 2x + 3 and y = 2x - 5 are parallel (both have gradient 2)',
        },
      ],
    },
    {
      id: 'cg02-concept2',
      type: 'concept',
      title: 'Perpendicular Lines',
      content: [
        {
          type: 'text',
          content: 'Perpendicular lines have gradients that multiply to -1:',
        },
        {
          type: 'latex',
          content: 'm_1 \\times m_2 = -1',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Quick method',
          content: 'To find perpendicular gradient: flip the fraction and change the sign. Gradient 2 → perpendicular gradient -1/2.',
        },
      ],
    },
    {
      id: 'cg02-visual',
      type: 'visual',
      title: 'See the Relationship',
      content: [
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Perpendicular Lines',
            description: 'Notice the 90° angle',
            expressions: [
              { latex: 'y=2x', color: '#06b6d4' },
              { latex: 'y=-0.5x', color: '#ef4444' },
            ],
            bounds: { left: -5, right: 5, bottom: -5, top: 5 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'cg02-practice1',
      type: 'practice',
      title: 'Find Perpendicular Gradient',
      content: [],
      question: {
        id: 'cg02-q1',
        type: 'multiple-choice',
        prompt: 'A line has gradient 3. What is the gradient of a perpendicular line?',
        options: [
          { id: 'a', text: '3' },
          { id: 'b', text: '-3' },
          { id: 'c', text: '-1/3', latex: '-\\frac{1}{3}' },
          { id: 'd', text: '1/3', latex: '\\frac{1}{3}' },
        ],
        correctAnswer: 'c',
        hint: 'Flip and change sign: 3 becomes -1/3',
        explanation: '3 × (-1/3) = -1. Perpendicular gradient is -1/3.',
        points: 15,
      },
    },
    {
      id: 'cg02-summary',
      type: 'summary',
      title: 'The Rules',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Remember',
          content: 'Parallel: same gradients. Perpendicular: gradients multiply to -1 (flip & negate).',
        },
      ],
    },
  ],
  xpReward: 35,
};

// Lesson 3: Distance and Midpoint
export const LESSON_COORD_03: Lesson = {
  id: 'coord-03-distance-midpoint',
  topicId: 'coordinate_geometry' as QuizTopic,
  title: 'Measuring in the Plane',
  subtitle: 'Distance and midpoint formulas',
  description: 'Calculate distances and find midpoints between points',
  difficulty: 'intermediate',
  estimatedTime: 8,
  prerequisites: ['coord-02-parallel-perp'],
  objectives: [
    'Apply the distance formula',
    'Find midpoints of line segments',
  ],
  steps: [
    {
      id: 'cg03-hook',
      type: 'hook',
      title: 'Pythagoras Saves the Day',
      content: [
        {
          type: 'text',
          content: 'How far is it from (1, 2) to (4, 6)? Draw a right triangle - horizontal distance is 3, vertical is 4. Pythagoras: d² = 3² + 4² = 25, so d = 5. This is the DISTANCE FORMULA in disguise!',
        },
      ],
    },
    {
      id: 'cg03-concept1',
      type: 'concept',
      title: 'Distance Formula',
      content: [
        {
          type: 'latex',
          content: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'It\'s just Pythagoras!',
          content: 'Horizontal difference² + Vertical difference² = Distance²',
        },
      ],
    },
    {
      id: 'cg03-concept2',
      type: 'concept',
      title: 'Midpoint Formula',
      content: [
        {
          type: 'text',
          content: 'The midpoint is just the average of the coordinates:',
        },
        {
          type: 'latex',
          content: 'M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)',
          display: true,
        },
      ],
    },
    {
      id: 'cg03-practice1',
      type: 'practice',
      title: 'Find the Distance',
      content: [],
      question: {
        id: 'cg03-q1',
        type: 'numeric',
        prompt: 'Find the distance between (0, 0) and (3, 4):',
        correctAnswer: 5,
        tolerance: 0,
        hint: 'd = √(3² + 4²)',
        explanation: 'd = √(9 + 16) = √25 = 5. This is a 3-4-5 right triangle!',
        points: 15,
      },
    },
    {
      id: 'cg03-practice2',
      type: 'practice',
      title: 'Find the Midpoint',
      content: [],
      question: {
        id: 'cg03-q2',
        type: 'fill-blank',
        prompt: 'The midpoint of (2, 8) and (6, 4) is ([blank1], [blank2])',
        blanks: [
          { id: 'blank1', placeholder: 'x' },
          { id: 'blank2', placeholder: 'y' },
        ],
        correctAnswers: {
          blank1: ['4'],
          blank2: ['6'],
        },
        hint: 'Average the x\'s: (2+6)/2. Average the y\'s: (8+4)/2.',
        explanation: 'Midpoint = ((2+6)/2, (8+4)/2) = (4, 6)',
        points: 15,
      },
    },
    {
      id: 'cg03-summary',
      type: 'summary',
      title: 'Formula Summary',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Remember',
          content: 'Distance: Pythagoras on coordinates. Midpoint: Average both coordinates separately.',
        },
      ],
    },
  ],
  xpReward: 35,
};

// Lesson 4: Circles
export const LESSON_COORD_04: Lesson = {
  id: 'coord-04-circles',
  topicId: 'coordinate_geometry' as QuizTopic,
  title: 'The Circle Equation',
  subtitle: 'Understanding circles through coordinates',
  description: 'Master the equation of a circle',
  difficulty: 'advanced',
  estimatedTime: 10,
  prerequisites: ['coord-03-distance-midpoint'],
  objectives: [
    'Write and interpret circle equations',
    'Find center and radius from equation',
  ],
  steps: [
    {
      id: 'cg04-hook',
      type: 'hook',
      title: 'What IS a Circle?',
      content: [
        {
          type: 'text',
          content: 'A circle is all points the same distance from the center. If center is (a, b) and radius is r, any point (x, y) on the circle satisfies: distance from (x,y) to (a,b) equals r. That\'s the circle equation!',
        },
      ],
    },
    {
      id: 'cg04-concept',
      type: 'concept',
      title: 'Circle Equation',
      content: [
        {
          type: 'latex',
          content: '(x-a)^2 + (y-b)^2 = r^2',
          display: true,
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Reading the equation',
          content: 'Center is (a, b). Radius is √r². Watch the signs: (x-3) means center x-coordinate is +3.',
        },
      ],
    },
    {
      id: 'cg04-visual',
      type: 'visual',
      title: 'Interactive Circle',
      content: [
        {
          type: 'text',
          content: 'Move the center and change the radius to see how the equation changes.',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Circle Equation Explorer',
            description: 'See center and radius in action',
            expressions: [
              { latex: '(x-a)^2+(y-b)^2=r^2', color: '#06b6d4' },
              { latex: 'a=2' },
              { latex: 'b=1' },
              { latex: 'r=3' },
              { latex: '(a,b)', color: '#ef4444' },
            ],
            bounds: { left: -5, right: 10, bottom: -5, top: 8 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'cg04-practice1',
      type: 'practice',
      title: 'Find Center and Radius',
      content: [
        {
          type: 'text',
          content: 'Given: (x - 3)² + (y + 2)² = 16',
        },
      ],
      question: {
        id: 'cg04-q1',
        type: 'matching',
        prompt: 'Match the properties:',
        leftItems: [
          { id: 'cx', text: 'Center x-coordinate' },
          { id: 'cy', text: 'Center y-coordinate' },
          { id: 'r', text: 'Radius' },
        ],
        rightItems: [
          { id: 'v3', text: '3' },
          { id: 'vm2', text: '-2' },
          { id: 'v4', text: '4' },
        ],
        correctMatches: { cx: 'v3', cy: 'vm2', r: 'v4' },
        hint: '(y + 2) means center y = -2. r² = 16 means r = 4.',
        explanation: 'Center is (3, -2) and radius is √16 = 4.',
        points: 20,
      },
    },
    {
      id: 'cg04-summary',
      type: 'summary',
      title: 'Circle Mastery',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'The Pattern',
          content: '(x - a)² + (y - b)² = r². Center at (a, b), radius r. Signs flip when reading!',
        },
      ],
    },
  ],
  xpReward: 45,
};

// Module definition
export const MODULE_COORDINATE: LessonModule = {
  id: 'module-coordinate',
  topicId: 'coordinate_geometry' as QuizTopic,
  title: 'Coordinate Geometry',
  description: 'Master lines, circles, and geometric relationships',
  lessons: [
    'coord-01-lines',
    'coord-02-parallel-perp',
    'coord-03-distance-midpoint',
    'coord-04-circles',
  ],
  totalXP: 140,
};

// Export all lessons
export const COORDINATE_LESSONS: Lesson[] = [
  LESSON_COORD_01,
  LESSON_COORD_02,
  LESSON_COORD_03,
  LESSON_COORD_04,
];
