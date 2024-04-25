'use client'

import { Expense } from '@/@types/expense'
import { useLocalStorage } from 'usehooks-ts'
import { ReactNode, createContext, useContext } from 'react'

interface ExpenseStore {
  totalExpenses: Expense[]
  handleAddExpense: (expense: Expense) => void
}

const expenseStore = createContext({} as ExpenseStore)

interface Props {
  children: ReactNode
}

export function ExpenseProvider({ children }: Props) {
  const [totalExpenses, setTotalExpenses] = useLocalStorage<Expense[]>(
    'totalExpenses',
    [],
    { initializeWithValue: false },
  )

  const handleAddExpense = (expense: Expense) => {
    setTotalExpenses([...totalExpenses, expense])
  }

  return (
    <expenseStore.Provider value={{ totalExpenses, handleAddExpense }}>
      {children}
    </expenseStore.Provider>
  )
}

export function useExpenseStore() {
  const { totalExpenses, handleAddExpense } = useContext(expenseStore)

  return { totalExpenses, handleAddExpense }
}
