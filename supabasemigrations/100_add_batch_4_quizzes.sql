-- Batch 4 Quizzes
-- Generated: 2025-11-18T20:17:10.744Z

-- Trigonometric Functions - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Trigonometric Functions - Exam Level',
  'G1',
  21,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  50,
  '[{"id":1,"type":"mcq","question":"Prove that $\\frac{1 - \\cos 2\\theta}{\\sin 2\\theta} = \\tan \\theta$. Which identity is used in the first step?","options":["$\\cos 2\\theta = 1 - 2\\sin^2 \\theta$","$\\cos 2\\theta = 2\\cos^2 \\theta - 1$","$\\sin 2\\theta = 2\\sin \\theta \\cos \\theta$","$\\tan 2\\theta = \\frac{2\\tan \\theta}{1-\\tan^2\\theta}$"],"correctAnswer":"A","marks":7,"explanation":"Using $\\cos 2\\theta = 1 - 2\\sin^2 \\theta$: $\\frac{1 - \\cos 2\\theta}{\\sin 2\\theta} = \\frac{1-(1-2\\sin^2\\theta)}{2\\sin\\theta\\cos\\theta} = \\frac{2\\sin^2\\theta}{2\\sin\\theta\\cos\\theta} = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$."},{"id":2,"type":"mcq","question":"Solve the equation $\\sin 2x = \\cos x$ for $0° \\leq x \\leq 360°$.","options":["$x = 30°, 90°, 150°, 270°$","$x = 60°, 180°, 300°$","$x = 45°, 135°, 315°$","$x = 30°, 150°, 270°$"],"correctAnswer":"A","marks":8,"explanation":"$2\\sin x \\cos x = \\cos x$, so $\\cos x(2\\sin x - 1) = 0$. Either $\\cos x = 0$ giving $x = 90°, 270°$, or $\\sin x = \\frac{1}{2}$ giving $x = 30°, 150°$. Solutions: $x = 30°, 90°, 150°, 270°$."},{"id":3,"type":"mcq","question":"If $\\sin A + \\cos A = \\frac{1}{2}$, find the value of $\\sin A \\cos A$.","options":["$-\\frac{3}{8}$","$\\frac{3}{8}$","$-\\frac{1}{4}$","$\\frac{1}{4}$"],"correctAnswer":"A","marks":7,"explanation":"Square both sides: $(\\sin A + \\cos A)^2 = \\frac{1}{4}$. Expanding: $\\sin^2 A + 2\\sin A \\cos A + \\cos^2 A = \\frac{1}{4}$. Using $\\sin^2 A + \\cos^2 A = 1$: $1 + 2\\sin A \\cos A = \\frac{1}{4}$, so $\\sin A \\cos A = \\frac{1/4 - 1}{2} = \\frac{-3/4}{2} = -\\frac{3}{8}$."},{"id":4,"type":"multi_select","question":"Which of the following are solutions to $2\\sin^2 x - 3\\sin x + 1 = 0$ for $0° \\leq x \\leq 360°$? (Select all that apply)","options":["$x = 30°$","$x = 150°$","$x = 90°$","$x = 270°$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":6,"explanation":"Let $y = \\sin x$: $2y^2 - 3y + 1 = 0$, so $(2y-1)(y-1) = 0$. Thus $y = \\frac{1}{2}$ or $y = 1$. For $\\sin x = \\frac{1}{2}$: $x = 30°, 150°$. For $\\sin x = 1$: $x = 90°$."},{"id":5,"type":"mcq","question":"Express $\\sin 3\\theta$ in terms of $\\sin \\theta$ using the formula $\\sin 3\\theta = 3\\sin \\theta - 4\\sin^3 \\theta$. If $\\sin \\theta = \\frac{1}{3}$, find $\\sin 3\\theta$.","options":["$\\frac{23}{27}$","$\\frac{1}{27}$","$1$","$\\frac{7}{9}$"],"correctAnswer":"A","marks":7,"explanation":"$\\sin 3\\theta = 3\\sin \\theta - 4\\sin^3 \\theta = 3 \\cdot \\frac{1}{3} - 4 \\cdot \\left(\\frac{1}{3}\\right)^3 = 1 - 4 \\cdot \\frac{1}{27} = 1 - \\frac{4}{27} = \\frac{23}{27}$."},{"id":6,"type":"mcq","question":"Solve the equation $\\cos 2x + \\cos x = 0$ for $0° \\leq x \\leq 360°$.","options":["$x = 60°, 180°, 300°$","$x = 120°, 180°, 240°$","$x = 90°, 180°, 270°$","$x = 30°, 150°, 330°$"],"correctAnswer":"A","marks":8,"explanation":"Using $\\cos 2x = 2\\cos^2 x - 1$: $2\\cos^2 x - 1 + \\cos x = 0$, so $2\\cos^2 x + \\cos x - 1 = 0$. Factoring: $(2\\cos x - 1)(\\cos x + 1) = 0$. Thus $\\cos x = \\frac{1}{2}$ giving $x = 60°, 300°$, or $\\cos x = -1$ giving $x = 180°$. Solutions: $x = 60°, 180°, 300°$."},{"id":7,"type":"mcq","question":"If $\\tan \\theta = 2$, find the value of $\\frac{2\\sin \\theta + 3\\cos \\theta}{4\\sin \\theta - \\cos \\theta}$.","options":["$1$","$\\frac{7}{7}$","$2$","$\\frac{1}{2}$"],"correctAnswer":"A","marks":7,"explanation":"Divide numerator and denominator by $\\cos \\theta$: $\\frac{2\\tan \\theta + 3}{4\\tan \\theta - 1} = \\frac{2(2) + 3}{4(2) - 1} = \\frac{4+3}{8-1} = \\frac{7}{7} = 1$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Trigonometric Functions - Exam Level'
  AND topic = 'G1'
  AND difficulty = 'exam_level'
);

