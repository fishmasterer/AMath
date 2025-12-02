// Lesson Content Index
// Export all lesson content from various topics

export {
  QUADRATIC_LESSONS,
  MODULE_QUADRATICS,
  LESSON_QUADRATICS_01,
  LESSON_QUADRATICS_02,
  LESSON_QUADRATICS_03,
  LESSON_QUADRATICS_04,
  LESSON_QUADRATICS_05,
} from './quadratics';

export {
  TRIGONOMETRY_LESSONS,
  MODULE_TRIGONOMETRY,
} from './trigonometry';

// Combined exports
import { QUADRATIC_LESSONS, MODULE_QUADRATICS } from './quadratics';
import { TRIGONOMETRY_LESSONS, MODULE_TRIGONOMETRY } from './trigonometry';
import { Lesson, LessonModule } from '../types';

// All lessons combined
export const ALL_LESSONS: Lesson[] = [
  ...QUADRATIC_LESSONS,
  ...TRIGONOMETRY_LESSONS,
];

// All modules combined
export const ALL_MODULES: LessonModule[] = [
  MODULE_QUADRATICS,
  MODULE_TRIGONOMETRY,
];

// Helper to get lesson by ID
export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((lesson) => lesson.id === id);
}

// Helper to get module by ID
export function getModuleById(id: string): LessonModule | undefined {
  return ALL_MODULES.find((module) => module.id === id);
}

// Helper to get lessons by topic
export function getLessonsByTopic(topicId: string): Lesson[] {
  return ALL_LESSONS.filter((lesson) => lesson.topicId === topicId);
}

// Helper to get module by topic
export function getModuleByTopic(topicId: string): LessonModule | undefined {
  return ALL_MODULES.find((module) => module.topicId === topicId);
}
