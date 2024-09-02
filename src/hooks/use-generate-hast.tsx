import { useCallback, useState } from "react"
import { useSnippetStore } from "@/store/use-snippet-store"
import { codeToHast } from "shiki"
import { HastNode } from "@/types/hast-node"

export const useGenerateHast = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const snippetOptions = useSnippetStore((state) => state.snippetOptions)
  const generateHast = useCallback(
    async (code: string): Promise<HastNode | null> => {
      setLoading(true)
      setError(null)
      try {
        const root = await codeToHast(code, {
          lang: snippetOptions.lang,
          theme: snippetOptions.theme,
        })
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

  return { generateHast, loading, error }
}
