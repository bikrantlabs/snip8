export const addLineHighlights = (html: string, lines: number[]) => {
  const linesArray = html.split("\n")
  lines.forEach((line) => {
    if (linesArray[line - 1]) {
      linesArray[line - 1] =
        `<span class="highlight-line">${linesArray[line - 1]}</span>`
    }
  })
  return linesArray.join("\n")
}
