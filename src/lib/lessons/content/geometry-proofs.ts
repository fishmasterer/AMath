// Proofs in Plane Geometry - Lesson Content
// Topic G3: Making proofs logical and satisfying

import { Lesson, LessonModule } from '../types';
import { QuizTopic } from '../../types';

// Lesson 1: What Is a Proof?
export const LESSON_PROOF_01: Lesson = {
  id: 'proof-01-intro',
  topicId: 'geometry_proofs' as QuizTopic,
  title: 'The Art of Proof',
  subtitle: 'Building logical arguments step by step',
  description: 'Understand what geometric proofs are and how they work',
  difficulty: 'foundation',
  estimatedTime: 7,
  objectives: [
    'Understand the structure of a proof',
    'Recognize given information and what to prove',
  ],
  steps: [
    {
      id: 'pr01-hook',
      type: 'hook',
      title: 'Becoming a Math Detective',
      content: [
        {
          type: 'text',
          content: 'A proof is like solving a mystery. You\'re given clues (the "Given"), and you need to reach a conclusion (what "To Prove"). Every step must follow logically from the previous ones - no guessing allowed!',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Why proofs matter',
          content: 'Proofs train you to think logically. Lawyers, programmers, and scientists all use the same reasoning skills you learn in geometric proofs.',
        },
      ],
    },
    {
      id: 'pr01-concept',
      type: 'concept',
      title: 'Proof Structure',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Given',
              content: 'What facts you start with - the clues',
            },
            {
              title: 'To Prove',
              content: 'What you need to show is true - the conclusion',
            },
            {
              title: 'Proof',
              content: 'Step-by-step reasoning from Given to Conclusion',
            },
            {
              title: 'Reason',
              content: 'Each step needs a reason: theorem, definition, or given fact',
            },
          ],
        },
      ],
    },
    {
      id: 'pr01-example',
      type: 'example',
      title: 'A Simple Proof',
      content: [
        {
          type: 'text',
          content: 'Given: AB = CD and CD = EF. Prove: AB = EF',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Statement: AB = CD',
              content: 'Reason: Given',
            },
            {
              title: 'Statement: CD = EF',
              content: 'Reason: Given',
            },
            {
              title: 'Statement: AB = EF',
              content: 'Reason: Transitive property (if a=b and b=c, then a=c)',
            },
          ],
        },
      ],
    },
    {
      id: 'pr01-quiz',
      type: 'quiz',
      title: 'Proof Logic',
      content: [],
      question: {
        id: 'pr01-q1',
        type: 'ordering',
        prompt: 'Put these proof steps in order:',
        items: [
          { id: 'a', text: 'Therefore, what we needed to prove is true' },
          { id: 'b', text: 'Apply a theorem or property' },
          { id: 'c', text: 'State what is given' },
          { id: 'd', text: 'State what we need to prove' },
        ],
        correctOrder: ['c', 'd', 'b', 'a'],
        hint: 'Start with Given, state goal, use logic, reach conclusion.',
        explanation: 'Given → Goal → Reasoning → Conclusion. This is the logical flow of every proof.',
        points: 15,
      },
    },
    {
      id: 'pr01-summary',
      type: 'summary',
      title: 'Proof Basics',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Think Like a Detective',
          content: 'Every statement needs evidence (a reason). Build your case step by step until you reach the conclusion.',
        },
      ],
    },
  ],
  xpReward: 25,
};

