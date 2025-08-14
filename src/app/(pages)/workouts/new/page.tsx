'use client'

import { useForm } from 'react-hook-form'

export default function NewWorkoutPage() {
  const { register, handleSubmit } = useForm<{ title: string; date: string }>()

  const onSubmit = async (data: { title: string; date: string }) => {
    const res = await fetch('/api/workouts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...data }),
    })
    const json = await res.json()
    if (json?.data?.id) {
      window.location.href = `/workouts/${json.data.id}`
    } else {
      window.location.href = '/workouts'
    }
  }

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">New Workout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Title" {...register('title')} />
        <input className="border rounded px-3 py-2 w-full" type="date" defaultValue={new Date().toISOString().slice(0,10)} {...register('date')} />
        <button className="inline-flex items-center rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Create</button>
      </form>
    </main>
  )
}
