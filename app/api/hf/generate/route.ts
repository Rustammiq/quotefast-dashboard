import { NextRequest, NextResponse } from 'next/server';
import { generateCode } from '@/lib/huggingface-models';

/**
 * POST /api/hf/generate
 * Generate code using HuggingFace models
 */
export async function POST(request: NextRequest) {
  try {
    const { task, language, framework, model } = await request.json();

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'task is required' },
        { status: 400 }
      );
    }

    const code = await generateCode(
      task,
      language || 'TypeScript',
      framework || 'Next.js',
      model || 'Qwen/Qwen2.5-Coder-14B-Instruct'
    );

    return NextResponse.json({
      success: true,
      data: { code },
    });
  } catch (error) {
    console.error('HF Generate API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

