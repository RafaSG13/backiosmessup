import { jsonImport } from '../utils/json-utils.js'
import crypto from 'crypto'

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

  static async get ({ id }) {
    return expenses.find(expense => expense.id === id)
  }

  static async create ({ input }) {
    const id = crypto.randomUUID()
    if (expenses.find(expense => expense.id === id)) {
      return null
    }

    const newExpense = { id, ...input }
    expenses.push(newExpense)
    return newExpense
  }

  static async update ({ id, input }) {
    const index = expenses.findIndex(expense => expense.id === id)
    if (index === -1) {
      return null
    }

    const updatedExpense = { ...expenses[index], ...input }
    expenses[index] = updatedExpense
    return updatedExpense
  }

  static async delete ({ id }) {
    const index = expenses.findIndex(expense => expense.id === id)
    if (index === -1) {
      return false
    }
    expenses.splice(index, 1)
    return true
  }
}
