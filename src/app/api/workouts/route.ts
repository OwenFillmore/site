import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const WorkoutSchema = z.object({
  date: z.string().transform((s) => new Date(s)),
  title: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET() {
  const items = await prisma.workout.findMany({ orderBy: { date: 'desc' }, include: { sets: true } })
  return NextResponse.json({ success: true, data: items })
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const data = WorkoutSchema.parse(json)
    const created = await prisma.workout.create({ data })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}
