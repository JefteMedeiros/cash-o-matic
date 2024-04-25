'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  })

  return (
    <div className="rounded-md">
      <div className="grid grid-cols-3 gap-2 py-4">
        <Input
          placeholder="Filtrar por nome"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="bg-gray-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-gray-800  focus-visible:ring-purple-400"
        />
        <Select
          value={
            (table.getColumn('category')?.getFilterValue() as string) ?? ''
          }
          onValueChange={(value) => {
            value === 'all'
              ? table.getColumn('category')?.setFilterValue('')
              : table.getColumn('category')?.setFilterValue(value)
          }}
          defaultValue="all"
        >
          <SelectTrigger className="bg-gray-900 text-white h-12 border-none focus:ring-offset-1 focus:ring-2 focus:ring-offset-gray-800  focus:ring-purple-400">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border-none">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="other">Outros</SelectItem>
            <SelectItem value="entertainment">Entretenimeno</SelectItem>
            <SelectItem value="food">Alimentação</SelectItem>
            <SelectItem value="transport">Transporte</SelectItem>
            <SelectItem value="housing">Moradia</SelectItem>
            <SelectItem value="health">Saúde</SelectItem>
            <SelectItem value="education">Educação</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={(table.getColumn('type')?.getFilterValue() as string) ?? ''}
          onValueChange={(value) => {
            value === 'all'
              ? table.getColumn('type')?.setFilterValue('')
              : table.getColumn('type')?.setFilterValue(value)
          }}
          defaultValue="all"
        >
          <SelectTrigger className="bg-gray-900 text-white h-12 border-none focus:ring-offset-1 focus:ring-2 focus:ring-offset-gray-800  focus:ring-purple-400">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border-none">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="unique">Única</SelectItem>
            <SelectItem value="recurring">Recorrente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table className="text-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-white first:rounded-tl-[5px] last:rounded-tr-[5px]"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const isLastRow =
                    rowIndex === table.getRowModel().rows.length - 1
                  let cellClasses = ''
                  if (isLastRow) {
                    if (
                      cellIndex === 0 ||
                      cellIndex === row.getVisibleCells().length - 1
                    ) {
                      cellClasses =
                        'first:rounded-bl-[5px] last:rounded-br-[5px]'
                    }
                  }
                  return (
                    <TableCell key={cell.id} className={cellClasses}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-gray-700">
              <TableCell
                colSpan={columns.length}
                className="h-20 text-center rounded-bl-[5px] rounded-br-[5px]"
              >
                Nenhuma despesa encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
