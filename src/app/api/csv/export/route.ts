import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { toCsv } from '@/lib/csv'

export async function GET() {
  const workouts = await prisma.workout.findMany({ include: { sets: true } })
  const rows = workouts.flatMap((w) =>
    w.sets.map((s) => ({
      date: w.date.toISOString().slice(0, 10),
      title: w.title ?? '',
      exerciseId: s.exerciseId,
      reps: String(s.reps),
      weight: String(s.weight),
      rpe: s.rpe ? String(s.rpe) : '',
    }))
  )
  const csv = toCsv(rows)
  return new NextResponse(csv, {
    headers: { 'content-type': 'text/csv', 'content-disposition': 'attachment; filename="workouts.csv"' },
  })
}
