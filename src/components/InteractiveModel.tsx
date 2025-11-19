'use client'

import React, { useState, useEffect } from 'react'
import { GraphRenderer, GraphConfig } from './GraphRenderer'

export interface ModelParameter {
  name: string
  label: string
  min: number
  max: number
  step: number
  default: number
  unit?: string
  description?: string
}

export interface ModelConfig {
  title: string
  description: string
  scenario: string
  parameters: ModelParameter[]
  generateGraph: (params: Record<string, number>) => GraphConfig
  explanation?: (params: Record<string, number>) => string
  realWorldContext?: string
  keyInsights?: string[]
}

interface InteractiveModelProps {
  config: ModelConfig
  className?: string
}

export const InteractiveModel: React.FC<InteractiveModelProps> = ({ config, className = '' }) => {
  const [params, setParams] = useState<Record<string, number>>(
    config.parameters.reduce((acc, param) => ({
      ...acc,
      [param.name]: param.default,
    }), {})
  )

  const [graphConfig, setGraphConfig] = useState<GraphConfig>(config.generateGraph(params))

  useEffect(() => {
    setGraphConfig(config.generateGraph(params))
  }, [params, config])

  const handleParamChange = (name: string, value: number) => {
    setParams((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 ${className}`}>
      {/* Title and Description */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{config.title}</h3>
        <p className="text-gray-300 mb-3">{config.description}</p>
        {config.realWorldContext && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-3">
            <p className="text-sm text-blue-300">
              <span className="font-semibold">Real-World Context:</span> {config.realWorldContext}
            </p>
          </div>
        )}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-sm text-purple-300">
            <span className="font-semibold">Scenario:</span> {config.scenario}
          </p>
        </div>
      </div>

      {/* Graph */}
      <div className="mb-6">
        <GraphRenderer config={graphConfig} height={400} />
      </div>

      {/* Parameter Controls */}
      <div className="space-y-4 mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">Adjust Parameters:</h4>
        {config.parameters.map((param) => (
          <div key={param.name} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <label className="text-white font-medium">
                {param.label}
                {param.unit && <span className="text-gray-400 ml-1">({param.unit})</span>}
              </label>
              <span className="text-blue-400 font-mono text-lg">
                {params[param.name].toFixed(2)}
                {param.unit && <span className="text-sm ml-1">{param.unit}</span>}
              </span>
            </div>
            {param.description && (
              <p className="text-sm text-gray-400 mb-2">{param.description}</p>
            )}
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={params[param.name]}
              onChange={(e) => handleParamChange(param.name, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{param.min}</span>
              <span>{param.max}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Explanation */}
      {config.explanation && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-green-300 font-semibold mb-2">Analysis:</h4>
          <p className="text-gray-300 text-sm">{config.explanation(params)}</p>
        </div>
      )}

      {/* Key Insights */}
      {config.keyInsights && config.keyInsights.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="text-yellow-300 font-semibold mb-2">Key Insights:</h4>
          <ul className="space-y-1">
            {config.keyInsights.map((insight, idx) => (
              <li key={idx} className="text-gray-300 text-sm flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          background: #2563eb;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  )
}

// Preset Mathematical Models for O-Level A-Math Topics
export const MathModels = {
  // Quadratic: Projectile Motion
  projectileMotion: (): ModelConfig => ({
    title: 'Projectile Motion',
    description: 'Model the trajectory of a projectile under gravity',
    scenario: 'A ball is thrown from ground level with initial velocity and angle',
    realWorldContext: 'Used in sports (basketball, soccer), military ballistics, and engineering',
    parameters: [
      {
        name: 'v0',
        label: 'Initial Velocity',
        min: 5,
        max: 50,
        step: 1,
        default: 20,
        unit: 'm/s',
        description: 'The speed at which the projectile is launched',
      },
      {
        name: 'angle',
        label: 'Launch Angle',
        min: 15,
        max: 75,
        step: 5,
        default: 45,
        unit: '°',
        description: 'The angle from horizontal at which projectile is launched',
      },
    ],
    generateGraph: (params) => {
      const v0 = params.v0
      const theta = (params.angle * Math.PI) / 180
      const g = 9.8
      const v0x = v0 * Math.cos(theta)
      const v0y = v0 * Math.sin(theta)
      const tMax = (2 * v0y) / g
      const range = v0x * tMax

      return {
        expressions: [
          {
            latex: `y = ${v0y.toFixed(2)}\\cdot\\frac{x}{${v0x.toFixed(2)}} - \\frac{9.8}{2}\\cdot\\left(\\frac{x}{${v0x.toFixed(2)}}\\right)^2`,
            color: '#3b82f6',
            lineWidth: 3,
            label: 'Trajectory',
          },
          {
            latex: `x = ${range.toFixed(2)}`,
            color: '#ef4444',
            lineStyle: 'DASHED',
            label: 'Max Range',
          },
          {
            latex: `y = ${((v0y * v0y) / (2 * g)).toFixed(2)}`,
            color: '#10b981',
            lineStyle: 'DASHED',
            label: 'Max Height',
          },
        ],
        bounds: { left: -2, right: range + 5, bottom: -2, top: ((v0y * v0y) / (2 * g)) + 5 },
      }
    },
    explanation: (params) => {
      const v0 = params.v0
      const theta = (params.angle * Math.PI) / 180
      const g = 9.8
      const v0y = v0 * Math.sin(theta)
      const maxHeight = (v0y * v0y) / (2 * g)
      const timeOfFlight = (2 * v0y) / g
      const range = v0 * Math.cos(theta) * timeOfFlight

      return `With initial velocity ${v0} m/s at ${params.angle}°, the projectile reaches a maximum height of ${maxHeight.toFixed(2)} m and travels ${range.toFixed(2)} m horizontally before landing. Time of flight: ${timeOfFlight.toFixed(2)} seconds. The trajectory follows a parabolic path: h(x) = x·tan(θ) - (g·x²)/(2v₀²cos²(θ))`
    },
    keyInsights: [
      'Maximum range occurs at 45° launch angle (in ideal conditions)',
      'The trajectory is always a parabola due to constant gravitational acceleration',
      'Doubling the initial velocity quadruples the range',
      'Height and range can be calculated using kinematic equations',
    ],
  }),

  // Quadratic: Business Revenue Model
  revenueOptimization: (): ModelConfig => ({
    title: 'Business Revenue Optimization',
    description: 'Maximize revenue by finding optimal price point',
    scenario: 'A company sells products where demand decreases as price increases',
    realWorldContext: 'Critical for pricing strategy in retail, e-commerce, and manufacturing',
    parameters: [
      {
        name: 'basePrice',
        label: 'Base Price',
        min: 10,
        max: 100,
        step: 5,
        default: 50,
        unit: '$',
        description: 'Starting price per unit',
      },
      {
        name: 'elasticity',
        label: 'Price Elasticity',
        min: 0.5,
        max: 3,
        step: 0.1,
        default: 1.5,
        description: 'How much demand changes with price (higher = more sensitive)',
      },
      {
        name: 'baseDemand',
        label: 'Base Demand',
        min: 100,
        max: 1000,
        step: 50,
        default: 500,
        unit: 'units',
        description: 'Expected sales at base price',
      },
    ],
    generateGraph: (params) => {
      const p = params.basePrice
      const e = params.elasticity
      const d = params.baseDemand

      // Revenue = Price × Demand
      // Demand = d - e(x - p) where x is price
      // Revenue = x(d - e(x - p)) = x(d + ep) - ex²

      const a = -e
      const b = d + e * p
      const vertex_x = -b / (2 * a)
      const vertex_y = a * vertex_x * vertex_x + b * vertex_x

      return {
        expressions: [
          {
            latex: `y = ${a.toFixed(2)}x^2 + ${b.toFixed(2)}x`,
            color: '#3b82f6',
            lineWidth: 3,
            label: 'Revenue',
          },
          {
            latex: `(${vertex_x.toFixed(2)}, ${vertex_y.toFixed(2)})`,
            color: '#ef4444',
            label: 'Optimal Point',
            points: true,
          },
          {
            latex: `x = ${vertex_x.toFixed(2)}`,
            color: '#10b981',
            lineStyle: 'DASHED',
          },
        ],
        bounds: { left: 0, right: p * 2, bottom: 0, top: vertex_y * 1.2 },
      }
    },
    explanation: (params) => {
      const p = params.basePrice
      const e = params.elasticity
      const d = params.baseDemand
      const a = -e
      const b = d + e * p
      const optimalPrice = -b / (2 * a)
      const optimalDemand = d - e * (optimalPrice - p)
      const maxRevenue = a * optimalPrice * optimalPrice + b * optimalPrice

      return `To maximize revenue, set price at $${optimalPrice.toFixed(2)}. This will sell ${optimalDemand.toFixed(0)} units and generate $${maxRevenue.toFixed(2)} in revenue. The vertex of the parabola represents the optimal price point. Current settings: R(x) = ${a.toFixed(2)}x² + ${b.toFixed(2)}x`
    },
    keyInsights: [
      'Revenue follows a quadratic function: R(x) = -ax² + bx',
      'The vertex of the parabola gives the optimal price for maximum revenue',
      'Higher price elasticity means demand is more sensitive to price changes',
      'Completing the square helps find the vertex algebraically',
    ],
  }),

  // Exponential: Population Growth
  populationGrowth: (): ModelConfig => ({
    title: 'Population Growth Model',
    description: 'Exponential growth model for population dynamics',
    scenario: 'A bacterial colony or population grows exponentially over time',
    realWorldContext: 'Used in biology, epidemiology, ecology, and urban planning',
    parameters: [
      {
        name: 'P0',
        label: 'Initial Population',
        min: 100,
        max: 10000,
        step: 100,
        default: 1000,
        description: 'Starting population size',
      },
      {
        name: 'r',
        label: 'Growth Rate',
        min: 0.01,
        max: 0.5,
        step: 0.01,
        default: 0.1,
        unit: 'per hour',
        description: 'Rate of population increase (as decimal)',
      },
      {
        name: 'tMax',
        label: 'Time Period',
        min: 10,
        max: 100,
        step: 5,
        default: 50,
        unit: 'hours',
        description: 'Duration to model',
      },
    ],
    generateGraph: (params) => {
      const P0 = params.P0
      const r = params.r
      const tMax = params.tMax
      const doublingTime = Math.log(2) / r

      return {
        expressions: [
          {
            latex: `y = ${P0}e^{${r.toFixed(3)}x}`,
            color: '#3b82f6',
            lineWidth: 3,
            label: 'Population',
          },
          {
            latex: `x = ${doublingTime.toFixed(2)}`,
            color: '#ef4444',
            lineStyle: 'DASHED',
            label: 'Doubling Time',
          },
          {
            latex: `y = ${(2 * P0).toFixed(0)}`,
            color: '#10b981',
            lineStyle: 'DASHED',
            label: '2× Population',
          },
        ],
        bounds: { left: 0, right: tMax, bottom: 0, top: P0 * Math.exp(r * tMax) * 1.1 },
      }
    },
    explanation: (params) => {
      const P0 = params.P0
      const r = params.r
      const tMax = params.tMax
      const doublingTime = Math.log(2) / r
      const finalPop = P0 * Math.exp(r * tMax)

      return `Starting with ${P0} individuals and growth rate ${(r * 100).toFixed(1)}% per hour, the population follows P(t) = ${P0}e^{${r.toFixed(3)}t}. After ${tMax} hours, population reaches ${finalPop.toFixed(0)}. Doubling time is ${doublingTime.toFixed(2)} hours. The exponential model assumes unlimited resources and constant growth rate.`
    },
    keyInsights: [
      'Exponential growth: P(t) = P₀e^(rt) where r is growth rate',
      'Doubling time = ln(2)/r, independent of population size',
      'Growth rate r > 0 for growth, r < 0 for decay',
      'Real populations often follow logistic growth with carrying capacity',
    ],
  }),

  // Exponential: Radioactive Decay
  radioactiveDecay: (): ModelConfig => ({
    title: 'Radioactive Decay Model',
    description: 'Exponential decay model for radioactive substances',
    scenario: 'A radioactive isotope decays over time following exponential decay',
    realWorldContext: 'Used in carbon dating, nuclear medicine, and nuclear power safety',
    parameters: [
      {
        name: 'N0',
        label: 'Initial Amount',
        min: 100,
        max: 10000,
        step: 100,
        default: 5000,
        unit: 'grams',
        description: 'Starting mass of radioactive material',
      },
      {
        name: 'halfLife',
        label: 'Half-Life',
        min: 1,
        max: 50,
        step: 1,
        default: 10,
        unit: 'years',
        description: 'Time for half the substance to decay',
      },
      {
        name: 'tMax',
        label: 'Time Period',
        min: 10,
        max: 100,
        step: 5,
        default: 50,
        unit: 'years',
        description: 'Duration to model',
      },
    ],
    generateGraph: (params) => {
      const N0 = params.N0
      const halfLife = params.halfLife
      const lambda = Math.log(2) / halfLife
      const tMax = params.tMax

      return {
        expressions: [
          {
            latex: `y = ${N0}e^{-${lambda.toFixed(4)}x}`,
            color: '#ef4444',
            lineWidth: 3,
            label: 'Amount Remaining',
          },
          {
            latex: `x = ${halfLife}`,
            color: '#3b82f6',
            lineStyle: 'DASHED',
            label: 'Half-Life',
          },
          {
            latex: `y = ${(N0 / 2).toFixed(0)}`,
            color: '#10b981',
            lineStyle: 'DASHED',
            label: 'Half Amount',
          },
        ],
        bounds: { left: 0, right: tMax, bottom: 0, top: N0 * 1.1 },
      }
    },
    explanation: (params) => {
      const N0 = params.N0
      const halfLife = params.halfLife
      const lambda = Math.log(2) / halfLife
      const tMax = params.tMax
      const remaining = N0 * Math.exp(-lambda * tMax)

      return `Starting with ${N0}g of radioactive material with half-life ${halfLife} years, the decay follows N(t) = ${N0}e^{-${lambda.toFixed(4)}t}. After ${tMax} years, ${remaining.toFixed(2)}g remains (${((remaining / N0) * 100).toFixed(1)}% of original). Decay constant λ = ln(2)/t₁/₂ = ${lambda.toFixed(4)} per year.`
    },
    keyInsights: [
      'Exponential decay: N(t) = N₀e^(-λt) where λ is decay constant',
      'Half-life t₁/₂ = ln(2)/λ is constant regardless of amount',
      'After n half-lives, amount remaining = N₀/2ⁿ',
      'Used in radiocarbon dating to determine age of artifacts',
    ],
  }),

  // Trigonometric: Wave Motion
  waveMotion: (): ModelConfig => ({
    title: 'Wave Motion & Oscillations',
    description: 'Model periodic motion using trigonometric functions',
    scenario: 'A weight on a spring oscillates up and down, or a wave propagates through space',
    realWorldContext: 'Used in physics (sound waves, light), engineering (vibrations), and signal processing',
    parameters: [
      {
        name: 'amplitude',
        label: 'Amplitude',
        min: 0.5,
        max: 5,
        step: 0.25,
        default: 2,
        unit: 'meters',
        description: 'Maximum displacement from equilibrium',
      },
      {
        name: 'frequency',
        label: 'Frequency',
        min: 0.5,
        max: 3,
        step: 0.25,
        default: 1,
        unit: 'Hz',
        description: 'Number of complete oscillations per second',
      },
      {
        name: 'phase',
        label: 'Phase Shift',
        min: 0,
        max: 6.28,
        step: 0.314,
        default: 0,
        unit: 'radians',
        description: 'Horizontal shift of the wave',
      },
    ],
    generateGraph: (params) => {
      const A = params.amplitude
      const f = params.frequency
      const phi = params.phase
      const omega = 2 * Math.PI * f

      return {
        expressions: [
          {
            latex: `y = ${A.toFixed(2)}\\sin(${omega.toFixed(2)}x - ${phi.toFixed(2)})`,
            color: '#3b82f6',
            lineWidth: 3,
            label: 'Displacement',
          },
          {
            latex: `y = ${A.toFixed(2)}`,
            color: '#ef4444',
            lineStyle: 'DASHED',
            label: 'Max Amplitude',
          },
          {
            latex: `y = -${A.toFixed(2)}`,
            color: '#ef4444',
            lineStyle: 'DASHED',
            label: 'Min Amplitude',
          },
        ],
        bounds: { left: 0, right: 4 / f, bottom: -A * 1.5, top: A * 1.5 },
      }
    },
    explanation: (params) => {
      const A = params.amplitude
      const f = params.frequency
      const phi = params.phase
      const omega = 2 * Math.PI * f
      const period = 1 / f

      return `The wave motion follows y(t) = ${A.toFixed(2)}sin(${omega.toFixed(2)}t - ${phi.toFixed(2)}). Amplitude: ${A}m (maximum displacement). Frequency: ${f}Hz (oscillations per second). Period: ${period.toFixed(2)}s (time for one complete cycle). Angular frequency ω = 2πf = ${omega.toFixed(2)} rad/s. Phase shift: ${phi.toFixed(2)} radians.`
    },
    keyInsights: [
      'General wave equation: y = A·sin(ωt - φ) where ω = 2πf',
      'Amplitude A determines maximum displacement',
      'Period T = 1/f is time for one complete oscillation',
      'Phase shift φ represents horizontal translation of the wave',
    ],
  }),

  // Calculus: Optimization Problem
  boxOptimization: (): ModelConfig => ({
    title: 'Box Volume Optimization',
    description: 'Maximize volume of an open box cut from a rectangular sheet',
    scenario: 'Cut equal squares from corners of a sheet and fold to create an open box',
    realWorldContext: 'Common in manufacturing, packaging design, and cost minimization problems',
    parameters: [
      {
        name: 'length',
        label: 'Sheet Length',
        min: 20,
        max: 100,
        step: 5,
        default: 50,
        unit: 'cm',
        description: 'Length of rectangular sheet',
      },
      {
        name: 'width',
        label: 'Sheet Width',
        min: 20,
        max: 100,
        step: 5,
        default: 40,
        unit: 'cm',
        description: 'Width of rectangular sheet',
      },
    ],
    generateGraph: (params) => {
      const L = params.length
      const W = params.width
      const maxX = Math.min(L, W) / 2

      // V(x) = x(L-2x)(W-2x) = 4x³ - 2x²(L+W) + xLW
      const a = 4
      const b = -2 * (L + W)
      const c = L * W

      // Find critical point using calculus: dV/dx = 0
      // dV/dx = 12x² - 4x(L+W) + LW = 0
      const discriminant = 16 * (L + W) * (L + W) - 48 * L * W
      const criticalX = (4 * (L + W) - Math.sqrt(discriminant)) / 24

      const maxVolume = criticalX * (L - 2 * criticalX) * (W - 2 * criticalX)

      return {
        expressions: [
          {
            latex: `y = x(${L}-2x)(${W}-2x)`,
            color: '#3b82f6',
            lineWidth: 3,
            label: 'Volume Function',
          },
          {
            latex: `(${criticalX.toFixed(2)}, ${maxVolume.toFixed(2)})`,
            color: '#ef4444',
            label: 'Maximum Volume',
            points: true,
          },
          {
            latex: `x = ${criticalX.toFixed(2)}`,
            color: '#10b981',
            lineStyle: 'DASHED',
            label: 'Optimal Cut',
          },
        ],
        bounds: { left: 0, right: maxX, bottom: 0, top: maxVolume * 1.2 },
      }
    },
    explanation: (params) => {
      const L = params.length
      const W = params.width
      const discriminant = 16 * (L + W) * (L + W) - 48 * L * W
      const criticalX = (4 * (L + W) - Math.sqrt(discriminant)) / 24
      const maxVolume = criticalX * (L - 2 * criticalX) * (W - 2 * criticalX)

      return `From a ${L}×${W}cm sheet, cut ${criticalX.toFixed(2)}cm squares from each corner to maximize volume. This creates a box with volume ${maxVolume.toFixed(2)}cm³. Using calculus: V(x) = x(${L}-2x)(${W}-2x), dV/dx = 12x² - ${4 * (L + W)}x + ${L * W}. Setting dV/dx = 0 gives x = ${criticalX.toFixed(2)}cm for maximum volume.`
    },
    keyInsights: [
      'Volume function is cubic: V(x) = x(L-2x)(W-2x)',
      'Find maximum by taking derivative and setting to zero',
      'Second derivative test confirms it\'s a maximum',
      'Optimization requires understanding domain constraints (0 < x < min(L,W)/2)',
    ],
  }),

  // Calculus: Rate of Change
  tankDrainage: (): ModelConfig => ({
    title: 'Tank Drainage Rate',
    description: 'Model the rate at which water drains from a tank',
    scenario: 'A cylindrical tank drains through a hole at the bottom - find drainage rate',
    realWorldContext: 'Used in fluid mechanics, civil engineering, and hydraulic system design',
    parameters: [
      {
        name: 'radius',
        label: 'Tank Radius',
        min: 1,
        max: 5,
        step: 0.5,
        default: 2,
        unit: 'meters',
        description: 'Radius of cylindrical tank',
      },
      {
        name: 'initialHeight',
        label: 'Initial Water Height',
        min: 2,
        max: 10,
        step: 0.5,
        default: 5,
        unit: 'meters',
        description: 'Starting water level',
      },
      {
        name: 'drainRate',
        label: 'Drain Coefficient',
        min: 0.1,
        max: 1,
        step: 0.1,
        default: 0.5,
        unit: 'm²/s',
        description: 'Rate constant for drainage',
      },
    ],
    generateGraph: (params) => {
      const r = params.radius
      const h0 = params.initialHeight
      const k = params.drainRate
      const A = Math.PI * r * r

      // dh/dt = -k/A (Torricelli's law simplified)
      // h(t) = h0 - (k/A)t

      const emptyTime = (A * h0) / k

      return {
        expressions: [
          {
            latex: `y = ${h0.toFixed(2)} - ${(k / A).toFixed(4)}x`,
            color: '#3b82f6',
            lineWidth: 3,
            label: 'Water Height',
          },
          {
            latex: `x = ${emptyTime.toFixed(2)}`,
            color: '#ef4444',
            lineStyle: 'DASHED',
            label: 'Empty Time',
          },
          {
            latex: `y = 0`,
            color: '#10b981',
            lineStyle: 'SOLID',
            lineWidth: 2,
            label: 'Tank Bottom',
          },
        ],
        bounds: { left: 0, right: emptyTime * 1.2, bottom: -0.5, top: h0 * 1.2 },
      }
    },
    explanation: (params) => {
      const r = params.radius
      const h0 = params.initialHeight
      const k = params.drainRate
      const A = Math.PI * r * r
      const drainRatePerSec = k / A
      const emptyTime = (A * h0) / k
      const volumeRate = k

      return `Tank with radius ${r}m and initial height ${h0}m drains according to h(t) = ${h0.toFixed(2)} - ${drainRatePerSec.toFixed(4)}t. Tank cross-sectional area: ${A.toFixed(2)}m². Drainage rate: dh/dt = -${drainRatePerSec.toFixed(4)} m/s (constant). Volume flow rate: ${volumeRate.toFixed(2)} m³/s. Time to empty: ${emptyTime.toFixed(2)} seconds.`
    },
    keyInsights: [
      'Rate of change equation: dh/dt = -k/A (negative for draining)',
      'Linear model assumes constant drainage rate',
      'Real drainage follows Torricelli\'s law: v = √(2gh) where rate depends on height',
      'Integration gives height as function of time: h(t) = h₀ - (k/A)t',
    ],
  }),

  // Coordinate Geometry: Circle Equations
  circleGeometry: (): ModelConfig => ({
    title: 'Circle Equations & Tangent Lines',
    description: 'Explore circles in coordinate geometry with centers, radii, and tangent lines',
    scenario: 'A circle with adjustable center and radius, showing how the equation changes',
    realWorldContext: 'Used in GPS systems, satellite coverage areas, and architectural design',
    parameters: [
      {
        name: 'h',
        label: 'Center X-coordinate',
        min: -5,
        max: 5,
        step: 0.5,
        default: 0,
        description: 'Horizontal position of circle center',
      },
      {
        name: 'k',
        label: 'Center Y-coordinate',
        min: -5,
        max: 5,
        step: 0.5,
        default: 0,
        description: 'Vertical position of circle center',
      },
      {
        name: 'r',
        label: 'Radius',
        min: 1,
        max: 6,
        step: 0.5,
        default: 3,
        unit: 'units',
        description: 'Distance from center to any point on circle',
      },
    ],
    generateGraph: (params) => {
      const h = params.h
      const k = params.k
      const r = params.r

      return {
        expressions: [
          {
            latex: `(x - ${h.toFixed(1)})^2 + (y - ${k.toFixed(1)})^2 = ${(r * r).toFixed(1)}`,
            color: '#3b82f6',
            lineWidth: 3,
            label: 'Circle',
          },
          {
            latex: `(${h.toFixed(1)}, ${k.toFixed(1)})`,
            color: '#ef4444',
            label: 'Center',
            points: true,
          },
          {
            latex: `x = ${h.toFixed(1)}`,
            color: '#9ca3af',
            lineStyle: 'DASHED',
            lineWidth: 1,
          },
          {
            latex: `y = ${k.toFixed(1)}`,
            color: '#9ca3af',
            lineStyle: 'DASHED',
            lineWidth: 1,
          },
        ],
        bounds: { left: h - r - 2, right: h + r + 2, bottom: k - r - 2, top: k + r + 2 },
      }
    },
    explanation: (params) => {
      const h = params.h
      const k = params.k
      const r = params.r
      const area = Math.PI * r * r
      const circumference = 2 * Math.PI * r

      return `Circle equation: (x - ${h.toFixed(1)})² + (y - ${k.toFixed(1)})² = ${(r * r).toFixed(1)}. Center: (${h.toFixed(1)}, ${k.toFixed(1)}), Radius: ${r.toFixed(1)} units. Area = πr² = ${area.toFixed(2)} square units. Circumference = 2πr = ${circumference.toFixed(2)} units. Distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²]`
    },
    keyInsights: [
      'Standard circle form: (x-h)² + (y-k)² = r² where (h,k) is center',
      'Expanding gives general form: x² + y² + Dx + Ey + F = 0',
      'Complete the square to convert general form to standard form',
      'Tangent lines are perpendicular to the radius at point of contact',
    ],
  }),

  // Linear Systems: Simultaneous Equations
  simultaneousEquations: (): ModelConfig => ({
    title: 'Simultaneous Linear Equations',
    description: 'Visualize the intersection point of two linear equations',
    scenario: 'Two lines representing equations - find where they meet',
    realWorldContext: 'Used in economics (supply/demand equilibrium), physics (motion problems), and optimization',
    parameters: [
      {
        name: 'm1',
        label: 'Line 1 Slope',
        min: -3,
        max: 3,
        step: 0.25,
        default: 2,
        description: 'Steepness of first line',
      },
      {
        name: 'b1',
        label: 'Line 1 Y-intercept',
        min: -5,
        max: 5,
        step: 0.5,
        default: 1,
        description: 'Where first line crosses y-axis',
      },
      {
        name: 'm2',
        label: 'Line 2 Slope',
        min: -3,
        max: 3,
        step: 0.25,
        default: -1,
        description: 'Steepness of second line',
      },
      {
        name: 'b2',
        label: 'Line 2 Y-intercept',
        min: -5,
        max: 5,
        step: 0.5,
        default: 6,
        description: 'Where second line crosses y-axis',
      },
    ],
    generateGraph: (params) => {
      const m1 = params.m1
      const b1 = params.b1
      const m2 = params.m2
      const b2 = params.b2

      // Find intersection: m1*x + b1 = m2*x + b2
      // x = (b2 - b1) / (m1 - m2)
      let intersectionX = 0
      let intersectionY = 0
      let hasIntersection = Math.abs(m1 - m2) > 0.01

      if (hasIntersection) {
        intersectionX = (b2 - b1) / (m1 - m2)
        intersectionY = m1 * intersectionX + b1
      }

      const expressions: any[] = [
        {
          latex: `y = ${m1.toFixed(2)}x + ${b1.toFixed(2)}`,
          color: '#3b82f6',
          lineWidth: 3,
          label: 'Line 1',
        },
        {
          latex: `y = ${m2.toFixed(2)}x + ${b2.toFixed(2)}`,
          color: '#10b981',
          lineWidth: 3,
          label: 'Line 2',
        },
      ]

      if (hasIntersection) {
        expressions.push({
          latex: `(${intersectionX.toFixed(2)}, ${intersectionY.toFixed(2)})`,
          color: '#ef4444',
          label: 'Intersection',
          points: true,
        })
      }

      return {
        expressions,
        bounds: { left: -10, right: 10, bottom: -10, top: 10 },
      }
    },
    explanation: (params) => {
      const m1 = params.m1
      const b1 = params.b1
      const m2 = params.m2
      const b2 = params.b2

      if (Math.abs(m1 - m2) < 0.01) {
        if (Math.abs(b1 - b2) < 0.01) {
          return `Lines are IDENTICAL - infinite solutions! Both equations represent the same line: y = ${m1.toFixed(2)}x + ${b1.toFixed(2)}. Every point on the line satisfies both equations.`
        } else {
          return `Lines are PARALLEL - no solution! Slopes are equal (m₁ = m₂ = ${m1.toFixed(2)}) but different y-intercepts. Parallel lines never intersect, so there's no (x,y) that satisfies both equations.`
        }
      }

      const intersectionX = (b2 - b1) / (m1 - m2)
      const intersectionY = m1 * intersectionX + b1

      return `Lines intersect at (${intersectionX.toFixed(2)}, ${intersectionY.toFixed(2)}). Solution method: Set equations equal: ${m1.toFixed(2)}x + ${b1.toFixed(2)} = ${m2.toFixed(2)}x + ${b2.toFixed(2)}. Solve for x: x = ${intersectionX.toFixed(2)}. Substitute back: y = ${intersectionY.toFixed(2)}. This point satisfies BOTH equations simultaneously!`
    },
    keyInsights: [
      'Intersection point satisfies both equations simultaneously',
      'Parallel lines (equal slopes) have no solution',
      'Identical lines have infinite solutions',
      'Can solve by substitution, elimination, or graphical methods',
    ],
  }),

  // Polynomials: Cubic Functions
  polynomialRoots: (): ModelConfig => ({
    title: 'Polynomial Functions & Roots',
    description: 'Explore cubic polynomials and their roots (x-intercepts)',
    scenario: 'A cubic function showing how coefficient changes affect the curve and roots',
    realWorldContext: 'Used in engineering (stress-strain curves), economics (cost functions), and computer graphics',
    parameters: [
      {
        name: 'a',
        label: 'Leading Coefficient (a)',
        min: -2,
        max: 2,
        step: 0.25,
        default: 1,
        description: 'Coefficient of x³ term',
      },
      {
        name: 'b',
        label: 'Quadratic Term (b)',
        min: -5,
        max: 5,
        step: 0.5,
        default: -3,
        description: 'Coefficient of x² term',
      },
      {
        name: 'c',
        label: 'Linear Term (c)',
        min: -5,
        max: 5,
        step: 0.5,
        default: 0,
        description: 'Coefficient of x term',
      },
      {
        name: 'd',
        label: 'Constant Term (d)',
        min: -5,
        max: 5,
        step: 0.5,
        default: 0,
        description: 'Constant term',
      },
    ],
    generateGraph: (params) => {
      const a = params.a
      const b = params.b
      const c = params.c
      const d = params.d

      return {
        expressions: [
          {
            latex: `y = ${a.toFixed(2)}x^3 + ${b.toFixed(2)}x^2 + ${c.toFixed(2)}x + ${d.toFixed(2)}`,
            color: '#3b82f6',
            lineWidth: 3,
            label: 'Polynomial',
          },
          {
            latex: 'y = 0',
            color: '#ef4444',
            lineStyle: 'DASHED',
            label: 'x-axis (roots)',
          },
        ],
        bounds: { left: -5, right: 5, bottom: -10, top: 10 },
      }
    },
    explanation: (params) => {
      const a = params.a
      const b = params.b
      const c = params.c
      const d = params.d

      const sign_a = a > 0 ? 'rises' : 'falls'
      const behavior = a > 0
        ? 'falls to the left and rises to the right'
        : 'rises to the left and falls to the right'

      return `Polynomial: f(x) = ${a.toFixed(2)}x³ + ${b.toFixed(2)}x² + ${c.toFixed(2)}x + ${d.toFixed(2)}. Since a = ${a.toFixed(2)} ${a > 0 ? '> 0' : '< 0'}, the curve ${behavior}. A cubic function can have 1, 2, or 3 real roots (x-intercepts). Use factor theorem: if f(r) = 0, then (x-r) is a factor. Remainder theorem: dividing by (x-r) gives remainder f(r).`
    },
    keyInsights: [
      'Degree 3 polynomial has up to 3 real roots',
      'Factor theorem: f(r) = 0 ⟺ (x-r) is a factor',
      'Remainder theorem: f(x) ÷ (x-r) has remainder f(r)',
      'End behavior determined by leading coefficient sign',
    ],
  }),

  // Inequalities: Quadratic Inequality
  quadraticInequality: (): ModelConfig => ({
    title: 'Quadratic Inequalities',
    description: 'Visualize solution regions for quadratic inequalities',
    scenario: 'Find where a quadratic function is above or below the x-axis',
    realWorldContext: 'Used in physics (projectile safe zones), economics (profit regions), and engineering (design constraints)',
    parameters: [
      {
        name: 'a',
        label: 'Leading Coefficient',
        min: -2,
        max: 2,
        step: 0.25,
        default: 1,
        description: 'Determines if parabola opens up or down',
      },
      {
        name: 'b',
        label: 'Linear Coefficient',
        min: -6,
        max: 6,
        step: 0.5,
        default: -2,
        description: 'Affects vertex position',
      },
      {
        name: 'c',
        label: 'Constant Term',
        min: -8,
        max: 8,
        step: 0.5,
        default: -3,
        description: 'Y-intercept of parabola',
      },
    ],
    generateGraph: (params) => {
      const a = params.a
      const b = params.b
      const c = params.c

      // Find roots using quadratic formula
      const discriminant = b * b - 4 * a * c
      let root1 = 0
      let root2 = 0
      let hasRoots = discriminant >= 0

      if (hasRoots && a !== 0) {
        root1 = (-b + Math.sqrt(discriminant)) / (2 * a)
        root2 = (-b - Math.sqrt(discriminant)) / (2 * a)
      }

      const expressions: any[] = [
        {
          latex: `y = ${a.toFixed(2)}x^2 + ${b.toFixed(2)}x + ${c.toFixed(2)}`,
          color: '#3b82f6',
          lineWidth: 3,
          label: 'Parabola',
        },
        {
          latex: 'y = 0',
          color: '#ef4444',
          lineStyle: 'DASHED',
          label: 'y = 0 boundary',
        },
      ]

      if (hasRoots && Math.abs(a) > 0.01) {
        const minRoot = Math.min(root1, root2)
        const maxRoot = Math.max(root1, root2)

        expressions.push({
          latex: `${minRoot.toFixed(2)} < x < ${maxRoot.toFixed(2)} \\{y > 0\\}`,
          color: a > 0 ? '#10b981' : '#9ca3af',
          lineStyle: 'DOTTED',
        })
      }

      return {
        expressions,
        bounds: { left: -10, right: 10, bottom: -15, top: 15 },
      }
    },
    explanation: (params) => {
      const a = params.a
      const b = params.b
      const c = params.c

      if (Math.abs(a) < 0.01) {
        return `Not a quadratic (a ≈ 0). This is a linear function: ${b.toFixed(2)}x + ${c.toFixed(2)}`
      }

      const discriminant = b * b - 4 * a * c

      if (discriminant < 0) {
        if (a > 0) {
          return `No real roots (discriminant < 0). Parabola opens upward and is entirely ABOVE x-axis. Inequality ax² + bx + c > 0 is true for ALL x ∈ ℝ. Inequality ax² + bx + c < 0 has NO solution.`
        } else {
          return `No real roots (discriminant < 0). Parabola opens downward and is entirely BELOW x-axis. Inequality ax² + bx + c < 0 is true for ALL x ∈ ℝ. Inequality ax² + bx + c > 0 has NO solution.`
        }
      }

      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a)
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a)
      const minRoot = Math.min(root1, root2)
      const maxRoot = Math.max(root1, root2)

      if (a > 0) {
        return `Roots: x = ${minRoot.toFixed(2)} and x = ${maxRoot.toFixed(2)}. Parabola opens UPWARD. Solutions: y > 0 when x < ${minRoot.toFixed(2)} OR x > ${maxRoot.toFixed(2)}. Solutions: y < 0 when ${minRoot.toFixed(2)} < x < ${maxRoot.toFixed(2)}. Test point method: pick x-value and check sign!`
      } else {
        return `Roots: x = ${minRoot.toFixed(2)} and x = ${maxRoot.toFixed(2)}. Parabola opens DOWNWARD. Solutions: y > 0 when ${minRoot.toFixed(2)} < x < ${maxRoot.toFixed(2)}. Solutions: y < 0 when x < ${minRoot.toFixed(2)} OR x > ${maxRoot.toFixed(2)}. Remember to flip inequality when multiplying by negative!`
      }
    },
    keyInsights: [
      'Find roots first by factoring or quadratic formula',
      'Test points in each region to determine sign',
      'Parabola opening direction determines solution regions',
      'No real roots means always positive or always negative',
    ],
  }),
}
