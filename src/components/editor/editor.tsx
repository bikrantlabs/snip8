"use client"

import { useRef, useState } from "react"
import { codeToHast } from "shiki"
import { HastNode } from "@/types/hast-node"
import { formatCode } from "@/lib/format-code"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { CodeRenderer } from "./code-renderer"

export const Editor: React.FC = () => {
  const [initialCode, setInitialCode] = useState<string>("")
  const [hast, setHast] = useState<HastNode>()
  const [error, setError] = useState<string>("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const startHighlight = async () => {
    const reponse = await formatCode(initialCode)
    if (!reponse.success) {
      setError(reponse.errorMessage || "An error occurred")
    }
    const root = await codeToHast(reponse.formattedCode || initialCode, {
      lang: "javascript",
      theme: "andromeeda",
    })

    setHast(root.children[0] as unknown as HastNode)
    // const highlightedHtml = addLineHighlights(html, [1, 2, 3])
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
        className="min-h-96 resize-none"
      />
      {error && <div className="text-red-500">{error}</div>}
      <Button onClick={startHighlight}>Start</Button>
      {hast && (
        <div className="w-full overflow-auto">
          <CodeRenderer node={hast} />
        </div>
      )}
    </div>
  )
}
