'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface QuickActionButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  color: 'emerald' | 'blue' | 'purple' | 'orange' | 'pink' | 'cyan';
  badge?: string;
  delay?: number;
}

const colorClasses = {
  emerald: {
    bg: 'from-emerald-500/10 to-green-500/10',
    border: 'border-emerald-500/30 hover:border-emerald-500/50',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
  blue: {
    bg: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/30 hover:border-blue-500/50',
    icon: 'bg-blue-500/20 text-blue-400',
    text: 'text-blue-400',
  },
  purple: {
    bg: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/30 hover:border-purple-500/50',
    icon: 'bg-purple-500/20 text-purple-400',
    text: 'text-purple-400',
  },
  orange: {
    bg: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/30 hover:border-orange-500/50',
    icon: 'bg-orange-500/20 text-orange-400',
    text: 'text-orange-400',
  },
  pink: {
    bg: 'from-pink-500/10 to-rose-500/10',
    border: 'border-pink-500/30 hover:border-pink-500/50',
    icon: 'bg-pink-500/20 text-pink-400',
    text: 'text-pink-400',
  },
  cyan: {
    bg: 'from-cyan-500/10 to-teal-500/10',
    border: 'border-cyan-500/30 hover:border-cyan-500/50',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
};

export function QuickActionButton({
  href,
  icon,
  label,
  sublabel,
  color,
  badge,
  delay = 0,
}: QuickActionButtonProps) {
  const classes = colorClasses[color];

  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`relative bg-gradient-to-br ${classes.bg} rounded-2xl border ${classes.border} p-4 transition-all cursor-pointer`}
      >
        {badge && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring' }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {badge}
          </motion.span>
        )}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10 }}
            className={`w-12 h-12 ${classes.icon} rounded-xl flex items-center justify-center`}
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="text-white font-bold">{label}</h3>
            {sublabel && <p className="text-slate-500 text-sm">{sublabel}</p>}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function QuickActionButtonSkeleton() {
  return (
    <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-700 rounded-xl" />
        <div>
          <div className="h-4 w-20 bg-slate-700 rounded mb-1" />
          <div className="h-3 w-16 bg-slate-700 rounded" />
        </div>
      </div>
    </div>
  );
}
