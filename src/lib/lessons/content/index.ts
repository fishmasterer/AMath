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
  EQUATIONS_LESSONS,
  MODULE_EQUATIONS,
} from './equations-inequalities';

export {
  SURDS_LESSONS,
  MODULE_SURDS,
} from './surds';

export {
  POLYNOMIALS_LESSONS,
  MODULE_POLYNOMIALS,
} from './polynomials';

export {
  BINOMIAL_LESSONS,
  MODULE_BINOMIAL,
} from './binomial';

export {
  EXPONENTIALS_LESSONS,
  MODULE_EXPONENTIALS,
} from './exponentials';

export {
  COORDINATE_LESSONS,
  MODULE_COORDINATE,
} from './coordinate-geometry';

export {
  GEOMETRY_PROOFS_LESSONS,
  MODULE_PROOFS,
} from './geometry-proofs';

export {
  CALCULUS_LESSONS,
  MODULE_CALCULUS,
} from './calculus';

// Combined exports
import { QUADRATIC_LESSONS, MODULE_QUADRATICS } from './quadratics';
import { TRIGONOMETRY_LESSONS, MODULE_TRIGONOMETRY } from './trigonometry';
import { EQUATIONS_LESSONS, MODULE_EQUATIONS } from './equations-inequalities';
import { SURDS_LESSONS, MODULE_SURDS } from './surds';
import { POLYNOMIALS_LESSONS, MODULE_POLYNOMIALS } from './polynomials';
import { BINOMIAL_LESSONS, MODULE_BINOMIAL } from './binomial';
import { EXPONENTIALS_LESSONS, MODULE_EXPONENTIALS } from './exponentials';
import { COORDINATE_LESSONS, MODULE_COORDINATE } from './coordinate-geometry';
import { GEOMETRY_PROOFS_LESSONS, MODULE_PROOFS } from './geometry-proofs';
import { CALCULUS_LESSONS, MODULE_CALCULUS } from './calculus';
import { Lesson, LessonModule } from '../types';

// All lessons combined
export const ALL_LESSONS: Lesson[] = [
  ...QUADRATIC_LESSONS,
  ...TRIGONOMETRY_LESSONS,
  ...EQUATIONS_LESSONS,
  ...SURDS_LESSONS,
  ...POLYNOMIALS_LESSONS,
  ...BINOMIAL_LESSONS,
  ...EXPONENTIALS_LESSONS,
  ...COORDINATE_LESSONS,
  ...GEOMETRY_PROOFS_LESSONS,
  ...CALCULUS_LESSONS,
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
  MODULE_COORDINATE,
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
