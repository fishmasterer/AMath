// Achievement Definitions
// Complete collection of achievements, badges, and titles

import { Achievement, Badge, Title, TopicMastery, MasteryLevel } from './types';

// =============================================================================
// MASTERY ACHIEVEMENTS - Topic-specific progression
// =============================================================================

export const MASTERY_ACHIEVEMENTS: Achievement[] = [
  // Quadratics Mastery Track
  {
    id: 'quadratics-novice',
    name: 'Quadratic Awakening',
    description: 'Complete your first quadratics lesson',
    category: 'mastery',
    rarity: 'common',
    icon: 'parabola',
    xpReward: 25,
    coinReward: 10,
    requirements: [
      { type: 'lessons_completed', target: 1, topicId: 'quadratics', description: 'Complete 1 quadratics lesson' },
    ],
    isSecret: false,
  },
  {
    id: 'quadratics-apprentice',
    name: 'Parabola Pursuer',
    description: 'Achieve 80% accuracy in quadratics',
    category: 'mastery',
    rarity: 'uncommon',
    icon: 'parabola-up',
    xpReward: 75,
    coinReward: 30,
    requirements: [
      { type: 'accuracy_percentage', target: 80, topicId: 'quadratics', description: 'Reach 80% accuracy in quadratics' },
      { type: 'questions_answered', target: 50, topicId: 'quadratics', description: 'Answer 50 quadratics questions' },
    ],
    isSecret: false,
  },
  {
    id: 'quadratics-master',
    name: 'Vertex Virtuoso',
    description: 'Achieve complete mastery of quadratics',
    category: 'mastery',
    rarity: 'rare',
    icon: 'crown-parabola',
    xpReward: 200,
    coinReward: 100,
    requirements: [
      { type: 'topic_mastery', target: 5, topicId: 'quadratics', description: 'Reach Master level in quadratics' },
      { type: 'accuracy_percentage', target: 90, topicId: 'quadratics', description: 'Maintain 90% accuracy' },
    ],
    isSecret: false,
  },

  // Calculus Mastery Track
  {
    id: 'calculus-novice',
    name: 'Derivative Discoverer',
    description: 'Complete your first calculus lesson',
    category: 'mastery',
    rarity: 'common',
    icon: 'integral',
    xpReward: 25,
    coinReward: 10,
    requirements: [
      { type: 'lessons_completed', target: 1, topicId: 'calculus', description: 'Complete 1 calculus lesson' },
    ],
    isSecret: false,
  },
  {
    id: 'calculus-journeyman',
    name: 'Rate of Change Champion',
    description: 'Complete all differentiation lessons with 75% accuracy',
    category: 'mastery',
    rarity: 'uncommon',
    icon: 'derivative',
    xpReward: 100,
    coinReward: 50,
    requirements: [
      { type: 'lessons_completed', target: 3, topicId: 'calculus', description: 'Complete 3 calculus lessons' },
      { type: 'accuracy_percentage', target: 75, topicId: 'calculus', description: 'Reach 75% accuracy' },
    ],
    isSecret: false,
  },
  {
    id: 'calculus-master',
    name: 'Integral Illuminator',
    description: 'Achieve complete mastery of calculus',
    category: 'mastery',
    rarity: 'epic',
    icon: 'infinity-integral',
    xpReward: 300,
    coinReward: 150,
    requirements: [
      { type: 'topic_mastery', target: 5, topicId: 'calculus', description: 'Reach Master level in calculus' },
      { type: 'perfect_scores', target: 3, topicId: 'calculus', description: 'Achieve 3 perfect scores' },
    ],
    isSecret: false,
  },

  // Trigonometry Mastery Track
  {
    id: 'trig-novice',
    name: 'Angle Apprentice',
    description: 'Begin your trigonometry journey',
    category: 'mastery',
    rarity: 'common',
    icon: 'triangle',
    xpReward: 25,
    coinReward: 10,
    requirements: [
      { type: 'lessons_completed', target: 1, topicId: 'trigonometry', description: 'Complete 1 trigonometry lesson' },
    ],
    isSecret: false,
  },
  {
    id: 'trig-master',
    name: 'Sine Wave Sovereign',
    description: 'Master all trigonometric functions and identities',
    category: 'mastery',
    rarity: 'epic',
    icon: 'sine-wave-crown',
    xpReward: 300,
    coinReward: 150,
    requirements: [
      { type: 'topic_mastery', target: 5, topicId: 'trigonometry', description: 'Reach Master level' },
      { type: 'accuracy_percentage', target: 85, topicId: 'trigonometry', description: 'Maintain 85% accuracy' },
    ],
    isSecret: false,
  },
];

