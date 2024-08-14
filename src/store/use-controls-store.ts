import { create } from "zustand"
import { RenderCodeOptions } from "@/types/render-code-options"

interface RenderCodeOptionsState {
  options: RenderCodeOptions
  setOptions: (options: Partial<RenderCodeOptions>) => void
}

const defaultOptions: RenderCodeOptions = {
  lang: "javascript",
  theme: "vesper",
  startHighlight: { line: 0, character: 0 },
  endHighlight: { line: 0, character: 0 },
}

export const useRenderCodeOptionsStore = create<RenderCodeOptionsState>(
  (set) => ({
    options: defaultOptions,
    setOptions: (newOptions) =>
      set((state) => ({
        options: { ...state.options, ...newOptions },
      })),
  })
)
