'use server'

import { eq } from 'drizzle-orm'
import { db } from '../db/db'
import { expenses } from '../db/schema'
import { revalidatePath } from 'next/cache'
export async function deleteExpense(id: string) {
  const expenseResults = await db.delete(expenses).where(eq(expenses.id, id))

  revalidatePath('/')

  console.log(expenseResults)

  return {
    message: 'Expense deleted successfully.',
  }
}
