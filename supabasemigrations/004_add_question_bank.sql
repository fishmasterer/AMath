-- AMath Tutor: Comprehensive Question Bank System
-- Migration: 004_add_question_bank
-- Purpose: Combined question bank supporting both MCQ quizzes and paper-based homework

-- Create trigger function for updated_at (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Comprehensive question bank table
CREATE TABLE IF NOT EXISTS question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID, -- NULL for pre-populated textbook questions

  -- Smart tagging system (for paper homework: A1.1.1, G2.3.2)
  question_code TEXT UNIQUE, -- e.g., A1.1.1 (Topic.Chapter.Question)
  topic TEXT NOT NULL CHECK (topic IN ('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'G1', 'G2', 'G3', 'C1')),
  subtopics TEXT[], -- ['Completing the square', 'Quadratic formula']
  keywords TEXT[], -- Searchable keywords

  -- Question content
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'multi_select', 'short_answer', 'structured', 'exam', 'practice')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('foundational', 'intermediate', 'exam_level', 'Easy', 'Medium', 'Hard')),
  marks DECIMAL(4,2) NOT NULL DEFAULT 1,

  -- MCQ specific fields
  options JSONB, -- [{text: string, correct: boolean}] or simple array for MCQ

  -- Answer and explanation
  correct_answer TEXT NOT NULL, -- Can be answer text for paper questions
  answer_text TEXT, -- Detailed solution for paper homework
  explanation TEXT,
  solution_steps JSONB, -- [{ step: string, equation: string }]

  -- Source tracking
  source_type TEXT CHECK (source_type IN ('past_paper', 'textbook', 'custom', 'online')),
  source_reference TEXT, -- e.g., "2023 O-Level Paper 2 Q5" or "2023 Mock Exam"
  source_year INTEGER,
  source_school TEXT,

  -- Usage tracking
  times_used INTEGER DEFAULT 0,
  avg_student_score DECIMAL(5,2),
  last_used_at TIMESTAMP WITH TIME ZONE,

  -- Graph support
  has_graph BOOLEAN DEFAULT FALSE,
  graph_config JSONB,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student homework assignments table (for paper-based homework)
CREATE TABLE IF NOT EXISTS homework_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES question_bank(id) ON DELETE CASCADE NOT NULL,
  assigned_by UUID REFERENCES profiles(id) NOT NULL, -- tutor who assigned
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  due_date TIMESTAMPTZ,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  notes TEXT, -- Student's notes or tutor's feedback
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, question_id)
);

-- Question collections table for organizing questions
CREATE TABLE IF NOT EXISTS question_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  question_ids UUID[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance indexes for question_bank
CREATE INDEX IF NOT EXISTS idx_question_bank_topic ON question_bank(topic);
CREATE INDEX IF NOT EXISTS idx_question_bank_code ON question_bank(question_code) WHERE question_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_question_bank_type ON question_bank(question_type);
CREATE INDEX IF NOT EXISTS idx_question_bank_difficulty ON question_bank(difficulty);
CREATE INDEX IF NOT EXISTS idx_question_bank_tutor ON question_bank(tutor_id) WHERE tutor_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_question_bank_source_year ON question_bank(source_year);
CREATE INDEX IF NOT EXISTS idx_question_bank_subtopics ON question_bank USING GIN(subtopics);
CREATE INDEX IF NOT EXISTS idx_question_bank_keywords ON question_bank USING GIN(keywords);

-- Indexes for homework_assignments
CREATE INDEX IF NOT EXISTS idx_homework_assignments_student ON homework_assignments(student_id);
CREATE INDEX IF NOT EXISTS idx_homework_assignments_question ON homework_assignments(question_id);
CREATE INDEX IF NOT EXISTS idx_homework_assignments_due_date ON homework_assignments(due_date);
CREATE INDEX IF NOT EXISTS idx_homework_assignments_completed ON homework_assignments(completed);

-- Indexes for question_collections
CREATE INDEX IF NOT EXISTS idx_question_collections_tutor ON question_collections(tutor_id);

-- Triggers for updated_at
CREATE TRIGGER update_question_bank_updated_at BEFORE UPDATE ON question_bank
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_question_collections_updated_at BEFORE UPDATE ON question_collections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_collections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for question_bank
-- Students can view all questions (for browsing and self-study)
CREATE POLICY "Anyone can view questions"
  ON question_bank FOR SELECT
  USING (true);

-- Only tutors can insert/update/delete questions
CREATE POLICY "Tutors can manage questions"
  ON question_bank FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

-- RLS Policies for homework_assignments
-- Students can view their own assignments
CREATE POLICY "Students can view own assignments"
  ON homework_assignments FOR SELECT
  USING (
    student_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

-- Students can update their own assignments (mark as completed, add notes)
CREATE POLICY "Students can update own assignments"
  ON homework_assignments FOR UPDATE
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- Tutors can create assignments
CREATE POLICY "Tutors can create assignments"
  ON homework_assignments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

-- Tutors can delete assignments
CREATE POLICY "Tutors can delete assignments"
  ON homework_assignments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

-- RLS Policies for question_collections
-- Tutors can only see their own collections
CREATE POLICY "Tutors can view own collections"
  ON question_collections FOR SELECT
  USING (tutor_id = auth.uid());

-- Tutors can manage their own collections
CREATE POLICY "Tutors can manage own collections"
  ON question_collections FOR ALL
  USING (tutor_id = auth.uid())
  WITH CHECK (tutor_id = auth.uid());

-- Comments for documentation
COMMENT ON TABLE question_bank IS 'Comprehensive question bank for MCQ quizzes and paper-based homework';
COMMENT ON TABLE homework_assignments IS 'Tracks which questions are assigned to which students for paper-based homework';
COMMENT ON TABLE question_collections IS 'Collections of questions organized by tutors';
COMMENT ON COLUMN question_bank.question_code IS 'Unique identifier like A1.1.1 (Topic.Chapter.Question) for paper homework questions';
COMMENT ON COLUMN question_bank.tutor_id IS 'NULL for pre-populated textbook questions, otherwise the tutor who created it';
COMMENT ON COLUMN homework_assignments.notes IS 'Student notes or tutor feedback on the question';
