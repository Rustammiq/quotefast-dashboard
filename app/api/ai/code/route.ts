import { NextRequest, NextResponse } from 'next/server';
import {
  generateCode,
  debugCode,
  generateIdeas,
  callMLXModel,
  getAllModels,
  getWorkflow,
  getAvailableWorkflows,
  checkMLXServer,
} from '@/lib/mlx-models';

/**
 * POST /api/ai/code
 * Generate code, debug, or get ideas using MLX models
 */
export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json();

    switch (action) {
      case 'generate':
        return await handleGenerate(params);
      case 'debug':
        return await handleDebug(params);
      case 'ideas':
        return await handleIdeas(params);
      case 'chat':
        return await handleChat(params);
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI code API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/code
 * Get available models and workflows
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'models') {
      const models = getAllModels();
      return NextResponse.json({ success: true, models });
    }

    if (type === 'workflows') {
      const workflows = getAvailableWorkflows();
      return NextResponse.json({ success: true, workflows });
    }

    if (type === 'health') {
      const isAvailable = await checkMLXServer();
      return NextResponse.json({ success: true, available: isAvailable });
    }

    // Return all info by default
    const models = getAllModels();
    const workflows = getAvailableWorkflows();
    const health = await checkMLXServer();

    return NextResponse.json({
      success: true,
      models,
      workflows,
      health: { available: health },
    });
  } catch (error) {
    console.error('AI code GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * Handle code generation
 */
async function handleGenerate(params: {
  task: string;
  context?: Record<string, any>;
}) {
  const { task, context } = params;

  if (!task) {
    return NextResponse.json(
      { success: false, message: 'task is required' },
      { status: 400 }
    );
  }

  const result = await generateCode(task, context);

  return NextResponse.json({
    success: true,
    data: result,
    message: 'Code generated successfully',
  });
}

/**
 * Handle debugging
 */
async function handleDebug(params: {
  error: string;
  code: string;
}) {
  const { error, code } = params;

  if (!error || !code) {
    return NextResponse.json(
      { success: false, message: 'error and code are required' },
      { status: 400 }
    );
  }

  const result = await debugCode(error, code);

  return NextResponse.json({
    success: true,
    data: result,
    message: 'Code debugged successfully',
  });
}

/**
 * Handle idea generation
 */
async function handleIdeas(params: { problem: string }) {
  const { problem } = params;

  if (!problem) {
    return NextResponse.json(
      { success: false, message: 'problem is required' },
      { status: 400 }
    );
  }

  const ideas = await generateIdeas(problem);

  return NextResponse.json({
    success: true,
    data: { ideas },
    message: 'Ideas generated successfully',
  });
}

/**
 * Handle direct chat with MLX model
 */
async function handleChat(params: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  options?: Record<string, any>;
}) {
  const { model, messages, options } = params;

  if (!model || !messages) {
    return NextResponse.json(
      { success: false, message: 'model and messages are required' },
      { status: 400 }
    );
  }

  const result = await callMLXModel(model, messages, options);

  return NextResponse.json({
    success: true,
    data: { response: result },
    message: 'Chat completed successfully',
  });
}




