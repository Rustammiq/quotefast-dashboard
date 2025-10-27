'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Action = 'generate' | 'debug' | 'ideas';

interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export default function AICodeAssistant() {
  const [action, setAction] = useState<Action>('generate');
  const [input, setInput] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError('Vul eerst de input in');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let apiEndpoint = '';
      let responseData: Record<string, any> = {};
      
      // Use HuggingFace API
      switch (action) {
        case 'generate':
          apiEndpoint = '/api/hf/generate';
          responseData = { task: input, language: 'TypeScript', framework: 'Next.js' };
          break;
        case 'debug':
          apiEndpoint = '/api/hf/debug';
          const [errorText, codeText] = input.split('\n---\n');
          if (!errorText || !codeText) {
            throw new Error('Plaats "---" tussen de foutmelding en de code');
          }
          responseData = { error: errorText.trim(), code: codeText.trim() };
          break;
        case 'ideas':
          // Keep using MLX for ideas
          apiEndpoint = '/api/ai/code';
          responseData = { action: 'ideas', problem: input };
          break;
        default:
          apiEndpoint = '/api/ai/code';
          responseData = { action };
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData),
      });

      const data: AIResponse = await response.json();

      if (data.success) {
        // Handle different response formats
        if (action === 'generate' && data.data?.code) {
          setResult({ 
            initial_implementation: data.data.code,
            optimized_implementation: data.data.code
          });
        } else if (action === 'debug' && data.data) {
          setResult({
            error_diagnosis: data.data.diagnosis || '',
            fixed_code: data.data.fixedCode || ''
          });
        } else {
          setResult(data.data);
        }
      } else {
        setError(data.error || data.message || 'Er is een fout opgetreden');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een onbekende fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (action) {
      case 'generate':
        return 'Beschrijf de code die je wilt genereren, bijvoorbeeld: "Create a function to validate email addresses in TypeScript"';
      case 'debug':
        return 'Plaats eerst de foutmelding, dan "---" op een nieuwe regel, dan de code:\n\nSyntaxError: Unexpected token\n---\nfunction test() { return ';
      case 'ideas':
        return 'Beschrijf het probleem waar je ideeën voor nodig hebt, bijvoorbeeld: "How to implement real-time collaboration in a web app?"';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Code Assistant</CardTitle>
          <CardDescription>
            Gebruik HuggingFace AI: Qwen2.5-Coder-14B voor coding, DeepSeek-R1 voor debugging
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={action} onValueChange={(value) => setAction(value as Action)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate">Code Genereren</TabsTrigger>
              <TabsTrigger value="debug">Debuggen</TabsTrigger>
              <TabsTrigger value="ideas">Ideeën</TabsTrigger>
            </TabsList>

            <TabsContent value={action} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {action === 'generate' && 'Taak omschrijving'}
                  {action === 'debug' && 'Fout + Code (gescheiden door "---")'}
                  {action === 'ideas' && 'Probleem'}
                </label>
                <Textarea
                  placeholder={getPlaceholder()}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              {action === 'generate' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Extra Context (optioneel)</label>
                  <Textarea
                    placeholder="Bijvoorbeeld: gebruik TypeScript, Next.js framework, etc."
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              <Button onClick={handleSubmit} disabled={loading || !input.trim()}>
                {loading ? 'Verwerken...' : 'Versturen'}
              </Button>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-4 space-y-4">
              {action === 'generate' && (
                <>
                  {result.initial_implementation && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Initiële Implementatie</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-xs">
                          {result.initial_implementation}
                        </pre>
                      </CardContent>
                    </Card>
                  )}
                  {result.optimized_implementation && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Geoptimaliseerde Implementatie</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-xs">
                          {result.optimized_implementation}
                        </pre>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {action === 'debug' && (
                <>
                  {result.error_diagnosis && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Fout Diagnose</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-wrap">{result.error_diagnosis}</p>
                      </CardContent>
                    </Card>
                  )}
                  {result.fixed_code && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Gefixte Code</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-xs">
                          {result.fixed_code}
                        </pre>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {action === 'ideas' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Genereerde Ideeën</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {result.ideas?.map((idea: string, index: number) => (
                        <li key={index} className="text-sm">
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

