import * as z from 'zod'

export const categoryEquivalent = {
  other: 'Outros',
  entertainment: 'Entretenimento',
  food: 'Alimentação',
  transport: 'Transporte',
  housing: 'Moradia',
  health: 'Saúde',
  education: 'Educação',
}

export const typeEquivalent = {
  true: true,
  false: false,
}

export const expenseSchema = z.object({
  name: z.string().min(1, { message: 'Este campo é obrigatório.' }),
  category: z.enum([
    'other',
    'entertainment',
    'food',
    'transport',
    'housing',
    'health',
    'education',
  ]),
  value: z.coerce.number().min(1, { message: 'Este campo é obrigatório.' }),
  date: z.string(),
  isUnique: z.boolean(),
})

export type Expense = z.infer<typeof expenseSchema>
