// Test function for browser console
export function testAPI() {
  console.log("🧪 Testing Taobao DeepSeek API...");
  
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  const apiBase = import.meta.env.VITE_DEEPSEEK_API_BASE || 'https://tb.api.mkeai.com';
  
  console.log("API Base:", apiBase);
  console.log("API Key (first 10 chars):", apiKey ? apiKey.substring(0, 10) + "..." : "NOT FOUND");
  
  const testData = {
    model: 'deepseek-chat',
    messages: [
      {
        role: 'user',
        content: 'Say "API connection successful" if you receive this.'
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
    console.log("Status:", response.status, response.statusText);
    return response.json();
  })
  .then(data => {
    if (data.choices && data.choices[0]) {
      console.log("✅ API is working!");
      console.log("Response:", data.choices[0].message.content);
      alert("✅ API connection successful!");
    } else {
      console.log("❌ Unexpected response:", data);
      alert("❌ API responded with unexpected format");
    }
  })
  .catch(error => {
    console.error("❌ Error:", error);
    alert("❌ API connection failed: " + error.message);
  });
}

// Make it available globally for testing
if (typeof window !== 'undefined') {
  window.testAPI = testAPI;
}
