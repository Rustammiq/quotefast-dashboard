'use client';

import AICodeAssistant from '../components/AICodeAssistant';

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Code Assistant</h1>
        <p className="text-gray-500">
          Gebruik HuggingFace AI modellen (DeepSeek-Coder) voor code generatie en debugging
        </p>
      </div>
      
      <AICodeAssistant />
    </div>
  );
}

