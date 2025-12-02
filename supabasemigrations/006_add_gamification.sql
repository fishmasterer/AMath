-- AMath Tutor: Gamification System
-- Migration: 006_add_gamification
-- Purpose: Add XP, levels, streaks, achievements, and daily goals

-- ============================================================================
-- STUDENT GAMIFICATION PROFILE
-- ============================================================================

CREATE TABLE student_gamification (
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,

  -- XP & Levels
  total_xp INTEGER DEFAULT 0 NOT NULL,
  current_level INTEGER DEFAULT 1 NOT NULL,
  current_rank TEXT DEFAULT 'bronze' CHECK (current_rank IN ('bronze', 'silver', 'gold', 'platinum', 'diamond', 'master')),

  -- Streaks
  current_streak INTEGER DEFAULT 0 NOT NULL,
  longest_streak INTEGER DEFAULT 0 NOT NULL,
  last_activity_date DATE,
  streak_freeze_count INTEGER DEFAULT 0 NOT NULL, -- Available streak freezes

  -- Daily Goals
  daily_xp_goal INTEGER DEFAULT 50 NOT NULL,
  daily_xp_earned INTEGER DEFAULT 0 NOT NULL,
  daily_goal_streak INTEGER DEFAULT 0 NOT NULL, -- Days in a row daily goal was met

  -- Stats
  total_quizzes_completed INTEGER DEFAULT 0 NOT NULL,
  total_perfect_scores INTEGER DEFAULT 0 NOT NULL,
  total_lessons_completed INTEGER DEFAULT 0 NOT NULL,
  total_practice_sessions INTEGER DEFAULT 0 NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- XP TRANSACTIONS (Audit log of all XP earned)
-- ============================================================================

CREATE TABLE xp_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  xp_amount INTEGER NOT NULL,
  xp_type TEXT NOT NULL CHECK (xp_type IN (
    'quiz_completion',
    'quiz_perfect',
    'quiz_improvement',
    'lesson_completion',
    'practice_session',
    'daily_goal_bonus',
    'streak_bonus',
    'achievement_bonus',
    'first_of_day',
    'challenge_completion',
    'topic_mastery'
  )),

  -- Optional references
  reference_id UUID, -- quiz_id, lesson_id, etc.
  reference_type TEXT, -- 'quiz', 'lesson', 'achievement', etc.

  -- Multipliers applied
  difficulty_multiplier DECIMAL(3,2) DEFAULT 1.0,
  streak_multiplier DECIMAL(3,2) DEFAULT 1.0,

  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ACHIEVEMENTS (Definition table)
-- ============================================================================

CREATE TABLE achievements (
  id TEXT PRIMARY KEY, -- e.g., 'first_quiz', 'streak_7', 'perfect_score'

  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'quiz', 'streak', 'mastery', 'practice', 'milestone', 'special'
  )),

  -- Visual
  icon TEXT NOT NULL, -- Emoji or icon name
  badge_color TEXT DEFAULT 'blue', -- 'blue', 'green', 'gold', 'purple', 'rainbow'

  -- Requirements
  requirement_type TEXT NOT NULL, -- 'count', 'streak', 'score', 'topic', 'special'
  requirement_value INTEGER DEFAULT 1, -- The threshold to achieve
  requirement_topic TEXT, -- For topic-specific achievements

  -- Rewards
  xp_reward INTEGER DEFAULT 0,
  is_hidden BOOLEAN DEFAULT false, -- Hidden until unlocked
  is_repeatable BOOLEAN DEFAULT false, -- Can be earned multiple times

  -- Ordering
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STUDENT ACHIEVEMENTS (Junction table)
-- ============================================================================

CREATE TABLE student_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id TEXT REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,

  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  times_earned INTEGER DEFAULT 1, -- For repeatable achievements
  progress INTEGER DEFAULT 0, -- Current progress towards achievement
  notified BOOLEAN DEFAULT false, -- Has the student seen this?

  UNIQUE(student_id, achievement_id)
);

-- ============================================================================
-- DAILY ACTIVITY LOG
-- ============================================================================

CREATE TABLE daily_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  activity_date DATE NOT NULL,

  xp_earned INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  practice_sessions INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  daily_goal_met BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(student_id, activity_date)
);

-- ============================================================================
-- LEVEL THRESHOLDS (Reference table)
-- ============================================================================

CREATE TABLE level_thresholds (
  level INTEGER PRIMARY KEY,
  xp_required INTEGER NOT NULL,
  rank TEXT NOT NULL CHECK (rank IN ('bronze', 'silver', 'gold', 'platinum', 'diamond', 'master')),
  title TEXT NOT NULL -- e.g., "Math Novice", "Equation Explorer"
);

