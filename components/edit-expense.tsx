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
import { Expense, expenseSchema } from '@/@types/expense'
import { Form } from './ui/form'
import { useForm } from 'react-hook-form'
import { useExpenseStore } from '@/store/expense-store'
import { generateExpenseExampleMessage } from '@/lib/utils'
import { Pencil } from 'lucide-react'

interface Props {
  expense: Expense
}

export function EditExpense({ expense }: Props) {
  const { handleEditExpense } = useExpenseStore()

  const [open, setIsOpen] = useState(false)

  const [expenseExample, setExpenseExample] = useState(() =>
    generateExpenseExampleMessage(),
  )

  // Troca a mensagem a cada vez que o modal é aberto

  useEffect(() => {
    if (!open) return
    setExpenseExample(generateExpenseExampleMessage())
  }, [open])

  const form = useForm<Expense>({
    defaultValues: { ...expense, date: new Date(expense.date) },
    resolver: zodResolver(expenseSchema),
  })

  const onSubmit = (data: Expense) => {
    handleEditExpense(data)
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
