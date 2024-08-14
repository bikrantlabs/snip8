import { create } from "zustand"
import { HastNode } from "@/types/hast-node"

type StoreState = {
  formattedCode: HastNode | undefined
  setFormattedCode: (code: HastNode) => void
}

const useStore = create<StoreState>((set) => ({
  formattedCode: undefined,
  setFormattedCode: (code) => set({ formattedCode: code }),
}))

export default useStore
