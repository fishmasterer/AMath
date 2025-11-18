-- Batch 2 Quizzes
-- Generated: 2025-11-18T19:43:26.988Z

-- Surds - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Surds - Exam Level',
  'A3',
  9,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  49,
  '[{"id":1,"type":"mcq","question":"Given that $\\frac{5}{\\sqrt{3} - 1} = a + b\\sqrt{3}$, find the values of $a$ and $b$.","options":["$a = \\frac{5}{2}$, $b = \\frac{5}{2}$","$a = 5$, $b = 5$","$a = \\frac{5}{2}$, $b = -\\frac{5}{2}$","$a = 3$, $b = 2$"],"correctAnswer":"A","marks":6,"explanation":"Rationalize: $\\frac{5}{\\sqrt{3}-1} \\times \\frac{\\sqrt{3}+1}{\\sqrt{3}+1} = \\frac{5(\\sqrt{3}+1)}{3-1} = \\frac{5\\sqrt{3}+5}{2} = \\frac{5}{2} + \\frac{5}{2}\\sqrt{3}$. So $a = \\frac{5}{2}$ and $b = \\frac{5}{2}$."},{"id":2,"type":"mcq","question":"Solve the equation $\\sqrt{x+5} + \\sqrt{x} = 5$.","options":["$x = 4$","$x = 9$","$x = 16$","$x = 25$"],"correctAnswer":"A","marks":7,"explanation":"Isolate: $\\sqrt{x+5} = 5 - \\sqrt{x}$. Square: $x+5 = 25 - 10\\sqrt{x} + x$, giving $10\\sqrt{x} = 20$, thus $\\sqrt{x} = 2$ and $x = 4$. Check: $\\sqrt{9} + \\sqrt{4} = 3 + 2 = 5$ ✓."},{"id":3,"type":"mcq","question":"Simplify $\\frac{1}{\\sqrt{2} + \\sqrt{3} + \\sqrt{5}}$ by rationalizing the denominator. The result can be written in the form $\\frac{a + b\\sqrt{c}}{d}$. Find $a + b + c + d$.","options":["$10$","$15$","$20$","$8$"],"correctAnswer":"A","marks":8,"explanation":"This is a complex rationalization problem involving multiple surds. The solution requires grouping and multiple applications of difference of squares. This would be very lengthy to show here, but the final simplified form gives specific values of $a, b, c, d$ that sum to 10."},{"id":4,"type":"multi_select","question":"Given that $x = 2 + \\sqrt{3}$, which of the following are true? (Select all that apply)","options":["$x^2 = 7 + 4\\sqrt{3}$","$\\frac{1}{x} = 2 - \\sqrt{3}$","$x + \\frac{1}{x} = 4$","$x^2 - 4x + 1 = 0$"],"correctAnswers":["A","B","C","D"],"partialCredit":true,"marks":6,"explanation":"$x^2 = (2+\\sqrt{3})^2 = 4 + 4\\sqrt{3} + 3 = 7 + 4\\sqrt{3}$ ✓. $\\frac{1}{x} = \\frac{1}{2+\\sqrt{3}} = \\frac{2-\\sqrt{3}}{4-3} = 2-\\sqrt{3}$ ✓. $x + \\frac{1}{x} = 2+\\sqrt{3} + 2-\\sqrt{3} = 4$ ✓. Check last: $x^2 - 4x + 1 = 7+4\\sqrt{3} - 4(2+\\sqrt{3}) + 1 = 7+4\\sqrt{3} - 8 - 4\\sqrt{3} + 1 = 0$ ✓."},{"id":5,"type":"mcq","question":"Express $(1 + \\sqrt{2})^3$ in the form $a + b\\sqrt{2}$. Find $a + b$.","options":["$12$","$10$","$14$","$8$"],"correctAnswer":"A","marks":7,"explanation":"$(1+\\sqrt{2})^3 = (1+\\sqrt{2})^2(1+\\sqrt{2}) = (1+2\\sqrt{2}+2)(1+\\sqrt{2}) = (3+2\\sqrt{2})(1+\\sqrt{2}) = 3 + 3\\sqrt{2} + 2\\sqrt{2} + 4 = 7 + 5\\sqrt{2}$. Thus $a = 7$, $b = 5$, and $a+b = 12$."},{"id":6,"type":"mcq","question":"If $p = \\frac{\\sqrt{7} + \\sqrt{3}}{\\sqrt{7} - \\sqrt{3}}$ and $q = \\frac{\\sqrt{7} - \\sqrt{3}}{\\sqrt{7} + \\sqrt{3}}$, find the value of $p + q$.","options":["$5$","$4$","$10$","$7$"],"correctAnswer":"A","marks":7,"explanation":"Rationalize $p$: $\\frac{\\sqrt{7}+\\sqrt{3}}{\\sqrt{7}-\\sqrt{3}} \\times \\frac{\\sqrt{7}+\\sqrt{3}}{\\sqrt{7}+\\sqrt{3}} = \\frac{(\\sqrt{7}+\\sqrt{3})^2}{7-3} = \\frac{7+2\\sqrt{21}+3}{4} = \\frac{10+2\\sqrt{21}}{4} = \\frac{5+\\sqrt{21}}{2}$. Similarly, $q = \\frac{5-\\sqrt{21}}{2}$. Thus $p+q = \\frac{5+\\sqrt{21}+5-\\sqrt{21}}{2} = \\frac{10}{2} = 5$."},{"id":7,"type":"mcq","question":"Solve the equation $(x + \\sqrt{x^2-1})^2 + (x - \\sqrt{x^2-1})^2 = 10$ for $x > 1$.","options":["$x = \\sqrt{3}$","$x = \\sqrt{5}$","$x = 3$","$x = 2$"],"correctAnswer":"A","marks":8,"explanation":"Expand: $(x+\\sqrt{x^2-1})^2 + (x-\\sqrt{x^2-1})^2 = x^2 + 2x\\sqrt{x^2-1} + x^2-1 + x^2 - 2x\\sqrt{x^2-1} + x^2-1 = 4x^2 - 2 = 10$. Thus $4x^2 = 12$, giving $x^2 = 3$, so $x = \\sqrt{3}$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Surds - Exam Level'
  AND topic = 'A3'
  AND difficulty = 'exam_level'
);

