"use client"

import { useDownloadImageStore } from "@/store/download-image-store"
import { DownloadIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kdb"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { LanguageSelector } from "./language-selector"
import { ThemeSelector } from "./theme-selector"

export const Controls = () => {
  const downloadCodeImage = useDownloadImageStore(
    (state) => state.downloadCodeImage
  )
  const isDownloading = useDownloadImageStore((state) => state.isDownloading)
  return (
    <div className="w-full rounded">
      <div className="flex items-center gap-4 p-2">
        <div className="space-y-1">
          <LanguageSelector />
        </div>
        <div className="space-y-1">
          <ThemeSelector />
        </div>
        <div className="space-y-1">
          <Button
            variant="outline"
            disabled={isDownloading}
            size="icon"
            onClick={downloadCodeImage}
          >
            <DownloadIcon />
          </Button>
        </div>
        <Popover>
          <PopoverTrigger>
            <InfoCircledIcon />
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-4">
              <p className="text-sm font-medium">
                Click on line numbers for highlighting
              </p>
              <p className="text-sm">
                <Kbd>Shift</Kbd> + <Kbd>Click</Kbd> for success highlighting
              </p>
              <p className="text-sm">
                <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>Click</Kbd> for error
                highlighting
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
