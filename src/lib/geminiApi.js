// Google Gemini API Integration (Free Tier)
export async function callGeminiAPI(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'AIza...') {
    console.log("⚠️ No valid Gemini API key found");
    return null;
  }
  
  try {
    console.log("🌐 Calling Gemini API...");
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a compassionate, experienced relationship coach. Provide specific, actionable advice for this relationship situation: "${prompt}"
            
            Please provide personalized advice that includes:
            1. Understanding the emotional dynamics at play
            2. 2-3 specific, practical steps to try
            3. Communication strategies tailored to this situation
            4. What to avoid doing
            
            Be warm, empathetic, and directly address the situation described.
            Format your response in clear paragraphs.`
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1000,
          topP: 0.8,
          topK: 40,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      
      // Check for specific errors
      if (errorData.error?.message?.includes("API key")) {
        console.error("Invalid API key");
        return null;
      }
      
      // Try with simpler request if too complex
      if (response.status === 400) {
        console.log("🔄 Trying simpler request...");
        return await callGeminiAPISimple(prompt, apiKey);
      }
      
      return null;
    }
    
    const data = await response.json();
    console.log("✅ Gemini API response received");
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const text = data.candidates[0].content.parts[0].text;
      console.log("Response length:", text.length, "characters");
      return text;
    }
    
    console.error("Unexpected Gemini response format:", data);
    return null;
    
  } catch (error) {
    console.error("❌ Gemini API call failed:", error.message);
    return null;
  }
}

// Simpler version for fallback
async function callGeminiAPISimple(prompt, apiKey) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Give relationship advice for: ${prompt}` }]
        }],
        generationConfig: {
          maxOutputTokens: 500,
        }
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || null;
    }
  } catch (error) {
    console.error("Simple request failed too:", error.message);
  }
  return null;
}

// Test function
export async function testGeminiAPI() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return { success: false, message: "No API key found" };
  }
  
  try {
    const testResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "Say 'Gemini API is working' if this is working." }]
        }],
        generationConfig: {
          maxOutputTokens: 20,
        }
      })
    });
    
    if (testResponse.ok) {
      const data = await testResponse.json();
      const text = data.candidates[0]?.content?.parts[0]?.text || "No text in response";
      return { success: true, message: "✅ Gemini API is working!", response: text };
    } else {
      const error = await testResponse.json();
      return { success: false, message: `❌ API Error: ${error.error?.message || "Unknown error"}` };
    }
    
  } catch (error) {
    return { success: false, message: `❌ Network Error: ${error.message}` };
  }
}
