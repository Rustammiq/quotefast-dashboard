# 🗄️ Neon Data API Setup Guide

## ✅ **Wat er is geconfigureerd:**

### **Neon Data API:**
- ✅ **API URL**: `https://ep-green-salad-aewsjn0v.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1`
- ✅ **Environment Variables**: Geconfigureerd in `.env.local`
- ✅ **Database Client**: `lib/neon-client.ts` aangemaakt
- ✅ **Netlify Functions**: Geüpdatet naar Neon Data API

### **Stack Auth (Optioneel):**
- ✅ **Project ID**: `7e2bf222-b49d-4357-bbc8-833b627f4e40`
- ✅ **Client Key**: Geconfigureerd in environment variables

## 🚀 **Database Client Features:**

### **NeonDatabase Class:**
```typescript
import { db } from './lib/neon-client';

// Generic methods
await db.getAll('customers');
await db.getById('customers', 'id');
await db.insert('customers', data);
await db.update('customers', 'id', data);
await db.delete('customers', 'id');

// Specific methods
await db.getCustomers();
await db.createCustomer(data);
await db.getInvoices();
await db.createInvoice(data);
```

### **Query Methods:**
- `query<T>(sql, params)` - Raw SQL queries
- `getAll<T>(table)` - Get all records
- `getById<T>(table, id)` - Get by ID
- `insert<T>(table, data)` - Insert record
- `update<T>(table, id, data)` - Update record
- `delete(table, id)` - Delete record

## 🔧 **Environment Variables:**

### **Required:**
```env
NEON_DATA_API_URL=https://ep-green-salad-aewsjn0v.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1
VITE_NEON_DATA_API_URL=https://ep-green-salad-aewsjn0v.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1
```

### **Stack Auth (Optional):**
```env
VITE_PUBLIC_STACK_PROJECT_ID=7e2bf222-b49d-4357-bbc8-833b627f4e40
VITE_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_v92gcjfmva91pw2fg9ndknw4rq9bzve6n38a3samckxj8
```

## 📊 **Database Schema:**

### **Tables (assumed structure):**
- `customers` - Customer management
- `invoices` - Invoice management
- `projects` - Project tracking
- `offers` - Offer management
- `profiles` - User profiles

### **Required Columns:**
```sql
-- customers table
id (UUID, primary key)
name (text, not null)
email (text, not null)
phone (text)
company (text)
address (text)
created_at (timestamp)
updated_at (timestamp)

-- invoices table
id (UUID, primary key)
invoice_number (text, unique, not null)
customer_id (UUID, foreign key)
title (text, not null)
description (text)
items (jsonb)
subtotal (decimal)
vat_rate (decimal)
vat_amount (decimal)
total (decimal)
status (text)
due_date (timestamp)
created_at (timestamp)
updated_at (timestamp)
```

## 🚀 **Netlify Functions Updated:**

### **Customers Function:**
- ✅ GET `/api/customers` - List all customers
- ✅ POST `/api/customers` - Create new customer

### **Invoices Function:**
- ✅ GET `/api/invoices` - List all invoices with customer data
- ✅ POST `/api/invoices` - Create new invoice

## 🧪 **Testing:**

### **Test API Endpoints:**
```bash
# Test customers endpoint
curl https://innovars.netlify.app/api/customers

# Test invoices endpoint
curl https://innovars.netlify.app/api/invoices

# Create customer
curl -X POST https://innovars.netlify.app/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Customer","email":"test@example.com"}'
```

### **Local Testing:**
```bash
# Start development server
npm run dev

# Test local endpoints
curl http://localhost:3000/api/customers
```

## 🔄 **Migration from Supabase:**

### **What Changed:**
- ✅ Database client: Supabase → Neon Data API
- ✅ Query methods: Supabase client → Custom NeonDatabase class
- ✅ Environment variables: Updated for Neon
- ✅ Netlify Functions: Updated to use Neon client

### **Benefits:**
- ✅ **Performance**: Direct SQL queries
- ✅ **Flexibility**: Custom query methods
- ✅ **Cost**: Potentially lower costs
- ✅ **Control**: Full control over queries

## 🚨 **Troubleshooting:**

### **Common Issues:**

#### **1. "NEON_DATA_API_URL not found"**
```bash
# Check environment variables
echo $NEON_DATA_API_URL

# Add to .env.local
echo "NEON_DATA_API_URL=https://your-neon-url" >> .env.local
```

#### **2. "Database connection failed"**
- Verify Neon database is active
- Check API URL is correct
- Ensure database has required tables

#### **3. "Table not found"**
- Create tables in Neon database
- Use SQL migration scripts
- Check table names match schema

## 🎯 **Next Steps:**

### **1. Create Database Tables:**
```sql
-- Run in Neon SQL editor
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  title TEXT NOT NULL,
  description TEXT,
  items JSONB,
  subtotal DECIMAL(10,2) NOT NULL,
  vat_rate DECIMAL(5,2) DEFAULT 21.00,
  vat_amount DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'draft',
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **2. Deploy Updated Functions:**
```bash
git add .
git commit -m "feat: Migrate to Neon Data API"
git push origin main
```

### **3. Test Production:**
- Test API endpoints on live site
- Verify database operations
- Monitor function logs

## 📚 **Resources:**
- [Neon Data API Documentation](https://neon.tech/docs/serverless/serverless-driver)
- [Neon SQL Editor](https://console.neon.tech/)
- [Stack Auth Documentation](https://docs.stack-auth.com/)

**🎯 Your application is now using Neon Data API for database operations!**
