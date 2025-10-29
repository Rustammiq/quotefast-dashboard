/**
 * Eenvoudige test voor LM Studio
 */

const API_BASE = 'http://localhost:1234/v1';

async function test() {
  console.log('🚀 LM Studio Eenvoudige Test\n');

  // Test 1: Check models
  console.log('1️⃣ Beschikbare modellen ophalen...');
  const modelsResponse = await fetch(`${API_BASE}/models`);
  const modelsData = await modelsResponse.json();
  const models = modelsData.data || [];
  
  console.log(`✅ ${models.length} model(len) beschikbaar:\n`);
  models.slice(0, 5).forEach((model, i) => {
    console.log(`   ${i + 1}. ${model.id}`);
  });
  console.log('');

  // Test 2: Test met eerste coder model
  const coderModel = models.find(m => 
    m.id === 'deepseek-coder-v2-lite-instruct-mlx' ||
    m.id === 'mradermacher/nanonets-ocr2-3b' ||
    m.id === 'mlx-community/nanonets-ocr2-3b'
  );

  if (!coderModel) {
    console.log('❌ Geen coder model beschikbaar');
    return;
  }

  console.log(`2️⃣ Test chat met model: ${coderModel.id}\n`);

  const testMessage = {
    model: coderModel.id,
    messages: [
      { role: 'user', content: 'Geef een voorbeeld van een simpele React function component' }
    ],
    max_tokens: 150,
    temperature: 0.3
  };

  try {
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testMessage)
    });

    const data = await response.json();

    if (response.ok && data.choices?.[0]?.message?.content) {
      console.log('✅ Chat werkt!\n');
      console.log('Response:');
      console.log(data.choices[0].message.content);
      console.log('\n');
      console.log('📝 Volgende stap: Gebruik de lm-studio-service in je code!');
    } else {
      console.log('❌ Error:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ Test mislukt:', error.message);
  }
}

test().catch(console.error);

