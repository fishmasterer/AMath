// Singapore O-Level Additional Mathematics Syllabus (4049)
// Comprehensive topic data aligned with MOE syllabus

import { QuizTopic } from '../types';

export interface SyllabusObjective {
  code: string;
  description: string;
  subObjectives?: string[];
}

export interface TopicFormula {
  name: string;
  latex: string;
  description: string;
  when_to_use?: string;
  common_mistakes?: string[];
}

export interface TopicConcept {
  name: string;
  definition: string;
  key_points: string[];
  examples?: string[];
}

export interface RealWorldApplication {
  title: string;
  description: string;
  industry: string;
  icon: string;
  example: string;
  visualization?: {
    type: 'desmos' | 'geogebra' | 'custom';
    config: Record<string, unknown>;
  };
}

export interface CareerConnection {
  career: string;
  description: string;
  icon: string;
  salary_range?: string;
}

export interface TopicData {
  id: QuizTopic;
  name: string;
  subtitle: string;
  category: 'algebra' | 'geometry' | 'calculus';
  color: string;
  icon: string;

  // Syllabus alignment
  syllabus_code: string;
  learning_objectives: SyllabusObjective[];

  // Why learn this?
  why_learn: {
    summary: string;
    importance: string[];
    prerequisites: QuizTopic[];
    leads_to: QuizTopic[];
  };

  // Core content
  concepts: TopicConcept[];
  formulas: TopicFormula[];

  // Real-world applications
  real_world_applications: RealWorldApplication[];
  career_connections: CareerConnection[];

  // Common mistakes and tips
  common_mistakes: string[];
  exam_tips: string[];

  // Visualization suggestions
  visualizations: {
    title: string;
    description: string;
    desmos_config?: string; // Desmos graph state or expressions
    interactive?: boolean;
  }[];
}

// ============================================================================
// TOPIC A1: QUADRATIC FUNCTIONS
// ============================================================================

