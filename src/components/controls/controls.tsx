import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Kbd } from "../ui/kdb"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { LanguageSelector } from "./language-selector"
import { ThemeSelector } from "./theme-selector"

export const Controls = () => {
  return (
    <div className="w-full rounded">
      <div className="flex items-center gap-4 p-2">
        <div className="space-y-1">
          <Label>Language:</Label>
          <LanguageSelector />
        </div>
        <div className="space-y-1">
          <Label>Theme:</Label>
          <ThemeSelector />
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
