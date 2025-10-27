#!/bin/bash

# Quick test voor LM Studio verbinding
echo "🚀 LM Studio Quick Test"
echo "========================"
echo ""

# Check of curl beschikbaar is
if ! command -v curl &> /dev/null; then
    echo "❌ curl is niet geïnstalleerd"
    exit 1
fi

# Test 1: Check server verbinding
echo "1️⃣ Check server verbinding..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1234/v1/models)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ LM Studio server bereikbaar op http://localhost:1234"
else
    echo "❌ LM Studio server niet bereikbaar (HTTP $HTTP_CODE)"
    echo ""
    echo "Zorg dat:"
    echo "  1. LM Studio open is"
    echo "  2. Server is gestart (Start Server button)"
    echo "  3. Minimaal 1 model geladen is"
    exit 1
fi

echo ""

# Test 2: Haal modellen op
echo "2️⃣ Haal beschikbare modellen op..."
curl -s http://localhost:1234/v1/models | jq '.data[] | .id' 2>/dev/null || \
curl -s http://localhost:1234/v1/models | grep -o '"id":"[^"]*"' | head -5

echo ""
echo "3️⃣ Test chat (quick test)..."
echo ""

# Test chat
curl -s -X POST http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Say hello in one word"}],
    "max_tokens": 10
  }' | jq -r '.choices[0].message.content' 2>/dev/null || \
  echo "⚠️ Chat test overslaan (gebruik Node.js script voor volledige test)"

echo ""
echo "✅ Test voltooid!"
echo ""
echo "💡 Gebruik: node scripts/test-lm-studio.js voor meer tests"

