import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { HomeworkAssignmentWithQuestion } from '@/lib/types'

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

    const { searchParams } = new URL(request.url)
    const completedFilter = searchParams.get('completed') // 'true', 'false', or null (all)
    const topicFilter = searchParams.get('topic') // e.g., 'A1', 'G2'

    // Build query
    let query = supabase
      .from('homework_assignments')
      .select(`
        *,
        question:question_bank (*)
      `)
      .eq('student_id', user.id)
      .order('assigned_at', { ascending: false })

    // Apply filters
    if (completedFilter !== null) {
      query = query.eq('completed', completedFilter === 'true')
    }

    const { data: assignments, error } = await query

    if (error) {
      console.error('Error fetching homework:', error)
      throw error
    }

    // Filter by topic if specified (needs to be done client-side since it's nested)
    let filteredAssignments = assignments as unknown as HomeworkAssignmentWithQuestion[]

    if (topicFilter) {
      filteredAssignments = filteredAssignments.filter(
        a => a.question?.topic === topicFilter
      )
    }

    // Calculate summary statistics
    const totalAssigned = filteredAssignments.length
    const totalCompleted = filteredAssignments.filter(a => a.completed).length
    const overdue = filteredAssignments.filter(a =>
      !a.completed && a.due_date && new Date(a.due_date) < new Date()
    ).length

    return NextResponse.json({
      assignments: filteredAssignments,
      summary: {
        total_assigned: totalAssigned,
        total_completed: totalCompleted,
        pending: totalAssigned - totalCompleted,
        overdue: overdue,
        completion_rate: totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 100) : 0
      }
    })
  } catch (error) {
    console.error('Error in GET /api/student/homework:', error)
    return NextResponse.json(
      { error: 'Failed to fetch homework' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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

    const body = await request.json()
    const { assignment_id, completed, notes } = body

    if (!assignment_id) {
      return NextResponse.json(
        { error: 'assignment_id is required' },
        { status: 400 }
      )
    }

    // Update the assignment
    const updateData: any = {}
    if (typeof completed === 'boolean') {
      updateData.completed = completed
      updateData.completed_at = completed ? new Date().toISOString() : null
    }
    if (notes !== undefined) {
      updateData.notes = notes
    }

    const { data: assignment, error } = await supabase
      .from('homework_assignments')
      .update(updateData)
      .eq('id', assignment_id)
      .eq('student_id', user.id) // Ensure student can only update their own assignments
      .select()
      .single()

    if (error) {
      console.error('Error updating homework:', error)
      throw error
    }

    return NextResponse.json({ assignment })
  } catch (error) {
    console.error('Error in PUT /api/student/homework:', error)
    return NextResponse.json(
      { error: 'Failed to update homework' },
      { status: 500 }
    )
  }
}
