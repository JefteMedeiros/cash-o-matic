import { DataTable } from './data-table'
import { columns } from './columns'
import { getExpense } from '@/actions/get_expense'

interface Props {
  queryParams: string
}

export async function ExpenseTable({ queryParams }: Props) {
  const totalExpenses = await getExpense(queryParams)

  return <DataTable columns={columns} data={totalExpenses} />
}
