'use server'

import { db } from '../db/db'
import { SelectExpense, expenses } from '../db/schema'
export async function getExpenses(): Promise<SelectExpense[]> {
  try {
    const expenseResults = await db.select().from(expenses)

    return expenseResults
  } catch (e: any) {
    console.log(e)
  }

  return []
}
