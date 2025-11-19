'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePreferences } from '@/lib/hooks'

interface Profile {
  full_name: string
  email: string
  role: string
  created_at: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const { preferences, setShowLatex, setShowExplanations, setAutoSave, syncing } = usePreferences()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/student/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-gray-400">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
            {profile?.full_name.charAt(0) || 'S'}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{profile?.full_name}</h2>
            <p className="text-gray-400 mb-4">{profile?.email}</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg text-sm font-semibold">
                Student
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg text-sm font-semibold">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Role</p>
              <p className="text-white font-medium capitalize">{profile?.role}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Member Since</p>
              <p className="text-white font-medium">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Account Information</h3>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Full Name</label>
            <input
              type="text"
              value={profile?.full_name || ''}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-2">Email Address</label>
            <input
              type="email"
              value={profile?.email || ''}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Profile editing is currently disabled. Contact your tutor to update your information.
            </span>
          </div>
        </div>
      </div>

      {/* Study Preferences - Synced Across Devices */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Study Preferences</h3>
            <p className="text-gray-400 text-sm mt-1">Syncs automatically across all your devices</p>
          </div>
          {syncing && (
            <div className="flex items-center gap-2 text-sm text-blue-400">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500"></div>
              <span>Syncing...</span>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">Show LaTeX in Questions</p>
              <p className="text-gray-400 text-sm">Display mathematical notation</p>
            </div>
            <button
              onClick={() => setShowLatex(!preferences.show_latex)}
              disabled={syncing}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                preferences.show_latex ? 'bg-green-500' : 'bg-gray-600'
              } disabled:opacity-50`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  preferences.show_latex ? 'right-1' : 'left-1'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">Show Explanations</p>
              <p className="text-gray-400 text-sm">View explanations after quiz submission</p>
            </div>
            <button
              onClick={() => setShowExplanations(!preferences.show_explanations)}
              disabled={syncing}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                preferences.show_explanations ? 'bg-green-500' : 'bg-gray-600'
              } disabled:opacity-50`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  preferences.show_explanations ? 'right-1' : 'left-1'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">Auto-save Answers</p>
              <p className="text-gray-400 text-sm">Automatically save quiz progress</p>
            </div>
            <button
              onClick={() => setAutoSave(!preferences.auto_save)}
              disabled={syncing}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                preferences.auto_save ? 'bg-green-500' : 'bg-gray-600'
              } disabled:opacity-50`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  preferences.auto_save ? 'right-1' : 'left-1'
                }`}
              ></div>
            </button>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Your preferences are automatically saved and synced across all devices where you're logged in.
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Your Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">View Dashboard</div>
            <div className="text-gray-400 text-xs">for detailed stats</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">View Progress</div>
            <div className="text-gray-400 text-xs">to see trends</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">View Quizzes</div>
            <div className="text-gray-400 text-xs">to practice</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">View Mistakes</div>
            <div className="text-gray-400 text-xs">to improve</div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 backdrop-blur-xl rounded-xl border border-red-500/30 p-6">
        <h3 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Clear Quiz History</p>
              <p className="text-gray-400 text-sm">Permanently delete all quiz attempts and results</p>
            </div>
            <button
              disabled
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Data
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
            </div>
            <button
              disabled
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Account
            </button>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>
              These actions are currently disabled. Contact your tutor for account management.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
