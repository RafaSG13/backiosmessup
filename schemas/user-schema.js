import zod from 'zod'

const userSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
  name: zod.string()
})

function validateUser (object) {
  return userSchema.safeParse(object)
}

export { validateUser }
