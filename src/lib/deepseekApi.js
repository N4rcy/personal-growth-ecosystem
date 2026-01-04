const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function callDeepSeekAPI(prompt) {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

  if (!apiKey || apiKey === "your_actual_deepseek_api_key_here") {
    console.warn("DeepSeek API key not configured. Using mock response.");
    return getMockResponse(prompt);
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("DeepSeek API error:", error);
    return getMockResponse(prompt);
  }
}

function getMockResponse(prompt) {
  // Return a mock response for development
  return `Based on your case, here's my analysis:

1. Root cause analysis: The issue appears to stem from communication breakdown and unmet expectations. Both parties may have different interpretations of the situation.

2. Communication advice: Try using "I feel" statements instead of "You always" statements. Schedule a calm time to discuss this without distractions.

3. Suggested next steps: 
   - Take 24 hours to reflect individually
   - Write down your feelings without blame
   - Schedule a 30-minute conversation using active listening
   - Consider one small compromise each

4. Empathy and understanding: It's clear both of you care about this relationship. The frustration comes from a place of wanting better connection. Remember that misunderstandings are common in close relationships.`;
}

// Helper function for streaming responses (optional)
export async function streamDeepSeekAPI(prompt, onChunk) {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

  if (!apiKey || apiKey === "your_actual_deepseek_api_key_here") {
    console.warn("DeepSeek API key not configured. Using mock streaming.");
    const mockResponse = getMockResponse(prompt);
    // Simulate streaming by splitting the response
    const chunks = mockResponse.split(" ");
    for (let i = 0; i < chunks.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      onChunk(chunks[i] + " ");
    }
    return;
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const chunk = parsed.choices[0]?.delta?.content || "";
            if (chunk) {
              onChunk(chunk);
            }
          } catch (e) {
            console.error("Error parsing stream data:", e);
          }
        }
      }
    }
  } catch (error) {
    console.error("DeepSeek API streaming error:", error);
    const mockResponse = getMockResponse(prompt);
    onChunk(mockResponse);
  }
}