// Lesson 2: Congruent Triangles
export const LESSON_PROOF_02: Lesson = {
  id: 'proof-02-congruence',
  topicId: 'geometry_proofs' as QuizTopic,
  title: 'Triangle Twins',
  subtitle: 'Proving triangles are congruent',
  description: 'Use SSS, SAS, ASA, AAS, and RHS to prove congruence',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['proof-01-intro'],
  objectives: [
    'Know the five congruence tests',
    'Apply congruence tests in proofs',
  ],
  steps: [
    {
      id: 'pr02-hook',
      type: 'hook',
      title: 'When Are Triangles Identical?',
      content: [
        {
          type: 'text',
          content: 'Congruent triangles are exact copies - same size, same shape. If you cut them out, they\'d stack perfectly. But you don\'t need to measure all 6 parts (3 sides + 3 angles). Just 3 specific measurements can guarantee congruence!',
        },
      ],
    },
    {
      id: 'pr02-concept',
      type: 'concept',
      title: 'The Five Tests',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'SSS (Side-Side-Side)',
              content: 'All three sides equal',
            },
            {
              title: 'SAS (Side-Angle-Side)',
              content: 'Two sides and the INCLUDED angle equal',
            },
            {
              title: 'ASA (Angle-Side-Angle)',
              content: 'Two angles and the INCLUDED side equal',
            },
            {
              title: 'AAS (Angle-Angle-Side)',
              content: 'Two angles and a NON-included side equal',
            },
            {
              title: 'RHS (Right-Hypotenuse-Side)',
              content: 'Right angle, hypotenuse, and one other side equal',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'NOT a valid test',
          content: 'AAA (three angles) only proves similarity, NOT congruence. SSA (side-side-angle) is ambiguous.',
        },
      ],
    },
    {
      id: 'pr02-practice1',
      type: 'practice',
      title: 'Which Test?',
      content: [
        {
          type: 'text',
          content: 'In triangles ABC and DEF: AB = DE, BC = EF, and angle B = angle E.',
        },
      ],
      question: {
        id: 'pr02-q1',
        type: 'multiple-choice',
        prompt: 'Which congruence test applies?',
        options: [
          { id: 'a', text: 'SSS' },
          { id: 'b', text: 'SAS' },
          { id: 'c', text: 'ASA' },
          { id: 'd', text: 'AAS' },
        ],
        correctAnswer: 'b',
        hint: 'The angle is BETWEEN the two sides...',
        explanation: 'Angle B is between AB and BC. Angle E is between DE and EF. This is SAS (Side-Angle-Side).',
        points: 15,
      },
    },
    {
      id: 'pr02-practice2',
      type: 'practice',
      title: 'Missing Information',
      content: [],
      question: {
        id: 'pr02-q2',
        type: 'multiple-choice',
        prompt: 'Two triangles have equal angles at A and D, equal angles at B and E. What additional information proves congruence?',
        options: [
          { id: 'a', text: 'Angle C = Angle F' },
          { id: 'b', text: 'Any pair of sides equal' },
          { id: 'c', text: 'Nothing more needed' },
          { id: 'd', text: 'Impossible to prove congruence' },
        ],
        correctAnswer: 'b',
        hint: 'Two angles are known. What does AAA prove vs AAS?',
        explanation: 'Two angles match. We need one side to use AAS or ASA. AAA alone only proves similarity.',
        points: 15,
      },
    },
    {
      id: 'pr02-summary',
      type: 'summary',
      title: 'Congruence Arsenal',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Memory: SSS SAS ASA AAS RHS',
          content: '"Some Students Are Absolutely Right!" Each test needs 3 matching parts. Never use AAA or SSA.',
        },
      ],
    },
  ],
  xpReward: 40,
};

// Lesson 3: Similar Triangles
export const LESSON_PROOF_03: Lesson = {
  id: 'proof-03-similarity',
  topicId: 'geometry_proofs' as QuizTopic,
  title: 'Triangle Cousins',
  subtitle: 'Similar triangles - same shape, different size',
  description: 'Prove and use triangle similarity',
  difficulty: 'intermediate',
  estimatedTime: 10,
  prerequisites: ['proof-02-congruence'],
  objectives: [
    'Understand similarity vs congruence',
    'Apply similarity in proofs and calculations',
  ],
  steps: [
    {
      id: 'pr03-hook',
      type: 'hook',
      title: 'Scaling Up and Down',
      content: [
        {
          type: 'text',
          content: 'A photo and its thumbnail are SIMILAR - same shape, different size. Similar triangles work the same way: all angles are equal, and sides are in the same ratio. This is how we measure heights of buildings using shadows!',
        },
      ],
    },
    {
      id: 'pr03-concept',
      type: 'concept',
      title: 'Similarity Tests',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'AA (Angle-Angle)',
              content: 'Two pairs of equal angles (third pair is automatic)',
            },
            {
              title: 'SSS (ratio)',
              content: 'All three pairs of sides in the same ratio',
            },
            {
              title: 'SAS (ratio)',
              content: 'Two pairs of sides in ratio AND included angle equal',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Key property',
          content: 'In similar triangles, corresponding sides are in ratio k. Areas are in ratio k².',
        },
      ],
    },
    {
      id: 'pr03-example',
      type: 'example',
      title: 'Using Similarity',
      content: [
        {
          type: 'text',
          content: 'Triangle ABC ~ Triangle DEF with ratio 2:1. If AB = 8, find DE.',
        },
        {
          type: 'steps',
          steps: [
            {
              title: 'Ratio is 2:1',
              content: 'AB:DE = 2:1',
            },
            {
              title: 'So 8:DE = 2:1',
              content: 'DE = 8/2 = 4',
            },
          ],
        },
      ],
    },
    {
      id: 'pr03-practice',
      type: 'practice',
      title: 'Find the Missing Side',
      content: [
        {
          type: 'text',
          content: 'Triangles ABC and DEF are similar. AB = 6, DE = 9, BC = 8. Find EF.',
        },
      ],
      question: {
        id: 'pr03-q1',
        type: 'numeric',
        prompt: 'EF = ?',
        correctAnswer: 12,
        tolerance: 0,
        hint: 'Ratio = DE/AB = 9/6 = 3/2. Apply to BC.',
        explanation: 'Scale factor = 9/6 = 1.5. EF = BC × 1.5 = 8 × 1.5 = 12.',
        points: 20,
      },
    },
    {
      id: 'pr03-summary',
      type: 'summary',
      title: 'Similarity Power',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Remember',
          content: 'Similar = same shape (angles), different size (sides in ratio). Use AA for proofs - it\'s usually quickest!',
        },
      ],
    },
  ],
  xpReward: 40,
};