export const TOPIC_A1: TopicData = {
  id: 'A1',
  name: 'Quadratic Functions',
  subtitle: 'Equations, graphs, and their properties',
  category: 'algebra',
  color: 'cyan',
  icon: 'function-square',

  syllabus_code: 'A1',
  learning_objectives: [
    {
      code: 'A1.1',
      description: 'Solve quadratic equations by factorisation, completing the square, and formula',
      subObjectives: [
        'Recognise and solve equations reducible to quadratic form',
        'Apply the quadratic formula correctly',
        'Complete the square for any quadratic expression',
      ],
    },
    {
      code: 'A1.2',
      description: 'Know and use the relationships between the roots and coefficients',
      subObjectives: [
        'Use sum and product of roots formulas',
        'Form new equations given conditions on roots',
      ],
    },
    {
      code: 'A1.3',
      description: 'Use the discriminant to determine the nature of roots',
      subObjectives: [
        'Interpret discriminant values geometrically',
        'Solve problems involving conditions for real/equal/distinct roots',
      ],
    },
    {
      code: 'A1.4',
      description: 'Sketch graphs of quadratic functions',
      subObjectives: [
        'Find vertex, axis of symmetry, and intercepts',
        'Determine maximum/minimum values',
        'Sketch transformations of quadratic graphs',
      ],
    },
  ],

  why_learn: {
    summary: 'Quadratics are the foundation of mathematical modeling, appearing everywhere from physics to economics.',
    importance: [
      'Models projectile motion in physics (throwing a ball, rocket trajectories)',
      'Optimizes profit and cost in business (finding maximum revenue)',
      'Designs parabolic structures in engineering (bridges, satellite dishes)',
      'Analyzes acceleration in motion problems',
      'Foundation for understanding higher-degree polynomials and calculus',
    ],
    prerequisites: [],
    leads_to: ['A2', 'A4', 'C1'],
  },

  concepts: [
    {
      name: 'Quadratic Equation',
      definition: 'An equation of the form ax² + bx + c = 0 where a ≠ 0',
      key_points: [
        'The highest power of x is 2',
        'Always has at most 2 solutions (roots)',
        'The coefficient a must not be zero',
      ],
      examples: ['x² - 5x + 6 = 0', '2x² + 3x - 1 = 0'],
    },
    {
      name: 'Discriminant',
      definition: 'The value Δ = b² - 4ac that determines the nature of roots',
      key_points: [
        'Δ > 0: Two distinct real roots',
        'Δ = 0: One repeated real root (equal roots)',
        'Δ < 0: No real roots (complex roots)',
        'Geometrically shows how the parabola intersects the x-axis',
      ],
    },
    {
      name: 'Vertex Form',
      definition: 'The form y = a(x - h)² + k where (h, k) is the vertex',
      key_points: [
        'h is the x-coordinate of the vertex',
        'k is the y-coordinate (max/min value)',
        'Obtained by completing the square',
        'Useful for finding maximum/minimum values',
      ],
    },
    {
      name: 'Sum and Product of Roots',
      definition: 'Relationships between roots α, β and coefficients',
      key_points: [
        'α + β = -b/a (sum of roots)',
        'αβ = c/a (product of roots)',
        'Can form new equations without solving the original',
        'Useful for problems involving relationships between roots',
      ],
    },
  ],

  formulas: [
    {
      name: 'Quadratic Formula',
      latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      description: 'Solves any quadratic equation ax² + bx + c = 0',
      when_to_use: 'When factorization is difficult or impossible',
      common_mistakes: [
        'Forgetting the ± sign',
        'Wrong signs when substituting b',
        'Calculation errors under the square root',
      ],
    },
    {
      name: 'Discriminant',
      latex: '\\Delta = b^2 - 4ac',
      description: 'Determines the nature of roots without solving',
      when_to_use: 'To analyze root conditions, find parameter ranges',
    },
    {
      name: 'Sum of Roots',
      latex: '\\alpha + \\beta = -\\frac{b}{a}',
      description: 'Sum of the two roots of a quadratic equation',
      when_to_use: 'When you need relationships between roots',
    },
    {
      name: 'Product of Roots',
      latex: '\\alpha\\beta = \\frac{c}{a}',
      description: 'Product of the two roots of a quadratic equation',
      when_to_use: 'When you need relationships between roots',
    },
    {
      name: 'Vertex x-coordinate',
      latex: 'x = -\\frac{b}{2a}',
      description: 'The x-coordinate of the vertex (turning point)',
      when_to_use: 'Finding maximum/minimum, axis of symmetry',
    },
    {
      name: 'Completing the Square',
      latex: 'ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 + c - \\frac{b^2}{4a}',
      description: 'Converts standard form to vertex form',
      when_to_use: 'Finding vertex, deriving quadratic formula, integration',
    },
  ],

  real_world_applications: [
    {
      title: 'Projectile Motion',
      description: 'When you throw a ball, kick a football, or launch a rocket, the path follows a parabola.',
      industry: 'Physics / Sports Science',
      icon: 'rocket',
      example: 'A ball is thrown upward with velocity 20 m/s. Height h = 20t - 5t² gives height after t seconds. Maximum height occurs at vertex: t = 2s, h = 20m.',
      visualization: {
        type: 'desmos',
        config: {
          expressions: [
            { latex: 'y = -5x^2 + 20x', color: '#2563eb' },
            { latex: '(2, 20)', color: '#dc2626', pointStyle: 'POINT' },
          ],
          bounds: { left: -1, right: 5, bottom: -5, top: 25 },
        },
      },
    },
    {
      title: 'Profit Maximization',
      description: 'Businesses use quadratics to find the price that maximizes profit.',
      industry: 'Economics / Business',
      icon: 'coins',
      example: 'If profit P = -2x² + 100x - 800 where x is price, maximum profit occurs at x = $25, giving P = $450.',
      visualization: {
        type: 'desmos',
        config: {
          expressions: [
            { latex: 'y = -2x^2 + 100x - 800', color: '#16a34a' },
            { latex: '(25, 450)', color: '#dc2626', pointStyle: 'POINT' },
          ],
        },
      },
    },
    {
      title: 'Parabolic Reflectors',
      description: 'Satellite dishes and car headlights use parabolic shapes to focus signals/light.',
      industry: 'Engineering / Telecommunications',
      icon: 'radio-tower',
      example: 'A satellite dish has shape y = 0.1x². The focus where all signals converge is at (0, 2.5).',
    },
    {
      title: 'Bridge Design',
      description: 'Suspension bridge cables naturally form parabolas under uniform load.',
      industry: 'Civil Engineering',
      icon: 'construction',
      example: 'The Golden Gate Bridge cables follow y = 0.00037x² where x is horizontal distance from center.',
    },
    {
      title: 'Stopping Distance',
      description: 'The distance a car needs to stop involves a quadratic relationship with speed.',
      industry: 'Automotive / Safety',
      icon: 'car',
      example: 'Stopping distance d = v²/20 + v/2 where v is speed in km/h. Doubling speed quadruples the velocity component.',
    },
  ],

  career_connections: [
    {
      career: 'Aerospace Engineer',
      description: 'Designs spacecraft trajectories using projectile motion equations',
      icon: 'plane',
      salary_range: '$80,000 - $150,000',
    },
    {
      career: 'Data Scientist',
      description: 'Uses quadratic regression to model curved relationships in data',
      icon: 'bar-chart-2',
      salary_range: '$70,000 - $140,000',
    },
    {
      career: 'Game Developer',
      description: 'Implements realistic physics for projectiles, jumps, and arcs',
      icon: 'gamepad-2',
      salary_range: '$60,000 - $120,000',
    },
    {
      career: 'Financial Analyst',
      description: 'Optimizes investment portfolios using quadratic programming',
      icon: 'trending-up',
      salary_range: '$65,000 - $130,000',
    },
  ],

  common_mistakes: [
    'Forgetting that a must not equal zero in ax² + bx + c = 0',
    'Sign errors when using the quadratic formula (especially with -b)',
    'Not checking if discriminant conditions match the question requirements',
    'Confusing "always positive" with "positive roots"',
    'Forgetting to consider both roots when solving inequalities',
    'Using wrong formula: sum is -b/a NOT b/a',
  ],

  exam_tips: [
    'Always check your roots by substituting back into the original equation',
    'For "always positive/negative" questions, check both discriminant AND coefficient of x²',
    'Draw a quick sketch to visualize the parabola and roots',
    'When forming new equations, use sum/product of roots formulas',
    'For optimization, find the vertex - it gives max or min value',
  ],

  visualizations: [
    {
      title: 'Interactive Parabola Explorer',
      description: 'Adjust a, b, c to see how the parabola changes',
      desmos_config: JSON.stringify({
        expressions: [
          { id: 'slider-a', latex: 'a = 1', sliderBounds: { min: -5, max: 5, step: 0.1 } },
          { id: 'slider-b', latex: 'b = 0', sliderBounds: { min: -10, max: 10 } },
          { id: 'slider-c', latex: 'c = 0', sliderBounds: { min: -10, max: 10 } },
          { id: 'parabola', latex: 'y = ax^2 + bx + c', color: '#2563eb' },
          { id: 'vertex', latex: '\\left(-\\frac{b}{2a}, a\\left(-\\frac{b}{2a}\\right)^2 + b\\left(-\\frac{b}{2a}\\right) + c\\right)', color: '#dc2626' },
        ],
      }),
      interactive: true,
    },
    {
      title: 'Discriminant Visualizer',
      description: 'See how discriminant affects the number of x-intercepts',
      desmos_config: JSON.stringify({
        expressions: [
          { latex: 'y = x^2 - 4x + 3', color: '#16a34a', label: 'Δ > 0 (2 roots)' },
          { latex: 'y = x^2 - 4x + 4', color: '#eab308', label: 'Δ = 0 (1 root)' },
          { latex: 'y = x^2 - 4x + 5', color: '#dc2626', label: 'Δ < 0 (0 roots)' },
        ],
      }),
      interactive: false,
    },
  ],
};

