import React from "react"

interface LineNumberProps {
  lineNumber: number
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

export const LineNumber: React.FC<LineNumberProps> = ({
  lineNumber,
  onClick,
}) => {
  return (
    <span
      onClick={onClick}
      style={{ color: "#888", marginRight: "1rem", userSelect: "none" }}
      className="line-number cursor-pointer"
    >
      {lineNumber}
    </span>
  )
}
