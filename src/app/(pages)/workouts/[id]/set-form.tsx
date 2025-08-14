'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type Exercise = { id: string; name: string }

export default function SetForm({ workoutId }: { workoutId: string }) {
  const { register, handleSubmit, reset } = useForm<{ reps: number; weight: number; exerciseId: string }>()
  const [exercises, setExercises] = useState<Exercise[]>([])

  useEffect(() => {
    fetch('/api/exercises').then((r) => r.json()).then((json) => setExercises(json.data ?? []))
  }, [])

  const onSubmit = async (data: { reps: number; weight: number; exerciseId: string }) => {
    await fetch('/api/sets', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ workoutId, exerciseId: data.exerciseId, reps: Number(data.reps), weight: Number(data.weight) }),
    })
    reset()
    location.reload()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-2">
      <select className="border rounded px-2 py-1" {...register('exerciseId')}>
        {exercises.map((e) => (
          <option key={e.id} value={e.id}>{e.name}</option>
        ))}
      </select>
      <input className="border rounded px-2 py-1 w-24" type="number" placeholder="Reps" {...register('reps', { valueAsNumber: true })} />
      <input className="border rounded px-2 py-1 w-28" type="number" step="0.5" placeholder="Weight" {...register('weight', { valueAsNumber: true })} />
      <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Add Set</button>
    </form>
  )
}
