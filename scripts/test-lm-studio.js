/**
 * Test script voor LM Studio integratie
 * Gebruik: node scripts/test-lm-studio.js
 */

const API_BASE = 'http://localhost:1234/v1';

async function testConnection() {
  console.log('🚀 LM Studio Test Script\n');

  // Test 1: Check verbinding
  console.log('1️⃣ Test LM Studio verbinding...');
  let models = [];
  try {
    const response = await fetch(`${API_BASE}/models`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    console.log('✅ Verbonden met LM Studio!');
    console.log(`✅ ${data.data?.length || 0} model(len) beschikbaar\n`);
    
    models = data.data || [];
    
    if (models.length > 0) {
      console.log('Modellen:');
      models.forEach((model, i) => {
        console.log(`   ${i + 1}. ${model.id}`);
      });
      console.log('');
    }
  } catch (error) {
    console.log('❌ Geen verbinding met LM Studio');
    console.log('   Zorg dat LM Studio server draait op http://localhost:1234');
    console.log(`   Error: ${error.message}\n`);
    process.exit(1);
  }

  // Test 2: Test een simpele chat
  console.log('2️⃣ Test chat functionaliteit...');
  try {
    // Zoek de exacte modellen die we geconfigureerd hebben
    const firstModel = models.find(m => m.id === 'qwen2.5-coder-14b-instruct-mlx') || 
                      models.find(m => m.id === 'deepseek-coder-v2-lite-instruct-mlx') ||
                      models.find(m => m.id.includes('qwen')) ||
                      models[0];
    
    if (!firstModel) {
      throw new Error('Geen geschikt model gevonden');
    }

    console.log(`   Using model: ${firstModel.id}`);

    const testMessage = {
      model: firstModel.id,
      messages: [
        {
          role: 'user',
          content: 'Say "Hello from LM Studio!" in one sentence.'
        }
      ],
      max_tokens: 50,
      temperature: 0.3
    };

    const chatResponse = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage)
    });

    if (!chatResponse.ok) {
      const errorText = await chatResponse.text();
      throw new Error(`HTTP ${chatResponse.status}: ${errorText}`);
    }

    const chatData = await chatResponse.json();
    const message = chatData.choices?.[0]?.message?.content;
    
    if (message) {
      console.log('✅ Chat werkt!');
      console.log(`   Response: "${message}"\n`);
    } else {
      console.log('⚠️ Chat API antwoord maar geen content\n');
      console.log('Response:', JSON.stringify(chatData, null, 2));
    }
  } catch (error) {
    console.log('❌ Chat test mislukt');
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 3: Test code generatie
  console.log('3️⃣ Test code generatie...');
  try {
    const coderModel = models.find(m => m.id === 'deepseek-coder-v2-lite-instruct-mlx') ||
                       models.find(m => m.id === 'qwen2.5-coder-14b-instruct-mlx') ||
                       models.find(m => m.id.includes('coder')) ||
                       models[0];
    
    if (!coderModel) {
      throw new Error('Geen coder model gevonden');
    }

    console.log(`   Using model: ${coderModel.id}`);

    const codeMessage = {
      model: coderModel.id,
      messages: [
        {
          role: 'system',
          content: 'You are an expert coding assistant. Write clean, production-ready code.'
        },
        {
          role: 'user',
          content: 'Generate a simple React function component called Button that takes a "label" prop.'
        }
      ],
      max_tokens: 200,
      temperature: 0.3
    };

    const codeResponse = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(codeMessage)
    });

    if (!codeResponse.ok) {
      const errorText = await codeResponse.text();
      throw new Error(`HTTP ${codeResponse.status}: ${errorText}`);
    }

    const codeData = await codeResponse.json();
    const code = codeData.choices?.[0]?.message?.content;
    
    if (code) {
      console.log('✅ Code generatie werkt!');
      console.log(`   Generated code:\n${code.substring(0, 300)}...\n`);
    } else {
      console.log('⚠️ Geen code teruggekregen');
      console.log('Response:', JSON.stringify(codeData, null, 2));
    }
  } catch (error) {
    console.log('❌ Code generatie mislukt');
    console.log(`   Error: ${error.message}\n`);
  }

  console.log('✅ Alle tests voltooid!\n');
  console.log('📝 Volgende stappen:');
  console.log('   1. Import de lm-studio-service in je code');
  console.log('   2. Gebruik generateCode() voor code generatie');
  console.log('   3. Gebruik debugCode() voor debugging');
  console.log('');
}

testConnection().catch(console.error);

