// Interactive Visualization Configurations
// Enhanced Desmos and GeoGebra configurations for immersive learning

export interface InteractiveVisualization {
  id: string;
  topicId: string;
  title: string;
  description: string;
  type: 'desmos' | 'geogebra';
  config: DesmosConfig | GeoGebraConfig;
  explorationGuide: ExplorationStep[];
  keyInsights: string[];
}

export interface DesmosConfig {
  expressions: DesmosExpression[];
  bounds?: {
    left: number;
    right: number;
    bottom: number;
    top: number;
  };
  settings?: {
    showGrid?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    degreeMode?: boolean;
  };
}

export interface DesmosExpression {
  latex: string;
  color?: string;
  lineStyle?: 'SOLID' | 'DASHED' | 'DOTTED';
  pointStyle?: 'POINT' | 'OPEN' | 'CROSS';
  hidden?: boolean;
  label?: string;
  showLabel?: boolean;
  sliderBounds?: { min: number; max: number; step?: number };
}

export interface GeoGebraConfig {
  commands: string[];
  appName: 'graphing' | 'geometry' | 'classic' | '3d';
  showToolBar: boolean;
  enableShiftDragZoom: boolean;
}

export interface ExplorationStep {
  instruction: string;
  focusElement?: string;
  expectedObservation: string;
}

// =============================================================================
// QUADRATICS VISUALIZATIONS
// =============================================================================

export const QUADRATICS_VISUALIZATIONS: InteractiveVisualization[] = [
  {
    id: 'quad-vertex-form',
    topicId: 'quadratics',
    title: 'Vertex Form Explorer',
    description: 'Discover how parameters affect the parabola shape and position',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'a = 1', sliderBounds: { min: -5, max: 5, step: 0.1 } },
        { latex: 'h = 0', sliderBounds: { min: -10, max: 10, step: 0.5 } },
        { latex: 'k = 0', sliderBounds: { min: -10, max: 10, step: 0.5 } },
        { latex: 'y = a(x-h)^2 + k', color: '#3b82f6' },
        { latex: '(h, k)', color: '#ef4444', pointStyle: 'POINT', label: 'Vertex', showLabel: true },
        { latex: 'x = h', color: '#22c55e', lineStyle: 'DASHED', label: 'Axis of Symmetry' },
      ],
      bounds: { left: -15, right: 15, bottom: -15, top: 15 },
      settings: { showGrid: true, xAxisLabel: 'x', yAxisLabel: 'y' },
    },
    explorationGuide: [
      { instruction: 'Set a = 1, h = 0, k = 0. Observe the standard parabola.', expectedObservation: 'Parabola opens upward with vertex at origin.' },
      { instruction: 'Change h to 3. Watch the vertex move.', expectedObservation: 'The parabola shifts right by 3 units.' },
      { instruction: 'Change k to 2. Watch the vertex move.', expectedObservation: 'The parabola shifts up by 2 units.' },
      { instruction: 'Make a negative. What happens?', expectedObservation: 'The parabola flips and opens downward.' },
      { instruction: 'Make |a| larger. What happens to the width?', expectedObservation: 'The parabola becomes narrower.' },
    ],
    keyInsights: [
      'h controls horizontal shift (opposite sign)',
      'k controls vertical shift (same sign)',
      'a controls opening direction and width',
      'Vertex is always at (h, k)',
    ],
  },
  {
    id: 'quad-discriminant',
    topicId: 'quadratics',
    title: 'Discriminant Visualizer',
    description: 'See how the discriminant relates to the number of roots',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'a = 1', sliderBounds: { min: -5, max: 5, step: 0.1 } },
        { latex: 'b = 0', sliderBounds: { min: -10, max: 10, step: 0.5 } },
        { latex: 'c = -4', sliderBounds: { min: -10, max: 10, step: 0.5 } },
        { latex: 'y = ax^2 + bx + c', color: '#3b82f6' },
        { latex: 'D = b^2 - 4ac', color: '#000000' },
        { latex: 'y = 0', color: '#94a3b8', lineStyle: 'DASHED' },
      ],
      bounds: { left: -10, right: 10, bottom: -10, top: 10 },
    },
    explorationGuide: [
      { instruction: 'Set a=1, b=0, c=-4. Check D value and count x-intercepts.', expectedObservation: 'D=16>0, two x-intercepts (two real roots).' },
      { instruction: 'Increase c until D = 0.', expectedObservation: 'The parabola just touches the x-axis (one repeated root).' },
      { instruction: 'Increase c further to make D negative.', expectedObservation: 'The parabola no longer crosses the x-axis (no real roots).' },
    ],
    keyInsights: [
      'D > 0: Two distinct real roots (two x-intercepts)',
      'D = 0: One repeated real root (touches x-axis)',
      'D < 0: No real roots (no x-intercepts)',
    ],
  },
];

