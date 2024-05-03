'use server'

import { db } from '../db/db'
import { SelectExpense, expenses } from '../db/schema'
export async function getExpenses(): Promise<SelectExpense[]> {
  const expenseResults = await db.select().from(expenses)

  return expenseResults
}
