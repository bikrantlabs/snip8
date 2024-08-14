import { BundledLanguage, BundledTheme } from "shiki"

export interface RenderCodeOptions {
  lang: BundledLanguage
  theme: BundledTheme
  startHighlight: { line: number; character: number }
  endHighlight: { line: number; character: number }
}
