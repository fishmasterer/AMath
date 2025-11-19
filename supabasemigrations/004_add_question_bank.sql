-- Create question_bank table with smart tagging
CREATE TABLE IF NOT EXISTS question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL,

  -- Question content
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'short_answer', 'structured')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  marks DECIMAL(4,2) NOT NULL DEFAULT 1,

  -- MCQ specific fields
  options JSONB, -- [{text: string, correct: boolean}]

  -- Answer and explanation
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  solution_steps JSONB, -- [{ step: string, equation: string }]

  -- Tagging system
  topic TEXT NOT NULL, -- A1, A2, ..., G1, G2, ..., C1
  subtopics TEXT[], -- ['Completing the square', 'Quadratic formula']
  keywords TEXT[], -- Searchable keywords

  -- Source tracking
  source_type TEXT CHECK (source_type IN ('past_paper', 'textbook', 'custom', 'online')),
  source_reference TEXT, -- e.g., "2023 O-Level Paper 2 Q5"
  source_year INTEGER,
  source_school TEXT,

  -- Usage tracking
  times_used INTEGER DEFAULT 0,
  avg_student_score DECIMAL(5,2),
  last_used_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Graph support
  has_graph BOOLEAN DEFAULT FALSE,
  graph_config JSONB
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_question_bank_topic ON question_bank(topic);
CREATE INDEX IF NOT EXISTS idx_question_bank_difficulty ON question_bank(difficulty);
CREATE INDEX IF NOT EXISTS idx_question_bank_tutor ON question_bank(tutor_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_source_year ON question_bank(source_year);
CREATE INDEX IF NOT EXISTS idx_question_bank_subtopics ON question_bank USING GIN(subtopics);
CREATE INDEX IF NOT EXISTS idx_question_bank_keywords ON question_bank USING GIN(keywords);

-- Create question_collections table for organizing questions
CREATE TABLE IF NOT EXISTS question_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  question_ids UUID[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_question_collections_tutor ON question_collections(tutor_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_question_bank_updated_at BEFORE UPDATE ON question_bank
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_question_collections_updated_at BEFORE UPDATE ON question_collections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
