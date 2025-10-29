/**
 * HuggingFace Service voor lokale AI code generatie en debugging
 * Vervangt LM Studio met HuggingFace Inference API
 */

import { chatForCoding, debugCode, generateCode, testHFConnection } from './huggingface-models';

export interface ModelConfig {
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string[];
  [key: string]: unknown;
}

export interface HuggingFaceModel {
  name: string;
  description?: string;
  model_type: 'chat' | 'embedding';
  parameters?: ModelConfig;
  specialties?: string[];
  use_cases?: string[];
}

export interface HuggingFaceWorkflowStep {
  step: number;
  model: string;
  role: string;
  prompt_template: string;
  deliverable: string;
}

export interface HuggingFaceWorkflow {
  name: string;
  description: string;
  models: string[];
  flow: HuggingFaceWorkflowStep[];
}

export interface HuggingFaceConfig {
  server: {
    endpoint: string;
    apiKey?: string;
  };
  models: Record<string, HuggingFaceModel>;
  workflows: Record<string, HuggingFaceWorkflow>;
  system_prompts: Record<string, string>;
}

// Default configuration
const DEFAULT_CONFIG: HuggingFaceConfig = {
  server: {
    endpoint: 'https://api-inference.huggingface.co/models',
    apiKey: process.env.HUGGINGFACE_API_KEY || ''
  },
  models: {
    'qwen-coder-14b': {
      name: 'Qwen/Qwen2.5-Coder-14B-Instruct',
      description: 'Advanced Qwen coder model for complex coding tasks',
      model_type: 'chat',
      parameters: {
        temperature: 0.4,
        max_tokens: 4096,
        top_p: 0.95,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['```', '\n\n\n', '</code>']
      },
      specialties: [
        'architecture-design',
        'complex-algorithms',
        'system-design',
        'performance-optimization',
        'security-analysis',
        'scalability-planning'
      ],
      use_cases: [
        'System architecture design',
        'Complex algorithm implementation',
        'Performance optimization',
        'Security code review',
        'Scalable application design'
      ]
    },
    'deepseek-coder-lite': {
      name: 'deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct',
      description: 'Lightweight DeepSeek coder model for efficient code generation',
      model_type: 'chat',
      parameters: {
        temperature: 0.3,
        max_tokens: 2048,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
        stop: ['```', '\n\n\n', '</code>']
      },
      specialties: [
        'code-generation',
        'debugging',
        'refactoring',
        'code-review',
        'typescript',
        'javascript',
        'python',
        'react'
      ],
      use_cases: [
        'Generate React components',
        'Debug TypeScript errors',
        'Code refactoring',
        'API endpoint creation',
        'Database schema design'
      ]
    },
    'qwen-instruct': {
      name: 'Qwen/Qwen2.5-7B-Instruct',
      description: 'General purpose instruction model for various tasks',
      model_type: 'chat',
      parameters: {
        temperature: 0.2,
        max_tokens: 2048,
        top_p: 0.9,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['\n\n\n']
      },
      specialties: [
        'general-chat',
        'instruction-following',
        'analysis',
        'explanation'
      ],
      use_cases: [
        'Code explanation',
        'General assistance',
        'Analysis tasks',
        'Question answering'
      ]
    }
  },
  workflows: {
    'coding-session': {
      name: 'Coding Session',
      description: 'Complete workflow for coding tasks',
      models: ['qwen-coder-14b', 'deepseek-coder-lite'],
      flow: [
        {
          step: 1,
          model: 'qwen-coder-14b',
          role: 'architect',
          prompt_template: "Let's analyze and design the solution for: {task}",
          deliverable: 'Architecture design and technical specifications'
        },
        {
          step: 2,
          model: 'deepseek-coder-lite',
          role: 'implementer',
          prompt_template: 'Based on this design, implement the solution: {previous_output}',
          deliverable: 'Complete, working code implementation'
        }
      ]
    },
    'debug-session': {
      name: 'Debug Session',
      description: 'Advanced debugging workflow',
      models: ['deepseek-coder-lite', 'qwen-coder-14b'],
      flow: [
        {
          step: 1,
          model: 'deepseek-coder-lite',
          role: 'quick-debugger',
          prompt_template: 'Identify the problem in this code: {error_message}\n{code_snippet}',
          deliverable: 'Quick problem identification and basic fix'
        },
        {
          step: 2,
          model: 'qwen-coder-14b',
          role: 'deep-analyzer',
          prompt_template: 'Analyze this problem deeply and create a robust solution: {previous_analysis}',
          deliverable: 'Deep analysis and production-ready solution'
        }
      ]
    }
  },
  system_prompts: {
    coding: 'Je bent een expert software ontwikkelaar met uitgebreide kennis van moderne web development technieken. Je helpt bij het schrijven van productie-klaar code met de beste practices. Focus op:\n- TypeScript types en interfaces\n- Error handling en edge cases\n- Performance optimalisatie\n- Security best practices\n- Code documentatie\n- Testbaarheid\n\nGebruik altijd moderne JavaScript/TypeScript features en geef complete, werkende code terug.',
    debugging: 'Je bent een expert debugger die complexe code problemen kan analyseren en oplossen. Je aanpak:\n1. Identificeer het root cause van de fout\n2. Analyseer de code flow en data flow\n3. Controleer edge cases en input validatie\n4. Geef duidelijke uitleg van het probleem\n5. Voorzie een werkende oplossing\n6. Leg uit waarom de fix werkt\n\nGebruik systematische debugging technieken en focus op preventie van toekomstige fouten.',
    'code-review': 'Je bent een senior code reviewer die focust op kwaliteit, onderhoudbaarheid en best practices. Evalueer code op:\n- Functionaliteit en correctheid\n- Performance en efficiency\n- Security vulnerabilities\n- Code kwaliteit en onderhoudbaarheid\n- Best practices en conventies\n- Testbaarheid en documentatie\n\nGeef constructieve feedback met specifieke suggesties voor verbetering. Prioriteer kritieke issues boven style voorkeuren.'
  }
};

