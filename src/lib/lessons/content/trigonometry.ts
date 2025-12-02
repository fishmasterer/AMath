// Trigonometric Functions & Identities - Lesson Content
// Topic G1: Complete bite-sized lessons for trigonometry

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: Introduction to Trigonometry - Real World Hook
export const LESSON_TRIG_01: Lesson = {
  id: 'trig-01-intro',
  topicId: 'trigonometry' as QuizTopic,
  title: 'Triangles Run the World',
  subtitle: 'From GPS to video games - trigonometry is everywhere',
  description: 'Discover why trigonometry is one of the most useful branches of mathematics',
  difficulty: 'foundation',
  estimatedTime: 6,
  objectives: [
    'Understand where trigonometry is used in real life',
    'Recognize the three main trigonometric ratios',
  ],
  steps: [
    {
      id: 't01-hook',
      type: 'hook',
      title: 'The Math Behind Everything',
      content: [
        {
          type: 'text',
          content: 'Every time you use GPS, your phone is doing trigonometry. When a video game renders a 3D world, it\'s using trigonometry millions of times per second. When architects design buildings or sound engineers mix music - you guessed it - trigonometry!',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Ancient wisdom, modern power',
          content: 'The word "trigonometry" comes from Greek: "trigonon" (triangle) + "metron" (measure). Ancient astronomers invented it to map the stars, but now it powers our entire digital world.',
        },
      ],
    },
    {
      id: 't01-concept1',
      type: 'concept',
      title: 'The Right Triangle Setup',
      content: [
        {
          type: 'text',
          content: 'Trigonometry is all about the relationships between angles and sides in a right triangle. Given any angle, the ratios between the sides are ALWAYS the same, no matter how big or small the triangle is.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Side Names',
          content: 'From a given angle: the side opposite to it is the OPPOSITE, the side next to it (not the hypotenuse) is the ADJACENT, and the longest side is the HYPOTENUSE.',
        },
      ],
    },
    {
      id: 't01-concept2',
      type: 'concept',
      title: 'Meet SOH-CAH-TOA',
      content: [
        {
          type: 'text',
          content: 'The three basic trigonometric ratios can be remembered with a famous mnemonic:',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'SOH - Sine',
              content: 'Sin = Opposite / Hypotenuse',
              latex: '\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}',
            },
            {
              title: 'CAH - Cosine',
              content: 'Cos = Adjacent / Hypotenuse',
              latex: '\\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}',
            },
            {
              title: 'TOA - Tangent',
              content: 'Tan = Opposite / Adjacent',
              latex: '\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}',
            },
          ],
        },
      ],
    },
    {
      id: 't01-visual',
      type: 'visual',
      title: 'Interactive Right Triangle',
      content: [
        {
          type: 'text',
          content: 'Drag the point to change the angle and watch how the trigonometric ratios change. Notice that no matter how you resize the triangle, the ratios stay the same for the same angle!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Trig Ratios Explorer',
            description: 'Explore sine, cosine, and tangent',
            expressions: [
              { latex: '(0,0)', color: '#06b6d4' },
              { latex: '(4,0)', color: '#06b6d4' },
              { latex: '(4,3)', color: '#06b6d4' },
              { latex: 'y=\\frac{3}{4}x\\{0\\le x\\le 4\\}', color: '#06b6d4' },
              { latex: 'x=4\\{0\\le y\\le 3\\}', color: '#06b6d4' },
              { latex: 'y=0\\{0\\le x\\le 4\\}', color: '#06b6d4' },
            ],
            bounds: { left: -1, right: 6, bottom: -1, top: 5 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 't01-quiz1',
      type: 'quiz',
      title: 'Quick Check',
      content: [],
      question: {
        id: 't01-q1',
        type: 'multiple-choice',
        prompt: 'In a right triangle, if you know the angle θ, which ratio gives you sin(θ)?',
        options: [
          { id: 'a', text: 'Adjacent / Hypotenuse' },
          { id: 'b', text: 'Opposite / Hypotenuse' },
          { id: 'c', text: 'Opposite / Adjacent' },
          { id: 'd', text: 'Hypotenuse / Opposite' },
        ],
        correctAnswer: 'b',
        hint: 'Remember SOH-CAH-TOA. SOH stands for...',
        explanation: 'SOH means Sin = Opposite / Hypotenuse. The sine ratio compares the side opposite to the angle with the hypotenuse.',
        points: 10,
      },
    },
    {
      id: 't01-practice',
      type: 'practice',
      title: 'Match the Ratios',
      content: [
        {
          type: 'text',
          content: 'Match each trigonometric function with its correct ratio.',
        },
      ],
      question: {
        id: 't01-q2',
        type: 'matching',
        prompt: 'Match each trig function with the correct ratio:',
        leftItems: [
          { id: 'sin', text: 'sin(θ)' },
          { id: 'cos', text: 'cos(θ)' },
          { id: 'tan', text: 'tan(θ)' },
        ],
        rightItems: [
          { id: 'opp-hyp', text: 'Opposite / Hypotenuse' },
          { id: 'adj-hyp', text: 'Adjacent / Hypotenuse' },
          { id: 'opp-adj', text: 'Opposite / Adjacent' },
        ],
        correctMatches: {
          sin: 'opp-hyp',
          cos: 'adj-hyp',
          tan: 'opp-adj',
        },
        hint: 'Use SOH-CAH-TOA to remember each ratio.',
        explanation: 'SOH: Sin = Opp/Hyp, CAH: Cos = Adj/Hyp, TOA: Tan = Opp/Adj',
        points: 15,
      },
    },
    {
      id: 't01-summary',
      type: 'summary',
      title: 'Key Takeaways',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Trigonometry is everywhere',
              content: 'GPS, games, engineering, music - all use trig!',
            },
            {
              title: 'Three main ratios',
              content: 'Sine, Cosine, and Tangent relate angles to side lengths.',
            },
            {
              title: 'SOH-CAH-TOA',
              content: 'The ultimate memory trick for trig ratios.',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 30,
};

// Lesson 2: Special Angles
export const LESSON_TRIG_02: Lesson = {
  id: 'trig-02-special-angles',
  topicId: 'trigonometry' as QuizTopic,
  title: 'The Magic Angles',
  subtitle: 'Master 30°, 45°, and 60° - the most common angles in math',
  description: 'Learn the exact values of trig functions for special angles',
  difficulty: 'foundation',
  estimatedTime: 8,
  prerequisites: ['trig-01-intro'],
  objectives: [
    'Know exact values for 30°, 45°, 60° angles',
    'Derive values using special triangles',
  ],
  steps: [
    {
      id: 't02-hook',
      type: 'hook',
      title: 'Three Angles to Rule Them All',
      content: [
        {
          type: 'text',
          content: 'In exams and real applications, three angles appear over and over: 30°, 45°, and 60°. The good news? You can calculate their exact sine, cosine, and tangent values without a calculator - and once you know the pattern, you\'ll never forget them!',
        },
      ],
    },
    {
      id: 't02-concept1',
      type: 'concept',
      title: 'The 45-45-90 Triangle',
      content: [
        {
          type: 'text',
          content: 'Start with a square of side 1. Draw the diagonal. You get a right triangle with two 45° angles!',
        },
        {
          type: 'latex',
          content: '\\text{If sides are } 1, 1, \\sqrt{2}',
          display: true,
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'sin(45°)',
              content: 'Opposite/Hypotenuse = 1/√2 = √2/2',
              latex: '\\sin(45°) = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}',
            },
            {
              title: 'cos(45°)',
              content: 'Adjacent/Hypotenuse = 1/√2 = √2/2',
              latex: '\\cos(45°) = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}',
            },
            {
              title: 'tan(45°)',
              content: 'Opposite/Adjacent = 1/1 = 1',
              latex: '\\tan(45°) = \\frac{1}{1} = 1',
            },
          ],
        },
      ],
    },
    {
      id: 't02-concept2',
      type: 'concept',
      title: 'The 30-60-90 Triangle',
      content: [
        {
          type: 'text',
          content: 'Start with an equilateral triangle of side 2. Drop a perpendicular from one vertex. You get a 30-60-90 triangle!',
        },
        {
          type: 'latex',
          content: '\\text{Sides: } 1, \\sqrt{3}, 2',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Easy pattern',
          content: 'For 30°: sin is the small value (1/2), cos is the big value (√3/2). For 60°: it\'s reversed!',
        },
      ],
    },
    {
      id: 't02-visual',
      type: 'visual',
      title: 'Special Triangles',
      content: [
        {
          type: 'text',
          content: 'Visualize both special triangles and see how the ratios work.',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Special Triangles',
            description: '45-45-90 and 30-60-90 triangles',
            expressions: [
              { latex: '(0,0)', color: '#06b6d4' },
              { latex: '(1,0)', color: '#06b6d4' },
              { latex: '(1,1)', color: '#06b6d4' },
              { latex: 'y=x\\{0\\le x\\le 1\\}', color: '#06b6d4' },
              { latex: '(3,0)', color: '#ec4899' },
              { latex: '(4,0)', color: '#ec4899' },
              { latex: '(4,1.732)', color: '#ec4899' },
            ],
            bounds: { left: -1, right: 6, bottom: -1, top: 3 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 't02-table',
      type: 'concept',
      title: 'The Complete Table',
      content: [
        {
          type: 'text',
          content: 'Here are all the values you need to memorize:',
        },
        {
          type: 'callout',
          variant: 'example',
          title: 'Special Angle Values',
          content: 'sin(30°) = 1/2, sin(45°) = √2/2, sin(60°) = √3/2\ncos(30°) = √3/2, cos(45°) = √2/2, cos(60°) = 1/2\ntan(30°) = 1/√3, tan(45°) = 1, tan(60°) = √3',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory trick',
          content: 'For sine going 30°→45°→60°: √1/2, √2/2, √3/2. Notice the pattern: 1, 2, 3 under the square root!',
        },
      ],
    },
    {
      id: 't02-practice1',
      type: 'practice',
      title: 'Quick Recall',
      content: [],
      question: {
        id: 't02-q1',
        type: 'multiple-choice',
        prompt: 'What is sin(60°)?',
        promptLatex: '\\sin(60°) = ?',
        options: [
          { id: 'a', text: '1/2', latex: '\\frac{1}{2}' },
          { id: 'b', text: '√2/2', latex: '\\frac{\\sqrt{2}}{2}' },
          { id: 'c', text: '√3/2', latex: '\\frac{\\sqrt{3}}{2}' },
          { id: 'd', text: '1', latex: '1' },
        ],
        correctAnswer: 'c',
        hint: 'In the 30-60-90 triangle, 60° is opposite the longer leg (√3).',
        explanation: 'sin(60°) = √3/2. In the 30-60-90 triangle with sides 1, √3, 2, the side opposite to 60° is √3, and the hypotenuse is 2.',
        points: 10,
      },
    },
    {
      id: 't02-practice2',
      type: 'practice',
      title: 'Pattern Recognition',
      content: [],
      question: {
        id: 't02-q2',
        type: 'ordering',
        prompt: 'Arrange these values from smallest to largest:',
        items: [
          { id: 'sin30', text: 'sin(30°)' },
          { id: 'sin45', text: 'sin(45°)' },
          { id: 'sin60', text: 'sin(60°)' },
          { id: 'sin90', text: 'sin(90°)' },
        ],
        correctOrder: ['sin30', 'sin45', 'sin60', 'sin90'],
        hint: 'As the angle increases from 0° to 90°, what happens to sine?',
        explanation: 'sin(30°) = 0.5, sin(45°) ≈ 0.707, sin(60°) ≈ 0.866, sin(90°) = 1. Sine increases from 0° to 90°.',
        points: 15,
      },
    },
    {
      id: 't02-quiz',
      type: 'quiz',
      title: 'Final Challenge',
      content: [],
      question: {
        id: 't02-q3',
        type: 'numeric',
        prompt: 'Calculate: sin(30°) × cos(60°)',
        correctAnswer: 0.25,
        tolerance: 0.01,
        hint: 'sin(30°) = 1/2 and cos(60°) = 1/2',
        explanation: 'sin(30°) × cos(60°) = (1/2) × (1/2) = 1/4 = 0.25',
        points: 15,
      },
    },
    {
      id: 't02-summary',
      type: 'summary',
      title: 'Special Angles Mastery',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: '45-45-90 Triangle',
              content: 'Both sin and cos equal √2/2, tan equals 1.',
            },
            {
              title: '30-60-90 Triangle',
              content: 'Remember 1, √3, 2 for the sides.',
            },
            {
              title: 'The Pattern',
              content: 'For sine: √1/2, √2/2, √3/2 for 30°, 45°, 60°.',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 40,
};

// Lesson 3: Unit Circle
export const LESSON_TRIG_03: Lesson = {
  id: 'trig-03-unit-circle',
  topicId: 'trigonometry' as QuizTopic,
  title: 'The Circle of Power',
  subtitle: 'Unlock all angles with the unit circle',
  description: 'Understand how the unit circle extends trig to all angles',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['trig-02-special-angles'],
  objectives: [
    'Understand the unit circle definition of trig functions',
    'Find trig values for angles in all four quadrants',
    'Convert between degrees and radians',
  ],
  steps: [
    {
      id: 't03-hook',
      type: 'hook',
      title: 'Beyond Right Triangles',
      content: [
        {
          type: 'text',
          content: 'Right triangles only give us angles up to 90°. But what about 120°? Or 270°? Or even negative angles? The unit circle lets us define sine and cosine for ANY angle - and it\'s the key to understanding everything from waves to rotation!',
        },
      ],
    },
    {
      id: 't03-concept1',
      type: 'concept',
      title: 'The Unit Circle',
      content: [
        {
          type: 'text',
          content: 'A unit circle is a circle with radius 1, centered at the origin. For any point on this circle at angle θ:',
        },
        {
          type: 'latex',
          content: 'x = \\cos(\\theta), \\quad y = \\sin(\\theta)',
          display: true,
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'The beautiful truth',
          content: 'On the unit circle, cos(θ) is just the x-coordinate and sin(θ) is the y-coordinate. That\'s it!',
        },
      ],
    },
    {
      id: 't03-visual',
      type: 'visual',
      title: 'Interactive Unit Circle',
      content: [
        {
          type: 'text',
          content: 'Move around the circle and see how sin(θ) and cos(θ) change. Notice how the x-coordinate is cos and the y-coordinate is sin!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Unit Circle Explorer',
            description: 'Drag the point to see how sin and cos change',
            expressions: [
              { latex: 'x^2+y^2=1', color: '#06b6d4' },
              { latex: '(\\cos(a),\\sin(a))', color: '#ef4444' },
              { latex: 'a=0.7' },
              { latex: '(0,0)', color: '#ffffff' },
              { latex: 'y=0\\{0\\le x\\le \\cos(a)\\}', color: '#22c55e' },
              { latex: 'x=\\cos(a)\\{0\\le y\\le \\sin(a)\\}', color: '#8b5cf6' },
            ],
            bounds: { left: -1.5, right: 1.5, bottom: -1.5, top: 1.5 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 't03-concept2',
      type: 'concept',
      title: 'Signs in Each Quadrant',
      content: [
        {
          type: 'text',
          content: 'Remember which trig functions are positive in each quadrant with "All Students Take Calculus":',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Quadrant I (0° to 90°)',
              content: 'ALL positive (sin+, cos+, tan+)',
            },
            {
              title: 'Quadrant II (90° to 180°)',
              content: 'Only SIN positive (sin+, cos-, tan-)',
            },
            {
              title: 'Quadrant III (180° to 270°)',
              content: 'Only TAN positive (sin-, cos-, tan+)',
            },
            {
              title: 'Quadrant IV (270° to 360°)',
              content: 'Only COS positive (sin-, cos+, tan-)',
            },
          ],
        },
      ],
    },
    {
      id: 't03-concept3',
      type: 'concept',
      title: 'Radians',
      content: [
        {
          type: 'text',
          content: 'Instead of degrees, mathematicians prefer radians. One full circle = 2π radians.',
        },
        {
          type: 'latex',
          content: '180° = \\pi \\text{ radians}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Quick conversions',
          content: '90° = π/2, 60° = π/3, 45° = π/4, 30° = π/6. Notice the pattern: divide 180 by the degree!',
        },
      ],
    },
    {
      id: 't03-practice1',
      type: 'practice',
      title: 'Quadrant Check',
      content: [],
      question: {
        id: 't03-q1',
        type: 'multiple-choice',
        prompt: 'In which quadrant is sin(θ) positive and cos(θ) negative?',
        options: [
          { id: 'a', text: 'Quadrant I' },
          { id: 'b', text: 'Quadrant II' },
          { id: 'c', text: 'Quadrant III' },
          { id: 'd', text: 'Quadrant IV' },
        ],
        correctAnswer: 'b',
        hint: 'Use "All Students Take Calculus" - which quadrant has only S (sin) positive?',
        explanation: 'In Quadrant II, only sine is positive (S from ASTC). This means sin+ and cos-.',
        points: 10,
      },
    },
    {
      id: 't03-practice2',
      type: 'practice',
      title: 'Finding Values',
      content: [
        {
          type: 'text',
          content: 'Use the unit circle to find sin(150°).',
        },
      ],
      question: {
        id: 't03-q2',
        type: 'multiple-choice',
        prompt: 'sin(150°) = ?',
        options: [
          { id: 'a', text: '1/2', latex: '\\frac{1}{2}' },
          { id: 'b', text: '-1/2', latex: '-\\frac{1}{2}' },
          { id: 'c', text: '√3/2', latex: '\\frac{\\sqrt{3}}{2}' },
          { id: 'd', text: '-√3/2', latex: '-\\frac{\\sqrt{3}}{2}' },
        ],
        correctAnswer: 'a',
        hint: '150° = 180° - 30°. It\'s in Quadrant II where sin is positive.',
        explanation: 'sin(150°) = sin(180° - 30°) = sin(30°) = 1/2. In Quadrant II, sine is positive.',
        points: 15,
      },
    },
    {
      id: 't03-quiz',
      type: 'quiz',
      title: 'Radian Conversion',
      content: [],
      question: {
        id: 't03-q3',
        type: 'fill-blank',
        prompt: 'Convert 120° to radians: [blank1]π/[blank2]',
        blanks: [
          { id: 'blank1', placeholder: '?' },
          { id: 'blank2', placeholder: '?' },
        ],
        correctAnswers: {
          blank1: ['2'],
          blank2: ['3'],
        },
        hint: '120° = 120/180 × π = ?',
        explanation: '120° = 120/180 × π = 2π/3 radians.',
        points: 15,
      },
    },
    {
      id: 't03-summary',
      type: 'summary',
      title: 'Unit Circle Mastery',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'The Key Insight',
              content: 'On the unit circle: x = cos(θ), y = sin(θ)',
            },
            {
              title: 'ASTC',
              content: '"All Students Take Calculus" tells you which functions are positive.',
            },
            {
              title: 'Radians',
              content: '180° = π radians. Always simplify radian fractions.',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 50,
};

// Lesson 4: Trig Identities
export const LESSON_TRIG_04: Lesson = {
  id: 'trig-04-identities',
  topicId: 'trigonometry' as QuizTopic,
  title: 'The Identity Toolkit',
  subtitle: 'Master the fundamental trig identities',
  description: 'Learn and apply the essential trigonometric identities',
  difficulty: 'intermediate',
  estimatedTime: 12,
  prerequisites: ['trig-03-unit-circle'],
  objectives: [
    'Understand and apply Pythagorean identities',
    'Use quotient and reciprocal identities',
    'Simplify trig expressions using identities',
  ],
  steps: [
    {
      id: 't04-hook',
      type: 'hook',
      title: 'Mathematical Shape-Shifting',
      content: [
        {
          type: 'text',
          content: 'Trig identities are like cheat codes. They let you transform complex expressions into simpler ones. Engineers use them to simplify calculations, and they\'re essential for calculus. The best part? They\'re all connected by one simple idea from the unit circle.',
        },
      ],
    },
    {
      id: 't04-concept1',
      type: 'concept',
      title: 'The Pythagorean Identity',
      content: [
        {
          type: 'text',
          content: 'This is the most important identity. It comes directly from the unit circle equation x² + y² = 1:',
        },
        {
          type: 'latex',
          content: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1',
          display: true,
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Why it works',
          content: 'On the unit circle, x = cos(θ) and y = sin(θ). Since x² + y² = 1, we get cos² + sin² = 1!',
        },
      ],
    },
    {
      id: 't04-concept2',
      type: 'concept',
      title: 'Rearranging the Pythagorean',
      content: [
        {
          type: 'text',
          content: 'We can rearrange the Pythagorean identity to isolate either sin² or cos²:',
        },
        {
          type: 'latex',
          content: '\\sin^2(\\theta) = 1 - \\cos^2(\\theta)',
          display: true,
        },
        {
          type: 'latex',
          content: '\\cos^2(\\theta) = 1 - \\sin^2(\\theta)',
          display: true,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'When to use',
          content: 'Use these when you need to convert between sin² and cos² in an expression.',
        },
      ],
    },
    {
      id: 't04-concept3',
      type: 'concept',
      title: 'Quotient Identity',
      content: [
        {
          type: 'text',
          content: 'Tangent can be written in terms of sine and cosine:',
        },
        {
          type: 'latex',
          content: '\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}',
          display: true,
        },
        {
          type: 'callout',
          variant: 'example',
          content: 'This makes sense! Tan = Opp/Adj = (Opp/Hyp)/(Adj/Hyp) = Sin/Cos',
        },
      ],
    },
    {
      id: 't04-practice1',
      type: 'practice',
      title: 'Apply the Pythagorean',
      content: [
        {
          type: 'text',
          content: 'If sin(θ) = 3/5 and θ is in Quadrant I, find cos(θ).',
        },
      ],
      question: {
        id: 't04-q1',
        type: 'multiple-choice',
        prompt: 'If sin(θ) = 3/5 and 0° < θ < 90°, what is cos(θ)?',
        options: [
          { id: 'a', text: '4/5', latex: '\\frac{4}{5}' },
          { id: 'b', text: '3/5', latex: '\\frac{3}{5}' },
          { id: 'c', text: '-4/5', latex: '-\\frac{4}{5}' },
          { id: 'd', text: '5/4', latex: '\\frac{5}{4}' },
        ],
        correctAnswer: 'a',
        hint: 'Use sin² + cos² = 1. Solve for cos(θ). Remember the sign in Quadrant I.',
        explanation: 'cos²(θ) = 1 - sin²(θ) = 1 - 9/25 = 16/25. So cos(θ) = ±4/5. In Quadrant I, cos is positive, so cos(θ) = 4/5.',
        points: 15,
      },
    },
    {
      id: 't04-example',
      type: 'example',
      title: 'Simplification Example',
      content: [
        {
          type: 'text',
          content: 'Simplify: sin²(θ) + sin²(θ)tan²(θ)',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Factor out sin²(θ)',
              content: '= sin²(θ)(1 + tan²(θ))',
              latex: '= \\sin^2(\\theta)(1 + \\tan^2(\\theta))',
            },
            {
              title: 'Use identity: 1 + tan² = sec²',
              content: '= sin²(θ) × sec²(θ)',
              latex: '= \\sin^2(\\theta) \\cdot \\sec^2(\\theta)',
            },
            {
              title: 'Convert sec to 1/cos',
              content: '= sin²(θ)/cos²(θ) = tan²(θ)',
              latex: '= \\frac{\\sin^2(\\theta)}{\\cos^2(\\theta)} = \\tan^2(\\theta)',
            },
          ],
        },
      ],
    },
    {
      id: 't04-quiz',
      type: 'quiz',
      title: 'Identity Challenge',
      content: [],
      question: {
        id: 't04-q2',
        type: 'true-false',
        prompt: 'The expression (1 - cos²θ)/sin²θ simplifies to 1.',
        correctAnswer: true,
        hint: 'What is 1 - cos²θ equal to? (Use the Pythagorean identity)',
        explanation: '1 - cos²θ = sin²θ (Pythagorean identity). So (1 - cos²θ)/sin²θ = sin²θ/sin²θ = 1.',
        points: 15,
      },
    },
    {
      id: 't04-summary',
      type: 'summary',
      title: 'Identity Toolkit',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'The Big One',
              content: 'sin²θ + cos²θ = 1 (memorize this!)',
              latex: '\\sin^2\\theta + \\cos^2\\theta = 1',
            },
            {
              title: 'Quotient',
              content: 'tanθ = sinθ/cosθ',
              latex: '\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}',
            },
            {
              title: 'Strategy',
              content: 'Convert everything to sin and cos, then simplify.',
            },
          ],
        },
      ],
    },
  ],
  xpReward: 55,
};

// Module definition
export const MODULE_TRIGONOMETRY: LessonModule = {
  id: 'module-trigonometry',
  topicId: 'trigonometry' as QuizTopic,
  title: 'Trigonometric Functions & Identities',
  description: 'Master trigonometry from basics to identities',
  lessons: [
    'trig-01-intro',
    'trig-02-special-angles',
    'trig-03-unit-circle',
    'trig-04-identities',
  ],
  totalXP: 175,
};

// Export all lessons
export const TRIGONOMETRY_LESSONS: Lesson[] = [
  LESSON_TRIG_01,
  LESSON_TRIG_02,
  LESSON_TRIG_03,
  LESSON_TRIG_04,
];
