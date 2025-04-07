import jwt from 'jsonwebtoken'
import { ACCESS_SECRET_JWT_KEY, REFRESH_SECRET_JWT_KEY } from '../config/config.js'

function generateAccessToken (info) {
  return jwt.sign(info, ACCESS_SECRET_JWT_KEY, { expiresIn: '15m' })
}

function generateRefreshToken (info) {
  return jwt.sign(info, REFRESH_SECRET_JWT_KEY, { expiresIn: '7d' })
}

function validateRefreshToken (token) {
  return jwt.verify(token, REFRESH_SECRET_JWT_KEY)
}

export { generateAccessToken, generateRefreshToken, validateRefreshToken }
