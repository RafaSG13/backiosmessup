import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { PORT } from './config/config.js'
import { createExpensesRouter } from './routes/expenses-routes.js'
import { createAuthenticationRouter } from './routes/authentication-routes.js'
import { consoleMiddleware } from './middlewares/console.js'

export const app = ({ expensesModel, authModel }) => {
  const app = express()
  const expensesRouter = createExpensesRouter({ expensesModel })
  const authRouter = createAuthenticationRouter({ authModel })

  app.disable('x-powered-by')

  app.use(corsMiddleware())
  app.use(express.json())
  app.use(consoleMiddleware)

  app.use('/expenses', expensesRouter)
  app.use('/auth', authRouter)

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
