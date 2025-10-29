export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
  }
}

export const handleAPIError = (error: unknown) => {
  if (error instanceof APIError) {
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        details: error.details 
      }),
      { status: error.statusCode }
    );
  }
  
  console.error('Unhandled API error:', error);
  return new Response(
    JSON.stringify({ error: 'Internal server error' }),
    { status: 500 }
  );
};

