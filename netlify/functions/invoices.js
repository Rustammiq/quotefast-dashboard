// Netlify Function for invoices API
// Note: Database connection will be handled via environment variables

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
      // Mock database operations for now
      // In production, you would use the actual database connection via DATABASE_URL
      const invoices = [
        {
          id: 1,
          invoice_number: 'INV-001',
          customer_name: 'John Doe',
          amount: 1500.00,
          status: 'paid',
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          invoice_number: 'INV-002',
          customer_name: 'Jane Smith',
          amount: 2500.00,
          status: 'pending',
          due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
        },
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(invoices),
      };
    }

    if (event.httpMethod === 'POST') {
      const { customer_name, amount, description } = JSON.parse(event.body);

      // Basic validation
      if (!customer_name || !amount) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Customer name and amount are required' }),
        };
      }

      // Mock invoice creation
      const newInvoice = {
        id: Date.now(),
        invoice_number: `INV-${String(Date.now()).slice(-6)}`,
        customer_name,
        amount: parseFloat(amount),
        description: description || '',
        status: 'pending',
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      };

      console.log('New invoice created:', newInvoice);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newInvoice),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in invoices function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};