-- Batch 5 Quizzes
-- Generated: 2025-11-18T20:24:43.793Z

-- Differentiation and Integration - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Differentiation and Integration - Exam Level',
  'C1',
  30,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  49,
  '[{"id":1,"type":"mcq","question":"Find $\\frac{dy}{dx}$ if $y = \\frac{x^2 + 1}{x - 2}$ using the quotient rule.","options":["$\\frac{x^2 - 4x - 1}{(x - 2)^2}$","$\\frac{x^2 - 4x + 1}{(x - 2)^2}$","$\\frac{2x}{x - 2}$","$\\frac{x^2 + 4x - 1}{(x - 2)^2}$"],"correctAnswer":"A","marks":7,"explanation":"Using quotient rule $\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}$: Let $u = x^2 + 1$, $v = x - 2$. Then $\\frac{du}{dx} = 2x$, $\\frac{dv}{dx} = 1$. So $\\frac{dy}{dx} = \\frac{(x-2)(2x) - (x^2+1)(1)}{(x-2)^2} = \\frac{2x^2 - 4x - x^2 - 1}{(x-2)^2} = \\frac{x^2 - 4x - 1}{(x-2)^2}$."},{"id":2,"type":"mcq","question":"Find the coordinates of the turning points on the curve $y = x^3 - 6x^2 + 9x + 1$.","options":["$(1, 5)$ and $(3, 1)$","$(1, 4)$ and $(3, 1)$","$(0, 1)$ and $(2, 3)$","$(2, 3)$ and $(3, 1)$"],"correctAnswer":"A","marks":8,"explanation":"$\\frac{dy}{dx} = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3) = 0$. So $x = 1$ or $x = 3$. When $x = 1$: $y = 1 - 6 + 9 + 1 = 5$. When $x = 3$: $y = 27 - 54 + 27 + 1 = 1$. Turning points: $(1, 5)$ and $(3, 1)$."},{"id":3,"type":"mcq","question":"Find $\\int \\frac{3}{(2x - 1)^2} \\, dx$.","options":["$-\\frac{3}{2(2x - 1)} + c$","$\\frac{3}{2(2x - 1)} + c$","$-\\frac{3}{2x - 1} + c$","$\\frac{6}{2x - 1} + c$"],"correctAnswer":"A","marks":7,"explanation":"Rewrite as $\\int 3(2x - 1)^{-2} \\, dx$. Using substitution $u = 2x - 1$, $\\frac{du}{dx} = 2$, so $dx = \\frac{du}{2}$. Then $\\int 3u^{-2} \\cdot \\frac{du}{2} = \\frac{3}{2} \\int u^{-2} \\, du = \\frac{3}{2} \\cdot (-u^{-1}) + c = -\\frac{3}{2u} + c = -\\frac{3}{2(2x - 1)} + c$."},{"id":4,"type":"multi_select","question":"The curve $y = x^3 - 12x + 5$ has a stationary point at $x = 2$. Which of the following are true? (Select all that apply)","options":["At $x = 2$, $y = -11$","$x = 2$ is a local minimum","The curve also has a stationary point at $x = -2$","$\\frac{dy}{dx} = 3x^2 - 12$"],"correctAnswers":["A","B","C","D"],"partialCredit":true,"marks":6,"explanation":"$\\frac{dy}{dx} = 3x^2 - 12$ ✓. Setting $= 0$: $3x^2 = 12$, so $x = \\pm 2$ ✓. When $x = 2$: $y = 8 - 24 + 5 = -11$ ✓. $\\frac{d^2y}{dx^2} = 6x$. At $x = 2$: $\\frac{d^2y}{dx^2} = 12 > 0$, so local minimum ✓."},{"id":5,"type":"mcq","question":"Evaluate $\\int_0^2 (x^2 + 2x) \\, dx$.","options":["$\\frac{20}{3}$","$8$","$\\frac{16}{3}$","$6$"],"correctAnswer":"A","marks":6,"explanation":"$\\int (x^2 + 2x) \\, dx = \\frac{x^3}{3} + x^2 + c$. Evaluating: $\\left[\\frac{x^3}{3} + x^2\\right]_0^2 = \\left(\\frac{8}{3} + 4\\right) - 0 = \\frac{8}{3} + \\frac{12}{3} = \\frac{20}{3}$."},{"id":6,"type":"mcq","question":"The gradient of the curve $y = ax^2 + bx$ at the point $(1, 7)$ is $9$. Find the values of $a$ and $b$.","options":["$a = 2$, $b = 5$","$a = 3$, $b = 4$","$a = 1$, $b = 6$","$a = 4$, $b = 3$"],"correctAnswer":"A","marks":8,"explanation":"Point $(1, 7)$ lies on curve: $a(1)^2 + b(1) = 7$, so $a + b = 7$ ... (1). $\\frac{dy}{dx} = 2ax + b$. At $x = 1$, gradient $= 9$: $2a(1) + b = 9$, so $2a + b = 9$ ... (2). Subtracting (1) from (2): $(2a + b) - (a + b) = 9 - 7$, giving $a = 2$. From (1): $2 + b = 7$, so $b = 5$."},{"id":7,"type":"mcq","question":"Find the area bounded by the curve $y = 4 - x^2$, the x-axis, and the lines $x = 0$ and $x = 2$.","options":["$\\frac{16}{3}$","$8$","$\\frac{20}{3}$","$4$"],"correctAnswer":"A","marks":7,"explanation":"Area $= \\int_0^2 (4 - x^2) \\, dx = \\left[4x - \\frac{x^3}{3}\\right]_0^2 = \\left(8 - \\frac{8}{3}\\right) - 0 = \\frac{24 - 8}{3} = \\frac{16}{3}$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Differentiation and Integration - Exam Level'
  AND topic = 'C1'
  AND difficulty = 'exam_level'
);

