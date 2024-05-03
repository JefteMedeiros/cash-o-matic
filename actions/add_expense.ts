'use server'

import { Expense, expenseSchema } from '@/@types/expense'
import { db } from '@/db/db'
import { expenses } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export async function addExpense(formData: Expense) {
  const validFormData = expenseSchema.safeParse(formData)

  if (!validFormData.success) {
    return {
      message: 'Invalid form data.',
    }
  }

  const data = { ...validFormData.data, id: crypto.randomUUID() }

  await db.insert(expenses).values(data)

  revalidatePath('/')

  return {
    message: 'Expense added successfully.',
  }
}
