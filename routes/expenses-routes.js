import { Router } from 'express'
import { ExpensesController } from '../controllers/expenses-controller.js'

const expensesRouter = Router()

expensesRouter.get('/', ExpensesController.getAll)
expensesRouter.get('/:id', ExpensesController.get)

expensesRouter.post('/', ExpensesController.create)
expensesRouter.patch('/:id', ExpensesController.update)

export { expensesRouter }
