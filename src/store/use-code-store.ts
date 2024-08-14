import { create } from "zustand"
import { HastNode } from "@/types/hast-node"

type StoreState = {
  formattedCode: HastNode | undefined
  backgroundColor: string
  setFormattedCode: (code: HastNode) => void
  setBackgroundColor: (color: string) => void
}

const useStore = create<StoreState>((set) => ({
  formattedCode: undefined,
  backgroundColor: "#101010", // bgColor of default theme vesper
  setFormattedCode: (code) => set({ formattedCode: code }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
}))

export default useStore