// =============================================================================
// CALCULUS VISUALIZATIONS
// =============================================================================

export const CALCULUS_VISUALIZATIONS: InteractiveVisualization[] = [
  {
    id: 'calc-tangent-gradient',
    topicId: 'calculus',
    title: 'Tangent Line and Gradient',
    description: 'Watch how the tangent line gradient changes along a curve',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'f(x) = x^3 - 3x', color: '#3b82f6' },
        { latex: 'a = 0', sliderBounds: { min: -3, max: 3, step: 0.1 } },
        { latex: '(a, f(a))', color: '#ef4444', pointStyle: 'POINT', label: 'Point', showLabel: true },
        { latex: "m = 3a^2 - 3", hidden: true },
        { latex: 'y - f(a) = m(x - a)', color: '#22c55e', label: 'Tangent' },
        { latex: "\\text{Gradient: } m = f'(a) = 3a^2 - 3", color: '#000000' },
      ],
      bounds: { left: -5, right: 5, bottom: -10, top: 10 },
    },
    explorationGuide: [
      { instruction: 'Move the point along the curve using slider a.', expectedObservation: 'The tangent line rotates as the point moves.' },
      { instruction: 'Find where the gradient equals zero.', expectedObservation: 'At x = -1 and x = 1, the tangent is horizontal (stationary points).' },
      { instruction: 'Notice the gradient sign in different regions.', expectedObservation: 'Gradient is negative between stationary points, positive outside.' },
    ],
    keyInsights: [
      'The derivative gives the gradient at any point',
      'Horizontal tangent means gradient = 0',
      'Gradient sign indicates if function is increasing or decreasing',
    ],
  },
  {
    id: 'calc-area-under-curve',
    topicId: 'calculus',
    title: 'Area Under a Curve',
    description: 'Visualize definite integration as area',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'f(x) = x^2', color: '#3b82f6' },
        { latex: 'a = 0', sliderBounds: { min: -5, max: 5, step: 0.1 } },
        { latex: 'b = 2', sliderBounds: { min: -5, max: 5, step: 0.1 } },
        { latex: 'a \\le x \\le b \\{0 \\le y \\le f(x)\\}', color: '#22c55e' },
        { latex: '\\int_a^b f(x) dx = \\frac{b^3}{3} - \\frac{a^3}{3}', color: '#000000' },
      ],
      bounds: { left: -3, right: 5, bottom: -2, top: 10 },
    },
    explorationGuide: [
      { instruction: 'Set a = 0, b = 2. Observe the shaded area.', expectedObservation: 'The area under y = x^2 from 0 to 2 is 8/3.' },
      { instruction: 'Drag b to make it larger.', expectedObservation: 'The area increases as the upper limit increases.' },
      { instruction: 'Make a negative.', expectedObservation: 'The integral accounts for area below the x-axis as negative.' },
    ],
    keyInsights: [
      'Definite integral equals the signed area under the curve',
      'Area above x-axis is positive, below is negative',
      'The Fundamental Theorem connects derivatives and integrals',
    ],
  },
  {
    id: 'calc-chain-rule',
    topicId: 'calculus',
    title: 'Chain Rule Visualization',
    description: 'Understand composite function differentiation',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'f(x) = (2x + 1)^3', color: '#3b82f6', label: 'f(x) = (2x+1)^3' },
        { latex: 'g(x) = 6(2x + 1)^2', color: '#ef4444', lineStyle: 'DASHED', label: "f'(x) = 6(2x+1)^2" },
        { latex: 'u(x) = 2x + 1', color: '#22c55e', label: 'Inner: u = 2x+1' },
      ],
      bounds: { left: -5, right: 5, bottom: -50, top: 50 },
    },
    explorationGuide: [
      { instruction: 'Compare the three functions plotted.', expectedObservation: 'The derivative is always positive, matching where f(x) is increasing.' },
      { instruction: 'Notice where the derivative is smallest.', expectedObservation: 'At x = -0.5 where the inner function equals zero.' },
    ],
    keyInsights: [
      'Chain rule: derivative of outside times derivative of inside',
      'The inner function determines the "shape" of both curves',
      'f\'(x) = 0 where the original function has horizontal tangent',
    ],
  },
];

