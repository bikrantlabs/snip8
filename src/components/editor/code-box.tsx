"use client"

import useStore from "@/store/useStore"
import { CodeRenderer } from "./code-renderer"

export const CodeBox = () => {
  const { formattedCode } = useStore((state) => state)
  return <>{formattedCode && <CodeRenderer node={formattedCode} />}</>
}
