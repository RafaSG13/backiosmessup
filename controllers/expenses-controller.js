import { ExpenseModel } from '../models/expense-model.js'
import { validateExpense } from '../schemas/expense-schema.js'

export class ExpensesController {
  static async getAll (req, res) {
    const { name, amount, category, date, paymentMethod } = req.query
    try {
      const expenses = await ExpenseModel.getAll({ name, amount, category, date, paymentMethod })
      res.status(200).json(expenses)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async get (req, res) {
    const { id } = req.params
    try {
      const expense = await ExpenseModel.get({ id })
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' })
      }

      return res.status(200).json(expense)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async create (req, res) {
    const result = validateExpense(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error })
    }

    const expense = await ExpenseModel.create({ input: req.body })

    if (!expense) {
      return res.status(444).json({ error: 'Error creating expense' })
    }

    return res.status(201).json(expense)
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validateExpense(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error })
    }

    const expense = await ExpenseModel.update({ id, input: req.body })

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    return res.status(200).json(expense)
  }

  static async delete (req, res) {
    const { id } = req.params
    const success = await ExpenseModel.delete({ id })

    if (!success) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    return res.status(204).end()
  }
}
