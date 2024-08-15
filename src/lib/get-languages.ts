import { BundledLanguage } from "shiki"

const bundledLanguages: BundledLanguage[] = [
  "astro",
  "bash",
  "c",
  "c#",
  "c++",
  "css",
  "dart",
  "dockerfile",
  "elixir",
  "go",
  "graphql",
  "html",
  "java",
  "javascript",
  "json",
  "jsx",
  "kotlin",
  "lua",
  "markdown",
  "mdx",
  "nginx",
  "php",
  "python",
  "r",
  "ruby",
  "rust",
  "scala",
  "scss",
  "shell",
  "solidity",
  "sql",
  "svelte",
  "swift",
  "typescript",
  "tsx",
  "vue",
  "yaml",
  "zig",
  "zsh",
]

export const getLanguages = (): { label: string; value: BundledLanguage }[] => {
  return bundledLanguages.map((language) => ({
    value: language,
    label:
      language.charAt(0).toUpperCase() + language.slice(1).replace(/-/g, " "),
  }))
}
