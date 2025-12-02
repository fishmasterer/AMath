'use client';

import { Lesson, LessonDifficulty } from '@/lib/lessons/types';
import {
  Clock,
  Star,
  Trophy,
  Lock,
  CheckCircle,
  Play,
  Flame,
  Target,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface LessonCardProps {
  lesson: Lesson;
  href?: string;
  progress?: {
    completed: boolean;
    score: number;
    xpEarned: number;
  };
  isLocked?: boolean;
  onClick?: () => void;
}

export function LessonCard({
  lesson,
  href,
  progress,
  isLocked = false,
  onClick,
}: LessonCardProps) {
  const difficultyConfig: Record<LessonDifficulty, { label: string; color: string; bg: string }> = {
    foundation: {
      label: 'Foundation',
      color: 'text-green-400',
      bg: 'bg-green-500/20',
    },
    intermediate: {
      label: 'Intermediate',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20',
    },
    advanced: {
      label: 'Advanced',
      color: 'text-red-400',
      bg: 'bg-red-500/20',
    },
  };

  const difficulty = difficultyConfig[lesson.difficulty];

  const content = (
    <div
      className={`
        relative p-5 rounded-xl border-2 transition-all duration-300
        ${isLocked
          ? 'border-white/10 bg-slate-800/30 opacity-60'
          : progress?.completed
            ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:border-green-500'
            : 'border-white/10 bg-slate-800/50 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10'
        }
        ${!isLocked && 'cursor-pointer hover:scale-[1.02]'}
      `}
      onClick={!isLocked && onClick ? onClick : undefined}
    >
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        {isLocked ? (
          <Lock className="text-white/30" size={20} />
        ) : progress?.completed ? (
          <CheckCircle className="text-green-400" size={20} />
        ) : (
          <Play className="text-cyan-400" size={20} />
        )}
      </div>

      {/* Lesson number and difficulty */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {lesson.id.split('-').pop()?.slice(0, 2) || '01'}
          </span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${difficulty.bg} ${difficulty.color}`}>
          {difficulty.label}
        </span>
      </div>

      {/* Title and subtitle */}
      <h3 className="text-lg font-semibold text-white mb-1">{lesson.title}</h3>
      <p className="text-sm text-white/60 mb-4 line-clamp-2">{lesson.subtitle}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-white/50">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>{lesson.estimatedTime} min</span>
        </div>
        <div className="flex items-center gap-1">
          <Target size={12} />
          <span>{lesson.steps.length} steps</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={12} className="text-yellow-400" />
          <span className="text-yellow-400">{lesson.xpReward} XP</span>
        </div>
      </div>

      {/* Progress bar (if started but not completed) */}
      {progress && !progress.completed && progress.score > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-white/60">In Progress</span>
            <span className="text-cyan-400">{progress.xpEarned} XP earned</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all"
              style={{ width: `${(progress.score / lesson.xpReward) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Completed stats */}
      {progress?.completed && (
        <div className="mt-4 pt-4 border-t border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-green-400">
              <Trophy size={14} />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={14} />
              <span className="text-sm font-medium">{progress.xpEarned} XP</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (href && !isLocked) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

// Compact lesson item for lists
interface LessonItemProps {
  lesson: Lesson;
  index: number;
  href?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  isLocked?: boolean;
}

export function LessonItem({
  lesson,
  index,
  href,
  isCompleted = false,
  isActive = false,
  isLocked = false,
}: LessonItemProps) {
  const content = (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-xl border transition-all
        ${isActive
          ? 'border-cyan-500 bg-cyan-500/10'
          : isCompleted
            ? 'border-green-500/30 bg-green-500/5'
            : isLocked
              ? 'border-white/5 bg-slate-800/30 opacity-50'
              : 'border-white/10 hover:border-white/20 hover:bg-white/5'
        }
      `}
    >
      {/* Lesson number */}
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center font-bold
          ${isCompleted
            ? 'bg-green-500 text-white'
            : isActive
              ? 'bg-cyan-500 text-white'
              : isLocked
                ? 'bg-white/10 text-white/30'
                : 'bg-white/10 text-white/70'
          }
        `}
      >
        {isCompleted ? <CheckCircle size={20} /> : isLocked ? <Lock size={16} /> : index + 1}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium truncate ${isLocked ? 'text-white/30' : 'text-white'}`}>
          {lesson.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-white/50">
          <span>{lesson.estimatedTime} min</span>
          <span className="flex items-center gap-1">
            <Star size={10} className="text-yellow-400" />
            {lesson.xpReward} XP
          </span>
        </div>
      </div>

      {/* Status icon */}
      {!isLocked && (
        <div>
          {isActive ? (
            <Flame className="text-cyan-400" size={20} />
          ) : isCompleted ? (
            <Trophy className="text-green-400" size={20} />
          ) : (
            <Play className="text-white/30" size={20} />
          )}
        </div>
      )}
    </div>
  );

  if (href && !isLocked) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

// Lesson module card
interface LessonModuleCardProps {
  title: string;
  description: string;
  lessons: Lesson[];
  completedCount: number;
  totalXP: number;
  earnedXP: number;
  href?: string;
}

export function LessonModuleCard({
  title,
  description,
  lessons,
  completedCount,
  totalXP,
  earnedXP,
  href,
}: LessonModuleCardProps) {
  const progress = (completedCount / lessons.length) * 100;
  const isComplete = completedCount === lessons.length;

  const content = (
    <div
      className={`
        p-6 rounded-2xl border-2 transition-all duration-300
        ${isComplete
          ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/5'
          : 'border-white/10 bg-slate-800/50 hover:border-cyan-500/50'
        }
        hover:shadow-xl hover:scale-[1.01]
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-white/60">{description}</p>
        </div>
        {isComplete && (
          <div className="p-2 bg-green-500/20 rounded-xl">
            <Trophy className="text-green-400" size={24} />
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-white/60">
            {completedCount}/{lessons.length} Lessons
          </span>
          <span className="text-cyan-400 font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-white/50">
            <Clock size={14} />
            <span className="text-sm">
              {lessons.reduce((acc, l) => acc + l.estimatedTime, 0)} min total
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          <Star size={14} />
          <span className="text-sm font-medium">
            {earnedXP}/{totalXP} XP
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
