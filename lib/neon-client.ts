// Neon Data API client
import { neon } from '@neondatabase/serverless';

const neonUrl = process.env.NEON_DATA_API_URL || process.env.VITE_NEON_DATA_API_URL;

if (!neonUrl) {
  throw new Error('NEON_DATA_API_URL environment variable is required');
}

// Create Neon client
export const neonClient = neon(neonUrl);

// Database query helper functions
export class NeonDatabase {
  private client = neonClient;

  // Generic query method
  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    try {
      const result = await this.client(sql, params);
      return result as T[];
    } catch (error) {
      console.error('Neon database query error:', error);
      throw error;
    }
  }

  // Get all records from a table
  async getAll<T = any>(table: string): Promise<T[]> {
    const sql = `SELECT * FROM ${table} ORDER BY created_at DESC`;
    return this.query<T>(sql);
  }

  // Get record by ID
  async getById<T = any>(table: string, id: string): Promise<T | null> {
    const sql = `SELECT * FROM ${table} WHERE id = $1`;
    const result = await this.query<T>(sql, [id]);
    return result[0] || null;
  }

  // Insert record
  async insert<T = any>(table: string, data: Record<string, any>): Promise<T> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    
    const sql = `
      INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    const result = await this.query<T>(sql, values);
    return result[0];
  }

  // Update record
  async update<T = any>(table: string, id: string, data: Record<string, any>): Promise<T> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns.map((col, i) => `${col} = $${i + 2}`).join(', ');
    
    const sql = `
      UPDATE ${table}
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await this.query<T>(sql, [id, ...values]);
    return result[0];
  }

  // Delete record
  async delete(table: string, id: string): Promise<boolean> {
    const sql = `DELETE FROM ${table} WHERE id = $1`;
    const result = await this.query(sql, [id]);
    return result.length > 0;
  }

  // Customers specific methods
  async getCustomers() {
    return this.getAll('customers');
  }

  async getCustomerById(id: string) {
    return this.getById('customers', id);
  }

  async createCustomer(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    address?: string;
  }) {
    return this.insert('customers', {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  // Invoices specific methods
  async getInvoices() {
    const sql = `
      SELECT i.*, c.name as customer_name, c.email as customer_email
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      ORDER BY i.created_at DESC
    `;
    return this.query(sql);
  }

  async getInvoiceById(id: string) {
    const sql = `
      SELECT i.*, c.name as customer_name, c.email as customer_email
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      WHERE i.id = $1
    `;
    const result = await this.query(sql, [id]);
    return result[0] || null;
  }

  async createInvoice(data: {
    invoice_number: string;
    customer_id: string;
    title: string;
    description?: string;
    items?: any[];
    subtotal: number;
    vat_rate?: number;
    vat_amount: number;
    total: number;
    status?: string;
    due_date?: string;
  }) {
    return this.insert('invoices', {
      ...data,
      items: data.items ? JSON.stringify(data.items) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
}

// Export singleton instance
export const db = new NeonDatabase();
