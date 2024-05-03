'use server'

import { db } from '@/db/db'
import { SelectExpense, expenses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function editExpense(formData: SelectExpense) {
  await db.update(expenses).set(formData).where(eq(expenses.id, formData.id))

  revalidatePath('/')

  return {
    message: 'Expense editted successfully.',
  }
}
