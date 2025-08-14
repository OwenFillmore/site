import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Unit } from '@/types'

type SettingsState = {
  unit: Unit
  setUnit: (u: Unit) => void
}

export const useSettings = create<SettingsState>()(persist(
  (set) => ({
    unit: 'kg',
    setUnit: (u) => set({ unit: u }),
  }),
  { name: 'gpt-settings' }
))
