/**
 * HuggingFace Models Integration for QuoteFast
 * Gebruikt HuggingFace Inference API voor AI-ondersteuning
 */

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || '';
const HF_API_URL = 'https://api-inference.huggingface.co/models';

export interface HFChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface HFModelConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface Model {
  name: string;
  description: string;
  bestFor: string[];
  modelUrl: string;
}

/**
 * Beschikbare HuggingFace modellen voor coding en debugging
 */
export const HF_CODING_MODELS: Model[] = [
  {
    name: 'Qwen/Qwen2.5-Coder-14B-Instruct',
    description: '⭐ AANGERADEN - Beste balance snelheid/kwaliteit',
    bestFor: ['Code generation', 'Refactoring', 'Docstrings', 'Production code'],
    modelUrl: 'https://huggingface.co/Qwen/Qwen2.5-Coder-14B-Instruct'
  },
  {
    name: 'Qwen/Qwen2.5-Coder-7B-Instruct',
    description: 'Snellere alternatief voor basis coding',
    bestFor: ['Quick prototyping', 'Simple code generation'],
    modelUrl: 'https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct'
  },
  {
    name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    description: 'Meest krachtig - voor complexe taken',
    bestFor: ['Complex algorithms', 'Enterprise code', 'Architecture decisions'],
    modelUrl: 'https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct'
  }
];

export const HF_DEBUGGING_MODELS: Model[] = [
  {
    name: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B',
    description: '⭐ AANGERADEN - Beste reasoning voor debugging',
    bestFor: ['Debugging', 'Step-by-step reasoning', 'Error explanation', 'Test generation', 'Bug finding'],
    modelUrl: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B'
  },
  {
    name: 'Qwen/Qwen2.5-7B-Instruct',
    description: 'Goed voor code begrijpen',
    bestFor: ['Code analysis', 'Understanding errors', 'Explain code'],
    modelUrl: 'https://huggingface.co/Qwen/Qwen2.5-7B-Instruct'
  }
];

/**
 * Call HuggingFace Inference API
 */
async function callHFInference(
  model: string,
  inputs: string | object,
  options: { max_new_tokens?: number; temperature?: number } = {}
): Promise<any> {
  if (!HF_API_KEY) {
    throw new Error('HUGGINGFACE_API_KEY not configured');
  }

  const response = await fetch(`${HF_API_URL}/${model}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: inputs,
      parameters: {
        max_new_tokens: options.max_new_tokens || 1024,
        temperature: options.temperature || 0.7,
        return_full_text: false,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HF API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  
  // Handle array response
  if (Array.isArray(data) && data.length > 0) {
    return data[0].generated_text;
  }
  
  return data[0]?.generated_text || data;
}

/**
 * Chat met een model voor coding
 */
export async function chatForCoding(
  message: string,
  conversationHistory: HFChatMessage[] = [],
  config: HFModelConfig = {}
): Promise<string> {
  const model = config.model || 'Qwen/Qwen2.5-Coder-14B-Instruct';
  
  // Build full prompt with history
  let fullPrompt = message;
  
  if (conversationHistory.length > 0) {
    fullPrompt = conversationHistory
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n') + '\n\nUser: ' + message;
  }

  const systemPrompt = "Je bent een expert software developer. Geef duidelijke, goed gedocumenteerde code in TypeScript/JavaScript voor Next.js applicaties.";
  const finalPrompt = `${systemPrompt}\n\n${fullPrompt}`;

  try {
    const response = await callHFInference(model, finalPrompt, {
      max_new_tokens: config.maxTokens || 2048,
      temperature: config.temperature || 0.7,
    });

    return typeof response === 'string' ? response : JSON.stringify(response);
  } catch (error) {
    console.error('HF Coding API error:', error);
    throw error;
  }
}

/**
 * Debug code met HuggingFace
 */
export async function debugCode(
  errorMessage: string,
  code: string,
  model: string = 'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B'
): Promise<{
  diagnosis: string;
  fixedCode: string;
  explanation: string;
}> {
  const prompt = `Analyseer deze fout en geef een oplossing:

ERROR: ${errorMessage}

CODE:
\`\`\`typescript
${code}
\`\`\`

Geef:
1. Diagnose: Wat is het probleem?
2. Oplossing: De gefixte code
3. Uitleg: Waarom werkt dit?`;

  try {
    const response = await callHFInference(model, prompt, {
      max_new_tokens: 2048,
      temperature: 0.5,
    });

    const text = typeof response === 'string' ? response : JSON.stringify(response);
    
    // Extract sections (simple parsing)
    const diagnosis = text.match(/1\.\s*Diagnose[:\s]+(.*?)(?=2\.|$)/s)?.[1]?.trim() || text;
    const fixedCode = text.match(/CODE[:\s]+```typescript\s*\n(.*?)```/s)?.[1]?.trim() || text;
    const explanation = text.match(/3\.\s*Uitleg[:\s]+(.*?)$/s)?.[1]?.trim() || text;

    return {
      diagnosis: diagnosis || text,
      fixedCode: fixedCode || 'No fix provided',
      explanation: explanation || 'No explanation provided',
    };
  } catch (error) {
    console.error('HF Debug API error:', error);
    throw error;
  }
}

/**
 * Genereer code met een specifieke taak
 */
export async function generateCode(
  task: string,
  language: string = 'TypeScript',
  framework: string = 'Next.js',
  model: string = 'Qwen/Qwen2.5-Coder-14B-Instruct'
): Promise<string> {
  const prompt = `Genereer ${language} code voor een Next.js applicatie:

Taak: ${task}
Taal: ${language}
Framework: ${framework}

Geef volledige, production-ready code met:
- TypeScript types
- Error handling
- Comments waar nodig
- Best practices`;

  try {
    const response = await callHFInference(model, prompt, {
      max_new_tokens: 3000,
      temperature: 0.7,
    });

    return typeof response === 'string' ? response : JSON.stringify(response);
  } catch (error) {
    console.error('HF Code Generation error:', error);
    throw error;
  }
}

/**
 * Test HuggingFace connection
 */
export async function testHFConnection(model: string = 'deepseek-ai/DeepSeek-Coder-1.3B-Instruct'): Promise<boolean> {
  try {
    const response = await callHFInference(model, 'test', {
      max_new_tokens: 10,
      temperature: 0.5,
    });
    return !!response;
  } catch (error) {
    console.error('HF connection test failed:', error);
    return false;
  }
}

/**
 * Get model recommendations based on use case
 */
export function getModelForUseCase(useCase: 'coding' | 'debugging' | 'code-review'): string[] {
  switch (useCase) {
    case 'coding':
      return [
        'Qwen/Qwen2.5-Coder-14B-Instruct',
        'Qwen/Qwen2.5-Coder-7B-Instruct',
        'Qwen/Qwen2.5-Coder-32B-Instruct'
      ];
    case 'debugging':
      return [
        'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B',
        'Qwen/Qwen2.5-7B-Instruct'
      ];
    case 'code-review':
      return [
        'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B',
        'Qwen/Qwen2.5-Coder-14B-Instruct'
      ];
    default:
      return ['Qwen/Qwen2.5-Coder-14B-Instruct'];
  }
}

export default {
  chatForCoding,
  debugCode,
  generateCode,
  testHFConnection,
  getModelForUseCase,
  HF_CODING_MODELS,
  HF_DEBUGGING_MODELS,
};

