'use client'
import { useSettings, type SettingsState } from '@/stores/settings'
import { useRef, type ChangeEvent } from 'react'

export default function SettingsPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="rounded border p-4 space-y-3">
        <div className="space-y-1">
          <div className="font-medium">Units</div>
          <UnitSelect />
        </div>
        <div className="space-y-2">
          <div className="font-medium">Data</div>
          <div className="flex gap-2">
            <a className="underline" href="/api/csv/export">Export Workouts CSV</a>
            <a className="underline" href="/api/csv/body/export">Export Body CSV</a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CsvImport label="Import Workouts CSV" action="/api/csv/import" />
            <CsvImport label="Import Body CSV" action="/api/csv/body/import" />
          </div>
        </div>
      </div>
    </main>
  )
}

function CsvImport({ label, action }: { label: string; action: string }) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <>
      <button className="underline" onClick={() => ref.current?.click()}>{label}</button>
      <input
        ref={ref}
        type="file"
        accept="text/csv"
        className="hidden"
        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0]
          if (!file) return
          const text = await file.text()
          await fetch(action, { method: 'POST', body: text })
          alert('Import complete')
        }}
      />
    </>
  )
}

function UnitSelect() {
  const unit = useSettings((s: SettingsState) => s.unit)
  const setUnit = useSettings((s: SettingsState) => s.setUnit)
  return (
    <select
      className="border rounded px-2 py-1"
      value={unit}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => setUnit(e.target.value as 'kg' | 'lb')}
    >
      <option value="kg">Kilograms</option>
      <option value="lb">Pounds</option>
    </select>
  )
}
