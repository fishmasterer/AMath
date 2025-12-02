// Icon mapping utility for knowledge base
// Maps string icon identifiers to Lucide React components

import {
  FunctionSquare,
  Rocket,
  Coins,
  RadioTower,
  Construction,
  Car,
  Plane,
  BarChart2,
  Gamepad2,
  TrendingUp,
  Scale,
  Factory,
  Thermometer,
  Wallet,
  Pill,
  SearchCheck,
  LineChart,
  Dna,
  HardHat,
  Monitor,
  FileText,
  Zap,
  Landmark,
  Ruler,
  Music,
  Sigma,
  Radio,
  Bot,
  Palette,
  ChartSpline,
  SlidersHorizontal,
  Signal,
  Triangle,
  Dice5,
  Globe,
  Microscope,
  Users,
  Atom,
  Volume2,
  FlaskConical,
  Hospital,
  Headphones,
  CircleDot,
  AudioWaveform,
  Waves,
  FerrisWheel,
  MapPin,
  Plug,
  Crosshair,
  Satellite,
  Map,
  Telescope,
  Target,
  Calculator,
  Brain,
  Earth,
  Cog,
  Circle,
  Camera,
  Milestone,
  Code,
  type LucideIcon,
} from 'lucide-react';

// Map of icon names to Lucide components
export const ICON_MAP: Record<string, LucideIcon> = {
  // Topic icons
  'function-square': FunctionSquare,
  'scale': Scale,
  'radical': Sigma, // Using Sigma for radical as there's no direct radical icon
  'sigma': Sigma,
  'triangle': Triangle,
  'trending-up': TrendingUp,
  'circle-dot': CircleDot,
  'crosshair': Crosshair,
  'calculator': Calculator,
  'circle': Circle,

  // Real-world application icons
  'rocket': Rocket,
  'coins': Coins,
  'radio-tower': RadioTower,
  'construction': Construction,
  'car': Car,
  'factory': Factory,
  'thermometer': Thermometer,
  'wallet': Wallet,
  'pill': Pill,
  'hard-hat': HardHat,
  'monitor': Monitor,
  'file-text': FileText,
  'zap': Zap,
  'radio': Radio,
  'bot': Bot,
  'palette': Palette,
  'chart-spline': ChartSpline,
  'dice-5': Dice5,
  'dna': Dna,
  'globe': Globe,
  'users': Users,
  'atom': Atom,
  'volume-2': Volume2,
  'flask-conical': FlaskConical,
  'audio-waveform': AudioWaveform,
  'waves': Waves,
  'ferris-wheel': FerrisWheel,
  'map-pin': MapPin,
  'satellite': Satellite,
  'gamepad-2': Gamepad2,
  'landmark': Landmark,
  'target': Target,
  'line-chart': LineChart,
  'brain': Brain,
  'earth': Earth,
  'camera': Camera,
  'milestone': Milestone,

  // Career icons
  'plane': Plane,
  'bar-chart-2': BarChart2,
  'search-check': SearchCheck,
  'ruler': Ruler,
  'music': Music,
  'sliders-horizontal': SlidersHorizontal,
  'signal': Signal,
  'microscope': Microscope,
  'hospital': Hospital,
  'headphones': Headphones,
  'plug': Plug,
  'map': Map,
  'telescope': Telescope,
  'cog': Cog,
  'code': Code,
};

// Helper function to get icon component by name
export function getIcon(name: string): LucideIcon | null {
  return ICON_MAP[name] || null;
}

// React component for rendering icons by name
interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export function IconRenderer({ name, className = '', size = 24 }: IconRendererProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    // Return a default fallback icon or null
    console.warn(`Icon not found: ${name}`);
    return null;
  }

  return <IconComponent className={className} size={size} />;
}

// Export icon type for TypeScript
export type IconName = keyof typeof ICON_MAP;
