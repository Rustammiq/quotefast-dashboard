/**
 * GitHub Models / Azure AI GPT-5.0 Integration
 * Verantwoordelijk voor AI chat functionaliteit via GitHub Models API
 */

// GitHub Models / Azure AI Configuration
const GITHUB_PAT = process.env.GITHUB_PAT || '';
const AZURE_AI_ENABLED = process.env.AZURE_AI_ENABLED === 'true';
const AZURE_OPENAI_KEY = process.env.AZURE_OPENAI_KEY || '';
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT || '';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GitHubModelsConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Chat met GPT-5.0 via GitHub Models
 */
export async function chatWithGPT5(
  message: string,
  conversationHistory: ChatMessage[] = [],
  config: GitHubModelsConfig = {}
): Promise<string> {
  try {
    if (!AZURE_OPENAI_KEY || !AZURE_OPENAI_ENDPOINT || !AZURE_AI_ENABLED) {
      console.log("Azure OpenAI not configured");
      throw new Error("Azure OpenAI not available");
    }

    const {
      model = "gpt-4o",
      temperature = 0.7,
      maxTokens = 2000
    } = config;

    // Use the configured Azure endpoint or fallback to a default
    const apiUrl = AZURE_OPENAI_ENDPOINT || "https://your-resource-name.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2023-05-15";

    // Build messages array with system prompt
    const systemPrompt = "Je bent een AI assistent voor QuoteFast, een professioneel offerte management systeem. Help gebruikers met het maken van betere offertes.";

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...conversationHistory,
      { role: "user" as const, content: message }
    ];

    console.log(`[Azure OpenAI] Calling API with model: ${model}, messageCount: ${messages.length}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'api-key': AZURE_OPENAI_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Azure OpenAI API error response:", errorText);
      throw new Error(`Azure OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in API response");
    }

    return content;

  } catch (error) {
    console.error("Azure OpenAI API error:", error);
    throw error;
  }
}

/**
 * Generate offerte content with GPT-5.0
 */
export async function generateQuotationWithAI(
  companyName: string,
  description: string,
  industry: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const prompt = `Maak een professionele offerte voor:
- Bedrijf: ${companyName}
- Branche: ${industry}
- Project omschrijving: ${description}

Gebruik de style van een professioneel Belgisch bedrijf.`;

  return await chatWithGPT5(prompt, conversationHistory, {
    model: "gpt-4o",
    temperature: 0.7,
    maxTokens: 2000
  });
}

/**
 * Test GitHub Models connection
 */
export async function testGitHubModelsConnection(): Promise<boolean> {
  try {
    const response = await chatWithGPT5("Test connection", []);
    return !!response;
  } catch (error) {
    console.error("GitHub Models connection test failed:", error);
    return false;
  }
}

/**
 * Available models for QuoteFast
 */
export const AVAILABLE_MODELS = {
  'gpt-4o': 'GPT-4o - Meest geavanceerd model voor complexe taken',
  'gpt-4o-mini': 'GPT-4o Mini - Sneller en goedkoper alternatief',
  'gpt-4': 'GPT-4 - Standaard model voor offerte generatie',
  'gpt-4-turbo': 'GPT-4 Turbo - Turbo versie voor snelle responses'
};

