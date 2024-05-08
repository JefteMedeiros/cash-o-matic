/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState, useTransition } from 'react'
import { ExpenseForm } from '@/components/expense-form'
import { Category, Expense, expenseSchema } from '@/@types/expense'
import { Form } from './ui/form'
import { useForm } from 'react-hook-form'
import { generateExpenseExampleMessage } from '@/lib/utils'
import { addExpense } from '@/actions/add_expense'
import { useFormState } from 'react-dom'
import { SubmitButton } from './submit-button'

const initialState = {
  message: '',
}

export function AddExpense() {
  const [state, formAction] = useFormState(addExpense, initialState)

  const [open, setIsOpen] = useState(false)

  const [isPending, startTransition] = useTransition()

  const [expenseExample, setExpenseExample] = useState(() =>
    generateExpenseExampleMessage(),
  )

  useEffect(() => {
    if (!open) return
    setExpenseExample(generateExpenseExampleMessage())
  }, [open])

  const form = useForm<Expense>({
    defaultValues: {
      name: '',
      category: '' as Category,
      date: new Date().toISOString(),
      isUnique: true,
    },
    resolver: zodResolver(expenseSchema),
  })

  const onSubmit = (data: Expense) => {
    startTransition(async () => {
      formAction(data)
    })
  }

  useEffect(() => {
    if (state.message === 'Expense added successfully.') {
      setIsOpen(false)
      form.reset()
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-purple-400 bg-purple-500 px-4 py-2 h-12 w-1/4">
          <span className="truncate">Adicionar despesa</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 max-w-[90%] xl:max-w-lg text-white border-none">
        <DialogHeader className="items-start">
          <DialogTitle>Adicionar despesa</DialogTitle>
          <DialogDescription className="text-white text-sm font-extralight">
            {expenseExample}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add_expense"
            className="flex flex-col gap-4 text-gray-800"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ExpenseForm />
            <SubmitButton isPending={isPending} text="Adicionar" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
