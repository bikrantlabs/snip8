"use client"

import { useDownloadImageStore } from "@/store/download-image-store"
import { DownloadIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"

export const CodeImageDownloadButton = () => {
  const downloadCodeImage = useDownloadImageStore(
    (state) => state.downloadCodeImage
  )
  const isDownloading = useDownloadImageStore((state) => state.isDownloading)
  return (
    <Button
      variant="outline"
      disabled={isDownloading}
      size="icon"
      onClick={downloadCodeImage}
    >
      <DownloadIcon />
    </Button>
  )
}
