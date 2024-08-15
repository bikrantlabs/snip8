import { useCallback, useState } from "react"
import { useSnippetStore } from "@/store/use-snippet-store"
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
  const snippetOptions = useSnippetStore((state) => state.snippetOptions)
  const renderCode = useCallback(
    async (code: string): Promise<HastNode | null> => {
      setLoading(true)
      setError(null)
      try {
        const root = await codeToHast(code, {
          lang: snippetOptions?.lang,
          theme: snippetOptions.theme,
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
    [snippetOptions.lang, snippetOptions.theme]
  )

  return { renderCode, loading, error }
}
