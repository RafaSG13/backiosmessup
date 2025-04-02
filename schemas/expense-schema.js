import zod from 'zod'

const expenseSchema = zod.object({
  id: zod.string(),
  name: zod.string(),
  amount: zod.number().min(0),
  date: zod.string().isdate().format('yyyy-MM-dd'),
  paymentMethod: zod.enum(['Cash', 'Credit Card', 'Debit Card', 'Paypal', 'Other']),
  category: zod.enum(['Entertainment', 'Travel', 'Food', 'Transportation', 'Health and Wellness', 'Home', 'Technology and Communications', 'Fashion and Beauty', 'Education and Learning', 'Family and Pets', 'Finance and Insurance', 'Taxes and Obligations', 'Donations and Charity', 'Miscellaneous'])
})

function validateExpense (object) {
  return expenseSchema.safeParse(object)
}

function validatePartialExpense (object) {
  return expenseSchema.partial().safeParse(object)
}

export { validateExpense, validatePartialExpense }
