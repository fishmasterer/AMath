-- Batch 3 Quizzes
-- Generated: 2025-11-18T20:10:08.090Z

-- Binomial Expansions - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Binomial Expansions - Exam Level',
  'A5',
  15,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  48,
  '[{"id":1,"type":"mcq","question":"In the expansion of $(1+2x)^n$, the coefficient of $x^3$ is 80. Find the value of $n$.","options":["$n = 5$","$n = 6$","$n = 4$","$n = 7$"],"correctAnswer":"A","marks":7,"explanation":"Coefficient of $x^3$: $\\binom{n}{3}(2)^3 = 80$. So $\\binom{n}{3} \\times 8 = 80$, giving $\\binom{n}{3} = 10$. For $n=5$: $\\binom{5}{3} = \\frac{5!}{3!2!} = 10$ ✓. Therefore $n = 5$."},{"id":2,"type":"mcq","question":"Find the term independent of $x$ in the expansion of $(2x^2 - \\frac{1}{x})^9$.","options":["$672$","$-672$","$336$","$-336$"],"correctAnswer":"A","marks":8,"explanation":"General term: $\\binom{9}{r}(2x^2)^{9-r}(-\\frac{1}{x})^r = \\binom{9}{r}2^{9-r}(-1)^r x^{18-3r}$. For constant: $18-3r=0$, so $r=6$. Term: $\\binom{9}{6}2^3(-1)^6 = 84 \\times 8 \\times 1 = 672$."},{"id":3,"type":"mcq","question":"The first three terms in the expansion of $(1+ax)^n$ are $1 + 12x + 60x^2$. Find the values of $a$ and $n$.","options":["$a = 2, n = 6$","$a = 3, n = 4$","$a = 4, n = 3$","$a = 6, n = 2$"],"correctAnswer":"A","marks":7,"explanation":"First term: 1 ✓. Second term: $\\binom{n}{1}(ax) = nax = 12x$, so $na = 12$. Third term: $\\binom{n}{2}(ax)^2 = \\frac{n(n-1)}{2}a^2x^2 = 60x^2$. From $na=12$ and $\\frac{n(n-1)}{2}a^2 = 60$: substitute $a=\\frac{12}{n}$ into second equation: $\\frac{n(n-1)}{2} \\times \\frac{144}{n^2} = 60$, giving $\\frac{144(n-1)}{2n} = 60$, so $144(n-1) = 120n$, thus $144n - 144 = 120n$, giving $24n = 144$ and $n = 6$. Then $a = \\frac{12}{6} = 2$."},{"id":4,"type":"multi_select","question":"In the expansion of $(1+x)^{10}$, which of the following statements are true? (Select all that apply)","options":["The coefficient of $x^5$ is $252$","The sum of all coefficients is $1024$","There are 11 terms in the expansion","The coefficient of $x^3$ equals the coefficient of $x^7$"],"correctAnswers":["A","B","C","D"],"partialCredit":true,"marks":6,"explanation":"Coeff of $x^5$: $\\binom{10}{5} = 252$ ✓. Sum of coefficients (put $x=1$): $(1+1)^{10} = 2^{10} = 1024$ ✓. Number of terms: $n+1 = 11$ ✓. $\\binom{10}{3} = \\binom{10}{7} = 120$ ✓."},{"id":5,"type":"mcq","question":"Find the coefficient of $x^6$ in the expansion of $(1-2x)^{10}$.","options":["$13440$","$-13440$","$6720$","$-6720$"],"correctAnswer":"A","marks":7,"explanation":"Coefficient of $x^6$: $\\binom{10}{6}(-2)^6 = 210 \\times 64 = 13440$."},{"id":6,"type":"mcq","question":"Given that the coefficient of $x^3$ in the expansion of $(1+px)^5$ is 80, find the value of $p$.","options":["$p = 2$","$p = 4$","$p = \\frac{1}{2}$","$p = 8$"],"correctAnswer":"A","marks":6,"explanation":"Coefficient of $x^3$: $\\binom{5}{3}p^3 = 80$. So $10p^3 = 80$, giving $p^3 = 8$, thus $p = 2$."},{"id":7,"type":"mcq","question":"The coefficient of $x^5$ in the expansion of $(2-x)^8$ is:","options":["$-448$","$448$","$-224$","$224$"],"correctAnswer":"A","marks":7,"explanation":"Coefficient of $x^5$: $\\binom{8}{5}(2)^{8-5}(-1)^5 = \\binom{8}{5}(2)^3(-1) = 56 \\times 8 \\times (-1) = -448$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Binomial Expansions - Exam Level'
  AND topic = 'A5'
  AND difficulty = 'exam_level'
);