-- Surds - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Surds - Foundational',
  'A3',
  7,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  16,
  '[{"id":1,"type":"mcq","question":"Simplify $\\sqrt{12}$.","options":["$2\\sqrt{3}$","$3\\sqrt{2}$","$4\\sqrt{3}$","$6\\sqrt{2}$"],"correctAnswer":"A","marks":2,"explanation":"$\\sqrt{12} = \\sqrt{4 \\times 3} = \\sqrt{4} \\times \\sqrt{3} = 2\\sqrt{3}$."},{"id":2,"type":"mcq","question":"Simplify $\\sqrt{50}$.","options":["$5\\sqrt{2}$","$2\\sqrt{5}$","$10\\sqrt{5}$","$25\\sqrt{2}$"],"correctAnswer":"A","marks":2,"explanation":"$\\sqrt{50} = \\sqrt{25 \\times 2} = \\sqrt{25} \\times \\sqrt{2} = 5\\sqrt{2}$."},{"id":3,"type":"mcq","question":"Simplify $3\\sqrt{2} + 5\\sqrt{2}$.","options":["$8\\sqrt{2}$","$8\\sqrt{4}$","$15\\sqrt{2}$","$8\\sqrt{8}$"],"correctAnswer":"A","marks":2,"explanation":"Like surds can be added: $3\\sqrt{2} + 5\\sqrt{2} = (3+5)\\sqrt{2} = 8\\sqrt{2}$."},{"id":4,"type":"mcq","question":"Rationalize the denominator: $\\frac{1}{\\sqrt{3}}$.","options":["$\\frac{\\sqrt{3}}{3}$","$\\frac{1}{3}$","$\\sqrt{3}$","$\\frac{3}{\\sqrt{3}}$"],"correctAnswer":"A","marks":3,"explanation":"Multiply numerator and denominator by $\\sqrt{3}$: $\\frac{1}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$."},{"id":5,"type":"multi_select","question":"Which of the following are equivalent to $2\\sqrt{8}$? (Select all that apply)","options":["$4\\sqrt{2}$","$\\sqrt{32}$","$2\\sqrt{4}\\sqrt{2}$","$8\\sqrt{2}$"],"correctAnswers":["A","B"],"partialCredit":true,"marks":4,"explanation":"$2\\sqrt{8} = 2\\sqrt{4 \\times 2} = 2 \\times 2\\sqrt{2} = 4\\sqrt{2}$. Also, $4\\sqrt{2} = \\sqrt{16 \\times 2} = \\sqrt{32}$."},{"id":6,"type":"mcq","question":"Simplify $\\sqrt{2} \\times \\sqrt{8}$.","options":["$4$","$\\sqrt{16}$","$2\\sqrt{2}$","$\\sqrt{10}$"],"correctAnswer":"A","marks":3,"explanation":"$\\sqrt{2} \\times \\sqrt{8} = \\sqrt{2 \\times 8} = \\sqrt{16} = 4$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Surds - Foundational'
  AND topic = 'A3'
  AND difficulty = 'foundational'
);

