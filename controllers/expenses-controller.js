import { validateExpense } from '../schemas/expense-schema.js'

export class ExpensesController {
  constructor ({ expensesModel }) {
    this.expensesModel = expensesModel
  }

  getAll = async (req, res) => {
    const { name, amount, category, date, paymentMethod } = req.query
    try {
      const expenses = await this.expensesModel.getAll({ name, amount, category, date, paymentMethod })
      res.status(200).json(expenses)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  get = async (req, res) => {
    const { id } = req.params
    try {
      const expense = await this.expensesModel.get({ id })
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' })
      }

      return res.status(200).json(expense)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  create = async (req, res) => {
    const result = validateExpense(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error })
    }

    const expense = await this.expensesModel.create({ input: req.body })

    if (!expense) {
      return res.status(444).json({ error: 'Error creating expense' })
    }

    return res.status(201).json(expense)
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validateExpense(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error })
    }

    const expense = await this.expensesModel.update({ id, input: req.body })

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    return res.status(200).json(expense)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const success = await this.expensesModel.delete({ id })

    if (!success) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    return res.status(204).end()
  }
}