-- Binomial Expansions - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Binomial Expansions - Foundational',
  'A5',
  13,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  17,
  '[{"id":1,"type":"mcq","question":"Expand $(x+2)^2$.","options":["$x^2 + 4x + 4$","$x^2 + 2x + 4$","$x^2 + 4x + 2$","$x^2 + 2x + 2$"],"correctAnswer":"A","marks":2,"explanation":"$(x+2)^2 = x^2 + 2(x)(2) + 2^2 = x^2 + 4x + 4$."},{"id":2,"type":"mcq","question":"What is the coefficient of $x^2$ in the expansion of $(1+x)^3$?","options":["$3$","$1$","$2$","$6$"],"correctAnswer":"A","marks":3,"explanation":"$(1+x)^3 = 1 + 3x + 3x^2 + x^3$. The coefficient of $x^2$ is 3."},{"id":3,"type":"mcq","question":"Expand $(2x-1)^2$.","options":["$4x^2 - 4x + 1$","$4x^2 + 4x + 1$","$2x^2 - 2x + 1$","$4x^2 - 2x + 1$"],"correctAnswer":"A","marks":3,"explanation":"$(2x-1)^2 = (2x)^2 - 2(2x)(1) + 1^2 = 4x^2 - 4x + 1$."},{"id":4,"type":"mcq","question":"Using the binomial theorem, find the value of $\\binom{5}{2}$.","options":["$10$","$5$","$20$","$15$"],"correctAnswer":"A","marks":3,"explanation":"$\\binom{5}{2} = \\frac{5!}{2!(5-2)!} = \\frac{5!}{2!3!} = \\frac{5 \\times 4}{2 \\times 1} = 10$."},{"id":5,"type":"multi_select","question":"Which of the following are correct expansions? (Select all that apply)","options":["$(x+1)^2 = x^2 + 2x + 1$","$(x-1)^2 = x^2 - 2x + 1$","$(x+2)^2 = x^2 + 2x + 4$","$(2x+1)^2 = 4x^2 + 4x + 1$"],"correctAnswers":["A","B","D"],"partialCredit":true,"marks":4,"explanation":"A: $(x+1)^2 = x^2+2x+1$ ✓. B: $(x-1)^2 = x^2-2x+1$ ✓. C: $(x+2)^2 = x^2+4x+4$ ✗. D: $(2x+1)^2 = 4x^2+4x+1$ ✓."},{"id":6,"type":"mcq","question":"Find the constant term in the expansion of $(x+3)^2$.","options":["$9$","$3$","$6$","$1$"],"correctAnswer":"A","marks":2,"explanation":"$(x+3)^2 = x^2 + 6x + 9$. The constant term is 9."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Binomial Expansions - Foundational'
  AND topic = 'A5'
  AND difficulty = 'foundational'
);

