"use client"

import { useState } from "react"
import useStore from "@/store/useStore"
import { CodeRenderer } from "./code-renderer"

export const CodeBox = () => {
  const [lineNumber] = useState<number>(1)
  const { formattedCode } = useStore((state) => state)
  return (
    <>
      {formattedCode ? (
        <CodeRenderer node={formattedCode} lineNumber={lineNumber} />
      ) : (
        <div className="min-h-96 w-full rounded border border-black shadow"></div>
      )}
    </>
  )
}
