import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const expenseSchema = z.object({
  name: z.string(),
  category: z.string(),
  amount: z.coerce.number().min(1),
  date: z.date(),
  type: z.enum(['unique', 'recurring']),
})

type Schema = z.infer<typeof expenseSchema>

export function AddExpenseForm() {
  const form = useForm<Schema>({
    defaultValues: {
      name: '',
      category: '',
      amount: 0,
      date: new Date(),
      type: 'unique',
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-white">Tipo de despesa</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-zinc-900"
                        value="unique"
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-white">
                      Despesa única
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        className="border-zinc-900"
                        value="mentions"
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-white">
                      Despesa recorrente
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
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
