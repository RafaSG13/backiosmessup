import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { PORT } from './config/config.js'
import { createExpensesRouter } from './routes/expenses-routes.js'
import { createAuthenticationRouter } from './routes/authentication-routes.js'
import { createDepositsRouter } from './routes/deposits-routes.js'
import { consoleMiddleware } from './middlewares/console.js'

export const app = ({ expensesModel, authModel, depositsModel }) => {
  const app = express()
  const expensesRouter = createExpensesRouter({ expensesModel })
  const authRouter = createAuthenticationRouter({ authModel })
  const depositsRouter = createDepositsRouter({ depositsModel })

  app.disable('x-powered-by')

  app.use(corsMiddleware())
  app.use(express.json())
  app.use(consoleMiddleware)

  app.use('/expenses', expensesRouter)
  app.use('/auth', authRouter)
  app.use('/deposits', depositsRouter)

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
