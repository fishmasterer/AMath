// Singapore O-Level Additional Mathematics Syllabus (4049)
// Extended topics: A5, A6, G1, G2, G3, C1

import { TopicData } from './syllabus';

// ============================================================================
// TOPIC A5: BINOMIAL EXPANSIONS
// ============================================================================

export const TOPIC_A5: TopicData = {
  id: 'A5',
  name: 'Binomial Expansions',
  subtitle: 'Pascal\'s triangle and the binomial theorem',
  category: 'algebra',
  color: 'cyan',
  icon: 'triangle',

  syllabus_code: 'A5',
  learning_objectives: [
    {
      code: 'A5.1',
      description: 'Use the binomial theorem for expansion of (a + b)^n for positive integer n',
    },
    {
      code: 'A5.2',
      description: 'Use the general term formula to find specific terms',
    },
    {
      code: 'A5.3',
      description: 'Know and use Pascal\'s triangle',
    },
  ],

  why_learn: {
    summary: 'Binomial expansions are the foundation of probability theory and appear throughout statistics and computing.',
    importance: [
      'Probability calculations (coin flips, success/failure events)',
      'Compound interest and financial growth models',
      'Genetics and population modeling',
      'Computer science algorithms and combinatorics',
      'Approximations in physics and engineering',
    ],
    prerequisites: ['A1'],
    leads_to: ['C1'],
  },

  concepts: [
    {
      name: 'Binomial Coefficient',
      definition: 'The number of ways to choose r items from n items, written as ⁿCᵣ or (n r)',
      key_points: [
        'Also called "n choose r"',
        'ⁿCᵣ = n!/(r!(n-r)!)',
        'Forms Pascal\'s triangle pattern',
        'ⁿC₀ = ⁿCₙ = 1',
      ],
    },
    {
      name: 'Pascal\'s Triangle',
      definition: 'A triangular array where each number is the sum of the two above it',
      key_points: [
        'Row n gives coefficients for (a+b)ⁿ',
        'Symmetric: ⁿCᵣ = ⁿCₙ₋ᵣ',
        'Each row sums to 2ⁿ',
        'Starts with row 0: 1',
      ],
    },
    {
      name: 'General Term',
      definition: 'The (r+1)th term in the expansion of (a + b)ⁿ',
      key_points: [
        'Tᵣ₊₁ = ⁿCᵣ · aⁿ⁻ʳ · bʳ',
        'Powers of a decrease, powers of b increase',
        'r goes from 0 to n',
        'Total of (n+1) terms',
      ],
    },
  ],

  formulas: [
    {
      name: 'Binomial Theorem',
      latex: '(a + b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r',
      description: 'Expansion formula for (a + b)ⁿ',
      when_to_use: 'Expanding powers of binomials',
    },
    {
      name: 'Binomial Coefficient',
      latex: '\\binom{n}{r} = \\frac{n!}{r!(n-r)!} = \\frac{n(n-1)...(n-r+1)}{r!}',
      description: 'Number of ways to choose r from n',
      when_to_use: 'Finding specific coefficients',
    },
    {
      name: 'General Term',
      latex: 'T_{r+1} = \\binom{n}{r} a^{n-r} b^r',
      description: 'The (r+1)th term in the expansion',
      when_to_use: 'Finding specific terms without full expansion',
    },
    {
      name: 'Special Case (1+x)ⁿ',
      latex: '(1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + ...',
      description: 'Commonly used form for approximations',
      when_to_use: 'When one term is 1',
    },
  ],

  real_world_applications: [
    {
      title: 'Probability',
      description: 'Calculate chances of multiple independent events.',
      industry: 'Statistics / Insurance',
      icon: 'dice-5',
      example: 'Probability of exactly 3 heads in 5 coin flips: ⁵C₃ × (1/2)³ × (1/2)² = 10/32 = 31.25%',
    },
    {
      title: 'Compound Interest',
      description: 'Financial growth with regular compounding.',
      industry: 'Finance / Banking',
      icon: 'coins',
      example: '(1 + 0.05)¹⁰ = 1 + 10(0.05) + 45(0.05)² + ... ≈ 1.629 for 5% over 10 years.',
    },
    {
      title: 'Genetics',
      description: 'Predicting trait distributions in populations.',
      industry: 'Biology / Medicine',
      icon: 'dna',
      example: 'In F2 generation with 3:1 ratio, chance of 2 dominant in 4 offspring uses binomial.',
    },
    {
      title: 'Quality Control',
      description: 'Sampling and defect probability in manufacturing.',
      industry: 'Manufacturing',
      icon: 'factory',
      example: 'If 2% defective, chance of at least 1 defect in 10 items: 1 - (0.98)¹⁰ ≈ 18.3%.',
    },
    {
      title: 'Network Reliability',
      description: 'Computing uptime probabilities for systems.',
      industry: 'Technology',
      icon: 'globe',
      example: 'With 5 backup servers each 95% reliable, system uptime uses binomial distribution.',
    },
  ],

  career_connections: [
    {
      career: 'Actuary',
      description: 'Uses binomial models for insurance risk calculations',
      icon: 'bar-chart-2',
      salary_range: '$70,000 - $150,000',
    },
    {
      career: 'Biostatistician',
      description: 'Applies binomial distributions in medical research',
      icon: 'microscope',
      salary_range: '$65,000 - $120,000',
    },
    {
      career: 'Quantitative Analyst',
      description: 'Models financial events using probability theory',
      icon: 'trending-up',
      salary_range: '$100,000 - $200,000',
    },
  ],

  common_mistakes: [
    'Using wrong formula: Tᵣ₊₁ not Tᵣ for general term',
    'Forgetting that r starts from 0 not 1',
    'Sign errors with negative terms: (-x)ʳ alternates sign',
    'Not simplifying binomial coefficients fully',
    'Confusing (a+b)ⁿ expansion with (a-b)ⁿ signs',
  ],

  exam_tips: [
    'Build Pascal\'s triangle quickly - each number is sum of two above',
    'For finding coefficient of xᵏ, set up equation: power of x variable = k',
    'Remember: n+1 terms in expansion of (a+b)ⁿ',
    'Use symmetry: coefficient of first term = coefficient of last term',
    'For approximations, use first few terms of (1+x)ⁿ when x is small',
  ],

  visualizations: [
    {
      title: 'Pascal\'s Triangle Generator',
      description: 'Build Pascal\'s triangle interactively',
      interactive: true,
    },
    {
      title: 'Binomial Distribution Visualizer',
      description: 'See probability distributions for coin flips',
      interactive: true,
    },
  ],
};

