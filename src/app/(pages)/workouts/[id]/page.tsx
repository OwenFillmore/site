type Props = { params: { id: string } }
import SetForm from './set-form'

export default async function WorkoutDetailPage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/workouts/${params.id}`, { cache: 'no-store' })
  const json = await res.json()
  const w = json.data as { id: string; date: string; title?: string; sets: Array<{ id: string; reps: number; weight: number }> }
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">{w?.title ?? 'Workout'} — {new Date(w?.date).toLocaleDateString()}</h1>
      <div className="rounded border p-4 space-y-3">
        <div className="font-medium">Sets</div>
        <ul className="text-sm divide-y rounded border">
          {w?.sets?.map((s) => (
            <li key={s.id} className="p-3">{s.reps} reps × {s.weight} kg</li>
          ))}
        </ul>
        <SetForm workoutId={params.id} />
      </div>
    </main>
  )
}
