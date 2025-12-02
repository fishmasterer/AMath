import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  getAchievementsWithProgress,
  getUnlockedAchievements,
  getUnnotifiedAchievements,
  markAchievementsNotified,
} from '@/lib/gamification/achievements';

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
 * GET /api/student/gamification/achievements
 * Returns all achievements with progress
 */
export async function GET(request: Request) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter'); // 'all', 'unlocked', 'unnotified'

    if (filter === 'unlocked') {
      const achievements = await getUnlockedAchievements(supabase, STUDENT_ID);
      return NextResponse.json({ achievements });
    }

    if (filter === 'unnotified') {
      const achievements = await getUnnotifiedAchievements(supabase, STUDENT_ID);
      return NextResponse.json({ achievements });
    }

    // Default: return all with progress
    const achievementProgress = await getAchievementsWithProgress(supabase, STUDENT_ID);
    const unlocked = await getUnlockedAchievements(supabase, STUDENT_ID);

    // Group by category
    const byCategory = achievementProgress.reduce((acc, ap) => {
      const category = ap.achievement.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(ap);
      return acc;
    }, {} as Record<string, typeof achievementProgress>);

    // Summary stats
    const totalAchievements = achievementProgress.length;
    const unlockedCount = achievementProgress.filter(a => a.isUnlocked).length;
    const totalXPFromAchievements = unlocked.reduce(
      (sum, a) => sum + ((a.achievement as { xp_reward?: number })?.xp_reward || 0),
      0
    );

    return NextResponse.json({
      achievements: achievementProgress,
      byCategory,
      summary: {
        total: totalAchievements,
        unlocked: unlockedCount,
        locked: totalAchievements - unlockedCount,
        completionPercentage: Math.round((unlockedCount / totalAchievements) * 100),
        totalXPEarned: totalXPFromAchievements,
      },
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/student/gamification/achievements
 * Mark achievements as notified
 */
export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    if (!body.achievementIds || !Array.isArray(body.achievementIds)) {
      return NextResponse.json(
        { error: 'achievementIds array required' },
        { status: 400 }
      );
    }

    await markAchievementsNotified(supabase, STUDENT_ID, body.achievementIds);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking achievements as notified:', error);
    return NextResponse.json(
      { error: 'Failed to mark achievements as notified' },
      { status: 500 }
    );
  }
}
