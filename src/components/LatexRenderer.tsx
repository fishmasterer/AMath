// Utility component for rendering LaTeX in tutor dashboard
'use client'

import React from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export const renderLatex = (text: string) => {
  if (!text) return null

  const parts: React.ReactElement[] = []
  let remaining = text
  let key = 0

  // Process display math ($$...$$) first
  while (remaining.includes('$$')) {
    const start = remaining.indexOf('$$')
    const end = remaining.indexOf('$$', start + 2)

    if (end === -1) break

    // Add text before LaTeX
    if (start > 0) {
      const before = remaining.substring(0, start)
      parts.push(<span key={key++}>{processInlineMath(before)}</span>)
    }

    // Add LaTeX
    const latex = remaining.substring(start + 2, end)
    parts.push(<BlockMath key={key++} math={latex} />)

    remaining = remaining.substring(end + 2)
  }

  // Add remaining text with inline math
  if (remaining) {
    parts.push(<span key={key++}>{processInlineMath(remaining)}</span>)
  }

  return parts.length > 0 ? <>{parts}</> : processInlineMath(text)
}

const processInlineMath = (text: string) => {
  const parts: React.ReactElement[] = []
  let remaining = text
  let key = 0

  while (remaining.includes('$')) {
    const start = remaining.indexOf('$')
    const end = remaining.indexOf('$', start + 1)

    if (end === -1) break

    // Add text before LaTeX
    if (start > 0) {
      parts.push(<span key={key++}>{remaining.substring(0, start)}</span>)
    }

    // Add inline LaTeX
    const latex = remaining.substring(start + 1, end)
    parts.push(<InlineMath key={key++} math={latex} />)

    remaining = remaining.substring(end + 1)
  }

  // Add remaining text
  if (remaining) {
    parts.push(<span key={key++}>{remaining}</span>)
  }

  return parts.length > 0 ? <>{parts}</> : text
}
