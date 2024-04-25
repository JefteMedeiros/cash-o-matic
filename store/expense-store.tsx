'use client'

import { Expense } from '@/@types/expense'
import { useLocalStorage } from 'usehooks-ts'
import { ReactNode, createContext, useContext } from 'react'

interface ExpenseStore {
  totalExpenses: Expense[]
  handleAddExpense: (expense: Expense) => void
  handleEditExpense: (expense: Expense) => void
  handleDeleteExpense: (id: string) => void
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

  const handleEditExpense = (expense: Expense) => {
    const updatedExpenses = totalExpenses.map((oldExpense) =>
      oldExpense.id === expense.id ? expense : oldExpense,
    )

    setTotalExpenses(updatedExpenses)
  }

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = totalExpenses.filter((expense) => expense.id !== id)

    setTotalExpenses(updatedExpenses)
  }

  return (
    <expenseStore.Provider
      value={{
        totalExpenses,
        handleAddExpense,
        handleEditExpense,
        handleDeleteExpense,
      }}
    >
      {children}
    </expenseStore.Provider>
  )
}

export function useExpenseStore() {
  const {
    totalExpenses,
    handleAddExpense,
    handleEditExpense,
    handleDeleteExpense,
  } = useContext(expenseStore)

  return {
    totalExpenses,
    handleAddExpense,
    handleEditExpense,
    handleDeleteExpense,
  }
}
