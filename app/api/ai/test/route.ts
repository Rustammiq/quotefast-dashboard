import { NextRequest, NextResponse } from 'next/server';
import { chatWithGPT5, testGitHubModelsConnection } from '@/lib/github-models';

export async function POST(request: NextRequest) {
  try {
    const { message, testConnection } = await request.json();

    // Test connection if requested
    if (testConnection) {
      const isConnected = await testGitHubModelsConnection();
      return NextResponse.json({
        success: true,
        connected: isConnected,
        message: isConnected ? 'GitHub Models connection successful' : 'GitHub Models connection failed'
      });
    }

    // Test chat functionality
    if (message) {
      const response = await chatWithGPT5(message, [], {
        model: "gpt-5.0",
        temperature: 0.7,
        maxTokens: 1000
      });

      return NextResponse.json({
        success: true,
        response: response,
        message: 'AI chat successful'
      });
    }

    return NextResponse.json({
      success: false,
      message: 'No message or testConnection provided'
    }, { status: 400 });

  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'AI API call failed'
    }, { status: 500 });
  }
}