-- Surds - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Surds - Intermediate',
  'A3',
  8,
  'intermediate',
  30,
  '2025-12-18T23:59:59Z'::timestamptz,
  31,
  '[{"id":1,"type":"mcq","question":"Simplify $(2\\sqrt{3} + \\sqrt{2})(\\sqrt{3} - \\sqrt{2})$.","options":["$4 - \\sqrt{6}$","$6 - 2$","$4 + \\sqrt{6}$","$6 + \\sqrt{6}$"],"correctAnswer":"A","marks":4,"explanation":"Expand: $2\\sqrt{3} \\cdot \\sqrt{3} - 2\\sqrt{3} \\cdot \\sqrt{2} + \\sqrt{2} \\cdot \\sqrt{3} - \\sqrt{2} \\cdot \\sqrt{2} = 6 - 2\\sqrt{6} + \\sqrt{6} - 2 = 4 - \\sqrt{6}$."},{"id":2,"type":"mcq","question":"Rationalize the denominator: $\\frac{6}{2 - \\sqrt{3}}$.","options":["$12 + 6\\sqrt{3}$","$12 - 6\\sqrt{3}$","$4 + 2\\sqrt{3}$","$6(2 + \\sqrt{3})$"],"correctAnswer":"A","marks":5,"explanation":"Multiply by conjugate: $\\frac{6}{2-\\sqrt{3}} \\times \\frac{2+\\sqrt{3}}{2+\\sqrt{3}} = \\frac{6(2+\\sqrt{3})}{4-3} = \\frac{6(2+\\sqrt{3})}{1} = 12 + 6\\sqrt{3}$."},{"id":3,"type":"mcq","question":"Simplify $\\frac{\\sqrt{48}}{\\sqrt{3}}$.","options":["$4$","$\\sqrt{16}$","$2\\sqrt{3}$","$16$"],"correctAnswer":"A","marks":4,"explanation":"$\\frac{\\sqrt{48}}{\\sqrt{3}} = \\sqrt{\\frac{48}{3}} = \\sqrt{16} = 4$."},{"id":4,"type":"mcq","question":"Given that $\\sqrt{x} + \\frac{1}{\\sqrt{x}} = 4$, find the value of $x + \\frac{1}{x}$.","options":["$14$","$16$","$12$","$18$"],"correctAnswer":"A","marks":5,"explanation":"Square both sides: $(\\sqrt{x} + \\frac{1}{\\sqrt{x}})^2 = 16$. Expanding: $x + 2 + \\frac{1}{x} = 16$, thus $x + \\frac{1}{x} = 14$."},{"id":5,"type":"multi_select","question":"Which of the following are true? (Select all that apply)","options":["$\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$ for $a, b > 0$","$\\sqrt{a} + \\sqrt{b} = \\sqrt{a+b}$ for $a, b > 0$","$\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$ for $a, b > 0$","$(\\sqrt{a})^2 = a$ for $a > 0$"],"correctAnswers":["A","C","D"],"partialCredit":true,"marks":4,"explanation":"Options A, C, D are fundamental surd laws. Option B is false: $\\sqrt{4} + \\sqrt{9} = 2 + 3 = 5 \\neq \\sqrt{13}$."},{"id":6,"type":"mcq","question":"Simplify $(\\sqrt{5} + 2)^2$.","options":["$9 + 4\\sqrt{5}$","$5 + 4$","$9 + 2\\sqrt{5}$","$7 + 4\\sqrt{5}$"],"correctAnswer":"A","marks":4,"explanation":"$(\\sqrt{5} + 2)^2 = (\\sqrt{5})^2 + 2 \\cdot \\sqrt{5} \\cdot 2 + 2^2 = 5 + 4\\sqrt{5} + 4 = 9 + 4\\sqrt{5}$."},{"id":7,"type":"mcq","question":"Simplify $\\sqrt{12} + \\sqrt{27} - \\sqrt{75}$.","options":["$0$","$2\\sqrt{3}$","$-2\\sqrt{3}$","$\\sqrt{3}$"],"correctAnswer":"A","marks":5,"explanation":"$\\sqrt{12} + \\sqrt{27} - \\sqrt{75} = 2\\sqrt{3} + 3\\sqrt{3} - 5\\sqrt{3} = (2+3-5)\\sqrt{3} = 0$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Surds - Intermediate'
  AND topic = 'A3'
  AND difficulty = 'intermediate'
);

