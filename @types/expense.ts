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
  name: z.string(),
  category: z.enum([
    'other',
    'entertainment',
    'food',
    'transport',
    'housing',
    'health',
    'education',
  ]),
  amount: z.coerce.number().min(1),
  date: z.date(),
  type: z.enum(['unique', 'recurring']),
})

export type Expense = z.infer<typeof expenseSchema>
