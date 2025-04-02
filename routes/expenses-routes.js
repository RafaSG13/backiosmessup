import { Router } from 'express'
import { ExpensesController } from '../controllers/expenses-controller.js'

const expensesRouter = Router()

expensesRouter.get('/', ExpensesController.getAll)

export { expensesRouter }
