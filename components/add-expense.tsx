'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { AddExpenseForm } from './add-expense-form'

export function AddExpense() {
  const [open, setIsOpen] = useState(false)

  const [expenseExample, setExpenseExample] = useState(() =>
    generateExpenseExampleMessage(),
  )

  // Troca a mensagem a cada vez que o modal é aberto

  useEffect(() => {
    if (!open) return
    setExpenseExample(generateExpenseExampleMessage())
  }, [open])

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
        <AddExpenseForm />
      </DialogContent>
    </Dialog>
  )
}

const expenseExamples = [
  'Ex: Escola do meu filho',
  'Ex: Compras do mês',
  'Ex: Conta de luz',
  'Ex: Conta de água',
  'Ex: Conta de internet',
  'Ex: Conta de telefone',
  'Ex: Conta de celular',
  'Ex: Conta de cartão de crédito',
  'Ex: Conta de cartão de débito',
  'Ex: Conta de supermercado',
  'Ex: Conta de farmácia',
  'Ex: Conta de combustível',
  'Ex: Conta de gás',
]

const generateExpenseExampleMessage = () => {
  const randomMessage = Math.random() * expenseExamples.length
  return expenseExamples[Math.floor(randomMessage)]
}
