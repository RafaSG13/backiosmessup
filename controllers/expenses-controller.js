import { ExpenseModel } from '../models/expense-model.js'

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
}
