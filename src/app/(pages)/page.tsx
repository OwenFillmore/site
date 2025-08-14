import Link from 'next/link'
import { VolumeChart, E1RMChart } from '@/components/charts'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const [workouts, body] = await Promise.all([
    prisma.workout.findMany({ orderBy: { date: 'desc' }, include: { sets: true } }),
    prisma.bodyLog.findMany({ orderBy: { date: 'desc' } }),
  ])

  const volumeByDay = workouts.slice(0, 7).map((w: { date: Date; sets: Array<{ reps: number; weight: number }> }) => ({
    x: new Date(w.date).toISOString().slice(5, 10),
    y: w.sets.reduce((sum: number, s: { reps: number; weight: number }) => sum + s.reps * s.weight, 0),
  }))

  const e1rmTrend = workouts.slice(0, 7).map((w: { date: Date; sets: Array<{ reps: number; weight: number }> }) => ({
    x: new Date(w.date).toISOString().slice(5, 10),
    y: Math.round(
      w.sets.length ? Math.max(...w.sets.map((s: { reps: number; weight: number }) => s.weight * (1 + s.reps / 30))) : 0
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
          {body.slice(0, 8).map((b: { id: string; date: Date; bodyWeight: number }) => (
            <li key={b.id}>{new Date(b.date).toISOString().slice(5,10)} — {b.bodyWeight} kg</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
