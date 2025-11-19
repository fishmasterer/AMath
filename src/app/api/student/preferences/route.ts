import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { UserPreferences } from '@/lib/types'

export async function GET() {
  try {
    const studentId = '00000000-0000-0000-0000-000000000001'; // Single student setup

    // Use service role to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Fetch preferences from Supabase
    const { data: preferences, error: preferencesError } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', studentId)
      .single()

    // If no preferences exist, create default ones
    if (preferencesError && preferencesError.code === 'PGRST116') {
      const { data: newPreferences, error: createError } = await supabase
        .from('user_preferences')
        .insert({
          user_id: studentId,
          show_latex: true,
          show_explanations: true,
          auto_save: true,
          theme: 'system',
          preferences: {}
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating default preferences:', createError)
        return NextResponse.json(
          { error: 'Failed to create preferences' },
          { status: 500 }
        )
      }

      return NextResponse.json(newPreferences)
    }

    if (preferencesError) {
      console.error('Error fetching preferences:', preferencesError)
      return NextResponse.json(
        { error: 'Failed to fetch preferences' },
        { status: 500 }
      )
    }

    return NextResponse.json(preferences)
  } catch (error) {
    console.error('Error fetching preferences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const studentId = '00000000-0000-0000-0000-000000000001'; // Single student setup
    const body = await request.json()

    // Use service role to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Prepare update data
    const updateData: Partial<UserPreferences> = {}
    if (body.show_latex !== undefined) updateData.show_latex = body.show_latex
    if (body.show_explanations !== undefined) updateData.show_explanations = body.show_explanations
    if (body.auto_save !== undefined) updateData.auto_save = body.auto_save
    if (body.theme !== undefined) updateData.theme = body.theme
    if (body.preferences !== undefined) updateData.preferences = body.preferences

    // Update preferences in Supabase (upsert to handle first-time creation)
    const { data: updatedPreferences, error: updateError } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: studentId,
        ...updateData
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single()

    if (updateError) {
      console.error('Error updating preferences:', updateError)
      return NextResponse.json(
        { error: 'Failed to update preferences' },
        { status: 500 }
      )
    }

    return NextResponse.json(updatedPreferences)
  } catch (error) {
    console.error('Error updating preferences:', error)
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}
