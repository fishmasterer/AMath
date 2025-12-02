'use client';

import { useState, useEffect } from 'react';
import { PracticeResults, TopicPerformance } from '@/lib/practice/types';

// =============================================================================
// RESULTS SCREEN - Immersive post-session results display
// =============================================================================

interface ResultsScreenProps {
  results: PracticeResults;
  mode: 'drill' | 'exam' | 'boss' | 'challenge';
  onContinue: () => void;
  onRetry?: () => void;
}

export function ResultsScreen({ results, mode, onContinue, onRetry }: ResultsScreenProps) {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [countedXP, setCountedXP] = useState(0);
  const [countedCoins, setCountedCoins] = useState(0);

  // Animate numbers counting up
  useEffect(() => {
    const phases = [
      { delay: 500, action: () => setAnimationPhase(1) },
      { delay: 1000, action: () => setAnimationPhase(2) },
      { delay: 1500, action: () => setAnimationPhase(3) },
      { delay: 2000, action: () => setAnimationPhase(4) },
    ];

    phases.forEach(({ delay, action }) => {
      setTimeout(action, delay);
    });

    // Count up XP
    const xpInterval = setInterval(() => {
      setCountedXP((prev) => {
        if (prev >= results.xpEarned) {
          clearInterval(xpInterval);
          return results.xpEarned;
        }
        return Math.min(prev + Math.ceil(results.xpEarned / 50), results.xpEarned);
      });
    }, 30);

    // Count up Coins
    const coinInterval = setInterval(() => {
      setCountedCoins((prev) => {
        if (prev >= results.coinsEarned) {
          clearInterval(coinInterval);
          return results.coinsEarned;
        }
        return Math.min(prev + Math.ceil(results.coinsEarned / 50), results.coinsEarned);
      });
    }, 30);

    return () => {
      clearInterval(xpInterval);
      clearInterval(coinInterval);
    };
  }, [results.xpEarned, results.coinsEarned]);

  const getGrade = () => {
    const accuracy = results.accuracy * 100;
    if (accuracy >= 90) return { grade: 'S', color: 'text-yellow-400', bg: 'from-yellow-500/20 to-amber-500/20' };
    if (accuracy >= 80) return { grade: 'A', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-green-500/20' };
    if (accuracy >= 70) return { grade: 'B', color: 'text-blue-400', bg: 'from-blue-500/20 to-cyan-500/20' };
    if (accuracy >= 60) return { grade: 'C', color: 'text-purple-400', bg: 'from-purple-500/20 to-violet-500/20' };
    if (accuracy >= 50) return { grade: 'D', color: 'text-orange-400', bg: 'from-orange-500/20 to-amber-500/20' };
    return { grade: 'F', color: 'text-red-400', bg: 'from-red-500/20 to-rose-500/20' };
  };

  const { grade, color, bg } = getGrade();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center overflow-y-auto py-8">
      <div className="max-w-2xl w-full mx-4">
        {/* Header with Grade */}
        <div className={`text-center mb-8 transition-all duration-500 ${animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className={`inline-block p-8 rounded-full bg-gradient-to-br ${bg} border-4 border-current ${color} mb-4`}>
            <span className={`text-8xl font-black ${color}`}>{grade}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-4">
            {mode === 'boss' ? 'VICTORY' : 'SESSION COMPLETE'}
          </h1>
          <p className="text-slate-400 mt-2">
            {results.accuracy >= 0.8 ? 'Outstanding performance' :
             results.accuracy >= 0.6 ? 'Good effort' :
             'Keep practicing'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-500 ${animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <StatCard
            label="Accuracy"
            value={`${Math.round(results.accuracy * 100)}%`}
            icon={<TargetIcon />}
            color="text-emerald-400"
          />
          <StatCard
            label="Correct"
            value={`${results.correctAnswers}/${results.totalQuestions}`}
            icon={<CheckIcon />}
            color="text-blue-400"
          />
          <StatCard
            label="Best Streak"
            value={`${results.streakBonus / 10}`}
            icon={<FlameIcon />}
            color="text-orange-400"
          />
          <StatCard
            label="Time"
            value={formatTime(results.timeTaken)}
            icon={<ClockIcon />}
            color="text-purple-400"
          />
        </div>

        {/* Rewards Section */}
        <div className={`bg-slate-900/50 rounded-xl p-6 mb-8 border border-slate-800 transition-all duration-500 ${animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-lg font-bold text-white mb-4">REWARDS EARNED</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* XP */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-blue-400">+{countedXP}</div>
                <div className="text-sm text-slate-500">Experience Points</div>
              </div>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <CoinIcon className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-yellow-400">+{countedCoins}</div>
                <div className="text-sm text-slate-500">Coins</div>
              </div>
            </div>
          </div>

          {/* Bonus Breakdown */}
          {(results.streakBonus > 0 || results.perfectBonus > 0 || results.speedBonus > 0) && (
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="text-sm text-slate-400 mb-2">Bonuses Applied:</div>
              <div className="flex flex-wrap gap-2">
                {results.streakBonus > 0 && (
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm">
                    Streak +{results.streakBonus}
                  </span>
                )}
                {results.perfectBonus > 0 && (
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                    Perfect +{results.perfectBonus}
                  </span>
                )}
                {results.speedBonus > 0 && (
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                    Speed +{results.speedBonus}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Topic Breakdown */}
        {results.topicBreakdown.length > 0 && (
          <div className={`bg-slate-900/50 rounded-xl p-6 mb-8 border border-slate-800 transition-all duration-500 ${animationPhase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-lg font-bold text-white mb-4">TOPIC BREAKDOWN</h2>
            <div className="space-y-3">
              {results.topicBreakdown.map((topic) => (
                <TopicBreakdownRow key={topic.topicId} topic={topic} />
              ))}
            </div>
          </div>
        )}

        {/* Achievements Unlocked */}
        {results.unlockedAchievements.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl p-6 mb-8 border border-yellow-500/30">
            <h2 className="text-lg font-bold text-yellow-400 mb-4">ACHIEVEMENTS UNLOCKED</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.unlockedAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <TrophyIcon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="text-white font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-8 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
            >
              Try Again
            </button>
          )}
          <button
            onClick={onContinue}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold transition-all transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// STAT CARD
// =============================================================================

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
      <div className={`${color} mb-2`}>{icon}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

// =============================================================================
// TOPIC BREAKDOWN ROW
// =============================================================================

interface TopicBreakdownRowProps {
  topic: TopicPerformance;
}

function TopicBreakdownRow({ topic }: TopicBreakdownRowProps) {
  const accuracyPercentage = topic.accuracy * 100;

  const getAccuracyColor = () => {
    if (accuracyPercentage >= 80) return 'bg-emerald-500';
    if (accuracyPercentage >= 60) return 'bg-blue-500';
    if (accuracyPercentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-white font-medium">{topic.topicName}</span>
          <span className="text-slate-400 text-sm">{topic.correct}/{topic.total}</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${getAccuracyColor()} transition-all duration-500`}
            style={{ width: `${accuracyPercentage}%` }}
          />
        </div>
      </div>
      <div className={`text-sm font-medium ${topic.masteryChange > 0 ? 'text-emerald-400' : topic.masteryChange < 0 ? 'text-red-400' : 'text-slate-500'}`}>
        {topic.masteryChange > 0 ? '+' : ''}{topic.masteryChange}
      </div>
    </div>
  );
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

// =============================================================================
// ICONS
// =============================================================================

function TargetIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.5 1.5-4.5 3-6 .5-.5 1-1 1.5-1.5.5 1.5 1.5 3 3 4 1.5-2 2.5-4.5 2.5-7 0-.5 0-1-.1-1.5 2.6 1.5 4.6 4.1 5 7.1.1.6.1 1.3.1 1.9 0 3.866-3.134 7-7 7z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CoinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">$</text>
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 3h14v2h-1v1c0 2.5-1.5 4.5-3.5 5.5V13h-5v-1.5C8.5 10.5 7 8.5 7 6V5H6V3H5zm3 3c0 1.5 1 3 2.5 3.5V11h3V9.5C15 9 16 7.5 16 6V5H8v1zm1 10h6v2H9v-2zm-2 4h10v2H7v-2z" />
    </svg>
  );
}

export default ResultsScreen;
