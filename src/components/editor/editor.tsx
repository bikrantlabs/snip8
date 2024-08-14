"use client"

import { useRef, useState } from "react"
import useStore from "@/store/useStore"
import { formatCode } from "@/lib/format-code"
import { useRenderCode } from "@/lib/render-code"
import { Kbd } from "../ui/kdb"
import { Textarea } from "../ui/textarea"

export const Editor: React.FC = () => {
  const [initialCode, setInitialCode] =
    useState<string>(`const useStore = create<StoreState>((set) => ({
  formattedCode: undefined,
  setFormattedCode: (code) => set({ formattedCode: code }),
}))
`)
  const { setFormattedCode } = useStore((state) => state)
  const { error, renderCode } = useRenderCode()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const startHighlight = async () => {
    const response = await formatCode(initialCode)
    if (!response.success) {
      // setError(response.errorMessage || "An error occurred")
      console.log(`🔥 editor.tsx:34 ~ SomeError ~`)
    }

    const node = await renderCode(response.formattedCode || initialCode)
    if (node) setFormattedCode(node)
  }
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
            startHighlight()
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
