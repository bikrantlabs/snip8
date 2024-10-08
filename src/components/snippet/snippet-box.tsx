"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useDownloadImageStore } from "@/store/download-image-store"
import { useHighlightedLinesStore } from "@/store/use-highlighted-lines-store"
import { useSnippetStore } from "@/store/use-snippet-store"
import { cn } from "@/lib/utils"
import { CodeRenderer } from "./code-renderer"
import { SnippetBoxHeader } from "./snippet-box-header"

export const SnippetBox = () => {
  const setState = useSnippetStore((state) => state.setStates)
  const isDownloading = useDownloadImageStore((state) => state.isDownloading)
  const hast = useSnippetStore((state) => state.hast)
  const backgroundColor = useSnippetStore((state) => state.backgroundColor)
  const setElementRef = useDownloadImageStore((state) => state.setElementRef)
  const [lineNumber] = useState<number>(1)
  const codeBoxRef = useRef<HTMLDivElement>(null)

  const {
    errorHighlightedLines,
    highlightedLines,
    successHighlightedLines,
    toggleHighlight,
  } = useHighlightedLinesStore((state) => state)

  const handleSetBackgroundColor = useCallback((color: string) => {
    setState({ backgroundColor: color })
  }, [])
  useEffect(() => {
    setElementRef(codeBoxRef)
  }, [])
  console.log(`🔥 snippet-box.tsx:33 ~ From snippet box ~`, hast)
  return (
    <div>
      {hast ? (
        <div className="relative h-full max-h-[80vh] overflow-auto">
          <div ref={codeBoxRef}>
            <SnippetBoxHeader />

            <div className="flex h-full flex-col gap-2">
              <div
                className={cn(
                  "h-full",
                  !isDownloading ? "rounded-bl-lg rounded-br-lg" : "rounded-lg"
                )}
                style={{ backgroundColor }}
              >
                <CodeRenderer
                  errorHighlightedLines={errorHighlightedLines}
                  highlightedLines={highlightedLines}
                  successHighlightedLines={successHighlightedLines}
                  toggleHighlight={toggleHighlight}
                  setBackgroundColor={handleSetBackgroundColor}
                  node={hast}
                  lineNumber={lineNumber}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded border border-black shadow"></div>
      )}
    </div>
  )
}
