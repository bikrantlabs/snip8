import { Label } from "../ui/label"
import { LanguageSelector } from "./language-selector"
import { ThemeSelector } from "./theme-selector"

export const Controls = () => {
  return (
    <div className="min-h-96 w-full rounded border border-black shadow">
      <div className="flex flex-col items-center gap-4 p-2">
        <div className="space-y-1">
          <Label>Language:</Label>
          <LanguageSelector />
        </div>
        <div className="space-y-1">
          <Label>Theme:</Label>
          <ThemeSelector />
        </div>
      </div>
    </div>
  )
}
