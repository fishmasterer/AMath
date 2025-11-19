-- AMath Tutor: User Preferences and Cross-Device Sync
-- Migration: 003_add_user_sync_features
-- Purpose: Enable user preferences and session state to sync across devices

-- User preferences table
CREATE TABLE user_preferences (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  show_latex BOOLEAN DEFAULT true,
  show_explanations BOOLEAN DEFAULT true,
  auto_save BOOLEAN DEFAULT true,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  preferences JSONB DEFAULT '{}', -- Flexible JSON for additional settings
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz session state table (for syncing active quiz sessions across devices)
CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  current_question INTEGER DEFAULT 0,
  time_remaining_seconds INTEGER,
  session_data JSONB DEFAULT '{}', -- Flexible session state (bookmarks, flags, etc.)
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(quiz_id, student_id)
);

-- Performance indexes
CREATE INDEX idx_user_preferences_user ON user_preferences(user_id);
CREATE INDEX idx_quiz_sessions_student ON quiz_sessions(student_id);
CREATE INDEX idx_quiz_sessions_quiz ON quiz_sessions(quiz_id);
CREATE INDEX idx_quiz_sessions_activity ON quiz_sessions(last_activity);

-- Apply updated_at trigger to user_preferences
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update last_activity on quiz_sessions
CREATE OR REPLACE FUNCTION update_quiz_session_activity()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_activity = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quiz_sessions_activity BEFORE UPDATE ON quiz_sessions
  FOR EACH ROW EXECUTE FUNCTION update_quiz_session_activity();

-- Enable Row Level Security
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_preferences
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for quiz_sessions
CREATE POLICY "Students can view own quiz sessions"
  ON quiz_sessions FOR SELECT
  USING (
    student_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'tutor'
    )
  );

CREATE POLICY "Students can create own quiz sessions"
  ON quiz_sessions FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own quiz sessions"
  ON quiz_sessions FOR UPDATE
  USING (student_id = auth.uid());

CREATE POLICY "Students can delete own quiz sessions"
  ON quiz_sessions FOR DELETE
  USING (student_id = auth.uid());

-- Function to automatically create default preferences for new users
CREATE OR REPLACE FUNCTION create_default_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create default preferences when a profile is created
CREATE TRIGGER create_user_preferences_on_profile_creation
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_default_user_preferences();

-- Cleanup function to remove stale quiz sessions (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_stale_quiz_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM quiz_sessions
  WHERE last_activity < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE user_preferences IS 'Stores user preferences that sync across devices (theme, display settings, etc.)';
COMMENT ON TABLE quiz_sessions IS 'Stores active quiz session state for cross-device sync (current question, time remaining, etc.)';
COMMENT ON FUNCTION cleanup_stale_quiz_sessions() IS 'Run periodically to clean up abandoned quiz sessions older than 24 hours';