// =============================================================================
// STREAK ACHIEVEMENTS - Consistency and dedication
// =============================================================================

export const STREAK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'streak-3',
    name: 'Getting Started',
    description: 'Practice for 3 days in a row',
    category: 'streak',
    rarity: 'common',
    icon: 'flame-small',
    xpReward: 30,
    coinReward: 15,
    requirements: [
      { type: 'streak_days', target: 3, description: 'Maintain a 3-day streak' },
    ],
    isSecret: false,
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Practice every day for a week',
    category: 'streak',
    rarity: 'uncommon',
    icon: 'flame-medium',
    xpReward: 75,
    coinReward: 40,
    requirements: [
      { type: 'streak_days', target: 7, description: 'Maintain a 7-day streak' },
    ],
    isSecret: false,
  },
  {
    id: 'streak-30',
    name: 'Monthly Dedication',
    description: 'Practice every day for a month',
    category: 'streak',
    rarity: 'rare',
    icon: 'flame-large',
    xpReward: 300,
    coinReward: 200,
    requirements: [
      { type: 'streak_days', target: 30, description: 'Maintain a 30-day streak' },
    ],
    isSecret: false,
  },
  {
    id: 'streak-100',
    name: 'Century Scholar',
    description: 'Practice for 100 consecutive days',
    category: 'streak',
    rarity: 'epic',
    icon: 'flame-eternal',
    xpReward: 1000,
    coinReward: 500,
    requirements: [
      { type: 'streak_days', target: 100, description: 'Maintain a 100-day streak' },
    ],
    isSecret: false,
  },
  {
    id: 'streak-365',
    name: 'Year of Mastery',
    description: 'Practice every single day for a year',
    category: 'streak',
    rarity: 'legendary',
    icon: 'phoenix',
    xpReward: 5000,
    coinReward: 2500,
    requirements: [
      { type: 'streak_days', target: 365, description: 'Maintain a 365-day streak' },
    ],
    isSecret: false,
  },
  {
    id: 'question-streak-10',
    name: 'Accuracy Chain',
    description: 'Answer 10 questions correctly in a row',
    category: 'streak',
    rarity: 'uncommon',
    icon: 'chain',
    xpReward: 50,
    coinReward: 25,
    requirements: [
      { type: 'streak_questions', target: 10, description: 'Get 10 correct answers in a row' },
    ],
    isSecret: false,
  },
  {
    id: 'question-streak-25',
    name: 'Unbroken Focus',
    description: 'Answer 25 questions correctly in a row',
    category: 'streak',
    rarity: 'rare',
    icon: 'chain-gold',
    xpReward: 150,
    coinReward: 75,
    requirements: [
      { type: 'streak_questions', target: 25, description: 'Get 25 correct answers in a row' },
    ],
    isSecret: false,
  },
  {
    id: 'question-streak-50',
    name: 'Perfect Concentration',
    description: 'Answer 50 questions correctly in a row',
    category: 'streak',
    rarity: 'epic',
    icon: 'chain-diamond',
    xpReward: 500,
    coinReward: 250,
    requirements: [
      { type: 'streak_questions', target: 50, description: 'Get 50 correct answers in a row' },
    ],
    isSecret: false,
  },
];

// =============================================================================
// SPEED ACHIEVEMENTS - Time-based excellence
// =============================================================================

