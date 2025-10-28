/**
 * LM Studio Service voor lokale AI code generatie en debugging
 * Gebruikt de OpenAI-compatibele API van LM Studio
 */

import settings from '../.cursor/rules/settings.json';

export interface ModelConfig {
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string[];
  [key: string]: unknown;
}

export interface LMStudioModel {
  name: string;
  description?: string;
  model_type: 'chat' | 'embedding';
  parameters?: ModelConfig;
  specialties?: string[];
  use_cases?: string[];
}

export interface LMStudioWorkflowStep {
  step: number;
  model: string;
  role: string;
  prompt_template: string;
  deliverable: string;
}

export interface LMStudioWorkflow {
  name: string;
  description: string;
  models: string[];
  flow: LMStudioWorkflowStep[];
}

export interface LMStudioConfig {
  server: {
    endpoint: string;
    host?: string;
    port?: number;
  };
  models: Record<string, LMStudioModel>;
  workflows: Record<string, LMStudioWorkflow>;
  system_prompts: Record<string, string>;
  recommended_settings?: Record<string, unknown>;
}

export interface WorkflowValidationResult {
  workflow: LMStudioWorkflow;
  missingModels: string[];
  isValid: boolean;
}

const rawConfig = settings['lm-studio'];

if (!rawConfig) {
  throw new Error('LM Studio configuratie ontbreekt in .cursor/rules/settings.json');
}

const config = rawConfig as LMStudioConfig;

if (!config.server?.endpoint) {
  throw new Error('LM Studio server endpoint ontbreekt in .cursor/rules/settings.json');
}

const API_BASE = config.server.endpoint.replace(/\/+$/, '');

interface ResolvedModelEntry {
  key: string;
  model: LMStudioModel;
}

const normalizeModelName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/^(llm|embd)\s+/, '')
    .replace(/\s+/g, ' ');

const resolveModelEntry = (modelName?: string): ResolvedModelEntry | undefined => {
  if (!modelName) {
    return undefined;
  }

  const target = normalizeModelName(modelName);
  for (const [key, value] of Object.entries(config.models)) {
    const normalizedKey = normalizeModelName(key);
    const normalizedName = value?.name ? normalizeModelName(value.name) : undefined;

    if (target === normalizedKey || (normalizedName && target === normalizedName)) {
      return { key, model: value };
    }
  }

  return undefined;
};

const ensureModelEntry = (
  modelName: string,
  requiredType?: LMStudioModel['model_type']
): ResolvedModelEntry => {
  const resolved = resolveModelEntry(modelName);

  if (!resolved) {
    throw new Error(
      `LM Studio model "${modelName}" niet gevonden. Controleer de instellingen in .cursor/rules/settings.json.`
    );
  }

  if (requiredType && resolved.model.model_type !== requiredType) {
    throw new Error(
      `LM Studio model "${modelName}" heeft type ${resolved.model.model_type}, maar ${requiredType} werd verwacht.`
    );
  }

  return resolved;
};

const ensureModelParameters = (model: LMStudioModel): ModelConfig => ({
  ...(model.parameters || {}),
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Haal beschikbare modellen op van LM Studio
 */
export async function getAvailableModels(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE}/models`);
    if (!response.ok) {
      throw new Error(`LM Studio API error: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Fout bij ophalen LM Studio modellen:', error);
    throw error;
  }
}

/**
 * Roep een chat model aan
 */
export async function chatWithModel(
  model: string,
  messages: ChatMessage[],
  options: Partial<ModelConfig> = {}
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        ...options,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LM Studio API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Fout bij chat met model:', error);
    throw error;
  }
}

/**
 * Genereer code met LM Studio
 */
export async function generateCode(
  task: string,
  language: string = 'TypeScript',
  model: string = 'qwen2.5-coder-14b-instruct-mlx'
): Promise<string> {
  const systemPrompt = config.system_prompts.coding;
  const userPrompt = `Genereer ${language} code voor het volgende:
  
${task}

Geef volledige, production-ready code met:
- TypeScript types (als van toepassing)
- Error handling
- Comments waar nodig
- Best practices`;

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];

  const { model: modelConfig } = ensureModelEntry(model, 'chat');
  const options = ensureModelParameters(modelConfig);

  if (typeof options.max_tokens !== 'number') {
    options.max_tokens = 2048;
  }

  if (typeof options.temperature !== 'number') {
    options.temperature = 0.3;
  }

  const targetModelName = modelConfig.name || model;

  return await chatWithModel(targetModelName, messages, options);
}

/**
 * Debug code met LM Studio
 */
