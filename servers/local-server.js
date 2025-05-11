import { app } from '../app.js'
import { ExpenseModel } from '../models/local/expense-model.js'
import { AuthModel } from '../models/local/auth-model.js'
import { DepositModel } from '../models/local/deposit-model.js'

const expensesModel = new ExpenseModel()
const authModel = new AuthModel()
const depositsModel = new DepositModel()
app({ expensesModel, authModel, depositsModel })
