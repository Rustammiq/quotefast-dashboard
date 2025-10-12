import { 
  integer, 
  pgTable, 
  varchar, 
  text, 
  uuid, 
  timestamp, 
  boolean, 
  jsonb,
  decimal,
  pgEnum
} from 'drizzle-orm/pg-core';

// Enums
export const invoiceStatusEnum = pgEnum('invoice_status', ['draft', 'sent', 'paid', 'overdue', 'cancelled']);
export const offerStatusEnum = pgEnum('offer_status', ['draft', 'sent', 'accepted', 'rejected', 'expired']);
export const projectStatusEnum = pgEnum('project_status', ['planning', 'in_progress', 'completed', 'on_hold', 'cancelled']);

// Profiles table (extends auth.users)
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().references(() => authUsers.id, { onDelete: 'cascade' }),
  email: text('email').notNull().unique(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  companyName: text('company_name'),
  phone: text('phone'),
  website: text('website'),
  address: text('address'),
  city: text('city'),
  postalCode: text('postal_code'),
  country: text('country').default('NL'),
  vatNumber: text('vat_number'),
  bankAccount: text('bank_account'),
  bic: text('bic'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Customers table
export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  address: text('address'),
  city: text('city'),
  postalCode: text('postal_code'),
  country: text('country').default('NL'),
  vatNumber: text('vat_number'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Projects table
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  customerId: uuid('customer_id').references(() => customers.id),
  status: projectStatusEnum('status').default('planning'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Invoices table
export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceNumber: text('invoice_number').notNull().unique(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  projectId: uuid('project_id').references(() => projects.id),
  title: text('title').notNull(),
  description: text('description'),
  items: jsonb('items').$type<Array<{
    description: string;
    quantity: number;
    price: number;
    total: number;
  }>>(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  vatRate: decimal('vat_rate', { precision: 5, scale: 2 }).default('21.00'),
  vatAmount: decimal('vat_amount', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: invoiceStatusEnum('status').default('draft'),
  dueDate: timestamp('due_date'),
  sentAt: timestamp('sent_at'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Offers table
export const offers = pgTable('offers', {
  id: uuid('id').primaryKey().defaultRandom(),
  offerNumber: text('offer_number').notNull().unique(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  projectId: uuid('project_id').references(() => projects.id),
  title: text('title').notNull(),
  description: text('description'),
  items: jsonb('items').$type<Array<{
    description: string;
    quantity: number;
    price: number;
    total: number;
  }>>(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  vatRate: decimal('vat_rate', { precision: 5, scale: 2 }).default('21.00'),
  vatAmount: decimal('vat_amount', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: offerStatusEnum('status').default('draft'),
  validUntil: timestamp('valid_until'),
  sentAt: timestamp('sent_at'),
  acceptedAt: timestamp('accepted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// WhatsApp templates table
export const whatsappTemplates = pgTable('whatsapp_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  content: text('content').notNull(),
  variables: jsonb('variables').$type<string[]>(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Email templates table
export const emailTemplates = pgTable('email_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  subject: text('subject').notNull(),
  content: text('content').notNull(),
  variables: jsonb('variables').$type<string[]>(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Settings table
export const settings = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull().unique(),
  value: jsonb('value'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Placeholder for auth.users (referenced by profiles)
export const authUsers = pgTable('auth.users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Export all tables for Drizzle
export const schema = {
  profiles,
  customers,
  projects,
  invoices,
  offers,
  whatsappTemplates,
  emailTemplates,
  settings,
  authUsers,
};