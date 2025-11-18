-- Batch 1 Quizzes
-- Generated: 2025-11-18T19:29:01.122Z

-- Quadratic Functions - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Quadratic Functions - Exam Level',
  'A1',
  3,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  46,
  '[{"id":1,"type":"mcq","question":"The quadratic function $f(x) = 2x^2 + 8x + 3$ can be expressed in the form $f(x) = 2(x+p)^2 + q$. The graph of $y = f(x)$ is translated 3 units to the right and 2 units up to give the graph of $y = g(x)$. Express $g(x)$ in the form $a(x-h)^2 + k$.","options":["$g(x) = 2(x-1)^2 - 3$","$g(x) = 2(x+1)^2 - 3$","$g(x) = 2(x-1)^2 + 7$","$g(x) = 2(x+5)^2 - 3$"],"correctAnswer":"A","marks":6,"explanation":"First, $f(x) = 2(x^2+4x) + 3 = 2(x+2)^2 - 8 + 3 = 2(x+2)^2 - 5$. After translation: $g(x) = 2(x-3+2)^2 + (-5+2) = 2(x-1)^2 - 3$."},{"id":2,"type":"mcq","question":"Find the range of values of $m$ such that the equation $x^2 - 2mx + (m^2 - 5) = 0$ has no real roots.","options":["No such values of $m$ exist","$m < -\\sqrt{5}$ or $m > \\sqrt{5}$","$-\\sqrt{5} < m < \\sqrt{5}$","$m = 0$"],"correctAnswer":"A","marks":6,"explanation":"Discriminant: $\\Delta = 4m^2 - 4(m^2-5) = 4m^2 - 4m^2 + 20 = 20 > 0$ for all $m$. Thus, the equation always has real roots."},{"id":3,"type":"mcq","question":"The equation $kx^2 + (k+3)x + 1 = 0$ has two distinct real roots. Find the range of values of $k$.","options":["$k < -1$ or $k > 9$","$-1 < k < 9$, $k \\neq 0$","$k < -1$ or $0 < k < 9$","$k > 9$"],"correctAnswer":"B","marks":7,"explanation":"For two distinct real roots: $\\Delta > 0$ and $k \\neq 0$. $(k+3)^2 - 4k > 0$ gives $k^2 + 6k + 9 - 4k > 0$, thus $k^2 + 2k + 9 > 0$. Also $(k+1)(k-9) < 0$, giving $-1 < k < 9$, with $k \\neq 0$."},{"id":4,"type":"multi_select","question":"The curve $y = ax^2 + bx + c$ passes through the points $(0, -3)$, $(2, 5)$ and has its axis of symmetry at $x = 1$. Which of the following are true? (Select all that apply)","options":["$c = -3$","$a = 2$","$b = -4$","The vertex is at $(1, -7)$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":6,"explanation":"From $(0,-3)$: $c=-3$. Axis at $x=1$: $-\\frac{b}{2a}=1$, so $b=-2a$. From $(2,5)$: $4a+2b-3=5$, thus $4a-4a=8$, giving $a=2$, $b=-4$. Vertex: $y=2(1)^2-4(1)-3=-5$."},{"id":5,"type":"mcq","question":"The function $f(x) = -2x^2 + 12x + k$ has a maximum value of 25. Find the value of $k$.","options":["$7$","$-7$","$18$","$25$"],"correctAnswer":"A","marks":6,"explanation":"Complete the square: $f(x) = -2(x^2-6x) + k = -2[(x-3)^2-9] + k = -2(x-3)^2 + 18 + k$. Maximum value: $18 + k = 25$, thus $k = 7$."},{"id":6,"type":"mcq","question":"A quadratic function $f(x) = ax^2 + bx + c$ satisfies $f(1) = 0$, $f(3) = 0$, and $f(0) = -6$. Find the value of $a + b + c$.","options":["$0$","$-6$","$2$","$6$"],"correctAnswer":"A","marks":7,"explanation":"Since $f(1)=0$ and $f(3)=0$: $f(x)=a(x-1)(x-3)$. From $f(0)=-6$: $a(3)=-6$, so $a=2$. Thus $f(x)=2(x-1)(x-3)=2x^2-8x+6$, giving $a+b+c=2-8+6=0$. Also, $a+b+c=f(1)=0$."},{"id":7,"type":"mcq","question":"The quadratic curve $y = x^2 - 6x + p$ and the straight line $y = qx - 5$ intersect at exactly one point. Express $p$ in terms of $q$.","options":["$p = \\frac{q^2}{4} + 3q + 4$","$p = q^2 - 6q - 5$","$p = \\frac{q^2}{4} - 3q + 4$","$p = -q^2 + 6q + 5$"],"correctAnswer":"A","marks":8,"explanation":"For one intersection: $x^2-6x+p=qx-5$, giving $x^2-(6+q)x+(p+5)=0$. Discriminant $=0$: $(6+q)^2-4(p+5)=0$. Expanding: $36+12q+q^2-4p-20=0$, thus $4p=q^2+12q+16$, so $p=\\frac{q^2}{4}+3q+4$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Quadratic Functions - Exam Level'
  AND topic = 'A1'
  AND difficulty = 'exam_level'
);

