import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseCsv } from '@/lib/csv'

export async function POST(req: NextRequest) {
  const text = await req.text()
  const rows = parseCsv(text)
  // Minimal importer: create workouts with sets for known exerciseId
  for (const row of rows) {
    const date = new Date(row.date)
    const workout = await prisma.workout.create({ data: { date, title: row.title || undefined } })
    await prisma.set.create({
      data: {
        workoutId: workout.id,
        exerciseId: row.exerciseId,
        reps: Number(row.reps || 0),
        weight: Number(row.weight || 0),
        rpe: row.rpe ? Number(row.rpe) : undefined,
      },
    })
  }
  return NextResponse.json({ success: true, count: rows.length })
}