-- Differentiation and Integration - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Differentiation and Integration - Foundational',
  'C1',
  28,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  18,
  '[{"id":1,"type":"mcq","question":"Find the derivative of $y = x^3$.","options":["$3x^2$","$x^2$","$3x$","$x^3$"],"correctAnswer":"A","marks":2,"explanation":"Using the power rule: $\\frac{d}{dx}(x^n) = nx^{n-1}$. So $\\frac{dy}{dx} = 3x^{3-1} = 3x^2$."},{"id":2,"type":"mcq","question":"Find $\\frac{dy}{dx}$ if $y = 5x^2 + 3x - 1$.","options":["$10x + 3$","$5x + 3$","$10x^2 + 3x$","$10x - 1$"],"correctAnswer":"A","marks":3,"explanation":"Differentiate term by term: $\\frac{dy}{dx} = \\frac{d}{dx}(5x^2) + \\frac{d}{dx}(3x) - \\frac{d}{dx}(1) = 10x + 3 - 0 = 10x + 3$."},{"id":3,"type":"mcq","question":"Find $\\int 6x^2 \\, dx$.","options":["$2x^3 + c$","$6x^3 + c$","$3x^3 + c$","$x^3 + c$"],"correctAnswer":"A","marks":3,"explanation":"Using $\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + c$: $\\int 6x^2 \\, dx = 6 \\cdot \\frac{x^3}{3} + c = 2x^3 + c$."},{"id":4,"type":"mcq","question":"If $y = x^4 - 2x^2 + 5$, find $\\frac{dy}{dx}$ when $x = 1$.","options":["$0$","$4$","$2$","$-4$"],"correctAnswer":"A","marks":4,"explanation":"$\\frac{dy}{dx} = 4x^3 - 4x$. When $x = 1$: $\\frac{dy}{dx} = 4(1)^3 - 4(1) = 4 - 4 = 0$."},{"id":5,"type":"multi_select","question":"Which of the following are correct? (Select all that apply)","options":["$\\frac{d}{dx}(x^2) = 2x$","$\\int 3 \\, dx = 3x + c$","$\\frac{d}{dx}(5) = 0$","$\\int x \\, dx = x^2 + c$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":3,"explanation":"$\\frac{d}{dx}(x^2) = 2x$ ✓. $\\int 3 \\, dx = 3x + c$ ✓. $\\frac{d}{dx}(5) = 0$ (derivative of constant is zero) ✓. $\\int x \\, dx = \\frac{x^2}{2} + c$ (not $x^2 + c$) ✗."},{"id":6,"type":"mcq","question":"Find $\\int (4x^3 - 2x) \\, dx$.","options":["$x^4 - x^2 + c$","$4x^4 - 2x^2 + c$","$x^4 - 2x^2 + c$","$12x^2 - 2 + c$"],"correctAnswer":"A","marks":3,"explanation":"$\\int (4x^3 - 2x) \\, dx = \\frac{4x^4}{4} - \\frac{2x^2}{2} + c = x^4 - x^2 + c$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Differentiation and Integration - Foundational'
  AND topic = 'C1'
  AND difficulty = 'foundational'
);

