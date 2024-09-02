import { AboutSnippetBtn } from "./about-snippet-btn"
import { EnableFormatting } from "./enable-formatting"
import { CodeImageDownloadButton } from "./image-download-btn"
import { LanguageSelector } from "./language-selector"
import { ThemeSelector } from "./theme-selector"

export const Controls = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded rounded-bl-none rounded-br-none border border-b-0">
      <div className="flex items-center gap-4 p-2">
        <LanguageSelector />
        <ThemeSelector />
        <CodeImageDownloadButton />
        <EnableFormatting />
        <AboutSnippetBtn />
      </div>
    </div>
  )
}
