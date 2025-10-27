# LM Studio Setup voor QuoteFast Dashboard

Deze gids legt uit hoe je LM Studio kunt gebruiken voor code generatie en debugging in het QuoteFast project.

## 📋 Vereisten

1. **LM Studio geïnstalleerd**: Download van [https://lmstudio.ai/](https://lmstudio.ai/)
2. **Modellen gedownload** (zie hieronder)
3. **Server draaiend** op `http://localhost:1234`

## 🚀 Snelstart

### 1. Start LM Studio Server

1. Open LM Studio
2. Ga naar **Developer** tab
3. Start de **Server** met de knopp **Start Server**
4. Controleer dat de server draait op `http://localhost:1234`

### 2. Laad Modellen

Laad deze modellen in LM Studio:

- **qwen2.5-coder-14b-instruct-mlx** - Voor code generatie
- **deepseek-coder-v2-lite-instruct-mlx** - Voor debugging
- **nomic-embed-text-v1.5** - Voor context begrip

### 3. Test de Verbinding

```bash
npx ts-node scripts/test-lm-studio.ts
```

Deze script test:
- ✅ Verbinding met LM Studio
- ✅ Beschikbare modellen
- ✅ Code generatie
- ✅ Debugging functionaliteit

## 💻 Gebruik in Code

### Code Genereren

```typescript
import { generateCode } from '@/lib/lm-studio-service';

const code = await generateCode(
  'Maak een React component voor een user profile card',
  'TypeScript'
);

console.log(code);
```

### Debuggen

```typescript
import { debugCode } from '@/lib/lm-studio-service';

const result = await debugCode(
  'Type error: cannot find property x',
  `
function process(data) {
  return data.x.y;
}
process({});
`,
  'deepseek-coder-v2-lite-instruct-mlx'
);

console.log('Diagnose:', result.diagnosis);
console.log('Fix:', result.fixedCode);
console.log('Uitleg:', result.explanation);
```

### Code Review

```typescript
import { reviewCode } from '@/lib/lm-studio-service';

const review = await reviewCode(
  `
function calculatePrice(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}
`,
  'performance'
);

console.log(review);
```

## 🔧 Configuratie

### Modellen Configureren

Bewerk `.cursor/rules/settings.json` om modellen en parameters aan te passen:

```json
{
  "lm-studio": {
    "server": {
      "endpoint": "http://localhost:1234/v1"
    },
    "models": {
      "jouw-model": {
        "name": "jouw-model",
        "description": "Beschrijving",
        "model_type": "chat",
        "parameters": {
          "temperature": 0.3,
          "max_tokens": 2048
        }
      }
    }
  }
}
```

### Temperature Instellingen

- **0.1-0.3**: Zeer deterministisch, stabiel voor production code
- **0.4-0.7**: Balans tussen creativiteit en stabiliteit
- **0.8-1.0**: Creatief, goed voor brainstorming

Voor code generatie: **0.3** is aanbevolen
Voor debugging: **0.6** is aanbevolen

## 🎯 Workflows

### Intelligent Coding Session

Gebruikt 3 modellen voor hoogwaardige code generatie:

1. **Context Research** - Zoekt gelijksoortige code patronen
2. **Code Generation** - Genereert initial code
3. **Code Review** - Reviewd en optimaliseert de code

### Rapid Debugging

Snelle debugging workflow:

1. **Error Analysis** - Analyseert de fout
2. **Fix Generation** - Genereert de oplossing

## 🛠️ API Endpoints

LM Studio gebruikt OpenAI-compatible API:

```bash
# Models ophalen
curl http://localhost:1234/v1/models

# Chat completion
curl -X POST http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5-coder-14b-instruct-mlx",
    "messages": [
      {"role": "user", "content": "Write a hello world function"}
    ]
  }'
```

## 📊 Model Capaciteiten

### qwen2.5-coder-14b-instruct-mlx

- **Gebruik**: Code generatie, refactoring, complex algorithms
- **Sterke punten**: Production-ready code, comprehensive solutions
- **Best voor**: Complex features, enterprise code

### deepseek-coder-v2-lite-instruct-mlx

- **Gebruik**: Debugging, code review, optimization
- **Sterke punten**: Error diagnosis, performance analysis
- **Best voor**: Bug fixing, code quality

### nomic-embed-text-v1.5

- **Gebruik**: Code similarity search, context retrieval
- **Sterke punten**: Pattern matching, semantic understanding
- **Best voor**: Codebase understanding, smart suggestions

## 🐛 Troubleshooting

### Server niet bereikbaar

```
Error: LM Studio API error: 500
```

**Oplossing**: Controleer of LM Studio server draait op `localhost:1234`

### Model niet gevonden

```
Error: Model xyz not found
```

**Oplossing**: Zorg dat het model geladen is in LM Studio en dat de naam overeen komt met de configuratie.

### Langzame responses

**Oplossing**: 
- Zet minder modellen in de workflow
- Verlaag `max_tokens` in de configuratie
- Gebruik kleiner model voor simpele taken

## 📚 Meer Informatie

- [LM Studio Documentation](https://lmstudio.ai/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Model Configuration](./settings.json)