-- Insert level thresholds (Duolingo-inspired progression)
INSERT INTO level_thresholds (level, xp_required, rank, title) VALUES
  (1, 0, 'bronze', 'Math Novice'),
  (2, 100, 'bronze', 'Number Explorer'),
  (3, 250, 'bronze', 'Equation Learner'),
  (4, 500, 'bronze', 'Problem Solver'),
  (5, 850, 'bronze', 'Math Apprentice'),
  (6, 1300, 'silver', 'Function Finder'),
  (7, 1850, 'silver', 'Graph Grapher'),
  (8, 2500, 'silver', 'Algebra Adept'),
  (9, 3300, 'silver', 'Formula Master'),
  (10, 4250, 'silver', 'Math Enthusiast'),
  (11, 5350, 'gold', 'Quadratic Queen'),
  (12, 6600, 'gold', 'Trig Tactician'),
  (13, 8000, 'gold', 'Calculus Cadet'),
  (14, 9600, 'gold', 'Proof Pioneer'),
  (15, 11400, 'gold', 'Math Warrior'),
  (16, 13400, 'platinum', 'Equation Expert'),
  (17, 15600, 'platinum', 'Function Virtuoso'),
  (18, 18000, 'platinum', 'Graph Genius'),
  (19, 20600, 'platinum', 'Algebra Ace'),
  (20, 23500, 'platinum', 'Math Champion'),
  (21, 26700, 'diamond', 'Calculus Commander'),
  (22, 30200, 'diamond', 'Proof Prodigy'),
  (23, 34000, 'diamond', 'Formula Legend'),
  (24, 38100, 'diamond', 'Math Mastermind'),
  (25, 42500, 'diamond', 'Number Ninja'),
  (26, 47500, 'master', 'A-Math Sage'),
  (27, 53000, 'master', 'Equation Emperor'),
  (28, 59000, 'master', 'Math Monarch'),
  (29, 65500, 'master', 'Ultimate Scholar'),
  (30, 72500, 'master', 'A-Math Legend');

-- ============================================================================
-- SEED ACHIEVEMENTS
-- ============================================================================

