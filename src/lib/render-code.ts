import { useCallback, useState } from "react"
import { useControlsStore } from "@/store/use-controls-store"
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import { codeToHast } from "shiki"
import { HastNode } from "@/types/hast-node"

export const useRenderCode = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const { controls } = useControlsStore((state) => state)
  console.log(`🔥 render-code.ts:15 ~ controls ~`, controls)
  const renderCode = useCallback(
    async (code: string): Promise<HastNode | null> => {
      setLoading(true)
      setError(null)
      try {
        const root = await codeToHast(code, {
          lang: controls?.lang,
          theme: controls.theme,
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
          ],
        })
        console.log(`🔥 render-code.ts:36 ~ Data: ~`, root)
        return root.children[0] as HastNode
      } catch (err) {
        setError(err as Error)
        return null
      } finally {
        setLoading(false)
      }
    },
    [
      controls.endHighlight,
      controls.lang,
      controls.startHighlight,
      controls.theme,
    ]
  )

  return { renderCode, loading, error }
}
