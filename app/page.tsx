'use client'

import { Expense } from '@/@types/expense'
import { AddExpense } from '@/components/add-expense'
import { ExpenseResume } from '@/components/expense-resume'
import { columns } from '@/components/expense-table/columns'
import { DataTable } from '@/components/expense-table/data-table'
import { Logo } from '@/components/logo'
import { useLocalStorage } from '@uidotdev/usehooks'

export default function Page() {
  const [totalExpenses, setTotalExpenses] = useLocalStorage<Expense[]>(
    'totalExpenses',
    [],
  )

  const handleAddExpense = (expense: Expense) => {
    setTotalExpenses([...totalExpenses, expense])
  }

  return (
    <div className="bg-gray-800 min-h-[100dvh] w-full">
      <header className="pt-12 pb-24 bg-gray-900">
        <div className="flex items-center justify-between max-w-[1260px] w-full mx-auto">
          <Logo />
          <AddExpense handleAddExpense={handleAddExpense} />
        </div>
      </header>
      <ExpenseResume />
      <main className="max-w-[1260px] mx-auto mt-16">
        <DataTable columns={columns} data={totalExpenses} />
      </main>
    </div>
  )
}
