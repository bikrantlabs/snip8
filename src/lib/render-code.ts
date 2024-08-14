import { useCallback, useState } from "react"
import { useRenderCodeOptionsStore } from "@/store/use-controls-store"
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
  const { options } = useRenderCodeOptionsStore((state) => state)
  const renderCode = useCallback(
    async (code: string): Promise<HastNode | null> => {
      setLoading(true)
      setError(null)
      try {
        const root = await codeToHast(code, {
          lang: options?.lang,
          theme: options.theme,
          decorations: [
            {
              start: options.startHighlight,
              end: options.endHighlight,
              properties: { class: "highlighted" },
            },
          ],
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
    [options.endHighlight, options.lang, options.startHighlight, options.theme]
  )

  return { renderCode, loading, error }
}
