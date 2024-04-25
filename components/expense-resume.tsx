'use client'

import { moneyFormatter } from '@/lib/utils'
import { PlannedExpenses } from './planned-expenses'
import { useLocalStorage } from '@uidotdev/usehooks'

export function ExpenseResume() {
  const [plannedExpenseValue, setPlannedExpenseValue] = useLocalStorage(
    'plannedExpenseValue',
    0,
  )

  const handlePlannedExpenses = (value: number) => {
    setPlannedExpenseValue(value)
  }

  return (
    <nav className="grid grid-cols-2 gap-8 max-w-[1260px] -my-12 mx-auto">
      <div className="flex flex-col items-start justify-center gap-4 bg-gray-700 rounded-md h-36 p-6">
        <span className="text-white">Total planejado</span>
        <div className="flex items-center gap-2">
          <p className="font-bold text-3xl text-white">
            {moneyFormatter(plannedExpenseValue)}
          </p>
          <PlannedExpenses
            handlePlannedExpenses={handlePlannedExpenses}
            plannedExpenses={plannedExpenseValue}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-4 bg-gray-700 rounded-md h-36 p-6">
        <span className="text-white">Total gasto</span>
        <p className="font-bold text-3xl text-white">{moneyFormatter(12345)}</p>
      </div>
    </nav>
  )
}
