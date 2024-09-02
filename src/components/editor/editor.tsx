"use client"

import { useEffect, useRef, useState } from "react"
import { useSnippetStore } from "@/store/use-snippet-store"
import { PlayIcon } from "@radix-ui/react-icons"
import { formatCode } from "@/lib/format-code"
import { useFormatAndGenerateHast } from "@/hooks/use-format-and-generate-hast"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kdb"
import { Textarea } from "../ui/textarea"

export const Editor: React.FC = () => {
  const [initialCode, setInitialCode] = useState<string>(`
      useEffect(() => {
    formatAndGenerateHast()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snippetOptions.lang, snippetOptions.theme, initialCode])
    `)
  const snippetOptions = useSnippetStore((state) => state.snippetOptions)
  const enableFormatting = useSnippetStore((state) => state.enableFormatting)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { formatAndGenerateHast } = useFormatAndGenerateHast(initialCode)
  useEffect(() => {
    formatAndGenerateHast()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snippetOptions.lang, snippetOptions.theme, initialCode, enableFormatting])
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
              formatAndGenerateHast()
            }
          }}
          placeholder="Type your code here..."
          className="h-full min-h-[80vh] resize-none font-mono"
        />
        <Button
          className="absolute bottom-0 right-0 mb-2 mr-4 shadow-lg"
          size="icon"
          onClick={() => {
            formatAndGenerateHast()
          }}
        >
          <PlayIcon className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm">
        Press <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> format and highlight the code.
      </p>
    </div>
  )
}