// ============================================================================
// TOPIC A6: EXPONENTIAL AND LOGARITHMIC FUNCTIONS
// ============================================================================

export const TOPIC_A6: TopicData = {
  id: 'A6',
  name: 'Exponential and Logarithmic Functions',
  subtitle: 'Growth, decay, and their inverses',
  category: 'algebra',
  color: 'cyan',
  icon: 'trending-up',

  syllabus_code: 'A6',
  learning_objectives: [
    {
      code: 'A6.1',
      description: 'Know and use the laws of indices and logarithms',
    },
    {
      code: 'A6.2',
      description: 'Solve equations involving exponentials and logarithms',
    },
    {
      code: 'A6.3',
      description: 'Know the relationship between aˣ and logₐx',
    },
    {
      code: 'A6.4',
      description: 'Sketch graphs of exponential and logarithmic functions',
    },
    {
      code: 'A6.5',
      description: 'Solve problems involving exponential growth and decay',
    },
  ],

  why_learn: {
    summary: 'Exponentials and logarithms model everything that grows or decays - from populations to radioactive materials to sound intensity.',
    importance: [
      'Population growth and bacterial cultures',
      'Radioactive decay and carbon dating',
      'Compound interest and investment growth',
      'Sound intensity (decibels) and earthquake magnitude (Richter)',
      'pH scale in chemistry',
      'Algorithm complexity in computer science',
    ],
    prerequisites: ['A1'],
    leads_to: ['C1'],
  },

  concepts: [
    {
      name: 'Exponential Function',
      definition: 'A function of the form f(x) = aˣ where a > 0 and a ≠ 1',
      key_points: [
        'Always positive (never crosses x-axis)',
        'a > 1: exponential growth',
        'a < 1: exponential decay',
        'y-intercept is always (0, 1)',
        'Horizontal asymptote at y = 0',
      ],
    },
    {
      name: 'Logarithm',
      definition: 'The inverse of exponential: if aˣ = y, then logₐy = x',
      key_points: [
        'logₐy answers: "What power of a gives y?"',
        'Only defined for positive arguments',
        'logₐ1 = 0 (since a⁰ = 1)',
        'logₐa = 1 (since a¹ = a)',
      ],
    },
    {
      name: 'Natural Logarithm',
      definition: 'Logarithm with base e ≈ 2.71828, written as ln(x)',
      key_points: [
        'e is Euler\'s number',
        'ln(eˣ) = x and e^(ln x) = x',
        'Used extensively in calculus',
        'Models continuous growth',
      ],
    },
    {
      name: 'Exponential Growth/Decay',
      definition: 'Models where rate of change is proportional to current value',
      key_points: [
        'Growth: y = A × aᵗ where a > 1',
        'Decay: y = A × aᵗ where 0 < a < 1',
        'Half-life: time for quantity to halve',
        'Doubling time: time to double',
      ],
    },
  ],

  formulas: [
    {
      name: 'Laws of Indices',
      latex: 'a^m \\times a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}',
      description: 'Rules for manipulating powers',
      when_to_use: 'Simplifying exponential expressions',
    },
    {
      name: 'Laws of Logarithms',
      latex: '\\log_a(xy) = \\log_a x + \\log_a y, \\quad \\log_a\\frac{x}{y} = \\log_a x - \\log_a y, \\quad \\log_a(x^n) = n\\log_a x',
      description: 'Rules for manipulating logarithms',
      when_to_use: 'Simplifying and solving logarithmic equations',
    },
    {
      name: 'Change of Base',
      latex: '\\log_a x = \\frac{\\log_b x}{\\log_b a} = \\frac{\\ln x}{\\ln a}',
      description: 'Convert between different logarithm bases',
      when_to_use: 'Using calculator (which has log₁₀ and ln)',
    },
    {
      name: 'Exponential-Log Relationship',
      latex: 'y = a^x \\Leftrightarrow x = \\log_a y',
      description: 'Converting between forms',
      when_to_use: 'Solving exponential and log equations',
    },
    {
      name: 'Exponential Growth/Decay',
      latex: 'N = N_0 e^{kt}',
      description: 'Continuous exponential model (k > 0 growth, k < 0 decay)',
      when_to_use: 'Population, radioactivity, continuous compounding',
    },
    {
      name: 'Half-Life Formula',
      latex: 't_{1/2} = \\frac{\\ln 2}{k}',
      description: 'Time for quantity to halve',
      when_to_use: 'Radioactive decay, drug metabolism',
    },
  ],

  real_world_applications: [
    {
      title: 'Population Growth',
      description: 'Modeling how populations increase over time.',
      industry: 'Biology / Environmental Science',
      icon: 'users',
      example: 'Bacteria doubling every 20 min: N = N₀ × 2^(t/20). After 1 hour: N = 8N₀.',
      visualization: {
        type: 'desmos',
        config: {
          expressions: [
            { latex: 'y = 2^x', color: '#16a34a' },
            { latex: 'y = 1', color: '#94a3b8' },
          ],
        },
      },
    },
    {
      title: 'Radioactive Decay',
      description: 'How radioactive materials decrease over time.',
      industry: 'Nuclear Physics / Medicine',
      icon: 'atom',
      example: 'Carbon-14 has half-life 5730 years. After 11460 years, only 25% remains.',
    },
    {
      title: 'Compound Interest',
      description: 'Money growth with reinvested earnings.',
      industry: 'Finance / Banking',
      icon: 'landmark',
      example: 'A = P(1 + r/n)^(nt). $1000 at 5% compounded monthly for 10 years → $1647.01.',
    },
    {
      title: 'Decibel Scale',
      description: 'Measuring sound intensity logarithmically.',
      industry: 'Audio Engineering / Acoustics',
      icon: 'volume-2',
      example: 'dB = 10 log₁₀(I/I₀). A sound 100× more intense is 20dB louder.',
    },
    {
      title: 'Richter Scale',
      description: 'Measuring earthquake magnitude.',
      industry: 'Geology / Seismology',
      icon: 'globe',
      example: 'Each unit increase = 10× more amplitude. Magnitude 7 is 10× stronger than 6.',
    },
    {
      title: 'pH Scale',
      description: 'Measuring acidity of solutions.',
      industry: 'Chemistry / Biology',
      icon: 'flask-conical',
      example: 'pH = -log₁₀[H⁺]. pH 3 is 100× more acidic than pH 5.',
    },
  ],

  career_connections: [
    {
      career: 'Epidemiologist',
      description: 'Models disease spread using exponential growth',
      icon: 'hospital',
      salary_range: '$60,000 - $110,000',
    },
    {
      career: 'Financial Analyst',
      description: 'Calculates compound returns and growth projections',
      icon: 'trending-up',
      salary_range: '$65,000 - $130,000',
    },
    {
      career: 'Nuclear Engineer',
      description: 'Works with radioactive decay calculations',
      icon: 'atom',
      salary_range: '$80,000 - $140,000',
    },
    {
      career: 'Audio Engineer',
      description: 'Uses decibel calculations for sound design',
      icon: 'headphones',
      salary_range: '$45,000 - $90,000',
    },
  ],

  common_mistakes: [
    'log(a + b) ≠ log a + log b (this is for multiplication)',
    'log(a × b) ≠ log a × log b (should be log a + log b)',
    'Forgetting that log is only defined for positive numbers',
    'Confusing ln (base e) with log (base 10)',
    'Sign errors in decay problems (k should be negative)',
    'Not checking domain restrictions in solutions',
  ],

  exam_tips: [
    'To solve aˣ = b: take log both sides → x log a = log b → x = log b / log a',
    'To solve log equations: convert to exponential form first',
    'Remember: ln e = 1, log 10 = 1',
    'For growth/decay: identify initial value, growth/decay factor, and time',
    'Always check answers are in valid domain (log of positive numbers only)',
  ],

  visualizations: [
    {
      title: 'Exponential vs Logarithmic',
      description: 'See how they are reflections of each other in y = x',
      desmos_config: JSON.stringify({
        expressions: [
          { latex: 'y = e^x', color: '#2563eb' },
          { latex: 'y = \\ln(x)', color: '#dc2626' },
          { latex: 'y = x', color: '#94a3b8', lineStyle: 'DASHED' },
        ],
      }),
      interactive: true,
    },
    {
      title: 'Growth vs Decay',
      description: 'Compare exponential growth and decay curves',
      interactive: true,
    },
  ],
};

