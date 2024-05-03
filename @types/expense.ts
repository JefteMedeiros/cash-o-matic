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

export const expenseSchemaOutput = z.object({
  name: z.string().min(1, { message: 'Este campo é obrigatório.' }),
  category: z
    .enum([
      'other',
      'entertainment',
      'food',
      'transport',
      'housing',
      'health',
      'education',
    ])
    .transform((value) => categoryEquivalent[value]),
  value: z.coerce.number().min(1, { message: 'Este campo é obrigatório.' }),
  date: z.string(),
  isUnique: z.enum(['true', 'false']).transform((e) => typeEquivalent[e]),
})

export const expenseSchemaInput = z.object({
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
  isUnique: z.enum(['true', 'false']),
})

export const validOutputExpenseData =
  expenseSchemaInput.pipe(expenseSchemaOutput)

export type ExpenseInput = z.infer<typeof expenseSchemaInput>
export type ExpenseOutput = z.infer<typeof expenseSchemaOutput>