-- Trigonometric Functions - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Trigonometric Functions - Foundational',
  'G1',
  19,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  16,
  '[{"id":1,"type":"mcq","question":"Evaluate $\\sin 90°$.","options":["$1$","$0$","$\\frac{1}{2}$","$\\frac{\\sqrt{3}}{2}$"],"correctAnswer":"A","marks":2,"explanation":"$\\sin 90° = 1$."},{"id":2,"type":"mcq","question":"What is the value of $\\cos 0°$?","options":["$1$","$0$","$-1$","$\\frac{1}{2}$"],"correctAnswer":"A","marks":2,"explanation":"$\\cos 0° = 1$."},{"id":3,"type":"mcq","question":"Evaluate $\\tan 45°$.","options":["$1$","$\\frac{1}{\\sqrt{2}}$","$\\sqrt{3}$","$\\frac{1}{\\sqrt{3}}$"],"correctAnswer":"A","marks":2,"explanation":"$\\tan 45° = 1$."},{"id":4,"type":"mcq","question":"If $\\sin \\theta = \\frac{1}{2}$ and $0° < \\theta < 90°$, find $\\theta$.","options":["$30°$","$45°$","$60°$","$90°$"],"correctAnswer":"A","marks":3,"explanation":"$\\sin 30° = \\frac{1}{2}$, so $\\theta = 30°$."},{"id":5,"type":"multi_select","question":"Which of the following are true? (Select all that apply)","options":["$\\sin^2 \\theta + \\cos^2 \\theta = 1$","$\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}$","$\\sin 30° = \\frac{1}{2}$","$\\cos 60° = \\frac{\\sqrt{3}}{2}$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":4,"explanation":"$\\sin^2 \\theta + \\cos^2 \\theta = 1$ (Pythagorean identity) ✓. $\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}$ ✓. $\\sin 30° = \\frac{1}{2}$ ✓. $\\cos 60° = \\frac{1}{2}$ (not $\\frac{\\sqrt{3}}{2}$) ✗."},{"id":6,"type":"mcq","question":"Find the value of $\\sin 60°$.","options":["$\\frac{\\sqrt{3}}{2}$","$\\frac{1}{2}$","$1$","$\\frac{1}{\\sqrt{2}}$"],"correctAnswer":"A","marks":3,"explanation":"$\\sin 60° = \\frac{\\sqrt{3}}{2}$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Trigonometric Functions - Foundational'
  AND topic = 'G1'
  AND difficulty = 'foundational'
);

