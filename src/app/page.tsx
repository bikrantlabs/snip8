import { Controls } from "@/components/controls/controls"
import { Editor } from "@/components/editor/editor"
import { SnippetBox } from "@/components/snippet/snippet-box"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="grid max-h-[80vh] grid-cols-12 gap-4 p-8">
        <div className="col-span-6">
          <Editor />
        </div>
        <div className="col-span-6">
          <SnippetBox />
          <Controls />
        </div>
      </div>
    </main>
  )
}
