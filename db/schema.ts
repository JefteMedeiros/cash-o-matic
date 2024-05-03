import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core'

export const expenses = sqliteTable('expenses', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  value: real('value').notNull(),
  category: text('category').notNull(),
  isUnique: integer('is_unique', { mode: 'boolean' }).notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export type InsertExpense = typeof expenses.$inferInsert
export type SelectExpense = typeof expenses.$inferSelect
