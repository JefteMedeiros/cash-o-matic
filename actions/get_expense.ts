import { and, eq, like } from 'drizzle-orm'
import { db } from '../db/db'
import { expenses } from '@/db/schemas/expenses'
import { auth } from '@/auth'

export async function getExpense(queryParams: string) {
  const session = await auth()

  if (!session) {
    return {
      message: 'User not authenticated.',
    }
  }

  const mutableParams = new URLSearchParams(queryParams)

  const name = mutableParams.get('name')
  const category = mutableParams.get('category')
  const isUnique = mutableParams.get('type') === 'unique'

  const expenseResults = db.select().from(expenses)

  const dynamicExpenses = expenseResults.$dynamic()

  const results = await dynamicExpenses.where(
    and(
      name && name.length > 0 ? like(expenses.name, `%${name}%`) : undefined,
      category && category.length > 0
        ? eq(expenses.category, category)
        : undefined,
      isUnique ? eq(expenses.isUnique, true) : undefined,
    ),
  )

  return results
}
