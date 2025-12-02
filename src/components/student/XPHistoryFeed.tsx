'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface XPTransaction {
  id: string;
  xp_amount: number;
  xp_type: string;
  description?: string;
  created_at: string;
  difficulty_multiplier?: number;
  streak_multiplier?: number;
}

interface XPHistoryFeedProps {
  transactions: XPTransaction[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const xpTypeConfig: Record<string, { icon: string; color: string; label: string }> = {
  quiz_completion: { icon: '📝', color: 'text-blue-400', label: 'Quiz Completed' },
  quiz_perfect: { icon: '💯', color: 'text-yellow-400', label: 'Perfect Score!' },
  quiz_improvement: { icon: '📈', color: 'text-emerald-400', label: 'Score Improved' },
  lesson_completion: { icon: '📚', color: 'text-purple-400', label: 'Lesson Completed' },
  practice_session: { icon: '🎯', color: 'text-cyan-400', label: 'Practice Session' },
  daily_goal_bonus: { icon: '🎉', color: 'text-pink-400', label: 'Daily Goal Bonus' },
  streak_bonus: { icon: '🔥', color: 'text-orange-400', label: 'Streak Bonus' },
  achievement_bonus: { icon: '🏆', color: 'text-amber-400', label: 'Achievement Unlocked' },
  first_of_day: { icon: '🌅', color: 'text-rose-400', label: 'First of the Day' },
  topic_mastery: { icon: '⭐', color: 'text-yellow-500', label: 'Topic Mastered' },
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function XPHistoryFeed({ transactions, loading, onLoadMore, hasMore }: XPHistoryFeedProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading && transactions.length === 0) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-slate-800/50 rounded-xl p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-full" />
              <div className="flex-1">
                <div className="h-4 w-32 bg-slate-700 rounded mb-2" />
                <div className="h-3 w-24 bg-slate-700 rounded" />
              </div>
              <div className="h-6 w-16 bg-slate-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-white font-medium">No XP earned yet</p>
        <p className="text-slate-500 text-sm">Complete quizzes to start earning XP!</p>
      </div>
    );
  }

  // Group transactions by date
  const groupedByDate: Record<string, XPTransaction[]> = {};
  transactions.forEach((tx) => {
    const date = new Date(tx.created_at).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(tx);
  });

  return (
    <div className="space-y-6">
      {Object.entries(groupedByDate).map(([date, txs]) => {
        const dayTotal = txs.reduce((sum, tx) => sum + tx.xp_amount, 0);

        return (
          <div key={date}>
            {/* Date header */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-slate-400 text-sm font-medium">{date}</h4>
              <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                <span className="text-xs">⭐</span>
                <span className="text-emerald-400 text-sm font-bold">+{dayTotal} XP</span>
              </div>
            </div>

            {/* Transactions */}
            <div className="space-y-2">
              <AnimatePresence>
                {txs.map((tx, index) => {
                  const config = xpTypeConfig[tx.xp_type] || {
                    icon: '✨',
                    color: 'text-slate-400',
                    label: tx.xp_type.replace(/_/g, ' '),
                  };
                  const isExpanded = expandedId === tx.id;
                  const hasMultipliers = (tx.difficulty_multiplier && tx.difficulty_multiplier > 1) ||
                    (tx.streak_multiplier && tx.streak_multiplier > 1);

                  return (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                      className="bg-slate-800/30 hover:bg-slate-800/50 rounded-xl p-4 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center text-xl"
                        >
                          {config.icon}
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${config.color}`}>{config.label}</p>
                          {tx.description && (
                            <p className="text-slate-500 text-sm truncate">{tx.description}</p>
                          )}
                          <p className="text-slate-600 text-xs">{formatTimeAgo(tx.created_at)}</p>
                        </div>

                        {/* XP amount */}
                        <div className="text-right">
                          <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            className="text-emerald-400 font-bold text-lg"
                          >
                            +{tx.xp_amount}
                          </motion.div>
                          {hasMultipliers && (
                            <div className="flex items-center justify-end gap-1">
                              {tx.streak_multiplier && tx.streak_multiplier > 1 && (
                                <span className="text-orange-400 text-xs">🔥x{tx.streak_multiplier}</span>
                              )}
                              {tx.difficulty_multiplier && tx.difficulty_multiplier > 1 && (
                                <span className="text-purple-400 text-xs">📊x{tx.difficulty_multiplier}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {isExpanded && hasMultipliers && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-3 pt-3 border-t border-slate-700/50 overflow-hidden"
                          >
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                                <div className="text-slate-400">Base</div>
                                <div className="text-white font-medium">
                                  {Math.round(tx.xp_amount / ((tx.streak_multiplier || 1) * (tx.difficulty_multiplier || 1)))}
                                </div>
                              </div>
                              {tx.streak_multiplier && tx.streak_multiplier > 1 && (
                                <div className="bg-orange-500/10 rounded-lg p-2 text-center">
                                  <div className="text-orange-400">Streak</div>
                                  <div className="text-orange-300 font-medium">x{tx.streak_multiplier}</div>
                                </div>
                              )}
                              {tx.difficulty_multiplier && tx.difficulty_multiplier > 1 && (
                                <div className="bg-purple-500/10 rounded-lg p-2 text-center">
                                  <div className="text-purple-400">Difficulty</div>
                                  <div className="text-purple-300 font-medium">x{tx.difficulty_multiplier}</div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        );
      })}

      {/* Load more */}
      {hasMore && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLoadMore}
          disabled={loading}
          className="w-full py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load More'}
        </motion.button>
      )}
    </div>
  );
}
