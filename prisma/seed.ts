import { PrismaClient } from '@prisma/client'
import { addDays, subDays } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
  // Seed exercises
  const exercises = [
    { name: 'Back Squat', category: 'Strength', defaultUnit: 'kg' },
    { name: 'Bench Press', category: 'Strength', defaultUnit: 'kg' },
    { name: 'Deadlift', category: 'Strength', defaultUnit: 'kg' },
    { name: 'Overhead Press', category: 'Strength', defaultUnit: 'kg' },
    { name: 'Barbell Row', category: 'Strength', defaultUnit: 'kg' },
    { name: 'Pull-up', category: 'Bodyweight', defaultUnit: 'kg' },
  ]

  await prisma.exercise.createMany({ data: exercises, skipDuplicates: true })

  const [squat, bench, deadlift] = await Promise.all([
    prisma.exercise.findFirstOrThrow({ where: { name: 'Back Squat' } }),
    prisma.exercise.findFirstOrThrow({ where: { name: 'Bench Press' } }),
    prisma.exercise.findFirstOrThrow({ where: { name: 'Deadlift' } }),
  ])

  // Seed a user (single-user mode)
  const user = await prisma.user.upsert({
    where: { email: 'single@user.local' },
    update: {},
    create: { email: 'single@user.local', name: 'You' },
  })

  // Seed some workouts over last week
  const w1 = await prisma.workout.create({
    data: { date: subDays(new Date(), 6), title: 'Lower A', userId: user.id },
  })
  const w2 = await prisma.workout.create({
    data: { date: subDays(new Date(), 3), title: 'Upper A', userId: user.id },
  })
  const w3 = await prisma.workout.create({
    data: { date: subDays(new Date(), 1), title: 'Lower B', userId: user.id },
  })

  await prisma.set.createMany({
    data: [
      { workoutId: w1.id, exerciseId: squat.id, reps: 5, weight: 100 },
      { workoutId: w1.id, exerciseId: squat.id, reps: 5, weight: 105 },
      { workoutId: w1.id, exerciseId: deadlift.id, reps: 5, weight: 140 },
      { workoutId: w2.id, exerciseId: bench.id, reps: 5, weight: 80 },
      { workoutId: w2.id, exerciseId: bench.id, reps: 5, weight: 82.5 },
      { workoutId: w3.id, exerciseId: squat.id, reps: 3, weight: 110 },
      { workoutId: w3.id, exerciseId: deadlift.id, reps: 3, weight: 160 },
    ],
  })

  await prisma.bodyLog.createMany({
    data: [
      { date: subDays(new Date(), 6), bodyWeight: 80 },
      { date: subDays(new Date(), 3), bodyWeight: 79.5 },
      { date: subDays(new Date(), 1), bodyWeight: 79.7 },
      { date: new Date(), bodyWeight: 79.4 },
    ],
  })

  await prisma.goal.createMany({
    data: [
      { type: '1RM', targetNumber: 180, unit: 'kg' },
      { type: 'BodyWeight', targetNumber: 78, unit: 'kg' },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
