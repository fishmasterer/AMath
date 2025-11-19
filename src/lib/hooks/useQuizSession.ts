'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { QuizSession } from '@/lib/types'

interface UseQuizSessionOptions {
  quizId: string
  autoSaveInterval?: number // milliseconds
  enabled?: boolean
}

export function useQuizSession({
  quizId,
  autoSaveInterval = 10000, // 10 seconds default
  enabled = true
}: UseQuizSessionOptions) {
  const [session, setSession] = useState<QuizSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pendingUpdatesRef = useRef<Partial<QuizSession> | null>(null)

  // Fetch session from API
  const fetchSession = useCallback(async () => {
    if (!enabled || !quizId) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/student/quiz-session?quiz_id=${quizId}`)

      if (!response.ok) {
        if (response.status === 401) {
          setSession(null)
          return
        }
        throw new Error('Failed to fetch quiz session')
      }

      const data = await response.json()
      setSession(data)
    } catch (err) {
      console.error('Error fetching quiz session:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch quiz session')
    } finally {
      setLoading(false)
    }
  }, [quizId, enabled])

  // Save/update session
  const saveSession = useCallback(async (updates: {
    current_question?: number
    time_remaining_seconds?: number | null
    session_data?: Record<string, any>
  }) => {
    if (!enabled || !quizId) return

    try {
      setSyncing(true)
      setError(null)

      const response = await fetch('/api/student/quiz-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quiz_id: quizId,
          ...updates
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save quiz session')
      }

      const data = await response.json()
      setSession(data)
      pendingUpdatesRef.current = null

      return data
    } catch (err) {
      console.error('Error saving quiz session:', err)
      setError(err instanceof Error ? err.message : 'Failed to save quiz session')
      throw err
    } finally {
      setSyncing(false)
    }
  }, [quizId, enabled])

  // Delete session
  const deleteSession = useCallback(async () => {
    if (!enabled || !quizId) return

    try {
      setSyncing(true)
      setError(null)

      const response = await fetch(`/api/student/quiz-session?quiz_id=${quizId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete quiz session')
      }

      setSession(null)
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current)
        autoSaveTimerRef.current = null
      }
    } catch (err) {
      console.error('Error deleting quiz session:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete quiz session')
      throw err
    } finally {
      setSyncing(false)
    }
  }, [quizId, enabled])

  // Update session state locally (will be auto-saved)
  const updateSessionState = useCallback((updates: {
    current_question?: number
    time_remaining_seconds?: number | null
    session_data?: Record<string, any>
  }) => {
    // Optimistic update
    setSession(prev => prev ? { ...prev, ...updates } : null)

    // Store pending updates for next auto-save
    pendingUpdatesRef.current = {
      ...pendingUpdatesRef.current,
      ...updates
    }
  }, [])

  // Auto-save effect
  useEffect(() => {
    if (!enabled || !quizId || autoSaveInterval <= 0) return

    autoSaveTimerRef.current = setInterval(() => {
      if (pendingUpdatesRef.current) {
        saveSession(pendingUpdatesRef.current).catch(err => {
          console.error('Auto-save failed:', err)
        })
      }
    }, autoSaveInterval)

    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current)
        autoSaveTimerRef.current = null
      }
    }
  }, [quizId, enabled, autoSaveInterval, saveSession])

  // Initial fetch
  useEffect(() => {
    if (enabled) {
      fetchSession()
    }
  }, [fetchSession, enabled])

  // Cleanup on unmount - save any pending updates
  useEffect(() => {
    return () => {
      if (pendingUpdatesRef.current && enabled) {
        // Save synchronously if possible
        fetch('/api/student/quiz-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quiz_id: quizId,
            ...pendingUpdatesRef.current
          }),
          keepalive: true // Ensure request completes even if page unloads
        }).catch(err => {
          console.error('Failed to save session on unmount:', err)
        })
      }
    }
  }, [quizId, enabled])

  return {
    session,
    loading,
    error,
    syncing,
    saveSession,
    deleteSession,
    updateSessionState,
    refreshSession: fetchSession
  }
}