// ============================================================================
// TOPIC A2: EQUATIONS AND INEQUALITIES
// ============================================================================

export const TOPIC_A2: TopicData = {
  id: 'A2',
  name: 'Equations and Inequalities',
  subtitle: 'Solving complex equations and inequality systems',
  category: 'algebra',
  color: 'cyan',
  icon: 'scale',

  syllabus_code: 'A2',
  learning_objectives: [
    {
      code: 'A2.1',
      description: 'Solve simultaneous equations in two unknowns with at least one linear equation',
    },
    {
      code: 'A2.2',
      description: 'Solve quadratic inequalities',
      subObjectives: [
        'Use graphical and algebraic methods',
        'Express solutions in set notation or interval notation',
      ],
    },
    {
      code: 'A2.3',
      description: 'Solve equations and inequalities involving absolute values',
    },
  ],

  why_learn: {
    summary: 'Inequalities help us find acceptable ranges and optimize within constraints - essential for real-world decision making.',
    importance: [
      'Budget constraints in financial planning',
      'Safety limits in engineering (stress, temperature)',
      'Dosage ranges in medicine',
      'Quality control bounds in manufacturing',
      'Optimization problems with constraints',
    ],
    prerequisites: ['A1'],
    leads_to: ['A4', 'C1'],
  },

  concepts: [
    {
      name: 'Quadratic Inequality',
      definition: 'An inequality involving a quadratic expression: ax² + bx + c > 0 (or <, ≥, ≤)',
      key_points: [
        'First solve the equation ax² + bx + c = 0 to find critical points',
        'Use a sign diagram or sketch to determine solution intervals',
        'Remember: parabola opens up if a > 0, down if a < 0',
      ],
    },
    {
      name: 'Simultaneous Equations',
      definition: 'A system of equations that must be solved together',
      key_points: [
        'Substitution method: Express one variable in terms of another',
        'Elimination method: Add/subtract equations to eliminate a variable',
        'Graphical interpretation: Find intersection points',
      ],
    },
    {
      name: 'Absolute Value',
      definition: '|x| represents the distance of x from 0 on the number line',
      key_points: [
        '|x| = x if x ≥ 0, |x| = -x if x < 0',
        '|x| < a means -a < x < a',
        '|x| > a means x < -a or x > a',
        'Always consider both cases when solving',
      ],
    },
  ],

  formulas: [
    {
      name: 'Absolute Value Definition',
      latex: '|x| = \\begin{cases} x & \\text{if } x \\geq 0 \\\\ -x & \\text{if } x < 0 \\end{cases}',
      description: 'Definition of absolute value as a piecewise function',
      when_to_use: 'When solving equations/inequalities with absolute values',
    },
    {
      name: 'Absolute Value Inequality (Less Than)',
      latex: '|x| < a \\Leftrightarrow -a < x < a',
      description: 'Solution for absolute value less than a constant',
      when_to_use: 'When |expression| < constant',
    },
    {
      name: 'Absolute Value Inequality (Greater Than)',
      latex: '|x| > a \\Leftrightarrow x < -a \\text{ or } x > a',
      description: 'Solution for absolute value greater than a constant',
      when_to_use: 'When |expression| > constant',
    },
  ],

  real_world_applications: [
    {
      title: 'Quality Control',
      description: 'Manufacturers set tolerance ranges for product dimensions.',
      industry: 'Manufacturing',
      icon: 'factory',
      example: 'A bolt must be 10mm ± 0.2mm: |x - 10| ≤ 0.2, meaning 9.8 ≤ x ≤ 10.2',
    },
    {
      title: 'Temperature Ranges',
      description: 'Scientists and engineers work within safe temperature bounds.',
      industry: 'Science / Engineering',
      icon: 'thermometer',
      example: 'A chemical reaction is stable when |T - 25| < 5, i.e., between 20°C and 30°C.',
    },
    {
      title: 'Budget Constraints',
      description: 'Financial planning involves staying within budget limits.',
      industry: 'Finance',
      icon: 'wallet',
      example: 'If spending on ads (x) and staff (y) satisfies 100x + 200y ≤ 10000, find feasible combinations.',
    },
    {
      title: 'Drug Dosage',
      description: 'Medications must be within therapeutic range to be effective and safe.',
      industry: 'Medicine / Pharmacology',
      icon: 'pill',
      example: 'Blood concentration C must satisfy 10 ≤ C ≤ 20 mg/L for efficacy without toxicity.',
    },
  ],

  career_connections: [
    {
      career: 'Quality Assurance Engineer',
      description: 'Sets and monitors tolerance specifications for products',
      icon: 'search-check',
      salary_range: '$55,000 - $95,000',
    },
    {
      career: 'Operations Research Analyst',
      description: 'Optimizes systems subject to inequality constraints',
      icon: 'line-chart',
      salary_range: '$60,000 - $110,000',
    },
    {
      career: 'Pharmacologist',
      description: 'Determines safe and effective drug dosage ranges',
      icon: 'dna',
      salary_range: '$80,000 - $150,000',
    },
  ],

  common_mistakes: [
    'Flipping inequality sign when multiplying/dividing by negative numbers',
    'Forgetting to consider both cases for absolute value equations',
    'Using OR when should use AND, or vice versa',
    'Not sketching the parabola to visualize solution regions',
    'Confusing strict (<) and non-strict (≤) inequalities',
  ],

  exam_tips: [
    'Always draw a quick sketch for quadratic inequalities',
    'Use a sign table/number line to organize your working',
    'Check boundary points - are they included or excluded?',
    'For absolute values, write out both cases clearly',
    'Verify your answer by testing a point in each region',
  ],

  visualizations: [
    {
      title: 'Quadratic Inequality Solver',
      description: 'See the solution region for quadratic inequalities',
      interactive: true,
    },
    {
      title: 'Absolute Value Visualizer',
      description: 'Understand |x - a| as distance from a',
      interactive: true,
    },
  ],
};

