/**
 * LM Studio Usage Examples
 * Voorbeelden van hoe je LM Studio kunt gebruiken voor coding en debugging
 */

import {
  generateCode,
  debugCode,
  reviewCode,
  chatWithModel,
  getAllModels,
  DEFAULT_CODE_MODEL,
  DEFAULT_OCR_MODEL,
  LIGHTWEIGHT_OCR_MODEL,
} from './lm-studio-service';

// ===== VOORBEELD 1: Code Generatie =====

export async function exampleGenerateComponent() {
  const task = `
Maak een React component genaamd UserCard die:
- Een user avatar toont
- User naam en email display
- Een "View Profile" button heeft
- Gebruik TypeScript
- Maak het responsive met Tailwind CSS
`;

  const code = await generateCode(task, 'TypeScript');
  console.log('Generated Component:', code);
  return code;
}

// ===== VOORBEELD 2: Debug Fixed Type Error =====

export async function exampleDebugTypeError() {
  const errorCode = `
interface User {
  name: string;
  age: number;
}

function getUser(): User {
  return { name: 'John', age: '30' }; // Type error: age should be number
}

const user = getUser();
console.log(user.age); // Error: age is string not number
`;

  const result = await debugCode(
    "Type error: age should be number but got string",
    errorCode
  );

  console.log('Diagnose:', result.diagnosis);
  console.log('Fixed Code:', result.fixedCode);
  console.log('Explanation:', result.explanation);

  return result;
}

// ===== VOORBEELD 3: Code Review =====

export async function exampleReviewCode() {
  const code = `
async function fetchUserData(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();
  return data.name;
}
`;

  const review = await reviewCode(
    code,
    'error handling, security, and best practices'
  );

  console.log('Code Review:', review);
  return review;
}

// ===== VOORBEELD 4: Custom Chat Session =====

export async function exampleCustomChat() {
  const messages = [
    {
      role: 'system' as const,
      content: 'You are a Next.js expert helping with API routes.',
    },
    {
      role: 'user' as const,
      content: `
Ik wil een API route maken voor user registration met:
- Email validatie
- Password hashing
- Database opslag in Supabase
- Error handling
`,
    },
  ];

  const response = await chatWithModel(DEFAULT_CODE_MODEL, messages);
  console.log('Chat Response:', response);
  return response;
}

// ===== VOORBEELD 5b: Document OCR =====

export async function exampleOcrToMarkdown() {
  const messages = [
    {
      role: 'system' as const,
      content: 'Je bent een OCR-assistent die documenten omzet naar gestructureerde markdown met semantische tags.',
    },
    {
      role: 'user' as const,
      content: `
Zet de volgende tekst (met simpele tabellen) om naar markdown en markeer belangrijke elementen:

INVOICE 2025-001
Client: QuoteFast BV
Total: €1.250,00

Items:
- Discovery Workshop | 1 | €500
- Dashboard Design | 1 | €750

Handtekening: __________________
Watermerk: CONFIDENTIAL
`,
    },
  ];

  const response = await chatWithModel(DEFAULT_OCR_MODEL, messages);
  console.log('Gebruik de lichte OCR variant voor snelle taken:', LIGHTWEIGHT_OCR_MODEL);
  console.log('OCR Markdown:', response);
  return response;
}

// ===== VOORBEELD 5: Complex Workflow =====

export async function exampleCompleteWorkflow() {
  // Step 1: Genereer een initial implementatie
  const initialCode = await generateCode(
    'Maak een shopping cart met add/remove items functionaliteit',
    'TypeScript'
  );

  console.log('Step 1 - Initial Code:', initialCode);

  // Step 2: Review en verbeter de code
  const reviewedCode = await reviewCode(initialCode, 'best practices and performance');

  console.log('Step 2 - Reviewed Code:', reviewedCode);

  // Als er errors zijn, debug ze
  const debugResult = await debugCode(
    'Possible state management issues in shopping cart',
    initialCode
  );

  console.log('Step 3 - Debug Result:', debugResult);

  return {
    initial: initialCode,
    reviewed: reviewedCode,
    fixed: debugResult.fixedCode,
  };
}

// ===== VOORBEELD 6: List Available Models =====

export async function exampleListModels() {
  const models = getAllModels();
  
  console.log('Available Models:');
  models.forEach(model => {
    console.log(`\n📊 ${model.name}`);
    console.log(`   Description: ${model.description}`);
    console.log(`   Type: ${model.model_type}`);
    console.log(`   Specialties: ${model.specialties?.join(', ') || 'none'}`);
    console.log(`   Use cases: ${model.use_cases?.slice(0, 2).join(', ') || 'none'}...`);
  });

  return models;
}

// Export alle voorbeelden
export const examples = {
  generateComponent: exampleGenerateComponent,
  debugTypeError: exampleDebugTypeError,
  reviewCode: exampleReviewCode,
  customChat: exampleCustomChat,
  ocrToMarkdown: exampleOcrToMarkdown,
  completeWorkflow: exampleCompleteWorkflow,
  listModels: exampleListModels,
};

