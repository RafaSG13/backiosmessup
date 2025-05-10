import { app } from '../app.js'
import { ExpenseModel } from '../models/local/expense-model.js'
import { AuthModel } from '../models/local/auth-model.js'

const expensesModel = new ExpenseModel()
const authModel = new AuthModel()
app({ expensesModel, authModel })
