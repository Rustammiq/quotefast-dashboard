import { chatWithModel, DEFAULT_CODE_MODEL } from '../lib/huggingface-service';

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface AIService {
  validateInput(input: string, rules: string): Promise<ValidationResult>;
  generateContent(prompt: string): Promise<string>;
}

class LMStudioService implements AIService {
  async validateInput(input: string, rules: string): Promise<ValidationResult> {
    const prompt = `Valideer: "${input}" volgens regels: ${rules}`;
    const context = `Je bent een formuliervalidator. Geef JSON antwoord: {valid: boolean, message: string}`;
    
    const response = await chatWithModel(
      DEFAULT_CODE_MODEL,
      [
        { role: 'system', content: context },
        { role: 'user', content: prompt }
      ]
    );
    return this.safeParseResponse(response);
  }

  async generateContent(prompt: string): Promise<string> {
    return chatWithModel(
      DEFAULT_CODE_MODEL,
      [
        { role: 'system', content: 'Je bent een content generator' },
        { role: 'user', content: prompt }
      ]
    );
  }

  private safeParseResponse(response: string): ValidationResult {
    try {
      const start = response.indexOf('{');
      const end = response.lastIndexOf('}') + 1;
      const jsonStr = response.substring(start, end);
      return JSON.parse(jsonStr);
    } catch (e) {
      console.warn('Ongeldig AI antwoord:', response);
      return { valid: false, message: 'Validatie mislukt' };
    }
  }
}

export const getAIService = (): AIService => {
  return new LMStudioService();
};

