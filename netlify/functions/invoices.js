// Netlify Function for invoices API
const { db } = require('../../lib/neon-client');

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Get all invoices with customer data
      const invoices = await db.getInvoices();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ invoices }),
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new invoice
      const body = JSON.parse(event.body);
      const { 
        invoice_number, 
        customer_id, 
        title, 
        description, 
        total, 
        status = 'draft',
        due_date,
        items = []
      } = body;

      // Validate required fields
      if (!invoice_number || !customer_id || !title || !total) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Missing required fields: invoice_number, customer_id, title, total'
          }),
        };
      }

      // Calculate VAT (assuming 21% if not provided)
      const vatRate = 21;
      const subtotal = total / (1 + vatRate / 100);
      const vatAmount = total - subtotal;

      // Create invoice
      const invoice = await db.createInvoice({
        invoice_number,
        customer_id,
        title,
        description,
        items,
        subtotal,
        vat_rate: vatRate,
        vat_amount: vatAmount,
        total,
        status,
        due_date
      });

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ invoice }),
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in invoices function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
