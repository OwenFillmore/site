export default function Loading() {
  return (
    <div className="p-6 max-w-6xl mx-auto animate-pulse">
      <div className="h-8 w-40 bg-muted rounded mb-4" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-64 rounded bg-muted" />
        <div className="h-64 rounded bg-muted" />
      </div>
    </div>
  )
}
