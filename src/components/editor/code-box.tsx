"use client"

import { useCallback, useState } from "react"
import { useCodeStore } from "@/store/use-code-store"
import { useHighlightedLinesStore } from "@/store/use-highlighted-lines-store"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Kbd } from "../ui/kdb"
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
        <div className="flex h-full flex-col gap-2">
          <div
            className={cn("h-full max-h-[80vh] overflow-auto rounded-lg")}
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
          <Alert>
            <AlertTitle>Click on line numbers for highlighting</AlertTitle>
            <AlertDescription>
              <div className="space-y-2">
                <p className="text-sm">
                  <Kbd>Shift</Kbd> + <Kbd>Click</Kbd> for success highlighting
                </p>
                <p className="text-sm">
                  <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>Click</Kbd> for
                  error highlighting
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="w-full rounded border border-black shadow"></div>
      )}
    </div>
  )
}
