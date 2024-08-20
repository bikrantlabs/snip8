import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Kbd } from "../ui/kdb"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export const AboutSnippetBtn = () => {
  return (
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
  )
}
