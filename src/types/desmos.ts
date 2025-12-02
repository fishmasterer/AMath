// Shared Desmos API type declarations

export interface DesmosExpression {
  id?: string;
  latex?: string;
  color?: string;
  lineStyle?: 'SOLID' | 'DASHED' | 'DOTTED';
  pointStyle?: 'POINT' | 'OPEN' | 'CROSS';
  lineWidth?: number;
  pointSize?: number;
  fill?: boolean;
  fillOpacity?: number;
  label?: string;
  showLabel?: boolean;
  hidden?: boolean;
  sliderBounds?: {
    min?: number;
    max?: number;
    step?: number;
  };
}

export interface DesmosBounds {
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
}

export interface DesmosCalculator {
  setExpression: (expr: DesmosExpression) => void;
  setMathBounds: (bounds: DesmosBounds) => void;
  getExpressions: () => Array<{ id: string; latex: string }>;
  destroy: () => void;
  getState: () => unknown;
  setState: (state: unknown) => void;
  observeEvent: (event: string, callback: () => void) => void;
  expressionAnalysis?: Record<string, { evaluation?: { value?: number } }>;
}

// Global Window extension for Desmos
declare global {
  interface Window {
    Desmos?: {
      GraphingCalculator: new (
        element: HTMLElement,
        options?: Record<string, unknown>
      ) => DesmosCalculator;
    };
  }
}

// Required for module augmentation
export {};