export const SPEED_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'speed-bronze',
    name: 'Quick Thinker',
    description: 'Complete a drill with average time under 30 seconds per question',
    category: 'speed',
    rarity: 'common',
    icon: 'clock-fast',
    xpReward: 40,
    coinReward: 20,
    requirements: [
      { type: 'speed_record', target: 30, description: 'Average under 30s per question' },
    ],
    isSecret: false,
  },
  {
    id: 'speed-silver',
    name: 'Rapid Calculator',
    description: 'Complete a drill with average time under 20 seconds per question',
    category: 'speed',
    rarity: 'uncommon',
    icon: 'clock-faster',
    xpReward: 100,
    coinReward: 50,
    requirements: [
      { type: 'speed_record', target: 20, description: 'Average under 20s per question' },
    ],
    isSecret: false,
  },
  {
    id: 'speed-gold',
    name: 'Lightning Mind',
    description: 'Complete a drill with average time under 15 seconds per question',
    category: 'speed',
    rarity: 'rare',
    icon: 'lightning',
    xpReward: 200,
    coinReward: 100,
    requirements: [
      { type: 'speed_record', target: 15, description: 'Average under 15s per question' },
    ],
    isSecret: false,
  },
  {
    id: 'speed-platinum',
    name: 'Instant Recall',
    description: 'Complete a drill with average time under 10 seconds per question',
    category: 'speed',
    rarity: 'epic',
    icon: 'lightning-bolt',
    xpReward: 400,
    coinReward: 200,
    requirements: [
      { type: 'speed_record', target: 10, description: 'Average under 10s per question' },
    ],
    isSecret: false,
  },
];

// =============================================================================
// ACCURACY ACHIEVEMENTS - Precision and perfection
// =============================================================================

export const ACCURACY_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'accuracy-first-perfect',
    name: 'First Blood',
    description: 'Achieve your first perfect score on any assessment',
    category: 'accuracy',
    rarity: 'common',
    icon: 'target',
    xpReward: 50,
    coinReward: 25,
    requirements: [
      { type: 'perfect_scores', target: 1, description: 'Get 1 perfect score' },
    ],
    isSecret: false,
  },
  {
    id: 'accuracy-10-perfect',
    name: 'Precision Protocol',
    description: 'Achieve 10 perfect scores',
    category: 'accuracy',
    rarity: 'rare',
    icon: 'target-gold',
    xpReward: 200,
    coinReward: 100,
    requirements: [
      { type: 'perfect_scores', target: 10, description: 'Get 10 perfect scores' },
    ],
    isSecret: false,
  },
  {
    id: 'accuracy-50-perfect',
    name: 'Flawless Execution',
    description: 'Achieve 50 perfect scores',
    category: 'accuracy',
    rarity: 'epic',
    icon: 'bullseye',
    xpReward: 500,
    coinReward: 300,
    requirements: [
      { type: 'perfect_scores', target: 50, description: 'Get 50 perfect scores' },
    ],
    isSecret: false,
  },
  {
    id: 'accuracy-100-perfect',
    name: 'Perfectionist',
    description: 'Achieve 100 perfect scores',
    category: 'accuracy',
    rarity: 'legendary',
    icon: 'diamond-target',
    xpReward: 1500,
    coinReward: 750,
    requirements: [
      { type: 'perfect_scores', target: 100, description: 'Get 100 perfect scores' },
    ],
    isSecret: false,
  },
];

// =============================================================================
// MILESTONE ACHIEVEMENTS - Progress markers
// =============================================================================

