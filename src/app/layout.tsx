import '@/styles/globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/header'

export const metadata = {
  title: 'Gym Progress Tracker',
  description: 'Track workouts, visualize progress, and manage goals',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