-- Differentiation and Integration - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Differentiation and Integration - Intermediate',
  'C1',
  29,
  'intermediate',
  30,
  '2025-12-18T23:59:59Z'::timestamptz,
  34,
  '[{"id":1,"type":"mcq","question":"Find the derivative of $y = (2x + 1)^4$ using the chain rule.","options":["$8(2x + 1)^3$","$4(2x + 1)^3$","$2(2x + 1)^3$","$8(2x + 1)^4$"],"correctAnswer":"A","marks":5,"explanation":"Let $u = 2x + 1$. Then $y = u^4$ and $\\frac{du}{dx} = 2$. Using chain rule: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} = 4u^3 \\cdot 2 = 8(2x + 1)^3$."},{"id":2,"type":"mcq","question":"Find $\\frac{dy}{dx}$ if $y = \\frac{1}{x^2}$.","options":["$-\\frac{2}{x^3}$","$\\frac{2}{x^3}$","$-\\frac{1}{x^3}$","$\\frac{1}{2x}$"],"correctAnswer":"A","marks":4,"explanation":"Rewrite as $y = x^{-2}$. Then $\\frac{dy}{dx} = -2x^{-3} = -\\frac{2}{x^3}$."},{"id":3,"type":"mcq","question":"Find the equation of the tangent to the curve $y = x^2 - 4x + 3$ at the point where $x = 2$.","options":["$y = -1$","$y = x - 3$","$y = 0$","$y = 2x - 5$"],"correctAnswer":"A","marks":6,"explanation":"When $x = 2$: $y = 4 - 8 + 3 = -1$. $\\frac{dy}{dx} = 2x - 4$. At $x = 2$: gradient $= 0$. Tangent equation: $y - (-1) = 0(x - 2)$, so $y = -1$ (horizontal line)."},{"id":4,"type":"mcq","question":"Evaluate $\\int_1^3 (2x + 1) \\, dx$.","options":["$10$","$8$","$12$","$6$"],"correctAnswer":"A","marks":5,"explanation":"$\\int (2x + 1) \\, dx = x^2 + x + c$. Evaluating from $1$ to $3$: $[x^2 + x]_1^3 = (9 + 3) - (1 + 1) = 12 - 2 = 10$."},{"id":5,"type":"multi_select","question":"The curve $y = x^3 - 3x^2 + 2$ has stationary points where $\\frac{dy}{dx} = 0$. Which values of $x$ give stationary points? (Select all that apply)","options":["$x = 0$","$x = 2$","$x = 1$","$x = 3$"],"correctAnswers":["A","B"],"partialCredit":true,"marks":6,"explanation":"$\\frac{dy}{dx} = 3x^2 - 6x = 3x(x - 2) = 0$. So $x = 0$ or $x = 2$. These are the stationary points."},{"id":6,"type":"mcq","question":"Find $\\int (6x^2 - 4x + 2) \\, dx$.","options":["$2x^3 - 2x^2 + 2x + c$","$6x^3 - 4x^2 + 2x + c$","$2x^3 - 4x^2 + 2x + c$","$3x^3 - 2x^2 + 2x + c$"],"correctAnswer":"A","marks":4,"explanation":"$\\int (6x^2 - 4x + 2) \\, dx = \\frac{6x^3}{3} - \\frac{4x^2}{2} + 2x + c = 2x^3 - 2x^2 + 2x + c$."},{"id":7,"type":"mcq","question":"Find the derivative of $y = \\sqrt{x}$.","options":["$\\frac{1}{2\\sqrt{x}}$","$\\frac{1}{\\sqrt{x}}$","$2\\sqrt{x}$","$\\sqrt{x}$"],"correctAnswer":"A","marks":4,"explanation":"Rewrite as $y = x^{1/2}$. Then $\\frac{dy}{dx} = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Differentiation and Integration - Intermediate'
  AND topic = 'C1'
  AND difficulty = 'intermediate'
);