-- Binomial Expansions - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Binomial Expansions - Intermediate',
  'A5',
  14,
  'intermediate',
  30,
  '2025-12-18T23:59:59Z'::timestamptz,
  31,
  '[{"id":1,"type":"mcq","question":"Find the coefficient of $x^4$ in the expansion of $(2+x)^6$.","options":["$60$","$15$","$30$","$120$"],"correctAnswer":"A","marks":5,"explanation":"Using binomial theorem: term with $x^4$ is $\\binom{6}{4}(2)^{6-4}(x)^4 = \\binom{6}{4}(2)^2 x^4 = 15 \\times 4 \\times x^4 = 60x^4$. Coefficient is 60."},{"id":2,"type":"mcq","question":"In the expansion of $(1+2x)^5$, find the coefficient of $x^3$.","options":["$80$","$40$","$10$","$160$"],"correctAnswer":"A","marks":5,"explanation":"Term with $x^3$: $\\binom{5}{3}(1)^{5-3}(2x)^3 = \\binom{5}{3}(2)^3 x^3 = 10 \\times 8 \\times x^3 = 80x^3$. Coefficient is 80."},{"id":3,"type":"mcq","question":"Find the term independent of $x$ in the expansion of $(x + \\frac{1}{x})^4$.","options":["$6$","$4$","$8$","$12$"],"correctAnswer":"A","marks":6,"explanation":"General term: $\\binom{4}{r}x^{4-r}(\\frac{1}{x})^r = \\binom{4}{r}x^{4-2r}$. For constant term: $4-2r=0$, so $r=2$. Term is $\\binom{4}{2}x^0 = 6$."},{"id":4,"type":"mcq","question":"Using binomial expansion, find an approximation for $(1.02)^5$ up to 3 decimal places.","options":["$1.104$","$1.100$","$1.102$","$1.105$"],"correctAnswer":"A","marks":5,"explanation":"$(1+0.02)^5 = 1 + 5(0.02) + 10(0.02)^2 + ... \\approx 1 + 0.1 + 0.004 = 1.104$."},{"id":5,"type":"multi_select","question":"In the expansion of $(2-3x)^4$, which of the following are true? (Select all that apply)","options":["The first term is $16$","The coefficient of $x$ is $-96$","The coefficient of $x^2$ is $216$","There are 4 terms in total"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":5,"explanation":"$(2-3x)^4 = \\binom{4}{0}(2)^4 + \\binom{4}{1}(2)^3(-3x) + \\binom{4}{2}(2)^2(-3x)^2 + ... = 16 - 96x + 216x^2 - 216x^3 + 81x^4$. First term: 16 ✓. Coeff of $x$: -96 ✓. Coeff of $x^2$: 216 ✓. There are 5 terms, not 4 ✗."},{"id":6,"type":"mcq","question":"Find the middle term in the expansion of $(x+2)^6$.","options":["$160x^3$","$120x^3$","$80x^3$","$240x^3$"],"correctAnswer":"A","marks":5,"explanation":"For $(x+2)^6$ there are 7 terms, so middle term is the 4th term (when $r=3$). Term: $\\binom{6}{3}x^{6-3}(2)^3 = 20 \\times x^3 \\times 8 = 160x^3$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Binomial Expansions - Intermediate'
  AND topic = 'A5'
  AND difficulty = 'intermediate'
);

