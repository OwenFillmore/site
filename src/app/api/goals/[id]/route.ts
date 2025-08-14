import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const PatchSchema = z.object({
  type: z.string().optional(),
  targetNumber: z.number().optional(),
  unit: z.string().optional(),
  deadline: z.string().transform((s) => new Date(s)).optional(),
  status: z.string().optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const json = await req.json()
    const data = PatchSchema.parse(json)
    const updated = await prisma.goal.update({ where: { id: params.id }, data })
    return NextResponse.json({ success: true, data: updated })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.goal.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
