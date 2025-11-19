// lib/utils/grading.ts
// Quiz grading and scoring logic

import { Question, MCQQuestion, MultiSelectQuestion, StudentAnswer, QuestionResult } from '../types';

export interface GradingResult {
  score: number;
  total_marks: number;
  question_results: Omit<QuestionResult, 'id' | 'attempt_id' | 'created_at'>[];
}

/**
 * Grade a single MCQ question
 */
const gradeMCQQuestion = (
  question: MCQQuestion,
  studentAnswer: string | string[] | undefined,
  questionIndex: number,
  topic: string
): Omit<QuestionResult, 'id' | 'attempt_id' | 'created_at'> => {
  const answer = Array.isArray(studentAnswer) ? studentAnswer[0] : studentAnswer;
  const isCorrect = answer === question.correctAnswer;

  // Support both 'question' and 'text' field names
  const questionText = (question as any).question || (question as any).text || '';

  return {
    question_index: questionIndex,
    question_text: questionText,
    topic: topic as any,
    question_type: 'mcq',
    student_answer: answer || '',
    correct_answer: question.correctAnswer,
    is_correct: isCorrect,
    marks_awarded: isCorrect ? question.marks : 0,
    marks_possible: question.marks,
  };
};

/**
 * Grade a single multi-select question
 */
const gradeMultiSelectQuestion = (
  question: MultiSelectQuestion,
  studentAnswer: string | string[] | undefined,
  questionIndex: number,
  topic: string
): Omit<QuestionResult, 'id' | 'attempt_id' | 'created_at'> => {
  const answers = Array.isArray(studentAnswer) ? studentAnswer : [];
  const correctAnswers = question.correctAnswers;

  // Check if answers are exactly correct
  const sortedStudentAnswers = [...answers].sort();
  const sortedCorrectAnswers = [...correctAnswers].sort();
  const isExactMatch = JSON.stringify(sortedStudentAnswers) === JSON.stringify(sortedCorrectAnswers);

  let marksAwarded = 0;

  if (isExactMatch) {
    // Full marks for exact match
    marksAwarded = question.marks;
  } else if (question.partialCredit && answers.length > 0) {
    // Calculate partial credit
    const correctSelected = answers.filter(ans => correctAnswers.includes(ans)).length;
    const incorrectSelected = answers.filter(ans => !correctAnswers.includes(ans)).length;
    const totalCorrect = correctAnswers.length;

    // Partial credit formula: (correct - incorrect) / total * marks
    // Minimum 0 marks
    const ratio = Math.max(0, (correctSelected - incorrectSelected) / totalCorrect);
    marksAwarded = Math.floor(ratio * question.marks);
  }

  // Support both 'question' and 'text' field names
  const questionText = (question as any).question || (question as any).text || '';

  return {
    question_index: questionIndex,
    question_text: questionText,
    topic: topic as any,
    question_type: 'multi_select',
    student_answer: answers,
    correct_answer: correctAnswers,
    is_correct: isExactMatch,
    marks_awarded: marksAwarded,
    marks_possible: question.marks,
  };
};

/**
 * Grade an entire quiz attempt
 */
export const gradeQuiz = (
  questions: Question[],
  studentAnswers: StudentAnswer[],
  topic: string
): GradingResult => {
  // Ensure questions is an array
  if (!Array.isArray(questions)) {
    console.error('Questions is not an array:', typeof questions, questions);
    throw new Error(`Questions must be an array, got ${typeof questions}`);
  }

  if (questions.length === 0) {
    throw new Error('Questions array is empty');
  }

  const answerMap = new Map(
    studentAnswers.map(ans => [ans.question_id, ans.answer])
  );

  const question_results = questions.map((question, index) => {
    const studentAnswer = answerMap.get(question.id);

    if (question.type === 'mcq') {
      return gradeMCQQuestion(question, studentAnswer, index, topic);
    } else {
      return gradeMultiSelectQuestion(question, studentAnswer, index, topic);
    }
  });

  const score = question_results.reduce((sum, result) => sum + result.marks_awarded, 0);
  const total_marks = question_results.reduce((sum, result) => sum + result.marks_possible, 0);

  return {
    score,
    total_marks,
    question_results,
  };
};

/**
 * Calculate percentage score
 */
export const calculatePercentage = (score: number, totalMarks: number): number => {
  if (totalMarks === 0) return 0;
  return Math.round((score / totalMarks) * 100);
};

/**
 * Get grade letter based on percentage
 */
export const getGradeLetter = (percentage: number): string => {
  if (percentage >= 75) return 'A1';
  if (percentage >= 70) return 'A2';
  if (percentage >= 65) return 'B3';
  if (percentage >= 60) return 'B4';
  if (percentage >= 55) return 'C5';
  if (percentage >= 50) return 'C6';
  if (percentage >= 45) return 'D7';
  if (percentage >= 40) return 'E8';
  return 'F9';
};

/**
 * Format time taken in human-readable format
 */
export const formatTimeTaken = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

/**
 * Check if quiz is overdue
 */
export const isQuizOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date();
};

/**
 * Get time remaining until due date
 */
export const getTimeRemaining = (dueDate: string): {
  days: number;
  hours: number;
  minutes: number;
  expired: boolean;
} => {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes, expired: false };
};

/**
 * Format time remaining as string
 */
export const formatTimeRemaining = (dueDate: string): string => {
  const { days, hours, minutes, expired } = getTimeRemaining(dueDate);
  
  if (expired) return 'Overdue';
  if (days > 7) return `${days} days`;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};
