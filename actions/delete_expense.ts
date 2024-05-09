'use server'

import { and, eq } from 'drizzle-orm'
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

  await db
    .delete(expenses)
    .where(and(eq(expenses.id, id), eq(expenses.userId, session.user.id)))

  revalidatePath('/')

  return {
    message: 'Expense deleted successfully.',
  }
}
