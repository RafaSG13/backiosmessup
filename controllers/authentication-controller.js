import { validateLoginAuthInput, validateRegisterAuthInput } from '../schemas/auth-schemas.js'
export class AuthenticationController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  login = async (req, res) => {
    const result = validateLoginAuthInput(req.body)
    if (result.error) {
      return res.status(400).json({ error: 'Request malformed' })
    }

    try {
      const loginResult = await this.authModel.login({ ...result.data })
      return res.send(loginResult)
    } catch (error) {
      return res.status(500).json({ error: 'Couldnt perform login action. Login failed' })
    }
  }

  register = async (req, res) => {
    const result = validateRegisterAuthInput(req.body)

    if (result.error) {
      return res.status(400).json({ error: 'Request malformed' })
    }
    try {
      const registerResult = await this.authModel.register({ ...result.data })
      return res.status(201).send(registerResult)
    } catch (error) {
      return res.status(500).json({ error: error.message })
      // return res.status(500).json({ error: 'Couldnt perform register action. Register failed' })
    }
  }

  refreshToken = async (req, res) => {
    const token = req.headers.authorization
    if (!token) return res.status(400).json({ error: 'No existing token' })

    try {
      const accessToken = await this.authModel.refresh({ input: { token } })
      return res.send({ accessToken })
    } catch (error) {
      return res.status(500).json({ error: 'Couldnt perform refresh action. Refresh failed' })
    }
  }
}
