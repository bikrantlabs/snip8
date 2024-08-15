// Main snippet data for database and sharing
import { create } from "zustand"
import { useCodeStore } from "./use-code-store"

type useSnippetStoreState = {
  snippetTitle?: string
  snippet: string
  setSnippet: (snippet: string) => void
}

export const useSnippetStore = create<useSnippetStoreState>((set) => ({
  snippetTitle: undefined,
  // This snippet should sync with formattedCode in use-code-store.ts
  snippet: "",
  setSnippet: (snippet) => set({ snippet }),
}))

useCodeStore.subscribe((state) => state.formattedCode)