-- Quadratic Functions - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Quadratic Functions - Foundational',
  'A1',
  1,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  17,
  '[{"id":1,"type":"mcq","question":"What is the vertex form of a quadratic function?","options":["$y = a(x-h)^2 + k$","$y = ax^2 + bx + c$","$y = a(x+h)^2 - k$","$y = (x-h)(x-k)$"],"correctAnswer":"A","marks":2,"explanation":"The vertex form is $y = a(x-h)^2 + k$ where $(h,k)$ is the vertex of the parabola."},{"id":2,"type":"mcq","question":"Find the axis of symmetry for the quadratic function $f(x) = x^2 + 6x + 5$.","options":["$x = -3$","$x = 3$","$x = -6$","$x = 5$"],"correctAnswer":"A","marks":3,"explanation":"The axis of symmetry is $x = -\\frac{b}{2a} = -\\frac{6}{2(1)} = -3$."},{"id":3,"type":"mcq","question":"Which of the following represents the minimum value of $f(x) = (x-2)^2 + 3$?","options":["$3$","$2$","$-3$","$-2$"],"correctAnswer":"A","marks":2,"explanation":"In vertex form $f(x) = a(x-h)^2 + k$, the minimum value is $k = 3$ when $a > 0$."},{"id":4,"type":"mcq","question":"Express $f(x) = x^2 + 4x + 7$ in the form $a(x+b)^2 + c$. What is the value of $c$?","options":["$3$","$7$","$4$","$11$"],"correctAnswer":"A","marks":3,"explanation":"Completing the square: $f(x) = (x+2)^2 - 4 + 7 = (x+2)^2 + 3$, so $c = 3$."},{"id":5,"type":"multi_select","question":"Which of the following statements are true about the quadratic function $f(x) = -2(x-1)^2 + 8$? (Select all that apply)","options":["The vertex is at $(1, 8)$","The parabola opens downward","The maximum value is $8$","The axis of symmetry is $x = -1$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":4,"explanation":"From $f(x) = -2(x-1)^2 + 8$: vertex is $(1,8)$, coefficient $a=-2<0$ means opens downward, maximum value is $8$, and axis of symmetry is $x=1$."},{"id":6,"type":"mcq","question":"For the quadratic function $f(x) = x^2 - 8x + 12$, what are the x-intercepts?","options":["$x = 2$ and $x = 6$","$x = -2$ and $x = -6$","$x = 3$ and $x = 4$","$x = -3$ and $x = -4$"],"correctAnswer":"A","marks":3,"explanation":"Factoring: $f(x) = (x-2)(x-6)$, so x-intercepts are $x = 2$ and $x = 6$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Quadratic Functions - Foundational'
  AND topic = 'A1'
  AND difficulty = 'foundational'
);

