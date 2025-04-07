import { app } from '../app.js'
import { ExpenseModel } from '../models/mongodb/expense-model.js'

const expensesModel = new ExpenseModel()
app({ expensesModel })
