import { create } from "zustand"
import { RenderCodeOptions } from "@/types/render-code-options"

interface RenderCodeOptionsState {
  controls: RenderCodeOptions
  setControls: (options: Partial<RenderCodeOptions>) => void
}

const defaultOptions: RenderCodeOptions = {
  lang: "javascript",
  theme: "vesper",
  startHighlight: { line: 0, character: 0 },
  endHighlight: { line: 0, character: 0 },
}

export const useControlsStore = create<RenderCodeOptionsState>((set) => ({
  controls: defaultOptions,
  setControls: (newOptions) =>
    set((state) => ({
      controls: { ...state.controls, ...newOptions },
    })),
}))
