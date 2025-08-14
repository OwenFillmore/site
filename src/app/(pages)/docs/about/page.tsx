import fs from 'node:fs'
import path from 'node:path'

export default function AboutDocPage() {
  const md = fs.readFileSync(path.join(process.cwd(), 'docs/ABOUT.md'), 'utf8')
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <article className="prose dark:prose-invert">
        <pre className="whitespace-pre-wrap">{md}</pre>
      </article>
    </main>
  )
}
