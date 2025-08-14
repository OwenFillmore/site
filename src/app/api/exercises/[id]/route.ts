import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const PatchSchema = z.object({
  name: z.string().min(2).optional(),
  category: z.string().min(2).optional(),
  defaultUnit: z.enum(['kg', 'lb']).optional(),
  notes: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const item = await prisma.exercise.findUnique({ where: { id: params.id } })
  if (!item) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, data: item })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const json = await req.json()
    const data = PatchSchema.parse(json)
    const updated = await prisma.exercise.update({ where: { id: params.id }, data })
    return NextResponse.json({ success: true, data: updated })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.exercise.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
