"use client"

import { useCallback, useState } from "react"
import useStore from "@/store/use-code-store"
import { cn } from "@/lib/utils"
import { CodeRenderer } from "./code-renderer"

export const CodeBox = () => {
  const [lineNumber] = useState<number>(1)
  const { formattedCode, setBackgroundColor, backgroundColor } = useStore(
    (state) => state
  )
  const handleSetBackgroundColor = useCallback(
    (color: string) => {
      setBackgroundColor(color)
    },
    [setBackgroundColor]
  )
  return (
    <>
      {formattedCode ? (
        <div
          className={cn("h-full max-h-[85vh] overflow-auto")}
          style={{ backgroundColor }}
        >
          <CodeRenderer
            setBackgroundColor={handleSetBackgroundColor}
            node={formattedCode}
            lineNumber={lineNumber}
          />
        </div>
      ) : (
        <div className="w-full rounded border border-black shadow"></div>
      )}
    </>
  )
}
