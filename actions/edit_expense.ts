'use server'

import { expenseSchema } from '@/@types/expense'
import { db } from '@/db/db'
import { SelectExpense, expenses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function editExpense(prevState: any, formData: SelectExpense) {
  const validFormData = expenseSchema.safeParse(formData)

  if (!validFormData.success) {
    return {
      message: 'Invalid form data.',
    }
  }

  await db.update(expenses).set(formData).where(eq(expenses.id, formData.id))

  revalidatePath('/')

  return {
    message: 'Expense editted successfully.',
  }
}