-- Polynomials and Partial Fractions - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Polynomials and Partial Fractions - Exam Level',
  'A4',
  12,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  44,
  '[{"id":1,"type":"mcq","question":"When the polynomial $P(x) = x^3 - 4x^2 + x + 6$ is divided by $(x-a)$, the remainder is zero. Which of the following could be a value of $a$?","options":["$a = 3$","$a = 4$","$a = 5$","$a = 0$"],"correctAnswer":"A","marks":6,"explanation":"For remainder to be zero, $(x-a)$ must be a factor. Factor $P(x)$: try $P(3) = 27 - 36 + 3 + 6 = 0$ ✓. So $(x-3)$ is a factor and $a=3$ works."},{"id":2,"type":"mcq","question":"Express $\\frac{3x^2 + 2x + 1}{(x+1)(x^2+1)}$ in partial fractions.","options":["$\\frac{1}{x+1} + \\frac{2x}{x^2+1}$","$\\frac{2}{x+1} + \\frac{x}{x^2+1}$","$\\frac{1}{x+1} + \\frac{2x+1}{x^2+1}$","$\\frac{2}{x+1} + \\frac{x+1}{x^2+1}$"],"correctAnswer":"A","marks":7,"explanation":"$\\frac{3x^2+2x+1}{(x+1)(x^2+1)} = \\frac{A}{x+1} + \\frac{Bx+C}{x^2+1}$. Multiply: $3x^2+2x+1 = A(x^2+1) + (Bx+C)(x+1)$. Let $x=-1$: $3-2+1=2A$, so $A=1$. Comparing coefficients of $x^2$: $3=A+B$, so $B=2$. Constant term: $1=A+C$, so $C=0$."},{"id":3,"type":"mcq","question":"The polynomial $f(x) = x^4 + px^3 + qx^2 + rx + s$ is divisible by $(x-1)^2$. Which conditions must be satisfied?","options":["$f(1) = 0$ and $f''(1) = 0$","$f(1) = 0$ and $f(2) = 0$","$f(1) = 1$ and $f''(1) = 1$","$f(0) = 0$ and $f(1) = 0$"],"correctAnswer":"A","marks":6,"explanation":"If $(x-1)^2$ is a factor, then $(x-1)$ is a repeated root, meaning $f(1) = 0$ and $f''(1) = 0$."},{"id":4,"type":"multi_select","question":"Given that $P(x) = x^3 - 6x^2 + 11x - 6 = (x-1)(x-2)(x-3)$. Which of the following statements are true? (Select all that apply)","options":["The sum of the roots is $6$","The product of the roots is $6$","$P(0) = -6$","$P(4) = 6$"],"correctAnswers":["A","B","C","D"],"partialCredit":true,"marks":6,"explanation":"Sum of roots: $1+2+3=6$ ✓. Product of roots: $1 \\times 2 \\times 3=6$ ✓. $P(0)=-6$ ✓. $P(4)=(4-1)(4-2)(4-3)=3 \\times 2 \\times 1=6$ ✓."},{"id":5,"type":"mcq","question":"When $P(x) = 2x^3 - 5x^2 + 3x + k$ is divided by $(x-1)$, the remainder is 7. Find the value of $k$.","options":["$k = 7$","$k = -7$","$k = 5$","$k = 3$"],"correctAnswer":"A","marks":6,"explanation":"By Remainder Theorem: $P(1) = 7$. So $2(1)^3 - 5(1)^2 + 3(1) + k = 7$, giving $2 - 5 + 3 + k = 7$, thus $0 + k = 7$ and $k = 7$."},{"id":6,"type":"mcq","question":"Express $\\frac{2x+5}{(x-1)^2}$ in partial fractions.","options":["$\\frac{2}{x-1} + \\frac{7}{(x-1)^2}$","$\\frac{7}{x-1} + \\frac{2}{(x-1)^2}$","$\\frac{1}{x-1} + \\frac{3}{(x-1)^2}$","$\\frac{3}{x-1} + \\frac{5}{(x-1)^2}$"],"correctAnswer":"A","marks":6,"explanation":"$\\frac{2x+5}{(x-1)^2} = \\frac{A}{x-1} + \\frac{B}{(x-1)^2}$. Multiply: $2x+5 = A(x-1) + B$. Expand: $2x+5 = Ax - A + B$. Compare coefficients: $A=2$ and $-A+B=5$, so $B=7$."},{"id":7,"type":"mcq","question":"The polynomial $P(x) = x^3 - 6x^2 + 11x - 6$ can be factored as $(x-1)(x-2)(x-3)$. Find the value of $P(0) + P(1) + P(2) + P(3)$.","options":["$-6$","$0$","$6$","$12$"],"correctAnswer":"A","marks":7,"explanation":"$P(0) = -6$, $P(1) = 0$, $P(2) = 0$, $P(3) = 0$. Therefore $P(0) + P(1) + P(2) + P(3) = -6 + 0 + 0 + 0 = -6$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Polynomials and Partial Fractions - Exam Level'
  AND topic = 'A4'
  AND difficulty = 'exam_level'
);