-- Exponential and Logarithmic Functions - Exam Level
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Exponential and Logarithmic Functions - Exam Level',
  'A6',
  18,
  'exam_level',
  45,
  '2025-12-18T23:59:59Z'::timestamptz,
  47,
  '[{"id":1,"type":"mcq","question":"Solve the equation $4^x - 3(2^x) + 2 = 0$.","options":["$x = 0$ or $x = 1$","$x = 1$ or $x = 2$","$x = -1$ or $x = 1$","$x = 0$ or $x = 2$"],"correctAnswer":"A","marks":7,"explanation":"Let $y = 2^x$. Then $4^x = (2^2)^x = (2^x)^2 = y^2$. Equation becomes: $y^2 - 3y + 2 = 0$, which factors as $(y-1)(y-2) = 0$. So $y = 1$ or $y = 2$. Thus $2^x = 1 = 2^0$ giving $x = 0$, or $2^x = 2 = 2^1$ giving $x = 1$."},{"id":2,"type":"mcq","question":"Solve simultaneously: $\\log_2 x + \\log_2 y = 5$ and $\\log_2 x - \\log_2 y = 1$.","options":["$x = 8, y = 4$","$x = 16, y = 2$","$x = 4, y = 8$","$x = 32, y = 1$"],"correctAnswer":"A","marks":7,"explanation":"Add equations: $2\\log_2 x = 6$, so $\\log_2 x = 3$ and $x = 2^3 = 8$. Subtract: $2\\log_2 y = 4$, so $\\log_2 y = 2$ and $y = 2^2 = 4$."},{"id":3,"type":"mcq","question":"Given that $\\log_a 2 = x$ and $\\log_a 3 = y$, express $\\log_a 12$ in terms of $x$ and $y$.","options":["$2x + y$","$x + 2y$","$3x + y$","$x + y$"],"correctAnswer":"A","marks":6,"explanation":"$\\log_a 12 = \\log_a(4 \\times 3) = \\log_a 4 + \\log_a 3 = \\log_a 2^2 + y = 2\\log_a 2 + y = 2x + y$."},{"id":4,"type":"multi_select","question":"Which of the following are solutions to the equation $\\log_3(x^2 - 8) = 2$? (Select all that apply)","options":["$x = \\sqrt{17}$","$x = -\\sqrt{17}$","$x = 5$","$x = -5$"],"correctAnswers":["A","B"],"partialCredit":true,"marks":6,"explanation":"$\\log_3(x^2-8) = 2$ gives $x^2 - 8 = 3^2 = 9$, so $x^2 = 17$ and $x = \\pm\\sqrt{17}$. Both values satisfy the original equation since $x^2 - 8 > 0$ for both."},{"id":5,"type":"mcq","question":"Solve the inequality $2^x > 16$.","options":["$x > 4$","$x < 4$","$x \\geq 4$","$x > 2$"],"correctAnswer":"A","marks":6,"explanation":"$2^x > 16 = 2^4$. Since the exponential function with base $> 1$ is increasing, $x > 4$."},{"id":6,"type":"mcq","question":"If $\\log_5 x + \\log_x 5 = \\frac{13}{6}$, find the value of $\\log_5 x$.","options":["$\\log_5 x = \\frac{3}{2}$ or $\\log_5 x = \\frac{2}{3}$","$\\log_5 x = 2$ or $\\log_5 x = 3$","$\\log_5 x = 1$ or $\\log_5 x = \\frac{13}{6}$","$\\log_5 x = \\frac{13}{12}$"],"correctAnswer":"A","marks":8,"explanation":"Let $\\log_5 x = t$. Then $\\log_x 5 = \\frac{1}{\\log_5 x} = \\frac{1}{t}$. So $t + \\frac{1}{t} = \\frac{13}{6}$. Multiply by $6t$: $6t^2 + 6 = 13t$, giving $6t^2 - 13t + 6 = 0$. Factoring: $(2t-3)(3t-2) = 0$, so $t = \\frac{3}{2}$ or $t = \\frac{2}{3}$."},{"id":7,"type":"mcq","question":"Solve $2^{x+2} = 4^{x-1}$.","options":["$x = 4$","$x = 2$","$x = 3$","$x = 5$"],"correctAnswer":"A","marks":7,"explanation":"$2^{x+2} = 4^{x-1} = (2^2)^{x-1} = 2^{2(x-1)} = 2^{2x-2}$. So $x + 2 = 2x - 2$, giving $2 + 2 = 2x - x$, thus $x = 4$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Exponential and Logarithmic Functions - Exam Level'
  AND topic = 'A6'
  AND difficulty = 'exam_level'
);

-- Exponential and Logarithmic Functions - Foundational
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Exponential and Logarithmic Functions - Foundational',
  'A6',
  16,
  'foundational',
  20,
  '2025-12-18T23:59:59Z'::timestamptz,
  16,
  '[{"id":1,"type":"mcq","question":"Simplify $2^3 \\times 2^4$.","options":["$2^7$","$2^{12}$","$4^7$","$2^1$"],"correctAnswer":"A","marks":2,"explanation":"Using the law $a^m \\times a^n = a^{m+n}$: $2^3 \\times 2^4 = 2^{3+4} = 2^7$."},{"id":2,"type":"mcq","question":"Evaluate $\\log_2 8$.","options":["$3$","$2$","$4$","$8$"],"correctAnswer":"A","marks":2,"explanation":"$\\log_2 8 = \\log_2 2^3 = 3$, since $2^3 = 8$."},{"id":3,"type":"mcq","question":"Express $3^2 = 9$ in logarithmic form.","options":["$\\log_3 9 = 2$","$\\log_9 3 = 2$","$\\log_2 9 = 3$","$\\log_2 3 = 9$"],"correctAnswer":"A","marks":3,"explanation":"If $a^b = c$, then $\\log_a c = b$. So $3^2 = 9$ becomes $\\log_3 9 = 2$."},{"id":4,"type":"mcq","question":"Simplify $\\frac{5^6}{5^2}$.","options":["$5^4$","$5^3$","$5^8$","$1$"],"correctAnswer":"A","marks":3,"explanation":"Using the law $\\frac{a^m}{a^n} = a^{m-n}$: $\\frac{5^6}{5^2} = 5^{6-2} = 5^4$."},{"id":5,"type":"multi_select","question":"Which of the following are true? (Select all that apply)","options":["$\\log_a a = 1$","$\\log_a 1 = 0$","$\\log_a (xy) = \\log_a x + \\log_a y$","$\\log_a (x+y) = \\log_a x + \\log_a y$"],"correctAnswers":["A","B","C"],"partialCredit":true,"marks":4,"explanation":"$\\log_a a = 1$ ✓ (since $a^1 = a$). $\\log_a 1 = 0$ ✓ (since $a^0 = 1$). $\\log_a(xy) = \\log_a x + \\log_a y$ ✓ (product law). $\\log_a(x+y) \\neq \\log_a x + \\log_a y$ ✗."},{"id":6,"type":"mcq","question":"Evaluate $\\log_{10} 100$.","options":["$2$","$10$","$100$","$1$"],"correctAnswer":"A","marks":2,"explanation":"$\\log_{10} 100 = \\log_{10} 10^2 = 2$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Exponential and Logarithmic Functions - Foundational'
  AND topic = 'A6'
  AND difficulty = 'foundational'
);

