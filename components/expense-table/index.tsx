'use client'

import { useExpenseStore } from '@/store/expense-store'
import { DataTable } from './data-table'
import { columns } from './columns'

export function ExpenseTable() {
  const { totalExpenses } = useExpenseStore()

  return (
    <main className="max-w-[1260px] mx-auto mt-16">
      <DataTable columns={columns} data={totalExpenses} />
    </main>
  )
}
