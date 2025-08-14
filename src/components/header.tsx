'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function Header() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 't') setTheme(theme === 'dark' ? 'light' : 'dark')
      if (e.key === '/') {
        const el = document.querySelector<HTMLInputElement>('input[type="search"]')
        el?.focus()
        e.preventDefault()
      }
      if (e.key.toLowerCase() === 'n') {
        window.location.href = '/workouts/new'
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [theme, setTheme])

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/">Dashboard</Link>
          <Link href="/workouts">Workouts</Link>
          <Link href="/exercises">Exercises</Link>
          <Link href="/stats">Stats</Link>
          <Link href="/body">Body</Link>
          <Link href="/settings">Settings</Link>
          <Link href="/docs">Docs</Link>
        </nav>
        <button className="text-sm underline" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Toggle theme
        </button>
      </div>
    </header>
  )
}
