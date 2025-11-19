'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TOPIC_NAMES, QuizTopic } from '@/lib/types'
import { GraphRenderer, GraphPresets } from '@/components/GraphRenderer'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

// Note content structure
interface NoteSection {
  title: string
  content: string
  graphs?: Array<{
    title: string
    config: any
    description?: string
  }>
  keyPoints?: string[]
  examples?: Array<{
    question: string
    solution: string
    graph?: any
  }>
}

interface TopicNotes {
  topic: QuizTopic
  title: string
  sections: NoteSection[]
}

// Sample notes with graphs
const notesData: TopicNotes[] = [
  {
    topic: 'A1',
    title: 'Quadratic Functions',
    sections: [
      {
        title: 'Introduction to Quadratic Functions',
        content: `A quadratic function is a polynomial function of degree 2, written in the form $f(x) = ax^2 + bx + c$ where $a \\neq 0$.

The graph of a quadratic function is a **parabola**:
- If $a > 0$, the parabola opens upward
- If $a < 0$, the parabola opens downward

The **vertex** is the turning point of the parabola.`,
        graphs: [
          {
            title: 'Standard Quadratic: y = x²',
            config: GraphPresets.quadratic(1, 0, 0),
            description: 'Basic parabola opening upward with vertex at origin',
          },
          {
            title: 'Inverted Parabola: y = -x² + 4',
            config: GraphPresets.quadratic(-1, 0, 4),
            description: 'Parabola opening downward with vertex at (0, 4)',
          },
        ],
        keyPoints: [
          'The coefficient a determines the direction and width of the parabola',
          'The vertex form is y = a(x - h)² + k where (h, k) is the vertex',
          'The axis of symmetry is x = h (or x = -b/2a in standard form)',
          'Maximum/minimum value occurs at the vertex',
        ],
      },
      {
        title: 'Completing the Square',
        content: `To convert from standard form $ax^2 + bx + c$ to vertex form:

1. Factor out the coefficient of $x^2$ if $a \\neq 1$
2. Take half of the coefficient of $x$, square it
3. Add and subtract this value inside the parentheses
4. Simplify

$$y = x^2 + 6x + 5$$
$$y = (x^2 + 6x + 9) - 9 + 5$$
$$y = (x + 3)^2 - 4$$

Vertex: $(-3, -4)$`,
        graphs: [
          {
            title: 'Completed Square Example',
            config: {
              expressions: [
                {
                  latex: 'y = x^2 + 6x + 5',
                  color: '#2563eb',
                  label: 'Standard form',
                },
                {
                  latex: 'y = (x + 3)^2 - 4',
                  color: '#dc2626',
                  lineStyle: 'DASHED',
                  label: 'Vertex form',
                },
              ],
              bounds: { left: -10, right: 4, bottom: -6, top: 10 },
            },
            description: 'Both forms represent the same parabola',
          },
        ],
        examples: [
          {
            question: 'Complete the square for $y = 2x^2 - 8x + 3$',
            solution: `$y = 2x^2 - 8x + 3$
$y = 2(x^2 - 4x) + 3$
$y = 2(x^2 - 4x + 4 - 4) + 3$
$y = 2((x - 2)^2 - 4) + 3$
$y = 2(x - 2)^2 - 8 + 3$
$y = 2(x - 2)^2 - 5$

**Vertex:** $(2, -5)$
**Minimum value:** $-5$ (since $a = 2 > 0$)`,
            graph: GraphPresets.quadratic(2, -8, 3),
          },
        ],
      },
    ],
  },
  {
    topic: 'G1',
    title: 'Trigonometric Functions',
    sections: [
      {
        title: 'Basic Trigonometric Functions',
        content: `The three basic trigonometric functions are:

**Sine:** $y = \\sin x$
**Cosine:** $y = \\cos x$
**Tangent:** $y = \\tan x$

Key properties:
- Period of sin and cos: $2\\pi$ (360°)
- Period of tan: $\\pi$ (180°)
- Amplitude of sin and cos: 1
- Range: sin and cos: [-1, 1], tan: all real numbers`,
        graphs: [
          {
            title: 'Sine Function',
            config: GraphPresets.trigonometric('sin', 1, 1),
            description: 'y = sin(x) with period 2π',
          },
          {
            title: 'Cosine Function',
            config: GraphPresets.trigonometric('cos', 1, 1),
            description: 'y = cos(x) with period 2π',
          },
          {
            title: 'Tangent Function',
            config: {
              expressions: [
                {
                  latex: 'y = \\tan(x)',
                  color: '#16a34a',
                  label: 'tan(x)',
                },
              ],
              bounds: { left: -Math.PI, right: Math.PI, bottom: -5, top: 5 },
            },
            description: 'y = tan(x) with asymptotes at odd multiples of π/2',
          },
        ],
        keyPoints: [
          'sin(x) = 0 when x = nπ where n is any integer',
          'cos(x) = 0 when x = (2n+1)π/2',
          'tan(x) is undefined at x = (2n+1)π/2',
          'sin²(x) + cos²(x) = 1 (Pythagorean identity)',
        ],
      },
      {
        title: 'Transformations of Trigonometric Functions',
        content: `General form: $y = a\\sin(bx + c) + d$

**a**: Amplitude (vertical stretch)
**b**: Affects period (period = $2\\pi/b$)
**c**: Horizontal shift (phase shift = $-c/b$)
**d**: Vertical shift`,
        graphs: [
          {
            title: 'Amplitude Changes',
            config: {
              expressions: [
                { latex: 'y = \\sin(x)', color: '#2563eb', label: 'sin(x)' },
                { latex: 'y = 2\\sin(x)', color: '#dc2626', label: '2sin(x)' },
                { latex: 'y = 0.5\\sin(x)', color: '#16a34a', label: '0.5sin(x)' },
              ],
              bounds: { left: -2 * Math.PI, right: 2 * Math.PI, bottom: -3, top: 3 },
            },
            description: 'Different amplitudes of sine function',
          },
          {
            title: 'Period Changes',
            config: {
              expressions: [
                { latex: 'y = \\sin(x)', color: '#2563eb', label: 'sin(x)' },
                { latex: 'y = \\sin(2x)', color: '#dc2626', label: 'sin(2x)' },
                { latex: 'y = \\sin(0.5x)', color: '#16a34a', label: 'sin(0.5x)' },
              ],
              bounds: { left: -4 * Math.PI, right: 4 * Math.PI, bottom: -2, top: 2 },
            },
            description: 'Different periods of sine function',
          },
        ],
      },
    ],
  },
  {
    topic: 'C1',
    title: 'Differentiation & Integration',
    sections: [
      {
        title: 'Basic Differentiation',
        content: `The derivative of a function $f(x)$ represents the rate of change or slope of the function at any point.

**Power Rule:** If $f(x) = x^n$, then $f'(x) = nx^{n-1}$

**Common derivatives:**
- $\\frac{d}{dx}(c) = 0$ (constant)
- $\\frac{d}{dx}(x) = 1$
- $\\frac{d}{dx}(x^2) = 2x$
- $\\frac{d}{dx}(x^n) = nx^{n-1}$`,
        graphs: [
          {
            title: 'Function and its Derivative',
            config: GraphPresets.derivative('y = x^2', 'y = 2x'),
            description: 'The derivative shows the slope at each point',
          },
          {
            title: 'Cubic Function and Derivative',
            config: {
              expressions: [
                { latex: 'y = x^3 - 3x', color: '#2563eb', label: 'f(x) = x³ - 3x' },
                { latex: 'y = 3x^2 - 3', color: '#dc2626', lineStyle: 'DASHED', label: "f'(x) = 3x² - 3" },
              ],
              bounds: { left: -3, right: 3, bottom: -5, top: 5 },
            },
            description: 'Derivative crosses x-axis where original has turning points',
          },
        ],
        keyPoints: [
          'The derivative at a point gives the slope of the tangent line',
          'f\'(x) = 0 at local maxima and minima (turning points)',
          'f\'(x) > 0 means f is increasing',
          'f\'(x) < 0 means f is decreasing',
        ],
        examples: [
          {
            question: 'Find the derivative of $f(x) = 3x^4 - 2x^2 + 5x - 1$',
            solution: `Using the power rule on each term:
$f'(x) = 3(4x^3) - 2(2x) + 5(1) - 0$
$f'(x) = 12x^3 - 4x + 5$`,
          },
        ],
      },
    ],
  },
  {
    topic: 'A6',
    title: 'Exponential & Logarithmic Functions',
    sections: [
      {
        title: 'Exponential Functions',
        content: `An exponential function has the form $f(x) = a \\cdot b^x$ where $a > 0$ and $b > 0$, $b \\neq 1$.

**Special case:** $f(x) = e^x$ where $e \\approx 2.718$

Properties:
- Domain: all real numbers
- Range: $(0, \\infty)$ if $a > 0$
- Horizontal asymptote: $y = 0$
- Always increasing if $b > 1$, decreasing if $0 < b < 1$`,
        graphs: [
          {
            title: 'Exponential Growth',
            config: {
              expressions: [
                { latex: 'y = 2^x', color: '#2563eb', label: '2^x' },
                { latex: 'y = 3^x', color: '#dc2626', label: '3^x' },
                { latex: 'y = e^x', color: '#16a34a', label: 'e^x' },
              ],
              bounds: { left: -3, right: 3, bottom: -1, top: 8 },
            },
            description: 'Different exponential growth functions',
          },
          {
            title: 'Exponential Decay',
            config: {
              expressions: [
                { latex: 'y = (0.5)^x', color: '#2563eb', label: '(1/2)^x' },
                { latex: 'y = e^{-x}', color: '#dc2626', label: 'e^(-x)' },
              ],
              bounds: { left: -2, right: 4, bottom: -1, top: 5 },
            },
            description: 'Exponential decay functions',
          },
        ],
      },
      {
        title: 'Logarithmic Functions',
        content: `The logarithm is the inverse of the exponential function.

If $y = b^x$, then $x = \\log_b(y)$

**Natural logarithm:** $\\ln(x) = \\log_e(x)$

**Properties:**
- $\\log_b(xy) = \\log_b(x) + \\log_b(y)$
- $\\log_b(x/y) = \\log_b(x) - \\log_b(y)$
- $\\log_b(x^n) = n\\log_b(x)$
- $\\log_b(b) = 1$`,
        graphs: [
          {
            title: 'Natural Logarithm',
            config: GraphPresets.logarithmic(Math.E),
            description: 'y = ln(x), the inverse of e^x',
          },
          {
            title: 'Exponential and Logarithm (Inverses)',
            config: {
              expressions: [
                { latex: 'y = e^x', color: '#2563eb', label: 'e^x' },
                { latex: 'y = \\ln(x)', color: '#dc2626', label: 'ln(x)' },
                { latex: 'y = x', color: '#9333ea', lineStyle: 'DASHED', label: 'y = x' },
              ],
              bounds: { left: -3, right: 5, bottom: -3, top: 5 },
            },
            description: 'Exponential and logarithm are reflections across y=x',
          },
        ],
      },
    ],
  },
]

