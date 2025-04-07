import { Router } from 'express'
import { ExpensesController } from '../controllers/expenses-controller.js'

export const createExpensesRouter = ({ expensesModel }) => {
  const router = Router()
  const expensesController = new ExpensesController({ expensesModel })

  router.get('/', expensesController.getAll)
  router.get('/:id', expensesController.get)
  router.post('/', expensesController.create)
  router.patch('/:id', expensesController.update)

  return router
}
