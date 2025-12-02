'use client';

import { useEffect, useRef, useState } from 'react';

// GeoGebra applet types
interface GeoGebraAppletParameters {
  id?: string;
  width?: number;
  height?: number;
  showToolBar?: boolean;
  showMenuBar?: boolean;
  showAlgebraInput?: boolean;
  showResetIcon?: boolean;
  enableLabelDrags?: boolean;
  enableShiftDragZoom?: boolean;
  enableRightClick?: boolean;
  showZoomButtons?: boolean;
  errorDialogsActive?: boolean;
  useBrowserForJS?: boolean;
  allowStyleBar?: boolean;
  preventFocus?: boolean;
  showFullscreenButton?: boolean;
  scale?: number;
  disableAutoScale?: boolean;
  allowUpscale?: boolean;
  clickToLoad?: boolean;
  appName?: 'graphing' | 'geometry' | 'classic' | '3d' | 'suite';
  material_id?: string;
  filename?: string;
  ggbBase64?: string;
  borderColor?: string;
  enableCAS?: boolean;
  enable3d?: boolean;
  language?: string;
  country?: string;
  appletOnLoad?: (api: GeoGebraAPI) => void;
}

interface GeoGebraAPI {
  evalCommand: (command: string) => boolean;
  evalCommandGetLabels: (command: string) => string;
  setCoordSystem: (xmin: number, xmax: number, ymin: number, ymax: number) => void;
  setAxesVisible: (xVisible: boolean, yVisible: boolean) => void;
  setGridVisible: (visible: boolean) => void;
  setColor: (objName: string, red: number, green: number, blue: number) => void;
  setLineStyle: (objName: string, style: number) => void;
  setLineThickness: (objName: string, thickness: number) => void;
  setPointSize: (objName: string, size: number) => void;
  setPointStyle: (objName: string, style: number) => void;
  setVisible: (objName: string, visible: boolean) => void;
  setLabelVisible: (objName: string, visible: boolean) => void;
  setFilling: (objName: string, filling: number) => void;
  getValue: (objName: string) => number;
  getXcoord: (objName: string) => number;
  getYcoord: (objName: string) => number;
  deleteObject: (objName: string) => void;
  reset: () => void;
  refreshViews: () => void;
  getBase64: () => string;
  setBase64: (base64: string) => void;
  exists: (objName: string) => boolean;
  getAllObjectNames: () => string[];
  registerAddListener: (callback: (objName: string) => void) => void;
  registerClickListener: (callback: (objName: string) => void) => void;
  registerUpdateListener: (callback: (objName: string) => void) => void;
}

// Declare the GGBApplet global type
declare global {
  interface Window {
    GGBApplet?: new (
      params: GeoGebraAppletParameters,
      version: string
    ) => {
      inject: (elementId: string) => void;
      getAPI: () => GeoGebraAPI;
    };
  }
}

interface GeoGebraGraphProps {
  commands?: string[];
  materialId?: string;
  base64?: string;
  width?: number;
  height?: number;
  appType?: 'graphing' | 'geometry' | 'classic' | '3d';
  showToolbar?: boolean;
  showMenubar?: boolean;
  showAlgebraInput?: boolean;
  showResetIcon?: boolean;
  enableDrag?: boolean;
  enableZoom?: boolean;
  enableRightClick?: boolean;
  showZoomButtons?: boolean;
  gridVisible?: boolean;
  axesVisible?: boolean;
  bounds?: {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
  };
  className?: string;
  onReady?: (api: GeoGebraAPI) => void;
}

