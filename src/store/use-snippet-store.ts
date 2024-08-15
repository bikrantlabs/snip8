// Main snippet data for database and sharing
import { create } from "zustand"
import { HastNode } from "@/types/hast-node"
import { RenderCodeOptions } from "@/types/render-code-options"

type SnippetStoreState = {
  /**
   * Title for the snippet
   */
  snippetTitle?: string
  /**
   * `snippetContent` is the formatted code that should be converted to Hast
   */
  snippetContent: string

  /**
   * `backgroundColor` is the background color of the code block
   */
  backgroundColor: string
  /**
   * `formattedNode` is the Hast representation of the `snippetContent`
   */
  formattedNode?: HastNode
  /**
   * `snippetOptions` are the options that should be used to render the code
   */
  snippetOptions: RenderCodeOptions
}
type SnippetStoreActions = {
  setStates: (states: Partial<SnippetStoreState>) => void
}
const defaultOptions: RenderCodeOptions = {
  lang: "javascript",
  theme: "vesper",
}
export const useSnippetStore = create<
  SnippetStoreState & SnippetStoreActions
>()((set) => {
  return {
    snippetTitle: undefined,
    backgroundColor: "#101010", // Default background color of vesper theme
    snippetOptions: defaultOptions,
    snippetContent: "",
    setStates: (updates) => set((state) => ({ ...state, ...updates })),
  }
})
