"use client"

import { useSnippetStore } from "@/store/use-snippet-store"
import { Controls } from "../controls/controls"

export const SnippetBoxHeader = () => {
  const backgroundColor = useSnippetStore((state) => state.backgroundColor)
  return (
    <div
      className="flex items-center justify-between rounded-tl-lg rounded-tr-lg border-b p-2"
      style={{ backgroundColor }}
    >
      <p className="font-mono text-sm text-secondary-foreground">src/app.tsx</p>
      <div>
        <Controls />
      </div>
    </div>
  )
}