// ============================================================================
// TOPIC A3: SURDS
// ============================================================================

export const TOPIC_A3: TopicData = {
  id: 'A3',
  name: 'Surds',
  subtitle: 'Working with irrational square roots',
  category: 'algebra',
  color: 'cyan',
  icon: 'radical',

  syllabus_code: 'A3',
  learning_objectives: [
    {
      code: 'A3.1',
      description: 'Perform operations on surds including rationalising denominators',
    },
    {
      code: 'A3.2',
      description: 'Solve equations involving surds',
    },
  ],

  why_learn: {
    summary: 'Surds give us exact values instead of approximations, crucial for precision in science and engineering.',
    importance: [
      'Exact measurements in construction (diagonal of a square)',
      'Precise calculations in physics formulas',
      'Maintains accuracy through multi-step calculations',
      'Foundation for complex numbers and advanced algebra',
      'Essential for trigonometric exact values',
    ],
    prerequisites: [],
    leads_to: ['A1', 'G1'],
  },

  concepts: [
    {
      name: 'Surd',
      definition: 'An irrational root that cannot be simplified to a rational number',
      key_points: [
        '√2, √3, √5 are surds',
        '√4 = 2 is NOT a surd (simplifies to rational)',
        'Surds are exact; decimals are approximations',
      ],
      examples: ['√2 ≈ 1.414...', '√3 ≈ 1.732...', '√5 ≈ 2.236...'],
    },
    {
      name: 'Conjugate Surds',
      definition: 'Expressions of the form a + √b and a - √b',
      key_points: [
        'Product of conjugates eliminates the surd',
        '(a + √b)(a - √b) = a² - b',
        'Used to rationalize denominators',
      ],
    },
    {
      name: 'Rationalizing the Denominator',
      definition: 'Removing surds from the denominator of a fraction',
      key_points: [
        'Multiply by conjugate for binomial denominators',
        'Multiply by same surd for single surd denominators',
        'Standard form has no surds in denominator',
      ],
    },
  ],

  formulas: [
    {
      name: 'Surd Multiplication',
      latex: '\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}',
      description: 'Product of square roots equals square root of product',
      when_to_use: 'Simplifying products of surds',
    },
    {
      name: 'Surd Division',
      latex: '\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}',
      description: 'Quotient of square roots equals square root of quotient',
      when_to_use: 'Simplifying quotients of surds',
    },
    {
      name: 'Rationalizing (Single Surd)',
      latex: '\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}',
      description: 'Multiply top and bottom by √b',
      when_to_use: 'Single surd in denominator',
    },
    {
      name: 'Rationalizing (Binomial)',
      latex: '\\frac{a}{b + \\sqrt{c}} = \\frac{a(b - \\sqrt{c})}{b^2 - c}',
      description: 'Multiply by conjugate',
      when_to_use: 'Binomial with surd in denominator',
    },
    {
      name: 'Difference of Squares with Surds',
      latex: '(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b',
      description: 'Conjugates multiply to give a rational number',
      when_to_use: 'Eliminating surds, rationalizing',
    },
  ],

  real_world_applications: [
    {
      title: 'Construction & Architecture',
      description: 'Calculating exact diagonal lengths for precise cuts.',
      industry: 'Construction',
      icon: 'hard-hat',
      example: 'A square tile of side 1m has diagonal √2 ≈ 1.414m. Using √2 keeps calculations exact.',
    },
    {
      title: 'Screen Dimensions',
      description: 'TV and monitor diagonals use the Pythagorean theorem.',
      industry: 'Electronics',
      icon: 'monitor',
      example: 'A 16:9 screen with diagonal d has width = 16d/√337 for exact dimensions.',
    },
    {
      title: 'Paper Sizes (A-Series)',
      description: 'A-series paper maintains aspect ratio √2:1.',
      industry: 'Printing / Design',
      icon: 'file-text',
      example: 'A4 folded in half gives A5 with same proportions because √2 × √2 = 2.',
    },
    {
      title: 'Electrical Engineering',
      description: 'RMS voltage calculations involve √2.',
      industry: 'Electrical Engineering',
      icon: 'zap',
      example: 'Peak voltage = √2 × RMS voltage. For 240V RMS, peak is 240√2 ≈ 339V.',
    },
  ],

  career_connections: [
    {
      career: 'Architect',
      description: 'Uses exact measurements for precise building designs',
      icon: 'landmark',
      salary_range: '$60,000 - $120,000',
    },
    {
      career: 'Surveyor',
      description: 'Calculates exact land measurements and boundaries',
      icon: 'ruler',
      salary_range: '$50,000 - $90,000',
    },
    {
      career: 'Audio Engineer',
      description: 'Works with precise frequency calculations',
      icon: 'music',
      salary_range: '$45,000 - $85,000',
    },
  ],

  common_mistakes: [
    '√(a + b) ≠ √a + √b - you cannot split roots over addition!',
    'Forgetting to rationalize denominators in final answers',
    'Not simplifying surds fully (e.g., √12 = 2√3)',
    'Sign errors when expanding (a + √b)²',
    'Not checking for extraneous solutions in surd equations',
  ],

  exam_tips: [
    'Always simplify surds first by finding perfect square factors',
    'When solving surd equations, isolate the surd before squaring',
    'Check answers by substituting back - squaring can introduce false solutions',
    'Final answers should have rationalized denominators',
    'Know common surds: √2 ≈ 1.414, √3 ≈ 1.732, √5 ≈ 2.236',
  ],

  visualizations: [
    {
      title: 'Surd on Number Line',
      description: 'Visualize √2 as the diagonal of a unit square',
      interactive: true,
    },
    {
      title: 'Pythagorean Spiral',
      description: 'See how surds build up: √2, √3, √4=2, √5...',
      interactive: true,
    },
  ],
};

