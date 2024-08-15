"use client"

import * as React from "react"
import { useControlsStore } from "@/store/use-controls-store"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { BundledTheme } from "shiki"
import { getThemes } from "@/lib/get-themes"
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

const themes = getThemes()
export function ThemeSelector() {
  const { controls, setControls } = useControlsStore((state) => state)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<BundledTheme>("vesper")
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
            ? themes.find((theme) => theme.value === value)?.label
            : "Select theme..."}
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
                value={"vesper"}
                onSelect={(currentValue) => {
                  const typedValue = currentValue as unknown as BundledTheme
                  setControls({ ...controls, theme: "vesper" })
                  setValue("vesper")
                  setOpen(false)
                }}
              >
                <CheckIcon className={cn("mr-2 h-4 w-4", "opacity-0")} />
                Default
              </CommandItem>
              {themes.map((theme) => (
                <CommandItem
                  key={theme.value}
                  value={theme.value}
                  onSelect={(currentValue) => {
                    const typedValue = currentValue as unknown as BundledTheme
                    setControls({ ...controls, theme: typedValue })
                    setValue(typedValue === value ? "vesper" : typedValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === theme.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {theme.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
