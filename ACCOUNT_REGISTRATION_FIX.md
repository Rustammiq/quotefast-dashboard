# 🔧 Account Registratie Fix Guide

## 🚨 **Probleem:**
Je kunt geen account aanmaken op [https://aiquotefast.netlify.app/](https://aiquotefast.netlify.app/) omdat de authenticatie en database niet goed zijn geconfigureerd.

## ✅ **Oplossing:**

### **1. Hybrid Authentication Service**
- ✅ **Supabase Auth** voor authenticatie (login/register)
- ✅ **Neon Data API** voor database operaties
- ✅ **Hybrid service** die beide combineert

### **2. Database Setup**
De Neon database heeft nog geen tables. Je moet deze eerst aanmaken:

#### **Optie A: Via Neon Console (Aanbevolen)**
1. Ga naar [Neon Console](https://console.neon.tech/)
2. Selecteer je project
3. Ga naar "SQL Editor"
4. Kopieer en plak de inhoud van `neon-setup.sql`
5. Klik "Run" om de tables aan te maken

#### **Optie B: Via Command Line**
```bash
# Upload SQL script naar Neon
curl -X POST "https://ep-green-salad-aewsjn0v.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1/rpc/exec_sql" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_NEON_TOKEN" \
  -d '{"sql": "CREATE TABLE profiles..."}'
```

### **3. Environment Variables**
Zorg dat deze environment variables zijn ingesteld in Netlify:

```env
# Supabase Auth (voor authenticatie)
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4

# Neon Data API (voor database)
NEON_DATA_API_URL=https://ep-green-salad-aewsjn0v.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1
VITE_NEON_DATA_API_URL=https://ep-green-salad-aewsjn0v.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1

# App Configuration
NEXT_PUBLIC_APP_URL=https://aiquotefast.netlify.app
```

### **4. Deploy Updated Code**
```bash
# Commit de hybrid auth changes
git add .
git commit -m "fix: Add hybrid authentication service

- Combine Supabase Auth with Neon Data API
- Fix account registration issues
- Update AuthContext to use hybrid service
- Add database setup script"

git push origin fix/improve-logging-system
```

### **5. Test Account Registratie**
Na de deploy:
1. Ga naar [https://aiquotefast.netlify.app/register](https://aiquotefast.netlify.app/register)
2. Vul je gegevens in:
   - **Naam**: Je volledige naam
   - **Email**: Je email adres
   - **Wachtwoord**: Minimaal 6 karakters
3. Klik "Account Aanmaken"
4. Je zou nu een account moeten kunnen aanmaken!

## 🔍 **Troubleshooting:**

### **"Database connection failed"**
- Controleer of de Neon database tables zijn aangemaakt
- Verificeer de `NEON_DATA_API_URL` environment variable

### **"Authentication failed"**
- Controleer of Supabase credentials correct zijn
- Verificeer de `NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### **"Profile not found"**
- De hybrid service maakt automatisch een profiel aan
- Controleer of de `profiles` table bestaat in Neon

### **"Email already registered"**
- Probeer in te loggen in plaats van registreren
- Of gebruik een ander email adres

## 📊 **Database Schema:**

### **Tables die worden aangemaakt:**
- `profiles` - Gebruikersprofielen
- `customers` - Klanten
- `projects` - Projecten
- `invoices` - Facturen
- `offers` - Offertes
- `invoice_items` - Factuur items
- `offer_items` - Offerte items
- `settings` - Gebruikersinstellingen
- `activities` - Activiteiten log

### **Sample Data:**
Het script voegt automatisch test data toe:
- Test gebruiker: `test@example.com`
- Test klant: `john@example.com`

## 🎯 **Volgende Stappen:**

1. **Database Setup**: Maak de tables aan in Neon
2. **Deploy**: Push de hybrid auth changes
3. **Test**: Probeer een account aan te maken
4. **Verify**: Controleer of alles werkt

## 📚 **Files Gewijzigd:**
- ✅ `lib/hybrid-auth-service.ts` - Nieuwe hybrid service
- ✅ `contexts/AuthContext.tsx` - Updated naar hybrid service
- ✅ `neon-setup.sql` - Database setup script
- ✅ `lib/neon-client.ts` - Neon database client

**🎯 Na deze stappen zou je een account moeten kunnen aanmaken op de website!**
