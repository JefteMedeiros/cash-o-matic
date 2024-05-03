import { DataTable } from './data-table'
import { columns } from './columns'
import { getExpenses } from '@/actions/get_expenses'

export async function ExpenseTable() {
  const totalExpenses = await getExpenses()

  return (
    <main className="max-w-[1260px] mx-auto mt-16">
      <DataTable columns={columns} data={totalExpenses} />
    </main>
  )
}
