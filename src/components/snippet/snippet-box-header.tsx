"use client"

import { useSnippetStore } from "@/store/use-snippet-store"

export const SnippetBoxHeader = () => {
  const backgroundColor = useSnippetStore((state) => state.backgroundColor)
  return (
    <div
      className="rounded-tl-lg rounded-tr-lg border-b p-2 font-mono text-sm text-secondary-foreground"
      style={{ backgroundColor }}
    >
      src/code-box.tsx
    </div>
  )
}
