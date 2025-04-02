import cors from 'cors'
const allowedOrigins = ['http://localhost:3000', 'https://myapp.com']

export const corsMiddleware = ({ acceptedOrigins = allowedOrigins } = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || acceptedOrigins.includes(origin)
    ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})
