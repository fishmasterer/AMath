import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { UserPreferences } from '@/lib/types'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Fetch preferences from Supabase
    const { data: preferences, error: preferencesError } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // If no preferences exist, create default ones
    if (preferencesError && preferencesError.code === 'PGRST116') {
      const { data: newPreferences, error: createError } = await supabase
        .from('user_preferences')
        .insert({
          user_id: user.id,
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
    const supabase = await createClient()
    const body = await request.json()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

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
        user_id: user.id,
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
