"use client"

import { useCallback, useState } from "react"
import { useHighlightedLinesStore } from "@/store/use-highlighted-lines-store"
import { useSnippetStore } from "@/store/use-snippet-store"
import { cn } from "@/lib/utils"
import { CodeRenderer } from "./code-renderer"

export const CodeBox = () => {
  const [lineNumber] = useState<number>(1)
  const {
    errorHighlightedLines,
    highlightedLines,
    successHighlightedLines,
    toggleHighlight,
  } = useHighlightedLinesStore((state) => state)
  const setState = useSnippetStore((state) => state.setStates)
  const formattedNode = useSnippetStore((state) => state.formattedNode)
  const backgroundColor = useSnippetStore((state) => state.backgroundColor)
  const handleSetBackgroundColor = useCallback((color: string) => {
    setState({ backgroundColor: color })
  }, [])
  return (
    <div>
      {formattedNode ? (
        <>
          <div
            className="rounded-tl-lg rounded-tr-lg border-b p-2 font-mono text-sm text-secondary-foreground"
            style={{ backgroundColor }}
          >
            src/code-box.tsx
          </div>
          <div className="flex h-full flex-col gap-2">
            <div
              className={cn(
                "h-full max-h-[80vh] overflow-auto rounded-bl-lg rounded-br-lg"
              )}
              style={{ backgroundColor }}
            >
              <CodeRenderer
                errorHighlightedLines={errorHighlightedLines}
                highlightedLines={highlightedLines}
                successHighlightedLines={successHighlightedLines}
                toggleHighlight={toggleHighlight}
                setBackgroundColor={handleSetBackgroundColor}
                node={formattedNode}
                lineNumber={lineNumber}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full rounded border border-black shadow"></div>
      )}
    </div>
  )
}