// =============================================================================
// TRIGONOMETRY VISUALIZATIONS
// =============================================================================

export const TRIGONOMETRY_VISUALIZATIONS: InteractiveVisualization[] = [
  {
    id: 'trig-unit-circle',
    topicId: 'trigonometry',
    title: 'Unit Circle Explorer',
    description: 'Connect angles to trigonometric values on the unit circle',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'x^2 + y^2 = 1', color: '#3b82f6' },
        { latex: '\\theta = 45', sliderBounds: { min: 0, max: 360, step: 1 } },
        { latex: '(\\cos(\\theta \\cdot \\pi/180), \\sin(\\theta \\cdot \\pi/180))', color: '#ef4444', pointStyle: 'POINT' },
        { latex: 'y = 0 \\{0 \\le x \\le \\cos(\\theta \\cdot \\pi/180)\\}', color: '#22c55e' },
        { latex: 'x = \\cos(\\theta \\cdot \\pi/180) \\{0 \\le y \\le \\sin(\\theta \\cdot \\pi/180)\\}', color: '#f59e0b' },
        { latex: '\\text{cos}(\\theta) = \\cos(\\theta \\cdot \\pi/180)', color: '#22c55e' },
        { latex: '\\text{sin}(\\theta) = \\sin(\\theta \\cdot \\pi/180)', color: '#f59e0b' },
      ],
      bounds: { left: -2, right: 2, bottom: -2, top: 2 },
      settings: { degreeMode: true },
    },
    explorationGuide: [
      { instruction: 'Set theta to 0, 90, 180, 270. Note sin and cos values.', expectedObservation: 'At cardinal angles: sin/cos are 0, 1, or -1.' },
      { instruction: 'Set theta to 45. Note the relationship between sin and cos.', expectedObservation: 'At 45 degrees, sin and cos are equal.' },
      { instruction: 'Watch the signs change in each quadrant.', expectedObservation: 'Q1: both positive, Q2: sin+/cos-, Q3: both negative, Q4: sin-/cos+.' },
    ],
    keyInsights: [
      'cos(theta) is the x-coordinate on unit circle',
      'sin(theta) is the y-coordinate on unit circle',
      'ASTC rule determines signs in each quadrant',
    ],
  },
  {
    id: 'trig-wave-transform',
    topicId: 'trigonometry',
    title: 'Wave Transformations',
    description: 'Explore amplitude, period, and phase shifts',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'A = 1', sliderBounds: { min: 0.1, max: 5, step: 0.1 } },
        { latex: 'B = 1', sliderBounds: { min: 0.1, max: 5, step: 0.1 } },
        { latex: 'C = 0', sliderBounds: { min: -180, max: 180, step: 5 } },
        { latex: 'D = 0', sliderBounds: { min: -5, max: 5, step: 0.5 } },
        { latex: 'y = A\\sin(B(x - C)) + D', color: '#3b82f6' },
        { latex: 'y = \\sin(x)', color: '#94a3b8', lineStyle: 'DASHED' },
        { latex: '\\text{Amplitude: } A', color: '#000000' },
        { latex: '\\text{Period: } 360/B', color: '#000000' },
      ],
      bounds: { left: -360, right: 720, bottom: -6, top: 6 },
      settings: { degreeMode: true },
    },
    explorationGuide: [
      { instruction: 'Increase A. What happens to the wave?', expectedObservation: 'The wave stretches vertically (larger amplitude).' },
      { instruction: 'Increase B. What happens to the period?', expectedObservation: 'More waves fit in the same space (shorter period).' },
      { instruction: 'Change C. Which direction does the wave shift?', expectedObservation: 'Positive C shifts right, negative shifts left.' },
      { instruction: 'Change D. What is D called?', expectedObservation: 'D shifts the wave up/down (vertical translation).' },
    ],
    keyInsights: [
      'A = amplitude (vertical stretch)',
      'Period = 360/B (or 2pi/B in radians)',
      'C = phase shift (horizontal translation)',
      'D = vertical shift',
    ],
  },
];

