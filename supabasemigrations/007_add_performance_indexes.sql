-- Performance indexes for faster queries
-- Run this migration to improve query performance across the application

-- Index for quiz_attempts - commonly filtered by student_id and completed status
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student_completed
ON quiz_attempts(student_id, completed);

-- Index for quiz_attempts - commonly filtered by quiz_id
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id
ON quiz_attempts(quiz_id);

-- Index for quiz_attempts - ordering by submitted_at
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_submitted_at
ON quiz_attempts(submitted_at DESC);

-- Index for question_results - commonly filtered by is_correct
CREATE INDEX IF NOT EXISTS idx_question_results_is_correct
ON question_results(is_correct);

-- Index for question_results - ordering by created_at
CREATE INDEX IF NOT EXISTS idx_question_results_created_at
ON question_results(created_at DESC);

-- Index for xp_transactions - commonly filtered by student_id and ordered by created_at
CREATE INDEX IF NOT EXISTS idx_xp_transactions_student_created
ON xp_transactions(student_id, created_at DESC);

-- Index for student_gamification - commonly filtered by student_id
CREATE INDEX IF NOT EXISTS idx_student_gamification_student_id
ON student_gamification(student_id);

-- Index for homework_assignments - commonly filtered by student_id
CREATE INDEX IF NOT EXISTS idx_homework_assignments_student_id
ON homework_assignments(student_id);

-- Index for quizzes - commonly filtered by published status
CREATE INDEX IF NOT EXISTS idx_quizzes_published
ON quizzes(published);

-- Index for quizzes - ordering by due_date
CREATE INDEX IF NOT EXISTS idx_quizzes_due_date
ON quizzes(due_date);

-- Index for daily_activity - composite index for common queries
CREATE INDEX IF NOT EXISTS idx_daily_activity_student_date
ON daily_activity(student_id, activity_date DESC);
