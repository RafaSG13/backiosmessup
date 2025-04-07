import { app } from '../app.js'
import { ExpenseModel } from '../models/local/expense-model.js'

const expensesModel = new ExpenseModel()
app({ expensesModel })
