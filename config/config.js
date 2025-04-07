import dotenv from 'dotenv'

// Cargar el archivo .env
dotenv.config()

export const {
  PORT = 3000,
  SALT_ROUNDS,
  MONGO_URL,
  SECRET_JWT_KEY
} = process.env
