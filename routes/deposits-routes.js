import { Router } from 'express'
import { DepositsController } from '../controllers/deposits-controller.js'

export const createDepositsRouter = ({ depositsModel }) => {
  const router = Router()
  const depositsController = new DepositsController({ depositsModel })

  router.get('/', depositsController.getAll)
  router.get('/:id', depositsController.get)
  router.post('/', depositsController.create)
  router.patch('/:id', depositsController.update)
  router.delete('/:id', depositsController.delete)

  return router
}