// ============================================================================
// TOPIC G1: TRIGONOMETRIC FUNCTIONS
// ============================================================================

export const TOPIC_G1: TopicData = {
  id: 'G1',
  name: 'Trigonometric Functions',
  subtitle: 'Identities, equations, and graphs',
  category: 'geometry',
  color: 'purple',
  icon: 'circle-dot',

  syllabus_code: 'G1',
  learning_objectives: [
    {
      code: 'G1.1',
      description: 'Know the six trigonometric functions and their graphs',
    },
    {
      code: 'G1.2',
      description: 'Use trigonometric identities',
      subObjectives: [
        'Pythagorean identities',
        'Compound angle formulas',
        'Double angle formulas',
        'R-formula for a cos θ + b sin θ',
      ],
    },
    {
      code: 'G1.3',
      description: 'Solve trigonometric equations',
    },
    {
      code: 'G1.4',
      description: 'Prove trigonometric identities',
    },
  ],

  why_learn: {
    summary: 'Trigonometry describes all cyclic phenomena - from sound waves to satellite orbits to AC electricity.',
    importance: [
      'Wave motion: sound, light, ocean waves',
      'Electrical engineering: AC circuits',
      'Architecture: calculating angles and heights',
      'Navigation and GPS systems',
      'Music and acoustics',
      'Game development: rotations and physics',
    ],
    prerequisites: [],
    leads_to: ['G2', 'C1'],
  },

  concepts: [
    {
      name: 'Radian Measure',
      definition: 'An angle measure where 2π radians = 360°',
      key_points: [
        'π radians = 180°',
        'Arc length s = rθ (θ in radians)',
        'Sector area A = ½r²θ',
        'Natural unit for calculus',
      ],
    },
    {
      name: 'Unit Circle',
      definition: 'Circle with radius 1 centered at origin',
      key_points: [
        'cos θ = x-coordinate',
        'sin θ = y-coordinate',
        'tan θ = y/x = sin θ/cos θ',
        'All trig values derivable from unit circle',
      ],
    },
    {
      name: 'Trigonometric Identities',
      definition: 'Equations true for all valid values of the variable',
      key_points: [
        'Pythagorean: sin²θ + cos²θ = 1',
        'Double angle: sin 2θ = 2 sin θ cos θ',
        'Compound: sin(A+B) = sin A cos B + cos A sin B',
        'Used to simplify and prove expressions',
      ],
    },
    {
      name: 'Amplitude, Period, Phase',
      definition: 'Parameters describing transformed trig functions',
      key_points: [
        'y = A sin(Bx + C) + D',
        'Amplitude = |A|',
        'Period = 2π/|B|',
        'Phase shift = -C/B',
        'Vertical shift = D',
      ],
    },
  ],

  formulas: [
    {
      name: 'Pythagorean Identities',
      latex: '\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta',
      description: 'Fundamental relationships between trig functions',
      when_to_use: 'Simplifying expressions, proving identities',
    },
    {
      name: 'Compound Angle (Addition)',
      latex: '\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B, \\quad \\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B',
      description: 'Expand sin and cos of sum/difference',
      when_to_use: 'Expanding combined angles',
    },
    {
      name: 'Double Angle',
      latex: '\\sin 2\\theta = 2\\sin\\theta\\cos\\theta, \\quad \\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta',
      description: 'Express functions of 2θ in terms of θ',
      when_to_use: 'Solving equations, integration',
    },
    {
      name: 'R-Formula',
      latex: 'a\\cos\\theta + b\\sin\\theta = R\\cos(\\theta - \\alpha) \\text{ where } R = \\sqrt{a^2 + b^2}, \\tan\\alpha = \\frac{b}{a}',
      description: 'Combine sin and cos into single function',
      when_to_use: 'Finding max/min values, solving equations',
    },
    {
      name: 'Arc Length and Sector Area',
      latex: 's = r\\theta, \\quad A = \\frac{1}{2}r^2\\theta',
      description: 'For angle θ in radians',
      when_to_use: 'Circle problems, rates of change',
    },
  ],

  real_world_applications: [
    {
      title: 'Sound Waves',
      description: 'Sound travels as pressure waves described by sine functions.',
      industry: 'Music / Audio Engineering',
      icon: 'audio-waveform',
      example: 'Musical note A = 440Hz: y = A sin(880πt). Combining notes = adding sine waves.',
      visualization: {
        type: 'desmos',
        config: {
          expressions: [
            { latex: 'y = \\sin(2\\pi x)', color: '#2563eb' },
            { latex: 'y = 0.5\\sin(4\\pi x)', color: '#16a34a' },
            { latex: 'y = \\sin(2\\pi x) + 0.5\\sin(4\\pi x)', color: '#dc2626' },
          ],
        },
      },
    },
    {
      title: 'AC Electricity',
      description: 'Alternating current varies sinusoidally.',
      industry: 'Electrical Engineering',
      icon: 'zap',
      example: 'Singapore mains: V = 340 sin(100πt). Peak voltage 340V, RMS 240V.',
    },
    {
      title: 'Tides',
      description: 'Ocean tides follow sinusoidal patterns.',
      industry: 'Marine / Shipping',
      icon: 'waves',
      example: 'Tide height h = 2 + 1.5 sin(πt/6) varies between 0.5m and 3.5m over 12 hours.',
    },
    {
      title: 'Ferris Wheel',
      description: 'Height on a Ferris wheel is sinusoidal.',
      industry: 'Theme Parks',
      icon: 'ferris-wheel',
      example: 'Height h = 15 + 10 sin(πt/30 - π/2) for 30m diameter wheel, 60s revolution.',
    },
    {
      title: 'GPS Navigation',
      description: 'Uses triangulation with trigonometric calculations.',
      industry: 'Navigation / Surveying',
      icon: 'map-pin',
      example: 'Satellite positions and distances use sine and cosine rules.',
    },
  ],

  career_connections: [
    {
      career: 'Electrical Engineer',
      description: 'Designs AC circuits and signal processing systems',
      icon: 'plug',
      salary_range: '$70,000 - $130,000',
    },
    {
      career: 'Sound Engineer',
      description: 'Manipulates audio signals using wave mathematics',
      icon: 'headphones',
      salary_range: '$45,000 - $90,000',
    },
    {
      career: 'Animator/Game Developer',
      description: 'Uses trigonometry for rotations and smooth motion',
      icon: 'gamepad-2',
      salary_range: '$60,000 - $120,000',
    },
    {
      career: 'Structural Engineer',
      description: 'Calculates forces and angles in buildings',
      icon: 'hard-hat',
      salary_range: '$65,000 - $110,000',
    },
  ],

  common_mistakes: [
    'Forgetting to use radians (not degrees) in calculus',
    'Wrong signs in compound angle formulas',
    'Losing solutions when dividing by trig functions (might be zero)',
    'Forgetting general solutions: add 2nπ or nπ as needed',
    'Not finding ALL solutions in given range',
    'Confusing sin⁻¹x (inverse) with (sin x)⁻¹ = csc x',
  ],

  exam_tips: [
    'Memorize exact values: sin/cos of 0°, 30°, 45°, 60°, 90°',
    'For equations, find principal value first, then general solution',
    'Use ASTC (All Students Take Calculus) for signs in quadrants',
    'To prove identities, work from more complex side',
    'R-formula: R is always positive, find α in correct quadrant',
    'Calculator must be in correct mode (radians or degrees)',
  ],

  visualizations: [
    {
      title: 'Unit Circle Explorer',
      description: 'See all trig values as you move around the circle',
      interactive: true,
    },
    {
      title: 'Wave Transformation',
      description: 'Adjust amplitude, period, and phase shift',
      interactive: true,
    },
    {
      title: 'Identity Visualizer',
      description: 'See how identities work geometrically',
      interactive: true,
    },
  ],
};

