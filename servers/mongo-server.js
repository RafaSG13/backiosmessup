import { app } from '../app.js'
import { ExpenseModel } from '../models/mongo/expense-model.js'
import { AuthModel } from '../models/mongo/auth-model.js'

const expensesModel = new ExpenseModel()
const authModel = new AuthModel()
app({ expensesModel, authModel })
