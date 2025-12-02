'use client';

import { useState } from 'react';
import { TopicData } from '@/lib/knowledge-base/syllabus';
import { IconRenderer } from '@/lib/knowledge-base/icons';
import { MathVisualization } from '@/components/visualizations';
import {
  ChevronDown,
  ChevronUp,
  Target,
  Lightbulb,
  BookOpen,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  Play,
} from 'lucide-react';
import katex from 'katex';

interface TopicOverviewProps {
  topic: TopicData;
  onStartQuiz?: () => void;
}

export function TopicOverview({ topic, onStartQuiz }: TopicOverviewProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['why-learn', 'concepts'])
  );

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const renderLatex = (latex: string) => {
    try {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(latex, {
              throwOnError: false,
              displayMode: false,
            }),
          }}
        />
      );
    } catch {
      return <span className="font-mono text-sm">{latex}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <IconRenderer name={topic.icon} size={32} className="text-cyan-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded">
                {topic.syllabus_code}
              </span>
              <span className="text-xs text-white/50">{topic.category}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{topic.name}</h1>
            <p className="text-white/70">{topic.subtitle}</p>
          </div>
          {onStartQuiz && (
            <button
              onClick={onStartQuiz}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-medium transition-colors"
            >
              <Play size={18} />
              Practice Quiz
            </button>
          )}
        </div>
      </div>

      {/* Why Learn This */}
      <CollapsibleSection
        title="Why Learn This?"
        icon={<Lightbulb className="text-yellow-400" size={20} />}
        isExpanded={expandedSections.has('why-learn')}
        onToggle={() => toggleSection('why-learn')}
      >
        <div className="space-y-4">
          <p className="text-white/80 text-lg">{topic.why_learn.summary}</p>
          <ul className="space-y-2">
            {topic.why_learn.importance.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-white/70">
                <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          {topic.why_learn.prerequisites.length > 0 && (
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-white/60">Prerequisites: </span>
              <span className="text-sm text-cyan-400">
                {topic.why_learn.prerequisites.join(', ')}
              </span>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Learning Objectives */}
      <CollapsibleSection
        title="Learning Objectives"
        icon={<Target className="text-blue-400" size={20} />}
        isExpanded={expandedSections.has('objectives')}
        onToggle={() => toggleSection('objectives')}
      >
        <div className="space-y-4">
          {topic.learning_objectives.map((obj) => (
            <div key={obj.code} className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                  {obj.code}
                </span>
                <p className="text-white/80">{obj.description}</p>
              </div>
              {obj.subObjectives && (
                <ul className="ml-16 space-y-1">
                  {obj.subObjectives.map((sub, idx) => (
                    <li key={idx} className="text-sm text-white/60 flex items-center gap-2">
                      <div className="w-1 h-1 bg-white/40 rounded-full" />
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Key Concepts */}
      <CollapsibleSection
        title="Key Concepts"
        icon={<BookOpen className="text-purple-400" size={20} />}
        isExpanded={expandedSections.has('concepts')}
        onToggle={() => toggleSection('concepts')}
      >
        <div className="grid gap-4">
          {topic.concepts.map((concept) => (
            <div
              key={concept.name}
              className="p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <h4 className="font-medium text-white mb-2">{concept.name}</h4>
              <p className="text-white/70 mb-3">{concept.definition}</p>
              <ul className="space-y-1">
                {concept.key_points.map((point, idx) => (
                  <li key={idx} className="text-sm text-white/60 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              {concept.examples && concept.examples.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <span className="text-xs text-white/50">Examples: </span>
                  <span className="text-sm text-cyan-400 font-mono">
                    {concept.examples.join(', ')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Formulas */}
      <CollapsibleSection
        title="Essential Formulas"
        icon={<span className="text-pink-400 font-bold">fx</span>}
        isExpanded={expandedSections.has('formulas')}
        onToggle={() => toggleSection('formulas')}
      >
        <div className="space-y-4">
          {topic.formulas.map((formula) => (
            <div
              key={formula.name}
              className="p-4 bg-slate-800/80 rounded-xl border border-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-2">{formula.name}</h4>
                  <div className="bg-slate-900 p-3 rounded-lg mb-3 overflow-x-auto">
                    <span className="text-lg">{renderLatex(formula.latex)}</span>
                  </div>
                  <p className="text-sm text-white/60 mb-2">{formula.description}</p>
                  {formula.when_to_use && (
                    <p className="text-xs text-cyan-400/80">
                      When to use: {formula.when_to_use}
                    </p>
                  )}
                </div>
              </div>
              {formula.common_mistakes && formula.common_mistakes.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-red-400/80 mb-1 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Common mistakes:
                  </p>
                  <ul className="text-xs text-white/50 space-y-1">
                    {formula.common_mistakes.map((mistake, idx) => (
                      <li key={idx}>• {mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Real-World Applications */}
      <CollapsibleSection
        title="Real-World Applications"
        icon={<span className="text-green-400">🌍</span>}
        isExpanded={expandedSections.has('applications')}
        onToggle={() => toggleSection('applications')}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {topic.real_world_applications.map((app) => (
            <div
              key={app.title}
              className="p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                  <IconRenderer name={app.icon} size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{app.title}</h4>
                  <p className="text-xs text-white/50">{app.industry}</p>
                </div>
              </div>
              <p className="text-sm text-white/70 mb-3">{app.description}</p>
              <div className="p-2 bg-slate-800 rounded-lg">
                <p className="text-xs text-white/60">
                  <span className="text-cyan-400">Example:</span> {app.example}
                </p>
              </div>
              {app.visualization && (
                <div className="mt-3">
                  <MathVisualization
                    title={app.title}
                    description="Interactive visualization"
                    visualization={app.visualization}
                    interactive={true}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Career Connections */}
      <CollapsibleSection
        title="Career Connections"
        icon={<Briefcase className="text-orange-400" size={20} />}
        isExpanded={expandedSections.has('careers')}
        onToggle={() => toggleSection('careers')}
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {topic.career_connections.map((career) => (
            <div
              key={career.career}
              className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                  <IconRenderer name={career.icon} size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{career.career}</h4>
                  {career.salary_range && (
                    <p className="text-xs text-green-400">{career.salary_range}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-white/60">{career.description}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Common Mistakes & Tips */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Common Mistakes */}
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-red-400" size={20} />
            <h3 className="font-medium text-red-400">Common Mistakes</h3>
          </div>
          <ul className="space-y-2">
            {topic.common_mistakes.map((mistake, idx) => (
              <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-red-400">✗</span>
                {mistake}
              </li>
            ))}
          </ul>
        </div>

        {/* Exam Tips */}
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="text-green-400" size={20} />
            <h3 className="font-medium text-green-400">Exam Tips</h3>
          </div>
          <ul className="space-y-2">
            {topic.exam_tips.map((tip, idx) => (
              <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-green-400">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visualizations */}
      {topic.visualizations.length > 0 && (
        <CollapsibleSection
          title="Interactive Visualizations"
          icon={<Play className="text-cyan-400" size={20} />}
          isExpanded={expandedSections.has('visualizations')}
          onToggle={() => toggleSection('visualizations')}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {topic.visualizations.map((viz) => (
              <MathVisualization
                key={viz.title}
                title={viz.title}
                description={viz.description}
                desmos_config={viz.desmos_config}
                interactive={viz.interactive}
              />
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}

// Collapsible section component
interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-medium text-white">{title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-white/50" size={20} />
        ) : (
          <ChevronDown className="text-white/50" size={20} />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
