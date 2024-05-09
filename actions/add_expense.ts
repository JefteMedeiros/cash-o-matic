'use server'

import { Expense, expenseSchema } from '@/@types/expense'
import { auth } from '@/auth'
import { db } from '@/db/db'
import { expenses } from '@/db/schemas/expenses'
import { revalidatePath } from 'next/cache'

export async function addExpense(prevState: any, formData: Expense) {
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

  const data = {
    ...validFormData.data,
    id: crypto.randomUUID(),
    userId: session.user.id,
  }

  console.log(data)

  await db.insert(expenses).values(data)

  revalidatePath('/')

  return {
    message: 'Expense added successfully.',
  }
}