-- Exponential and Logarithmic Functions - Intermediate
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  'Exponential and Logarithmic Functions - Intermediate',
  'A6',
  17,
  'intermediate',
  30,
  '2025-12-18T23:59:59Z'::timestamptz,
  32,
  '[{"id":1,"type":"mcq","question":"Solve the equation $2^x = 32$.","options":["$x = 5$","$x = 4$","$x = 6$","$x = 16$"],"correctAnswer":"A","marks":4,"explanation":"$2^x = 32 = 2^5$, so $x = 5$."},{"id":2,"type":"mcq","question":"Solve $\\log_3 x = 4$.","options":["$x = 81$","$x = 12$","$x = 64$","$x = 27$"],"correctAnswer":"A","marks":4,"explanation":"$\\log_3 x = 4$ means $3^4 = x$, so $x = 81$."},{"id":3,"type":"mcq","question":"Simplify $\\log_5 25 + \\log_5 5$.","options":["$3$","$2$","$4$","$5$"],"correctAnswer":"A","marks":5,"explanation":"$\\log_5 25 + \\log_5 5 = \\log_5 5^2 + \\log_5 5 = 2 + 1 = 3$."},{"id":4,"type":"mcq","question":"Solve the equation $3^{2x} = 27$.","options":["$x = \\frac{3}{2}$","$x = 3$","$x = \\frac{2}{3}$","$x = \\frac{9}{2}$"],"correctAnswer":"A","marks":5,"explanation":"$3^{2x} = 27 = 3^3$, so $2x = 3$ and $x = \\frac{3}{2}$."},{"id":5,"type":"multi_select","question":"Given that $\\log_2 x = 3$ and $\\log_2 y = 5$, which of the following are true? (Select all that apply)","options":["$x = 8$","$y = 32$","$\\log_2(xy) = 8$","$\\log_2(\\frac{y}{x}) = 2$"],"correctAnswers":["A","B","C","D"],"partialCredit":true,"marks":5,"explanation":"$\\log_2 x = 3$ gives $x = 2^3 = 8$ ✓. $\\log_2 y = 5$ gives $y = 2^5 = 32$ ✓. $\\log_2(xy) = \\log_2 x + \\log_2 y = 3 + 5 = 8$ ✓. $\\log_2(\\frac{y}{x}) = \\log_2 y - \\log_2 x = 5 - 3 = 2$ ✓."},{"id":6,"type":"mcq","question":"Express $\\log_2 40 - \\log_2 5$ as a single logarithm.","options":["$\\log_2 8$","$\\log_2 35$","$\\log_2 200$","$\\log_2 45$"],"correctAnswer":"A","marks":4,"explanation":"$\\log_2 40 - \\log_2 5 = \\log_2 \\frac{40}{5} = \\log_2 8$."},{"id":7,"type":"mcq","question":"Solve $\\log_x 64 = 3$.","options":["$x = 4$","$x = 8$","$x = 2$","$x = 16$"],"correctAnswer":"A","marks":5,"explanation":"$\\log_x 64 = 3$ means $x^3 = 64$, so $x = \\sqrt[3]{64} = 4$."}]'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  false
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = 'Exponential and Logarithmic Functions - Intermediate'
  AND topic = 'A6'
  AND difficulty = 'intermediate'
);
