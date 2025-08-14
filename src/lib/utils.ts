export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

export const kgToLb = (kg: number) => kg * 2.20462
export const lbToKg = (lb: number) => lb / 2.20462

export function e1RM_Epley(weight: number, reps: number) {
  return weight * (1 + reps / 30)
}

export function e1RM_Brzycki(weight: number, reps: number) {
  return (weight * 36) / (37 - reps)
}
