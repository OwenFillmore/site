export type CsvRow = Record<string, string>

export function parseCsv(text: string): CsvRow[] {
  const [headerLine, ...lines] = text.trim().split(/\r?\n/)
  const headers = headerLine.split(',').map((h) => h.trim())
  return lines.map((line) => {
    const cols = line.split(',')
    const row: CsvRow = {}
    headers.forEach((h, i) => (row[h] = (cols[i] ?? '').trim()))
    return row
  })
}

export function toCsv(rows: CsvRow[]): string {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const lines = [headers.join(',')]
  for (const row of rows) {
    lines.push(headers.map((h) => (row[h] ?? '').toString()).join(','))
  }
  return lines.join('\n')
}