export const MILESTONE_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'milestone-100-questions',
    name: 'Centurion',
    description: 'Answer 100 questions',
    category: 'milestone',
    rarity: 'common',
    icon: 'milestone-100',
    xpReward: 50,
    coinReward: 25,
    requirements: [
      { type: 'questions_answered', target: 100, description: 'Answer 100 questions' },
    ],
    isSecret: false,
  },
  {
    id: 'milestone-500-questions',
    name: 'Question Conqueror',
    description: 'Answer 500 questions',
    category: 'milestone',
    rarity: 'uncommon',
    icon: 'milestone-500',
    xpReward: 150,
    coinReward: 75,
    requirements: [
      { type: 'questions_answered', target: 500, description: 'Answer 500 questions' },
    ],
    isSecret: false,
  },
  {
    id: 'milestone-1000-questions',
    name: 'Thousand Solver',
    description: 'Answer 1000 questions',
    category: 'milestone',
    rarity: 'rare',
    icon: 'milestone-1000',
    xpReward: 400,
    coinReward: 200,
    requirements: [
      { type: 'questions_answered', target: 1000, description: 'Answer 1000 questions' },
    ],
    isSecret: false,
  },
  {
    id: 'milestone-5000-xp',
    name: 'Rising Scholar',
    description: 'Earn 5000 XP total',
    category: 'milestone',
    rarity: 'uncommon',
    icon: 'star-rising',
    xpReward: 100,
    coinReward: 50,
    requirements: [
      { type: 'xp_earned', target: 5000, description: 'Earn 5000 XP' },
    ],
    isSecret: false,
  },
  {
    id: 'milestone-25000-xp',
    name: 'Established Mind',
    description: 'Earn 25000 XP total',
    category: 'milestone',
    rarity: 'rare',
    icon: 'star-bright',
    xpReward: 300,
    coinReward: 150,
    requirements: [
      { type: 'xp_earned', target: 25000, description: 'Earn 25000 XP' },
    ],
    isSecret: false,
  },
  {
    id: 'milestone-100000-xp',
    name: 'Mathematical Luminary',
    description: 'Earn 100000 XP total',
    category: 'milestone',
    rarity: 'legendary',
    icon: 'supernova',
    xpReward: 1000,
    coinReward: 500,
    requirements: [
      { type: 'xp_earned', target: 100000, description: 'Earn 100000 XP' },
    ],
    isSecret: false,
  },
  {
    id: 'all-topics-explored',
    name: 'Curriculum Complete',
    description: 'Complete at least one lesson in every topic',
    category: 'milestone',
    rarity: 'rare',
    icon: 'map-complete',
    xpReward: 500,
    coinReward: 250,
    requirements: [
      { type: 'topics_explored', target: 10, description: 'Explore all 10 topics' },
    ],
    isSecret: false,
  },
];

// =============================================================================
// CHALLENGER ACHIEVEMENTS - Special modes
// =============================================================================

export const CHALLENGER_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-drill',
    name: 'Drill Initiate',
    description: 'Complete your first timed drill',
    category: 'challenger',
    rarity: 'common',
    icon: 'drill',
    xpReward: 30,
    coinReward: 15,
    requirements: [
      { type: 'drills_completed', target: 1, description: 'Complete 1 drill' },
    ],
    isSecret: false,
  },
  {
    id: 'drill-10',
    name: 'Drill Sergeant',
    description: 'Complete 10 timed drills',
    category: 'challenger',
    rarity: 'uncommon',
    icon: 'drill-gold',
    xpReward: 100,
    coinReward: 50,
    requirements: [
      { type: 'drills_completed', target: 10, description: 'Complete 10 drills' },
    ],
    isSecret: false,
  },
  {
    id: 'first-exam',
    name: 'Examination Ready',
    description: 'Complete your first mock exam',
    category: 'challenger',
    rarity: 'uncommon',
    icon: 'exam-paper',
    xpReward: 75,
    coinReward: 40,
    requirements: [
      { type: 'exams_passed', target: 1, description: 'Pass 1 mock exam' },
    ],
    isSecret: false,
  },
  {
    id: 'exam-distinction',
    name: 'Distinction Achiever',
    description: 'Score A1 grade on a mock exam',
    category: 'challenger',
    rarity: 'rare',
    icon: 'grade-a',
    xpReward: 250,
    coinReward: 125,
    requirements: [
      { type: 'exams_passed', target: 1, description: 'Score A1 on an exam' },
    ],
    isSecret: false,
  },
  {
    id: 'first-boss',
    name: 'Boss Slayer',
    description: 'Defeat your first topic boss',
    category: 'challenger',
    rarity: 'rare',
    icon: 'boss-skull',
    xpReward: 200,
    coinReward: 100,
    requirements: [
      { type: 'boss_defeated', target: 1, description: 'Defeat 1 boss' },
    ],
    isSecret: false,
  },
  {
    id: 'all-bosses',
    name: 'Dungeon Master',
    description: 'Defeat all topic bosses',
    category: 'challenger',
    rarity: 'legendary',
    icon: 'dragon-slayer',
    xpReward: 1000,
    coinReward: 500,
    requirements: [
      { type: 'boss_defeated', target: 10, description: 'Defeat all 10 bosses' },
    ],
    isSecret: false,
  },
];

