import React from "react"

/**
 * Parses a CSS style string and returns a CSSProperties object
 * Input example: "color: red; font-size: 16px;"
 */
export function parseStyleString(styleString: string): React.CSSProperties {
  // Early return in case of empty string
  if (!styleString) return {} as React.CSSProperties

  //   Define a collector object for CssProperties
  const collectorObject: React.CSSProperties = {}

  //   Split the string by SemiColon
  const splittedBySemiColon = styleString.split(";")

  //   Split the string by Colon
  splittedBySemiColon.map((styleProp) => {
    const [key, value] = styleProp.split(":")

    // Change the key from kebab-case to camelCase to match React's CSSProperties
    const camelCaseKey = kebabToCamelCase(key)
    // @ts-expect-error - We know that the key is a valid CSS property
    collectorObject[camelCaseKey] = value.trim()
  })
  return collectorObject
}
function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}
