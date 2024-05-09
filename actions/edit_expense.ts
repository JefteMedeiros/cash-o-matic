'use server'

import { expenseSchema } from '@/@types/expense'
import { auth } from '@/auth'
import { db } from '@/db/db'
import { SelectExpense, expenses } from '@/db/schemas/expenses'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function editExpense(prevState: any, formData: SelectExpense) {
  const session = await auth()

  if (!session) {
    return {
      message: 'User not authenticated.',
    }
  }

  const validFormData = expenseSchema.safeParse(formData)

  if (!validFormData.success) {
    return {
      message: 'Invalid form data.',
    }
  }

  await db
    .update(expenses)
    .set(formData)
    .where(
      and(eq(expenses.id, formData.id), eq(expenses.userId, session.user.id)),
    )

  revalidatePath('/')

  return {
    message: 'Expense editted successfully.',
  }
}
