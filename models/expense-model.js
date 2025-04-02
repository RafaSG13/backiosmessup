import { jsonImport } from '../utils/json-utils.js'

const expenses = jsonImport('../utils/expenses.json')

export class ExpenseModel {
  static async getAll ({ name, amount, category, date, paymentMethod }) {
    const filteredExpenses = expenses.filter(expense => {
      if (name && !expense.name.includes(name)) return false
      if (amount && expense.amount !== amount) return false
      if (category && !expense.category.includes(category)) return false
      if (date && expense.date !== date) return false
      if (paymentMethod && !expense.paymentMethod.includes(paymentMethod)) return false
      return true
    })
    return filteredExpenses
  }
}
