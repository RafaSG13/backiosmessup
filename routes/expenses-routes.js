import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.js'
import { ExpensesController } from '../controllers/expenses-controller.js'

export const createExpensesRouter = ({ expensesModel }) => {
  const router = Router()
  const expensesController = new ExpensesController({ expensesModel })

  router.get('/', authenticateToken, expensesController.getAll)
  router.get('/:id', authenticateToken, expensesController.get)
  router.post('/', authenticateToken, expensesController.create)
  router.patch('/:id', authenticateToken, expensesController.update)

  return router
}
