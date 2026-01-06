// OpenRouter API (Works in China, has free tier)
export async function callOpenRouterAPI(prompt) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.log("⚠️ No OpenRouter API key found");
    return null;
  }
  
  try {
    console.log("🌐 Calling OpenRouter API...");
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Relationship Advice App'
      },
      body: JSON.stringify({
        model: 'google/gemini-pro', // Free model
        messages: [
          {
            role: "system",
            content: "You are a compassionate relationship coach. Give specific, actionable advice."
          },
          {
            role: "user",
            content: `Relationship situation: ${prompt}`
          }
        ],
        max_tokens: 500
      })
    });
    
    console.log("OpenRouter status:", response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ OpenRouter response received");
      return data.choices[0]?.message?.content || null;
    } else {
      const error = await response.text();
      console.error("OpenRouter error:", error);
      return null;
    }
    
  } catch (error) {
    console.error("OpenRouter API failed:", error.message);
    return null;
  }
}

// Test function
export async function testOpenRouter() {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return { success: false, message: "No OpenRouter key" };
  }
  
  try {
    const result = await callOpenRouterAPI("Say 'Hello' if working");
    return { 
      success: !!result, 
      message: result ? "✅ OpenRouter working" : "❌ OpenRouter failed",
      response: result
    };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
}
