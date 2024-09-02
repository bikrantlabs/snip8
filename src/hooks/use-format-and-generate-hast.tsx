import { useCallback } from "react"
import { useSnippetStore } from "@/store/use-snippet-store"
import { formatCode } from "@/lib/format-code"
import { useGenerateHast } from "./use-generate-hast"

export const useFormatAndGenerateHast = (initialCode: string) => {
  const enableFormatting = useSnippetStore((state) => state.enableFormatting)
  const snippetContent = useSnippetStore((state) => state.snippetContent)
  const setState = useSnippetStore((state) => state.setStates)
  const { generateHast } = useGenerateHast()
  // FIXME: This function is not working as expected, async state updates are not working
  const formatAndGenerateHast = useCallback(async () => {
    // Snippet Content => Rendered Code (either formatted or unformatted)
    if (initialCode) {
      // If formatting is enabled, format the code
      // Response will be undefined if there is a formatting error
      let response
      if (enableFormatting) {
        response = await formatCode(initialCode)
        setState({
          snippetContent: response.formattedCode || initialCode,
        })
      }

      //   Change snippetContent into Hast Node
      /**
       * Don't use snippetContent here, because it's not updated yet (due to async nature of setState)
       * Use response.formattedCode instead
       */
      const hast = await generateHast(response?.formattedCode || initialCode)
      if (hast) setState({ hast })
    }
  }, [enableFormatting, initialCode, snippetContent])
  return { formatAndGenerateHast }
  // return <div>useFormatAndGenerateHast</div>
}
