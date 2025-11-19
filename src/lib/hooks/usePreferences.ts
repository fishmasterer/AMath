'use client'

import { useState, useEffect, useCallback } from 'react'
import { UserPreferences } from '@/lib/types'

// Default preferences
const DEFAULT_PREFERENCES: Omit<UserPreferences, 'user_id' | 'created_at' | 'updated_at'> = {
  show_latex: true,
  show_explanations: true,
  auto_save: true,
  theme: 'system',
  preferences: {}
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  // Fetch preferences from API
  const fetchPreferences = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/student/preferences')

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
    } catch (err) {
      console.error('Error fetching preferences:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch preferences')
    } finally {
      setLoading(false)
    }
  }, [])

  // Update preferences (with optimistic UI update)
  const updatePreferences = useCallback(async (updates: Partial<Omit<UserPreferences, 'user_id' | 'created_at' | 'updated_at'>>) => {
    try {
      setSyncing(true)
      setError(null)

      // Optimistic update
      setPreferences(prev => prev ? { ...prev, ...updates } : null)

      const response = await fetch('/api/student/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })

      if (!response.ok) {
        throw new Error('Failed to update preferences')
      }

      const data = await response.json()
      setPreferences(data)

      return data
    } catch (err) {
      console.error('Error updating preferences:', err)
      setError(err instanceof Error ? err.message : 'Failed to update preferences')

      // Revert optimistic update on error
      await fetchPreferences()
      throw err
    } finally {
      setSyncing(false)
    }
  }, [fetchPreferences])

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
