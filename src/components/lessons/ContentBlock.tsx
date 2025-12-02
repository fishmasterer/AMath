'use client';

import { ContentBlock as ContentBlockType } from '@/lib/lessons/types';
import { MathVisualization } from '@/components/visualizations';
import { Lightbulb, AlertTriangle, Info, BookOpen, ChevronRight } from 'lucide-react';
import katex from 'katex';

interface ContentBlockProps {
  block: ContentBlockType;
  className?: string;
}

export function ContentBlock({ block, className = '' }: ContentBlockProps) {
  switch (block.type) {
    case 'text':
      return <TextContent content={block.content} className={className} />;
    case 'latex':
      return <LatexContent content={block.content} display={block.display} className={className} />;
    case 'image':
      return <ImageContent src={block.src} alt={block.alt} caption={block.caption} className={className} />;
    case 'callout':
      return (
        <CalloutContent
          variant={block.variant}
          title={block.title}
          content={block.content}
          className={className}
        />
      );
    case 'steps':
      return <StepsContent steps={block.steps} className={className} />;
    case 'visualization':
      return (
        <VisualizationContent
          visualType={block.visualType}
          config={block.config}
          interactive={block.interactive}
          className={className}
        />
      );
    default:
      return null;
  }
}

// Text content renderer
function TextContent({ content, className }: { content: string; className: string }) {
  return (
    <div className={`text-white/80 leading-relaxed ${className}`}>
      {content.split('\n').map((paragraph, idx) => (
        <p key={idx} className={idx > 0 ? 'mt-3' : ''}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

// LaTeX content renderer
function LatexContent({
  content,
  display,
  className,
}: {
  content: string;
  display?: boolean;
  className: string;
}) {
  try {
    return (
      <div
        className={`
          ${display ? 'my-6 text-center overflow-x-auto py-4 bg-slate-800/50 rounded-xl' : 'inline'}
          ${className}
        `}
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(content, {
            throwOnError: false,
            displayMode: display,
          }),
        }}
      />
    );
  } catch {
    return (
      <div className={`font-mono text-cyan-400 ${className}`}>
        {content}
      </div>
    );
  }
}

// Image content renderer
function ImageContent({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className: string;
}) {
  return (
    <figure className={`my-4 ${className}`}>
      <div className="rounded-xl overflow-hidden bg-slate-800/50 border border-white/10">
        <img src={src} alt={alt} className="w-full h-auto" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-white/50 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Callout content renderer
function CalloutContent({
  variant,
  title,
  content,
  className,
}: {
  variant: 'tip' | 'warning' | 'info' | 'example';
  title?: string;
  content: string;
  className: string;
}) {
  const variants = {
    tip: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: <Lightbulb className="text-green-400" size={20} />,
      titleColor: 'text-green-400',
      defaultTitle: 'Pro Tip',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      icon: <AlertTriangle className="text-yellow-400" size={20} />,
      titleColor: 'text-yellow-400',
      defaultTitle: 'Watch Out',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: <Info className="text-blue-400" size={20} />,
      titleColor: 'text-blue-400',
      defaultTitle: 'Did You Know?',
    },
    example: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      icon: <BookOpen className="text-purple-400" size={20} />,
      titleColor: 'text-purple-400',
      defaultTitle: 'Example',
    },
  };

  const style = variants[variant];

  return (
    <div
      className={`
        p-4 rounded-xl border
        ${style.bg} ${style.border}
        ${className}
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        {style.icon}
        <span className={`font-medium ${style.titleColor}`}>
          {title || style.defaultTitle}
        </span>
      </div>
      <p className="text-white/80 text-sm">{content}</p>
    </div>
  );
}

// Step by step content renderer
function StepsContent({
  steps,
  className,
}: {
  steps: { title: string; content: string; latex?: string }[];
  className: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="flex gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/10"
        >
          {/* Step number */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold">{idx + 1}</span>
          </div>

          {/* Step content */}
          <div className="flex-1">
            <h4 className="font-medium text-white mb-1">{step.title}</h4>
            <p className="text-white/70 text-sm">{step.content}</p>
            {step.latex && (
              <div
                className="mt-3 p-3 bg-slate-900/80 rounded-lg overflow-x-auto"
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(step.latex, {
                    throwOnError: false,
                    displayMode: true,
                  }),
                }}
              />
            )}
          </div>

          {/* Arrow to next step */}
          {idx < steps.length - 1 && (
            <ChevronRight className="text-white/30 flex-shrink-0" size={20} />
          )}
        </div>
      ))}
    </div>
  );
}

// Visualization content renderer
function VisualizationContent({
  visualType,
  config,
  interactive,
  className,
}: {
  visualType: 'desmos' | 'geogebra' | 'custom';
  config: Record<string, unknown>;
  interactive?: boolean;
  className: string;
}) {
  return (
    <div className={className}>
      <MathVisualization
        title={(config.title as string) || 'Interactive Graph'}
        description={(config.description as string) || 'Explore the visualization'}
        visualization={{ type: visualType, config }}
        interactive={interactive}
      />
    </div>
  );
}

// Render multiple content blocks
interface ContentBlocksProps {
  blocks: ContentBlockType[];
  className?: string;
}

export function ContentBlocks({ blocks, className = '' }: ContentBlocksProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, idx) => (
        <ContentBlock key={idx} block={block} />
      ))}
    </div>
  );
}
