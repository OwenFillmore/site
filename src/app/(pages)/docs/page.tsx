import Link from 'next/link'

export default function DocsIndexPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Docs</h1>
      <ul className="list-disc pl-6">
        <li><Link className="underline" href="/docs/about">About</Link></li>
        <li><Link className="underline" href="/docs/api">API</Link></li>
        <li><Link className="underline" href="/docs/source">Source</Link></li>
      </ul>
    </main>
  )
}