INSERT INTO achievements (id, name, description, category, icon, badge_color, requirement_type, requirement_value, xp_reward, sort_order) VALUES
  -- Getting Started
  ('first_quiz', 'First Steps', 'Complete your first quiz', 'quiz', '🎯', 'blue', 'count', 1, 50, 1),
  ('first_perfect', 'Perfectionist', 'Score 100% on a quiz', 'quiz', '💯', 'gold', 'score', 100, 100, 2),
  ('first_lesson', 'Knowledge Seeker', 'Complete your first lesson', 'milestone', '📚', 'blue', 'count', 1, 25, 3),

  -- Quiz Milestones
  ('quiz_5', 'Quiz Enthusiast', 'Complete 5 quizzes', 'quiz', '📝', 'blue', 'count', 5, 75, 10),
  ('quiz_10', 'Quiz Expert', 'Complete 10 quizzes', 'quiz', '📝', 'green', 'count', 10, 150, 11),
  ('quiz_25', 'Quiz Master', 'Complete 25 quizzes', 'quiz', '📝', 'gold', 'count', 25, 300, 12),
  ('quiz_50', 'Quiz Legend', 'Complete 50 quizzes', 'quiz', '📝', 'purple', 'count', 50, 500, 13),
  ('quiz_100', 'Quiz Champion', 'Complete 100 quizzes', 'quiz', '🏆', 'rainbow', 'count', 100, 1000, 14),

  -- Perfect Scores
  ('perfect_3', 'Triple Threat', 'Get 3 perfect scores', 'quiz', '⭐', 'gold', 'count', 3, 150, 20),
  ('perfect_5', 'High Achiever', 'Get 5 perfect scores', 'quiz', '⭐', 'gold', 'count', 5, 250, 21),
  ('perfect_10', 'Flawless Fighter', 'Get 10 perfect scores', 'quiz', '🌟', 'gold', 'count', 10, 500, 22),

  -- Streaks
  ('streak_3', 'On Fire', '3-day streak', 'streak', '🔥', 'orange', 'streak', 3, 50, 30),
  ('streak_7', 'Week Warrior', '7-day streak', 'streak', '🔥', 'orange', 'streak', 7, 150, 31),
  ('streak_14', 'Fortnight Force', '14-day streak', 'streak', '🔥', 'red', 'streak', 14, 300, 32),
  ('streak_30', 'Monthly Master', '30-day streak', 'streak', '🔥', 'purple', 'streak', 30, 750, 33),
  ('streak_60', 'Dedication King', '60-day streak', 'streak', '👑', 'gold', 'streak', 60, 1500, 34),
  ('streak_100', 'Unstoppable', '100-day streak', 'streak', '💎', 'rainbow', 'streak', 100, 3000, 35),

  -- Topic Mastery
  ('master_A1', 'Quadratic Conqueror', 'Master Quadratic Functions', 'mastery', '📐', 'green', 'topic', 90, 200, 40),
  ('master_A2', 'Equation Expert', 'Master Equations & Inequalities', 'mastery', '⚖️', 'green', 'topic', 90, 200, 41),
  ('master_A3', 'Surd Specialist', 'Master Surds', 'mastery', '√', 'green', 'topic', 90, 200, 42),
  ('master_A4', 'Polynomial Pro', 'Master Polynomials', 'mastery', '📊', 'green', 'topic', 90, 200, 43),
  ('master_A5', 'Binomial Boss', 'Master Binomial Expansions', 'mastery', '🎰', 'green', 'topic', 90, 200, 44),
  ('master_A6', 'Logarithm Lord', 'Master Exponentials & Logs', 'mastery', '📈', 'green', 'topic', 90, 200, 45),
  ('master_G1', 'Trig Titan', 'Master Trigonometry', 'mastery', '📐', 'green', 'topic', 90, 200, 46),
  ('master_G2', 'Geometry Guru', 'Master Coordinate Geometry', 'mastery', '📍', 'green', 'topic', 90, 200, 47),
  ('master_G3', 'Proof Pro', 'Master Geometric Proofs', 'mastery', '✓', 'green', 'topic', 90, 200, 48),
  ('master_C1', 'Calculus Champion', 'Master Calculus', 'mastery', '∫', 'green', 'topic', 90, 200, 49),
  ('master_all', 'A-Math Master', 'Master all topics', 'mastery', '🎓', 'rainbow', 'special', 1, 2000, 50),

  -- Daily Goals
  ('daily_goal_3', 'Consistent Learner', 'Meet daily goal 3 days in a row', 'milestone', '✅', 'blue', 'count', 3, 75, 60),
  ('daily_goal_7', 'Weekly Winner', 'Meet daily goal 7 days in a row', 'milestone', '✅', 'green', 'count', 7, 200, 61),
  ('daily_goal_30', 'Monthly Achiever', 'Meet daily goal 30 days in a row', 'milestone', '✅', 'gold', 'count', 30, 1000, 62),

  -- Level Milestones
  ('level_5', 'Rising Star', 'Reach Level 5', 'milestone', '⬆️', 'blue', 'count', 5, 100, 70),
  ('level_10', 'Double Digits', 'Reach Level 10', 'milestone', '⬆️', 'green', 'count', 10, 250, 71),
  ('level_15', 'Halfway Hero', 'Reach Level 15', 'milestone', '⬆️', 'gold', 'count', 15, 500, 72),
  ('level_20', 'Score Twenty', 'Reach Level 20', 'milestone', '⬆️', 'purple', 'count', 20, 1000, 73),
  ('level_25', 'Quarter Century', 'Reach Level 25', 'milestone', '⬆️', 'diamond', 'count', 25, 2000, 74),
  ('level_30', 'Maximum Level', 'Reach Level 30', 'milestone', '👑', 'rainbow', 'count', 30, 5000, 75),

  -- XP Milestones
  ('xp_1000', 'Thousand Club', 'Earn 1,000 XP', 'milestone', '💫', 'blue', 'count', 1000, 100, 80),
  ('xp_5000', 'XP Hunter', 'Earn 5,000 XP', 'milestone', '💫', 'green', 'count', 5000, 250, 81),
  ('xp_10000', 'XP Master', 'Earn 10,000 XP', 'milestone', '💫', 'gold', 'count', 10000, 500, 82),
  ('xp_25000', 'XP Legend', 'Earn 25,000 XP', 'milestone', '💫', 'purple', 'count', 25000, 1000, 83),
  ('xp_50000', 'XP Champion', 'Earn 50,000 XP', 'milestone', '🌟', 'rainbow', 'count', 50000, 2500, 84),

  -- Special/Fun Achievements
  ('early_bird', 'Early Bird', 'Complete a quiz before 7 AM', 'special', '🌅', 'blue', 'special', 1, 50, 90),
  ('night_owl', 'Night Owl', 'Complete a quiz after 11 PM', 'special', '🦉', 'purple', 'special', 1, 50, 91),
  ('weekend_warrior', 'Weekend Warrior', 'Study on both Saturday and Sunday', 'special', '💪', 'blue', 'special', 1, 75, 92),
  ('comeback_kid', 'Comeback Kid', 'Improve your score by 20% on retry', 'special', '📈', 'green', 'special', 1, 100, 93),
  ('speed_demon', 'Speed Demon', 'Complete a quiz in under half the time limit', 'special', '⚡', 'gold', 'special', 1, 150, 94);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_student_gamification_level ON student_gamification(current_level);
