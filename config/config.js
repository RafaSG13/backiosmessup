import dotenv from 'dotenv'

// Cargar el archivo .env
dotenv.config()

export const {
  PORT = 3000,
  MONGO_URL,
  ACCESS_SECRET_JWT_KEY,
  REFRESH_SECRET_JWT_KEY
} = process.env

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10
