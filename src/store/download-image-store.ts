import { toPng } from "html-to-image"
import { create } from "zustand"
import { useSnippetStore } from "./use-snippet-store"

interface DownloadStoreState {
  isDownloading: boolean
  elementRef?: React.RefObject<HTMLElement>
  setElementRef: (ref: React.RefObject<HTMLElement>) => void
  downloadCodeImage: () => Promise<void>
}

export const useDownloadImageStore = create<DownloadStoreState>((set, get) => ({
  isDownloading: false,
  elementRef: undefined,

  downloadCodeImage: async () => {
    const { elementRef } = get()
    if (!elementRef || elementRef.current === null) return

    set({ isDownloading: true })

    try {
      const backgroundColor = useSnippetStore.getState().backgroundColor // Access backgroundColor from useSnippetStore

      const dataUrl = await toPng(elementRef.current, {
        quality: 1,
        backgroundColor,
      })
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = "div-image.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading image:", error)
    } finally {
      set({ isDownloading: false })
    }
  },
  setElementRef: (ref) => set({ elementRef: ref }),
}))
