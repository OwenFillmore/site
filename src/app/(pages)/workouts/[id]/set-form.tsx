'use client'

import { useForm } from 'react-hook-form'

export default function SetForm({ workoutId }: { workoutId: string }) {
  const { register, handleSubmit, reset } = useForm<{ reps: number; weight: number }>()
  const onSubmit = async (data: { reps: number; weight: number }) => {
    await fetch('/api/sets', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ workoutId, exerciseId: 'placeholder', reps: Number(data.reps), weight: Number(data.weight) }),
    })
    reset()
    location.reload()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <input className="border rounded px-2 py-1 w-24" type="number" placeholder="Reps" {...register('reps', { valueAsNumber: true })} />
      <input className="border rounded px-2 py-1 w-28" type="number" step="0.5" placeholder="Weight" {...register('weight', { valueAsNumber: true })} />
      <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Add Set</button>
    </form>
  )
}
