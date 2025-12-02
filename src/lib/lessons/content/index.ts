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

export {
  equationsLessons,
  MODULE_EQUATIONS,
} from './equations-inequalities';

export {
  surdsLessons,
  MODULE_SURDS,
} from './surds';

export {
  polynomialsLessons,
  MODULE_POLYNOMIALS,
} from './polynomials';

export {
  binomialLessons,
  MODULE_BINOMIAL,
} from './binomial';

export {
  exponentialsLessons,
  MODULE_EXPONENTIALS,
} from './exponentials';

export {
  coordinateGeometryLessons,
  MODULE_COORDINATE_GEOMETRY,
} from './coordinate-geometry';

export {
  proofsLessons,
  MODULE_PROOFS,
} from './geometry-proofs';

export {
  calculusLessons,
  MODULE_CALCULUS,
} from './calculus';

// Combined exports
import { QUADRATIC_LESSONS, MODULE_QUADRATICS } from './quadratics';
import { TRIGONOMETRY_LESSONS, MODULE_TRIGONOMETRY } from './trigonometry';
import { equationsLessons, MODULE_EQUATIONS } from './equations-inequalities';
import { surdsLessons, MODULE_SURDS } from './surds';
import { polynomialsLessons, MODULE_POLYNOMIALS } from './polynomials';
import { binomialLessons, MODULE_BINOMIAL } from './binomial';
import { exponentialsLessons, MODULE_EXPONENTIALS } from './exponentials';
import { coordinateGeometryLessons, MODULE_COORDINATE_GEOMETRY } from './coordinate-geometry';
import { proofsLessons, MODULE_PROOFS } from './geometry-proofs';
import { calculusLessons, MODULE_CALCULUS } from './calculus';
import { Lesson, LessonModule } from '../types';

// All lessons combined
export const ALL_LESSONS: Lesson[] = [
  ...QUADRATIC_LESSONS,
  ...TRIGONOMETRY_LESSONS,
  ...equationsLessons,
  ...surdsLessons,
  ...polynomialsLessons,
  ...binomialLessons,
  ...exponentialsLessons,
  ...coordinateGeometryLessons,
  ...proofsLessons,
  ...calculusLessons,
];

// All modules combined
export const ALL_MODULES: LessonModule[] = [
  MODULE_QUADRATICS,
  MODULE_TRIGONOMETRY,
  MODULE_EQUATIONS,
  MODULE_SURDS,
  MODULE_POLYNOMIALS,
  MODULE_BINOMIAL,
  MODULE_EXPONENTIALS,
  MODULE_COORDINATE_GEOMETRY,
  MODULE_PROOFS,
  MODULE_CALCULUS,
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
