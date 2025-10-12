// Netlify Function for customers API
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
      // Get all customers
      const customers = await db.getCustomers();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ customers }),
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new customer
      const body = JSON.parse(event.body);
      const { name, email, phone, address, company } = body;

      // Validate required fields
      if (!name || !email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Missing required fields: name, email'
          }),
        };
      }

      // Create customer
      const customer = await db.createCustomer({
        name,
        email,
        phone,
        address,
        company
      });

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ customer }),
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in customers function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