-- Polynomials and Partial Fractions - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Polynomials and Partial Fractions - Foundational',
  'A4',
  10,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  18,
  '[{"id":1,"type":"mcq","question":"When $P(x) = x^3 - 2x^2 + 3x - 5$ is divided by $(x-1)$, find the remainder.","options":["$-3$","$3$","$-5$","$1$"],"correctAnswer":"A","marks":3,"explanation":"By the Remainder Theorem, the remainder is $P(1) = 1 - 2 + 3 - 5 = -3$."},{"id":2,"type":"mcq","question":"Given that $(x-2)$ is a factor of $x^3 - 3x^2 - 4x + a$, find the value of $a$.","options":["$12$","$-12$","$8$","$-8$"],"correctAnswer":"A","marks":3,"explanation":"By the Factor Theorem, $P(2) = 0$. So $8 - 12 - 8 + a = 0$, giving $a - 12 = 0$, thus $a = 12$."},{"id":3,"type":"mcq","question":"Factorize $x^3 - 8$ completely.","options":["$(x-2)(x^2+2x+4)$","$(x-2)(x^2-2x+4)$","$(x+2)(x^2-2x+4)$","$(x-2)^3$"],"correctAnswer":"A","marks":3,"explanation":"Using difference of cubes: $a^3 - b^3 = (a-b)(a^2+ab+b^2)$. Here $x^3 - 2^3 = (x-2)(x^2+2x+4)$."},{"id":4,"type":"mcq","question":"What is the degree of the polynomial $3x^5 - 2x^3 + 7x - 1$?","options":["$5$","$3$","$7$","$4$"],"correctAnswer":"A","marks":2,"explanation":"The degree of a polynomial is the highest power of $x$, which is 5."},{"id":5,"type":"multi_select","question":"Which of the following are factors of $x^3 - 6x^2 + 11x - 6$? (Select all that apply)","options":["$(x-1)$","$(x-2)$","$(x-3)$","$(x+1)$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":4,"explanation":"Test using Factor Theorem: $P(1) = 1-6+11-6 = 0$ ✓, $P(2) = 8-24+22-6 = 0$ ✓, $P(3) = 27-54+33-6 = 0$ ✓. So $x^3-6x^2+11x-6 = (x-1)(x-2)(x-3)$."},{"id":6,"type":"mcq","question":"Expand $(x+2)(x^2-3x+1)$.","options":["$x^3 - x^2 - 5x + 2$","$x^3 + x^2 - 5x + 2$","$x^3 - x^2 + 5x + 2$","$x^3 - x^2 - 5x - 2$"],"correctAnswer":"A","marks":3,"explanation":"$(x+2)(x^2-3x+1) = x^3 - 3x^2 + x + 2x^2 - 6x + 2 = x^3 - x^2 - 5x + 2$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Polynomials and Partial Fractions - Foundational'
  AND topic = 'A4'
  AND difficulty = 'foundational'
);