export async function debugCode(
  errorMessage: string,
  code: string,
  model: string = 'deepseek-coder-v2-lite-instruct-mlx'
): Promise<{
  diagnosis: string;
  fixedCode: string;
  explanation: string;
}> {
  const systemPrompt = config.system_prompts.debugging;
  
  const userPrompt = `Analyseer en fix deze code fout:

ERROR: ${errorMessage}

CODE:
\`\`\`typescript
${code}
\`\`\`

Geef:
1. Diagnose: Wat is het probleem?
2. Oplossing: De gefixte code
3. Uitleg: Waarom werkt dit?`;

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];

  const { model: modelConfig } = ensureModelEntry(model, 'chat');
  const options = ensureModelParameters(modelConfig);

  if (typeof options.max_tokens !== 'number') {
    options.max_tokens = 2048;
  }

  if (typeof options.temperature !== 'number') {
    options.temperature = 0.6;
  }

  const targetModelName = modelConfig.name || model;

  const response = await chatWithModel(targetModelName, messages, options);
  
  // Parse de response
  const diagnosis = response.match(/1\.\s*Diagnose[:\s]+(.*?)(?=2\.|Oplossing|$)/s)?.[1]?.trim() || response;
  const fixedCodeMatch = response.match(/2\.\s*Oplossing[:\s]*\n```(?:typescript)?\s*\n?(.*?)```/s);
  const fixedCode = fixedCodeMatch?.[1]?.trim() || 'Geen fix beschikbaar';
  const explanation = response.match(/3\.\s*Uitleg[:\s]+(.*?)$/s)?.[1]?.trim() || 'Geen uitleg beschikbaar';

  return { diagnosis, fixedCode, explanation };
}

/**
 * Review code met LM Studio
 */
export async function reviewCode(
  code: string,
  focus: string = 'best practices',
  model: string = 'deepseek-coder-v2-lite-instruct-mlx'
): Promise<string> {
  const systemPrompt = config.system_prompts['code-review'];
  
  const userPrompt = `Review deze code met focus op: ${focus}

\`\`\`typescript
${code}
\`\`\`

Controleer op:
- Bugs en potentiële errors
- Security issues
- Performance problemen
- Best practices
- Code kwaliteit

Geef constructieve feedback en suggesties voor verbetering.`;

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];

  const { model: modelConfig } = ensureModelEntry(model, 'chat');
  const options = ensureModelParameters(modelConfig);

  if (typeof options.max_tokens !== 'number') {
    options.max_tokens = 2048;
  }

  if (typeof options.temperature !== 'number') {
    options.temperature = 0.6;
  }

  const targetModelName = modelConfig.name || model;

  return await chatWithModel(targetModelName, messages, options);
}

/**
 * Test LM Studio verbinding
 */
export async function testLMStudioConnection(): Promise<boolean> {
  try {
    const models = await getAvailableModels();
    return models.length > 0;
  } catch (error) {
    console.error('LM Studio verbinding test mislukt:', error);
    return false;
  }
}

/**
 * Haal model configuratie op
 */
export function getModelConfig(modelName: string): LMStudioModel | undefined {
  return resolveModelEntry(modelName)?.model;
}

/**
 * Haal alle beschikbare models op uit configuratie
 */
export function getAllModels(): LMStudioModel[] {
  return Object.values(config.models) as LMStudioModel[];
}

/**
 * Haal workflows op
 */
export function getWorkflows(): Record<string, LMStudioWorkflow> {
  return config.workflows;
}

export function getWorkflow(workflowName: string): LMStudioWorkflow | undefined {
  return config.workflows[workflowName];
}

export function validateWorkflow(workflowName: string): WorkflowValidationResult {
  const workflow = getWorkflow(workflowName);

  if (!workflow) {
    throw new Error(
      `Workflow "${workflowName}" niet gevonden in de LM Studio configuratie (.cursor/rules/settings.json).`
    );
  }

  const missingModels = new Set<string>();

  (workflow.models || []).forEach(modelName => {
    if (!resolveModelEntry(modelName)) {
      missingModels.add(modelName);
    }
  });

  (workflow.flow || []).forEach(step => {
    if (step.model && !resolveModelEntry(step.model)) {
      missingModels.add(step.model);
    }
  });

  return {
    workflow,
    missingModels: Array.from(missingModels),
    isValid: missingModels.size === 0,
  };
}

export function validateAllWorkflows(): Record<string, WorkflowValidationResult> {
  const results: Record<string, WorkflowValidationResult> = {};

  Object.keys(config.workflows).forEach(key => {
    results[key] = validateWorkflow(key);
  });

  return results;
}

export default {
  getAvailableModels,
  chatWithModel,
  generateCode,
  debugCode,
  reviewCode,
  testLMStudioConnection,
  getModelConfig,
  getAllModels,
  getWorkflows,
  getWorkflow,
  validateWorkflow,
  validateAllWorkflows,
};

