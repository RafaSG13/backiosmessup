import { jsonImport, writeJson } from '../../utils/json-utils.js'
import crypto from 'crypto'

const deposits = jsonImport('../json/deposits.json')

export class DepositModel {
  async getAll ({ concept, amount, date, foundingSource }) {
    return deposits.filter(deposit => {
      if (concept && deposit.concept !== concept) return false
      if (amount && deposit.amount !== amount) return false
      if (date && new Date(deposit.date).getTime() !== new Date(date).getTime()) return false
      if (foundingSource && deposit.foundingSource !== foundingSource) return false
      return true
    })
  }

  async get ({ id }) {
    return deposits.find(deposit => deposit.id === id)
  }

  async create ({ input }) {
    const id = crypto.randomUUID()
    const newDeposit = { id, ...input }
    deposits.push(newDeposit)
    await writeJson('../json/deposits.json', deposits)
    return newDeposit
  }

  async update ({ id, input }) {
    const index = deposits.findIndex(deposit => deposit.id === id)
    if (index === -1) return null

    const updatedDeposit = { ...deposits[index], ...input }
    deposits[index] = updatedDeposit
    await writeJson('../json/deposits.json', deposits)
    return updatedDeposit
  }

  async delete ({ id }) {
    const index = deposits.findIndex(deposit => deposit.id === id)
    if (index === -1) return false

    deposits.splice(index, 1)
    await writeJson('../json/deposits.json', deposits)
    return true
  }
}