// =============================================================================
// COORDINATE GEOMETRY VISUALIZATIONS
// =============================================================================

export const COORDINATE_GEOMETRY_VISUALIZATIONS: InteractiveVisualization[] = [
  {
    id: 'coord-gradient-explorer',
    topicId: 'coordinate_geometry',
    title: 'Gradient Explorer',
    description: 'Understand how gradient relates to steepness and direction',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'm = 1', sliderBounds: { min: -5, max: 5, step: 0.1 } },
        { latex: 'c = 0', sliderBounds: { min: -5, max: 5, step: 0.5 } },
        { latex: 'y = mx + c', color: '#3b82f6' },
        { latex: '(0, c)', color: '#ef4444', pointStyle: 'POINT', label: 'y-intercept' },
        { latex: '(1, m + c)', color: '#22c55e', pointStyle: 'POINT' },
        { latex: '\\text{Gradient: } m = \\frac{\\text{rise}}{\\text{run}}', color: '#000000' },
      ],
      bounds: { left: -10, right: 10, bottom: -10, top: 10 },
    },
    explorationGuide: [
      { instruction: 'Set m = 1. Observe the 45-degree angle.', expectedObservation: 'For every 1 unit right, the line goes 1 unit up.' },
      { instruction: 'Make m = 2. How does steepness change?', expectedObservation: 'The line becomes steeper (rises 2 for every 1 run).' },
      { instruction: 'Make m negative. What direction does the line slope?', expectedObservation: 'The line slopes downward from left to right.' },
      { instruction: 'Change c. What moves?', expectedObservation: 'The line shifts up or down without changing slope.' },
    ],
    keyInsights: [
      'Positive gradient: line rises left to right',
      'Negative gradient: line falls left to right',
      'Larger |m|: steeper line',
      'Parallel lines have equal gradients',
    ],
  },
  {
    id: 'coord-circle-equation',
    topicId: 'coordinate_geometry',
    title: 'Circle Equation Explorer',
    description: 'Connect circle equation to center and radius',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'h = 0', sliderBounds: { min: -5, max: 5, step: 0.5 } },
        { latex: 'k = 0', sliderBounds: { min: -5, max: 5, step: 0.5 } },
        { latex: 'r = 3', sliderBounds: { min: 0.5, max: 8, step: 0.5 } },
        { latex: '(x-h)^2 + (y-k)^2 = r^2', color: '#3b82f6' },
        { latex: '(h, k)', color: '#ef4444', pointStyle: 'POINT', label: 'Center', showLabel: true },
        { latex: '\\text{Center: } (h, k)', color: '#000000' },
        { latex: '\\text{Radius: } r', color: '#000000' },
      ],
      bounds: { left: -12, right: 12, bottom: -12, top: 12 },
    },
    explorationGuide: [
      { instruction: 'Start with h=0, k=0, r=3. This is a circle centered at origin.', expectedObservation: 'Circle is centered at (0,0) with radius 3.' },
      { instruction: 'Change h and k. How does the circle move?', expectedObservation: 'The circle translates without changing size.' },
      { instruction: 'Change r. What happens?', expectedObservation: 'The circle grows or shrinks from its center.' },
    ],
    keyInsights: [
      'Standard form: (x-h)^2 + (y-k)^2 = r^2',
      '(h, k) is the center',
      'r is the radius',
      'To find center from general form, complete the square',
    ],
  },
];

