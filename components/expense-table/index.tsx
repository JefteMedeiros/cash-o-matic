import { DataTable } from './data-table'
import { columns } from './columns'
import { getExpenses } from '@/actions/get_expenses'

export async function ExpenseTable() {
  const totalExpenses = await getExpenses()

  return <DataTable columns={columns} data={totalExpenses} />
}
