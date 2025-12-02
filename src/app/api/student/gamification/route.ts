import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  getGamificationState,
  initializeGamificationProfile,
  updateDailyGoal,
} from '@/lib/gamification';
import { getAchievementsWithProgress, getUnlockedAchievements } from '@/lib/gamification/achievements';

const STUDENT_ID = '00000000-0000-0000-0000-000000000001';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * GET /api/student/gamification
 * Returns the full gamification state for the student
 */
export async function GET() {
  try {
    const supabase = getSupabase();

    // Get gamification state
    const state = await getGamificationState(supabase, STUDENT_ID);

    // Get achievements with progress
    const achievementProgress = await getAchievementsWithProgress(supabase, STUDENT_ID);

    // Get unlocked achievements
    const unlockedAchievements = await getUnlockedAchievements(supabase, STUDENT_ID);

    // Get recent achievements (last 5 unlocked)
    const recentAchievements = unlockedAchievements.slice(0, 5);

    return NextResponse.json({
      ...state,
      achievementProgress,
      unlockedAchievements,
      recentAchievements,
    });
  } catch (error) {
    console.error('Error fetching gamification state:', error);

    // Try to initialize profile if it doesn't exist
    try {
      const supabase = getSupabase();
      await initializeGamificationProfile(supabase, STUDENT_ID);
      const state = await getGamificationState(supabase, STUDENT_ID);

      return NextResponse.json({
        ...state,
        achievementProgress: [],
        unlockedAchievements: [],
        recentAchievements: [],
      });
    } catch (initError) {
      console.error('Error initializing gamification profile:', initError);
      return NextResponse.json(
        { error: 'Failed to fetch gamification state' },
        { status: 500 }
      );
    }
  }
}

/**
 * PUT /api/student/gamification
 * Update gamification settings (e.g., daily goal)
 */
export async function PUT(request: Request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    if (body.dailyGoal !== undefined) {
      // Validate daily goal
      const goal = parseInt(body.dailyGoal);
      if (isNaN(goal) || goal < 20 || goal > 200) {
        return NextResponse.json(
          { error: 'Daily goal must be between 20 and 200 XP' },
          { status: 400 }
        );
      }

      await updateDailyGoal(supabase, STUDENT_ID, goal);
    }

    // Return updated state
    const state = await getGamificationState(supabase, STUDENT_ID);

    return NextResponse.json(state);
  } catch (error) {
    console.error('Error updating gamification settings:', error);
    return NextResponse.json(
      { error: 'Failed to update gamification settings' },
      { status: 500 }
    );
  }
}
