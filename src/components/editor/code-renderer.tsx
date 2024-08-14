import React from "react"
import { HastNode } from "@/types/hast-node"
import { parseStyleString } from "@/lib/parse-styles"
import { cn } from "@/lib/utils"

interface CodeRendererProps {
  node: HastNode
  lineNumber: number
}

export const CodeRenderer: React.FC<CodeRendererProps> = ({
  node,
  lineNumber,
}) => {
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

      lineNumberElement = (
        <span
          style={{ color: "#888", marginRight: "1rem", userSelect: "none" }}
          className="line-number cursor-pointer"
        >
          {currentLineNumber}
        </span>
      )
    }
    if (node.tagName === "pre") {
      preTagStyles = "p-2 rounded whitespace-pre-wrap break-words shadow"
    }
    // Convert style string to a CSSProperties object
    const styles = parseStyleString(node.properties?.style || "")

    return (
      <TagName
        style={{ ...styles }}
        className={cn(node.properties.class, preTagStyles)}
        tabIndex={node.properties.tabIndex}
      >
        {lineNumberElement}
        {node.children.map((childNode, index) => (
          <CodeRenderer
            key={index}
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