// ============================================================================
// TOPIC G2: COORDINATE GEOMETRY
// ============================================================================

export const TOPIC_G2: TopicData = {
  id: 'G2',
  name: 'Coordinate Geometry',
  subtitle: 'Lines, circles, and their relationships',
  category: 'geometry',
  color: 'purple',
  icon: 'crosshair',

  syllabus_code: 'G2',
  learning_objectives: [
    {
      code: 'G2.1',
      description: 'Find equations of straight lines and circles',
    },
    {
      code: 'G2.2',
      description: 'Solve problems involving intersection of lines and circles',
    },
    {
      code: 'G2.3',
      description: 'Transform between different forms of equations',
    },
  ],

  why_learn: {
    summary: 'Coordinate geometry bridges algebra and geometry, forming the foundation of computer graphics and GPS.',
    importance: [
      'GPS and navigation systems',
      'Computer graphics and CAD',
      'Architecture and construction',
      'Robotics path planning',
      'Geographic Information Systems (GIS)',
    ],
    prerequisites: ['A1'],
    leads_to: ['C1'],
  },

  concepts: [
    {
      name: 'Straight Line',
      definition: 'Linear equation representing a straight line',
      key_points: [
        'Gradient-intercept: y = mx + c',
        'Point-slope: y - y₁ = m(x - x₁)',
        'General: ax + by + c = 0',
        'Gradient m = rise/run = Δy/Δx',
      ],
    },
    {
      name: 'Circle',
      definition: 'Set of all points equidistant from a center',
      key_points: [
        'Standard: (x-a)² + (y-b)² = r²',
        'Center (a, b), radius r',
        'General: x² + y² + 2gx + 2fy + c = 0',
        'Center (-g, -f), radius √(g² + f² - c)',
      ],
    },
    {
      name: 'Perpendicular Lines',
      definition: 'Lines that meet at 90°',
      key_points: [
        'Product of gradients = -1',
        'm₁ × m₂ = -1',
        'If one has gradient m, perpendicular has -1/m',
      ],
    },
    {
      name: 'Line-Circle Intersection',
      definition: 'Finding where a line meets a circle',
      key_points: [
        'Substitute line into circle equation',
        'Solve resulting quadratic',
        'Discriminant determines: 2, 1, or 0 points',
      ],
    },
  ],

  formulas: [
    {
      name: 'Distance Formula',
      latex: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
      description: 'Distance between two points',
      when_to_use: 'Finding lengths, proving equidistance',
    },
    {
      name: 'Midpoint Formula',
      latex: 'M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)',
      description: 'Point exactly between two points',
      when_to_use: 'Finding centers, medians',
    },
    {
      name: 'Gradient',
      latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}',
      description: 'Slope/steepness of a line',
      when_to_use: 'Finding equation of line, parallelism',
    },
    {
      name: 'Circle Standard Form',
      latex: '(x - a)^2 + (y - b)^2 = r^2',
      description: 'Center (a, b), radius r',
      when_to_use: 'Direct reading of center and radius',
    },
    {
      name: 'Circle General Form',
      latex: 'x^2 + y^2 + 2gx + 2fy + c = 0',
      description: 'Center (-g, -f), radius √(g² + f² - c)',
      when_to_use: 'Converting from expanded form',
    },
    {
      name: 'Perpendicular Gradients',
      latex: 'm_1 \\times m_2 = -1',
      description: 'Condition for perpendicularity',
      when_to_use: 'Finding perpendicular lines, altitudes',
    },
  ],

  real_world_applications: [
    {
      title: 'GPS Navigation',
      description: 'GPS uses coordinate geometry for positioning.',
      industry: 'Navigation / Technology',
      icon: 'satellite',
      example: 'Your phone calculates distances and paths using coordinate formulas continuously.',
    },
    {
      title: 'Computer Graphics',
      description: 'Every 2D and 3D game uses coordinate geometry.',
      industry: 'Gaming / Animation',
      icon: 'gamepad-2',
      example: 'Drawing a circle on screen: checking if each pixel satisfies (x-a)² + (y-b)² ≤ r².',
    },
    {
      title: 'Architecture & CAD',
      description: 'Building designs are drawn with precise coordinates.',
      industry: 'Architecture / Engineering',
      icon: 'landmark',
      example: 'AutoCAD uses coordinate geometry for every line, arc, and shape.',
    },
    {
      title: 'Cell Tower Coverage',
      description: 'Circular coverage areas for network planning.',
      industry: 'Telecommunications',
      icon: 'radio-tower',
      example: 'If tower at (5, 3) has 10km range, coverage is (x-5)² + (y-3)² ≤ 100.',
    },
    {
      title: 'Collision Detection',
      description: 'Games check if objects overlap using geometry.',
      industry: 'Game Development',
      icon: 'target',
      example: 'Two circles collide if distance between centers < sum of radii.',
    },
  ],

  career_connections: [
    {
      career: 'GIS Analyst',
      description: 'Works with geographic coordinate data and mapping',
      icon: 'map',
      salary_range: '$50,000 - $85,000',
    },
    {
      career: 'CAD Technician',
      description: 'Creates technical drawings using coordinate-based software',
      icon: 'ruler',
      salary_range: '$45,000 - $75,000',
    },
    {
      career: 'Game Developer',
      description: 'Implements game physics and graphics',
      icon: 'gamepad-2',
      salary_range: '$60,000 - $120,000',
    },
    {
      career: 'Surveyor',
      description: 'Measures and maps land using coordinate systems',
      icon: 'telescope',
      salary_range: '$50,000 - $90,000',
    },
  ],

  common_mistakes: [
    'Confusing center signs: (x-3)² means center x = 3, not -3',
    'Forgetting to complete the square to find center/radius',
    'Using wrong formula for perpendicular gradient',
    'Sign errors in distance formula (squared terms handle this)',
    'Not checking discriminant for line-circle intersection cases',
  ],

  exam_tips: [
    'For circle problems, complete the square to find center and radius',
    'Perpendicular bisector: passes through midpoint, perpendicular to line',
    'Tangent to circle is perpendicular to radius at point of contact',
    'When line touches circle (tangent), discriminant = 0',
    'Draw a diagram! Visual helps catch errors',
  ],

  visualizations: [
    {
      title: 'Interactive Coordinate Plane',
      description: 'Plot points, lines, and circles dynamically',
      interactive: true,
    },
    {
      title: 'Circle Properties',
      description: 'Explore center, radius, and tangent relationships',
      interactive: true,
    },
    {
      title: 'Line-Circle Intersection',
      description: 'See how line position affects intersection points',
      interactive: true,
    },
  ],
};