-- Trigonometric Functions - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Trigonometric Functions - Intermediate',
  'G1',
  20,
  'intermediate',
  30,
  '2025-12-18T23:59:59Z'::timestamptz,
  33,
  '[{"id":1,"type":"mcq","question":"Solve $\\sin x = \\frac{\\sqrt{3}}{2}$ for $0° \\leq x \\leq 360°$.","options":["$x = 60°$ or $x = 120°$","$x = 30°$ or $x = 150°$","$x = 45°$ or $x = 135°$","$x = 60°$ only"],"correctAnswer":"A","marks":5,"explanation":"$\\sin x = \\frac{\\sqrt{3}}{2}$ in the first quadrant gives $x = 60°$, and in the second quadrant gives $x = 180° - 60° = 120°$."},{"id":2,"type":"mcq","question":"Simplify $\\frac{\\sin 2\\theta}{\\cos \\theta}$ given that $\\sin 2\\theta = 2\\sin \\theta \\cos \\theta$.","options":["$2\\sin \\theta$","$\\sin \\theta$","$2\\cos \\theta$","$\\tan \\theta$"],"correctAnswer":"A","marks":4,"explanation":"$\\frac{\\sin 2\\theta}{\\cos \\theta} = \\frac{2\\sin \\theta \\cos \\theta}{\\cos \\theta} = 2\\sin \\theta$."},{"id":3,"type":"mcq","question":"If $\\cos \\theta = \\frac{3}{5}$ and $\\theta$ is acute, find $\\sin \\theta$.","options":["$\\frac{4}{5}$","$\\frac{3}{5}$","$\\frac{5}{4}$","$\\frac{2}{5}$"],"correctAnswer":"A","marks":5,"explanation":"Using $\\sin^2 \\theta + \\cos^2 \\theta = 1$: $\\sin^2 \\theta = 1 - \\left(\\frac{3}{5}\\right)^2 = 1 - \\frac{9}{25} = \\frac{16}{25}$. Since $\\theta$ is acute, $\\sin \\theta = \\frac{4}{5}$."},{"id":4,"type":"mcq","question":"Solve $2\\cos x = 1$ for $0° \\leq x \\leq 360°$.","options":["$x = 60°$ or $x = 300°$","$x = 30°$ or $x = 330°$","$x = 45°$ or $x = 315°$","$x = 60°$ or $x = 120°$"],"correctAnswer":"A","marks":5,"explanation":"$\\cos x = \\frac{1}{2}$. In the first quadrant: $x = 60°$. In the fourth quadrant: $x = 360° - 60° = 300°$."},{"id":5,"type":"multi_select","question":"Which of the following identities are correct? (Select all that apply)","options":["$\\sin 2\\theta = 2\\sin \\theta \\cos \\theta$","$\\cos 2\\theta = \\cos^2 \\theta - \\sin^2 \\theta$","$\\tan 2\\theta = \\frac{2\\tan \\theta}{1 - \\tan^2 \\theta}$","$\\sin^2 \\theta = 1 + \\cos^2 \\theta$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":5,"explanation":"$\\sin 2\\theta = 2\\sin \\theta \\cos \\theta$ ✓. $\\cos 2\\theta = \\cos^2 \\theta - \\sin^2 \\theta$ ✓. $\\tan 2\\theta = \\frac{2\\tan \\theta}{1 - \\tan^2 \\theta}$ ✓. $\\sin^2 \\theta + \\cos^2 \\theta = 1$ (not $\\sin^2 \\theta = 1 + \\cos^2 \\theta$) ✗."},{"id":6,"type":"mcq","question":"Express $\\cos 2A$ in terms of $\\cos A$ only.","options":["$2\\cos^2 A - 1$","$\\cos^2 A - \\sin^2 A$","$1 - 2\\sin^2 A$","$2\\cos A$"],"correctAnswer":"A","marks":4,"explanation":"Using $\\cos 2A = \\cos^2 A - \\sin^2 A$ and $\\sin^2 A = 1 - \\cos^2 A$: $\\cos 2A = \\cos^2 A - (1 - \\cos^2 A) = 2\\cos^2 A - 1$."},{"id":7,"type":"mcq","question":"Solve $\\tan x = \\sqrt{3}$ for $0° \\leq x \\leq 360°$.","options":["$x = 60°$ or $x = 240°$","$x = 30°$ or $x = 210°$","$x = 45°$ or $x = 225°$","$x = 60°$ or $x = 300°$"],"correctAnswer":"A","marks":5,"explanation":"$\\tan x = \\sqrt{3}$ gives $x = 60°$ (first quadrant) and $x = 180° + 60° = 240°$ (third quadrant, where tan is also positive)."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Trigonometric Functions - Intermediate'
  AND topic = 'G1'
  AND difficulty = 'intermediate'
);