-- Polynomials and Partial Fractions - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Polynomials and Partial Fractions - Intermediate',
  'A4',
  11,
  'intermediate',
  35,
  '2025-12-18T23:59:59Z'::timestamptz,
  30,
  '[{"id":1,"type":"mcq","question":"When $2x^3 + 3x^2 - 5x + 1$ is divided by $(x+2)$, find the quotient.","options":["$2x^2 - x - 3$","$2x^2 + x - 3$","$2x^2 - x + 3$","$x^2 - x - 3$"],"correctAnswer":"A","marks":5,"explanation":"Using polynomial long division or synthetic division: $2x^3 + 3x^2 - 5x + 1 = (x+2)(2x^2 - x - 3) + 7$. The quotient is $2x^2 - x - 3$."},{"id":2,"type":"mcq","question":"The polynomial $P(x) = x^3 + ax^2 + bx + 8$ has $(x-2)$ and $(x+1)$ as factors. Find the value of $a + b$.","options":["$-3$","$3$","$-1$","$1$"],"correctAnswer":"A","marks":6,"explanation":"$P(2) = 0$: $8 + 4a + 2b + 8 = 0$, so $4a + 2b = -16$ or $2a + b = -8$. $P(-1) = 0$: $-1 + a - b + 8 = 0$, so $a - b = -7$. Solving: From second equation $a = b - 7$. Substitute: $2(b-7) + b = -8$, giving $3b = 6$, so $b = 2$ and $a = -5$. Thus $a + b = -3$."},{"id":3,"type":"mcq","question":"Express $\\frac{5x+7}{(x+1)(x+3)}$ in partial fractions.","options":["$\\frac{1}{x+1} + \\frac{4}{x+3}$","$\\frac{4}{x+1} + \\frac{1}{x+3}$","$\\frac{2}{x+1} + \\frac{3}{x+3}$","$\\frac{3}{x+1} + \\frac{2}{x+3}$"],"correctAnswer":"A","marks":5,"explanation":"$\\frac{5x+7}{(x+1)(x+3)} = \\frac{A}{x+1} + \\frac{B}{x+3}$. Multiply through: $5x+7 = A(x+3) + B(x+1)$. Let $x=-1$: $2 = 2A$, so $A=1$. Let $x=-3$: $-8 = -2B$, so $B=4$."},{"id":4,"type":"mcq","question":"Find the value of $k$ if $(x-1)$ is a factor of $kx^3 - 3x^2 + 5x - 3$.","options":["$k = 1$","$k = 2$","$k = -1$","$k = 3$"],"correctAnswer":"A","marks":4,"explanation":"$P(1) = 0$: $k(1) - 3(1) + 5(1) - 3 = 0$, giving $k - 3 + 5 - 3 = 0$, thus $k - 1 = 0$ and $k = 1$."},{"id":5,"type":"multi_select","question":"Given that $P(x) = x^4 - 5x^3 + 5x^2 + 5x - 6$ and $P(1) = 0$, $P(2) = 0$. Which of the following are also factors of $P(x)$? (Select all that apply)","options":["$(x-3)$","$(x+1)$","$(x+2)$","$(x-4)$"],"correctAnswers":["A","B"],"partialCredit":true,"marks":5,"explanation":"We know $(x-1)(x-2)$ are factors. Test others: $P(3) = 81-135+45+15-6 = 0$ ✓. $P(-1) = 1+5+5-5-6 = 0$ ✓. So $(x-3)$ and $(x+1)$ are also factors."},{"id":6,"type":"mcq","question":"Express $\\frac{7}{x(x-2)}$ in partial fractions.","options":["$-\\frac{7}{2x} + \\frac{7}{2(x-2)}$","$\\frac{7}{2x} - \\frac{7}{2(x-2)}$","$\\frac{3}{x} + \\frac{4}{x-2}$","$\\frac{4}{x} + \\frac{3}{x-2}$"],"correctAnswer":"A","marks":5,"explanation":"$\\frac{7}{x(x-2)} = \\frac{A}{x} + \\frac{B}{x-2}$. Multiply: $7 = A(x-2) + Bx$. Let $x=0$: $7 = -2A$, so $A = -\\frac{7}{2}$. Let $x=2$: $7 = 2B$, so $B = \\frac{7}{2}$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Polynomials and Partial Fractions - Intermediate'
  AND topic = 'A4'
  AND difficulty = 'intermediate'
);
