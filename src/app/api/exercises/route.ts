import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const ExerciseSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  defaultUnit: z.enum(['kg', 'lb']).default('kg'),
  notes: z.string().optional(),
})

export async function GET() {
  const items = await prisma.exercise.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json({ success: true, data: items })
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const data = ExerciseSchema.parse(json)
    const created = await prisma.exercise.create({ data })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}
