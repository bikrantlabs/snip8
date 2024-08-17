"use client"

import * as React from "react"
import { useSnippetStore } from "@/store/use-snippet-store"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { BundledTheme } from "shiki"
import { themeData } from "@/lib/get-themes"
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
import { ThemeControlPreview } from "./theme-control-preview"

export function ThemeSelector() {
  const setState = useSnippetStore((state) => state.setStates)
  const snippetOptions = useSnippetStore((state) => state.snippetOptions)
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
          {value ? (
            <>
              {" "}
              <ThemeControlPreview
                accentColor={
                  themeData.find((theme) => theme.value === value)
                    ?.accentColor as string
                }
              />
            </>
          ) : (
            "Select theme..."
          )}
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
                onSelect={() => {
                  setState({
                    snippetOptions: { ...snippetOptions, theme: "vesper" },
                  })
                  setValue("vesper")
                  setOpen(false)
                }}
                className={cn(value === "vesper" ? "bg-accent" : "bg-none")}
              >
                Default
              </CommandItem>
              {themeData.map((theme) => (
                <CommandItem
                  key={theme.value}
                  value={theme.value}
                  onSelect={(currentValue) => {
                    const typedValue = currentValue as unknown as BundledTheme
                    setState({
                      snippetOptions: { ...snippetOptions, theme: typedValue },
                    })
                    setValue(typedValue === value ? "vesper" : typedValue)
                    setOpen(false)
                  }}
                  className={cn(value === theme.value ? "bg-accent" : "")}
                >
                  <ThemeControlPreview accentColor={theme.accentColor} />
                  <span className="text-sm"> {theme.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
