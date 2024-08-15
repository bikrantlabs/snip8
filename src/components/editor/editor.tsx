"use client"

import { useEffect, useRef, useState } from "react"
import { useCodeStore } from "@/store/use-code-store"
import { useControlsStore } from "@/store/use-controls-store"
import { PlayIcon } from "@radix-ui/react-icons"
import { formatCode } from "@/lib/format-code"
import { useRenderCode } from "@/lib/render-code"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"
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
  const { setFormattedCode } = useCodeStore((state) => state)
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
    <div className="flex h-full flex-col gap-2">
      <div className="relative h-full">
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
          className="h-full resize-none font-mono"
        />
        <Button
          className="absolute bottom-0 right-0 mb-2 mr-4 shadow-lg"
          size="icon"
          onClick={() => {
            formatAndRenderCode()
          }}
        >
          <PlayIcon className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm">
        Press <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> format and highlight the code.
      </p>
      <Alert>
        <AlertDescription>
          Code formatting is done using prettier so it cannot format code for
          all languages.
        </AlertDescription>
      </Alert>
      {error && (
        <p className="text-sm text-destructive-foreground">{error.message}</p>
      )}
    </div>
  )
}
