"use client"

import * as React from "react"
import { useControlsStore } from "@/store/use-controls-store"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { BundledLanguage } from "shiki"
import { getLanguages } from "@/lib/get-languages"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const languages = getLanguages()
export function LanguageSelector() {
  const { controls, setControls } = useControlsStore((state) => state)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<BundledLanguage>("javascript")
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? languages.find((language) => language.value === value)?.label
            : "Select language..."}
          <ChevronDownIcon
            className={cn(
              "ml-2 h-4 w-4 shrink-0 opacity-50 transition",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value={"javascript"}
                onSelect={(currentValue) => {
                  const typedValue = currentValue as unknown as BundledLanguage
                  setControls({ ...controls, lang: "javascript" })
                  setValue("javascript")
                  setOpen(false)
                }}
              >
                <CheckIcon className={cn("mr-2 h-4 w-4", "opacity-0")} />
                Default
              </CommandItem>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    const typedValue =
                      currentValue as unknown as BundledLanguage
                    setControls({ ...controls, lang: typedValue })
                    setValue(typedValue === value ? "javascript" : typedValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === language.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
