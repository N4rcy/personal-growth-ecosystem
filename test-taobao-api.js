const apiKey = 'sk-5nuufK4IWhHKfwiKdhnbTuMJmYWubZdUAbSqbhXETToLCVM1';
const apiBase = 'https://tb.api.mkeai.com';

console.log('🧪 Testing Taobao DeepSeek API...');
console.log('API Base:', apiBase);
console.log('API Key (first 15 chars):', apiKey.substring(0, 15) + '...');

const testData = {
  model: 'deepseek-chat',
  messages: [
    {
      role: 'user',
      content: 'Say "API is working" if you receive this message.'
    }
  ],
  max_tokens: 20
};

fetch(`${apiBase}/v1/chat/completions`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log('Status:', response.status, response.statusText);
  return response.json();
})
.then(data => {
  if (data.choices && data.choices[0]) {
    console.log('✅ API is working!');
    console.log('Response:', data.choices[0].message.content);
  } else {
    console.log('❌ Unexpected response:', JSON.stringify(data, null, 2));
  }
})
.catch(error => {
  console.log('❌ Error:', error.message);
});
