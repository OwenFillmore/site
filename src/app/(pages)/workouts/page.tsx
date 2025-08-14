import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function WorkoutsPage() {
  const workouts = await prisma.workout.findMany({ orderBy: { date: 'desc' }, include: { sets: true } })
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Workouts</h1>
        <Link href="/workouts/new" className="underline">New</Link>
      </div>
    <ul className="divide-y rounded border">
  {workouts.map((w: { id: string; title?: string | null; date: Date; sets: any[] }) => (
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