// =============================================================================
// SECRET ACHIEVEMENTS - Hidden until unlocked
// =============================================================================

export const SECRET_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'secret-midnight',
    name: 'Midnight Scholar',
    description: 'Practice between midnight and 4am',
    category: 'secret',
    rarity: 'uncommon',
    icon: 'moon',
    xpReward: 50,
    coinReward: 30,
    requirements: [
      { type: 'time_spent', target: 1, description: 'Practice during midnight hours' },
    ],
    isSecret: true,
  },
  {
    id: 'secret-comeback',
    name: 'The Comeback',
    description: 'Get 5 wrong then 10 correct in a row',
    category: 'secret',
    rarity: 'rare',
    icon: 'phoenix-rise',
    xpReward: 150,
    coinReward: 75,
    requirements: [
      { type: 'streak_questions', target: 10, description: 'Recover from mistakes with a streak' },
    ],
    isSecret: true,
  },
  {
    id: 'secret-speedrun',
    name: 'Speedrunner',
    description: 'Complete all lessons in a topic in one sitting',
    category: 'secret',
    rarity: 'epic',
    icon: 'rocket',
    xpReward: 300,
    coinReward: 150,
    requirements: [
      { type: 'lessons_completed', target: 5, description: 'Complete full topic in one session' },
    ],
    isSecret: true,
  },
  {
    id: 'secret-triple-perfect',
    name: 'Hat Trick',
    description: 'Get three perfect scores in a row',
    category: 'secret',
    rarity: 'epic',
    icon: 'three-stars',
    xpReward: 250,
    coinReward: 150,
    requirements: [
      { type: 'perfect_scores', target: 3, description: 'Three consecutive perfect scores' },
    ],
    isSecret: true,
  },
  {
    id: 'secret-grandmaster',
    name: 'Grandmaster',
    description: 'Reach Grandmaster level in any topic',
    category: 'secret',
    rarity: 'mythic',
    icon: 'crown-ultimate',
    xpReward: 1000,
    coinReward: 500,
    requirements: [
      { type: 'topic_mastery', target: 6, description: 'Reach Grandmaster mastery' },
    ],
    isSecret: true,
  },
];

// =============================================================================
// BADGES
// =============================================================================