// ============================================================================
// TOPIC C1: DIFFERENTIATION AND INTEGRATION
// ============================================================================

export const TOPIC_C1: TopicData = {
  id: 'C1',
  name: 'Calculus',
  subtitle: 'Differentiation and integration fundamentals',
  category: 'calculus',
  color: 'pink',
  icon: 'calculator',

  syllabus_code: 'C1',
  learning_objectives: [
    {
      code: 'C1.1',
      description: 'Differentiate standard functions using rules',
      subObjectives: [
        'Power rule, chain rule, product rule, quotient rule',
        'Differentiate trigonometric functions',
        'Differentiate exponential and logarithmic functions',
      ],
    },
    {
      code: 'C1.2',
      description: 'Apply differentiation to find gradients, tangents, and normals',
    },
    {
      code: 'C1.3',
      description: 'Use differentiation for optimization and rates of change',
    },
    {
      code: 'C1.4',
      description: 'Integrate standard functions',
    },
    {
      code: 'C1.5',
      description: 'Evaluate definite integrals and find areas',
    },
    {
      code: 'C1.6',
      description: 'Solve problems involving kinematics',
    },
  ],

  why_learn: {
    summary: 'Calculus is the mathematics of change - essential for physics, engineering, economics, and any field involving optimization.',
    importance: [
      'Physics: motion, forces, energy',
      'Engineering: designing efficient systems',
      'Economics: maximizing profit, minimizing cost',
      'Medicine: drug dosage rates',
      'Machine learning: gradient descent optimization',
      'Climate science: modeling change over time',
    ],
    prerequisites: ['A1', 'A6', 'G1'],
    leads_to: [],
  },

  concepts: [
    {
      name: 'Derivative',
      definition: 'The instantaneous rate of change of a function',
      key_points: [
        'f\'(x) = lim[h→0] (f(x+h) - f(x))/h',
        'Gradient of tangent line at a point',
        'Represents how fast y changes with x',
        'Zero derivative means turning point',
      ],
    },
    {
      name: 'Integral',
      definition: 'The reverse of differentiation / area under curve',
      key_points: [
        'Indefinite: ∫f(x)dx = F(x) + C',
        'Definite: ∫[a,b]f(x)dx = F(b) - F(a)',
        'Represents accumulated quantity',
        'Area between curve and x-axis',
      ],
    },
    {
      name: 'Optimization',
      definition: 'Finding maximum or minimum values',
      key_points: [
        'At turning points, dy/dx = 0',
        'd²y/dx² > 0: minimum',
        'd²y/dx² < 0: maximum',
        'Check endpoints for global extrema',
      ],
    },
    {
      name: 'Kinematics',
      definition: 'The study of motion without considering forces',
      key_points: [
        'Velocity = ds/dt (derivative of displacement)',
        'Acceleration = dv/dt (derivative of velocity)',
        'Displacement = ∫v dt',
        'Velocity = ∫a dt',
      ],
    },
  ],

  formulas: [
    {
      name: 'Power Rule',
      latex: '\\frac{d}{dx}(x^n) = nx^{n-1}, \\quad \\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\text{ (n ≠ -1)}',
      description: 'Differentiate/integrate powers of x',
      when_to_use: 'Most polynomial functions',
    },
    {
      name: 'Chain Rule',
      latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
      description: 'Differentiate composite functions',
      when_to_use: 'Function within a function',
    },
    {
      name: 'Product Rule',
      latex: '\\frac{d}{dx}[uv] = u\\frac{dv}{dx} + v\\frac{du}{dx}',
      description: 'Differentiate products of functions',
      when_to_use: 'Two functions multiplied together',
    },
    {
      name: 'Quotient Rule',
      latex: '\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}',
      description: 'Differentiate quotients of functions',
      when_to_use: 'Fraction of two functions',
    },
    {
      name: 'Trigonometric Derivatives',
      latex: '\\frac{d}{dx}(\\sin x) = \\cos x, \\quad \\frac{d}{dx}(\\cos x) = -\\sin x, \\quad \\frac{d}{dx}(\\tan x) = \\sec^2 x',
      description: 'Derivatives of basic trig functions',
      when_to_use: 'Differentiating trig expressions',
    },
    {
      name: 'Exponential and Log Derivatives',
      latex: '\\frac{d}{dx}(e^x) = e^x, \\quad \\frac{d}{dx}(\\ln x) = \\frac{1}{x}, \\quad \\frac{d}{dx}(a^x) = a^x \\ln a',
      description: 'Derivatives of exponential and log functions',
      when_to_use: 'Growth/decay and log functions',
    },
    {
      name: 'Definite Integral',
      latex: '\\int_a^b f(x) dx = [F(x)]_a^b = F(b) - F(a)',
      description: 'Evaluate integral between limits',
      when_to_use: 'Finding areas, accumulated quantities',
    },
  ],

  real_world_applications: [
    {
      title: 'Motion Analysis',
      description: 'Understanding how objects move through space and time.',
      industry: 'Physics / Engineering',
      icon: 'rocket',
      example: 'If position s = t³ - 6t², velocity v = 3t² - 12t. Object at rest when v = 0, i.e., t = 0 or 4.',
      visualization: {
        type: 'desmos',
        config: {
          expressions: [
            { latex: 'y = x^3 - 6x^2', color: '#2563eb', label: 'Position' },
            { latex: 'y = 3x^2 - 12x', color: '#16a34a', label: 'Velocity' },
          ],
        },
      },
    },
    {
      title: 'Profit Optimization',
      description: 'Finding price/quantity that maximizes profit.',
      industry: 'Business / Economics',
      icon: 'line-chart',
      example: 'If P = -2x² + 100x - 500, dP/dx = -4x + 100 = 0 gives x = 25 for max profit.',
    },
    {
      title: 'Drug Metabolism',
      description: 'How quickly drugs are absorbed and eliminated.',
      industry: 'Pharmacology',
      icon: 'pill',
      example: 'Concentration C = 50(e^(-0.1t) - e^(-0.5t)). Maximum found by dC/dt = 0.',
    },
    {
      title: 'Structural Engineering',
      description: 'Finding maximum stress and deflection.',
      industry: 'Civil Engineering',
      icon: 'construction',
      example: 'Beam deflection y = f(x), maximum deflection where dy/dx = 0.',
    },
    {
      title: 'Machine Learning',
      description: 'Gradient descent minimizes error functions.',
      industry: 'AI / Data Science',
      icon: 'brain',
      example: 'Neural networks use derivatives to update weights: w_new = w_old - α × dError/dw.',
    },
    {
      title: 'Climate Modeling',
      description: 'Rates of temperature change and ice melt.',
      industry: 'Environmental Science',
      icon: 'earth',
      example: 'Rate of ice loss dV/dt predicts sea level rise over time.',
    },
  ],

  career_connections: [
    {
      career: 'Mechanical Engineer',
      description: 'Designs machines using motion and force calculations',
      icon: 'cog',
      salary_range: '$65,000 - $120,000',
    },
    {
      career: 'Data Scientist',
      description: 'Uses optimization algorithms for machine learning',
      icon: 'bar-chart-2',
      salary_range: '$80,000 - $150,000',
    },
    {
      career: 'Economist',
      description: 'Models marginal costs and revenue',
      icon: 'trending-up',
      salary_range: '$70,000 - $130,000',
    },
    {
      career: 'Biomedical Engineer',
      description: 'Models biological systems and drug delivery',
      icon: 'dna',
      salary_range: '$65,000 - $115,000',
    },
    {
      career: 'Quantitative Analyst',
      description: 'Uses calculus for financial modeling',
      icon: 'line-chart',
      salary_range: '$100,000 - $200,000',
    },
  ],

  common_mistakes: [
    'Forgetting the + C in indefinite integrals',
    'Wrong sign: derivative of cos x is -sin x',
    'Forgetting chain rule when differentiating composite functions',
    'Confusing ∫1/x dx = ln|x| (not ln x)',
    'Not checking second derivative to confirm max/min',
    'Forgetting to differentiate "inside function" in chain rule',
  ],

  exam_tips: [
    'For optimization: set dy/dx = 0, find critical points, check with d²y/dx²',
    'For area between curves: ∫(upper - lower) dx',
    'In kinematics: displacement = ∫velocity, velocity = ∫acceleration',
    'For tangent: gradient = f\'(a) at point x = a',
    'For normal: gradient = -1/f\'(a) (perpendicular to tangent)',
    'Always include + C for indefinite integrals',
  ],

  visualizations: [
    {
      title: 'Derivative Visualizer',
      description: 'See the tangent line as you move along the curve',
      interactive: true,
    },
    {
      title: 'Area Under Curve',
      description: 'Watch Riemann sums approach the integral',
      interactive: true,
    },
    {
      title: 'Optimization Explorer',
      description: 'Find maximum and minimum points visually',
      interactive: true,
    },
    {
      title: 'Kinematics Simulator',
      description: 'See relationships between position, velocity, acceleration',
      interactive: true,
    },
  ],
};

