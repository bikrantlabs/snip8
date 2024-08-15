"use client"

import { useEffect, useRef, useState } from "react"
import { useSnippetStore } from "@/store/use-snippet-store"
import { PlayIcon } from "@radix-ui/react-icons"
import { formatCode } from "@/lib/format-code"
import { useRenderCode } from "@/lib/render-code"
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
  const setState = useSnippetStore((state) => state.setStates)
  const snippetOptions = useSnippetStore((state) => state.snippetOptions)
  const { error, renderCode } = useRenderCode()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const formatAndRenderCode = async () => {
    if (initialCode) {
      const response = await formatCode(initialCode)
      setState({
        snippetContent: response.formattedCode || initialCode,
      })
      const node = await renderCode(response.formattedCode || initialCode)
      if (node) setState({ formattedNode: node })
    }
  }

  useEffect(() => {
    formatAndRenderCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snippetOptions.lang, snippetOptions.theme])
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
      {error && (
        <p className="text-sm text-destructive-foreground">{error.message}</p>
      )}
    </div>
  )
}
