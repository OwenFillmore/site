type Props = { params: { id: string } }
import SetForm from './set-form'
import { prisma } from '@/lib/prisma'

export default async function WorkoutDetailPage({ params }: Props) {
  const w = await prisma.workout.findUnique({ where: { id: params.id }, include: { sets: true } })
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">{w?.title ?? 'Workout'} — {w ? new Date(w.date).toLocaleDateString() : ''}</h1>
      <div className="rounded border p-4 space-y-3">
        <div className="font-medium">Sets</div>
        <ul className="text-sm divide-y rounded border">
          {w?.sets?.map((s: { id: string; reps: number; weight: number }) => (
            <li key={s.id} className="p-3">{s.reps} reps × {s.weight} kg</li>
          ))}
        </ul>
        <SetForm workoutId={params.id} />
      </div>
    </main>
  )
}