export function GeoGebraGraph({
  commands = [],
  materialId,
  base64,
  width = 600,
  height = 400,
  appType = 'graphing',
  showToolbar = false,
  showMenubar = false,
  showAlgebraInput = false,
  showResetIcon = true,
  enableDrag = true,
  enableZoom = true,
  enableRightClick = false,
  showZoomButtons = true,
  gridVisible = true,
  axesVisible = true,
  bounds,
  className = '',
  onReady,
}: GeoGebraGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const appletIdRef = useRef(`ggb-${Math.random().toString(36).substring(7)}`);
  const apiRef = useRef<GeoGebraAPI | null>(null);

  useEffect(() => {
    // Check if GeoGebra is already loaded
    const loadGeoGebra = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.GGBApplet) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.geogebra.org/apps/deployggb.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load GeoGebra'));
        document.head.appendChild(script);
      });
    };

    loadGeoGebra()
      .then(() => {
        if (!containerRef.current || !window.GGBApplet) return;

        const params: GeoGebraAppletParameters = {
          id: appletIdRef.current,
          width,
          height,
          showToolBar: showToolbar,
          showMenuBar: showMenubar,
          showAlgebraInput,
          showResetIcon,
          enableLabelDrags: enableDrag,
          enableShiftDragZoom: enableZoom,
          enableRightClick,
          showZoomButtons,
          errorDialogsActive: false,
          useBrowserForJS: true,
          preventFocus: false,
          showFullscreenButton: false,
          appName: appType,
          ...(materialId && { material_id: materialId }),
          ...(base64 && { ggbBase64: base64 }),
          appletOnLoad: (api) => {
            apiRef.current = api;
            setIsLoading(false);

            // Set up initial state
            if (bounds) {
              api.setCoordSystem(bounds.xmin, bounds.xmax, bounds.ymin, bounds.ymax);
            }

            api.setGridVisible(gridVisible);
            api.setAxesVisible(axesVisible, axesVisible);

            // Execute commands
            commands.forEach((cmd) => {
              api.evalCommand(cmd);
            });

            api.refreshViews();

            if (onReady) {
              onReady(api);
            }
          },
        };

        const applet = new window.GGBApplet(params, '5.0');
        applet.inject(appletIdRef.current);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      apiRef.current = null;
    };
  }, [width, height, showToolbar, showMenubar, showAlgebraInput, showResetIcon, enableDrag, enableZoom, enableRightClick, showZoomButtons, appType, materialId, base64, bounds, gridVisible, axesVisible, commands, onReady]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-800 rounded-xl border border-white/10 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-white/60">
          <p className="mb-2">Unable to load GeoGebra</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-slate-800 z-10"
          style={{ width, height }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/60 text-sm">Loading GeoGebra...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        id={appletIdRef.current}
        style={{ width, height }}
      />
    </div>
  );
}

// GeoGebra command presets for common visualizations
export const GeoGebraPresets = {
  // Unit circle with angle
  unitCircle: [
    'Circle((0, 0), 1)',
    'A = (1, 0)',
    'θ = Slider(0, 2π, 0.01)',
    'B = (cos(θ), sin(θ))',
    'Segment((0, 0), B)',
    'sinLine = Segment(B, (cos(θ), 0))',
    'cosLine = Segment((0, 0), (cos(θ), 0))',
    'SetColor(sinLine, "Red")',
    'SetColor(cosLine, "Blue")',
  ],

  // Parabola exploration
  parabola: [
    'a = Slider(-5, 5, 0.1)',
    'h = Slider(-5, 5, 0.1)',
    'k = Slider(-5, 5, 0.1)',
    'f(x) = a(x - h)² + k',
    'V = (h, k)',
    'SetPointSize(V, 5)',
    'SetColor(V, "Red")',
  ],

  // Circle theorems
  circleTheorem: [
    'c = Circle((0, 0), 3)',
    'A = Point(c)',
    'B = Point(c)',
    'C = Point(c)',
    'Segment(A, B)',
    'Segment(B, C)',
    'Segment(A, C)',
    'α = Angle(A, B, C)',
    'β = Angle(A, (0, 0), C)',
    'text1 = Text("Inscribed angle: " + α)',
    'text2 = Text("Central angle: " + β)',
  ],

  // Tangent to curve
  tangent: [
    'f(x) = x³ - 3x',
    'a = Slider(-3, 3, 0.1)',
    'A = (a, f(a))',
    't = Tangent(A, f)',
    'SetColor(A, "Red")',
    'SetColor(t, "Green")',
  ],

  // Area under curve (Riemann sums)
  riemannSum: [
    'f(x) = x² + 1',
    'n = Slider(1, 50, 1)',
    'a = 0',
    'b = 3',
    'LowerSum(f, a, b, n)',
    'UpperSum(f, a, b, n)',
  ],
};
