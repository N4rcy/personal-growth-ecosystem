// Quick test for Gemini API
import { readFileSync } from 'fs';

// Read .env.local
const envContent = readFileSync('.env.local', 'utf8');
const apiKeyMatch = envContent.match(/VITE_GEMINI_API_KEY=([^\n]+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

if (!apiKey || apiKey === 'AIza...') {
  console.log('❌ No Gemini API key found in .env.local');
  process.exit(1);
}

console.log('Testing Gemini API key...');

const testData = {
  contents: [{
    parts: [{ text: "Say 'Gemini is working perfectly' if you receive this message." }]
  }],
  generationConfig: {
    maxOutputTokens: 20,
  }
};

fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log('Status:', response.status, response.statusText);
  return response.json();
})
.then(data => {
  if (data.candidates?.[0]?.content) {
    console.log('✅ SUCCESS! Gemini API is working!');
    console.log('Response:', data.candidates[0].content.parts[0].text);
  } else {
    console.log('❌ Error in response:', JSON.stringify(data, null, 2));
  }
})
.catch(error => {
  console.log('❌ Network error:', error.message);
});