// ============================================================================
// TOPIC A4: POLYNOMIALS AND PARTIAL FRACTIONS
// ============================================================================

export const TOPIC_A4: TopicData = {
  id: 'A4',
  name: 'Polynomials and Partial Fractions',
  subtitle: 'Factor theorem, remainder theorem, and decomposition',
  category: 'algebra',
  color: 'cyan',
  icon: 'sigma',

  syllabus_code: 'A4',
  learning_objectives: [
    {
      code: 'A4.1',
      description: 'Know and use the remainder and factor theorems',
    },
    {
      code: 'A4.2',
      description: 'Find factors of polynomials',
    },
    {
      code: 'A4.3',
      description: 'Solve cubic equations',
    },
    {
      code: 'A4.4',
      description: 'Decompose proper and improper fractions into partial fractions',
      subObjectives: [
        'Linear factors in denominator',
        'Repeated linear factors',
        'Quadratic factor that cannot be factorised',
      ],
    },
  ],

  why_learn: {
    summary: 'Polynomials model complex relationships, and partial fractions simplify integration in calculus.',
    importance: [
      'Essential for integration in calculus',
      'Signal processing and control systems',
      'Polynomial interpolation in computer graphics',
      'Economic modeling (cost and revenue functions)',
      'Cryptography relies on polynomial arithmetic',
    ],
    prerequisites: ['A1'],
    leads_to: ['C1'],
  },

  concepts: [
    {
      name: 'Remainder Theorem',
      definition: 'When polynomial P(x) is divided by (x - a), the remainder is P(a)',
      key_points: [
        'Quick way to find remainder without long division',
        'Substitute x = a directly into P(x)',
        'If P(a) = 0, then (x - a) is a factor',
      ],
    },
    {
      name: 'Factor Theorem',
      definition: '(x - a) is a factor of P(x) if and only if P(a) = 0',
      key_points: [
        'Special case of remainder theorem',
        'Use to test potential factors',
        'Try integer factors of the constant term first',
      ],
    },
    {
      name: 'Partial Fractions',
      definition: 'Breaking a complex fraction into simpler parts',
      key_points: [
        'Proper fraction: degree of numerator < degree of denominator',
        'Improper: perform long division first',
        'Each factor in denominator gives a term',
        'Repeated factors need multiple terms',
      ],
    },
  ],

  formulas: [
    {
      name: 'Remainder Theorem',
      latex: 'P(x) \\div (x-a) \\text{ gives remainder } P(a)',
      description: 'Find remainder by substitution',
      when_to_use: 'Finding remainders quickly',
    },
    {
      name: 'Factor Theorem',
      latex: '(x-a) \\text{ is a factor of } P(x) \\Leftrightarrow P(a) = 0',
      description: 'Test if expression is a factor',
      when_to_use: 'Finding factors of polynomials',
    },
    {
      name: 'Partial Fractions (Linear)',
      latex: '\\frac{px + q}{(x-a)(x-b)} = \\frac{A}{x-a} + \\frac{B}{x-b}',
      description: 'Decomposition with distinct linear factors',
      when_to_use: 'Integration, simplification',
    },
    {
      name: 'Partial Fractions (Repeated)',
      latex: '\\frac{px + q}{(x-a)^2} = \\frac{A}{x-a} + \\frac{B}{(x-a)^2}',
      description: 'Decomposition with repeated linear factor',
      when_to_use: 'Repeated factors in denominator',
    },
    {
      name: 'Partial Fractions (Quadratic)',
      latex: '\\frac{px + q}{(x-a)(x^2+bx+c)} = \\frac{A}{x-a} + \\frac{Bx+C}{x^2+bx+c}',
      description: 'Decomposition with irreducible quadratic',
      when_to_use: 'Quadratic factor that cannot be factored',
    },
  ],

  real_world_applications: [
    {
      title: 'Signal Processing',
      description: 'Partial fractions simplify transfer functions in electronics.',
      industry: 'Electronics / Telecommunications',
      icon: 'radio',
      example: 'Filter response H(s) = 1/(s² + 3s + 2) = 1/(s+1) - 1/(s+2) makes inverse transform easier.',
    },
    {
      title: 'Control Systems',
      description: 'Engineers decompose system responses for stability analysis.',
      industry: 'Aerospace / Robotics',
      icon: 'bot',
      example: 'Robot arm position control uses partial fractions to analyze response characteristics.',
    },
    {
      title: 'Computer Graphics',
      description: 'Polynomial curves create smooth animations and shapes.',
      industry: 'Animation / Gaming',
      icon: 'palette',
      example: 'Bézier curves in fonts and illustrations are polynomial parametric curves.',
    },
    {
      title: 'Data Interpolation',
      description: 'Fitting curves through data points uses polynomial methods.',
      industry: 'Data Science',
      icon: 'chart-spline',
      example: 'Lagrange interpolation finds a polynomial passing through given points.',
    },
  ],

  career_connections: [
    {
      career: 'Control Systems Engineer',
      description: 'Designs and analyzes feedback control systems',
      icon: 'sliders-horizontal',
      salary_range: '$75,000 - $130,000',
    },
    {
      career: 'Signal Processing Engineer',
      description: 'Develops algorithms for audio, image, and communications',
      icon: 'signal',
      salary_range: '$80,000 - $140,000',
    },
    {
      career: 'Graphics Programmer',
      description: 'Implements curves and surfaces for games and visualization',
      icon: 'gamepad-2',
      salary_range: '$70,000 - $130,000',
    },
  ],

  common_mistakes: [
    'Using wrong form for partial fractions (forgetting repeated factor terms)',
    'Not performing long division first for improper fractions',
    'Algebraic errors when comparing coefficients',
    'Forgetting to check all possible rational roots',
    'Not verifying the decomposition by recombining',
  ],

  exam_tips: [
    'For Factor Theorem: try x = ±1, ±2, ±3 (factors of constant term) first',
    'After finding one factor, use synthetic division to reduce degree',
    'Cover-up rule can speed up finding A, B, C values',
    'Always check: recombine partial fractions to verify',
    'For improper fractions, divide first to get polynomial + proper fraction',
  ],

  visualizations: [
    {
      title: 'Polynomial Root Finder',
      description: 'Visualize polynomial roots on the x-axis',
      interactive: true,
    },
    {
      title: 'Partial Fraction Visualizer',
      description: 'See how component fractions sum to the original',
      interactive: true,
    },
  ],
};

// Import extended topics
import { TOPIC_A5, TOPIC_A6, TOPIC_G1, TOPIC_G2, TOPIC_G3, TOPIC_C1 } from './syllabus-extended';

// Export all topics
export const ALL_TOPICS: Record<QuizTopic, TopicData> = {
  A1: TOPIC_A1,
  A2: TOPIC_A2,
  A3: TOPIC_A3,
  A4: TOPIC_A4,
  A5: TOPIC_A5,
  A6: TOPIC_A6,
  G1: TOPIC_G1,
  G2: TOPIC_G2,
  G3: TOPIC_G3,
  C1: TOPIC_C1,
};

// Helper function to get topic data
export function getTopicData(topicId: QuizTopic): TopicData | undefined {
  const data = ALL_TOPICS[topicId];
  if (data && Object.keys(data).length > 0) {
    return data;
  }
  return undefined;
}
