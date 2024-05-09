'use server'

import { and, eq } from 'drizzle-orm'
import { db } from '../db/db'
import { revalidatePath } from 'next/cache'
import { expenses } from '@/db/schemas/expenses'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
export async function deleteExpense(id: string) {
  const session = await auth()

  if (!session) {
    return redirect('/signin')
  }

  await db
    .delete(expenses)
    .where(and(eq(expenses.id, id), eq(expenses.userId, session.user.id)))

  revalidatePath('/')

  return {
    message: 'Expense deleted successfully.',
  }
}
