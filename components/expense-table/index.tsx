import { DataTable } from './data-table'
import { columns } from './columns'
import { getExpenses } from '@/actions/get_expenses'

interface Props {
  queryParams: string
}

export async function ExpenseTable({ queryParams }: Props) {
  const totalExpenses = await getExpenses(queryParams)

  return <DataTable columns={columns} data={totalExpenses} />
}
