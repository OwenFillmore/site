import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function GET() {
  const items = await prisma.bodyLog.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json({ success: true, data: items })
}

const BodyLogSchema = z.object({
  date: z.string().transform((s) => new Date(s)),
  bodyWeight: z.number(),
  bodyFat: z.number().optional(),
  chest: z.number().optional(),
  waist: z.number().optional(),
  hips: z.number().optional(),
  thigh: z.number().optional(),
  arm: z.number().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const data = BodyLogSchema.parse(json)
    const created = await prisma.bodyLog.create({ data })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}
