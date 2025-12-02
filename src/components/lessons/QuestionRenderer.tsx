'use client';

import { LessonQuestion } from '@/lib/lessons/types';
import {
  MultipleChoice,
  MultipleSelect,
  FillBlank,
  Numeric,
  Matching,
  Ordering,
  TrueFalse,
  GraphInteract,
} from './questions';

interface QuestionRendererProps {
  question: LessonQuestion;
  onAnswer: (correct: boolean, points: number) => void;
  showHints?: boolean;
}

export function QuestionRenderer({
  question,
  onAnswer,
  showHints = true,
}: QuestionRendererProps) {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoice
          question={question}
          onAnswer={onAnswer}
          showHints={showHints}
        />
      );

    case 'multiple-select':
      return (
        <MultipleSelect
          question={question}
          onAnswer={onAnswer}
          showHints={showHints}
        />
      );

    case 'fill-blank':
      return (
        <FillBlank
          question={question}
          onAnswer={onAnswer}
          showHints={showHints}
        />
      );

    case 'numeric':
      return (
        <Numeric
          question={question}
          onAnswer={onAnswer}
          showHints={showHints}
        />
      );

    case 'matching':
      return (
        <Matching
          question={question}
          onAnswer={onAnswer}
          showHints={showHints}
        />
      );

    case 'ordering':
      return (
        <Ordering
          question={question}
          onAnswer={onAnswer}
          showHints={showHints}
        />
      );

    case 'true-false':
      return (
        <TrueFalse
          question={question}
          onAnswer={onAnswer}
          showHints={showHints}
        />
      );

    case 'graph-interact':
      return (
        <GraphInteract
          question={question}
          onAnswer={onAnswer}
          showHints={showHints}
        />
      );

    default:
      return (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
          Unknown question type: {(question as LessonQuestion).type}
        </div>
      );
  }
}
