import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const SetSchema = z.object({
  workoutId: z.string(),
  exerciseId: z.string(),
  reps: z.number().int().min(1),
  weight: z.number().min(0),
  rpe: z.number().min(1).max(10).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const data = SetSchema.parse(json)
    const created = await prisma.set.create({ data })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}
