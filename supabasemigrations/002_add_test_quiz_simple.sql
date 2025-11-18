-- Simple Test Quiz Migration
-- INSTRUCTIONS: Replace YOUR_TUTOR_UUID_HERE with your actual tutor user ID
-- You can find your tutor UUID by running: SELECT id FROM profiles WHERE role = 'tutor';

INSERT INTO quizzes (
  title,
  topic,
  week,
  difficulty,
  time_limit_minutes,
  due_date,
  total_marks,
  questions,
  created_by,
  published
) VALUES (
  'Quadratic Functions - Test Quiz',
  'A1',
  1,
  'foundational',
  20,
  NOW() + INTERVAL '30 days',
  10,
  '[
    {
      "id": 1,
      "type": "mcq",
      "text": "What is the standard form of a quadratic equation?",
      "options": [
        "$ax + b = 0$",
        "$ax^2 + bx + c = 0$",
        "$ax^3 + bx^2 + cx + d = 0$",
        "$a + b = c$"
      ],
      "correctAnswer": 1,
      "marks": 2,
      "explanation": "The standard form of a quadratic equation is $ax^2 + bx + c = 0$ where $a \\neq 0$."
    },
    {
      "id": 2,
      "type": "mcq",
      "text": "If the discriminant $\\Delta = b^2 - 4ac > 0$, how many real roots does the quadratic equation have?",
      "options": [
        "No real roots",
        "One real root",
        "Two distinct real roots",
        "Infinitely many roots"
      ],
      "correctAnswer": 2,
      "marks": 2,
      "explanation": "When $\\Delta > 0$, the quadratic equation has two distinct real roots."
    },
    {
      "id": 3,
      "type": "mcq",
      "text": "What is the value of the discriminant for the equation $x^2 - 6x + 9 = 0$?",
      "options": [
        "$0$",
        "$9$",
        "$36$",
        "$-36$"
      ],
      "correctAnswer": 0,
      "marks": 2,
      "explanation": "$\\Delta = b^2 - 4ac = (-6)^2 - 4(1)(9) = 36 - 36 = 0$. This means the equation has one repeated real root."
    },
    {
      "id": 4,
      "type": "multi_select",
      "text": "Which of the following are valid methods for solving a quadratic equation? (Select all that apply)",
      "options": [
        "Factorization",
        "Completing the square",
        "Quadratic formula",
        "Linear interpolation"
      ],
      "correctAnswer": [0, 1, 2],
      "marks": 2,
      "explanation": "Factorization, completing the square, and the quadratic formula are all valid methods for solving quadratic equations. Linear interpolation is not a method for solving quadratic equations."
    },
    {
      "id": 5,
      "type": "mcq",
      "text": "For the quadratic function $y = x^2 - 4x + 3$, what is the x-coordinate of the vertex?",
      "options": [
        "$x = -2$",
        "$x = 2$",
        "$x = 3$",
        "$x = 4$"
      ],
      "correctAnswer": 1,
      "marks": 2,
      "explanation": "The x-coordinate of the vertex is given by $x = -\\frac{b}{2a} = -\\frac{-4}{2(1)} = 2$."
    }
  ]'::jsonb,
  'YOUR_TUTOR_UUID_HERE', -- REPLACE THIS with your actual tutor UUID
  true
);

-- After inserting, verify the quiz was created:
-- SELECT id, title, topic, published FROM quizzes ORDER BY created_at DESC LIMIT 1;
