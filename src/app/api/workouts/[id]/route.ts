import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const w = await prisma.workout.findUnique({ where: { id: params.id }, include: { sets: true } })
  if (!w) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, data: w })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.workout.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
