import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Expense } from '@/@types/expense'
import { useFormContext } from 'react-hook-form'

export function ExpenseForm() {
  const form = useFormContext<Expense>()

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                className="bg-gray-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-gray-800  focus-visible:ring-purple-400"
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-gray-900 text-white h-12 border-none focus:ring-offset-1 focus:ring-2 focus:ring-offset-gray-800  focus:ring-purple-400">
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-gray-900 text-white border-none">
                <SelectItem value="other">Outros</SelectItem>
                <SelectItem value="entertainment">Entretenimento</SelectItem>
                <SelectItem value="food">Alimentação</SelectItem>
                <SelectItem value="transport">Transporte</SelectItem>
                <SelectItem value="housing">Moradia</SelectItem>
                <SelectItem value="health">Saúde</SelectItem>
                <SelectItem value="education">Educação</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="value"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                step="any"
                className="bg-gray-900 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-gray-800  focus-visible:ring-purple-400"
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
        name="isUnique"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-white">Tipo de despesa</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === 'true')}
                defaultValue={field.value ? 'true' : 'false'}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem className="border-gray-900" value="true" />
                  </FormControl>
                  <FormLabel className="font-normal text-white">
                    Despesa única
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem className="border-gray-900" value="false" />
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
    </>
  )
}
