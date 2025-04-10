import mongoose from 'mongoose'
import { MONGO_URL } from '../../config/config.js'

await mongoose.connect(MONGO_URL + 'expensesDB')

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: mongoose.Schema.Types.Double, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  paymentMethod: { type: String, required: true }
})

const Expense = mongoose.model('Expense', expenseSchema)

export class ExpenseModel {
  getAll = async ({ name, amount, category, date, paymentMethod }) => {
    const query = {}
    if (name) query.name = name
    if (amount) query.amount = amount
    if (category) query.category = category
    if (date) query.date = new Date(date)
    if (paymentMethod) query.paymentMethod = paymentMethod

    return await Expense.find(query)
  }

  get = async ({ id }) => {
    return await Expense.findById(id)
  }

  create = async ({ input }) => {
    const newExpense = new Expense(input)
    return await newExpense.save()
  }

  update = async ({ id, input }) => {
    return await Expense.findByIdAndUpdate(id, input, { new: true })
  }

  delete = async ({ id }) => {
    return await Expense.findByIdAndDelete(id)
  }
}
