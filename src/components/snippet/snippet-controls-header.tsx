import { Controls } from "../controls/controls"

export const SnippetControlsHeader = () => {
  return (
    <div className="flex h-16 items-center justify-end rounded-lg bg-background/50 bg-opacity-20 p-2 backdrop-blur-lg backdrop-filter">
      <div>
        <Controls />
      </div>
    </div>
  )
}