-- Coordinate Geometry - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Coordinate Geometry - Exam Level',
  'G2',
  24,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  47,
  '[{"id":1,"type":"mcq","question":"The line passing through $(2, 1)$ is perpendicular to the line $3x - 2y = 5$. Find the equation of this line in the form $ax + by = c$.","options":["$2x + 3y = 7$","$3x + 2y = 8$","$2x - 3y = 1$","$3x - 2y = 4$"],"correctAnswer":"A","marks":6,"explanation":"Gradient of $3x - 2y = 5$ is $\\frac{3}{2}$. Perpendicular gradient: $-\\frac{2}{3}$. Using $y - 1 = -\\frac{2}{3}(x - 2)$: $3y - 3 = -2x + 4$, so $2x + 3y = 7$."},{"id":2,"type":"mcq","question":"The points $A(1, 2)$, $B(4, 6)$, and $C(7, k)$ are collinear. Find the value of $k$.","options":["$k = 10$","$k = 8$","$k = 12$","$k = 14$"],"correctAnswer":"A","marks":7,"explanation":"Gradient of $AB = \\frac{6-2}{4-1} = \\frac{4}{3}$. For collinearity, gradient of $AC$ must equal gradient of $AB$: $\\frac{k-2}{7-1} = \\frac{4}{3}$, so $\\frac{k-2}{6} = \\frac{4}{3}$, thus $3(k-2) = 24$ and $k = 10$."},{"id":3,"type":"mcq","question":"Find the equation of the circle with center $(2, -3)$ and radius $5$.","options":["$(x-2)^2 + (y+3)^2 = 25$","$(x+2)^2 + (y-3)^2 = 25$","$(x-2)^2 + (y+3)^2 = 5$","$x^2 + y^2 = 25$"],"correctAnswer":"A","marks":6,"explanation":"Circle equation: $(x-h)^2 + (y-k)^2 = r^2$ where center is $(h,k)$ and radius is $r$. So $(x-2)^2 + (y-(-3))^2 = 5^2$, giving $(x-2)^2 + (y+3)^2 = 25$."},{"id":4,"type":"multi_select","question":"The line $y = mx + c$ is tangent to the circle $x^2 + y^2 = 25$. Which of the following conditions must be satisfied? (Select all that apply)","options":["The distance from center to line equals the radius","$c^2 = 25(1+m^2)$","The line intersects the circle at exactly one point","$m^2 + c^2 = 25$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":6,"explanation":"For tangency: distance from center $(0,0)$ to line $mx - y + c = 0$ equals radius. Distance $= \\frac{|c|}{\\sqrt{m^2+1}} = 5$, so $c^2 = 25(m^2+1)$ ✓. Line intersects at exactly one point ✓. Option D is incorrect."},{"id":5,"type":"mcq","question":"A point $P$ moves such that it is always equidistant from the point $(3, 0)$ and the y-axis. Find the equation of the locus of $P$.","options":["$y^2 = 6x - 9$","$y^2 = 6x + 9$","$x^2 = 6y - 9$","$y^2 = 12x$"],"correctAnswer":"A","marks":7,"explanation":"Distance from $P(x,y)$ to $(3,0)$: $\\sqrt{(x-3)^2 + y^2}$. Distance from $P$ to y-axis: $|x|$. Setting equal: $(x-3)^2 + y^2 = x^2$. Expanding: $x^2 - 6x + 9 + y^2 = x^2$, thus $y^2 = 6x - 9$."},{"id":6,"type":"mcq","question":"Find the length of the perpendicular from the point $(5, 0)$ to the line $3x + 4y = 5$.","options":["$2$","$3$","$4$","$1$"],"correctAnswer":"A","marks":7,"explanation":"Distance $= \\frac{|3(5) + 4(0) - 5|}{\\sqrt{3^2 + 4^2}} = \\frac{|15 - 5|}{\\sqrt{25}} = \\frac{10}{5} = 2$."},{"id":7,"type":"mcq","question":"The line $y = mx$ divides the area enclosed by the lines $x = 0$, $y = 0$, $x + y = 1$ into two equal parts. Find the value of $m$.","options":["$m = \\sqrt{2} - 1$","$m = 1$","$m = \\frac{1}{2}$","$m = 2 - \\sqrt{2}$"],"correctAnswer":"A","marks":8,"explanation":"The triangle has vertices $(0,0)$, $(1,0)$, $(0,1)$ with area $\\frac{1}{2}$. The line $y=mx$ divides it into two parts of area $\\frac{1}{4}$ each. After calculation (finding intersection with $x+y=1$ and computing areas), $m = \\sqrt{2} - 1$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Coordinate Geometry - Exam Level'
  AND topic = 'G2'
  AND difficulty = 'exam_level'
);

