import { error } from "console"
import React, { useCallback, useEffect, useState } from "react"
import { HastNode } from "@/types/hast-node"
import { parseStyleString } from "@/lib/parse-styles"
import { cn } from "@/lib/utils"

interface CodeRendererProps {
  node: HastNode
  lineNumber: number
  setBackgroundColor: (color: string) => void
}

export const CodeRenderer: React.FC<CodeRendererProps> = ({
  node,
  lineNumber,
  setBackgroundColor,
}) => {
  const [highlightedLines, setHighlightedLines] = useState<number[]>([])
  const [errorHighlightedLines, setErrorHighlightedLines] = useState<number[]>(
    []
  )
  const [successHighlightedLines, setSuccessHighlightedLines] = useState<
    number[]
  >([])
  // Base Case: If the node is a text node, render its value
  if (node.type === "text" && node.value) {
    return <>{node.value}</>
  }

  if (node.type === "element" && node.tagName) {
    const TagName = node.tagName as keyof JSX.IntrinsicElements
    let preTagStyles = ""

    let lineNumberElement = null
    let currentLineNumber = lineNumber

    if (node.properties.class?.includes("line")) {
      console.log(`🔥 code-renderer.tsx:32 ~ Found Line ~`)
      if (highlightedLines.includes(currentLineNumber)) {
      }
      lineNumberElement = (
        <span
          onClick={(e) => {
            if (e.ctrlKey && e.shiftKey) {
              console.log(`🔥 code-renderer.tsx:45 ~ CTRL + SHIFT ~`)
              if (successHighlightedLines.includes(currentLineNumber)) {
                setSuccessHighlightedLines(
                  successHighlightedLines.filter(
                    (num) => num !== currentLineNumber
                  )
                )
              } else {
                setSuccessHighlightedLines([
                  ...successHighlightedLines,
                  currentLineNumber,
                ])
              }
              return
            }
            if (e.ctrlKey && !e.shiftKey) {
              console.log(`🔥 code-renderer.tsx:60 ~ CTRL ONLY ~`)
              if (errorHighlightedLines.includes(currentLineNumber)) {
                setErrorHighlightedLines(
                  errorHighlightedLines.filter(
                    (num) => num !== currentLineNumber
                  )
                )
              } else {
                setErrorHighlightedLines([
                  ...errorHighlightedLines,
                  currentLineNumber,
                ])
              }
              return
            }

            if (highlightedLines.includes(currentLineNumber)) {
              setHighlightedLines(
                highlightedLines.filter((num) => num !== currentLineNumber)
              )
            } else {
              setHighlightedLines([...highlightedLines, currentLineNumber])
            }
          }}
          style={{ color: "#888", marginRight: "1rem", userSelect: "none" }}
          className="line-number cursor-pointer"
        >
          {currentLineNumber}
        </span>
      )
    }
    const styles = parseStyleString(node.properties?.style || "")
    const backgroundColor = styles.backgroundColor || ""
    useEffect(() => {
      if (node.tagName === "pre") {
        setBackgroundColor(backgroundColor)
      }
    }, [backgroundColor, node.tagName, setBackgroundColor])

    if (node.tagName === "pre") {
      preTagStyles = "p-2 rounded overflow-x-auto shadow"
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
          />
        ))}
      </TagName>
    )
  }

  // If the node is neither a text node nor a recognized element, render nothing
  return null
}
