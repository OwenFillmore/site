import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const PatchSchema = z.object({
  bodyWeight: z.number().optional(),
  bodyFat: z.number().optional(),
  chest: z.number().optional(),
  waist: z.number().optional(),
  hips: z.number().optional(),
  thigh: z.number().optional(),
  arm: z.number().optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const json = await req.json()
    const data = PatchSchema.parse(json)
    const updated = await prisma.bodyLog.update({ where: { id: params.id }, data })
    return NextResponse.json({ success: true, data: updated })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.bodyLog.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
