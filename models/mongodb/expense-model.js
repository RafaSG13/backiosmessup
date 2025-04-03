import mongoose from 'mongoose'

// Conexión a MongoDB
await mongoose.connect('mongodb+srv://terrarafael23:xApwe7-huxsor-roxgah@mucluster0.w3e5r.mongodb.net/expensesDB')

// Definición del esquema de Mongoose
const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: mongoose.Schema.Types.Double, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  paymentMethod: { type: String, required: true }
})

// Creación del modelo de Mongoose
const Expense = mongoose.model('Expense', expenseSchema)

export class ExpenseModel {
  // Obtener todos los gastos con filtros opcionales
  static async getAll ({ name, amount, category, date, paymentMethod }) {
    const query = {}
    if (name) query.name = name
    if (amount) query.amount = amount
    if (category) query.category = category
    if (date) query.date = new Date(date)
    if (paymentMethod) query.paymentMethod = paymentMethod

    return await Expense.find(query)
  }

  // Obtener un gasto por ID
  static async get ({ id }) {
    return await Expense.findById(id)
  }

  // Crear un nuevo gasto
  static async create ({ input }) {
    const newExpense = new Expense(input)
    return await newExpense.save()
  }

  // Actualizar un gasto por ID
  static async update ({ id, input }) {
    return await Expense.findByIdAndUpdate(id, input, { new: true })
  }

  // Eliminar un gasto por ID
  static async delete ({ id }) {
    return await Expense.findByIdAndDelete(id)
  }
}