export default function NotesPage() {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic>('A1')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['0']))

  const currentNotes = notesData.find(n => n.topic === selectedTopic)

  const toggleSection = (index: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedSections(newExpanded)
  }

  const renderLatex = (text: string) => {
    const parts: React.ReactElement[] = []
    let remaining = text
    let key = 0

    // Handle block math
    while (remaining.includes('$$')) {
      const start = remaining.indexOf('$$')
      const end = remaining.indexOf('$$', start + 2)
      if (end === -1) break

      if (start > 0) {
        parts.push(<span key={key++}>{processInlineLatex(remaining.substring(0, start))}</span>)
      }

      const latex = remaining.substring(start + 2, end)
      parts.push(
        <div key={key++} className="my-4">
          <BlockMath math={latex} />
        </div>
      )

      remaining = remaining.substring(end + 2)
    }

    if (remaining) {
      parts.push(<span key={key++}>{processInlineLatex(remaining)}</span>)
    }

    return parts.length > 0 ? <>{parts}</> : processInlineLatex(text)
  }

  const processInlineLatex = (text: string) => {
    const parts: React.ReactElement[] = []
    let remaining = text
    let key = 0

    while (remaining.includes('$')) {
      const start = remaining.indexOf('$')
      const end = remaining.indexOf('$', start + 1)
      if (end === -1) break

      if (start > 0) {
        parts.push(<span key={key++}>{remaining.substring(0, start)}</span>)
      }

      const latex = remaining.substring(start + 1, end)
      parts.push(<InlineMath key={key++} math={latex} />)

      remaining = remaining.substring(end + 1)
    }

    if (remaining) {
      parts.push(<span key={key++}>{remaining}</span>)
    }

    return parts.length > 0 ? <>{parts}</> : text
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">📚 Study Notes</h1>
          <p className="text-gray-400">Interactive notes with graphs for O-Level Additional Mathematics</p>

          {/* Link to Models */}
          <Link
            href="/student/models"
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <span className="font-semibold">Explore Real-World Applications</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Topic Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sticky top-4">
              <h2 className="text-lg font-bold text-white mb-4">Topics</h2>
              <div className="space-y-2">
                {notesData.map(note => (
                  <button
                    key={note.topic}
                    onClick={() => {
                      setSelectedTopic(note.topic)
                      setExpandedSections(new Set(['0']))
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedTopic === note.topic
                        ? 'bg-cyan-500/20 border-2 border-cyan-500 text-cyan-400'
                        : 'bg-white/5 border-2 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="font-mono font-bold text-sm">{note.topic}</div>
                    <div className="text-xs">{TOPIC_NAMES[note.topic]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Content */}
          <div className="lg:col-span-3">
            {currentNotes && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{currentNotes.title}</h2>
                  <p className="text-gray-400">{TOPIC_NAMES[currentNotes.topic]}</p>
                </div>

                {currentNotes.sections.map((section, index) => {
                  const isExpanded = expandedSections.has(index.toString())

                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection(index.toString())}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                      >
                        <h3 className="text-xl font-bold text-white">{section.title}</h3>
                        <svg
                          className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="p-6 pt-0 space-y-6">
                          {/* Content */}
                          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {renderLatex(section.content)}
                          </div>

                          {/* Key Points */}
                          {section.keyPoints && (
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                              <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                                </svg>
                                Key Points
                              </h4>
                              <ul className="space-y-2 text-gray-300">
                                {section.keyPoints.map((point, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>{renderLatex(point)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Graphs */}
                          {section.graphs && section.graphs.map((graph, i) => (
                            <div key={i} className="space-y-2">
                              <h4 className="text-cyan-400 font-bold">{graph.title}</h4>
                              {graph.description && (
                                <p className="text-gray-400 text-sm">{graph.description}</p>
                              )}
                              <GraphRenderer config={graph.config} height={400} />
                            </div>
                          ))}

                          {/* Examples */}
                          {section.examples && (
                            <div className="space-y-4">
                              <h4 className="text-green-400 font-bold text-lg flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                </svg>
                                Worked Examples
                              </h4>
                              {section.examples.map((example, i) => (
                                <div key={i} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
                                  <div>
                                    <span className="text-green-400 font-bold">Question: </span>
                                    <span className="text-gray-300">{renderLatex(example.question)}</span>
                                  </div>
                                  <div>
                                    <span className="text-green-400 font-bold">Solution:</span>
                                    <div className="text-gray-300 mt-2 whitespace-pre-line">
                                      {renderLatex(example.solution)}
                                    </div>
                                  </div>
                                  {example.graph && (
                                    <GraphRenderer config={example.graph} height={350} />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