export const TOPIC_BADGES: Badge[] = [
  // Quadratics
  { id: 'badge-quad-bronze', name: 'Quadratics Bronze', description: 'Complete quadratics fundamentals', icon: 'quad-bronze', tier: 'bronze', category: 'topic', requirement: 'Complete 2 quadratics lessons', isEquipped: false },
  { id: 'badge-quad-silver', name: 'Quadratics Silver', description: 'Demonstrate quadratics proficiency', icon: 'quad-silver', tier: 'silver', category: 'topic', requirement: '70% accuracy in 50 questions', isEquipped: false },
  { id: 'badge-quad-gold', name: 'Quadratics Gold', description: 'Master quadratics concepts', icon: 'quad-gold', tier: 'gold', category: 'topic', requirement: '85% accuracy in 100 questions', isEquipped: false },
  { id: 'badge-quad-diamond', name: 'Quadratics Diamond', description: 'Achieve quadratics excellence', icon: 'quad-diamond', tier: 'diamond', category: 'topic', requirement: 'Defeat Quadratics Boss', isEquipped: false },

  // Calculus
  { id: 'badge-calc-bronze', name: 'Calculus Bronze', description: 'Begin your calculus journey', icon: 'calc-bronze', tier: 'bronze', category: 'topic', requirement: 'Complete 2 calculus lessons', isEquipped: false },
  { id: 'badge-calc-silver', name: 'Calculus Silver', description: 'Demonstrate calculus proficiency', icon: 'calc-silver', tier: 'silver', category: 'topic', requirement: '70% accuracy in 50 questions', isEquipped: false },
  { id: 'badge-calc-gold', name: 'Calculus Gold', description: 'Master calculus concepts', icon: 'calc-gold', tier: 'gold', category: 'topic', requirement: '85% accuracy in 100 questions', isEquipped: false },
  { id: 'badge-calc-diamond', name: 'Calculus Diamond', description: 'Achieve calculus excellence', icon: 'calc-diamond', tier: 'diamond', category: 'topic', requirement: 'Defeat Calculus Boss', isEquipped: false },

  // Trigonometry
  { id: 'badge-trig-bronze', name: 'Trigonometry Bronze', description: 'Begin your trigonometry journey', icon: 'trig-bronze', tier: 'bronze', category: 'topic', requirement: 'Complete 2 trigonometry lessons', isEquipped: false },
  { id: 'badge-trig-silver', name: 'Trigonometry Silver', description: 'Demonstrate trigonometry proficiency', icon: 'trig-silver', tier: 'silver', category: 'topic', requirement: '70% accuracy in 50 questions', isEquipped: false },
  { id: 'badge-trig-gold', name: 'Trigonometry Gold', description: 'Master trigonometry concepts', icon: 'trig-gold', tier: 'gold', category: 'topic', requirement: '85% accuracy in 100 questions', isEquipped: false },
  { id: 'badge-trig-diamond', name: 'Trigonometry Diamond', description: 'Achieve trigonometry excellence', icon: 'trig-diamond', tier: 'diamond', category: 'topic', requirement: 'Defeat Trigonometry Boss', isEquipped: false },
];

export const SKILL_BADGES: Badge[] = [
  { id: 'badge-speed-demon', name: 'Speed Demon', description: 'Master of rapid calculation', icon: 'speed-badge', tier: 'gold', category: 'skill', requirement: 'Average under 15s in 5 drills', isEquipped: false },
  { id: 'badge-accuracy-king', name: 'Precision King', description: 'Unmatched accuracy', icon: 'accuracy-badge', tier: 'gold', category: 'skill', requirement: '95% accuracy over 200 questions', isEquipped: false },
  { id: 'badge-streak-master', name: 'Streak Master', description: 'Consistency personified', icon: 'streak-badge', tier: 'platinum', category: 'skill', requirement: '50 question streak', isEquipped: false },
  { id: 'badge-drill-champion', name: 'Drill Champion', description: 'Conquered all drill difficulties', icon: 'drill-badge', tier: 'diamond', category: 'skill', requirement: 'Complete all drill tiers', isEquipped: false },
  { id: 'badge-exam-expert', name: 'Exam Expert', description: 'Mock exam mastery', icon: 'exam-badge', tier: 'diamond', category: 'skill', requirement: '5 A-grade mock exams', isEquipped: false },
];

export const SPECIAL_BADGES: Badge[] = [
  { id: 'badge-founder', name: 'Early Adopter', description: 'Joined during the early access period', icon: 'founder', tier: 'champion', category: 'special', requirement: 'Join during early access', isEquipped: false },
  { id: 'badge-completionist', name: 'Completionist', description: 'Unlocked every achievement', icon: 'completionist', tier: 'champion', category: 'special', requirement: 'Unlock all achievements', isEquipped: false },
  { id: 'badge-perfectionist', name: 'Perfectionist', description: '100 perfect scores achieved', icon: 'perfectionist', tier: 'champion', category: 'special', requirement: '100 perfect scores', isEquipped: false },
];

