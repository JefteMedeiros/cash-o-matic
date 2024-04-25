'use client'

import { Expense, categoryEquivalent, typeEquivalent } from '@/@types/expense'
import { moneyFormatter } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => {
      return <div>{categoryEquivalent[row.original.category]}</div>
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row }) => {
      return <div>{moneyFormatter(row.original.amount)}</div>
    },
  },
  {
    accessorKey: 'data',
    header: 'Data de criação',
    cell: ({ row }) => {
      return <div>{new Date(row.original.date).toDateString()}</div>
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      return <div>{typeEquivalent[row.original.type]}</div>
    },
  },
]
