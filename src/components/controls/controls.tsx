import { AboutSnippetBtn } from "./about-snippet-btn"
import { CodeImageDownloadButton } from "./image-download-btn"
import { LanguageSelector } from "./language-selector"
import { ThemeSelector } from "./theme-selector"

export const Controls = () => {
  return (
    <div className="absolute bottom-0 left-1/2 w-[30rem] -translate-x-1/2 rounded rounded-bl-none rounded-br-none border border-b-0">
      <div className="flex items-center gap-4 p-2">
        <div className="space-y-1">
          <LanguageSelector />
        </div>
        <div className="space-y-1">
          <ThemeSelector />
        </div>
        <div className="space-y-1">
          <CodeImageDownloadButton />
        </div>
        <AboutSnippetBtn />
      </div>
    </div>
  )
}
