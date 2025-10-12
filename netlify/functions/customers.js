// Netlify Function for customers API
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
      const customers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          company: 'Acme Corp',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          company: 'Tech Solutions',
          created_at: new Date().toISOString(),
        },
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(customers),
      };
    }

    if (event.httpMethod === 'POST') {
      const { name, email, company } = JSON.parse(event.body);

      // Basic validation
      if (!name || !email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Name and email are required' }),
        };
      }

      // Mock customer creation
      const newCustomer = {
        id: Date.now(),
        name,
        email,
        company: company || '',
        created_at: new Date().toISOString(),
      };

      console.log('New customer created:', newCustomer);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newCustomer),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in customers function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};