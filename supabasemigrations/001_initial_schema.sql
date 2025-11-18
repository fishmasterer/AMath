-- AMath Tutor Database Schema
-- Migration: 001_initial_schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('tutor', 'student')),
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quizzes table
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  topic TEXT NOT NULL CHECK (topic IN ('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'G1', 'G2', 'G3', 'C1')),
  week INTEGER NOT NULL CHECK (week > 0),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('foundational', 'intermediate', 'exam_level')),
  time_limit_minutes INTEGER NOT NULL CHECK (time_limit_minutes > 0),
  due_date TIMESTAMPTZ NOT NULL,
  total_marks INTEGER NOT NULL CHECK (total_marks > 0),
  questions JSONB NOT NULL,
  created_by UUID REFERENCES profiles(id) NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz attempts table
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  answers JSONB NOT NULL DEFAULT '[]',
  score INTEGER,
  total_marks INTEGER,
  time_taken_seconds INTEGER,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(quiz_id, student_id)
);

-- Question results table (for mistake journal)
CREATE TABLE question_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE NOT NULL,
  question_index INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  topic TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'multi_select')),
  student_answer JSONB NOT NULL,
  correct_answer JSONB NOT NULL,
  is_correct BOOLEAN NOT NULL,
  marks_awarded INTEGER NOT NULL,
  marks_possible INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_quizzes_due_date ON quizzes(due_date);
CREATE INDEX idx_quizzes_topic ON quizzes(topic);
CREATE INDEX idx_quizzes_week ON quizzes(week);
CREATE INDEX idx_quizzes_published ON quizzes(published) WHERE published = true;
CREATE INDEX idx_quiz_attempts_student ON quiz_attempts(student_id);
CREATE INDEX idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
CREATE INDEX idx_quiz_attempts_completed ON quiz_attempts(completed);
CREATE INDEX idx_question_results_attempt ON question_results(attempt_id);
CREATE INDEX idx_question_results_topic ON question_results(topic);
CREATE INDEX idx_question_results_incorrect ON question_results(is_correct) WHERE is_correct = false;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- RLS Policies for quizzes
CREATE POLICY "Students can view published quizzes" 
  ON quizzes FOR SELECT 
  USING (
    published = true 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

CREATE POLICY "Tutors can insert quizzes" 
  ON quizzes FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

CREATE POLICY "Tutors can update own quizzes" 
  ON quizzes FOR UPDATE 
  USING (
    created_by = auth.uid() 
    AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

CREATE POLICY "Tutors can delete own quizzes" 
  ON quizzes FOR DELETE 
  USING (
    created_by = auth.uid() 
    AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

-- RLS Policies for quiz_attempts
CREATE POLICY "Students can view own attempts" 
  ON quiz_attempts FOR SELECT 
  USING (
    student_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

CREATE POLICY "Students can create own attempts" 
  ON quiz_attempts FOR INSERT 
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own attempts" 
  ON quiz_attempts FOR UPDATE 
  USING (student_id = auth.uid());

-- RLS Policies for question_results
CREATE POLICY "Students can view own question results" 
  ON question_results FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM quiz_attempts 
      WHERE quiz_attempts.id = question_results.attempt_id 
      AND quiz_attempts.student_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

CREATE POLICY "System can insert question results" 
  ON question_results FOR INSERT 
  WITH CHECK (true);

-- Seed data (example users - you'll create these via Supabase Auth UI)
-- This is just for reference
COMMENT ON TABLE profiles IS 'Extended user profiles. Create users via Supabase Auth, then insert profile record.';
