/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { ExpenseForm } from '@/components/expense-form'
import {
  ExpenseInput,
  categoryEquivalent,
  expenseSchemaInput,
  validOutputExpenseData,
} from '@/@types/expense'
import { Form } from './ui/form'
import { useForm } from 'react-hook-form'
import { generateExpenseExampleMessage } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import { SelectExpense } from '@/db/schema'
import { editExpense } from '@/actions/edit_expense'

interface Props {
  expense: SelectExpense
}

export function EditExpense({ expense }: Props) {
  const [open, setIsOpen] = useState(false)

  const [expenseExample, setExpenseExample] = useState(() =>
    generateExpenseExampleMessage(),
  )

  useEffect(() => {
    if (!open) return
    setExpenseExample(generateExpenseExampleMessage())
  }, [open])

  const parsedCategory = Object.entries(categoryEquivalent).find(
    ([key, value]) => value === expense.category,
  )![0] as keyof typeof categoryEquivalent

  const form = useForm<ExpenseInput>({
    defaultValues: {
      ...expense,
      category: parsedCategory,
      isUnique: expense.isUnique ? 'true' : 'false',
      date: new Date(expense.date!).toISOString(),
    },
    resolver: zodResolver(expenseSchemaInput),
  })

  const onSubmit = (data: ExpenseInput) => {
    const parsedData = validOutputExpenseData.parse(data)

    editExpense({ ...parsedData, id: expense.id, createdAt: expense.createdAt })
    setIsOpen(false)
    form.reset(
      {},
      {
        keepValues: true,
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>
          <Pencil className="text-purple-400" size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-none">
        <DialogHeader>
          <DialogTitle>Editar despesa</DialogTitle>
          <DialogDescription className="text-white text-sm font-extralight">
            {expenseExample}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 text-gray-800"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ExpenseForm />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
