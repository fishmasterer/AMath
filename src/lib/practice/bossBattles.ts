// Boss Battle System
// Immersive topic challenges with phases and special mechanics

import { BossBattleConfig, BossPhase, DifficultyTier } from './types';

// =============================================================================
// BOSS BATTLE CONFIGURATIONS
// =============================================================================

export const BOSS_BATTLES: BossBattleConfig[] = [
  // ==========================================================================
  // QUADRATICS BOSS
  // ==========================================================================
  {
    id: 'boss-quadratics',
    name: 'The Parabolic Guardian',
    description: 'A mathematical entity that guards the secrets of quadratic functions. Defeat it to prove your mastery.',
    bossName: 'Vertex Prime',
    bossTitle: 'Guardian of the Parabola',
    bossHealth: 1000,
    topicId: 'quadratics',
    phases: [
      {
        phaseNumber: 1,
        name: 'Standard Form',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 180,
        specialMechanic: 'Basic quadratic equations and factorization',
      },
      {
        phaseNumber: 2,
        name: 'Completing the Square',
        healthThreshold: 70,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 240,
        specialMechanic: 'Transform equations to vertex form',
      },
      {
        phaseNumber: 3,
        name: 'The Discriminant',
        healthThreshold: 40,
        questionDifficulty: 'gold',
        questionCount: 5,
        timeLimit: 300,
        specialMechanic: 'Nature of roots and discriminant analysis',
      },
      {
        phaseNumber: 4,
        name: 'Final Stand',
        healthThreshold: 15,
        questionDifficulty: 'platinum',
        questionCount: 3,
        timeLimit: 240,
        specialMechanic: 'Complex problem solving with all concepts combined',
      },
    ],
    rewards: [
      { type: 'xp', amount: 500, description: '+500 XP' },
      { type: 'coins', amount: 250, description: '+250 Coins' },
      { type: 'badge', itemId: 'badge-quad-diamond', description: 'Quadratics Diamond Badge' },
      { type: 'title', itemId: 'title-quad-slayer', description: 'Vertex Vanquisher Title' },
    ],
    unlockRequirement: 'Reach Expert mastery in Quadratics',
  },

  // ==========================================================================
  // CALCULUS BOSS
  // ==========================================================================
  {
    id: 'boss-calculus',
    name: 'The Infinite Derivative',
    description: 'An ancient mathematical construct that embodies the concept of instantaneous change. Only true calculus masters can overcome it.',
    bossName: 'Infinitus',
    bossTitle: 'Lord of Limits',
    bossHealth: 1200,
    topicId: 'calculus',
    phases: [
      {
        phaseNumber: 1,
        name: 'Basic Differentiation',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 180,
        specialMechanic: 'Power rule and basic derivatives',
      },
      {
        phaseNumber: 2,
        name: 'Chain Reaction',
        healthThreshold: 75,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 240,
        specialMechanic: 'Chain rule and composite functions',
      },
      {
        phaseNumber: 3,
        name: 'Product and Quotient',
        healthThreshold: 50,
        questionDifficulty: 'gold',
        questionCount: 5,
        timeLimit: 300,
        specialMechanic: 'Product and quotient rule applications',
      },
      {
        phaseNumber: 4,
        name: 'Integration Protocol',
        healthThreshold: 25,
        questionDifficulty: 'platinum',
        questionCount: 5,
        timeLimit: 360,
        specialMechanic: 'Reverse the process - integration challenges',
      },
      {
        phaseNumber: 5,
        name: 'The Infinite Series',
        healthThreshold: 10,
        questionDifficulty: 'diamond',
        questionCount: 3,
        timeLimit: 300,
        specialMechanic: 'Combined differentiation and integration',
      },
    ],
    rewards: [
      { type: 'xp', amount: 750, description: '+750 XP' },
      { type: 'coins', amount: 400, description: '+400 Coins' },
      { type: 'badge', itemId: 'badge-calc-diamond', description: 'Calculus Diamond Badge' },
      { type: 'title', itemId: 'title-calc-slayer', description: 'Derivative Destroyer Title' },
    ],
    unlockRequirement: 'Reach Expert mastery in Calculus',
  },

  // ==========================================================================
  // TRIGONOMETRY BOSS
  // ==========================================================================
  {
    id: 'boss-trigonometry',
    name: 'The Circular Enigma',
    description: 'A being of pure angular geometry that tests the limits of your trigonometric knowledge through wave after wave of challenges.',
    bossName: 'Trigon',
    bossTitle: 'Master of the Unit Circle',
    bossHealth: 1100,
    topicId: 'trigonometry',
    phases: [
      {
        phaseNumber: 1,
        name: 'Basic Ratios',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 180,
        specialMechanic: 'Sin, cos, tan fundamentals',
      },
      {
        phaseNumber: 2,
        name: 'Identity Crisis',
        healthThreshold: 70,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 240,
        specialMechanic: 'Proving and using trigonometric identities',
      },
      {
        phaseNumber: 3,
        name: 'Equation Waves',
        healthThreshold: 40,
        questionDifficulty: 'gold',
        questionCount: 5,
        timeLimit: 300,
        specialMechanic: 'Solving trigonometric equations',
      },
      {
        phaseNumber: 4,
        name: 'R-Formula Finale',
        healthThreshold: 15,
        questionDifficulty: 'platinum',
        questionCount: 4,
        timeLimit: 360,
        specialMechanic: 'R-formula and advanced transformations',
      },
    ],
    rewards: [
      { type: 'xp', amount: 600, description: '+600 XP' },
      { type: 'coins', amount: 300, description: '+300 Coins' },
      { type: 'badge', itemId: 'badge-trig-diamond', description: 'Trigonometry Diamond Badge' },
      { type: 'title', itemId: 'title-trig-slayer', description: 'Circle Conqueror Title' },
    ],
    unlockRequirement: 'Reach Expert mastery in Trigonometry',
  },

  // ==========================================================================
  // EQUATIONS & INEQUALITIES BOSS
  // ==========================================================================
  {
    id: 'boss-equations',
    name: 'The Balance Keeper',
    description: 'Guardian of mathematical equality and inequality. Every equation must balance, every inequality must hold.',
    bossName: 'Equilibrium',
    bossTitle: 'Arbiter of Balance',
    bossHealth: 900,
    topicId: 'equations_inequalities',
    phases: [
      {
        phaseNumber: 1,
        name: 'Linear Balance',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 150,
        specialMechanic: 'Linear equations and inequalities',
      },
      {
        phaseNumber: 2,
        name: 'Modular Shift',
        healthThreshold: 65,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 210,
        specialMechanic: 'Modulus equations and graphs',
      },
      {
        phaseNumber: 3,
        name: 'Simultaneous Strike',
        healthThreshold: 30,
        questionDifficulty: 'gold',
        questionCount: 5,
        timeLimit: 270,
        specialMechanic: 'Simultaneous equations - linear and non-linear',
      },
    ],
    rewards: [
      { type: 'xp', amount: 400, description: '+400 XP' },
      { type: 'coins', amount: 200, description: '+200 Coins' },
      { type: 'badge', itemId: 'badge-eq-diamond', description: 'Equations Diamond Badge' },
    ],
    unlockRequirement: 'Reach Expert mastery in Equations & Inequalities',
  },

  // ==========================================================================
  // EXPONENTIALS & LOGARITHMS BOSS
  // ==========================================================================
  {
    id: 'boss-exponentials',
    name: 'The Exponential Entity',
    description: 'A creature that grows without bound, representing the power of exponential functions. Can you keep up with its rate of growth?',
    bossName: 'Exponentia',
    bossTitle: 'Herald of Growth',
    bossHealth: 1000,
    topicId: 'exponentials',
    phases: [
      {
        phaseNumber: 1,
        name: 'Index Laws',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 150,
        specialMechanic: 'Basic exponential manipulation',
      },
      {
        phaseNumber: 2,
        name: 'Logarithmic Descent',
        healthThreshold: 70,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 210,
        specialMechanic: 'Logarithm laws and simplification',
      },
      {
        phaseNumber: 3,
        name: 'Equation Surge',
        healthThreshold: 40,
        questionDifficulty: 'gold',
        questionCount: 5,
        timeLimit: 270,
        specialMechanic: 'Exponential and logarithmic equations',
      },
      {
        phaseNumber: 4,
        name: 'Natural Logarithm',
        healthThreshold: 15,
        questionDifficulty: 'platinum',
        questionCount: 3,
        timeLimit: 240,
        specialMechanic: 'Natural log applications and modeling',
      },
    ],
    rewards: [
      { type: 'xp', amount: 550, description: '+550 XP' },
      { type: 'coins', amount: 275, description: '+275 Coins' },
      { type: 'badge', itemId: 'badge-exp-diamond', description: 'Exponentials Diamond Badge' },
    ],
    unlockRequirement: 'Reach Expert mastery in Exponentials & Logarithms',
  },

  // ==========================================================================
  // COORDINATE GEOMETRY BOSS
  // ==========================================================================
  {
    id: 'boss-coordinate',
    name: 'The Grid Phantom',
    description: 'A spectral being that exists across all points of the coordinate plane. Navigate through its geometric challenges.',
    bossName: 'Cartesio',
    bossTitle: 'Phantom of the Plane',
    bossHealth: 850,
    topicId: 'coordinate_geometry',
    phases: [
      {
        phaseNumber: 1,
        name: 'Linear Path',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 180,
        specialMechanic: 'Straight lines and gradients',
      },
      {
        phaseNumber: 2,
        name: 'Circular Motion',
        healthThreshold: 60,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 240,
        specialMechanic: 'Circles and their equations',
      },
      {
        phaseNumber: 3,
        name: 'Intersection Point',
        healthThreshold: 25,
        questionDifficulty: 'gold',
        questionCount: 4,
        timeLimit: 270,
        specialMechanic: 'Line-circle intersections and tangents',
      },
    ],
    rewards: [
      { type: 'xp', amount: 400, description: '+400 XP' },
      { type: 'coins', amount: 200, description: '+200 Coins' },
      { type: 'badge', itemId: 'badge-coord-diamond', description: 'Coordinate Geometry Diamond Badge' },
    ],
    unlockRequirement: 'Reach Expert mastery in Coordinate Geometry',
  },

  // ==========================================================================
  // POLYNOMIALS BOSS
  // ==========================================================================
  {
    id: 'boss-polynomials',
    name: 'The Polynomial Hydra',
    description: 'A many-headed beast where each head represents a term. Cut one down, and your understanding must multiply.',
    bossName: 'Polynom',
    bossTitle: 'The Many-Termed',
    bossHealth: 950,
    topicId: 'polynomials',
    phases: [
      {
        phaseNumber: 1,
        name: 'Factor Finding',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 180,
        specialMechanic: 'Factor theorem applications',
      },
      {
        phaseNumber: 2,
        name: 'Remainder Hunt',
        healthThreshold: 65,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 240,
        specialMechanic: 'Remainder theorem and division',
      },
      {
        phaseNumber: 3,
        name: 'Partial Decomposition',
        healthThreshold: 30,
        questionDifficulty: 'gold',
        questionCount: 5,
        timeLimit: 300,
        specialMechanic: 'Partial fractions breakdown',
      },
    ],
    rewards: [
      { type: 'xp', amount: 450, description: '+450 XP' },
      { type: 'coins', amount: 225, description: '+225 Coins' },
      { type: 'badge', itemId: 'badge-poly-diamond', description: 'Polynomials Diamond Badge' },
    ],
    unlockRequirement: 'Reach Expert mastery in Polynomials',
  },

  // ==========================================================================
  // SURDS BOSS
  // ==========================================================================
  {
    id: 'boss-surds',
    name: 'The Irrational One',
    description: 'A being of pure irrationality that cannot be expressed as a simple fraction. Rationalize it to defeat it.',
    bossName: 'Surdis',
    bossTitle: 'The Irrational',
    bossHealth: 700,
    topicId: 'surds',
    phases: [
      {
        phaseNumber: 1,
        name: 'Simplification',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 150,
        specialMechanic: 'Basic surd simplification',
      },
      {
        phaseNumber: 2,
        name: 'Rationalization',
        healthThreshold: 50,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 210,
        specialMechanic: 'Rationalizing denominators',
      },
      {
        phaseNumber: 3,
        name: 'Surd Equations',
        healthThreshold: 20,
        questionDifficulty: 'gold',
        questionCount: 3,
        timeLimit: 210,
        specialMechanic: 'Solving equations with surds',
      },
    ],
    rewards: [
      { type: 'xp', amount: 350, description: '+350 XP' },
      { type: 'coins', amount: 175, description: '+175 Coins' },
      { type: 'badge', itemId: 'badge-surd-diamond', description: 'Surds Diamond Badge' },
    ],
    unlockRequirement: 'Reach Expert mastery in Surds',
  },

  // ==========================================================================
  // BINOMIAL BOSS
  // ==========================================================================
  {
    id: 'boss-binomial',
    name: 'Pascal\'s Construct',
    description: 'A mathematical construct built from Pascal\'s Triangle itself. Navigate the expanding coefficients to victory.',
    bossName: 'Binomius',
    bossTitle: 'Keeper of Coefficients',
    bossHealth: 800,
    topicId: 'binomial',
    phases: [
      {
        phaseNumber: 1,
        name: 'Triangle Navigation',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 180,
        specialMechanic: 'Pascal\'s Triangle and basic expansion',
      },
      {
        phaseNumber: 2,
        name: 'Coefficient Hunt',
        healthThreshold: 55,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 240,
        specialMechanic: 'Finding specific terms and coefficients',
      },
      {
        phaseNumber: 3,
        name: 'General Term',
        healthThreshold: 20,
        questionDifficulty: 'gold',
        questionCount: 4,
        timeLimit: 270,
        specialMechanic: 'General term formula applications',
      },
    ],
    rewards: [
      { type: 'xp', amount: 400, description: '+400 XP' },
      { type: 'coins', amount: 200, description: '+200 Coins' },
      { type: 'badge', itemId: 'badge-binom-diamond', description: 'Binomial Diamond Badge' },
    ],
    unlockRequirement: 'Reach Expert mastery in Binomial Expansion',
  },

  // ==========================================================================
  // GEOMETRY PROOFS BOSS
  // ==========================================================================
  {
    id: 'boss-proofs',
    name: 'The Geometric Oracle',
    description: 'An ancient oracle that speaks only in theorems and proofs. Demonstrate your logical reasoning to earn its wisdom.',
    bossName: 'Euclidus',
    bossTitle: 'The Eternal Prover',
    bossHealth: 1000,
    topicId: 'geometry_proofs',
    phases: [
      {
        phaseNumber: 1,
        name: 'Congruence Tests',
        healthThreshold: 100,
        questionDifficulty: 'bronze',
        questionCount: 5,
        timeLimit: 210,
        specialMechanic: 'SSS, SAS, ASA, AAS, RHS',
      },
      {
        phaseNumber: 2,
        name: 'Similarity Trials',
        healthThreshold: 65,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 270,
        specialMechanic: 'Similar triangles and ratios',
      },
      {
        phaseNumber: 3,
        name: 'Circle Theorems',
        healthThreshold: 30,
        questionDifficulty: 'gold',
        questionCount: 5,
        timeLimit: 330,
        specialMechanic: 'Angle properties and cyclic quadrilaterals',
      },
    ],
    rewards: [
      { type: 'xp', amount: 500, description: '+500 XP' },
      { type: 'coins', amount: 250, description: '+250 Coins' },
      { type: 'badge', itemId: 'badge-proof-diamond', description: 'Proofs Diamond Badge' },
    ],
    unlockRequirement: 'Reach Expert mastery in Geometry Proofs',
  },

  // ==========================================================================
  // FINAL BOSS - ALL TOPICS
  // ==========================================================================
  {
    id: 'boss-final',
    name: 'The Mathematical Nexus',
    description: 'The ultimate challenge. A convergence of all mathematical concepts into a single, formidable entity. Only true masters dare face it.',
    bossName: 'Omnimathis',
    bossTitle: 'The Unified Force',
    bossHealth: 2000,
    topicId: 'all',
    phases: [
      {
        phaseNumber: 1,
        name: 'Algebraic Foundation',
        healthThreshold: 100,
        questionDifficulty: 'silver',
        questionCount: 5,
        timeLimit: 300,
        specialMechanic: 'Quadratics, equations, surds, binomial',
      },
      {
        phaseNumber: 2,
        name: 'Geometric Ascension',
        healthThreshold: 80,
        questionDifficulty: 'gold',
        questionCount: 5,
        timeLimit: 360,
        specialMechanic: 'Coordinate geometry and proofs',
      },
      {
        phaseNumber: 3,
        name: 'Trigonometric Wave',
        healthThreshold: 60,
        questionDifficulty: 'gold',
        questionCount: 5,
        timeLimit: 360,
        specialMechanic: 'All trigonometric concepts',
      },
      {
        phaseNumber: 4,
        name: 'Calculus Storm',
        healthThreshold: 40,
        questionDifficulty: 'platinum',
        questionCount: 5,
        timeLimit: 420,
        specialMechanic: 'Differentiation and integration',
      },
      {
        phaseNumber: 5,
        name: 'The Grand Convergence',
        healthThreshold: 20,
        questionDifficulty: 'platinum',
        questionCount: 5,
        timeLimit: 450,
        specialMechanic: 'Mixed topics at highest difficulty',
      },
      {
        phaseNumber: 6,
        name: 'Final Reckoning',
        healthThreshold: 5,
        questionDifficulty: 'diamond',
        questionCount: 3,
        timeLimit: 360,
        specialMechanic: 'Ultimate challenge questions',
      },
    ],
    rewards: [
      { type: 'xp', amount: 2000, description: '+2000 XP' },
      { type: 'coins', amount: 1000, description: '+1000 Coins' },
      { type: 'badge', itemId: 'badge-ultimate', description: 'Ultimate Mathematician Badge' },
      { type: 'title', itemId: 'title-transcendent', description: 'Transcendent Title' },
      { type: 'cosmetic', itemId: 'aura-golden', description: 'Golden Aura Effect' },
    ],
    unlockRequirement: 'Defeat all other topic bosses',
  },
];