// =============================================================================
// TITLES
// =============================================================================

export const TITLES: Title[] = [
  // Starter Titles
  { id: 'title-student', name: 'Student', description: 'Beginning the journey', rarity: 'common', requirement: 'Default title', isEquipped: false },
  { id: 'title-scholar', name: 'Scholar', description: 'Dedicated to learning', rarity: 'common', requirement: 'Complete 10 lessons', isEquipped: false },

  // Progress Titles
  { id: 'title-mathematician', name: 'Mathematician', description: 'Embracing the art of numbers', rarity: 'uncommon', requirement: 'Complete 25 lessons', isEquipped: false },
  { id: 'title-analyst', name: 'Analyst', description: 'Breaking down complex problems', rarity: 'uncommon', requirement: 'Pass 5 mock exams', isEquipped: false },

  // Advanced Titles
  { id: 'title-virtuoso', name: 'Virtuoso', description: 'Exceptional mathematical skill', rarity: 'rare', requirement: 'Master 5 topics', isEquipped: false },
  { id: 'title-prodigy', name: 'Prodigy', description: 'Natural mathematical talent', rarity: 'rare', requirement: '90% overall accuracy with 500+ questions', isEquipped: false },

  // Elite Titles
  { id: 'title-sage', name: 'Sage', description: 'Wisdom through practice', rarity: 'epic', requirement: '100-day streak', isEquipped: false },
  { id: 'title-mastermind', name: 'Mastermind', description: 'Strategic mathematical thinking', rarity: 'epic', requirement: 'Defeat all bosses', isEquipped: false },

  // Legendary Titles
  { id: 'title-legend', name: 'Legend', description: 'An inspiration to all', rarity: 'legendary', requirement: 'Earn 100,000 XP', isEquipped: false },
  { id: 'title-grandmaster', name: 'Grandmaster', description: 'Peak mathematical excellence', rarity: 'legendary', requirement: 'Grandmaster mastery in any topic', isEquipped: false },

  // Mythic Titles
  { id: 'title-transcendent', name: 'Transcendent', description: 'Beyond ordinary achievement', rarity: 'mythic', requirement: 'Unlock all achievements', isEquipped: false },
];

// =============================================================================
// MASTERY LEVEL DEFINITIONS
// =============================================================================

export const MASTERY_LEVELS: Record<MasteryLevel, { minXP: number; maxXP: number; perks: string[] }> = {
  novice: {
    minXP: 0,
    maxXP: 500,
    perks: ['Access to foundational lessons'],
  },
  apprentice: {
    minXP: 500,
    maxXP: 1500,
    perks: ['Access to intermediate lessons', 'Unlock topic drills'],
  },
  journeyman: {
    minXP: 1500,
    maxXP: 3500,
    perks: ['Access to advanced lessons', 'Unlock silver drills'],
  },
  expert: {
    minXP: 3500,
    maxXP: 7000,
    perks: ['Access to expert content', 'Unlock gold drills', 'Boss battle access'],
  },
  master: {
    minXP: 7000,
    maxXP: 15000,
    perks: ['Full topic access', 'Unlock platinum drills', 'Special challenges'],
  },
  grandmaster: {
    minXP: 15000,
    maxXP: Infinity,
    perks: ['All content unlocked', 'Diamond drills', 'Exclusive challenges', 'Leaderboard eligibility'],
  },
};

// Combine all achievements
export const ALL_ACHIEVEMENTS: Achievement[] = [
  ...MASTERY_ACHIEVEMENTS,
  ...STREAK_ACHIEVEMENTS,
  ...SPEED_ACHIEVEMENTS,
  ...ACCURACY_ACHIEVEMENTS,
  ...MILESTONE_ACHIEVEMENTS,
  ...CHALLENGER_ACHIEVEMENTS,
  ...SECRET_ACHIEVEMENTS,
];

export const ALL_BADGES: Badge[] = [
  ...TOPIC_BADGES,
  ...SKILL_BADGES,
  ...SPECIAL_BADGES,
];