// Lesson 4: Circle Theorems
export const LESSON_PROOF_04: Lesson = {
  id: 'proof-04-circles',
  topicId: 'geometry_proofs' as QuizTopic,
  title: 'Circle Secrets',
  subtitle: 'The powerful theorems of circles',
  description: 'Learn and apply key circle theorems',
  difficulty: 'advanced',
  estimatedTime: 12,
  prerequisites: ['proof-03-similarity'],
  objectives: [
    'Know the main circle theorems',
    'Apply circle theorems in proofs',
  ],
  steps: [
    {
      id: 'pr04-hook',
      type: 'hook',
      title: 'The Perfect Shape',
      content: [
        {
          type: 'text',
          content: 'Circles hide amazing secrets. An angle at the center is twice the angle at the edge. Angles in a semicircle are always 90°. These aren\'t coincidences - they\'re mathematical truths waiting to be used!',
        },
      ],
    },
    {
      id: 'pr04-concept',
      type: 'concept',
      title: 'Key Circle Theorems',
      content: [
        {
          type: 'steps',
          steps: [
            {
              title: 'Angle at Center',
              content: 'Angle at center = 2 × angle at circumference (same arc)',
            },
            {
              title: 'Angle in Semicircle',
              content: 'Angle in semicircle = 90°',
            },
            {
              title: 'Angles in Same Segment',
              content: 'Angles subtended by same arc are equal',
            },
            {
              title: 'Cyclic Quadrilateral',
              content: 'Opposite angles sum to 180°',
            },
            {
              title: 'Tangent Perpendicular',
              content: 'Tangent is perpendicular to radius at point of contact',
            },
          ],
        },
      ],
    },
    {
      id: 'pr04-visual',
      type: 'visual',
      title: 'See the Angle Theorem',
      content: [
        {
          type: 'text',
          content: 'The angle at the center is always double the angle at the edge!',
        },
        {
          type: 'visualization',
          visualType: 'desmos',
          config: {
            title: 'Angle at Center',
            description: 'Center angle = 2 × circumference angle',
            expressions: [
              { latex: 'x^2+y^2=9', color: '#06b6d4' },
              { latex: '(0,0)', color: '#ef4444' },
              { latex: '(3,0)', color: '#22c55e' },
              { latex: '(-3,0)', color: '#22c55e' },
            ],
            bounds: { left: -5, right: 5, bottom: -5, top: 5 },
          },
          interactive: true,
        },
      ],
    },
    {
      id: 'pr04-practice1',
      type: 'practice',
      title: 'Apply the Theorem',
      content: [
        {
          type: 'text',
          content: 'The angle at the center of a circle is 140°. What is the angle at the circumference on the same arc?',
        },
      ],
      question: {
        id: 'pr04-q1',
        type: 'numeric',
        prompt: 'Angle at circumference = ?°',
        correctAnswer: 70,
        tolerance: 0,
        hint: 'Center angle = 2 × circumference angle',
        explanation: 'Circumference angle = 140° ÷ 2 = 70°',
        points: 15,
      },
    },
    {
      id: 'pr04-practice2',
      type: 'practice',
      title: 'Cyclic Quadrilateral',
      content: [],
      question: {
        id: 'pr04-q2',
        type: 'numeric',
        prompt: 'In a cyclic quadrilateral ABCD, angle A = 85°. What is angle C?',
        correctAnswer: 95,
        tolerance: 0,
        hint: 'Opposite angles in a cyclic quadrilateral sum to 180°',
        explanation: 'A + C = 180°, so C = 180° - 85° = 95°',
        points: 15,
      },
    },
    {
      id: 'pr04-summary',
      type: 'summary',
      title: 'Circle Theorem Arsenal',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Key Theorems',
          content: 'Center = 2× edge. Semicircle = 90°. Same segment = equal. Cyclic opposite = 180°. Tangent ⊥ radius.',
        },
      ],
    },
  ],
  xpReward: 55,
};

// Module definition
export const MODULE_PROOFS: LessonModule = {
  id: 'module-proofs',
  topicId: 'geometry_proofs' as QuizTopic,
  title: 'Proofs in Plane Geometry',
  description: 'Master geometric reasoning and circle theorems',
  lessons: [
    'proof-01-intro',
    'proof-02-congruence',
    'proof-03-similarity',
    'proof-04-circles',
  ],
  totalXP: 160,
};

// Export all lessons
export const GEOMETRY_PROOFS_LESSONS: Lesson[] = [
  LESSON_PROOF_01,
  LESSON_PROOF_02,
  LESSON_PROOF_03,
  LESSON_PROOF_04,
];
