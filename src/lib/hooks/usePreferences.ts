'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { UserPreferences } from '@/lib/types'

// Default preferences
const DEFAULT_PREFERENCES: Omit<UserPreferences, 'user_id' | 'created_at' | 'updated_at'> = {
  show_latex: true,
  show_explanations: true,
  auto_save: true,
  theme: 'system',
  preferences: {}
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

      // Don't retry on client errors (4xx) except 429 (rate limit)
      if (!response.ok && response.status >= 400 && response.status < 500 && response.status !== 429) {
        return response
      }

      if (response.ok) {
        return response
      }

      // Retry on 5xx or 429
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000) // Max 10s
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

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  // Track in-flight requests to prevent duplicates
  const fetchingRef = useRef(false)
  const updatingRef = useRef(false)

  // Store backup for rollback
  const backupRef = useRef<UserPreferences | null>(null)

  // Debounce timer
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Pending updates queue
  const pendingUpdatesRef = useRef<Partial<Omit<UserPreferences, 'user_id' | 'created_at' | 'updated_at'>> | null>(null)

  // Fetch preferences from API
  const fetchPreferences = useCallback(async () => {
    // Prevent concurrent fetches
    if (fetchingRef.current) {
      return
    }

    try {
      fetchingRef.current = true
      setLoading(true)
      setError(null)

      const response = await fetchWithRetry('/api/student/preferences', {})

      if (!response.ok) {
        if (response.status === 401) {
          // User not authenticated, use defaults
          setPreferences(null)
          return
        }
        throw new Error('Failed to fetch preferences')
      }

      const data = await response.json()
      setPreferences(data)
      backupRef.current = data
    } catch (err) {
      console.error('Error fetching preferences:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch preferences')
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }, [])

  // Update preferences (with optimistic UI update and debouncing)
  const updatePreferences = useCallback(async (
    updates: Partial<Omit<UserPreferences, 'user_id' | 'created_at' | 'updated_at'>>,
    immediate = false
  ) => {
    // Clear any pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    // Merge with pending updates
    pendingUpdatesRef.current = {
      ...pendingUpdatesRef.current,
      ...updates
    }

    // Optimistic update
    setPreferences(prev => {
      if (!prev) return null
      backupRef.current = prev // Store backup for rollback
      return { ...prev, ...updates }
    })

    // Debounce the actual API call unless immediate
    const performUpdate = async () => {
      if (updatingRef.current || !pendingUpdatesRef.current) {
        return
      }

      const updatesToSend = { ...pendingUpdatesRef.current }
      pendingUpdatesRef.current = null

      try {
        updatingRef.current = true
        setSyncing(true)
        setError(null)

        const response = await fetchWithRetry('/api/student/preferences', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatesToSend)
        })

        if (!response.ok) {
          throw new Error('Failed to update preferences')
        }

        const data = await response.json()
        setPreferences(data)
        backupRef.current = data

        return data
      } catch (err) {
        console.error('Error updating preferences:', err)
        setError(err instanceof Error ? err.message : 'Failed to update preferences')

        // Revert to backup
        if (backupRef.current) {
          setPreferences(backupRef.current)
        }
        throw err
      } finally {
        setSyncing(false)
        updatingRef.current = false
      }
    }

    if (immediate) {
      return performUpdate()
    } else {
      // Debounce: wait 500ms before sending update
      return new Promise((resolve, reject) => {
        debounceTimerRef.current = setTimeout(() => {
          performUpdate().then(resolve).catch(reject)
        }, 500)
      })
    }
  }, [])

  // Individual preference updaters for convenience
  const setShowLatex = useCallback((value: boolean) => {
    return updatePreferences({ show_latex: value })
  }, [updatePreferences])

  const setShowExplanations = useCallback((value: boolean) => {
    return updatePreferences({ show_explanations: value })
  }, [updatePreferences])

  const setAutoSave = useCallback((value: boolean) => {
    return updatePreferences({ auto_save: value })
  }, [updatePreferences])

  const setTheme = useCallback((value: 'light' | 'dark' | 'system') => {
    return updatePreferences({ theme: value })
  }, [updatePreferences])

  // Initial fetch
  useEffect(() => {
    fetchPreferences()
  }, [fetchPreferences])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Flush any pending updates with keepalive
      if (pendingUpdatesRef.current) {
        fetch('/api/student/preferences', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pendingUpdatesRef.current),
          keepalive: true
        }).catch(err => console.error('Failed to flush preferences on unmount:', err))
      }
    }
  }, [])

  return {
    preferences: preferences || { ...DEFAULT_PREFERENCES, user_id: '', created_at: '', updated_at: '' },
    loading,
    error,
    syncing,
    updatePreferences,
    refreshPreferences: fetchPreferences,
    // Convenience methods
    setShowLatex,
    setShowExplanations,
    setAutoSave,
    setTheme
  }
}
