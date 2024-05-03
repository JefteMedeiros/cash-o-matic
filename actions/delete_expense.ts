'use server'

import { eq } from 'drizzle-orm'
import { db } from '../db/db'
import { expenses } from '../db/schema'
import { revalidatePath } from 'next/cache'
export async function deleteExpense(id: string) {
  await db.delete(expenses).where(eq(expenses.id, id))

  revalidatePath('/')

  return {
    message: 'Expense deleted successfully.',
  }
}
