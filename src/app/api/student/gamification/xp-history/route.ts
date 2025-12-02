import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
 * GET /api/student/gamification/xp-history
 * Returns XP transaction history
 */
export async function GET(request: Request) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const type = searchParams.get('type'); // Filter by XP type

    let query = supabase
      .from('xp_transactions')
      .select('*', { count: 'exact' })
      .eq('student_id', STUDENT_ID)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type) {
      query = query.eq('xp_type', type);
    }

    const { data: transactions, count, error } = await query;

    if (error) {
      throw error;
    }

    // Calculate daily XP for the past 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: dailyActivity } = await supabase
      .from('daily_activity')
      .select('activity_date, xp_earned')
      .eq('student_id', STUDENT_ID)
      .gte('activity_date', sevenDaysAgo.toISOString().split('T')[0])
      .order('activity_date', { ascending: true });

    // Calculate total XP by type
    const { data: xpByType } = await supabase
      .from('xp_transactions')
      .select('xp_type, xp_amount')
      .eq('student_id', STUDENT_ID);

    const xpBreakdown: Record<string, number> = {};
    xpByType?.forEach((tx) => {
      xpBreakdown[tx.xp_type] = (xpBreakdown[tx.xp_type] || 0) + tx.xp_amount;
    });

    return NextResponse.json({
      transactions: transactions || [],
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
      dailyXP: dailyActivity || [],
      xpBreakdown,
    });
  } catch (error) {
    console.error('Error fetching XP history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch XP history' },
      { status: 500 }
    );
  }
}
