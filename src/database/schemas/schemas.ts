import { orderPaidEnum } from '@/orders/types/orderPaid.enum';
import { orderTypeEnum } from '@/orders/types/orderType.enum';
import { relations } from 'drizzle-orm';
import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { numeric } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { integer, pgTable, primaryKey, serial, text, varchar } from 'drizzle-orm/pg-core';

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  imageUrl: text('imageUrl').notNull(),
  hexColor: varchar('hexColor', { length: 20 }).notNull()
})

export const mainSkills = pgTable('mainSkills', {
  id: serial('id')
    .primaryKey(),
  skillId: integer('skill_id')
    .unique()
    .references(() => skills.id, {
      onDelete: 'cascade'
    }),
  whatSolves: varchar('whatSolves', { length: 100 })
    .notNull()
})

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 50 }).notNull(),
  shortDescription: varchar('shortDescription', { length: 100 }).notNull(),
  description: text('description').notNull(),
  context: varchar('context', { length: 20 }).notNull(),
  thumbnailUrl: text('thumbnailUrl').notNull(),
  showcaseImagesUrl: text('showcaseImagesUrl').array().default([]),
  githubRepositoryUrl: text('githubRepositoryUrl'),
  productionUrl: text('productionUrl'),
  orderPriority: integer('orderPriority').default(0)
})

export const orderType = pgEnum('order_type', orderTypeEnum)

export const orderPaid = pgEnum('order_paid', orderPaidEnum)

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  client_name: varchar('client_name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
  price: numeric('price', {
    precision: 10,
    scale: 2
  }).notNull(),
  type: orderType('type').notNull(),
  paid: orderPaid('paid').default(orderPaidEnum.Unpaid),
  createdAt: timestamp('created_at', {
    withTimezone: true
  })
  .defaultNow(),
  updatedAt: timestamp('updated_at', { 
    withTimezone: true 
  })
  .defaultNow()
  .$onUpdate(() => new Date())
})

export const projectTechnologies = pgTable('project_technologies', {
  skillId: integer('skill_id')
    .notNull()
    .references(() => skills.id),
  projectId: integer('project_id')
    .notNull()
    .references(() => projects.id, {
      onDelete: 'cascade'
    }),
  orderPriority: integer('orderPriority').default(0)
}, (table) => ({
  pk: primaryKey({ columns: [table.projectId, table.skillId] }),
}))

export const projectsRelations = relations(projects, ({ many }) => ({
  projects: many(projectTechnologies)
}))

export const skillsRelations = relations(skills, ({ many }) => ({
  technologies: many(projectTechnologies)
}))

export const projectTechonologiesRelations = relations(projectTechnologies, ({ one }) => ({
  projects: one(projects, { fields: [projectTechnologies.projectId], references: [projects.id] }),
  skills: one(skills, { fields: [projectTechnologies.skillId], references: [skills.id] })
}))

export const mainSkillsRelations = relations(mainSkills, ({ one }) => ({
  skills: one(skills, {
    fields: [mainSkills.skillId],
    references: [skills.id]
  })
}))