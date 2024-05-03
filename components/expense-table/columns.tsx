'use client'

import { moneyFormatter } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { EditExpense } from '../edit-expense'
import { DeleteExpense } from '../delete-expense'
import { SelectExpense } from '@/db/schema'

export const columns: ColumnDef<SelectExpense>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => {
      return <div>{row.original.category}</div>
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:underline"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      return <div>{moneyFormatter(row.original.value)}</div>
    },
  },
  {
    accessorKey: 'data',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:underline"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data de criação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      return <div>{new Date(row.original.date as string).toDateString()}</div>
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:underline"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between">
          {row.original.isUnique ? 'Única' : 'Recorrente'}
          <div className="flex gap-4 items-center">
            <EditExpense expense={row.original} />
            <DeleteExpense id={row.original.id} />
          </div>
        </div>
      )
    },
  },
]
