import { AddExpense } from '@/components/add-expense'
import { ExpenseResume } from '@/components/expense-resume'
import { ExpenseTable } from '@/components/expense-table'
import { Logo } from '@/components/logo'
import { ExpenseProvider } from '@/store/expense-store'

export default function Page() {
  return (
    <div className="bg-gray-800 min-h-[100dvh] w-full">
      <ExpenseProvider>
        <header className="pt-12 pb-24 bg-gray-900">
          <div className="flex items-center justify-between max-w-[1260px] w-full mx-auto">
            <Logo />
            <AddExpense />
          </div>
        </header>
        <ExpenseResume />
        <ExpenseTable />
      </ExpenseProvider>
    </div>
  )
}
