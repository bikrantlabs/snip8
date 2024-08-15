import { create } from "zustand"

interface HighlightedLinesState {
  highlightedLines: number[]
  errorHighlightedLines: number[]
  successHighlightedLines: number[]
  toggleHighlight: (
    lineNumber: number,
    ctrlKey: boolean,
    shiftKey: boolean
  ) => void
}

export const useHighlightedLinesStore = create<HighlightedLinesState>(
  (set) => ({
    highlightedLines: [],
    errorHighlightedLines: [],
    successHighlightedLines: [],
    toggleHighlight: (lineNumber, ctrlKey, shiftKey) => {
      set((state) => {
        if (
          state.highlightedLines.includes(lineNumber) ||
          state.errorHighlightedLines.includes(lineNumber) ||
          state.successHighlightedLines.includes(lineNumber)
        ) {
          return {
            highlightedLines: state.highlightedLines.filter(
              (line) => line !== lineNumber
            ),
            errorHighlightedLines: state.errorHighlightedLines.filter(
              (line) => line !== lineNumber
            ),
            successHighlightedLines: state.successHighlightedLines.filter(
              (line) => line !== lineNumber
            ),
          }
        } else {
          if (ctrlKey && shiftKey) {
            return {
              errorHighlightedLines: state.errorHighlightedLines.includes(
                lineNumber
              )
                ? state.errorHighlightedLines.filter(
                    (line) => line !== lineNumber
                  )
                : [...state.errorHighlightedLines, lineNumber],
            }
          } else if (ctrlKey) {
            return {
              successHighlightedLines: state.successHighlightedLines.includes(
                lineNumber
              )
                ? state.successHighlightedLines.filter(
                    (line) => line !== lineNumber
                  )
                : [...state.successHighlightedLines, lineNumber],
            }
          } else {
            return {
              highlightedLines: [...state.highlightedLines, lineNumber],
            }
          }
        }
      })
    },
  })
)
