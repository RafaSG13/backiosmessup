import mongoose from 'mongoose'

const depositSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  concept: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  foundingSource: { type: String, required: true }
})

const Deposit = mongoose.model('Deposit', depositSchema)

export class DepositModel {
  async getAll ({ concept, amount, date, foundingSource }) {
    const query = {}
    if (concept) query.concept = concept
    if (amount) query.amount = amount
    if (date) query.date = new Date(date)
    if (foundingSource) query.foundingSource = foundingSource

    return await Deposit.find(query)
  }

  async get ({ id }) {
    return await Deposit.findOne({ id })
  }

  async create ({ input }) {
    const newDeposit = new Deposit(input)
    return await newDeposit.save()
  }

  async update ({ id, input }) {
    return await Deposit.findOneAndUpdate({ id }, input, { new: true })
  }

  async delete ({ id }) {
    return await Deposit.findOneAndDelete({ id })
  }
}