-- Coordinate Geometry - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Coordinate Geometry - Foundational',
  'G2',
  22,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  18,
  '[{"id":1,"type":"mcq","question":"Find the distance between the points $(1, 2)$ and $(4, 6)$.","options":["$5$","$4$","$3$","$7$"],"correctAnswer":"A","marks":3,"explanation":"Distance $= \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$."},{"id":2,"type":"mcq","question":"Find the midpoint of the line segment joining $(2, 3)$ and $(6, 7)$.","options":["$(4, 5)$","$(3, 4)$","$(5, 6)$","$(8, 10)$"],"correctAnswer":"A","marks":3,"explanation":"Midpoint $= \\left(\\frac{2+6}{2}, \\frac{3+7}{2}\\right) = (4, 5)$."},{"id":3,"type":"mcq","question":"Find the gradient of the line passing through $(1, 2)$ and $(3, 8)$.","options":["$3$","$2$","$\\frac{1}{3}$","$6$"],"correctAnswer":"A","marks":3,"explanation":"Gradient $= \\frac{8-2}{3-1} = \\frac{6}{2} = 3$."},{"id":4,"type":"mcq","question":"What is the equation of a line with gradient $2$ passing through the origin?","options":["$y = 2x$","$y = x + 2$","$y = 2x + 1$","$2y = x$"],"correctAnswer":"A","marks":2,"explanation":"Line through origin with gradient $m$ has equation $y = mx$. So $y = 2x$."},{"id":5,"type":"multi_select","question":"Which of the following points lie on the line $y = 2x + 1$? (Select all that apply)","options":["$(0, 1)$","$(1, 3)$","$(2, 5)$","$(3, 6)$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":4,"explanation":"$(0,1)$: $1 = 2(0)+1$ ✓. $(1,3)$: $3 = 2(1)+1$ ✓. $(2,5)$: $5 = 2(2)+1$ ✓. $(3,6)$: $6 \\neq 2(3)+1 = 7$ ✗."},{"id":6,"type":"mcq","question":"Find the gradient of the line $3x + 4y = 12$.","options":["$-\\frac{3}{4}$","$\\frac{3}{4}$","$-\\frac{4}{3}$","$3$"],"correctAnswer":"A","marks":3,"explanation":"Rearrange to $y = mx + c$ form: $4y = -3x + 12$, so $y = -\\frac{3}{4}x + 3$. Gradient is $-\\frac{3}{4}$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Coordinate Geometry - Foundational'
  AND topic = 'G2'
  AND difficulty = 'foundational'
);

