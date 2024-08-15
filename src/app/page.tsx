import { Controls } from "@/components/controls/controls"
import { CodeBox } from "@/components/editor/code-box"
import { Editor } from "@/components/editor/editor"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="grid max-h-[80vh] grid-cols-12 gap-4 p-8">
        {/* <Textarea content={code} onChange={(e) => setCode(e.target.value)} /> */}
        <div className="col-span-6">
          <Editor />
        </div>
        {/* <div className="col-span-2">
          <Controls />
        </div> */}
        <div className="col-span-6">
          {/* <Editor /> */}
          <Controls />
          <CodeBox />
        </div>
      </div>
    </main>
  )
}
