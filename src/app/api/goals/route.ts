import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const GoalSchema = z.object({
  type: z.enum(['1RM', 'BodyWeight', 'Streak']).or(z.string()),
  targetNumber: z.number(),
  unit: z.string().optional(),
  deadline: z.string().transform((s) => new Date(s)).optional(),
  status: z.string().optional(),
})

export async function GET() {
  const items = await prisma.goal.findMany({ orderBy: { deadline: 'asc' } })
  return NextResponse.json({ success: true, data: items })
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const data = GoalSchema.parse(json)
    const created = await prisma.goal.create({ data })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}