// ============================================================================
// TOPIC G3: PROOFS IN PLANE GEOMETRY
// ============================================================================

export const TOPIC_G3: TopicData = {
  id: 'G3',
  name: 'Proofs in Plane Geometry',
  subtitle: 'Circle properties and geometric reasoning',
  category: 'geometry',
  color: 'purple',
  icon: 'circle',

  syllabus_code: 'G3',
  learning_objectives: [
    {
      code: 'G3.1',
      description: 'Know and apply circle theorems',
      subObjectives: [
        'Angle at center = 2 × angle at circumference',
        'Angles in the same segment are equal',
        'Angle in a semicircle is 90°',
        'Opposite angles in cyclic quadrilateral sum to 180°',
        'Tangent perpendicular to radius',
        'Tangents from external point are equal',
        'Alternate segment theorem',
      ],
    },
    {
      code: 'G3.2',
      description: 'Construct geometric proofs',
    },
  ],

  why_learn: {
    summary: 'Geometric proofs develop logical reasoning skills essential for programming, law, and any analytical field.',
    importance: [
      'Develops logical and deductive reasoning',
      'Foundation for computer science proofs',
      'Essential for architecture and design',
      'Legal argumentation follows similar structures',
      'Engineering tolerance calculations use geometry',
    ],
    prerequisites: ['G2'],
    leads_to: [],
  },

  concepts: [
    {
      name: 'Circle Theorems',
      definition: 'Properties relating angles and lines in circles',
      key_points: [
        'Based on relationships between center, circumference, and tangents',
        'Form the basis of many geometric proofs',
        'Often combined in complex problems',
      ],
    },
    {
      name: 'Cyclic Quadrilateral',
      definition: 'A quadrilateral with all four vertices on a circle',
      key_points: [
        'Opposite angles sum to 180°',
        'Exterior angle = opposite interior angle',
        'If opposite angles sum to 180°, quadrilateral is cyclic',
      ],
    },
    {
      name: 'Tangent Properties',
      definition: 'Line touching circle at exactly one point',
      key_points: [
        'Perpendicular to radius at point of contact',
        'Two tangents from external point are equal',
        'Alternate segment theorem applies',
      ],
    },
  ],

  formulas: [
    {
      name: 'Angle at Center Theorem',
      latex: '\\angle \\text{at center} = 2 \\times \\angle \\text{at circumference}',
      description: 'For angles subtended by the same arc',
      when_to_use: 'Finding unknown angles in circle problems',
    },
    {
      name: 'Cyclic Quadrilateral',
      latex: '\\angle A + \\angle C = 180°, \\quad \\angle B + \\angle D = 180°',
      description: 'Opposite angles sum to 180°',
      when_to_use: 'Problems involving quadrilaterals in circles',
    },
    {
      name: 'Alternate Segment Theorem',
      latex: '\\angle \\text{between tangent and chord} = \\angle \\text{in alternate segment}',
      description: 'Angle between tangent and chord equals inscribed angle',
      when_to_use: 'Problems involving tangent lines',
    },
  ],

  real_world_applications: [
    {
      title: 'Wheel Design',
      description: 'Bicycle and car wheels use circle properties.',
      industry: 'Automotive / Manufacturing',
      icon: 'car',
      example: 'Wheel spokes are designed using circle theorems for even weight distribution.',
    },
    {
      title: 'Camera Lens Design',
      description: 'Optical systems use circular geometry.',
      industry: 'Optics / Photography',
      icon: 'camera',
      example: 'Lens curvature calculations use tangent properties.',
    },
    {
      title: 'Roundabout Design',
      description: 'Traffic engineers design circular intersections.',
      industry: 'Urban Planning',
      icon: 'milestone',
      example: 'Entry angles and sightlines use inscribed angle properties.',
    },
    {
      title: 'Architectural Domes',
      description: 'Circular and spherical structures in buildings.',
      industry: 'Architecture',
      icon: 'landmark',
      example: 'Load distribution in domes uses circle theorems.',
    },
  ],

  career_connections: [
    {
      career: 'Architect',
      description: 'Designs buildings using geometric principles',
      icon: 'landmark',
      salary_range: '$60,000 - $120,000',
    },
    {
      career: 'Patent Lawyer',
      description: 'Constructs logical arguments like geometric proofs',
      icon: 'scale',
      salary_range: '$100,000 - $200,000',
    },
    {
      career: 'Software Engineer',
      description: 'Uses formal proofs in algorithm design',
      icon: 'code',
      salary_range: '$80,000 - $150,000',
    },
  ],

  common_mistakes: [
    'Confusing angle at center with angle at circumference',
    'Forgetting to identify which angles are in the same segment',
    'Not recognizing when a quadrilateral is cyclic',
    'Applying tangent properties to non-tangent lines',
    'Incomplete proofs: skipping logical steps',
  ],

  exam_tips: [
    'Draw a clear diagram and mark all known angles',
    'Look for: center, radii, tangent, cyclic quadrilateral',
    'State the theorem you are using at each step',
    'Work backwards: what would help you find the answer?',
    'Check: do all angles in a triangle sum to 180°?',
  ],

  visualizations: [
    {
      title: 'Circle Theorem Explorer',
      description: 'Drag points to see how angles change',
      interactive: true,
    },
    {
      title: 'Cyclic Quadrilateral',
      description: 'See opposite angles sum to 180°',
      interactive: true,
    },
    {
      title: 'Tangent Properties',
      description: 'Explore tangent-radius perpendicularity',
      interactive: true,
    },
  ],
};
