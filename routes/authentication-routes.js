import { Router } from 'express'
import { AuthenticationController } from '../controllers/authentication-controller.js'
import { AuthModel } from '../models/local/auth-model.js'

export const createAuthenticationRouter = () => {
  const router = Router()
  const authenticationController = new AuthenticationController({ authModel: AuthModel })

  router.post('/login', authenticationController.login)
  router.post('/register', authenticationController.register)

  return router
}
