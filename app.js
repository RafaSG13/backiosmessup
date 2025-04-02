import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { expensesRouter } from './routes/expenses-routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')

app.use(corsMiddleware())
app.use(express.json())

app.use('/expenses', expensesRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
