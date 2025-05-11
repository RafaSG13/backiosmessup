import zod from 'zod'

const depositSchema = zod.object({
  id: zod.string().uuid(),
  concept: zod.string().min(1),
  amount: zod.number().min(0),
  date: zod.string().pipe(zod.coerce.date()),
  foundingSource: zod.string().min(1)
})

function validateDeposit (object) {
  return depositSchema.safeParse(object)
}

function validatePartialDeposit (object) {
  return depositSchema.partial().safeParse(object)
}

export { validateDeposit, validatePartialDeposit }
