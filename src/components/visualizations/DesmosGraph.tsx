'use client';

import { useEffect, useRef, useState } from 'react';
import { DesmosExpression, DesmosBounds, DesmosCalculator } from '@/types/desmos';

interface DesmosGraphProps {
  expressions: DesmosExpression[];
  bounds?: DesmosBounds;
  height?: number;
  interactive?: boolean;
  showGrid?: boolean;
  showAxes?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  className?: string;
  onCalculatorReady?: (calculator: unknown) => void;
}

export function DesmosGraph({
  expressions,
  bounds,
  height = 400,
  interactive = true,
  showGrid = true,
  showAxes = true,
  showXAxis = true,
  showYAxis = true,
  xAxisLabel = '',
  yAxisLabel = '',
  className = '',
  onCalculatorReady,
}: DesmosGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<DesmosCalculator | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load Desmos API script
  useEffect(() => {
    // Check if already loaded
    if (window.Desmos) {
      setIsLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
    script.async = true;
    script.onload = () => setIsLoading(false);
    script.onerror = () => setError('Failed to load Desmos API');
    document.head.appendChild(script);

    return () => {
      // Don't remove script on unmount - it's shared
    };
  }, []);

  // Initialize calculator when API is ready
  useEffect(() => {
    if (isLoading || error || !containerRef.current || !window.Desmos) return;

    // Create calculator instance
    const calculator = new window.Desmos.GraphingCalculator(containerRef.current, {
      expressions: interactive,
      settingsMenu: interactive,
      zoomButtons: interactive,
      lockViewport: !interactive,
      border: false,
      keypad: false,
      showGrid,
      xAxisLabel,
      yAxisLabel,
    });

    calculatorRef.current = calculator;

    // Set expressions
    expressions.forEach((expr, index) => {
      calculator.setExpression({
        id: expr.id || `expr-${index}`,
        latex: expr.latex,
        color: expr.color || '#2563eb',
        lineStyle: expr.lineStyle,
        pointStyle: expr.pointStyle,
        lineWidth: expr.lineWidth,
        pointSize: expr.pointSize,
        fill: expr.fill,
        fillOpacity: expr.fillOpacity,
        label: expr.label,
        showLabel: expr.showLabel,
        hidden: expr.hidden,
        sliderBounds: expr.sliderBounds,
      });
    });

    // Set bounds if provided
    if (bounds) {
      calculator.setMathBounds(bounds);
    }

    // Notify parent
    if (onCalculatorReady) {
      onCalculatorReady(calculator);
    }

    // Cleanup
    return () => {
      calculator.destroy();
      calculatorRef.current = null;
    };
  }, [isLoading, error, expressions, bounds, interactive, showGrid, showAxes, showXAxis, showYAxis, xAxisLabel, yAxisLabel, onCalculatorReady]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-800 rounded-xl border border-white/10 ${className}`}
        style={{ height }}
      >
        <div className="text-center text-white/60">
          <p className="mb-2">Unable to load interactive graph</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-slate-800"
          style={{ height }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/60 text-sm">Loading interactive graph...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        style={{ height, width: '100%' }}
        className={isLoading ? 'invisible' : ''}
      />
    </div>
  );
}

// Preset graph configurations
export const GraphPresets = {
  parabola: (a = 1, b = 0, c = 0): DesmosExpression[] => [
    {
      id: 'slider-a',
      latex: `a = ${a}`,
      sliderBounds: { min: -5, max: 5, step: 0.1 },
    },
    {
      id: 'slider-b',
      latex: `b = ${b}`,
      sliderBounds: { min: -10, max: 10 },
    },
    {
      id: 'slider-c',
      latex: `c = ${c}`,
      sliderBounds: { min: -10, max: 10 },
    },
    {
      id: 'parabola',
      latex: 'y = ax^2 + bx + c',
      color: '#2563eb',
    },
    {
      id: 'vertex',
      latex: '\\left(-\\frac{b}{2a}, a\\left(-\\frac{b}{2a}\\right)^2 + b\\left(-\\frac{b}{2a}\\right) + c\\right)',
      color: '#dc2626',
      pointStyle: 'POINT',
    },
  ],

  sineCosine: (): DesmosExpression[] => [
    {
      id: 'sine',
      latex: 'y = \\sin(x)',
      color: '#2563eb',
    },
    {
      id: 'cosine',
      latex: 'y = \\cos(x)',
      color: '#16a34a',
    },
  ],

  exponential: (): DesmosExpression[] => [
    {
      id: 'exp',
      latex: 'y = e^x',
      color: '#2563eb',
    },
    {
      id: 'ln',
      latex: 'y = \\ln(x)',
      color: '#dc2626',
    },
    {
      id: 'mirror',
      latex: 'y = x',
      color: '#94a3b8',
      lineStyle: 'DASHED',
    },
  ],

  unitCircle: (): DesmosExpression[] => [
    {
      id: 'circle',
      latex: 'x^2 + y^2 = 1',
      color: '#2563eb',
    },
    {
      id: 'angle-slider',
      latex: '\\theta = 1',
      sliderBounds: { min: 0, max: 6.28, step: 0.01 },
    },
    {
      id: 'point',
      latex: '(\\cos(\\theta), \\sin(\\theta))',
      color: '#dc2626',
      pointStyle: 'POINT',
    },
    {
      id: 'cos-line',
      latex: '((0, 0), (\\cos(\\theta), 0))',
      color: '#16a34a',
    },
    {
      id: 'sin-line',
      latex: '((\\cos(\\theta), 0), (\\cos(\\theta), \\sin(\\theta)))',
      color: '#dc2626',
    },
  ],

  derivative: (): DesmosExpression[] => [
    {
      id: 'function',
      latex: 'f(x) = x^3 - 3x',
      color: '#2563eb',
    },
    {
      id: 'point-slider',
      latex: 'a = 0',
      sliderBounds: { min: -3, max: 3, step: 0.1 },
    },
    {
      id: 'point',
      latex: '(a, f(a))',
      color: '#dc2626',
      pointStyle: 'POINT',
    },
    {
      id: 'tangent',
      latex: 'y = f\'(a)(x - a) + f(a)',
      color: '#16a34a',
    },
  ],
};

// Static graph component for non-interactive displays
interface StaticGraphProps {
  expressions: DesmosExpression[];
  bounds?: DesmosBounds;
  height?: number;
  className?: string;
}

export function StaticDesmosGraph({
  expressions,
  bounds,
  height = 300,
  className = '',
}: StaticGraphProps) {
  return (
    <DesmosGraph
      expressions={expressions}
      bounds={bounds}
      height={height}
      interactive={false}
      className={className}
    />
  );
}
