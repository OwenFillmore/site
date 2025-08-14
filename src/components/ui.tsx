import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export function Card({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}>{children}</div>
}

export function Button({ className, children, ...props }: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }>) {
  return (
    <button
      className={cn('inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm bg-primary text-primary-foreground hover:opacity-90', className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('border rounded px-3 py-2 bg-background', props.className)} />
}
