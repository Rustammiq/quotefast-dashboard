import { NextRequest, NextResponse } from 'next/server';
import { debugCode } from '@/lib/huggingface-models';

/**
 * POST /api/hf/debug
 * Debug code using HuggingFace models
 */
export async function POST(request: NextRequest) {
  try {
    const { error, code, model } = await request.json();

    if (!error || !code) {
      return NextResponse.json(
        { success: false, error: 'error and code are required' },
        { status: 400 }
      );
    }

    const result = await debugCode(error, code, model || 'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B');

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('HF Debug API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

