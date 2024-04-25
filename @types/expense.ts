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
  unique: 'Única',
  recurring: 'Recorrente',
}

export const expenseSchema = z.object({
  id: z.string(),
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
  amount: z.coerce.number().min(1, { message: 'Este campo é obrigatório.' }),
  date: z.date(),
  type: z.enum(['unique', 'recurring']),
})

export type Expense = z.infer<typeof expenseSchema>
