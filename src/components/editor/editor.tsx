"use client"

import { useRef, useState } from "react"
import { codeToHast } from "shiki"
import { HastNode } from "@/types/hast-node"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { CodeRenderer } from "./code-renderer"

export const Editor: React.FC = () => {
  const [code, setCode] = useState<string>("")
  const [hast, setHast] = useState<HastNode>()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const startHighlight = async () => {
    const root = await codeToHast(code, {
      lang: "javascript",
      theme: "andromeeda",
    })

    setHast(root.children[0] as unknown as HastNode)
    // const highlightedHtml = addLineHighlights(html, [1, 2, 3])
  }

  return (
    <div>
      <Textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => {
          setCode(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key == "Enter") {
            startHighlight()
          }
        }}
        placeholder="Type your code here..."
        className="min-h-72"
      />
      <Button onClick={startHighlight}>Start</Button>
      {hast && <CodeRenderer node={hast} />}
    </div>
  )
}
