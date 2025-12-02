'use client';

import Link from 'next/link';
import { TopicData } from '@/lib/knowledge-base/syllabus';
import { IconRenderer } from '@/lib/knowledge-base/icons';
import { ChevronRight, BookOpen, Target, Lightbulb } from 'lucide-react';

interface TopicCardProps {
  topic: TopicData;
  href?: string;
  progress?: {
    completed: number;
    total: number;
    mastery: number;
  };
  showPreview?: boolean;
}

export function TopicCard({
  topic,
  href,
  progress,
  showPreview = true,
}: TopicCardProps) {
  const categoryColors = {
    algebra: {
      bg: 'from-cyan-500/20 to-blue-500/20',
      border: 'border-cyan-500/30 hover:border-cyan-500/50',
      accent: 'text-cyan-400',
      badge: 'bg-cyan-500/20 text-cyan-400',
    },
    geometry: {
      bg: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30 hover:border-purple-500/50',
      accent: 'text-purple-400',
      badge: 'bg-purple-500/20 text-purple-400',
    },
    calculus: {
      bg: 'from-pink-500/20 to-red-500/20',
      border: 'border-pink-500/30 hover:border-pink-500/50',
      accent: 'text-pink-400',
      badge: 'bg-pink-500/20 text-pink-400',
    },
  };

  const colors = categoryColors[topic.category];

  const content = (
    <div
      className={`
        relative p-5 rounded-xl border
        bg-gradient-to-br ${colors.bg}
        ${colors.border}
        transition-all duration-300
        hover:shadow-lg hover:scale-[1.02]
        group
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center ${colors.accent}`}>
            <IconRenderer name={topic.icon} size={24} />
          </div>
          <div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors.badge}`}>
              {topic.syllabus_code}
            </span>
            <h3 className="text-lg font-semibold text-white mt-1">{topic.name}</h3>
          </div>
        </div>
        {href && (
          <ChevronRight
            className="text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all"
            size={20}
          />
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-white/60 mb-4">{topic.subtitle}</p>

      {/* Preview Stats */}
      {showPreview && (
        <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
          <div className="flex items-center gap-1">
            <Target size={12} />
            <span>{topic.learning_objectives.length} objectives</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={12} />
            <span>{topic.concepts.length} concepts</span>
          </div>
          <div className="flex items-center gap-1">
            <Lightbulb size={12} />
            <span>{topic.real_world_applications.length} applications</span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {progress && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-white/60">Progress</span>
            <span className={colors.accent}>
              {progress.completed}/{progress.total} complete
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${(progress.completed / progress.total) * 100}%` }}
            />
          </div>
          {progress.mastery > 0 && (
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-white/40">Mastery</span>
              <span className={`font-medium ${
                progress.mastery >= 80 ? 'text-green-400' :
                progress.mastery >= 60 ? 'text-yellow-400' :
                progress.mastery >= 40 ? 'text-orange-400' :
                'text-red-400'
              }`}>
                {progress.mastery}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* Why Learn Preview */}
      {showPreview && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/40 line-clamp-2">
            {topic.why_learn.summary}
          </p>
        </div>
      )}
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

// Compact version for lists
interface TopicCardCompactProps {
  topic: TopicData;
  href?: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

export function TopicCardCompact({
  topic,
  href,
  isActive = false,
  isCompleted = false,
}: TopicCardCompactProps) {
  const categoryColors = {
    algebra: 'border-cyan-500/50 bg-cyan-500/10',
    geometry: 'border-purple-500/50 bg-purple-500/10',
    calculus: 'border-pink-500/50 bg-pink-500/10',
  };

  const content = (
    <div
      className={`
        flex items-center gap-3 p-3 rounded-lg border border-white/10
        hover:border-white/20 hover:bg-white/5
        transition-all
        ${isActive ? categoryColors[topic.category] : ''}
        ${isCompleted ? 'opacity-60' : ''}
      `}
    >
      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white/70">
        <IconRenderer name={topic.icon} size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">{topic.syllabus_code}</span>
          {isCompleted && (
            <span className="text-xs text-green-400">Complete</span>
          )}
        </div>
        <p className="text-sm text-white truncate">{topic.name}</p>
      </div>
      {href && <ChevronRight size={16} className="text-white/30" />}
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

// Topic grid component
interface TopicGridProps {
  topics: TopicData[];
  baseHref?: string;
  showProgress?: boolean;
}

export function TopicGrid({ topics, baseHref = '/student/learn', showProgress = false }: TopicGridProps) {
  // Group by category
  const grouped = topics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {} as Record<string, TopicData[]>);

  const categoryTitles = {
    algebra: 'Algebra',
    geometry: 'Geometry & Trigonometry',
    calculus: 'Calculus',
  };

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, categoryTopics]) => (
        <div key={category}>
          <h2 className="text-lg font-medium text-white mb-4">
            {categoryTitles[category as keyof typeof categoryTitles]}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                href={`${baseHref}/${topic.id.toLowerCase()}`}
                progress={showProgress ? {
                  completed: 0,
                  total: topic.learning_objectives.length,
                  mastery: 0,
                } : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
