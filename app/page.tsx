import { AddExpense } from '@/components/add-expense'
import { ExpenseResume } from '@/components/expense-resume'
import { Logo } from '@/components/logo'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Page({ children }: Props) {
  return (
    <main className="bg-gray-800 min-h-[100dvh] w-full">
      <header className="pt-12 pb-24 bg-gray-900">
        <div className="flex items-center justify-between max-w-[1260px] w-full mx-auto">
          <Logo />
          <AddExpense />
        </div>
      </header>
      <ExpenseResume />
      <div>{children}</div>
    </main>
  )
}
