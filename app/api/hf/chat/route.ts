import { NextRequest, NextResponse } from 'next/server';
import { chatForCoding } from '@/lib/huggingface-models';

/**
 * POST /api/hf/chat
 * Chat with HuggingFace models for coding tasks
 */
export async function POST(request: NextRequest) {
  try {
    const { message, model, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'message is required' },
        { status: 400 }
      );
    }

    const response = await chatForCoding(message, conversationHistory || [], {
      model: model || 'deepseek-ai/DeepSeek-Coder-6.7B-Instruct',
    });

    return NextResponse.json({
      success: true,
      data: { response },
    });
  } catch (error) {
    console.error('HF Chat API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}