-- Quadratic Functions - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Quadratic Functions - Intermediate',
  'A1',
  2,
  'intermediate',
  30,
  '2025-12-18T23:59:59Z'::timestamptz,
  31,
  '[{"id":1,"type":"mcq","question":"The quadratic function $f(x) = 2x^2 + px + 8$ has its minimum value at $x = 3$. Find the value of $p$.","options":["$-12$","$12$","$-6$","$6$"],"correctAnswer":"A","marks":4,"explanation":"For minimum at $x = 3$: $-\\frac{p}{2(2)} = 3$, thus $-\\frac{p}{4} = 3$, giving $p = -12$."},{"id":2,"type":"mcq","question":"Express $3x^2 - 12x + 5$ in the form $a(x-h)^2 + k$. Find the value of $k$.","options":["$-7$","$5$","$-12$","$17$"],"correctAnswer":"A","marks":4,"explanation":"Completing the square: $3(x^2 - 4x) + 5 = 3[(x-2)^2 - 4] + 5 = 3(x-2)^2 - 12 + 5 = 3(x-2)^2 - 7$."},{"id":3,"type":"mcq","question":"The graph of $y = x^2 + 4x + c$ touches the x-axis at exactly one point. Find the value of $c$.","options":["$4$","$-4$","$2$","$-2$"],"correctAnswer":"A","marks":4,"explanation":"For the graph to touch the x-axis, discriminant $= 0$: $b^2 - 4ac = 16 - 4(1)(c) = 0$, thus $c = 4$."},{"id":4,"type":"multi_select","question":"The quadratic function $f(x) = -x^2 + 6x - 5$ can be written as $f(x) = -(x-3)^2 + 4$. Which statements are correct? (Select all that apply)","options":["The range of $f$ is $f(x) \\leq 4$","The graph cuts the x-axis at two points","The line $x = 3$ is the axis of symmetry","The y-intercept is at $(0, 4)$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":4,"explanation":"Maximum value is $4$ (so range is $f(x) \\leq 4$), discriminant $36-20=16>0$ (two x-intercepts), axis of symmetry is $x=3$, and y-intercept is at $(0,-5)$."},{"id":5,"type":"mcq","question":"Find the range of values of $k$ for which the equation $x^2 + 2x + k = 0$ has two distinct real roots.","options":["$k < 1$","$k > 1$","$k < -1$","$k > -1$"],"correctAnswer":"A","marks":5,"explanation":"For two distinct real roots: $\\Delta > 0$. Thus $4 - 4k > 0$, giving $k < 1$."},{"id":6,"type":"mcq","question":"The quadratic function $f(x) = ax^2 + bx + c$ has a maximum value of $5$ when $x = -2$, and $f(0) = 1$. Find the value of $a$.","options":["$-1$","$1$","$-2$","$2$"],"correctAnswer":"A","marks":5,"explanation":"From vertex form: $f(x) = a(x+2)^2 + 5$. Using $f(0) = 1$: $a(4) + 5 = 1$, thus $4a = -4$, giving $a = -1$."},{"id":7,"type":"mcq","question":"The line $y = 2x + c$ is a tangent to the curve $y = x^2 - 4x + 7$. Find the value of $c$.","options":["$2$","$-2$","$7$","$3$"],"correctAnswer":"A","marks":5,"explanation":"For tangency: $x^2 - 4x + 7 = 2x + c$ gives $x^2 - 6x + (7-c) = 0$. Discriminant $= 0$: $36 - 4(7-c) = 0$, thus $c = 2$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Quadratic Functions - Intermediate'
  AND topic = 'A1'
  AND difficulty = 'intermediate'
);

