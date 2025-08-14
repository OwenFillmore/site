import Link from 'next/link'

export default async function WorkoutsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/workouts`, { cache: 'no-store' })
  const json = await res.json()
  const workouts = (json.data ?? []) as Array<{ id: string; date: string; title?: string; sets: any[] }>
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Workouts</h1>
        <Link href="/workouts/new" className="underline">New</Link>
      </div>
      <ul className="divide-y rounded border">
        {workouts.map((w) => (
          <li key={w.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{w.title ?? 'Workout'}</div>
              <div className="text-sm text-muted-foreground">{new Date(w.date).toLocaleDateString()} • {w.sets.length} sets</div>
            </div>
            <Link href={`/workouts/${w.id}`} className="underline">Open</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
