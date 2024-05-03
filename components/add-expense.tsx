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
import { Category, Expense, expenseSchema } from '@/@types/expense'
import { Form } from './ui/form'
import { useForm } from 'react-hook-form'
import { generateExpenseExampleMessage } from '@/lib/utils'
import { addExpense } from '@/actions/add_expense'
import { Menu } from 'lucide-react'

export function AddExpense() {
  const [open, setIsOpen] = useState(false)

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
      isUnique: false,
    },
    resolver: zodResolver(expenseSchema),
  })

  const onSubmit = (data: Expense) => {
    addExpense(data)
    setIsOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="p-0 h-fit bg-transparent hover:bg-transparent md:hover:bg-purple-400 md:bg-purple-500 md:px-4 md:py-2 md:h-10">
          <span className="hidden md:block">Adicionar despesa</span>
          <Menu className="block md:hidden text-purple-500" size={32} />
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
