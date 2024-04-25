import { AddExpense } from '@/components/add-expense'
import { Logo } from '@/components/logo'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Page({ children }: Props) {
  return (
    <main className="bg-zinc-900 min-h-[100dvh] w-full">
      <header className="flex items-center justify-between mx-auto py-12 max-w-[1260px] w-full">
        <Logo />
        <AddExpense />
      </header>
      <div>{children}</div>
    </main>
  )
}
