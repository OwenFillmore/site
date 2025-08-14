'use client'

import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts'

const sampleVolume = [
  { date: 'Mon', volume: 5000 },
  { date: 'Tue', volume: 6200 },
  { date: 'Wed', volume: 3000 },
  { date: 'Thu', volume: 7500 },
  { date: 'Fri', volume: 4000 },
]

export default function StatsPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Stats</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded border p-4">
          <div className="font-medium mb-2">Volume over time</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleVolume}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="volume" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded border p-4">
          <div className="font-medium mb-2">e1RM trend</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleVolume.map((d) => ({ date: d.date, e1rm: Math.round(d.volume / 100) }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="e1rm" stroke="#82ca9d" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  )
}
