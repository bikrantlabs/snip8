"use client"

import { useSnippetStore } from "@/store/use-snippet-store"
import { TextAlignLeftIcon } from "@radix-ui/react-icons"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { Toggle } from "../ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip"

export const EnableFormatting = () => {
  const enableFormatting = useSnippetStore((state) => state.enableFormatting)
  const setStates = useSnippetStore((state) => state.setStates)
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Toggle
                defaultPressed={enableFormatting}
                pressed={enableFormatting}
                variant="outline"
                onPressedChange={(e) => setStates({ enableFormatting: e })}
                aria-label="toggle-formatting"
              >
                <TextAlignLeftIcon />
              </Toggle>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable code formatting</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
