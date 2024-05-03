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
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { ExpenseForm } from '@/components/expense-form'
import { ExpenseInput, expenseSchemaInput } from '@/@types/expense'
import { Form } from './ui/form'
import { useForm } from 'react-hook-form'
import { generateExpenseExampleMessage } from '@/lib/utils'
import { addExpense } from '@/actions/add_expense'

export function AddExpense() {
  const [open, setIsOpen] = useState(false)

  const [expenseExample, setExpenseExample] = useState(() =>
    generateExpenseExampleMessage(),
  )

  useEffect(() => {
    if (!open) return
    setExpenseExample(generateExpenseExampleMessage())
  }, [open])

  const form = useForm<ExpenseInput>({
    defaultValues: {
      name: '',
      category: 'other',
      value: 0,
      date: new Date().toISOString(),
      isUnique: 'false',
    },
    resolver: zodResolver(expenseSchemaInput),
  })

  const onSubmit = (data: ExpenseInput) => {
    addExpense(data)
    setIsOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar despesa</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-none">
        <DialogHeader>
          <DialogTitle>Adicionar despesa</DialogTitle>
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
