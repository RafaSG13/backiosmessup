import { validateExpense } from '../schemas/expense-schema.js'
import { ValidationError, NotFoundError, handleError, AppError } from '../utils/error-utils.js'

export class ExpensesController {
  constructor ({ expensesModel }) {
    this.expensesModel = expensesModel
  }

  getAll = async (req, res) => {
    const { name, amount, category, date, paymentMethod } = req.query
    const userId = req.info.userId
    try {
      const expenses = await this.expensesModel.getAll({ name, amount, category, date, paymentMethod, userId })
      res.status(200).json(expenses)
    } catch (error) {
      handleError(new ValidationError('Failed to fetch expenses'), res)
    }
  }

  get = async (req, res) => {
    const { id } = req.params
    try {
      const expense = await this.expensesModel.get({ id })
      if (!expense) {
        throw new NotFoundError('Expense not found')
      }
      res.status(200).json(expense)
    } catch (error) {
      handleError(error instanceof AppError ? error : new ValidationError('Failed to fetch expense'), res)
    }
  }

  create = async (req, res) => {
    const result = validateExpense(req.body)

    if (result.error) {
      return handleError(new ValidationError('Invalid expense data'), res)
    }

    try {
      const expense = await this.expensesModel.create({ input: req.body })
      if (!expense) {
        throw new ValidationError('Error creating expense')
      }
      res.status(201).json(expense)
    } catch (error) {
      handleError(error instanceof AppError ? error : new ValidationError('Failed to create expense'), res)
    }
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validateExpense(req.body)

    if (result.error) {
      return handleError(new ValidationError('Invalid expense data'), res)
    }

    try {
      const expense = await this.expensesModel.update({ id, input: req.body })
      if (!expense) {
        throw new NotFoundError('Expense not found')
      }
      res.status(200).json(expense)
    } catch (error) {
      handleError(error instanceof AppError ? error : new ValidationError('Failed to update expense'), res)
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    try {
      const success = await this.expensesModel.delete({ id })
      if (!success) {
        throw new NotFoundError('Expense not found')
      }
      res.status(204).end()
    } catch (error) {
      handleError(error instanceof AppError ? error : new ValidationError('Failed to delete expense'), res)
    }
  }
}