-- Proofs in Plane Geometry - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Proofs in Plane Geometry - Exam Level',
  'G3',
  27,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  47,
  '[{"id":1,"type":"mcq","question":"In triangle $ABC$, $D$ and $E$ are points on $AB$ and $AC$ respectively such that $DE \\parallel BC$. If $AD = 4$, $DB = 6$, and $AE = 6$, find $EC$.","options":["$9$","$8$","$10$","$12$"],"correctAnswer":"A","marks":7,"explanation":"By the basic proportionality theorem (Thales'' theorem), if $DE \\parallel BC$, then $\\frac{AD}{DB} = \\frac{AE}{EC}$. So $\\frac{4}{6} = \\frac{6}{EC}$, giving $4 \\times EC = 36$, thus $EC = 9$."},{"id":2,"type":"mcq","question":"Two circles with centers $O_1$ and $O_2$ intersect at points $A$ and $B$. If $O_1A = 5$, $O_2A = 7$, and $O_1O_2 = 8$, what type of triangle is $O_1AO_2$?","options":["Scalene","Isosceles","Equilateral","Right-angled"],"correctAnswer":"A","marks":6,"explanation":"The triangle $O_1AO_2$ has sides $5$, $7$, and $8$. Since all three sides are different, it is a scalene triangle. Check: $5^2 + 7^2 = 25 + 49 = 74 \\neq 64 = 8^2$, so not right-angled."},{"id":3,"type":"mcq","question":"A tangent from an external point $P$ touches a circle at $T$. If $PT = 12$ and the radius of the circle is $5$, find the distance from $P$ to the center $O$.","options":["$13$","$12$","$17$","$7$"],"correctAnswer":"A","marks":7,"explanation":"The radius $OT$ is perpendicular to the tangent $PT$ at the point of contact. So triangle $OTP$ is right-angled at $T$. Using Pythagoras: $PO^2 = PT^2 + OT^2 = 12^2 + 5^2 = 144 + 25 = 169$, so $PO = 13$."},{"id":4,"type":"multi_select","question":"In the diagram, $AB$ is a diameter of the circle, and $C$ is a point on the circumference. $D$ is a point on $AC$ such that $BD \\perp AC$. Which of the following are true? (Select all that apply)","options":["$\\angle ACB = 90°$ (angle in semicircle)","$BD$ is the altitude from $B$ in triangle $ABC$","Triangles $ABD$ and $CBD$ are similar","$AB^2 = AC^2 + BC^2$"],"correctAnswers":["A","B","D"],"partialCredit":true,"marks":6,"explanation":"Since $AB$ is a diameter, $\\angle ACB = 90°$ ✓. $BD \\perp AC$ makes $BD$ an altitude ✓. In right triangle $ABC$, $AB^2 = AC^2 + BC^2$ by Pythagoras ✓. Triangles $ABD$ and $CBD$ are not necessarily similar ✗."},{"id":5,"type":"mcq","question":"Prove that the line joining the midpoints of two sides of a triangle is parallel to the third side and half its length. In triangle $ABC$ with midpoints $D$ on $AB$ and $E$ on $AC$, if $BC = 10$, find $DE$.","options":["$5$","$10$","$7.5$","$2.5$"],"correctAnswer":"A","marks":6,"explanation":"By the midpoint theorem, the line segment joining the midpoints of two sides of a triangle is parallel to the third side and equal to half its length. So $DE = \\frac{1}{2} BC = \\frac{1}{2} \\times 10 = 5$."},{"id":6,"type":"mcq","question":"In a circle, two chords $AB$ and $CD$ are equidistant from the center. If $AB = 16$ cm, find the length of $CD$.","options":["$16$ cm","$8$ cm","$12$ cm","$32$ cm"],"correctAnswer":"A","marks":7,"explanation":"A circle theorem states that chords equidistant from the center are equal in length. Since $AB$ and $CD$ are equidistant from the center, $CD = AB = 16$ cm."},{"id":7,"type":"mcq","question":"Two circles with radii $3$ and $5$ have centers $10$ units apart. How many common tangents do they have?","options":["$4$ (two external, two internal)","$3$ (two external, one internal)","$2$ (both external)","$1$ (one external)"],"correctAnswer":"A","marks":8,"explanation":"Distance between centers $= 10$. Sum of radii $= 3 + 5 = 8$. Difference of radii $= 5 - 3 = 2$. Since distance $(10) >$ sum of radii $(8)$, the circles are completely separate and do not intersect. For two separate non-intersecting circles, there are always 4 common tangents: 2 external (transverse) common tangents and 2 internal (direct) common tangents."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Proofs in Plane Geometry - Exam Level'
  AND topic = 'G3'
  AND difficulty = 'exam_level'
);

