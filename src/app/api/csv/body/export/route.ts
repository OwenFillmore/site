import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { toCsv } from '@/lib/csv'

export async function GET() {
  const items = await prisma.bodyLog.findMany({ orderBy: { date: 'asc' } })
  const rows = items.map((b) => ({
    date: b.date.toISOString().slice(0, 10),
    bodyWeight: String(b.bodyWeight),
    bodyFat: b.bodyFat ? String(b.bodyFat) : '',
  }))
  const csv = toCsv(rows)
  return new NextResponse(csv, {
    headers: { 'content-type': 'text/csv', 'content-disposition': 'attachment; filename="body.csv"' },
  })
}
