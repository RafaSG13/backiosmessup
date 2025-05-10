import { validateDeposit, validatePartialDeposit } from '../schemas/deposit-schema.js'
import { ValidationError, NotFoundError, handleError, AppError } from '../utils/error-utils.js'

export class DepositsController {
  constructor ({ depositsModel }) {
    this.depositsModel = depositsModel
  }

  getAll = async (req, res) => {
    const { concept, amount, date, foundingSource } = req.query
    try {
      const deposits = await this.depositsModel.getAll({ concept, amount, date, foundingSource })
      res.status(200).json(deposits)
    } catch (error) {
      handleError(new ValidationError('Failed to fetch deposits'), res)
    }
  }

  get = async (req, res) => {
    const { id } = req.params
    try {
      const deposit = await this.depositsModel.get({ id })
      if (!deposit) {
        throw new NotFoundError('Deposit not found')
      }
      res.status(200).json(deposit)
    } catch (error) {
      handleError(error instanceof AppError ? error : new ValidationError('Failed to fetch deposit'), res)
    }
  }

  create = async (req, res) => {
    const result = validateDeposit(req.body)

    if (!result.success) {
      return handleError(new ValidationError('Invalid deposit data'), res)
    }

    try {
      const deposit = await this.depositsModel.create({ input: req.body })
      res.status(201).json(deposit)
    } catch (error) {
      handleError(error instanceof AppError ? error : new ValidationError('Failed to create deposit'), res)
    }
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validatePartialDeposit(req.body)

    if (!result.success) {
      return handleError(new ValidationError('Invalid deposit data'), res)
    }

    try {
      const deposit = await this.depositsModel.update({ id, input: req.body })
      if (!deposit) {
        throw new NotFoundError('Deposit not found')
      }
      res.status(200).json(deposit)
    } catch (error) {
      handleError(error instanceof AppError ? error : new ValidationError('Failed to update deposit'), res)
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    try {
      const success = await this.depositsModel.delete({ id })
      if (!success) {
        throw new NotFoundError('Deposit not found')
      }
      res.status(204).end()
    } catch (error) {
      handleError(error instanceof AppError ? error : new ValidationError('Failed to delete deposit'), res)
    }
  }
}
