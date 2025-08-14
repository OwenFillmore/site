import { prisma } from '@/lib/prisma'
import { VolumeChart, E1RMChart } from '@/components/charts'

export default async function StatsPage() {
  const workouts = await prisma.workout.findMany({ orderBy: { date: 'asc' }, include: { sets: true } })
  const volume = workouts.map((w: { date: Date; sets: Array<{ reps: number; weight: number }> }) => ({
    x: new Date(w.date).toISOString().slice(5, 10),
    y: w.sets.reduce((sum: number, s: { reps: number; weight: number }) => sum + s.reps * s.weight, 0),
  }))
  const e1rm = workouts.map((w: { date: Date; sets: Array<{ reps: number; weight: number }> }) => ({
    x: new Date(w.date).toISOString().slice(5, 10),
    y: Math.round(w.sets.length ? Math.max(...w.sets.map((s: { reps: number; weight: number }) => s.weight * (1 + s.reps / 30))) : 0),
  }))

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Stats</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded border p-4">
          <div className="font-medium mb-2">Volume over time</div>
          <VolumeChart data={volume} />
        </div>
        <div className="rounded border p-4">
          <div className="font-medium mb-2">e1RM trend</div>
          <E1RMChart data={e1rm} />
        </div>
      </div>
    </main>
  )
}
