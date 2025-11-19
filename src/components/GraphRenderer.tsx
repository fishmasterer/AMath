'use client'

import React, { useEffect, useRef } from 'react'

// Desmos Calculator types
declare global {
  interface Window {
    Desmos?: {
      GraphingCalculator: (element: HTMLElement, options?: any) => any
    }
  }
}

export interface GraphConfig {
  equations?: string[]  // e.g., ["y = x^2", "y = 2x + 1"]
  bounds?: {
    left?: number
    right?: number
    bottom?: number
    top?: number
  }
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  expressions?: Array<{
    latex: string
    color?: string
    lineStyle?: 'SOLID' | 'DASHED' | 'DOTTED'
    lineWidth?: number
    hidden?: boolean
    label?: string
    showLabel?: boolean
    points?: boolean
  }>
  settings?: {
    fontSize?: number
    invertedColors?: boolean
    projectorMode?: boolean
  }
}

interface GraphRendererProps {
  config: GraphConfig
  width?: string | number
  height?: string | number
  className?: string
}

export const GraphRenderer: React.FC<GraphRendererProps> = ({
  config,
  width = '100%',
  height = 400,
  className = '',
}) => {
  const calculatorRef = useRef<HTMLDivElement>(null)
  const calculatorInstance = useRef<any>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    // Load Desmos API script
    const loadDesmosScript = () => {
      if (scriptLoaded.current || window.Desmos) {
        initializeCalculator()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6'
      script.async = true
      script.onload = () => {
        scriptLoaded.current = true
        initializeCalculator()
      }
      document.body.appendChild(script)
    }

    const initializeCalculator = () => {
      if (!calculatorRef.current || !window.Desmos) return

      // Destroy existing calculator if it exists
      if (calculatorInstance.current) {
        calculatorInstance.current.destroy()
      }

      // Create calculator options
      const options = {
        keypad: false,
        expressions: false,
        settingsMenu: false,
        zoomButtons: true,
        expressionsTopbar: false,
        ...config.settings,
      }

      // Initialize calculator
      calculatorInstance.current = window.Desmos.GraphingCalculator(calculatorRef.current, options)

      // Set bounds if provided
      if (config.bounds) {
        calculatorInstance.current.setMathBounds(config.bounds)
      }

      // Add expressions
      if (config.expressions) {
        config.expressions.forEach((expr, index) => {
          calculatorInstance.current.setExpression({
            id: `expr-${index}`,
            latex: expr.latex,
            color: expr.color || (index === 0 ? '#2563eb' : undefined),
            lineStyle: expr.lineStyle || 'SOLID',
            lineWidth: expr.lineWidth || 2.5,
            hidden: expr.hidden || false,
            label: expr.label,
            showLabel: expr.showLabel !== false,
            points: expr.points !== false,
          })
        })
      }

      // Legacy: Support simple equations array
      if (config.equations && !config.expressions) {
        config.equations.forEach((equation, index) => {
          calculatorInstance.current.setExpression({
            id: `eq-${index}`,
            latex: equation,
            color: index === 0 ? '#2563eb' : undefined,
          })
        })
      }
    }

    loadDesmosScript()

    return () => {
      if (calculatorInstance.current) {
        calculatorInstance.current.destroy()
      }
    }
  }, [config])

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-lg ${className}`}
      style={{ width, height }}
    >
      <div ref={calculatorRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

// Preset graph configurations for common A-Level topics
export const GraphPresets = {
  quadratic: (a = 1, b = 0, c = 0): GraphConfig => ({
    expressions: [
      {
        latex: `y = ${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`,
        color: '#2563eb',
        label: 'Quadratic Function',
      },
    ],
    bounds: { left: -10, right: 10, bottom: -10, top: 10 },
  }),

  trigonometric: (func: 'sin' | 'cos' | 'tan' = 'sin', amplitude = 1, period = 1): GraphConfig => ({
    expressions: [
      {
        latex: `y = ${amplitude}\\${func}(${period}x)`,
        color: '#dc2626',
        label: `y = ${amplitude}${func}(${period}x)`,
      },
    ],
    bounds: { left: -2 * Math.PI, right: 2 * Math.PI, bottom: -2, top: 2 },
  }),

  exponential: (base = 2, coefficient = 1): GraphConfig => ({
    expressions: [
      {
        latex: `y = ${coefficient} \\cdot ${base}^x`,
        color: '#16a34a',
        label: `Exponential: ${coefficient} × ${base}^x`,
      },
    ],
    bounds: { left: -5, right: 5, bottom: -2, top: 10 },
  }),

  logarithmic: (base = Math.E): GraphConfig => ({
    expressions: [
      {
        latex: base === Math.E ? 'y = \\ln(x)' : `y = \\log_{${base}}(x)`,
        color: '#9333ea',
        label: base === Math.E ? 'Natural Log' : `Log base ${base}`,
      },
    ],
    bounds: { left: -2, right: 10, bottom: -5, top: 5 },
  }),

  polynomial: (coefficients: number[]): GraphConfig => {
    const terms = coefficients.map((coef, index) => {
      const power = coefficients.length - 1 - index
      if (power === 0) return `${coef}`
      if (power === 1) return `${coef}x`
      return `${coef}x^${power}`
    }).join(' + ').replace(/\+ -/g, '- ')

    return {
      expressions: [
        {
          latex: `y = ${terms}`,
          color: '#ea580c',
          label: 'Polynomial',
        },
      ],
      bounds: { left: -10, right: 10, bottom: -20, top: 20 },
    }
  },

  circleEllipse: (a = 5, b = 3, centerX = 0, centerY = 0): GraphConfig => ({
    expressions: [
      {
        latex: `\\frac{(x - ${centerX})^2}{${a}^2} + \\frac{(y - ${centerY})^2}{${b}^2} = 1`,
        color: '#06b6d4',
        label: a === b ? 'Circle' : 'Ellipse',
      },
    ],
    bounds: { left: -10, right: 10, bottom: -10, top: 10 },
  }),

  derivative: (originalFunc: string, derivativeFunc: string): GraphConfig => ({
    expressions: [
      {
        latex: originalFunc,
        color: '#2563eb',
        label: 'f(x)',
      },
      {
        latex: derivativeFunc,
        color: '#dc2626',
        lineStyle: 'DASHED',
        label: "f'(x)",
      },
    ],
    bounds: { left: -10, right: 10, bottom: -10, top: 10 },
  }),
}

export default GraphRenderer
