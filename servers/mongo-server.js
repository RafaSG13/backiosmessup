import { app } from '../app.js'
import { ExpenseModel } from '../models/mongo/expense-model.js'
import { AuthModel } from '../models/mongo/auth-model.js'
import { DepositModel } from '../models/mongo/deposit-model.js'

const expensesModel = new ExpenseModel()
const authModel = new AuthModel()
const depositsModel = new DepositModel()
app({ expensesModel, authModel, depositsModel })
