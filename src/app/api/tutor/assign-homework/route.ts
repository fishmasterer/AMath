import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function POST(request: NextRequest) {
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

    // Verify user is a tutor
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'tutor') {
      return NextResponse.json(
        { error: 'Unauthorized - Tutors only' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { student_id, question_ids, due_date } = body

    if (!student_id || !question_ids || !Array.isArray(question_ids) || question_ids.length === 0) {
      return NextResponse.json(
        { error: 'student_id and question_ids array are required' },
        { status: 400 }
      )
    }

    // Create assignments for each question
    const assignments = question_ids.map(question_id => ({
      student_id,
      question_id,
      assigned_by: user.id,
      due_date: due_date || null,
      completed: false
    }))

    const { data, error } = await supabase
      .from('homework_assignments')
      .insert(assignments)
      .select()

    if (error) {
      // Handle duplicate assignments gracefully
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Some questions are already assigned to this student' },
          { status: 409 }
        )
      }
      console.error('Error creating assignments:', error)
      throw error
    }

    return NextResponse.json({
      success: true,
      assignments: data,
      count: data.length
    })
  } catch (error) {
    console.error('Error in POST /api/tutor/assign-homework:', error)
    return NextResponse.json(
      { error: 'Failed to assign homework' },
      { status: 500 }
    )
  }
}

// Get all homework assignments (for tutor dashboard)
export async function GET(request: NextRequest) {
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

    // Verify user is a tutor
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'tutor') {
      return NextResponse.json(
        { error: 'Unauthorized - Tutors only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const studentFilter = searchParams.get('student_id')
    const completedFilter = searchParams.get('completed')

    // Build query
    let query = supabase
      .from('homework_assignments')
      .select(`
        *,
        question:question_bank (*),
        student:profiles!homework_assignments_student_id_fkey (id, full_name)
      `)
      .order('assigned_at', { ascending: false })

    // Apply filters
    if (studentFilter) {
      query = query.eq('student_id', studentFilter)
    }
    if (completedFilter !== null) {
      query = query.eq('completed', completedFilter === 'true')
    }

    const { data: assignments, error } = await query

    if (error) {
      console.error('Error fetching assignments:', error)
      throw error
    }

    // Calculate summary statistics
    const totalAssigned = assignments.length
    const totalCompleted = assignments.filter(a => a.completed).length
    const overdue = assignments.filter(a =>
      !a.completed && a.due_date && new Date(a.due_date) < new Date()
    ).length

    return NextResponse.json({
      assignments,
      summary: {
        total_assigned: totalAssigned,
        total_completed: totalCompleted,
        pending: totalAssigned - totalCompleted,
        overdue: overdue,
        completion_rate: totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 100) : 0
      }
    })
  } catch (error) {
    console.error('Error in GET /api/tutor/assign-homework:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    )
  }
}

// Delete assignment
export async function DELETE(request: NextRequest) {
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

    // Verify user is a tutor
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'tutor') {
      return NextResponse.json(
        { error: 'Unauthorized - Tutors only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const assignmentId = searchParams.get('assignment_id')

    if (!assignmentId) {
      return NextResponse.json(
        { error: 'assignment_id is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('homework_assignments')
      .delete()
      .eq('id', assignmentId)

    if (error) {
      console.error('Error deleting assignment:', error)
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/tutor/assign-homework:', error)
    return NextResponse.json(
      { error: 'Failed to delete assignment' },
      { status: 500 }
    )
  }
}
