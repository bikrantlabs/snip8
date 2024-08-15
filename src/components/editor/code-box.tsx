"use client"

import { useCallback, useState } from "react"
import { useCodeStore } from "@/store/use-code-store"
import { useHighlightedLinesStore } from "@/store/use-highlighted-lines-store"
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
  const { formattedCode, setBackgroundColor, backgroundColor } = useCodeStore(
    (state) => state
  )
  const handleSetBackgroundColor = useCallback(
    (color: string) => {
      setBackgroundColor(color)
    },
    [setBackgroundColor]
  )
  return (
    <div>
      {formattedCode ? (
        <div>
          <div
            className={cn("h-full max-h-[80vh] overflow-auto")}
            style={{ backgroundColor }}
          >
            <CodeRenderer
              errorHighlightedLines={errorHighlightedLines}
              highlightedLines={highlightedLines}
              successHighlightedLines={successHighlightedLines}
              toggleHighlight={toggleHighlight}
              setBackgroundColor={handleSetBackgroundColor}
              node={formattedCode}
              lineNumber={lineNumber}
            />
          </div>
          <p className="mt-4 text-sm">
            Click on line numbers for line highlighting
          </p>
        </div>
      ) : (
        <div className="w-full rounded border border-black shadow"></div>
      )}
    </div>
  )
}
