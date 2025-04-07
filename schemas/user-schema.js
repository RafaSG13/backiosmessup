import zod from 'zod'

const userSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
  name: zod.string(),
  userImage: zod.string().url().optional()
})

function validateUser (object) {
  return userSchema.safeParse(object)
}

export { validateUser }
