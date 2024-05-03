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

import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const path = usePathname()
  const readonlyParams = useSearchParams()
  const searchParams = new URLSearchParams(readonlyParams)

  const [searchByName, setSearchByName] = useState(
    searchParams.get('name') || '',
  )
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  function handleSearchByName(event: ChangeEvent<HTMLInputElement>) {
    setSearchByName(event.target.value)
  }

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

  useEffect(() => {
    if (searchByName.length > 0) {
      searchParams.set('name', searchByName)
    } else if (searchByName.length === 0) {
      searchParams.delete('name')
    }

    const timeout = setTimeout(() => {
      router.replace(`${path}?${searchParams.toString()}`)
    }, 350)

    return () => clearTimeout(timeout)
  }, [searchByName])

  return (
    <div className="rounded-md">
      <div className="grid grid-cols-3 gap-2 py-4">
        <Input
          placeholder="Filtrar por nome"
          value={searchByName}
          onChange={handleSearchByName}
          className="bg-gray-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-gray-800  focus-visible:ring-purple-400"
        />
        <Select
          value={searchParams.get('category') ?? ''}
          onValueChange={(value) => {
            value === 'all'
              ? searchParams.delete('category')
              : searchParams.set('category', value)

            router.replace(`${path}?${searchParams.toString()}`)
          }}
          defaultValue="all"
        >
          <SelectTrigger className="bg-gray-900 text-white h-12 border-none focus:ring-offset-1 focus:ring-2 focus:ring-offset-gray-800  focus:ring-purple-400">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border-none">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="other">Outros</SelectItem>
            <SelectItem value="entertainment">Entretenimento</SelectItem>
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
              ? searchParams.delete('type')
              : searchParams.set('type', value)

            router.replace(`${path}?${searchParams.toString()}`)
          }}
          defaultValue="all"
        >
          <SelectTrigger className="bg-gray-900 text-white h-12 border-none focus:ring-offset-1 focus:ring-2 focus:ring-offset-gray-800  focus:ring-purple-400">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border-none">
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="unique">Despesa única</SelectItem>
            <SelectItem value="recurring">Despesa recorrente</SelectItem>
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
