/**
 * HuggingFace Integration Test
 * Test de HuggingFace API integratie voor QuoteFast
 */

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_API_URL = 'https://api-inference.huggingface.co/models';

async function testHuggingFaceConnection() {
  console.log('🚀 HuggingFace API Test');
  console.log('========================\n');

  if (!HF_API_KEY) {
    console.error('❌ HUGGINGFACE_API_KEY niet gevonden in environment variables');
    console.log('Voeg HUGGINGFACE_API_KEY toe aan je .env.local bestand\n');
    return;
  }

  console.log('✅ API Key gevonden');
  console.log('📡 Testing connection...\n');

  // Test models
  const testModels = [
    'Qwen/Qwen2.5-Coder-14B-Instruct',
    'deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct'
  ];

  for (const model of testModels) {
    try {
      console.log(`🔍 Testing model: ${model}`);

      const response = await fetch(`${HF_API_URL}/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: 'Schrijf een korte functie in TypeScript die "Hello World" print.',
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedText = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;

        console.log('✅ Model werkt!');
        console.log(`📝 Response: ${generatedText?.substring(0, 100)}...\n`);
      } else {
        const errorText = await response.text();
        console.log(`❌ Model error (${response.status}): ${errorText}\n`);
      }
    } catch (error) {
      console.log(`❌ Connection error: ${error.message}\n`);
    }
  }

  console.log('🎉 Test voltooid!');
}

// Run the test
testHuggingFaceConnection().catch(console.error);