-- Proofs in Plane Geometry - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Proofs in Plane Geometry - Foundational',
  'G3',
  25,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  17,
  '[{"id":1,"type":"mcq","question":"In a triangle $ABC$, if $AB = AC$, what can we conclude about the angles?","options":["$\\angle B = \\angle C$","$\\angle A = \\angle B$","$\\angle A = \\angle C$","All angles are equal"],"correctAnswer":"A","marks":3,"explanation":"In an isosceles triangle, the base angles (opposite to the equal sides) are equal. Since $AB = AC$, angles $B$ and $C$ are the base angles, so $\\angle B = \\angle C$."},{"id":2,"type":"mcq","question":"If two angles of a triangle are $50°$ and $60°$, what is the third angle?","options":["$70°$","$80°$","$90°$","$100°$"],"correctAnswer":"A","marks":2,"explanation":"The sum of angles in a triangle is $180°$. Third angle $= 180° - 50° - 60° = 70°$."},{"id":3,"type":"mcq","question":"In a parallelogram $ABCD$, if $\\angle A = 70°$, find $\\angle C$.","options":["$70°$","$110°$","$90°$","$140°$"],"correctAnswer":"A","marks":3,"explanation":"In a parallelogram, opposite angles are equal. Since $A$ and $C$ are opposite angles, $\\angle C = \\angle A = 70°$."},{"id":4,"type":"mcq","question":"If a quadrilateral has all four sides equal, it must be a:","options":["Rhombus","Square","Rectangle","Trapezium"],"correctAnswer":"A","marks":2,"explanation":"A quadrilateral with all four sides equal is a rhombus. A square has equal sides AND equal angles (all $90°$), which is not necessarily the case here."},{"id":5,"type":"multi_select","question":"Which of the following properties are true for a rectangle? (Select all that apply)","options":["Opposite sides are equal","All angles are $90°$","Diagonals are equal","All sides are equal"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":4,"explanation":"In a rectangle: opposite sides are equal ✓, all angles are $90°$ ✓, diagonals are equal ✓. However, not all sides are equal (that would be a square) ✗."},{"id":6,"type":"mcq","question":"The angle in a semicircle is:","options":["$90°$","$180°$","$45°$","$60°$"],"correctAnswer":"A","marks":3,"explanation":"By the circle theorem, any angle inscribed in a semicircle (with the diameter as the base) is always a right angle ($90°$)."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Proofs in Plane Geometry - Foundational'
  AND topic = 'G3'
  AND difficulty = 'foundational'
);

