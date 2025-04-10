import jwt from 'jsonwebtoken'
import { ACCESS_SECRET_JWT_KEY } from '../config/config.js'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send({ error: 'No token provided' })

  const token = authHeader.split(':')[1]
  if (!token) return res.status(401).send({ error: 'No token provided' })

  jwt.verify(token, ACCESS_SECRET_JWT_KEY, (err, info) => {
    if (err) return res.status(403).send({ error: 'Invalid token' })
    if (info.timeStamp + 24 * 60 * 60 * 1000 < Date.now()) return res.status(401).send({ error: 'Token expired' }) // FIXME: no se si esto es correcto
    req.info = info
    next()
  })
}