-- Equations and Inequalities - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Equations and Inequalities - Exam Level',
  'A2',
  6,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  46,
  '[{"id":1,"type":"mcq","question":"Solve the equation $\\sqrt{x+12} = x$.","options":["$x = 4$","$x = -3$","$x = 4$ or $x = -3$","No real solutions"],"correctAnswer":"A","marks":6,"explanation":"Square both sides: $x+12=x^2$, giving $x^2-x-12=0$. Factoring: $(x-4)(x+3)=0$, so $x=4$ or $x=-3$. Check both: $x=4$ gives $\\sqrt{16}=4$ (true); $x=-3$ gives $\\sqrt{9}=-3$ (false, as square root must be non-negative). Therefore, $x=4$ only."},{"id":2,"type":"mcq","question":"Find the range of values of $k$ for which the inequality $kx^2 + 2x + k > 0$ is true for all real values of $x$.","options":["$k > 1$","$k \\geq 1$","$k > 0$","$k < -1$"],"correctAnswer":"A","marks":7,"explanation":"For the inequality to be true for all $x$: (1) $k > 0$ (parabola opens upward), and (2) discriminant $< 0$ (no real roots). So $4 - 4k^2 < 0$, giving $k^2 > 1$. Combined with $k > 0$: $k > 1$."},{"id":3,"type":"mcq","question":"Solve the inequality $\\frac{x-4}{x+1} \\leq 0$.","options":["$-1 < x \\leq 4$","$x \\leq -1$ or $x \\geq 4$","$x \\leq 4$","$x < -4$ or $x > 1$"],"correctAnswer":"A","marks":7,"explanation":"The fraction is negative or zero when numerator and denominator have opposite signs (or numerator is zero). Critical points: $x = 4$ (numerator zero), $x = -1$ (denominator zero, excluded). Testing: solution is $-1 < x \\leq 4$."},{"id":4,"type":"multi_select","question":"The equation $px^2 + (p+1)x + p = 0$ has two distinct real roots. Which of the following must be true? (Select all that apply)","options":["$-\\frac{1}{3} < p < 1$","$p \\neq 0$","The product of the roots is 1 when $p \\neq 0$","$p$ must be negative"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":6,"explanation":"For two distinct real roots: $p \\neq 0$ and $(p+1)^2 - 4p^2 > 0$. Expanding: $p^2 + 2p + 1 - 4p^2 > 0$, giving $-3p^2 + 2p + 1 > 0$ or $3p^2 - 2p - 1 < 0$. Factoring: $(3p+1)(p-1) < 0$, thus $-\\frac{1}{3} < p < 1$ with $p \\neq 0$. Product of roots $= \\frac{p}{p} = 1$ when $p \\neq 0$."},{"id":5,"type":"mcq","question":"Solve simultaneously: $x^2 + y^2 = 25$ and $y = x + 1$.","options":["$x = 3, y = 4$ or $x = -4, y = -3$","$x = 4, y = 3$ or $x = -3, y = -4$","$x = 5, y = 0$ or $x = 0, y = 5$","$x = 3, y = 4$ only"],"correctAnswer":"A","marks":6,"explanation":"Substitute $y = x+1$ into first equation: $x^2 + (x+1)^2 = 25$. Expanding: $x^2 + x^2 + 2x + 1 = 25$, giving $2x^2 + 2x - 24 = 0$ or $x^2 + x - 12 = 0$. Factoring: $(x+4)(x-3) = 0$, so $x = 3$ or $x = -4$. When $x = 3$: $y = 4$. When $x = -4$: $y = -3$."},{"id":6,"type":"mcq","question":"The quadratic equation $x^2 - 2px + (p^2 - q) = 0$ has equal roots. Express $q$ in terms of $p$.","options":["$q = 0$","$q = p^2$","$q = -p^2$","$q = 2p$"],"correctAnswer":"A","marks":7,"explanation":"For equal roots, discriminant $= 0$: $(-2p)^2 - 4(1)(p^2-q) = 0$. Simplifying: $4p^2 - 4p^2 + 4q = 0$, thus $4q = 0$, giving $q = 0$."},{"id":7,"type":"mcq","question":"Solve the equation $4^x - 6(2^x) + 8 = 0$.","options":["$x = 1$ or $x = 2$","$x = 0$ or $x = 3$","$x = 2$ only","$x = 1$ only"],"correctAnswer":"A","marks":7,"explanation":"Let $y = 2^x$. Then $4^x = (2^2)^x = (2^x)^2 = y^2$. The equation becomes: $y^2 - 6y + 8 = 0$. Factoring: $(y-2)(y-4) = 0$, so $y = 2$ or $y = 4$. Thus $2^x = 2$ giving $x = 1$, or $2^x = 4 = 2^2$ giving $x = 2$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Equations and Inequalities - Exam Level'
  AND topic = 'A2'
  AND difficulty = 'exam_level'
);

-- Equations and Inequalities - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Equations and Inequalities - Foundational',
  'A2',
  4,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  16,
  '[{"id":1,"type":"mcq","question":"Solve the equation $2x + 5 = 13$.","options":["$x = 4$","$x = 9$","$x = 6.5$","$x = 3$"],"correctAnswer":"A","marks":2,"explanation":"Subtract 5 from both sides: $2x = 8$. Divide by 2: $x = 4$."},{"id":2,"type":"mcq","question":"Solve the inequality $3x - 7 > 5$.","options":["$x > 4$","$x < 4$","$x > -4$","$x < -4$"],"correctAnswer":"A","marks":3,"explanation":"Add 7 to both sides: $3x > 12$. Divide by 3: $x > 4$."},{"id":3,"type":"mcq","question":"Solve the equation $x^2 = 16$.","options":["$x = \\pm 4$","$x = 4$ only","$x = -4$ only","$x = \\pm 8$"],"correctAnswer":"A","marks":2,"explanation":"Taking square root of both sides: $x = \\pm \\sqrt{16} = \\pm 4$."},{"id":4,"type":"mcq","question":"Solve the equation $\\frac{x}{3} + 2 = 7$.","options":["$x = 15$","$x = 5$","$x = 27$","$x = 9$"],"correctAnswer":"A","marks":3,"explanation":"Subtract 2: $\\frac{x}{3} = 5$. Multiply by 3: $x = 15$."},{"id":5,"type":"multi_select","question":"Which of the following are solutions to the equation $(x-2)(x+3) = 0$? (Select all that apply)","options":["$x = 2$","$x = -3$","$x = 3$","$x = -2$"],"correctAnswers":["A","B"],"partialCredit":true,"marks":3,"explanation":"For a product to equal zero, at least one factor must be zero. So $x - 2 = 0$ giving $x = 2$, or $x + 3 = 0$ giving $x = -3$."},{"id":6,"type":"mcq","question":"Solve the inequality $-2x \\leq 8$.","options":["$x \\geq -4$","$x \\leq -4$","$x \\geq 4$","$x \\leq 4$"],"correctAnswer":"A","marks":3,"explanation":"Divide by $-2$ (remember to reverse the inequality sign when dividing by a negative): $x \\geq -4$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Equations and Inequalities - Foundational'
  AND topic = 'A2'
  AND difficulty = 'foundational'
);

