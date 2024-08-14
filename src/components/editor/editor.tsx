"use client"

import { useEffect, useRef, useState } from "react"
import { useControlsStore } from "@/store/use-controls-store"
import useStore from "@/store/useStore"
import { formatCode } from "@/lib/format-code"
import { useRenderCode } from "@/lib/render-code"
import { Kbd } from "../ui/kdb"
import { Textarea } from "../ui/textarea"

export const Editor: React.FC = () => {
  const [initialCode, setInitialCode] =
    useState<string>(`import React from "react"
import { HastNode } from "@/types/hast-node"
import { parseStyleString } from "@/lib/parse-styles"
import { cn } from "@/lib/utils"

interface CodeRendererProps {
  node: HastNode
  lineNumber: number
}
`)
  const { setFormattedCode } = useStore((state) => state)
  const { controls } = useControlsStore((state) => state)
  const { error, renderCode } = useRenderCode()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const formatAndRenderCode = async () => {
    const response = await formatCode(initialCode)
    if (!response.success) {
      // setError(response.errorMessage || "An error occurred")
    }

    const node = await renderCode(response.formattedCode || initialCode)
    if (node) setFormattedCode(node)
  }
  console.log(`🔥 editor.tsx:37 ~ Data: ~`)
  useEffect(() => {
    formatAndRenderCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    controls.endHighlight,
    controls.lang,
    controls.startHighlight,
    controls.theme,
  ])
  return (
    <div className="">
      <Textarea
        ref={textareaRef}
        value={initialCode}
        onChange={(e) => {
          setInitialCode(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key == "Enter") {
            formatAndRenderCode()
          }
        }}
        placeholder="Type your code here..."
        className="min-h-96 resize-none font-mono"
      />
      <p className="mt-4">
        Press <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> to format and highlight the
        code.
      </p>
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  )
}
