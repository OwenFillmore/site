import Link from 'next/link'
import { VolumeChart, E1RMChart } from '@/components/charts'

export default async function DashboardPage() {
  const [workoutsRes, bodyRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/workouts`, { cache: 'no-store' }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/bodylogs`, { cache: 'no-store' }),
  ])
  const workoutsJson = await workoutsRes.json()
  const bodyJson = await bodyRes.json()
  const workouts = (workoutsJson.data ?? []) as Array<{ date: string; sets: Array<{ reps: number; weight: number }> }>
  const body = (bodyJson.data ?? []) as Array<{ date: string; bodyWeight: number }>

  const volumeByDay = workouts.slice(0, 7).map((w) => ({
    x: new Date(w.date).toISOString().slice(5, 10),
    y: w.sets.reduce((sum, s) => sum + s.reps * s.weight, 0),
  }))

  const e1rmTrend = workouts.slice(0, 7).map((w) => ({
    x: new Date(w.date).toISOString().slice(5, 10),
    y: Math.round(
      w.sets.length ? Math.max(...w.sets.map((s) => s.weight * (1 + s.reps / 30))) : 0
    ),
  }))

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/workouts" className="underline">Workouts</Link>
          <Link href="/exercises" className="underline">Exercises</Link>
          <Link href="/stats" className="underline">Stats</Link>
          <Link href="/body" className="underline">Body</Link>
          <Link href="/settings" className="underline">Settings</Link>
        </nav>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <div className="font-medium mb-2">Weekly Volume</div>
          <VolumeChart data={volumeByDay} />
        </div>
        <div className="rounded-lg border p-4">
          <div className="font-medium mb-2">e1RM (Epley)</div>
          <E1RMChart data={e1rmTrend} />
        </div>
      </section>

      <section className="rounded-lg border p-4">
        <div className="font-medium mb-2">Recent Body Weight</div>
        <ul className="text-sm text-muted-foreground grid grid-cols-2 md:grid-cols-4 gap-2">
          {body.slice(0, 8).map((b) => (
            <li key={b.date}>{new Date(b.date).toISOString().slice(5,10)} — {b.bodyWeight} kg</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
