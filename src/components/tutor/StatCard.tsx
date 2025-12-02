'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'cyan' | 'blue' | 'green' | 'purple' | 'orange' | 'pink';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

const colorClasses = {
  cyan: {
    bg: 'from-cyan-500/10 to-cyan-600/5',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/5',
  },
  blue: {
    bg: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    icon: 'bg-blue-500/20 text-blue-400',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/5',
  },
  green: {
    bg: 'from-green-500/10 to-green-600/5',
    border: 'border-green-500/20 hover:border-green-500/40',
    icon: 'bg-green-500/20 text-green-400',
    text: 'text-green-400',
    glow: 'shadow-green-500/5',
  },
  purple: {
    bg: 'from-purple-500/10 to-purple-600/5',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    icon: 'bg-purple-500/20 text-purple-400',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/5',
  },
  orange: {
    bg: 'from-orange-500/10 to-orange-600/5',
    border: 'border-orange-500/20 hover:border-orange-500/40',
    icon: 'bg-orange-500/20 text-orange-400',
    text: 'text-orange-400',
    glow: 'shadow-orange-500/5',
  },
  pink: {
    bg: 'from-pink-500/10 to-pink-600/5',
    border: 'border-pink-500/20 hover:border-pink-500/40',
    icon: 'bg-pink-500/20 text-pink-400',
    text: 'text-pink-400',
    glow: 'shadow-pink-500/5',
  },
};

export function StatCard({ label, value, subtitle, icon, color, trend, onClick }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-5
        bg-gradient-to-br ${colors.bg}
        border ${colors.border}
        shadow-xl ${colors.glow}
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5 blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <svg
                className={`w-4 h-4 ${trend.isPositive ? '' : 'rotate-180'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
          {subtitle && (
            <p className="text-slate-500 text-xs">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton version for loading states
export function StatCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 bg-slate-800/50 border border-slate-700/50 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-slate-700" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-20 bg-slate-700 rounded" />
        <div className="h-8 w-16 bg-slate-700 rounded" />
        <div className="h-3 w-24 bg-slate-700 rounded" />
      </div>
    </div>
  );
}