-- Proofs in Plane Geometry - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Proofs in Plane Geometry - Intermediate',
  'G3',
  26,
  'intermediate',
  30,
  '2025-12-18T23:59:59Z'::timestamptz,
  31,
  '[{"id":1,"type":"mcq","question":"In triangle $ABC$, $D$ is the midpoint of $BC$. If $AB = AC$, prove that $AD \\perp BC$. Which property is most directly used?","options":["In an isosceles triangle, the median from the vertex angle is perpendicular to the base","Pythagorean theorem","Angle sum of triangle","SAS congruence"],"correctAnswer":"A","marks":5,"explanation":"Since $AB = AC$ (isosceles) and $D$ is the midpoint of $BC$, $AD$ is the median from the vertex angle. A key property of isosceles triangles is that the median from the vertex angle is also the perpendicular bisector of the base."},{"id":2,"type":"mcq","question":"Triangles $ABC$ and $DEF$ have $AB = DE$, $BC = EF$, and $\\angle B = \\angle E$. By which congruence criterion are they congruent?","options":["SAS (Side-Angle-Side)","ASA (Angle-Side-Angle)","SSS (Side-Side-Side)","RHS (Right angle-Hypotenuse-Side)"],"correctAnswer":"A","marks":4,"explanation":"We have two sides and the included angle equal: $AB = DE$ (side), $\\angle B = \\angle E$ (angle), $BC = EF$ (side). This is the SAS criterion."},{"id":3,"type":"mcq","question":"In a circle with center $O$, chord $AB$ subtends an angle of $60°$ at the center. What angle does it subtend at a point $C$ on the major arc?","options":["$30°$","$60°$","$120°$","$90°$"],"correctAnswer":"A","marks":6,"explanation":"By the circle theorem, the angle subtended by a chord at the center is twice the angle subtended at any point on the circumference (in the major arc). So $\\angle ACB = \\frac{1}{2} \\times 60° = 30°$."},{"id":4,"type":"mcq","question":"Two chords $AB$ and $CD$ of a circle intersect at point $P$ inside the circle. If $AP = 4$, $PB = 6$, and $CP = 3$, find $PD$.","options":["$8$","$6$","$10$","$12$"],"correctAnswer":"A","marks":6,"explanation":"By the intersecting chords theorem: $AP \\times PB = CP \\times PD$. So $4 \\times 6 = 3 \\times PD$, giving $24 = 3 \\times PD$, thus $PD = 8$."},{"id":5,"type":"multi_select","question":"Triangles $ABC$ and $PQR$ are similar with ratio $AB:PQ = 2:3$. Which of the following are true? (Select all that apply)","options":["$\\angle A = \\angle P$","Area of $ABC$ : Area of $PQR = 4:9$","$BC:QR = 2:3$","Perimeter of $ABC$ : Perimeter of $PQR = 2:3$"],"correctAnswers":["A","B","C","D"],"partialCredit":true,"marks":5,"explanation":"In similar triangles: corresponding angles are equal ✓, corresponding sides are in the same ratio ($2:3$) ✓, perimeters are in the same ratio ($2:3$) ✓, areas are in the ratio of the square of the sides ($4:9$) ✓."},{"id":6,"type":"mcq","question":"In a cyclic quadrilateral $ABCD$, if $\\angle A = 80°$, find $\\angle C$.","options":["$100°$","$80°$","$90°$","$110°$"],"correctAnswer":"A","marks":5,"explanation":"In a cyclic quadrilateral, opposite angles are supplementary (sum to $180°$). So $\\angle A + \\angle C = 180°$, giving $\\angle C = 180° - 80° = 100°$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Proofs in Plane Geometry - Intermediate'
  AND topic = 'G3'
  AND difficulty = 'intermediate'
);
