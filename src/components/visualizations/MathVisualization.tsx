'use client';

import { useState } from 'react';
import { DesmosGraph, GraphPresets } from './DesmosGraph';
import { GeoGebraGraph, GeoGebraPresets } from './GeoGebraGraph';
import { Maximize2, Minimize2, RefreshCw, Play, Pause } from 'lucide-react';

// Configuration type from knowledge base
interface VisualizationConfig {
  type: 'desmos' | 'geogebra' | 'custom';
  config: Record<string, unknown>;
}

interface MathVisualizationProps {
  title: string;
  description: string;
  visualization?: VisualizationConfig;
  desmos_config?: string;
  interactive?: boolean;
  presetKey?: string;
  className?: string;
}

export function MathVisualization({
  title,
  description,
  visualization,
  desmos_config,
  interactive = true,
  presetKey,
  className = '',
}: MathVisualizationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0); // For refresh

  // Parse Desmos config from string if provided
  const getDesmosExpressions = () => {
    if (desmos_config) {
      try {
        const config = JSON.parse(desmos_config);
        return config.expressions || [];
      } catch {
        return [];
      }
    }

    if (visualization?.type === 'desmos' && visualization.config) {
      return (visualization.config as { expressions?: unknown[] }).expressions || [];
    }

    // Use preset if specified
    if (presetKey && presetKey in GraphPresets) {
      return (GraphPresets as Record<string, () => unknown[]>)[presetKey]();
    }

    return [];
  };

  // Parse GeoGebra commands
  const getGeoGebraCommands = () => {
    if (visualization?.type === 'geogebra' && visualization.config) {
      return (visualization.config as { commands?: string[] }).commands || [];
    }

    // Use preset if specified
    if (presetKey && presetKey in GeoGebraPresets) {
      return (GeoGebraPresets as Record<string, string[]>)[presetKey];
    }

    return [];
  };

  const handleRefresh = () => {
    setKey((k) => k + 1);
  };

  const renderVisualization = () => {
    const type = visualization?.type || (desmos_config ? 'desmos' : 'desmos');
    const height = isExpanded ? 600 : 350;

    if (type === 'geogebra') {
      const commands = getGeoGebraCommands();
      return (
        <GeoGebraGraph
          key={key}
          commands={commands}
          height={height}
          width={isExpanded ? 800 : 500}
          showToolbar={interactive && isExpanded}
          showAlgebraInput={interactive && isExpanded}
          enableZoom={interactive}
          enableDrag={interactive}
        />
      );
    }

    // Default to Desmos
    const expressions = getDesmosExpressions();
    const bounds = visualization?.config?.bounds || (desmos_config ? JSON.parse(desmos_config).bounds : undefined);

    return (
      <DesmosGraph
        key={key}
        expressions={expressions as Parameters<typeof DesmosGraph>[0]['expressions']}
        bounds={bounds}
        height={height}
        interactive={interactive}
      />
    );
  };

  return (
    <div
      className={`bg-slate-800/50 rounded-xl border border-white/10 overflow-hidden ${className} ${
        isExpanded ? 'fixed inset-4 z-50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-800/80">
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="text-xs text-white/60">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {interactive && (
            <>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                title={isPlaying ? 'Pause animations' : 'Play animations'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={handleRefresh}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                title="Reset visualization"
              >
                <RefreshCw size={16} />
              </button>
            </>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-4">
        {renderVisualization()}
      </div>

      {/* Instructions (shown when expanded) */}
      {isExpanded && interactive && (
        <div className="px-4 pb-4">
          <div className="text-xs text-white/50 flex items-center gap-4">
            <span>Drag sliders to explore</span>
            <span>Scroll to zoom</span>
            <span>Drag to pan</span>
            <span className="ml-auto">Press ESC to close</span>
          </div>
        </div>
      )}

      {/* Backdrop for expanded mode */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}

// Card variant for displaying in grids
interface VisualizationCardProps {
  title: string;
  description: string;
  thumbnail?: string;
  onClick?: () => void;
  className?: string;
}

export function VisualizationCard({
  title,
  description,
  thumbnail,
  onClick,
  className = '',
}: VisualizationCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        text-left p-4 rounded-xl border border-white/10
        bg-slate-800/50 hover:bg-slate-800
        transition-all duration-200
        hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
        ${className}
      `}
    >
      {thumbnail && (
        <div className="w-full h-32 rounded-lg bg-slate-700 mb-3 overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h4 className="font-medium text-white mb-1">{title}</h4>
      <p className="text-sm text-white/60">{description}</p>
      <div className="mt-3 text-xs text-cyan-400 flex items-center gap-1">
        <Play size={12} />
        <span>Interactive</span>
      </div>
    </button>
  );
}
