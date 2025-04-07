import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js'

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).send({ error: 'No token provided' })

  jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
    if (err) return res.status(403).send({ error: 'Invalid or expired token' })
    req.user = user
    next()
  })
}