-- Coordinate Geometry - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Coordinate Geometry - Intermediate',
  'G2',
  23,
  'intermediate',
  30,
  '2025-12-18T23:59:59Z'::timestamptz,
  30,
  '[{"id":1,"type":"mcq","question":"Find the equation of the line passing through $(2, 3)$ with gradient $-2$.","options":["$y = -2x + 7$","$y = -2x + 3$","$y = -2x - 1$","$y = 2x - 1$"],"correctAnswer":"A","marks":5,"explanation":"Using $y - y_1 = m(x - x_1)$: $y - 3 = -2(x - 2)$, so $y - 3 = -2x + 4$, thus $y = -2x + 7$."},{"id":2,"type":"mcq","question":"Find the equation of the perpendicular bisector of the line segment joining $(1, 2)$ and $(5, 6)$.","options":["$y = -x + 7$","$y = x + 3$","$y = -x + 4$","$y = x + 7$"],"correctAnswer":"A","marks":6,"explanation":"Midpoint: $(3, 4)$. Gradient of line: $\\frac{6-2}{5-1} = 1$. Perpendicular gradient: $-1$. Equation: $y - 4 = -1(x - 3)$, so $y = -x + 7$."},{"id":3,"type":"mcq","question":"The line $y = mx + 3$ is parallel to the line $2x + 4y = 8$. Find the value of $m$.","options":["$m = -\\frac{1}{2}$","$m = \\frac{1}{2}$","$m = -2$","$m = 2$"],"correctAnswer":"A","marks":5,"explanation":"Rearrange $2x + 4y = 8$ to $y = -\\frac{1}{2}x + 2$. Gradient is $-\\frac{1}{2}$. Parallel lines have equal gradients, so $m = -\\frac{1}{2}$."},{"id":4,"type":"mcq","question":"Find the area of the triangle with vertices at $(0, 0)$, $(4, 0)$, and $(0, 3)$.","options":["$6$","$12$","$7$","$3$"],"correctAnswer":"A","marks":4,"explanation":"Area $= \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times 4 \\times 3 = 6$."},{"id":5,"type":"multi_select","question":"The point $P(3, k)$ is equidistant from $A(1, 2)$ and $B(5, 6)$. Which of the following are true? (Select all that apply)","options":["$k = 4$","$P$ lies on the perpendicular bisector of $AB$","The distance $PA = \\sqrt{(k-2)^2 + 4}$","$k = 2$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":5,"explanation":"$PA^2 = (3-1)^2 + (k-2)^2 = 4 + (k-2)^2$. $PB^2 = (3-5)^2 + (k-6)^2 = 4 + (k-6)^2$. Setting equal: $(k-2)^2 = (k-6)^2$, so $k-2 = \\pm(k-6)$. If $k-2 = k-6$: impossible. If $k-2 = -(k-6)$: $k-2 = -k+6$, so $2k = 8$ and $k = 4$ ✓. $PA = \\sqrt{4+(k-2)^2}$ ✓. $P$ on perpendicular bisector ✓."},{"id":6,"type":"mcq","question":"Find the equation of the line perpendicular to $y = 3x - 2$ passing through $(6, 5)$.","options":["$y = -\\frac{1}{3}x + 7$","$y = -\\frac{1}{3}x + 3$","$y = 3x - 13$","$y = -3x + 23$"],"correctAnswer":"A","marks":5,"explanation":"Perpendicular gradient: $-\\frac{1}{3}$. Using $y - y_1 = m(x - x_1)$: $y - 5 = -\\frac{1}{3}(x - 6)$, so $y = -\\frac{1}{3}x + 2 + 5 = -\\frac{1}{3}x + 7$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Coordinate Geometry - Intermediate'
  AND topic = 'G2'
  AND difficulty = 'intermediate'
);