CREATE INDEX idx_student_gamification_xp ON student_gamification(total_xp);
CREATE INDEX idx_student_gamification_streak ON student_gamification(current_streak);
CREATE INDEX idx_xp_transactions_student ON xp_transactions(student_id);
CREATE INDEX idx_xp_transactions_created ON xp_transactions(created_at);
CREATE INDEX idx_xp_transactions_type ON xp_transactions(xp_type);
CREATE INDEX idx_student_achievements_student ON student_achievements(student_id);
CREATE INDEX idx_student_achievements_achievement ON student_achievements(achievement_id);
CREATE INDEX idx_student_achievements_unlocked ON student_achievements(unlocked_at);
CREATE INDEX idx_daily_activity_student ON daily_activity(student_id);
CREATE INDEX idx_daily_activity_date ON daily_activity(activity_date);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Apply updated_at trigger
CREATE TRIGGER update_student_gamification_updated_at BEFORE UPDATE ON student_gamification
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_activity_updated_at BEFORE UPDATE ON daily_activity
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create gamification profile for new students
CREATE OR REPLACE FUNCTION create_student_gamification_profile()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'student' THEN
    INSERT INTO student_gamification (student_id)
    VALUES (NEW.id)
    ON CONFLICT (student_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_gamification_on_profile_creation
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_student_gamification_profile();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE student_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_thresholds ENABLE ROW LEVEL SECURITY;

-- student_gamification policies
CREATE POLICY "Students can view own gamification"
  ON student_gamification FOR SELECT
  USING (
    student_id = auth.uid()
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'tutor')
  );

CREATE POLICY "System can update student gamification"
  ON student_gamification FOR UPDATE
  USING (student_id = auth.uid());

CREATE POLICY "System can insert student gamification"
  ON student_gamification FOR INSERT
  WITH CHECK (true);

-- xp_transactions policies
CREATE POLICY "Students can view own xp transactions"
  ON xp_transactions FOR SELECT
  USING (
    student_id = auth.uid()
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'tutor')
  );

CREATE POLICY "System can insert xp transactions"
  ON xp_transactions FOR INSERT
  WITH CHECK (true);

-- achievements policies (public read)
CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  USING (true);

-- student_achievements policies
CREATE POLICY "Students can view own achievements"
  ON student_achievements FOR SELECT
  USING (
    student_id = auth.uid()
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'tutor')
  );

CREATE POLICY "System can insert student achievements"
  ON student_achievements FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update student achievements"
  ON student_achievements FOR UPDATE
  USING (student_id = auth.uid());

-- daily_activity policies
CREATE POLICY "Students can view own daily activity"
  ON daily_activity FOR SELECT
  USING (
    student_id = auth.uid()
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'tutor')
  );

CREATE POLICY "System can insert daily activity"
  ON daily_activity FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update daily activity"
  ON daily_activity FOR UPDATE
  USING (student_id = auth.uid());

-- level_thresholds policies (public read)
CREATE POLICY "Anyone can view level thresholds"
  ON level_thresholds FOR SELECT
  USING (true);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Get level from XP
CREATE OR REPLACE FUNCTION get_level_from_xp(xp INTEGER)
RETURNS INTEGER AS $$
DECLARE
  result_level INTEGER;
BEGIN
  SELECT level INTO result_level
  FROM level_thresholds
  WHERE xp_required <= xp
  ORDER BY level DESC
  LIMIT 1;

  RETURN COALESCE(result_level, 1);
END;
$$ LANGUAGE plpgsql;

-- Get rank from level
CREATE OR REPLACE FUNCTION get_rank_from_level(lvl INTEGER)
RETURNS TEXT AS $$
DECLARE
  result_rank TEXT;
BEGIN
  SELECT rank INTO result_rank
  FROM level_thresholds
  WHERE level = lvl;

  RETURN COALESCE(result_rank, 'bronze');
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON TABLE student_gamification IS 'Core gamification state per student: XP, levels, streaks, daily goals';
COMMENT ON TABLE xp_transactions IS 'Audit log of all XP earned, with source tracking';
COMMENT ON TABLE achievements IS 'Definition of all available achievements';
COMMENT ON TABLE student_achievements IS 'Junction table tracking which achievements each student has unlocked';
COMMENT ON TABLE daily_activity IS 'Daily activity log for streak and daily goal tracking';
COMMENT ON TABLE level_thresholds IS 'XP thresholds for each level and associated rank/title';
