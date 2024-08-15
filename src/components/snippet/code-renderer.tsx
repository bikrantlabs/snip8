import React from "react"
import { HastNode } from "@/types/hast-node"
import { parseStyleString } from "@/lib/parse-styles"
import { cn } from "@/lib/utils"
import { useBackgroundColorEffect } from "@/hooks/use-background-color-effect"
import { LineNumber } from "./line-numbers"

interface CodeRendererProps {
  node: HastNode
  lineNumber: number
  setBackgroundColor: (color: string) => void
  highlightedLines: number[]
  errorHighlightedLines: number[]
  successHighlightedLines: number[]
  toggleHighlight: (
    lineNumber: number,
    ctrlKey: boolean,
    shiftKey: boolean
  ) => void
}

export const CodeRenderer: React.FC<CodeRendererProps> = ({
  node,
  lineNumber,
  setBackgroundColor,
  highlightedLines,
  errorHighlightedLines,
  successHighlightedLines,
  toggleHighlight,
}) => {
  const styles = parseStyleString(node.properties?.style || "")
  const backgroundColor = styles.backgroundColor || ""

  useBackgroundColorEffect(
    node.tagName || "",
    backgroundColor,
    setBackgroundColor
  )

  if (node.type === "text" && node.value) {
    return <>{node.value}</>
  }

  if (node.type === "element" && node.tagName) {
    const TagName = node.tagName as keyof JSX.IntrinsicElements
    let preTagStyles = ""
    let lineNumberElement = null
    let currentLineNumber = lineNumber

    if (node.properties.class?.includes("line")) {
      lineNumberElement = (
        <LineNumber
          lineNumber={currentLineNumber}
          onClick={(e) =>
            toggleHighlight(currentLineNumber, e.ctrlKey, e.shiftKey)
          }
        />
      )
    }

    if (node.tagName === "pre") {
      preTagStyles = "p-2 rounded-lg overflow-x-auto shadow"
    }

    return (
      <TagName
        style={{ ...styles }}
        className={cn(
          node.properties.class,
          preTagStyles,
          highlightedLines.includes(currentLineNumber) &&
            node.properties?.class?.includes("line")
            ? "highlighted"
            : "",
          errorHighlightedLines.includes(currentLineNumber) &&
            node.properties?.class?.includes("line")
            ? "error-highlighted"
            : "",
          successHighlightedLines.includes(currentLineNumber) &&
            node.properties?.class?.includes("line")
            ? "success-highlighted"
            : ""
        )}
        tabIndex={node.properties.tabIndex}
      >
        {lineNumberElement}
        {node.children.map((childNode, index) => (
          <CodeRenderer
            key={index}
            setBackgroundColor={setBackgroundColor}
            node={childNode}
            lineNumber={
              childNode.properties?.class?.includes("line")
                ? currentLineNumber++
                : currentLineNumber
            }
            highlightedLines={highlightedLines}
            errorHighlightedLines={errorHighlightedLines}
            successHighlightedLines={successHighlightedLines}
            toggleHighlight={toggleHighlight}
          />
        ))}
      </TagName>
    )
  }

  return null
}
