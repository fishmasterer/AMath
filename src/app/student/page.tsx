'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentLogin() {
  const router = useRouter()
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState(false)
  const CORRECT_PASSCODE = '5678' // Simple passcode for single student

  useEffect(() => {
    // Check if already authenticated
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('studentAuth')
      if (isAuth === 'true') {
        router.push('/student/dashboard')
      }
    }
  }, [router])

  const handleNumberClick = (num: string) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + num
      setPasscode(newPasscode)

      if (newPasscode.length === 4) {
        // Check passcode
        if (newPasscode === CORRECT_PASSCODE) {
          sessionStorage.setItem('studentAuth', 'true')
          router.push('/student/dashboard')
        } else {
          setError(true)
          setTimeout(() => {
            setPasscode('')
            setError(false)
          }, 500)
        }
      }
    }
  }

  const handleClear = () => {
    setPasscode('')
    setError(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">AMath Tutor</h1>
          </div>
          <h2 className="text-xl text-gray-300 mb-2">Student Portal</h2>
          <p className="text-gray-400 text-sm">Enter your passcode to continue</p>
        </div>

        {/* Passcode card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
          {/* Passcode display */}
          <div className={`flex justify-center gap-4 mb-8 transition-transform ${error ? 'animate-shake' : ''}`}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold transition-all ${
                  passcode.length > i
                    ? 'bg-gradient-to-br from-blue-400 to-cyan-400 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-white/5 border-2 border-dashed border-white/20 text-transparent'
                } ${error ? 'border-red-500 bg-red-500/20' : ''}`}
              >
                {passcode.length > i ? '•' : '0'}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">
              Incorrect passcode. Please try again.
            </p>
          )}

          {/* Number pad */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-xl font-semibold transition-all hover:scale-105 active:scale-95"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="h-16 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-xl text-red-400 text-sm font-semibold transition-all"
            >
              Clear
            </button>
            <button
              onClick={() => handleNumberClick('0')}
              className="h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-xl font-semibold transition-all hover:scale-105 active:scale-95"
            >
              0
            </button>
            <div className="h-16" /> {/* Empty space */}
          </div>

          <div className="text-center text-gray-400 text-xs mt-4">
            For demo purposes, passcode is: 5678
          </div>
        </div>

        {/* Back to home link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}
