import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

const expenseSchema = z.object({
  name: z.string(),
  category: z.string(),
  amount: z.coerce.number().min(1),
  isPaid: z.boolean(),
  date: z.date(),
})

type Schema = z.infer<typeof expenseSchema>

export function AddExpenseForm() {
  const form = useForm<Schema>({
    defaultValues: {
      name: '',
      category: '',
      amount: 0,
      isPaid: false,
      date: new Date(),
    },
    resolver: zodResolver(expenseSchema),
  })

  const onSubmit = (data: Schema) => console.log(data)

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 text-zinc-800"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-zinc-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-zinc-800  focus-visible:ring-purple-400"
                  placeholder="Nome"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-zinc-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-zinc-800  focus-visible:ring-purple-400"
                  placeholder="Categoria"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  step="any"
                  className="bg-zinc-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-zinc-800  focus-visible:ring-purple-400"
                  type="number"
                  placeholder="Valor"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full h-12" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  )
}
