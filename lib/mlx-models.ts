/**
 * MLX Models Configuration and Integration
 * Voor lokale AI ontwikkeling met Apple Silicon
 */

import settings from '../settings.json';

export interface MLXModel {
  name: string;
  description: string;
  model_type: 'chat' | 'embedding';
  parameters: {
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    stop?: string[];
    dimensions?: number;
    normalize?: boolean;
  };
  specialties: string[];
  use_cases: string[];
}

export interface WorkflowStep {
  step: number;
  model: string;
  role: string;
  prompt_template: string;
  deliverable: string;
}

export interface Workflow {
  name: string;
  description: string;
  models: string[];
  flow: WorkflowStep[];
}

export interface MLXConfig {
  server: {
    host: string;
    port: number;
    endpoint: string;
  };
  models: Record<string, MLXModel>;
  workflows: Record<string, Workflow>;
  integrations: {
    embedding: {
      model: string;
      use_cases: string[];
      workflow: string;
    };
  };
  system_prompts: Record<string, string>;
}

const config = settings.mlx as MLXConfig;

/**
 * Get model configuration by name
 */
export function getModel(modelName: string): MLXModel | undefined {
  return config.models[modelName];
}

/**
 * Get all available models
 */
export function getAllModels(): MLXModel[] {
  return Object.values(config.models);
}

/**
 * Get chat models only
 */
export function getChatModels(): MLXModel[] {
  return Object.values(config.models).filter(m => m.model_type === 'chat');
}

/**
 * Get embedding model
 */
export function getEmbeddingModel(): MLXModel | undefined {
  const embedModelName = config.integrations.embedding.model;
  return config.models[embedModelName];
}

/**
 * Get workflow by name
 */
export function getWorkflow(workflowName: string): Workflow | undefined {
  return config.workflows[workflowName];
}

/**
 * Get system prompt by type
 */
export function getSystemPrompt(type: string): string {
  return config.system_prompts[type] || config.system_prompts['coding'];
}

/**
 * Generate prompt from template
 */
export function generatePrompt(template: string, variables: Record<string, string>): string {
  let prompt = template;
  for (const [key, value] of Object.entries(variables)) {
    prompt = prompt.replace(`{{${key}}}`, value);
  }
  return prompt;
}

/**
 * Call MLX model API
 */
export async function callMLXModel(
  modelName: string,
  messages: Array<{ role: string; content: string }>,
  options: Partial<MLXModel['parameters']> = {}
): Promise<string> {
  const model = getModel(modelName);
  if (!model) {
    throw new Error(`Model ${modelName} not found`);
  }

  // Merge default parameters with provided options
  const params = {
    ...model.parameters,
    ...options,
  };

  const response = await fetch(config.server.endpoint + '/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: modelName,
      messages,
      ...params,
    }),
  });

  if (!response.ok) {
    throw new Error(`MLX API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

/**
 * Execute a complete workflow
 */
export async function executeWorkflow(
  workflowName: string,
  initialInput: string,
  context?: Record<string, any>
): Promise<Record<string, any>> {
  const workflow = getWorkflow(workflowName);
  if (!workflow) {
    throw new Error(`Workflow ${workflowName} not found`);
  }

  const results: Record<string, any> = {};
  let currentInput = initialInput;

  for (const step of workflow.flow) {
    const prompt = generatePrompt(step.prompt_template, { ...context, input: currentInput });
    
    const systemPrompt = getSystemPrompt(step.role);
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ];

    const response = await callMLXModel(step.model, messages);
    results[step.deliverable] = response;
    currentInput = response;
  }

  return results;
}

/**
 * Generate code using coding workflow
 */
export async function generateCode(task: string, context?: Record<string, any>): Promise<{
  initial_implementation: string;
  optimized_implementation: string;
}> {
  const results = await executeWorkflow('coding-session', task, context);
  return {
    initial_implementation: results.initial_implementation || '',
    optimized_implementation: results.optimized_implementation || '',
  };
}

/**
 * Debug code using debugging workflow
 */
export async function debugCode(error: string, code: string): Promise<{
  error_diagnosis: string;
  fixed_code: string;
}> {
  const results = await executeWorkflow('debugging-session', error, { error, code });
  return {
    error_diagnosis: results.error_diagnosis || '',
    fixed_code: results.fixed_code || '',
  };
}

/**
 * Generate ideas using ideation workflow
 */
export async function generateIdeas(problem: string): Promise<string[]> {
  const results = await executeWorkflow('ideation-session', problem);
  const ideaList = results.idea_list || '';
  
  // Parse the idea list (assuming it's a numbered or bulleted list)
  return ideaList
    .split('\n')
    .map((line: string) => line.replace(/^\d+\.\s*|^[-•]\s*/, '').trim())
    .filter((line: string) => line.length > 0);
}

/**
 * Get available workflows list
 */
export function getAvailableWorkflows(): string[] {
  return Object.keys(config.workflows);
}

/**
 * Get server endpoint
 */
export function getServerEndpoint(): string {
  return config.server.endpoint;
}

/**
 * Check if MLX server is available
 */
export async function checkMLXServer(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${config.server.endpoint}/health`, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

export default {
  getAllModels,
  getChatModels,
  getEmbeddingModel,
  getModel,
  getWorkflow,
  getSystemPrompt,
  callMLXModel,
  executeWorkflow,
  generateCode,
  debugCode,
  generateIdeas,
  getAvailableWorkflows,
  getServerEndpoint,
  checkMLXServer,
};




