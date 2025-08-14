import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, Button, Input } from '@/components/ui'

describe('ui components', () => {
  it('renders Card children', () => {
    render(<Card>hello</Card>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })
  it('renders Button', () => {
    render(<Button>click</Button>)
    expect(screen.getByText('click')).toBeInTheDocument()
  })
  it('renders Input', () => {
    render(<Input placeholder="name" />)
    expect(screen.getByPlaceholderText('name')).toBeInTheDocument()
  })
})
