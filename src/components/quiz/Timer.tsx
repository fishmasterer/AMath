'use client'

import { useEffect, useState } from 'react'

interface TimerProps {
  initialSeconds: number
  onTimeUp: () => void
  onWarning?: (secondsRemaining: number) => void
}

export default function Timer({ initialSeconds, onTimeUp, onWarning }: TimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds)
  const [hasWarned30, setHasWarned30] = useState(false)
  const [hasWarned10, setHasWarned10] = useState(false)
  const [hasWarned5, setHasWarned5] = useState(false)

  useEffect(() => {
    setSecondsRemaining(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onTimeUp()
      return
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        const newValue = Math.max(0, prev - 1)

        // Trigger warnings
        if (onWarning) {
          if (newValue === 30 * 60 && !hasWarned30) {
            setHasWarned30(true)
            onWarning(newValue)
          } else if (newValue === 10 * 60 && !hasWarned10) {
            setHasWarned10(true)
            onWarning(newValue)
          } else if (newValue === 5 * 60 && !hasWarned5) {
            setHasWarned5(true)
            onWarning(newValue)
          }
        }

        if (newValue === 0) {
          onTimeUp()
        }

        return newValue
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [secondsRemaining, onTimeUp, onWarning, hasWarned30, hasWarned10, hasWarned5])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerColor = () => {
    if (secondsRemaining <= 5 * 60) return 'text-red-400 animate-pulse'
    if (secondsRemaining <= 10 * 60) return 'text-orange-400'
    if (secondsRemaining <= 30 * 60) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getProgressPercentage = () => {
    return (secondsRemaining / initialSeconds) * 100
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm font-medium">Time Remaining</span>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <div className={`text-3xl font-bold font-mono ${getTimerColor()}`}>
        {formatTime(secondsRemaining)}
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            secondsRemaining <= 5 * 60
              ? 'bg-red-500'
              : secondsRemaining <= 10 * 60
              ? 'bg-orange-500'
              : secondsRemaining <= 30 * 60
              ? 'bg-yellow-500'
              : 'bg-green-500'
          }`}
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>

      {secondsRemaining <= 5 * 60 && (
        <div className="mt-2 text-red-400 text-xs font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Time almost up!
        </div>
      )}
    </div>
  )
}
