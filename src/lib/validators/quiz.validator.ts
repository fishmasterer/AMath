// lib/validators/quiz.validator.ts
// Quiz upload validation using Zod

import { z } from 'zod';
import { QuizTopic, QuizDifficulty } from '../types';

// Base question schema
const baseQuestionSchema = z.object({
  id: z.number().int().positive(),
  question: z.string().min(1, 'Question text is required'),
  marks: z.number().int().positive().max(12, 'Maximum 12 marks per question'),
  explanation: z.string().optional(),
});

// MCQ question schema
const mcqQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('mcq'),
  options: z.tuple([
    z.string().min(1),
    z.string().min(1),
    z.string().min(1),
    z.string().min(1),
  ]).describe('Exactly 4 options required for MCQ'),
  correctAnswer: z.enum(['A', 'B', 'C', 'D']),
});

// Multi-select question schema
const multiSelectQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('multi_select'),
  options: z.array(z.string().min(1)).min(3, 'At least 3 options required'),
  correctAnswers: z.array(z.string()).min(1, 'At least one correct answer required'),
  partialCredit: z.boolean().default(false),
});

// Combined question schema
const questionSchema = z.discriminatedUnion('type', [
  mcqQuestionSchema,
  multiSelectQuestionSchema,
]);

// Quiz upload payload schema
export const quizUploadSchema = z.object({
  title: z.string().min(1, 'Quiz title is required').max(200),
  topic: z.enum(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'G1', 'G2', 'G3', 'C1']),
  week: z.number().int().positive().max(104, 'Week must be between 1 and 104'),
  difficulty: z.enum(['foundational', 'intermediate', 'exam_level']),
  time_limit_minutes: z.number().int().min(5).max(135, 'Time limit between 5 and 135 minutes'),
  due_date: z.string().datetime('Due date must be ISO 8601 format'),
  published: z.boolean().optional(),
  questions: z.array(questionSchema)
    .min(1, 'At least one question required')
    .max(20, 'Maximum 20 questions per quiz'),
}).refine(
  (data) => {
    // Ensure question IDs are unique
    const ids = data.questions.map(q => q.id);
    return new Set(ids).size === ids.length;
  },
  {
    message: 'Question IDs must be unique',
    path: ['questions'],
  }
).refine(
  (data) => {
    // Ensure due date is in the future
    return new Date(data.due_date) > new Date();
  },
  {
    message: 'Due date must be in the future',
    path: ['due_date'],
  }
);

// Type inference
export type QuizUploadInput = z.infer<typeof quizUploadSchema>;
export type ValidatedQuestion = z.infer<typeof questionSchema>;

// Validation function
export const validateQuizUpload = (data: unknown) => {
  try {
    const validated = quizUploadSchema.parse(data);
    
    // Calculate total marks
    const total_marks = validated.questions.reduce((sum, q) => sum + q.marks, 0);
    
    return {
      success: true,
      data: {
        ...validated,
        total_marks,
      },
      errors: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    
    return {
      success: false,
      data: null,
      errors: [{
        path: 'unknown',
        message: 'Validation failed with unknown error',
      }],
    };
  }
};

// Helper to validate multi-select correct answers
export const validateMultiSelectAnswers = (
  correctAnswers: string[],
  options: string[]
): boolean => {
  const optionLetters = options.map((_, i) => 
    String.fromCharCode(65 + i) // A, B, C, D, ...
  );
  
  return correctAnswers.every(answer => optionLetters.includes(answer));
};

// Generate example quiz JSON for reference
export const generateExampleQuizJSON = (): string => {
  const example = {
    title: "Quadratic Functions - Week 2",
    topic: "A1",
    week: 2,
    difficulty: "intermediate",
    time_limit_minutes: 30,
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "Find the minimum value of $f(x) = 2x^2 + 8x + 3$ by completing the square.",
        options: [
          "$-5$",
          "$-2$",
          "$0$",
          "$3$"
        ],
        correctAnswer: "A",
        marks: 3,
        explanation: "Complete the square: $f(x) = 2(x+2)^2 - 5$. The minimum value is $-5$ when $x = -2$."
      },
      {
        id: 2,
        type: "multi_select",
        question: "Which of the following quadratic equations have real roots? (Select all that apply)",
        options: [
          "$x^2 + 2x + 1 = 0$",
          "$x^2 + 2x + 2 = 0$",
          "$x^2 - 4x + 4 = 0$",
          "$2x^2 + x + 3 = 0$"
        ],
        correctAnswers: ["A", "C"],
        partialCredit: true,
        marks: 4,
        explanation: "Use discriminant $\\Delta = b^2 - 4ac$. Real roots when $\\Delta \\geq 0$."
      }
    ]
  };
  
  return JSON.stringify(example, null, 2);
};
