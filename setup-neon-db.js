#!/usr/bin/env node

const fs = require('fs');
const https = require('https');

// Read the SQL setup file
const sqlContent = fs.readFileSync('neon-setup.sql', 'utf8');

// Neon Data API configuration
const NEON_API_URL = process.env.NEON_DATA_API_URL || 'https://ep-green-salad-aewsjn0v.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1';
const NEON_API_KEY = process.env.NEON_API_KEY || '+Bdf924RH2VKLowt5SnJKLJG6ReRaEFbJbVn6+71y7m/C4oUpmSnZYqZ/WQMhcvuVUBvE6SJqAc04CmamL6pjQ==';

console.log('Setting up Neon database tables...');
console.log('API URL:', NEON_API_URL);

// Function to execute SQL via Neon Data API
async function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      query: sql
    });

    const options = {
      hostname: 'ep-green-salad-aewsjn0v.apirest.c-2.us-east-2.aws.neon.tech',
      port: 443,
      path: '/neondb/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${NEON_API_KEY}`,
        'apikey': NEON_API_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (e) {
          console.log('Raw response:', data);
          resolve({ data: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

// Split SQL into individual statements and execute them
async function setupDatabase() {
  try {
    // Split SQL by semicolon and filter out empty statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`Found ${statements.length} SQL statements to execute`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        console.log('SQL:', statement.substring(0, 100) + '...');
        
        try {
          const result = await executeSQL(statement);
          console.log('✅ Success:', result);
        } catch (error) {
          console.log('❌ Error:', error.message);
          // Continue with next statement
        }
      }
    }

    console.log('✅ Database setup completed!');
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run the setup
setupDatabase();
