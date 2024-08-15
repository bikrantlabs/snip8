// hooks/useBackgroundColorEffect.ts
import { useEffect } from "react"

export const useBackgroundColorEffect = (
  tagName: string,
  backgroundColor: string,
  setBackgroundColor: (color: string) => void
) => {
  useEffect(() => {
    if (tagName === "pre") {
      setBackgroundColor(backgroundColor)
    }
  }, [backgroundColor, tagName, setBackgroundColor])
}
