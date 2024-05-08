/* eslint-disable react-hooks/exhaustive-deps */
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

import { TableFilters } from './table-filters'

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
      <TableFilters />
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
