'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { InteractiveModel, MathModels } from '@/components/InteractiveModel'

type ModelCategory = 'quadratic' | 'exponential' | 'trigonometric' | 'calculus' | 'all'

interface ModelInfo {
  id: string
  title: string
  category: ModelCategory
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  getConfig: () => any
}

const availableModels: ModelInfo[] = [
  {
    id: 'projectile',
    title: 'Projectile Motion',
    category: 'quadratic',
    topic: 'Quadratic Functions (A1)',
    difficulty: 'Medium',
    getConfig: MathModels.projectileMotion,
  },
  {
    id: 'revenue',
    title: 'Revenue Optimization',
    category: 'quadratic',
    topic: 'Quadratic Functions (A1)',
    difficulty: 'Medium',
    getConfig: MathModels.revenueOptimization,
  },
  {
    id: 'population',
    title: 'Population Growth',
    category: 'exponential',
    topic: 'Exponential Functions (A6)',
    difficulty: 'Easy',
    getConfig: MathModels.populationGrowth,
  },
  {
    id: 'decay',
    title: 'Radioactive Decay',
    category: 'exponential',
    topic: 'Exponential Functions (A6)',
    difficulty: 'Easy',
    getConfig: MathModels.radioactiveDecay,
  },
  {
    id: 'wave',
    title: 'Wave Motion',
    category: 'trigonometric',
    topic: 'Trigonometric Functions (G1)',
    difficulty: 'Medium',
    getConfig: MathModels.waveMotion,
  },
  {
    id: 'box',
    title: 'Box Optimization',
    category: 'calculus',
    topic: 'Calculus - Optimization (C1)',
    difficulty: 'Hard',
    getConfig: MathModels.boxOptimization,
  },
  {
    id: 'tank',
    title: 'Tank Drainage',
    category: 'calculus',
    topic: 'Calculus - Rates (C1)',
    difficulty: 'Medium',
    getConfig: MathModels.tankDrainage,
  },
]

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(availableModels[0])
  const [filterCategory, setFilterCategory] = useState<ModelCategory>('all')

  const filteredModels =
    filterCategory === 'all'
      ? availableModels
      : availableModels.filter((m) => m.category === filterCategory)

  const difficultyColors = {
    Easy: 'text-green-400 bg-green-500/20 border-green-500/30',
    Medium: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    Hard: 'text-red-400 bg-red-500/20 border-red-500/30',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>

          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              Mathematical Modeling Playground
            </h1>
            <p className="text-gray-300 mb-4">
              Explore real-world applications of O-Level A-Math concepts through interactive models
            </p>
            <Link
              href="/student/modeling-guide"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white transition-all text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Learn the Modeling Process
            </Link>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">What is Mathematical Modeling?</h2>
          <p className="text-gray-300 mb-4">
            Mathematical modeling is the process of using mathematics to represent, analyze, and
            solve real-world problems. Every model on this page demonstrates how A-Level Math
            concepts apply to practical scenarios in science, engineering, business, and everyday
            life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">1. Identify</h3>
              <p className="text-gray-400 text-sm">Define the real-world problem</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">2. Formulate</h3>
              <p className="text-gray-400 text-sm">Create mathematical equations</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-2">3. Solve</h3>
              <p className="text-gray-400 text-sm">Use math techniques to solve</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">4. Interpret</h3>
              <p className="text-gray-400 text-sm">Explain results in context</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">Filter by Topic:</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'all', label: 'All Models', icon: '🌐' },
              { value: 'quadratic', label: 'Quadratic', icon: '📐' },
              { value: 'exponential', label: 'Exponential', icon: '📈' },
              { value: 'trigonometric', label: 'Trigonometric', icon: '〰️' },
              { value: 'calculus', label: 'Calculus', icon: '∫' },
            ].map((category) => (
              <button
                key={category.value}
                onClick={() => setFilterCategory(category.value as ModelCategory)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterCategory === category.value
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-4">Select a Model:</h3>
              <div className="space-y-2">
                {filteredModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedModel?.id === model.id
                        ? 'bg-blue-500/20 border-2 border-blue-500 shadow-lg'
                        : 'bg-gray-700/50 border border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <h4 className="text-white font-semibold mb-1">{model.title}</h4>
                    <p className="text-gray-400 text-xs mb-2">{model.topic}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        difficultyColors[model.difficulty]
                      }`}
                    >
                      {model.difficulty}
                    </span>
                  </button>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-300 font-semibold mb-2">💡 Tips</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Adjust sliders to see real-time changes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Read the analysis to understand the math</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Try extreme values to test boundaries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Connect graphs to real-world meaning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Model Display */}
          <div className="lg:col-span-2">
            {selectedModel ? (
              <InteractiveModel config={selectedModel.getConfig()} />
            ) : (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
                <p className="text-gray-400 text-lg">Select a model to begin exploring</p>
              </div>
            )}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/student/notes"
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 hover:from-green-500/20 hover:to-emerald-500/20 transition-all group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold">Study Notes</h3>
                <p className="text-gray-400 text-sm">Review theory and concepts</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Go back to notes to review the mathematical foundations behind these models
            </p>
          </Link>

          <Link
            href="/student/quizzes"
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold">Practice Quizzes</h3>
                <p className="text-gray-400 text-sm">Test your understanding</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Apply modeling concepts through quizzes with real-world problem scenarios
            </p>
          </Link>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold">Pro Tip</h3>
                <p className="text-gray-400 text-sm">Maximize your learning</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Try to predict how the graph will change BEFORE adjusting parameters - this develops
              mathematical intuition!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