// =============================================================================
// BOSS BATTLE STATE MANAGEMENT
// =============================================================================

export interface BossBattleState {
  bossId: string;
  currentPhase: number;
  bossHealth: number;
  maxHealth: number;
  playerHealth: number;
  maxPlayerHealth: number;
  currentQuestion: number;
  totalDamageDealt: number;
  questionsAnswered: number;
  questionsCorrect: number;
  timeElapsed: number;
  isDefeated: boolean;
  isPhaseClear: boolean;
}

export function initBossBattle(bossId: string): BossBattleState {
  const boss = BOSS_BATTLES.find((b) => b.id === bossId);
  if (!boss) throw new Error(`Boss ${bossId} not found`);

  return {
    bossId,
    currentPhase: 1,
    bossHealth: boss.bossHealth,
    maxHealth: boss.bossHealth,
    playerHealth: 100,
    maxPlayerHealth: 100,
    currentQuestion: 0,
    totalDamageDealt: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    timeElapsed: 0,
    isDefeated: false,
    isPhaseClear: false,
  };
}

export function calculateDamage(
  isCorrect: boolean,
  timeTaken: number,
  timeLimit: number,
  difficulty: DifficultyTier
): { bossDamage: number; playerDamage: number } {
  const difficultyMultiplier: Record<DifficultyTier, number> = {
    bronze: 1.0,
    silver: 1.25,
    gold: 1.5,
    platinum: 2.0,
    diamond: 2.5,
  };

  if (isCorrect) {
    // Player deals damage to boss
    let baseDamage = 50 * difficultyMultiplier[difficulty];

    // Time bonus
    const timeRatio = timeTaken / timeLimit;
    if (timeRatio < 0.5) baseDamage *= 1.5;
    else if (timeRatio < 0.75) baseDamage *= 1.25;

    return { bossDamage: Math.round(baseDamage), playerDamage: 0 };
  } else {
    // Boss deals damage to player
    const playerDamage = 15 + Math.floor(Math.random() * 10);
    return { bossDamage: 0, playerDamage };
  }
}

export function getPhaseByHealthPercentage(
  boss: BossBattleConfig,
  healthPercentage: number
): BossPhase {
  const phases = [...boss.phases].sort((a, b) => b.healthThreshold - a.healthThreshold);

  for (const phase of phases) {
    if (healthPercentage <= phase.healthThreshold) {
      return phase;
    }
  }

  return boss.phases[0];
}

export default BOSS_BATTLES;
