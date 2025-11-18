import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // For a single student setup, return hardcoded profile
    // In a full system, this would fetch from Supabase based on auth
    const profile = {
      id: '00000000-0000-0000-0000-000000000001',
      role: 'student' as const,
      full_name: 'Ayzac Ng',
      email: 'student@amath.edu',
      avatar_url: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // For a single student setup, just return success
    // In a full system, this would update Supabase
    const updatedProfile = {
      id: '00000000-0000-0000-0000-000000000001',
      role: 'student' as const,
      full_name: body.full_name || 'Ayzac Ng',
      email: 'student@amath.edu',
      avatar_url: body.avatar_url || null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
