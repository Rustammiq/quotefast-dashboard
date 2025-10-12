# 🗄️ Netlify DB Setup Guide

## ✅ **Wat is er geïnstalleerd:**

### **Netlify DB Status:**
- ✅ **Database**: Connected to site `aiquotefast`
- ✅ **Team**: Yandievs
- ✅ **Environment Variables**: 
  - `NETLIFY_DATABASE_URL` - Main database connection
  - `NETLIFY_DATABASE_URL_UNPOOLED` - Unpooled connection

### **Drizzle ORM Setup:**
- ✅ **Schema**: `db/schema.ts` - Complete database schema
- ✅ **Config**: `drizzle.config.ts` - Drizzle configuration
- ✅ **Migration**: `migrations/0000_overrated_sumo.sql` - Generated migration
- ✅ **Scripts**: Database commands in package.json

## 🚀 **Database Commands:**

### **Generate Migration:**
```bash
npm run db:generate
```

### **Run Migration:**
```bash
npm run db:migrate
```

### **Open Database Studio:**
```bash
npm run db:studio
```

### **Check Database Status:**
```bash
npx netlify db status
```

## 📊 **Database Schema:**

### **Tables Created:**
- `profiles` - User profiles (extends auth.users)
- `customers` - Customer management
- `projects` - Project tracking
- `invoices` - Invoice management
- `offers` - Offer management
- `whatsapp_templates` - WhatsApp message templates
- `email_templates` - Email templates
- `settings` - Application settings

### **Relationships:**
- `profiles` → `auth.users` (1:1)
- `projects` → `customers` (many:1)
- `invoices` → `customers` (many:1)
- `invoices` → `projects` (many:1)
- `offers` → `customers` (many:1)
- `offers` → `projects` (many:1)

## 🔧 **Usage in Code:**

### **Import Database:**
```typescript
import { db } from './db';
import { customers, invoices } from './db/schema';
```

### **Query Examples:**
```typescript
// Get all customers
const allCustomers = await db.select().from(customers);

// Create new customer
const newCustomer = await db.insert(customers).values({
  name: 'John Doe',
  email: 'john@example.com'
}).returning();

// Get invoices with customer data
const invoicesWithCustomers = await db
  .select()
  .from(invoices)
  .leftJoin(customers, eq(invoices.customerId, customers.id));
```

## 🌐 **Environment Variables:**

### **Netlify (Automatic):**
- `NETLIFY_DATABASE_URL` - Main connection
- `NETLIFY_DATABASE_URL_UNPOOLED` - Unpooled connection

### **Local Development:**
Add to `.env.local`:
```env
DATABASE_URL=postgresql://localhost:5432/quotefast
```

## 🚨 **Migration Issues:**

### **Problem**: "url: undefined"
**Solution**: Use Netlify environment for migrations:
```bash
# Run migration via Netlify (recommended)
npm run db:migrate

# Or set local DATABASE_URL
export DATABASE_URL="your_netlify_db_url"
npm run db:migrate
```

### **Problem**: Driver not found
**Solution**: Install required driver:
```bash
npm install @neondatabase/serverless
```

## 🎯 **Next Steps:**

### **1. Run Migration:**
```bash
npm run db:migrate
```

### **2. Update Netlify Functions:**
Replace Supabase client with Drizzle in your Netlify Functions:
```javascript
// Old: Supabase
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(url, key);

// New: Drizzle
const { db } = require('../db');
import { customers } from '../db/schema';
```

### **3. Test Database:**
```bash
npm run db:studio
```

## 📈 **Benefits:**

### **Netlify DB vs Supabase:**
- ✅ **Integrated**: Direct integration with Netlify
- ✅ **Managed**: Fully managed PostgreSQL
- ✅ **Scaling**: Automatic scaling
- ✅ **Backups**: Automatic backups
- ✅ **Monitoring**: Built-in monitoring

### **Drizzle ORM Benefits:**
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Performance**: Optimized queries
- ✅ **Migrations**: Version controlled schema
- ✅ **Relations**: Easy relationship handling

## 🔗 **Useful Links:**
- [Netlify DB Documentation](https://docs.netlify.com/database/overview/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

**🎯 Your database is ready for production use!**
