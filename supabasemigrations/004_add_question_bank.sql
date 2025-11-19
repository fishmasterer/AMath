-- AMath Tutor: Question Bank for Paper-based Homework
-- Migration: 004_add_question_bank
-- Purpose: Store practice questions from O-Level textbook for homework assignments

-- Question bank table
CREATE TABLE question_bank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_code TEXT UNIQUE NOT NULL, -- e.g., A1.1.1, G2.3.2
  topic TEXT NOT NULL CHECK (topic IN ('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'G1', 'G2', 'G3', 'C1')),
  question_type TEXT NOT NULL CHECK (question_type IN ('exam', 'practice')),
  question_text TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  marks INTEGER,
  difficulty TEXT CHECK (difficulty IN ('foundational', 'intermediate', 'exam_level')),
  source TEXT, -- e.g., "2023 Mock Exam", "Textbook Practice"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student homework assignments table
CREATE TABLE homework_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Performance indexes
CREATE INDEX idx_question_bank_topic ON question_bank(topic);
CREATE INDEX idx_question_bank_code ON question_bank(question_code);
CREATE INDEX idx_question_bank_type ON question_bank(question_type);
CREATE INDEX idx_homework_assignments_student ON homework_assignments(student_id);
CREATE INDEX idx_homework_assignments_question ON homework_assignments(question_id);
CREATE INDEX idx_homework_assignments_due_date ON homework_assignments(due_date);
CREATE INDEX idx_homework_assignments_completed ON homework_assignments(completed);

-- Apply updated_at trigger to question_bank
CREATE TRIGGER update_question_bank_updated_at BEFORE UPDATE ON question_bank
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_assignments ENABLE ROW LEVEL SECURITY;

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

-- Comments for documentation
COMMENT ON TABLE question_bank IS 'Repository of practice questions from O-Level textbook for paper-based homework';
COMMENT ON TABLE homework_assignments IS 'Tracks which questions are assigned to which students';
COMMENT ON COLUMN question_bank.question_code IS 'Unique identifier like A1.1.1 (Topic.Chapter.Question)';
COMMENT ON COLUMN homework_assignments.notes IS 'Student notes or tutor feedback on the question';
