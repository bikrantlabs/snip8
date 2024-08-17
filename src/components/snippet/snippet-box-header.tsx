"use client"

import { useSnippetStore } from "@/store/use-snippet-store"

export const SnippetBoxHeader = () => {
  const backgroundColor = useSnippetStore((state) => state.backgroundColor)
  return (
    <div
      className="flex items-center justify-center rounded-tl-lg rounded-tr-lg border-b p-2"
      style={{ backgroundColor }}
    >
      <p className="font-mono text-sm text-secondary-foreground">src/app.tsx</p>
    </div>
  )
}
