import { create } from "zustand"
import { HastNode } from "@/types/hast-node"

type useCodeStoreState = {
  formattedCode: HastNode | undefined
  backgroundColor: string
  setFormattedCode: (code: HastNode) => void
  setBackgroundColor: (color: string) => void
}

export const useCodeStore = create<useCodeStoreState>((set) => ({
  formattedCode: undefined,
  backgroundColor: "#101010", // bgColor of default theme vesper
  setFormattedCode: (code) => set({ formattedCode: code }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
}))
