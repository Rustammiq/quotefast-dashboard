/**
 * Test script voor LM Studio integratie
 * Gebruik: npx ts-node scripts/test-lm-studio.ts
 */

import {
  testLMStudioConnection,
  getAvailableModels,
  generateCode,
  debugCode,
  reviewCode,
  getAllModels,
  getWorkflows,
} from '../lib/lm-studio-service';

async function main() {
  console.log('🚀 LM Studio Test Script\n');

  // Test verbinding
  console.log('1️⃣ Test LM Studio verbinding...');
  const isConnected = await testLMStudioConnection();
  console.log(isConnected ? '✅ Verbonden met LM Studio' : '❌ Geen verbinding met LM Studio');
  console.log('');

  // Haal beschikbare modellen op
  console.log('2️⃣ Beschikbare modellen in LM Studio...');
  try {
    const models = await getAvailableModels();
    console.log(`✅ ${models.length} model(len) beschikbaar:`);
    models.forEach((model: any) => {
      console.log(`   - ${model.id || 'Unknown'}`);
    });
  } catch (error) {
    console.log('❌ Kan modellen niet ophalen:', error);
  }
  console.log('');

  // Haal geconfigureerde modellen op
  console.log('3️⃣ Geconfigureerde modellen...');
  const configuredModels = getAllModels();
  configuredModels.forEach(model => {
    console.log(`   - ${model.name}: ${model.description}`);
  });
  console.log('');

  // Test workflows
  console.log('4️⃣ Beschikbare workflows...');
  const workflows = getWorkflows();
  Object.entries(workflows).forEach(([key, workflow]: [string, any]) => {
    console.log(`   - ${workflow.name}: ${workflow.description}`);
    console.log(`     Models: ${workflow.models.join(', ')}`);
  });
  console.log('');

  // Test code generatie
  console.log('5️⃣ Test code generatie...');
  try {
    const task = 'Maak een React component voor een loading spinner';
    console.log(`   Taak: ${task}`);
    const code = await generateCode(task);
    console.log('   ✅ Code gegenereerd:');
    console.log(code.substring(0, 200) + '...');
  } catch (error) {
    console.log('   ❌ Fout bij code generatie:', error);
  }
  console.log('');

  // Test debugging
  console.log('6️⃣ Test debugging...');
  try {
    const errorCode = `
function add(a, b) {
  return a + b.toString();
}
const result = add(5, 10);
console.log(result);
`;
    const errorMessage = 'Verwacht resultaat: 15, maar krijgt "510"';
    
    console.log('   Bug: verkeerd type in add functie');
    const debugResult = await debugCode(errorMessage, errorCode);
    console.log('   ✅ Debugging voltooid:');
    console.log(`   Diagnose: ${debugResult.diagnosis.substring(0, 100)}...`);
  } catch (error) {
    console.log('   ❌ Fout bij debugging:', error);
  }
  console.log('');

  console.log('✅ Test script voltooid!\n');
}

main().catch(console.error);

