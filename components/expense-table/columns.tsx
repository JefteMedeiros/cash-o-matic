'use client'

import { Expense, categoryEquivalent, typeEquivalent } from '@/@types/expense'
import { moneyFormatter } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { EditExpense } from '../edit-expense'

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
      return <div>{moneyFormatter(row.original.amount)}</div>
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
      return <div>{new Date(row.original.date).toDateString()}</div>
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
          {typeEquivalent[row.original.type]}
          <div className="flex flex-col gap-4 items-center">
            <EditExpense expense={row.original} />
          </div>
        </div>
      )
    },
  },
]
