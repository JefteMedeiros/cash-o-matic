'use server'

import { eq } from 'drizzle-orm'
import { db } from '../db/db'
import { revalidatePath } from 'next/cache'
import { expenses } from '@/db/schemas/expenses'
import { auth } from '@/auth'
export async function deleteExpense(id: string) {
  const session = await auth()

  if (!session) {
    return {
      message: 'User not authenticated.',
    }
  }

  await db.delete(expenses).where(eq(expenses.id, id))

  revalidatePath('/')

  return {
    message: 'Expense deleted successfully.',
  }
}
