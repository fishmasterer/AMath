'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { QuizSession } from '@/lib/types'

interface UseQuizSessionOptions {
  quizId: string
  autoSaveInterval?: number // milliseconds
  enabled?: boolean
}

// Retry with exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)

      // Don't retry on client errors (4xx) except 429
      if (!response.ok && response.status >= 400 && response.status < 500 && response.status !== 429) {
        return response
      }

      if (response.ok) {
        return response
      }

      // Retry on 5xx or 429
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }

      return response
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('Network error')

      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
    }
  }

  throw lastError || new Error('Request failed after retries')
}

// Deep equality check for session data
function isSessionEqual(a: Partial<QuizSession>, b: Partial<QuizSession>): boolean {
  return (
    a.current_question === b.current_question &&
    a.time_remaining_seconds === b.time_remaining_seconds &&
    JSON.stringify(a.session_data) === JSON.stringify(b.session_data)
  )
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

  // Track in-flight requests
  const fetchingRef = useRef(false)
  const savingRef = useRef(false)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Track last synced state to prevent unnecessary saves
  const lastSyncedStateRef = useRef<Partial<QuizSession> | null>(null)

  // Pending updates queue
  const pendingUpdatesRef = useRef<Partial<QuizSession> | null>(null)

  // Track if we've done initial fetch
  const initialFetchDoneRef = useRef(false)

  // Fetch session from API
  const fetchSession = useCallback(async () => {
    if (!enabled || !quizId || fetchingRef.current) return

    try {
      fetchingRef.current = true
      setLoading(true)
      setError(null)

      const response = await fetchWithRetry(
        `/api/student/quiz-session?quiz_id=${quizId}`,
        {}
      )

      if (!response.ok) {
        if (response.status === 401) {
          setSession(null)
          return
        }
        throw new Error('Failed to fetch quiz session')
      }

      const data = await response.json()

      // Only update state if data actually changed
      setSession(prevSession => {
        if (!data) return null
        if (prevSession && isSessionEqual(data, prevSession)) {
          return prevSession // Prevent unnecessary re-render
        }
        return data
      })

      if (data) {
        lastSyncedStateRef.current = {
          current_question: data.current_question,
          time_remaining_seconds: data.time_remaining_seconds,
          session_data: data.session_data
        }
      }

      initialFetchDoneRef.current = true
    } catch (err) {
      console.error('Error fetching quiz session:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch quiz session')
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }, [quizId, enabled])

  // Save/update session
  const saveSession = useCallback(async (updates: {
    current_question?: number
    time_remaining_seconds?: number | null
    session_data?: Record<string, any>
  }) => {
    if (!enabled || !quizId || savingRef.current) return

    // Check if updates are actually different from last synced state
    if (lastSyncedStateRef.current) {
      const isSame = (
        (updates.current_question === undefined || updates.current_question === lastSyncedStateRef.current.current_question) &&
        (updates.time_remaining_seconds === undefined || updates.time_remaining_seconds === lastSyncedStateRef.current.time_remaining_seconds) &&
        (updates.session_data === undefined || JSON.stringify(updates.session_data) === JSON.stringify(lastSyncedStateRef.current.session_data))
      )

      if (isSame) {
        return // Skip save if nothing changed
      }
    }

    try {
      savingRef.current = true
      setSyncing(true)
      setError(null)

      const response = await fetchWithRetry('/api/student/quiz-session', {
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

      // Update last synced state
      lastSyncedStateRef.current = {
        current_question: data.current_question,
        time_remaining_seconds: data.time_remaining_seconds,
        session_data: data.session_data
      }

      pendingUpdatesRef.current = null

      return data
    } catch (err) {
      console.error('Error saving quiz session:', err)
      setError(err instanceof Error ? err.message : 'Failed to save quiz session')
      throw err
    } finally {
      setSyncing(false)
      savingRef.current = false
    }
  }, [quizId, enabled])

  // Delete session
  const deleteSession = useCallback(async () => {
    if (!enabled || !quizId) return

    try {
      setSyncing(true)
      setError(null)

      const response = await fetchWithRetry(
        `/api/student/quiz-session?quiz_id=${quizId}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete quiz session')
      }

      setSession(null)
      lastSyncedStateRef.current = null
      pendingUpdatesRef.current = null

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
    // Optimistically update local state
    setSession(prev => {
      if (!prev) return null
      return { ...prev, ...updates }
    })

    // Queue updates for next auto-save
    pendingUpdatesRef.current = {
      ...pendingUpdatesRef.current,
      ...updates
    }
  }, [])

  // Auto-save effect
  useEffect(() => {
    if (!enabled || !quizId || autoSaveInterval <= 0 || !initialFetchDoneRef.current) {
      return
    }

    autoSaveTimerRef.current = setInterval(async () => {
      if (pendingUpdatesRef.current && !savingRef.current) {
        const updates = { ...pendingUpdatesRef.current }

        try {
          await saveSession(updates)
        } catch (err) {
          console.error('Auto-save failed:', err)
        }
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
    if (enabled && quizId) {
      fetchSession()
    }
  }, [fetchSession, enabled, quizId])

  // Cleanup on unmount - save any pending updates
  useEffect(() => {
    return () => {
      if (pendingUpdatesRef.current && enabled && quizId) {
        // Save synchronously with keepalive if possible
        fetch('/api/student/quiz-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quiz_id: quizId,
            ...pendingUpdatesRef.current
          }),
          keepalive: true
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
