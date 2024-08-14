import { Controls } from "@/components/controls/controls"
import { Editor } from "@/components/editor/editor"

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <div className="grid grid-cols-12 gap-4">
        {/* <Textarea content={code} onChange={(e) => setCode(e.target.value)} /> */}
        <div className="col-span-8">
          <Editor />
        </div>
        <div className="col-span-4">
          <Controls />
        </div>
      </div>
    </main>
  )
}
