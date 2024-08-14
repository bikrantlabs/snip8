import React, { useRef } from "react"
import { HastNode } from "@/types/hast-node"
import { parseStyleString } from "@/lib/parse-styles"
import { cn } from "@/lib/utils"

interface CodeRendererProps {
  node: HastNode
}

export const CodeRenderer: React.FC<CodeRendererProps> = ({ node }) => {
  // Base Case: If the node is a text node, render its value
  if (node.type === "text" && node.value) {
    return <>{node.value}</>
  }

  // If the node is an element, render it recursively
  if (node.type === "element" && node.tagName) {
    const TagName = node.tagName as keyof JSX.IntrinsicElements
    let preTagStyles = ""
    if (node.tagName === "pre") {
      preTagStyles = "p-2 rounded"
    }
    // Convert style string to a CSSProperties object
    const styles = parseStyleString(node.properties.style)

    return (
      <TagName
        style={{ ...styles }}
        className={cn(node.properties.class, preTagStyles)}
        tabIndex={node.properties.tabIndex}
      >
        {node.children.map((childNode, index) => (
          <CodeRenderer key={index} node={childNode} />
        ))}
      </TagName>
    )
  }

  // If the node is neither a text node nor a recognized element, render nothing
  return null
}
