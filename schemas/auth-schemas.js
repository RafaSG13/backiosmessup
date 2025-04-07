import zod from 'zod'

const registerUserInputSchema = zod.object({
  email: zod.string().email(),
  name: zod.string().max(256).min(1),
  password: zod.string().min(8).max(256).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
  userImage: zod.string().url().optional().nullable()
})

const loginUserInputSchema = zod.object({
  email: zod.string().email(),
  password: zod.string()
  // password: zod.string().min(8).max(256).regex(/[0-9]/).regex(/[^A-Za-z0-9]/)
})

function validateRegisterAuthInput (object) {
  return registerUserInputSchema.safeParse(object)
}

function validateLoginAuthInput (object) {
  return loginUserInputSchema.safeParse(object)
}

export { validateRegisterAuthInput, validateLoginAuthInput }
