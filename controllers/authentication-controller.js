import { validateLoginAuthInput, validateRegisterAuthInput } from '../schemas/auth-schemas.js'
import { ValidationError, UnauthorizedError, handleError } from '../utils/error-utils.js'

export class AuthenticationController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  login = async (req, res) => {
    const result = validateLoginAuthInput(req.body)
    if (result.error) {
      return handleError(new ValidationError('Request malformed'), res)
    }

    try {
      const loginResult = await this.authModel.login({ ...result.data })
      return res.send(loginResult)
    } catch (error) {
      handleError(new UnauthorizedError('Login Failed'), res)
    }
  }

  register = async (req, res) => {
    const result = validateRegisterAuthInput(req.body)

    if (result.error) {
      return handleError(new ValidationError('Request malformed'), res)
    }
    try {
      const registerResult = await this.authModel.register({ ...result.data })
      return res.status(201).send(registerResult)
    } catch (error) {
      console.log('error', error)
      handleError(error instanceof ValidationError ? error : new ValidationError('Register failed'), res)
    }
  }

  refreshToken = async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return handleError(new ValidationError('No existing token'), res)
    }

    try {
      const accessToken = await this.authModel.refresh(refreshToken)
      return res.send({ accessToken })
    } catch (error) {
      handleError(error instanceof UnauthorizedError ? error : new UnauthorizedError('Refresh failed'), res)
    }
  }
}