-- Equations and Inequalities - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Equations and Inequalities - Intermediate',
  'A2',
  5,
  'intermediate',
  30,
  '2025-12-18T23:59:59Z'::timestamptz,
  31,
  '[{"id":1,"type":"mcq","question":"Solve the equation $\\frac{x}{2} + \\frac{x}{3} = 5$.","options":["$x = 6$","$x = 10$","$x = 15$","$x = 30$"],"correctAnswer":"A","marks":4,"explanation":"Multiply through by 6 (LCM of 2 and 3): $3x + 2x = 30$, giving $5x = 30$, thus $x = 6$."},{"id":2,"type":"mcq","question":"Solve the inequality $x^2 - 5x + 6 < 0$.","options":["$2 < x < 3$","$x < 2$ or $x > 3$","$x < -3$ or $x > -2$","$-3 < x < -2$"],"correctAnswer":"A","marks":5,"explanation":"Factorize: $(x-2)(x-3) < 0$. The expression is negative between the roots: $2 < x < 3$."},{"id":3,"type":"mcq","question":"Solve the equation $2^{x+1} = 32$.","options":["$x = 4$","$x = 5$","$x = 3$","$x = 6$"],"correctAnswer":"A","marks":4,"explanation":"Since $32 = 2^5$: $2^{x+1} = 2^5$. Therefore $x + 1 = 5$, giving $x = 4$."},{"id":4,"type":"multi_select","question":"For what values of $k$ does the equation $x^2 + kx + 9 = 0$ have equal roots? (Select all that apply)","options":["$k = 6$","$k = -6$","$k = 3$","$k = -3$"],"correctAnswers":["A","B"],"partialCredit":true,"marks":4,"explanation":"For equal roots, discriminant $= 0$: $k^2 - 4(1)(9) = 0$, thus $k^2 = 36$, giving $k = \\pm 6$."},{"id":5,"type":"mcq","question":"Solve the inequality $\\frac{x+2}{x-1} > 0$.","options":["$x < -2$ or $x > 1$","$-2 < x < 1$","$x > 1$ only","$x < -2$ only"],"correctAnswer":"A","marks":5,"explanation":"The fraction is positive when both numerator and denominator have the same sign. This occurs when $x < -2$ (both negative) or $x > 1$ (both positive). Note $x \\neq 1$."},{"id":6,"type":"mcq","question":"Solve simultaneously: $2x + y = 7$ and $x - y = 2$.","options":["$x = 3, y = 1$","$x = 2, y = 3$","$x = 1, y = 5$","$x = 4, y = -1$"],"correctAnswer":"A","marks":4,"explanation":"Add the equations: $3x = 9$, so $x = 3$. Substitute into second equation: $3 - y = 2$, giving $y = 1$."},{"id":7,"type":"mcq","question":"Find the range of values of $x$ satisfying $|2x - 3| < 5$.","options":["$-1 < x < 4$","$x < -1$ or $x > 4$","$-4 < x < 1$","$1 < x < 4$"],"correctAnswer":"A","marks":5,"explanation":"The inequality $|2x-3| < 5$ means $-5 < 2x - 3 < 5$. Adding 3: $-2 < 2x < 8$. Dividing by 2: $-1 < x < 4$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Equations and Inequalities - Intermediate'
  AND topic = 'A2'
  AND difficulty = 'intermediate'
);
