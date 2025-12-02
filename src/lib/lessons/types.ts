// Bite-sized Lesson Types
// Types for interactive, modular lessons

import { QuizTopic } from '../types';

// Lesson difficulty levels
export type LessonDifficulty = 'foundation' | 'intermediate' | 'advanced';

// Step types within a lesson
export type LessonStepType =
  | 'hook' // Real-world connection to grab attention
  | 'concept' // Core concept explanation
  | 'visual' // Interactive visualization
  | 'example' // Worked example
  | 'practice' // Interactive practice problem
  | 'quiz' // Quick check question
  | 'summary'; // Review key points

// Question types
export type QuestionType =
  | 'multiple-choice'
  | 'multiple-select'
  | 'fill-blank'
  | 'numeric'
  | 'matching'
  | 'ordering'
  | 'true-false'
  | 'graph-interact';

// Base question interface
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  promptLatex?: string; // LaTeX version of prompt
  hint?: string;
  explanation: string;
  explanationLatex?: string;
  points: number;
  timeLimit?: number; // seconds
}

// Multiple choice question
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: {
    id: string;
    text: string;
    latex?: string;
  }[];
  correctAnswer: string; // option id
}

// Multiple select question
export interface MultipleSelectQuestion extends BaseQuestion {
  type: 'multiple-select';
  options: {
    id: string;
    text: string;
    latex?: string;
  }[];
  correctAnswers: string[]; // option ids
}

// Fill in the blank question
export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  blanks: {
    id: string;
    placeholder?: string;
  }[];
  correctAnswers: Record<string, string[]>; // blank id -> acceptable answers
}

// Numeric answer question
export interface NumericQuestion extends BaseQuestion {
  type: 'numeric';
  correctAnswer: number;
  tolerance?: number; // acceptable range
  unit?: string;
}

// Matching question
export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  leftItems: {
    id: string;
    text: string;
    latex?: string;
  }[];
  rightItems: {
    id: string;
    text: string;
    latex?: string;
  }[];
  correctMatches: Record<string, string>; // left id -> right id
}

// Ordering question
export interface OrderingQuestion extends BaseQuestion {
  type: 'ordering';
  items: {
    id: string;
    text: string;
    latex?: string;
  }[];
  correctOrder: string[]; // item ids in correct order
}

// True/False question
export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

// Graph interaction question
export interface GraphInteractQuestion extends BaseQuestion {
  type: 'graph-interact';
  initialGraph: {
    expressions: Array<{
      latex: string;
      color?: string;
      hidden?: boolean;
    }>;
    bounds?: {
      left: number;
      right: number;
      bottom: number;
      top: number;
    };
  };
  task: string; // What user needs to do
  validation: {
    type: 'point' | 'value' | 'expression';
    target: string;
    tolerance?: number;
  };
}

// Union type for all questions
export type LessonQuestion =
  | MultipleChoiceQuestion
  | MultipleSelectQuestion
  | FillBlankQuestion
  | NumericQuestion
  | MatchingQuestion
  | OrderingQuestion
  | TrueFalseQuestion
  | GraphInteractQuestion;

// Content block types
export interface TextBlock {
  type: 'text';
  content: string;
}

export interface LatexBlock {
  type: 'latex';
  content: string;
  display?: boolean; // block vs inline
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface CalloutBlock {
  type: 'callout';
  variant: 'tip' | 'warning' | 'info' | 'example';
  title?: string;
  content: string;
}

export interface StepByStepBlock {
  type: 'steps';
  steps: {
    title: string;
    content: string;
    latex?: string;
  }[];
}

export interface VisualizationBlock {
  type: 'visualization';
  visualType: 'desmos' | 'geogebra' | 'custom';
  config: Record<string, unknown>;
  interactive?: boolean;
}

export type ContentBlock =
  | TextBlock
  | LatexBlock
  | ImageBlock
  | CalloutBlock
  | StepByStepBlock
  | VisualizationBlock;

// Lesson step
export interface LessonStep {
  id: string;
  type: LessonStepType;
  title: string;
  content: ContentBlock[];
  question?: LessonQuestion;
  duration?: number; // estimated minutes
}

// Complete lesson
export interface Lesson {
  id: string;
  topicId: QuizTopic;
  title: string;
  subtitle: string;
  description: string;
  difficulty: LessonDifficulty;
  estimatedTime: number; // minutes
  prerequisites?: string[]; // lesson ids
  objectives: string[];
  steps: LessonStep[];
  xpReward: number;
  badgeId?: string; // achievement badge for completion
}

// Lesson progress
export interface LessonProgress {
  lessonId: string;
  startedAt: string;
  completedAt?: string;
  currentStep: number;
  stepResults: {
    stepId: string;
    completed: boolean;
    score?: number;
    attempts?: number;
  }[];
  totalScore: number;
  xpEarned: number;
}

// Lesson module (group of related lessons)
export interface LessonModule {
  id: string;
  topicId: QuizTopic;
  title: string;
  description: string;
  lessons: string[]; // lesson ids in order
  totalXP: number;
}
