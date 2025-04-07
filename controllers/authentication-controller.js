import { validateLoginAuthInput, validateRegisterAuthInput } from '../schemas/auth-schemas.js'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js'

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
      const user = await this.authModel.login({ ...result.data })
      const accessToken = jwt.sign({ user }, SECRET_JWT_KEY, { expiresIn: '1d' })
      const refreshToken = jwt.sign({ user }, SECRET_JWT_KEY, { expiresIn: '7d' })
      return res.send({ accessToken, refreshToken })
    } catch (error) {
      return res.status(500).json({ error: 'Couldnt perfomr login action. Login failed' })
    }
  }

  register = async (req, res) => {
    const result = validateRegisterAuthInput(req.body)

    if (result.error) {
      return res.status(400).json({ error: 'Request malformed' })
    }

    const user = await this.authModel.register({ ...result.data })

    if (!user) {
      return res.status(444).json({ error: 'Error registering user' })
    }

    const accessToken = jwt.sign({ user }, SECRET_JWT_KEY, { expiresIn: '1d' })
    const refreshToken = jwt.sign({ user }, SECRET_JWT_KEY, { expiresIn: '7d' })
    return res.status(201).send({ accessToken, refreshToken })
  }
}
