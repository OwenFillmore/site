import { describe, it, expect } from 'vitest'
import { e1RM_Epley, e1RM_Brzycki, kgToLb, lbToKg } from '@/lib/utils'

describe('utils', () => {
  it('converts units', () => {
    expect(Math.round(kgToLb(100))).toBe(220)
    expect(Math.round(lbToKg(220))).toBe(100)
  })
  it('e1RM formulas', () => {
    expect(Math.round(e1RM_Epley(100, 5))).toBe(117)
    expect(Math.round(e1RM_Brzycki(100, 5))).toBe(114)
  })
})