// =============================================================================
// EXPONENTIALS VISUALIZATIONS
// =============================================================================

export const EXPONENTIAL_VISUALIZATIONS: InteractiveVisualization[] = [
  {
    id: 'exp-growth-decay',
    topicId: 'exponentials',
    title: 'Exponential Growth and Decay',
    description: 'Compare growth and decay curves',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'a = 2', sliderBounds: { min: 0.1, max: 5, step: 0.1 } },
        { latex: 'y = a^x', color: '#3b82f6', label: 'y = a^x' },
        { latex: 'y = (1/a)^x', color: '#ef4444', lineStyle: 'DASHED', label: 'y = (1/a)^x' },
        { latex: '(0, 1)', color: '#22c55e', pointStyle: 'POINT', label: 'y-intercept', showLabel: true },
        { latex: 'y = 0', color: '#94a3b8', lineStyle: 'DOTTED', label: 'Asymptote' },
      ],
      bounds: { left: -5, right: 5, bottom: -2, top: 10 },
    },
    explorationGuide: [
      { instruction: 'Set a = 2. Compare the two curves.', expectedObservation: 'One grows, one decays. Both pass through (0,1).' },
      { instruction: 'Set a = e (approx 2.718). This is the natural exponential.', expectedObservation: 'The natural exponential has special properties in calculus.' },
      { instruction: 'Make a close to 1. What happens?', expectedObservation: 'Both curves approach the horizontal line y = 1.' },
    ],
    keyInsights: [
      'All exponentials pass through (0, 1)',
      'y = 0 is always an asymptote',
      'a > 1: growth, 0 < a < 1: decay',
      'e^x and ln(x) are inverses',
    ],
  },
  {
    id: 'exp-log-inverse',
    topicId: 'exponentials',
    title: 'Exponential and Logarithm Inverses',
    description: 'Visualize the inverse relationship',
    type: 'desmos',
    config: {
      expressions: [
        { latex: 'y = e^x', color: '#3b82f6', label: 'y = e^x' },
        { latex: 'y = \\ln(x)', color: '#ef4444', label: 'y = ln(x)' },
        { latex: 'y = x', color: '#94a3b8', lineStyle: 'DASHED', label: 'y = x (reflection line)' },
        { latex: '(1, 0)', color: '#22c55e', pointStyle: 'POINT' },
        { latex: '(0, 1)', color: '#22c55e', pointStyle: 'POINT' },
      ],
      bounds: { left: -5, right: 8, bottom: -5, top: 8 },
    },
    explorationGuide: [
      { instruction: 'Observe how the curves relate to y = x.', expectedObservation: 'They are reflections of each other across y = x.' },
      { instruction: 'Find the x-intercept of ln(x).', expectedObservation: 'ln(x) = 0 when x = 1, so intercept is (1, 0).' },
      { instruction: 'Note the asymptotes.', expectedObservation: 'e^x has y=0 as asymptote, ln(x) has x=0 as asymptote.' },
    ],
    keyInsights: [
      'Inverse functions are reflections across y = x',
      'e^(ln(x)) = x and ln(e^x) = x',
      'Domain of ln(x): x > 0',
      'Range of e^x: y > 0',
    ],
  },
];

// =============================================================================
// ALL VISUALIZATIONS
// =============================================================================

export const ALL_VISUALIZATIONS: InteractiveVisualization[] = [
  ...QUADRATICS_VISUALIZATIONS,
  ...CALCULUS_VISUALIZATIONS,
  ...TRIGONOMETRY_VISUALIZATIONS,
  ...COORDINATE_GEOMETRY_VISUALIZATIONS,
  ...EXPONENTIAL_VISUALIZATIONS,
];

export function getVisualizationsByTopic(topicId: string): InteractiveVisualization[] {
  return ALL_VISUALIZATIONS.filter((v) => v.topicId === topicId);
}

export function getVisualizationById(id: string): InteractiveVisualization | undefined {
  return ALL_VISUALIZATIONS.find((v) => v.id === id);
}