let config: HuggingFaceConfig = DEFAULT_CONFIG;

/**
 * Get model configuration
 */
export function getModelConfig(modelName: string): ModelConfig | undefined {
  const model = config.models[modelName];
  return model?.parameters;
}

/**
 * Get workflow by name
 */
export function getWorkflow(workflowName: string): HuggingFaceWorkflow | undefined {
  return config.workflows[workflowName];
}

/**
 * Chat with a specific model
 */
export async function chatWithModel(
  modelName: string,
  messages: Array<{ role: string; content: string }>,
  options: ModelConfig = {}
): Promise<string> {
  try {
    const model = config.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found in configuration`);
    }

    // Convert messages to a single prompt
    const systemMessage = messages.find(m => m.role === 'system')?.content || '';
    const userMessage = messages.find(m => m.role === 'user')?.content || '';

    let fullPrompt = userMessage;
    if (systemMessage) {
      fullPrompt = `${systemMessage}\n\n${userMessage}`;
    }

    // Use the HuggingFace API
    const hfModelName = model.name;
    const response = await chatForCoding(fullPrompt, [], {
      model: hfModelName,
      temperature: options.temperature || model.parameters?.temperature || 0.7,
      maxTokens: options.max_tokens || model.parameters?.max_tokens || 2048
    });

    return response;
  } catch (error) {
    console.error(`HuggingFace chat error for model ${modelName}:`, error);
    throw new Error(`Failed to chat with model ${modelName}: ${error}`);
  }
}

/**
 * Get all available models
 */
export function getAvailableModels(): string[] {
  return Object.keys(config.models);
}

/**
 * Test connection to HuggingFace
 */
export async function testConnection(): Promise<boolean> {
  try {
    const modelName = Object.keys(config.models)[0];
    if (!modelName) return false;

    const model = config.models[modelName];
    return await testHFConnection(model.name);
  } catch (error) {
    console.error('HuggingFace connection test failed:', error);
    return false;
  }
}

/**
 * Get model information
 */
export function getModelInfo(modelName: string): HuggingFaceModel | undefined {
  return config.models[modelName];
}

/**
 * Update configuration
 */
export function updateConfig(newConfig: Partial<HuggingFaceConfig>): void {
  config = { ...config, ...newConfig };
}

// Export default model for backward compatibility
export const DEFAULT_CODE_MODEL = 'deepseek-coder-lite';

export default {
  chatWithModel,
  getModelConfig,
  getWorkflow,
  getAvailableModels,
  testConnection,
  getModelInfo,
  updateConfig,
  DEFAULT_CODE_MODEL
};
