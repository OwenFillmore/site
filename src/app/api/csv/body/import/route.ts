import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseCsv } from '@/lib/csv'

export async function POST(req: NextRequest) {
  const text = await req.text()
  const rows = parseCsv(text)
  for (const row of rows) {
    await prisma.bodyLog.create({
      data: {
        date: new Date(row.date),
        bodyWeight: Number(row.bodyWeight || 0),
        bodyFat: row.bodyFat ? Number(row.bodyFat) : undefined,
      },
    })
  }
  return NextResponse.json({ success: true, count: rows.length })
}
