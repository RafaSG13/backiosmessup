import { Router } from 'express'
import { AuthenticationController } from '../controllers/authentication-controller.js'

export const createAuthenticationRouter = ({ authModel }) => {
  const router = Router()
  const authenticationController = new AuthenticationController({ authModel })

  router.post('/login', authenticationController.login)
  router.post('/register', authenticationController.register)
  router.post('/refresh', authenticationController.refreshToken)

  return router
}
