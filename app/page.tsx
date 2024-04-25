import { Expense } from '@/@types/expense'
import { AddExpense } from '@/components/add-expense'
import { ExpenseResume } from '@/components/expense-resume'
import { columns } from '@/components/expense-table/columns'
import { DataTable } from '@/components/expense-table/data-table'
import { Logo } from '@/components/logo'

export default function Page() {
  const dummyData: Expense[] = [
    {
      name: 'Aluguel',
      category: 'housing',
      amount: 1000,
      date: new Date(),
      type: 'recurring',
    },
    {
      name: 'Netflix',
      category: 'entertainment',
      amount: 39.9,
      date: new Date(),
      type: 'recurring',
    },
    {
      name: 'Uber',
      category: 'transport',
      amount: 25,
      date: new Date(),
      type: 'unique',
    },
  ]

  return (
    <div className="bg-gray-800 min-h-[100dvh] w-full">
      <header className="pt-12 pb-24 bg-gray-900">
        <div className="flex items-center justify-between max-w-[1260px] w-full mx-auto">
          <Logo />
          <AddExpense />
        </div>
      </header>
      <ExpenseResume />
      <main className="max-w-[1260px] mx-auto mt-16">
        <DataTable columns={columns} data={dummyData} />
      </main>
    </div>
  )
}
