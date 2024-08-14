export interface HastNode {
  type: "element" | "text"
  tagName?: string
  value?: string // Only for text nodes
  properties: {
    class: string
    tabIndex: number
    style: string
  }
  children: HastNode[]
}
