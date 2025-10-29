import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

const runMigrations = async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const migrationsDir = path.join(__dirname, '../supabase/migrations');
  
  try {
    const files = await fs.readdir(migrationsDir);
    
    for (const file of files.sort()) {
      if (file.endsWith('.sql')) {
        const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8');
        const { error } = await supabase.rpc('execute_sql', { sql });
        
        if (error) {
          console.error(`Fout in migratie ${file}:`, error);
        } else {
          console.log(`✅ Migratie toegepast: ${file}`);
        }
      }
    }
  } catch (error) {
    console.error('Fout bij lezen van migraties:', error);
  }
};

runMigrations().catch(console.error);

